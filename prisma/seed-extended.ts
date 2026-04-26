import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CASES = [
  {
    company: 'Klinika Sağlık', slug: 'klinika-saglik', sector: 'Sağlık',
    sectorColor: 'bg-rose-50 text-rose-700 border-rose-100',
    challenge: '3 farklı yazılımla yönetilen randevu, hasta dosyası ve faturalama. Hatalar, no-show oranı %18, personel ekstra mesai.',
    solution: 'kooza Randevu + CRM + Finans modülleri devreye alındı. Online randevu, otomatik SMS hatırlatma, e-Reçete entegrasyonu.',
    results: [
      { icon: 'trending-up', label: 'No-show oranı', from: '%18', to: '%4' },
      { icon: 'clock', label: 'Personel zaman tasarrufu', from: '0', to: '12 saat/hafta' },
      { icon: 'users', label: 'Aktif hasta artışı', from: '850', to: '1.420' },
    ],
    quote: 'Eskiden 3 program açmak için saat harcıyorduk. Şimdi her şey tek panelde. No-show oranımız %18\'den %4\'e düştü.',
    person: 'Dr. Selin Yılmaz', role: 'Klinik Sahibi', timeframe: '6 ay', order: 1,
  },
  {
    company: 'Mavi Ufuk Lojistik', slug: 'mavi-ufuk', sector: 'Lojistik',
    sectorColor: 'bg-blue-50 text-blue-700 border-blue-100',
    challenge: '120 araçlık filo Excel ve telefonla yönetiliyordu. Yakıt takibi yok, müşteri talep yönetimi karmaşık, fatura gecikmeleri.',
    solution: 'CRM + Stok + Finans entegrasyonu. Mobil app ile sürücü takibi, otomatik fatura kesme, müşteri portalı.',
    results: [
      { icon: 'trending-up', label: 'Operasyonel verimlilik', from: '0', to: '+%35' },
      { icon: 'clock', label: 'Fatura kesme süresi', from: '3 gün', to: '15 dk' },
      { icon: 'users', label: 'Müşteri memnuniyeti', from: '%72', to: '%94' },
    ],
    quote: 'Filo takibinden faturaya kadar her şey tek yerde. Aylık 35 saat tasarruf, ekibin morali zirvede.',
    person: 'Mehmet Aksoy', role: 'Genel Müdür', timeframe: '4 ay', order: 2,
  },
  {
    company: 'StokPro Mağazaları', slug: 'stokpro', sector: 'Perakende',
    sectorColor: 'bg-amber-50 text-amber-700 border-amber-100',
    challenge: '12 mağaza, 8.000 SKU. Stok eşitsiz dağılıyor, ölü stok birikiyor. Mağaza arası transfer manuel yapılıyor.',
    solution: 'Stok modülü + barkod sistemi + tedarikçi entegrasyonu. Otomatik mağazalar arası transfer önerisi.',
    results: [
      { icon: 'trending-up', label: 'Ölü stok azalması', from: '₺850K', to: '₺340K' },
      { icon: 'clock', label: 'Sipariş hazırlama', from: '4 saat', to: '45 dk' },
      { icon: 'users', label: 'Stok doğruluğu', from: '%84', to: '%99.2' },
    ],
    quote: '12 mağazanın stoğunu gerçek zamanlı görmek hayal gibiydi. Şimdi gerçek. Ölü stok %60 azaldı.',
    person: 'Ayşe Demir', role: 'Kurucu Ortak', timeframe: '8 ay', order: 3,
  },
  {
    company: 'Atölye Konsept Mimarlık', slug: 'atolye-konsept', sector: 'Hizmet',
    sectorColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    challenge: 'Müşteri taleplerinden teklife, projeden faturaya tüm süreç manuel. Geri dönüş süresi 4 gün, fırsat kaybı yüksek.',
    solution: 'CRM pipeline + proje yönetimi + finans. Otomatik teklif şablonları, e-imza, online ödeme entegrasyonu.',
    results: [
      { icon: 'trending-up', label: 'Lead conversion', from: '%18', to: '%34' },
      { icon: 'clock', label: 'Teklif geri dönüş', from: '4 gün', to: '8 saat' },
      { icon: 'users', label: 'Aylık yeni müşteri', from: '8', to: '23' },
    ],
    quote: 'Müşteriden teklife, projeden faturaya tüm süreç tek akışta. Manuel tablolar tarihe karıştı.',
    person: 'Burak Öztürk', role: 'CEO', timeframe: '5 ay', order: 4,
  },
]

