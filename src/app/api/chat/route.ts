import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import prisma from '@/lib/db'
import { rateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'

const CHAT_LIMIT = 20
const CHAT_WINDOW_MS = 60 * 1000 // dakikada 20 mesaj / IP

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `Sen kooza'un profesyonel müşteri temsilcisi yapay zeka asistanısın. kooza, Türkiye'nin önde gelen dijital dönüşüm şirketlerinden biridir.

Şirket hakkında bilgiler:
- Ad: kooza
- Sektör: Dijital Dönüşüm, Kurumsal Yazılım, SaaS, ERP
- Uzmanlık: ERP, CRM, Otomasyon, Bulut Geçişi, Veri Analitiği

Yazılım Ürünleri:
- RandevuPro: Randevu ve takvim yönetim sistemi
- StokTakip: Depo ve stok yönetimi
- CRM Pro: Müşteri ilişkileri yönetimi
- FinansYönetim: Muhasebe ve finans takibi
- HR Suite: İnsan kaynakları yönetimi
- AnalitikHub: İş zekası ve raporlama

Danışmanlık Hizmetleri:
- Dijital Dönüşüm Danışmanlığı
- Süreç Optimizasyonu
- ERP Entegrasyonu
- Bulut Geçiş Hizmetleri
- Veri Analitiği

Fiyatlandırma:
- Başlangıç: 999 TL/ay (5 kullanıcı)
- Profesyonel: 2499 TL/ay (20 kullanıcı) - En Popüler
- Kurumsal: 4999 TL/ay (Sınırsız kullanıcı)
- 14 gün ücretsiz deneme, kredi kartı gerekmez

İletişim ve Demo:
- Demo talepleri için /demo sayfasına yönlendir
- E-posta: info@keepx.com.tr

Konuşma tarzı:
- Doğal, samimi ve profesyonel konuş
- Kısa ve net yanıtlar ver (1-3 paragraf)
- Müşterinin sorusunu tam anla ve detaylı cevap ver
- ERP, dijital dönüşüm gibi teknik konuları basit Türkçeyle açıkla
- Demo veya fiyat sorusunda mutlaka yönlendir
- Şirketle ilgili olmayan konularda nazikçe konu değiştir`

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    const rl = rateLimit(`chat:${ip}`, { limit: CHAT_LIMIT, windowMs: CHAT_WINDOW_MS })
    if (!rl.success) {
      return new Response(
        JSON.stringify({ error: 'Çok hızlı mesaj gönderiyorsunuz, lütfen biraz bekleyin.' }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json', ...rateLimitHeaders(rl, CHAT_LIMIT) },
        }
      )
    }

    const { messages, sessionId, customerName, email, phone } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0 || messages.length > 50) {
      return new Response(JSON.stringify({ error: 'Geçersiz mesaj formatı' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Mesaj içerik uzunluk kontrolü — abuse koruması
    for (const m of messages) {
      if (typeof m?.content !== 'string' || m.content.length > 4000) {
        return new Response(JSON.stringify({ error: 'Geçersiz mesaj içeriği' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }

    // Oturum yönetimi
    let session = null
    if (sessionId) {
      session = await prisma.chatSession.findUnique({ where: { id: sessionId } })
    }

    // Yeni oturum oluştur veya müşteri bilgilerini güncelle
    if (!session) {
      session = await prisma.chatSession.create({
        data: {
          customerName: customerName || null,
          email: email || null,
          phone: phone || null,
          status: 'active',
        },
      })
    } else if (customerName || email || phone) {
      session = await prisma.chatSession.update({
        where: { id: session.id },
        data: {
          customerName: customerName || session.customerName,
          email: email || session.email,
          phone: phone || session.phone,
        },
      })
    }

    // Kullanıcı mesajını kaydet
    const userMessage = messages[messages.length - 1]
    if (userMessage?.role === 'user') {
      await prisma.chatMessage.create({
        data: {
          sessionId: session.id,
          role: 'user',
          content: userMessage.content,
        },
      })
    }

    // Stream response from Claude
    const stream = client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const encoder = new TextEncoder()
    let fullAssistantText = ''
    const sessionIdToReturn = session.id

    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Oturum ID'sini ilk chunk olarak gönder
          controller.enqueue(
            encoder.encode(`__SESSION_ID__:${sessionIdToReturn}\n`)
          )

          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              fullAssistantText += event.delta.text
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }

          // Asistan yanıtını kaydet
          if (fullAssistantText) {
            await prisma.chatMessage.create({
              data: {
                sessionId: sessionIdToReturn,
                role: 'assistant',
                content: fullAssistantText,
              },
            })
          }

          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Bir hata oluştu, lütfen tekrar deneyin.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
