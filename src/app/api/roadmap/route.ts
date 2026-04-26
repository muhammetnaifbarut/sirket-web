import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import prisma from '@/lib/db'
import { rateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'
import { notifyAdmin, sendEmail } from '@/lib/email'

const ROADMAP_LIMIT = 3
const ROADMAP_WINDOW_MS = 60 * 60 * 1000 // 1 saatte 3 talep

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `Sen kooza'nın stratejik dijital dönüşüm danışmanısın. Türkçe konuşan KOBİ sahipleri için kişiselleştirilmiş, pratik dijital dönüşüm yol haritaları üretiyorsun.

kooza'nın hizmetleri:
- Web sitesi & e-ticaret
- Sektörel otomasyon (klinik, restoran, market, eğitim)
- İnsan Kaynakları (bordro, izin, performans)
- CRM, Muhasebe, Pazarlama otomasyonu
- Dijital dönüşüm danışmanlığı

Önemli kurallar:
1. Türkçe yaz, samimi ama profesyonel ton kullan
2. Konkret, uygulanabilir öneriler ver
3. Tahminleri rakamla destekle (% kazanç, TL tasarruf, saat tasarruf)
4. 3 zaman aşamasında plan yap: 0-3 ay, 3-6 ay, 6-12 ay
5. Her aşamada 3-5 maddeli aksiyon planı ver
6. kooza'nın hangi modülünün ne fayda sağlayacağını söyle
7. Toplam tahmini ROI'yi belirt
8. Müşteriye değerli hissettir; satış konuşması yapma`

interface RoadmapRequest {
  name: string
  email: string
  phone?: string
  company: string
  sector: string
  employeeCount: string
  monthlyRevenue?: string
  currentSystems: string[]
  goals: string
  websiteUrl?: string
}

function buildPrompt(req: RoadmapRequest): string {
  return `Aşağıdaki şirket için kişiselleştirilmiş bir dijital dönüşüm yol haritası hazırla:

ŞİRKET BİLGİLERİ:
- Şirket: ${req.company}
- Sektör: ${req.sector}
- Çalışan Sayısı: ${req.employeeCount}
- Aylık Ciro Aralığı: ${req.monthlyRevenue || 'belirtilmemiş'}
- Web Sitesi: ${req.websiteUrl || 'yok'}

MEVCUT KULLANDIKLARI:
${req.currentSystems.length > 0 ? req.currentSystems.map(s => `- ${s}`).join('\n') : '- Hiçbir dijital sistem belirtilmemiş'}

HEDEFLERİ:
${req.goals}

Şu yapıda bir rapor üret (Türkçe, Markdown formatında):

# ${req.company} İçin Dijital Dönüşüm Yol Haritası

## 📊 Mevcut Durum Analizi
(Şirketin şu anki dijital olgunluk seviyesi hakkında 3-4 cümle)

## 🎯 Hedef ve Fırsatlar
(Belirtilen hedefler ışığında, sektörünüzdeki dijital fırsatlar)

## 🚀 0-3 Aylık Öncelikler (Hemen Başla)
3-5 madde — kritik kazançlar

## 📈 3-6 Aylık Hedefler (Büyüme Aşaması)
3-5 madde — orta vadeli yapılanma

## 🌟 6-12 Aylık Vizyon (Uzun Vade)
3-5 madde — sürdürülebilir büyüme

## 💎 kooza'nın Sizin İçin Önerdiği Modüller
(${req.sector} sektörü için kooza'nın hangi modüllerinin en uygun olduğunu, neden olduğunu açıkla)

## 💰 Tahmini Yıllık Etki
- Zaman tasarrufu: X saat/ay
- Maliyet tasarrufu: ~X TL/yıl
- Verimlilik artışı: %X
- Müşteri memnuniyeti: %X iyileşme

## ✅ Hemen Başlamak İçin Önerimiz
(Tek paragraflık net bir başlangıç önerisi)

Önemli: Sayılar gerçekçi, sektörünüze özel olsun. Şirket büyüklüğüne göre orantılı tahminler yap.`
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = rateLimit(`roadmap:${ip}`, { limit: ROADMAP_LIMIT, windowMs: ROADMAP_WINDOW_MS })

  if (!rl.success) {
    return NextResponse.json(
      { error: 'Çok fazla istek. Lütfen 1 saat sonra tekrar deneyin.' },
      { status: 429, headers: rateLimitHeaders(rl, ROADMAP_LIMIT) }
    )
  }

  let body: RoadmapRequest
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek' }, { status: 400 })
  }

  if (!body.name || !body.email || !body.company || !body.sector || !body.goals) {
    return NextResponse.json({ error: 'Eksik alan' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: 'Geçerli e-posta girin' }, { status: 400 })
  }

  let report = ''

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      report = `# ${body.company} İçin Dijital Dönüşüm Yol Haritası\n\nRaporunuz hazırlanmaktadır. En kısa sürede uzmanımız sizinle iletişime geçecektir.`
    } else {
      const completion = await client.messages.create({
        model: 'claude-sonnet-4-5',
        max_tokens: 3000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: buildPrompt(body) }],
      })
      const block = completion.content[0]
      report = block.type === 'text' ? block.text : 'Rapor üretildi.'
    }
  } catch (e: any) {
    console.error('Claude error:', e)
    report = `# ${body.company} İçin Dijital Dönüşüm Yol Haritası\n\nRaporunuz hazırlanıyor. Uzmanımız 24 saat içinde size dönecek.\n\n*Not: AI servisi geçici olarak yoğun, manuel rapor en kısa sürede mailinize gönderilecek.*`
  }

  // Save to DB
  let savedId = ''
  try {
    const saved = await prisma.roadmapRequest.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        company: body.company,
        sector: body.sector,
        employeeCount: body.employeeCount,
        monthlyRevenue: body.monthlyRevenue || null,
        currentSystems: body.currentSystems,
        goals: body.goals,
        websiteUrl: body.websiteUrl || null,
        generatedReport: report,
      },
    })
    savedId = saved.id

    // Create lead in CRM
    await prisma.lead.create({
      data: {
        type: 'CONTACT',
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        company: body.company,
        message: `AI Yol Haritası talep etti.\nSektör: ${body.sector}\nÇalışan: ${body.employeeCount}\nMevcut sistemler: ${body.currentSystems.join(', ') || '-'}\nHedef: ${body.goals.slice(0, 200)}`,
        source: 'ai-roadmap',
        status: 'NEW',
        tags: ['ai-roadmap', body.sector],
      },
    }).catch((e) => console.warn('Lead create failed:', e))
  } catch (e) {
    console.error('DB save failed:', e)
  }

  // Send email to user with report
  const reportHtml = report
    .replace(/^# (.+)$/gm, '<h1 style="color:#714B67;font-family:system-ui,sans-serif">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 style="color:#1f2937;font-family:system-ui,sans-serif;margin-top:24px">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="color:#374151;font-family:system-ui,sans-serif">$1</h3>')
    .replace(/^- (.+)$/gm, '<li style="margin:6px 0">$1</li>')
    .replace(/(<li.+<\/li>\n?)+/g, (m) => `<ul style="padding-left:20px">${m}</ul>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p style="margin:12px 0">')
    .replace(/^([^<].+)$/gm, '<p style="margin:12px 0;line-height:1.6;color:#374151">$1</p>')

  const userEmailHtml = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:680px;margin:0 auto;padding:24px;background:#fafafa">
      <div style="background:linear-gradient(135deg,#714B67,#3a2436);color:white;padding:32px 24px;border-radius:16px 16px 0 0;text-align:center">
        <div style="font-size:14px;opacity:0.9;margin-bottom:8px;letter-spacing:2px;font-weight:600">KOOZA</div>
        <div style="font-size:24px;font-weight:800">📋 Dijital Dönüşüm Yol Haritanız</div>
        <div style="font-size:14px;opacity:0.8;margin-top:8px">${body.company} için kişiselleştirildi</div>
      </div>
      <div style="background:white;padding:32px 28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px">
        ${reportHtml}
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb">
          <p style="color:#6b7280;font-size:14px;line-height:1.6">
            Merhaba <strong>${body.name}</strong>,<br>
            Bu rapor sizin için kooza'nın AI sistemi tarafından oluşturuldu.
            Detaylı görüşme için aşağıdaki linke tıklayın veya bu maile cevap verin.
          </p>
          <a href="https://kooza.vercel.app/iletisim" style="display:inline-block;margin-top:16px;padding:14px 28px;background:#714B67;color:white;text-decoration:none;border-radius:10px;font-weight:600">
            Ücretsiz Görüşme Talep Et →
          </a>
        </div>
        <div style="margin-top:24px;font-size:12px;color:#9ca3af;text-align:center">
          kooza.tr · İşletmelerin tek dijital partneri
        </div>
      </div>
    </div>
  `

  // Non-blocking sends
  sendEmail({
    to: body.email,
    subject: `📋 ${body.company} için Dijital Dönüşüm Yol Haritanız`,
    html: userEmailHtml,
  }).catch((e) => console.warn('User email failed:', e))

  // Notify admin
  notifyAdmin(
    `🎯 Yeni AI Yol Haritası: ${body.company}`,
    `<div style="font-family:system-ui,sans-serif"><h2>${body.company}</h2><p><strong>Sektör:</strong> ${body.sector}<br><strong>Çalışan:</strong> ${body.employeeCount}<br><strong>Kişi:</strong> ${body.name}<br><strong>Email:</strong> ${body.email}<br><strong>Telefon:</strong> ${body.phone || '-'}<br><strong>Mevcut sistemler:</strong> ${body.currentSystems.join(', ') || '-'}</p><h3>Hedef:</h3><p>${body.goals}</p><h3>Üretilen Rapor:</h3>${reportHtml}</div>`
  ).catch((e) => console.warn('Admin email failed:', e))

  // Mark as sent
  if (savedId) {
    prisma.roadmapRequest.update({ where: { id: savedId }, data: { reportSent: true } }).catch(() => {})
  }

  return NextResponse.json({
    ok: true,
    id: savedId,
    report, // markdown
  })
}