const JOBS = [
  {
    title: 'Senior Full-Stack Engineer', slug: 'senior-fullstack',
    department: 'Mühendislik', location: 'İstanbul / Uzaktan', type: 'Tam zamanlı',
    description: 'kooza ürün ekibinde Next.js + TypeScript + PostgreSQL stack\'i ile çalışacak senior geliştirici arıyoruz. Mimari kararlardan kod incelemesine kadar geniş etki alanı.',
    requirements: ['5+ yıl JavaScript/TypeScript', 'React + Next.js deneyimi', 'PostgreSQL + Prisma', 'AWS/Vercel deployment', 'Test odaklı geliştirme'],
    isRemote: true, order: 1,
  },
  {
    title: 'Product Designer (UX/UI)', slug: 'product-designer',
    department: 'Tasarım', location: 'İstanbul', type: 'Tam zamanlı',
    description: 'kooza\'nın 12+ modülü için tutarlı, kullanıcı dostu deneyim tasarlayacak ürün tasarımcısı. Figma + design system + kullanıcı araştırması.',
    requirements: ['3+ yıl SaaS/B2B tasarım', 'Figma uzmanı', 'Design system kurma', 'Kullanıcı araştırması', 'Tasarım sistemi yönetimi'],
    isRemote: false, order: 2,
  },
  {
    title: 'Customer Success Manager', slug: 'customer-success',
    department: 'Müşteri Başarısı', location: 'Uzaktan', type: 'Tam zamanlı',
    description: '500+ KOBİ\'mizin kooza\'dan en iyi şekilde faydalanmasını sağlayacak ekibe katıl. Onboarding, eğitim, sürekli destek.',
    requirements: ['SaaS müşteri yönetimi deneyimi', 'B2B iletişim becerisi', 'Türkçe + İngilizce', 'Süreç yönetimi', 'CRM araç deneyimi'],
    isRemote: true, order: 3,
  },
  {
    title: 'Growth Marketing Lead', slug: 'growth-marketing',
    department: 'Pazarlama', location: 'İstanbul / Uzaktan', type: 'Tam zamanlı',
    description: 'kooza\'nın büyüme stratejisini yönetecek pazarlama lideri. SEO, content, paid acquisition, lifecycle email.',
    requirements: ['B2B SaaS pazarlama (3+ yıl)', 'Google Ads + Meta Ads', 'SEO + content strategy', 'Analytics + attribution', 'Marketing automation'],
    isRemote: true, order: 4,
  },
  {
    title: 'DevOps Engineer', slug: 'devops',
    department: 'Mühendislik', location: 'Uzaktan', type: 'Tam zamanlı',
    description: 'kooza altyapısını ölçeklendirecek DevOps mühendisi. Vercel, AWS, monitoring, security.',
    requirements: ['AWS/GCP deneyimi', 'CI/CD pipeline', 'Monitoring (Datadog/Sentry)', 'PostgreSQL ops', 'Security best practices'],
    isRemote: true, order: 5,
  },
]

const PRESS = [
  {
    title: 'kooza, Türkiye\'nin yeni nesil işletme platformu olarak 500. KOBİ\'ye ulaştı',
    outlet: 'Webrazzi', date: new Date('2026-03-15'),
    excerpt: 'Sağlık, perakende, lojistik ve hizmet sektörlerinden 500\'den fazla işletmenin tercih ettiği kooza, KOBİ\'lere yönelik hepsi-bir-arada platform stratejisiyle dikkat çekiyor.',
    url: 'https://webrazzi.com', order: 1,
  },
  {
    title: 'Doktor girişimci Muhammet Naif BARUT\'tan KOBİ\'lere dijital dönüşüm sözü',
    outlet: 'Hürriyet İnsan Kaynakları', date: new Date('2026-02-20'),
    excerpt: 'Kendi kliniğinin yazılım derdine son veren Dr. BARUT, kooza ile Türkiye\'deki 3 milyon KOBİ\'nin de aynı sorunu çözmek istiyor.',
    url: 'https://hurriyet.com.tr', order: 2,
  },
  {
    title: 'Yerli SaaS yıldızı kooza, ISO 27001 sertifikasını aldı',
    outlet: 'Bloomberg HT', date: new Date('2026-01-10'),
    excerpt: 'KVKK uyumlu altyapısıyla bilinen kooza, uluslararası bilgi güvenliği standardı ISO 27001\'i de portföyüne ekledi.',
    url: 'https://bloomberght.com', order: 3,
  },
]

