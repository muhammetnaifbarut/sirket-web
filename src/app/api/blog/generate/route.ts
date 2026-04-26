import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import slugify from 'slugify'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const CATEGORIES = [
  { name: 'Dijital Dönüşüm', slug: 'dijital-donusum' },
  { name: 'ERP', slug: 'erp' },
  { name: 'İşletme Yönetimi', slug: 'isletme-yonetimi' },
  { name: 'Otomasyon', slug: 'otomasyon' },
  { name: 'Yapay Zeka', slug: 'yapay-zeka' },
]

const TOPICS: Record<string, string[]> = {
  'dijital-donusum': [
    'KOBİ\'ler için dijital dönüşüm rehberi',
    'Dijital dönüşümde başarı faktörleri',
    'Geleneksel işletmelerin dijitalleşme yolculuğu',
    'Dijital dönüşüm yatırımının geri dönüşü',
    'İmalat sektöründe dijital dönüşüm',
  ],
  'erp': [
    'ERP sistemi nedir ve işletmenize nasıl katkı sağlar?',
    'ERP entegrasyonunda dikkat edilmesi gerekenler',
    'Bulut tabanlı ERP vs geleneksel ERP karşılaştırması',
    'ERP implementasyonunda yaygın hatalar ve çözümleri',
    'ERP ile iş süreçleri nasıl optimize edilir?',
  ],
  'isletme-yonetimi': [
    'Veri odaklı karar almanın işletme başarısına etkisi',
    'Operasyonel verimlilik artırma stratejileri',
    'Müşteri memnuniyetini teknoloji ile geliştirme',
    'İş zekası araçlarıyla rekabet avantajı elde etme',
    'Küçük işletmelerde süreç yönetimi',
  ],
  'otomasyon': [
    'İş süreçleri otomasyonuna giriş',
    'RPA (Robotik Süreç Otomasyonu) nedir?',
    'Otomasyon ile insan kaynakları yönetimi',
    'Stok yönetiminde otomasyon çözümleri',
    'Müşteri hizmetlerinde otomasyon uygulamaları',
  ],
  'yapay-zeka': [
    'İşletmeler için yapay zeka kullanım alanları',
    'AI destekli müşteri hizmetlerinin geleceği',
    'Makine öğrenmesi ile talep tahmini',
    'Yapay zeka ile satış performansı artırma',
    'ChatGPT ve benzeri AI araçlarını iş dünyasında kullanma',
  ],
}

export async function POST(req: NextRequest) {
  // Cron job veya admin tarafından tetiklenebilir
  const authHeader = req.headers.get('authorization')
  const isCronJob = authHeader === `Bearer ${process.env.CRON_SECRET}`

  if (!isCronJob) {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }
  }

  const body = await req.json().catch(() => ({}))
  const { categorySlug, topic: customTopic, publish = false } = body

  // Kategori seç
  const category = categorySlug
    ? CATEGORIES.find((c) => c.slug === categorySlug)
    : CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]

  if (!category) {
    return NextResponse.json({ error: 'Geçersiz kategori' }, { status: 400 })
  }

  // Konu seç
  const topicsForCategory = TOPICS[category.slug]
  const topic =
    customTopic ||
    topicsForCategory[Math.floor(Math.random() * topicsForCategory.length)]

  // Blog kategorisini DB'de bul veya oluştur
  let dbCategory = await prisma.blogCategory.findUnique({
    where: { slug: category.slug },
  })
  if (!dbCategory) {
    dbCategory = await prisma.blogCategory.create({
      data: {
        name: category.name,
        slug: category.slug,
        description: `${category.name} hakkında makaleler`,
      },
    })
  }

  // AI ile blog içeriği üret
  const prompt = `Türkçe olarak aşağıdaki konu hakkında profesyonel ve SEO uyumlu bir blog yazısı yaz:

Konu: "${topic}"
Kategori: ${category.name}
Yazar: Dr. Muhammet Naif BARUT

Gereksinimler:
1. Başlık (SEO uyumlu, dikkat çekici)
2. Özet/Excerpt (2-3 cümle, okuyucuyu çekecek)
3. Ana içerik (en az 600 kelime, markdown formatında):
   - Giriş paragrafı
   - 3-5 ana başlık (## ile)
   - Her başlık altında detaylı açıklama
   - Pratik öneriler ve örnekler
   - İşletmelere yönelik somut tavsiyelere
   - kooza'nın hizmetlerine doğal bir şekilde değin (zorlamadan)
   - Sonuç paragrafı
4. Meta açıklama (SEO için, 150-160 karakter)

Yanıtı tam olarak şu JSON formatında ver (başka hiçbir şey yazma):
{
  "title": "...",
  "excerpt": "...",
  "content": "...",
  "metaDesc": "..."
}`

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })

  const rawText =
    response.content[0].type === 'text' ? response.content[0].text : ''

  let parsed: {
    title: string
    excerpt: string
    content: string
    metaDesc: string
  }

  try {
    // JSON bloğu varsa çıkar
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('JSON bulunamadı')
    parsed = JSON.parse(jsonMatch[0])
  } catch {
    return NextResponse.json(
      { error: 'AI yanıtı işlenemedi', raw: rawText },
      { status: 500 }
    )
  }

  // Slug oluştur (benzersiz)
  let baseSlug = slugify(parsed.title, { lower: true, strict: true, locale: 'tr' })
  let slug = baseSlug
  let counter = 1
  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`
  }

  // Blog yazısını kaydet
  const post = await prisma.blogPost.create({
    data: {
      title: parsed.title,
      slug,
      excerpt: parsed.excerpt,
      content: parsed.content,
      metaTitle: parsed.title,
      metaDesc: parsed.metaDesc,
      status: publish ? 'PUBLISHED' : 'DRAFT',
      featured: false,
      authorId: 'Dr. Muhammet Naif BARUT',
      categoryId: dbCategory.id,
      publishedAt: publish ? new Date() : null,
    },
  })

  return NextResponse.json({
    success: true,
    post: {
      id: post.id,
      title: post.title,
      slug: post.slug,
      status: post.status,
      category: category.name,
    },
  })
}
