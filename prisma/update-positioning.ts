import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function run() {
  const updates: Record<string, string> = {
    hero_badge: 'Dijital dönüşüm + sektörel otomasyon + web çözümleri',
    hero_title: 'Şirketinizi uçtan uca\ndijitalleştiriyoruz',
    hero_subtitle: 'Web sitesi, sektörel otomasyon sistemleri, insan kaynakları, muhasebe, CRM, pazarlama ve dijital dönüşüm danışmanlığı — tek partnerden.',
    hero_cta_label: 'Ücretsiz Dijital Dönüşüm Görüşmesi',
    site_description: 'kooza — Şirketler için web sitesi, sektörel otomasyon sistemleri, insan kaynakları, danışmanlık ve teknik hizmet. Klinik, restoran, market, eğitim, perakende, hizmet ve daha fazlası.',
    seo_default_description: 'Şirketler için web tasarım, sektörel otomasyon sistemleri (randevu, restoran, market, eğitim, klinik), insan kaynakları, CRM, muhasebe ve dijital dönüşüm danışmanlığı. Tek partnerden uçtan uca dijitalleşme.',
    site_keywords: 'web tasarım, kurumsal web sitesi, dijital dönüşüm, sektörel otomasyon, randevu sistemi, restoran otomasyonu, market otomasyonu, eğitim sistemi, klinik otomasyonu, insan kaynakları yazılımı, CRM, muhasebe yazılımı, KOBİ dijitalleşme, danışmanlık',
    cta_title: 'Şirketinizi dijitalleştirelim',
    cta_subtitle: "Web sitenizden otomasyona, İK'dan muhasebeye — tek bir teknoloji partneri ile uçtan uca dijital dönüşüm. Ücretsiz analiz görüşmesi alın.",
  }
  for (const [key, value] of Object.entries(updates)) {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value, group: 'general' },
    })
  }
  console.log(`✅ ${Object.keys(updates).length} ayar güncellendi`)

  await prisma.siteModule.deleteMany()
  const modules = [
    { name: 'Web Sitesi & E-Ticaret', slug: 'web', href: '/yazilimlar/web', description: 'Kurumsal site, blog, e-ticaret, landing page — SEO uyumlu, hızlı, mobil-öncelikli.', icon: 'Globe', iconColor: '#714B67', bgColor: '#f7f2f5', order: 1 },
    { name: 'Randevu & Müşteri Sistemi', slug: 'randevu', href: '/yazilimlar/randevu', description: 'Online rezervasyon, takvim, SMS hatırlatma — klinik, kuaför, danışmanlık, servis için.', icon: 'CalendarCheck', iconColor: '#2563eb', bgColor: '#eff6ff', order: 2 },
    { name: 'Restoran & Kafe Otomasyonu', slug: 'restoran', href: '/yazilimlar/restoran', description: 'Adisyon, kasa, masa yönetimi, kurye entegrasyonu, mutfak ekranı.', icon: 'UtensilsCrossed', iconColor: '#ea580c', bgColor: '#fff7ed', order: 3 },
    { name: 'Market & Perakende', slug: 'market', href: '/yazilimlar/market', description: 'Barkod, kasa, stok, fiyat etiketi, sadakat — tek noktadan zincir yönetimi.', icon: 'ShoppingCart', iconColor: '#16a34a', bgColor: '#f0fdf4', order: 4 },
    { name: 'Eğitim & Kurs Sistemi', slug: 'egitim', href: '/yazilimlar/egitim', description: 'Öğrenci kayıt, ders programı, online sınav, devam takibi, veli portalı.', icon: 'GraduationCap', iconColor: '#4f46e5', bgColor: '#eef2ff', order: 5 },
    { name: 'Klinik & Sağlık', slug: 'klinik', href: '/yazilimlar/klinik', description: 'Hasta dosyası, e-Reçete, MHRS, randevu, laboratuvar entegrasyonu.', icon: 'Stethoscope', iconColor: '#dc2626', bgColor: '#fef2f2', order: 6 },
    { name: 'İnsan Kaynakları', slug: 'ik', href: '/yazilimlar/ik', description: 'Personel, bordro, izin, mesai, performans, işe alım — tek panelde.', icon: 'Users', iconColor: '#0891b2', bgColor: '#ecfeff', order: 7 },
    { name: 'Muhasebe & Finans', slug: 'muhasebe', href: '/yazilimlar/muhasebe', description: 'e-Fatura, e-Arşiv, cari, banka, çek-senet, gelir-gider, GİB entegre.', icon: 'Calculator', iconColor: '#059669', bgColor: '#ecfdf5', order: 8 },
    { name: 'Stok & Depo', slug: 'stok', href: '/yazilimlar/stok', description: 'Çoklu depo, sayım, transfer, seri-parti, FIFO/LIFO, barkod.', icon: 'Package', iconColor: '#d97706', bgColor: '#fffbeb', order: 9 },
    { name: 'CRM & Satış', slug: 'crm', href: '/yazilimlar/crm', description: 'Müşteri kartı, satış pipeline, teklif, anlaşma, tekrar müşteri otomasyonu.', icon: 'UserCheck', iconColor: '#db2777', bgColor: '#fdf2f8', order: 10 },
    { name: 'Pazarlama Otomasyon', slug: 'pazarlama', href: '/yazilimlar/pazarlama', description: 'E-posta, SMS, WhatsApp kampanya, segment, A/B test, kupon, sadakat.', icon: 'Megaphone', iconColor: '#e11d48', bgColor: '#fff1f2', order: 11 },
    { name: 'Dijital Dönüşüm Danışmanlık', slug: 'danismanlik', href: '/cozumler', description: 'Süreç analizi, yazılım seçimi, eğitim, kurulum, teknik destek — uçtan uca.', icon: 'Lightbulb', iconColor: '#ca8a04', bgColor: '#fefce8', order: 12 },
  ]
  await prisma.siteModule.createMany({ data: modules })
  console.log(`✅ ${modules.length} modül güncellendi`)

  await prisma.heroTicker.deleteMany()
  const tickers = [
    { text: '🌐 Kurumsal web siteleri & e-ticaret çözümleri', order: 1 },
    { text: '📅 Randevu sistemleri — klinik, kuaför, servis için', order: 2 },
    { text: '🍽️ Restoran-kafe için adisyon, kasa, kurye', order: 3 },
    { text: '🛒 Market-perakende için kasa + stok + barkod', order: 4 },
    { text: '🎓 Eğitim kurumları için öğrenci & sınav sistemi', order: 5 },
    { text: '🏥 Klinikler için hasta dosyası + e-Reçete + MHRS', order: 6 },
    { text: '👥 İnsan Kaynakları — bordro, izin, performans', order: 7 },
    { text: '🧾 Muhasebe & e-Fatura — GİB tam uyumlu', order: 8 },
    { text: '📦 Stok & depo yönetimi — çoklu lokasyon', order: 9 },
    { text: '💡 Dijital dönüşüm danışmanlığı + teknik hizmet', order: 10 },
  ]
  await prisma.heroTicker.createMany({ data: tickers })
  console.log(`✅ ${tickers.length} ticker mesajı güncellendi`)

  await prisma.$disconnect()
}
run().catch(e => { console.error(e); process.exit(1) })