const INTEGRATIONS = [
  // Banka
  { name: 'İş Bankası', slug: 'is-bankasi', category: 'Banka', logo: '🏦', isPopular: true, order: 1 },
  { name: 'Garanti BBVA', slug: 'garanti', category: 'Banka', logo: '🏦', isPopular: true, order: 2 },
  { name: 'Akbank', slug: 'akbank', category: 'Banka', logo: '🏦', order: 3 },
  { name: 'Yapı Kredi', slug: 'yapi-kredi', category: 'Banka', logo: '🏦', order: 4 },
  // Ödeme
  { name: 'iyzico', slug: 'iyzico', category: 'Ödeme', logo: '💳', isPopular: true, order: 5 },
  { name: 'PayTR', slug: 'paytr', category: 'Ödeme', logo: '💳', order: 6 },
  { name: 'Stripe', slug: 'stripe', category: 'Ödeme', logo: '💳', order: 7 },
  // Pazaryeri
  { name: 'Trendyol', slug: 'trendyol', category: 'Pazaryeri', logo: '🛍️', isPopular: true, order: 8 },
  { name: 'Hepsiburada', slug: 'hepsiburada', category: 'Pazaryeri', logo: '🛍️', isPopular: true, order: 9 },
  { name: 'n11', slug: 'n11', category: 'Pazaryeri', logo: '🛍️', order: 10 },
  // Kargo
  { name: 'Yurtiçi Kargo', slug: 'yurtici', category: 'Kargo', logo: '📦', order: 11 },
  { name: 'MNG Kargo', slug: 'mng', category: 'Kargo', logo: '📦', order: 12 },
  { name: 'Aras Kargo', slug: 'aras', category: 'Kargo', logo: '📦', order: 13 },
  // E-Fatura
  { name: 'GİB e-Fatura', slug: 'gib', category: 'E-Fatura', logo: '📄', isPopular: true, order: 14 },
  { name: 'GİB e-Arşiv', slug: 'gib-arsiv', category: 'E-Fatura', logo: '📄', isPopular: true, order: 15 },
  // Iletişim
  { name: 'WhatsApp Business', slug: 'whatsapp', category: 'İletişim', logo: '💬', isPopular: true, order: 16 },
  { name: 'NetGSM SMS', slug: 'netgsm', category: 'İletişim', logo: '💬', order: 17 },
  // Üretkenlik
  { name: 'Google Workspace', slug: 'google', category: 'Üretkenlik', logo: '📧', order: 18 },
  { name: 'Microsoft 365', slug: 'ms365', category: 'Üretkenlik', logo: '📧', order: 19 },
  { name: 'Zapier', slug: 'zapier', category: 'Üretkenlik', logo: '⚡', order: 20 },
]

async function main() {
  console.log('Seeding extended content...\n')

  console.log('→ Case studies')
  await prisma.caseStudy.deleteMany()
  for (const c of CASES) {
    await prisma.caseStudy.create({ data: { ...c, isActive: true } as any })
  }
  console.log(`  ✓ ${CASES.length} case studies`)

  console.log('→ Job postings')
  await prisma.jobPosting.deleteMany()
  for (const j of JOBS) {
    await prisma.jobPosting.create({ data: { ...j, isActive: true } as any })
  }
  console.log(`  ✓ ${JOBS.length} job postings`)

  console.log('→ Press items')
  await prisma.pressItem.deleteMany()
  for (const p of PRESS) {
    await prisma.pressItem.create({ data: { ...p, isActive: true } })
  }
  console.log(`  ✓ ${PRESS.length} press items`)

  console.log('→ Integrations')
  await prisma.integration.deleteMany()
  for (const i of INTEGRATIONS) {
    await prisma.integration.create({ data: { ...i, isActive: true } })
  }
  console.log(`  ✓ ${INTEGRATIONS.length} integrations`)

  console.log('\n✅ Done.')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
