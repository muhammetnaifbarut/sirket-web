import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin kullanıcısı
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@operx.com' },
    update: {},
    create: {
      email: 'admin@operx.com',
      name: 'Site Admin',
      password: adminPassword,
      role: UserRole.SUPER_ADMIN,
    },
  })
  console.log('✅ Admin kullanıcı oluşturuldu:', admin.email)

  // Tema ayarları
  await prisma.themeSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6',
      accentColor: '#10B981',
      fontSans: 'Inter',
      fontHeading: 'Inter',
      darkMode: false,
      borderRadius: 'rounded-lg',
      buttonStyle: 'filled',
      layout: 'default',
    },
  })

  // Site ayarları
  const settings = [
    { key: 'site_name', value: 'OperX', group: 'general' },
    { key: 'site_tagline', value: 'Yazılım & Danışmanlık Çözümleri', group: 'general' },
    { key: 'site_description', value: 'Kurumsal yazılım ve dijital dönüşüm danışmanlığı ile işletmenizi geleceğe taşıyoruz.', group: 'general' },
    { key: 'site_email', value: 'info@operx.com', group: 'contact' },
    { key: 'site_phone', value: '+90 212 555 0100', group: 'contact' },
    { key: 'site_address', value: 'Maslak Mah. Büyükdere Cad. No:123, Sarıyer/İstanbul', group: 'contact' },
    { key: 'site_logo', value: '', group: 'general' },
    { key: 'site_favicon', value: '', group: 'general' },
    { key: 'whatsapp_number', value: '+905551234567', group: 'integrations' },
    { key: 'whatsapp_message', value: 'Merhaba, bilgi almak istiyorum.', group: 'integrations' },
    { key: 'whatsapp_enabled', value: 'true', group: 'integrations' },
    { key: 'social_facebook', value: 'https://facebook.com/techcorp', group: 'social' },
    { key: 'social_twitter', value: 'https://twitter.com/techcorp', group: 'social' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/techcorp', group: 'social' },
    { key: 'social_instagram', value: 'https://instagram.com/techcorp', group: 'social' },
    { key: 'social_youtube', value: '', group: 'social' },
    { key: 'hero_title', value: 'İşletmenizi Dijital Dönüşüme Taşıyın', group: 'hero' },
    { key: 'hero_subtitle', value: 'Güçlü yazılım çözümleri ve uzman danışmanlık hizmetleriyle rekabet avantajı kazanın.', group: 'hero' },
    { key: 'hero_cta_label', value: 'Demo Talep Edin', group: 'hero' },
    { key: 'hero_cta_url', value: '/demo', group: 'hero' },
    { key: 'hero_secondary_label', value: 'Çözümleri İnceleyin', group: 'hero' },
    { key: 'hero_secondary_url', value: '/yazilimlar', group: 'hero' },
    { key: 'hero_bg_image', value: '', group: 'hero' },
    { key: 'footer_text', value: '© 2024 OperX. Tüm hakları saklıdır.', group: 'footer' },
    { key: 'analytics_ga_id', value: '', group: 'analytics' },
    { key: 'seo_default_title', value: 'OperX - Yazılım & Danışmanlık', group: 'seo' },
    { key: 'seo_default_description', value: 'Kurumsal yazılım ve danışmanlık çözümleri', group: 'seo' },
    { key: 'maintenance_mode', value: 'false', group: 'general' },
  ]

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    })
  }
  console.log('✅ Site ayarları oluşturuldu')

  // Menü öğeleri
  const menuItems = [
    { label: 'Ana Sayfa', url: '/', order: 1, location: 'header' },
    { label: 'Yazılımlar', url: '/yazilimlar', order: 2, location: 'header' },
    { label: 'Danışmanlık', url: '/danismanlik', order: 3, location: 'header' },
    { label: 'Blog', url: '/blog', order: 4, location: 'header' },
    { label: 'İletişim', url: '/iletisim', order: 7, location: 'header' },
    { label: 'Demo Talep Et', url: '/demo', order: 8, location: 'header' },
  ]

  for (const item of menuItems) {
    const exists = await prisma.menuItem.findFirst({ where: { url: item.url, location: item.location } })
    if (!exists) {
      await prisma.menuItem.create({ data: item })
    }
  }
  console.log('✅ Menü öğeleri oluşturuldu')

  // Ürünler
  const products = [
    {
      name: 'Randevu Sistemi',
      slug: 'randevu-sistemi',
      tagline: 'Akıllı Randevu Yönetimi',
      description: 'Müşterilerinizin kolayca randevu almasını sağlayan, personel ve kaynak planlamasını otomatikleştiren gelişmiş randevu yönetim sistemi.',
      features: [
        'Online randevu alma',
        'SMS & E-posta hatırlatıcıları',
        'Personel takvim yönetimi',
        'Çoklu lokasyon desteği',
        'Mobil uygulama',
        'Entegrasyon API',
        'Detaylı raporlama',
      ],
      icon: 'calendar',
      badge: 'Popüler',
      order: 1,
    },
    {
      name: 'Stok Takip',
      slug: 'stok-takip',
      tagline: 'Akıllı Envanter Yönetimi',
      description: 'Gerçek zamanlı stok takibi, otomatik sipariş yönetimi ve depo optimizasyonu ile envanter süreçlerinizi modernleştirin.',
      features: [
        'Gerçek zamanlı stok takibi',
        'Barkod & QR kod desteği',
        'Otomatik yenileme siparişleri',
        'Çok depolu yönetim',
        'Tedarikçi entegrasyonu',
        'Maliyet analizi',
        'ERP entegrasyonu',
      ],
      icon: 'package',
      order: 2,
    },
    {
      name: 'CRM Sistemi',
      slug: 'crm',
      tagline: 'Müşteri İlişkileri Yönetimi',
      description: '360° müşteri görünümü, satış pipeline yönetimi ve otomatik pazarlama araçlarıyla müşteri ilişkilerinizi güçlendirin.',
      features: [
        '360° müşteri profili',
        'Satış pipeline yönetimi',
        'Otomatik e-posta kampanyaları',
        'Görev ve aktivite takibi',
        'Raporlama & dashboard',
        'Mobil CRM',
        'Entegrasyon seçenekleri',
      ],
      icon: 'users',
      badge: 'Yeni',
      order: 3,
    },
    {
      name: 'Finans Yönetimi',
      slug: 'finans',
      tagline: 'Kurumsal Finans Çözümleri',
      description: 'Gelir-gider takibi, fatura yönetimi, bütçe planlaması ve finansal raporlama ile mali süreçlerinizi dijitalleştirin.',
      features: [
        'Gelir-gider takibi',
        'Otomatik fatura oluşturma',
        'Bütçe planlama',
        'Vergi hesaplama',
        'Banka entegrasyonu',
        'Mali tablolar',
        'e-Fatura desteği',
      ],
      icon: 'trending-up',
      order: 4,
    },
    {
      name: 'HR Yönetimi',
      slug: 'hr',
      tagline: 'İnsan Kaynakları Platformu',
      description: 'Personel takibi, izin yönetimi, performans değerlendirme ve bordro hesaplama ile HR süreçlerinizi verimli hale getirin.',
      features: [
        'Personel sicil yönetimi',
        'İzin & puantaj takibi',
        'Performans değerlendirme',
        'Bordro hesaplama',
        'Eğitim yönetimi',
        'Organizasyon şeması',
        'Belge yönetimi',
      ],
      icon: 'briefcase',
      order: 5,
    },
  ]

  for (const p of products) {
    const exists = await prisma.product.findFirst({ where: { slug: p.slug } })
    if (!exists) {
      await prisma.product.create({
        data: {
          ...p,
          pricing: {
            create: [
              {
                name: 'Starter',
                monthlyPrice: 299,
                yearlyPrice: 2990,
                features: ['5 kullanıcı', 'Temel özellikler', 'E-posta desteği'],
                isPopular: false,
              },
              {
                name: 'Professional',
                monthlyPrice: 599,
                yearlyPrice: 5990,
                features: ['25 kullanıcı', 'Tüm özellikler', 'Öncelikli destek', 'API erişimi'],
                isPopular: true,
              },
              {
                name: 'Enterprise',
                monthlyPrice: 1499,
                yearlyPrice: 14990,
                features: ['Sınırsız kullanıcı', 'Özel entegrasyonlar', 'Dedicated destek', 'SLA garantisi'],
                isPopular: false,
              },
            ],
          },
        },
      })
    }
  }
  console.log('✅ Ürünler oluşturuldu')

  // Danışmanlık hizmetleri
  const services = [
    {
      name: 'İşletme Analizi',
      slug: 'isletme-analizi',
      description: 'Mevcut iş süreçlerinizi analiz ederek iyileştirme fırsatlarını belirliyoruz.',
      features: ['Süreç haritalama', 'KPI belirleme', 'Verimlilik analizi', 'Risk değerlendirme'],
      icon: 'bar-chart',
      order: 1,
    },
    {
      name: 'Dijital Dönüşüm',
      slug: 'dijital-donusum',
      description: 'İşletmenizi dijital çağa taşıyacak kapsamlı dönüşüm stratejileri geliştiriyoruz.',
      features: ['Dijital strateji', 'Teknoloji seçimi', 'Değişim yönetimi', 'ROI analizi'],
      icon: 'zap',
      order: 2,
    },
    {
      name: 'KPI Yönetimi',
      slug: 'kpi-yonetimi',
      description: 'Doğru metrikleri belirleyerek işletme performansınızı ölçün ve optimize edin.',
      features: ['KPI tasarımı', 'Dashboard geliştirme', 'Raporlama sistemi', 'Performans izleme'],
      icon: 'target',
      order: 3,
    },
    {
      name: 'Süreç Optimizasyonu',
      slug: 'surec-optimizasyonu',
      description: 'İş süreçlerinizdeki darboğazları tespit ederek verimliliği artırıyoruz.',
      features: ['Lean metodoloji', 'Otomasyon fırsatları', 'Maliyet azaltma', 'Kalite iyileştirme'],
      icon: 'settings',
      order: 4,
    },
    {
      name: 'Eğitim & Koçluk',
      slug: 'egitim-kocluk',
      description: 'Ekibinizi dijital araçlar ve modern yönetim teknikleri konusunda eğitiyoruz.',
      features: ['Özel müfredat', 'Uygulamalı eğitim', 'Sertifikasyon', 'Uzaktan eğitim'],
      icon: 'book-open',
      order: 5,
    },
  ]

  for (const s of services) {
    const exists = await prisma.service.findFirst({ where: { slug: s.slug } })
    if (!exists) {
      await prisma.service.create({
        data: {
          ...s,
          packages: {
            create: [
              {
                name: 'Temel Paket',
                price: 5000,
                duration: '1 ay',
                features: ['2 gün analiz', 'Rapor', 'Sunum'],
                isPopular: false,
              },
              {
                name: 'Kapsamlı Paket',
                price: 15000,
                duration: '3 ay',
                features: ['Tam analiz', 'Uygulama planı', 'Aylık takip', 'Danışman desteği'],
                isPopular: true,
              },
            ],
          },
        },
      })
    }
  }
  console.log('✅ Danışmanlık hizmetleri oluşturuldu')

  // Fiyatlandırma planları
  const plans = [
    {
      name: 'Starter',
      description: 'Küçük işletmeler için ideal başlangıç paketi',
      monthlyPrice: 499,
      yearlyPrice: 4990,
      features: [
        '3 yazılım modülü',
        '10 kullanıcı',
        '5 GB depolama',
        'E-posta desteği',
        'Temel raporlar',
        'Standart entegrasyonlar',
      ],
      limitations: ['API erişimi yok', 'Özel geliştirme yok'],
      isPopular: false,
      order: 1,
    },
    {
      name: 'Professional',
      description: 'Büyüyen işletmeler için güçlü çözüm',
      monthlyPrice: 999,
      yearlyPrice: 9990,
      features: [
        'Tüm yazılım modülleri',
        '50 kullanıcı',
        '50 GB depolama',
        'Öncelikli destek',
        'Gelişmiş raporlar',
        'Tüm entegrasyonlar',
        'API erişimi',
        'Özel marka',
      ],
      limitations: [],
      isPopular: true,
      order: 2,
    },
    {
      name: 'Enterprise',
      description: 'Kurumsal şirketler için tam çözüm',
      monthlyPrice: 2499,
      yearlyPrice: 24990,
      features: [
        'Tüm Professional özellikler',
        'Sınırsız kullanıcı',
        'Sınırsız depolama',
        'Dedicated destek',
        'Özel geliştirme',
        'SLA garantisi',
        'Yerinde kurulum',
        'Eğitim programı',
      ],
      limitations: [],
      isPopular: false,
      order: 3,
    },
  ]

  for (const plan of plans) {
    const exists = await prisma.pricingPlan.findFirst({ where: { name: plan.name } })
    if (!exists) {
      await prisma.pricingPlan.create({ data: plan })
    }
  }
  console.log('✅ Fiyatlandırma planları oluşturuldu')

  // Referanslar (Testimonials)
  const testimonials = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Genel Müdür',
      company: 'ABC Holding',
      content: 'OperX\'un CRM çözümü sayesinde satışlarımız %40 arttı. Ekip desteği mükemmel.',
      rating: 5,
      order: 1,
    },
    {
      name: 'Fatma Demir',
      role: 'Operasyon Direktörü',
      company: 'XYZ Lojistik',
      content: 'Stok yönetimi sistemimiz artık çok daha verimli. Maliyetlerimizi ciddi oranda düşürdük.',
      rating: 5,
      order: 2,
    },
    {
      name: 'Mehmet Kaya',
      role: 'CEO',
      company: 'StartupTR',
      content: 'Dijital dönüşüm danışmanlığı sürecimiz çok başarılı geçti. Kesinlikle öneriyorum.',
      rating: 5,
      order: 3,
    },
  ]

  for (const t of testimonials) {
    const exists = await prisma.testimonial.findFirst({ where: { name: t.name } })
    if (!exists) {
      await prisma.testimonial.create({ data: t })
    }
  }
  console.log('✅ Referanslar oluşturuldu')

  // Blog kategorileri
  const categories = [
    { name: 'Dijital Dönüşüm', slug: 'dijital-donusum', color: '#3B82F6' },
    { name: 'Yazılım', slug: 'yazilim', color: '#8B5CF6' },
    { name: 'Danışmanlık', slug: 'danismanlik', color: '#10B981' },
    { name: 'Sektör Haberleri', slug: 'sektor-haberleri', color: '#F59E0B' },
  ]

  for (const cat of categories) {
    await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log('✅ Blog kategorileri oluşturuldu')

  // Sektörler
  const sectors = [
    { name: 'Sağlık', slug: 'saglik', description: 'Hastane ve klinikler için özel çözümler', icon: 'heart', order: 1 },
    { name: 'Perakende', slug: 'perakende', description: 'Mağaza ve e-ticaret yönetimi', icon: 'shopping-cart', order: 2 },
    { name: 'Lojistik', slug: 'lojistik', description: 'Taşıma ve depo yönetim sistemleri', icon: 'truck', order: 3 },
    { name: 'Finans', slug: 'finans', description: 'Banka ve fintech çözümleri', icon: 'dollar-sign', order: 4 },
    { name: 'Eğitim', slug: 'egitim', description: 'Okul ve eğitim kurumları için platformlar', icon: 'book', order: 5 },
    { name: 'Üretim', slug: 'uretim', description: 'Fabrika ve üretim yönetimi', icon: 'cpu', order: 6 },
  ]

  for (const s of sectors) {
    await prisma.sector.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    })
  }
  console.log('✅ Sektörler oluşturuldu')

  console.log('\n🎉 Seed tamamlandı!')
  console.log('\n📋 Giriş bilgileri:')
  console.log('   Email: admin@operx.com')
  console.log('   Şifre: admin123')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
