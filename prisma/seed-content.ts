/**
 * Comprehensive content seed for kooza — fills the public site with
 * professional, conversion-oriented copy.
 *
 * Run: npx tsx prisma/seed-content.ts
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ──────────────────────────────────────────────────────────────────────────────
// SITE SETTINGS — hero, contact, social, SEO, footer
// ──────────────────────────────────────────────────────────────────────────────
const SETTINGS: Array<{ key: string; value: string; group: string }> = [
  // GENERAL
  { key: 'site_name',        value: 'kooza', group: 'general' },
  { key: 'site_tagline',     value: 'İşletmenin tüm yazılımları, tek platformda.', group: 'general' },
  { key: 'site_description', value: 'KOBİ\'lerin yazılım ve danışmanlık partneri. Randevu, stok, CRM, finans ve İK için ayrı ayrı yazılım kullanmayı bırak. kooza ile her şey bir akıllı platformda — daha hızlı, daha akıllı, daha ucuz.', group: 'general' },

  // HERO
  { key: 'hero_badge',          value: "Türkiye'nin yeni nesil işletme platformu", group: 'hero' },
  { key: 'hero_title',          value: 'İşletmenin tüm yazılımları,\ntek platformda', group: 'hero' },
  { key: 'hero_subtitle',       value: '5 ayrı yazılıma para vermeyi bırak. CRM, stok, randevu, finans ve İK için ihtiyacın olan her şey kooza\'da. 5 dakikada kur, 14 gün ücretsiz dene.', group: 'hero' },
  { key: 'hero_cta_label',      value: '14 Gün Ücretsiz Başla', group: 'hero' },
  { key: 'hero_cta_url',        value: '/demo', group: 'hero' },
  { key: 'hero_secondary_label', value: 'Ürünleri İncele', group: 'hero' },
  { key: 'hero_secondary_url',   value: '/yazilimlar', group: 'hero' },

  // CONTACT
  { key: 'site_email',   value: 'info@kooza.com.tr', group: 'contact' },
  { key: 'site_phone',   value: '+90 850 305 56 56', group: 'contact' },
  { key: 'site_address', value: 'Maslak Mahallesi, Büyükdere Caddesi No:255, Sarıyer / İstanbul', group: 'contact' },
  { key: 'tax_office',   value: 'Sarıyer V.D.', group: 'contact' },
  { key: 'tax_no',       value: '5550000123', group: 'contact' },

  // SOCIAL
  { key: 'social_linkedin',  value: 'https://linkedin.com/company/kooza', group: 'social' },
  { key: 'social_twitter',   value: 'https://twitter.com/kooza_tr', group: 'social' },
  { key: 'social_instagram', value: 'https://instagram.com/kooza.tr', group: 'social' },
  { key: 'social_youtube',   value: 'https://youtube.com/@kooza', group: 'social' },

  // INTEGRATIONS
  { key: 'whatsapp_enabled', value: 'true',  group: 'integrations' },
  { key: 'whatsapp_number',  value: '+908503055656', group: 'integrations' },
  { key: 'whatsapp_message', value: 'Merhaba kooza, bilgi almak istiyorum.', group: 'integrations' },

  // SEO
  { key: 'seo_default_title',       value: 'kooza — KOBİ\'lerin tek platformu | Yazılım & Danışmanlık', group: 'seo' },
  { key: 'seo_default_description', value: '500+ KOBİ\'nin tercih ettiği işletme platformu. Randevu, stok, CRM, finans ve İK tek panelde. 14 gün ücretsiz dene.', group: 'seo' },
  { key: 'site_keywords',           value: 'KOBİ yazılım, dijital dönüşüm, randevu sistemi, stok takip, CRM, finans yönetimi, İK yazılım, işletme platformu, SaaS Türkiye', group: 'seo' },

  // FOOTER
  { key: 'footer_text', value: '© 2026 kooza. Türkiye\'de tasarlandı, dünyada büyütülüyor.', group: 'footer' },

  // SECTION VISIBILITY
  { key: 'section_clients_visible',      value: 'true', group: 'sections' },
  { key: 'section_modules_visible',      value: 'true', group: 'sections' },
  { key: 'section_products_visible',     value: 'true', group: 'sections' },
  { key: 'section_sectors_visible',      value: 'true', group: 'sections' },
  { key: 'section_video_visible',        value: 'false', group: 'sections' },
  { key: 'section_testimonials_visible', value: 'true', group: 'sections' },
  { key: 'section_cta_visible',          value: 'true', group: 'sections' },

  // CTA
  { key: 'cta_badge',    value: '🎉 Şubat ayına özel: ilk 3 ay %30 indirim', group: 'cta' },
  { key: 'cta_title',    value: 'Bugün başla,\nyarın fark yarat.', group: 'cta' },
  { key: 'cta_subtitle', value: '500+ KOBİ\'nin yaptığını sen de yap. 14 gün ücretsiz, kredi kartı yok, kurulum 5 dakika.', group: 'cta' },
  { key: 'cta_btn1_label', value: 'Ücretsiz Başla', group: 'cta' },
  { key: 'cta_btn1_url',   value: '/demo', group: 'cta' },
  { key: 'cta_btn2_label', value: 'Demo Görüşmesi Planla', group: 'cta' },
  { key: 'cta_btn2_url',   value: '/iletisim', group: 'cta' },
  { key: 'cta_trust1', value: '14 gün ücretsiz' },
  { key: 'cta_trust2', value: 'Kredi kartı yok' },
  { key: 'cta_trust3', value: 'İlk ay para iadesi' },
  { key: 'cta_trust4', value: '5 dakikada kurulum' },
]

const SETTINGS_DEFAULT_GROUP = 'general'

// ──────────────────────────────────────────────────────────────────────────────
// HERO TICKER — live activity messages
// ──────────────────────────────────────────────────────────────────────────────
const TICKER = [
  { emoji: '👥', text: 'Bu hafta 87 yeni KOBİ kooza ailesine katıldı', order: 1 },
  { emoji: '⚡', text: 'Bugün 12.847 randevu otomatik oluşturuldu', order: 2 },
  { emoji: '📦', text: '3.4 milyon ürün anlık stok takibinde', order: 3 },
  { emoji: '💼', text: '500+ KOBİ kooza ile zaman kazanıyor', order: 4 },
  { emoji: '⏱️', text: 'Ortalama kurulum süresi: 5 dakika', order: 5 },
  { emoji: '🎯', text: '%98.7 müşteri memnuniyeti', order: 6 },
  { emoji: '💰', text: 'Müşteriler ortalama %42 yazılım maliyeti tasarrufu sağlıyor', order: 7 },
  { emoji: '🚀', text: '7 sektörde uzmanlaşmış çözümler', order: 8 },
]

// ──────────────────────────────────────────────────────────────────────────────
// HERO STATS — number cards
// ──────────────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '500+',  label: 'Aktif KOBİ', color: '#714B67', order: 1 },
  { value: '%42',   label: 'Maliyet Tasarrufu', color: '#714B67', order: 2 },
  { value: '%98.7', label: 'Memnuniyet', color: '#714B67', order: 3 },
  { value: '24/7',  label: 'Uzman Desteği', color: '#714B67', order: 4 },
]

// ──────────────────────────────────────────────────────────────────────────────
// CLIENT LOGOS — realistic company names by sector
// ──────────────────────────────────────────────────────────────────────────────
const CLIENTS = [
  { name: 'Klinika Sağlık', order: 1 },
  { name: 'Mavi Ufuk Lojistik', order: 2 },
  { name: 'Anadolu Endüstri', order: 3 },
  { name: 'StokPro Mağazaları', order: 4 },
  { name: 'Bahar Eğitim Kurumları', order: 5 },
  { name: 'Atölye Konsept', order: 6 },
  { name: 'Filiz Perakende', order: 7 },
  { name: 'Esnaf+ Kooperatifi', order: 8 },
  { name: 'Doğru Kapı Gayrimenkul', order: 9 },
  { name: 'Yeni Çağ Restoran Grubu', order: 10 },
]

// ──────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS — realistic, sector-specific stories
// ──────────────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Dr. Selin Yılmaz',
    role: 'Klinik Sahibi',
    company: 'Klinika Sağlık · İstanbul',
    content: 'Randevu sisteminden e-reçeteye, hastadan stoğa kadar her şey tek panelde. Eskiden 3 farklı program kullanıyorduk — şimdi sadece kooza. No-show oranımız %18\'den %4\'e düştü.',
    rating: 5,
    order: 1,
  },
  {
    name: 'Mehmet Aksoy',
    role: 'Genel Müdür',
    company: 'Mavi Ufuk Lojistik · İzmir',
    content: 'Filo takibi, fatura yönetimi, müşteri ilişkileri — hepsi tek yerde. Aylık operasyonel sürede %35 tasarruf sağladık. Ekibim sevdi, ben sevdim.',
    rating: 5,
    order: 2,
  },
  {
    name: 'Ayşe Demir',
    role: 'Kurucu Ortak',
    company: 'StokPro Mağazaları',
    content: '12 mağazamızın stoğunu gerçek zamanlı görmek hayal gibiydi. kooza ile artık gerçek. Ölü stok %60 azaldı, sipariş hızı 2 katına çıktı.',
    rating: 5,
    order: 3,
  },
  {
    name: 'Burak Öztürk',
    role: 'CEO',
    company: 'Atölye Konsept Mimarlık',
    content: 'Müşteriden teklife, projeden faturaya tüm süreç tek akışta. Manuel tablolar tarihe karıştı. Geri dönüş süremiz 4 günden 8 saate indi.',
    rating: 5,
    order: 4,
  },
  {
    name: 'Fatma Kaya',
    role: 'İK Müdürü',
    company: 'Anadolu Endüstri',
    content: 'İK modülü beklediğimden çok daha güçlü çıktı. 80 kişilik ekibimizin izin, bordro ve performans takibi tek dashboarddan. Her sabah 1 saat tasarruf.',
    rating: 5,
    order: 5,
  },
  {
    name: 'Eren Şimşek',
    role: 'İşletme Sahibi',
    company: 'Yeni Çağ Restoran Grubu',
    content: '5 şubemiz var, hepsi farklı ihtiyaçta. kooza her birine özelleştirildi. Aylık fatura ne yazılıma ne danışmana — tek partnere ödüyorum.',
    rating: 5,
    order: 6,
  },
  {
    name: 'Zeynep Aydın',
    role: 'Pazarlama Direktörü',
    company: 'Bahar Eğitim Kurumları',
    content: 'CRM\'imiz, satış pipeline\'ımız, e-posta otomasyonumuz hepsi kooza\'da. Lead conversion oranımız ilk ayda %18\'den %29\'a yükseldi.',
    rating: 5,
    order: 7,
  },
  {
    name: 'Hakan Yıldız',
    role: 'Şube Müdürü',
    company: 'Esnaf+ Kooperatifi',
    content: 'Üye işletmelerimizin %70\'i kooza\'ya geçti. Kullanım oranı çok yüksek çünkü gerçekten kolay. Müşteri hizmetlerinden tek mesajda dönüş alıyoruz.',
    rating: 5,
    order: 8,
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// PROCESS STEPS — how kooza works
// ──────────────────────────────────────────────────────────────────────────────
const PROCESS = [
  {
    title: 'Tanışma',
    description: 'İhtiyacını dinleriz. 30 dakikalık ücretsiz görüşmeyle senin işine en uygun modülleri belirleriz.',
    icon: '👋',
    step: 1,
    color: '#714B67',
  },
  {
    title: 'Kurulum',
    description: '5 dakikada hesabını açarız. Modülleri otomatik kurarız. İlk gün içinde kullanmaya başlarsın.',
    icon: '⚡',
    step: 2,
    color: '#714B67',
  },
  {
    title: 'Veri Aktarımı',
    description: 'Mevcut müşteri, stok, ürün verilerini güvenle yeni sisteme taşırız. Hiçbir şey kaybolmaz.',
    icon: '📂',
    step: 3,
    color: '#714B67',
  },
  {
    title: 'Eğitim',
    description: 'Ekibine canlı online eğitim veririz. Adım adım kullanım rehberi + video kütüphanesi paylaşırız.',
    icon: '🎓',
    step: 4,
    color: '#714B67',
  },
  {
    title: 'Süreklilik',
    description: '7/24 uzman destek. Her ay yeni özellikler. Büyüdükçe sistem büyür, sen büyürken yanındadır.',
    icon: '🚀',
    step: 5,
    color: '#714B67',
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// WHY US ITEMS — competitive advantages
// ──────────────────────────────────────────────────────────────────────────────
const WHY_US = [
  {
    title: 'Hepsi-Bir-Arada',
    description: '5-6 farklı yazılıma para vermek yok. CRM, stok, randevu, finans, İK — hepsi tek platformda, tek faturada.',
    icon: '🎯',
    color: '#714B67',
    order: 1,
  },
  {
    title: 'Türkiye\'ye Özel',
    description: 'KVKK, e-Fatura, e-Arşiv, GİB entegrasyonları yerli firmaların işine yarayacak şekilde hazır. Türkçe destek, Türk vergi kurallarıyla uyumlu.',
    icon: '🇹🇷',
    color: '#714B67',
    order: 2,
  },
  {
    title: '5 Dakikada Kurulum',
    description: 'Eski yazılımları kurmak haftalar süren işkenceden farklı. kooza\'da hesap aç, modülünü seç, kullanmaya başla. Geçiş ekibimiz veriyi taşır.',
    icon: '⚡',
    color: '#714B67',
    order: 3,
  },
  {
    title: 'Yazılım + Danışmanlık',
    description: 'Sadece sana yazılım vermiyoruz. 10 yıllık tecrübeyle "nasıl daha verimli olabilirsin" sorusuna da cevap veriyoruz.',
    icon: '🧠',
    color: '#714B67',
    order: 4,
  },
  {
    title: '7/24 Türkçe Destek',
    description: 'WhatsApp, telefon, e-posta — istediğin kanaldan yaz. Robot değil, gerçek uzman ekip. Ortalama yanıt süresi 8 dakika.',
    icon: '💬',
    color: '#714B67',
    order: 5,
  },
  {
    title: '%98.7 Memnuniyet',
    description: '500+ KOBİ\'den aldığımız geri bildirim. Müşterilerimizin %78\'i bizi başkalarına öneriyor. Aylık ortalama 14 referans tavsiyesi.',
    icon: '⭐',
    color: '#714B67',
    order: 6,
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// FAQ — common questions
// ──────────────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    question: 'kooza nedir?',
    answer: 'kooza, KOBİ\'ler için tasarlanmış hepsi-bir-arada işletme platformudur. CRM, stok, randevu, finans, İK ve daha fazlası tek bir akıllı sistemde toplanır. Yazılım + danışmanlık birlikte sunulur.',
    order: 1,
    isActive: true,
  },
  {
    question: '14 gün ücretsiz deneme nasıl çalışıyor?',
    answer: 'Kredi kartı vermeden hesap açabilirsin. 14 gün boyunca tüm modüllere tam erişimin olur. Süre sonunda istediğin planı seçer veya devam etmezsin — para çekilmez.',
    order: 2,
    isActive: true,
  },
  {
    question: 'Mevcut sistemimden veriyi nasıl taşırım?',
    answer: 'Geçiş ekibimiz Excel, eski yazılım veya başka kaynaklardan veriyi otomatik aktarır. Müşteri, stok, fatura geçmişi — hiçbir şey kaybolmaz. Genelde 24-48 saatte tamamlanır.',
    order: 3,
    isActive: true,
  },
  {
    question: 'Aylık fiyat ne kadar?',
    answer: 'Starter ₺499/ay (5 kullanıcı), Professional ₺999/ay (20 kullanıcı), Enterprise ₺2.499/ay (sınırsız). Her plan 14 gün ücretsiz başlar. Detaylar fiyatlandırma sayfamızda.',
    order: 4,
    isActive: true,
  },
  {
    question: 'Hangi cihazlardan kullanabilirim?',
    answer: 'Web tarayıcı (Chrome, Safari, Edge, Firefox), iOS ve Android mobil uygulama. Verilerin gerçek zamanlı senkronize olur. Çevrimdışı modda da çalışabilir.',
    order: 5,
    isActive: true,
  },
  {
    question: 'Verilerim güvende mi?',
    answer: 'Verilerin Türkiye\'deki sunucularda KVKK uyumlu şekilde saklanır. Günlük yedekleme, SSL şifreleme, iki faktörlü kimlik doğrulama. ISO 27001 sertifikamız mevcuttur.',
    order: 6,
    isActive: true,
  },
  {
    question: 'Sözleşme yapmam gerekiyor mu?',
    answer: 'Hayır. Aylık aboneliktir, sözleşme yok. İstediğin zaman iptal edebilirsin. Yıllık ödeme yaparsan %20 indirim kazanırsın.',
    order: 7,
    isActive: true,
  },
  {
    question: 'Kaç kullanıcı ekleyebilirim?',
    answer: 'Plana göre değişir: Starter 5, Professional 20, Enterprise sınırsız. Plan değişikliği anlıktır.',
    order: 8,
    isActive: true,
  },
  {
    question: 'Hangi entegrasyonlar var?',
    answer: 'e-Fatura/e-Arşiv (GİB), banka entegrasyonları (İş Bankası, Garanti, Akbank, Yapı Kredi), kargo (Yurtiçi, MNG, Aras), pazaryeri (Trendyol, Hepsiburada, n11), iyzico, PayTR, Google Workspace, Microsoft 365, Zapier.',
    order: 9,
    isActive: true,
  },
  {
    question: 'Sektörüme özel çözüm var mı?',
    answer: 'Sağlık, perakende, lojistik, eğitim, finans, üretim ve hizmet sektörlerine özel modül paketlerimiz var. Sektörünü seç, sana özel kurulum yapalım.',
    order: 10,
    isActive: true,
  },
  {
    question: 'Eğitim veriyor musunuz?',
    answer: 'Evet. Kurulum sonrası 1 saat ücretsiz canlı eğitim. Devamında video kütüphanesi, interaktif rehberler ve ihtiyaç halinde özel danışmanlık.',
    order: 11,
    isActive: true,
  },
  {
    question: 'Mevcut yazılımım iyi çalışıyor, neden değişeyim?',
    answer: '5 farklı yazılıma para verip her birini ayrı yönetmek zaman ve para kaybı. kooza ile aylık ortalama %42 maliyet tasarrufu, 8-12 saat zaman tasarrufu sağlıyorsun. İlk ay denersin, beğenmezsen para iadesi.',
    order: 12,
    isActive: true,
  },
  {
    question: 'Para iadesi politikası nedir?',
    answer: 'İlk 30 gün içinde, herhangi bir sebep göstermeden iade talep edebilirsin. Para 5-7 iş günü içinde hesabına döner.',
    order: 13,
    isActive: true,
  },
  {
    question: 'API erişimi var mı?',
    answer: 'Professional ve Enterprise planlarda RESTful API ve webhook desteği. Kendi yazılımlarınla entegre olur.',
    order: 14,
    isActive: true,
  },
  {
    question: 'Yatırımcılar veya muhasebeciler kullanabilir mi?',
    answer: 'Evet. Mali müşavir veya yatırımcılarına salt-okunur erişim verebilirsin. Onlar canlı raporları görür, sen kontrolü kaybetmezsin.',
    order: 15,
    isActive: true,
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Seeding kooza professional content...\n')

  // 1. Settings
  console.log('→ Site settings')
  for (const s of SETTINGS) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group ?? SETTINGS_DEFAULT_GROUP },
      create: { key: s.key, value: s.value, group: s.group ?? SETTINGS_DEFAULT_GROUP },
    })
  }
  console.log(`  ✓ ${SETTINGS.length} settings`)

  // 2. Hero ticker
  console.log('→ Hero ticker')
  await prisma.heroTicker.deleteMany()
  await prisma.heroTicker.createMany({ data: TICKER.map((t) => ({ ...t, isActive: true })) })
  console.log(`  ✓ ${TICKER.length} ticker items`)

  // 3. Hero stats
  console.log('→ Hero stats')
  await prisma.heroStat.deleteMany()
  await prisma.heroStat.createMany({ data: STATS.map((s) => ({ ...s, isActive: true })) })
  console.log(`  ✓ ${STATS.length} stats`)

  // 4. Clients
  console.log('→ Clients')
  await prisma.client.deleteMany()
  for (const c of CLIENTS) {
    await prisma.client.create({ data: { name: c.name, order: c.order, isActive: true } })
  }
  console.log(`  ✓ ${CLIENTS.length} clients`)

  // 5. Testimonials
  console.log('→ Testimonials')
  await prisma.testimonial.deleteMany()
  for (const t of TESTIMONIALS) {
    await prisma.testimonial.create({ data: { ...t, isActive: true } })
  }
  console.log(`  ✓ ${TESTIMONIALS.length} testimonials`)

  // 6. Process steps
  console.log('→ Process steps')
  await prisma.processStep.deleteMany()
  for (const p of PROCESS) {
    await prisma.processStep.create({ data: { ...p, isActive: true } })
  }
  console.log(`  ✓ ${PROCESS.length} process steps`)

  // 7. Why us
  console.log('→ Why us items')
  await prisma.whyUsItem.deleteMany()
  for (const w of WHY_US) {
    await prisma.whyUsItem.create({ data: { ...w, isActive: true } })
  }
  console.log(`  ✓ ${WHY_US.length} why-us items`)

  // 8. FAQ
  console.log('→ FAQ')
  await prisma.siteFaq.deleteMany()
  for (const f of FAQS) {
    await prisma.siteFaq.create({ data: f })
  }
  console.log(`  ✓ ${FAQS.length} FAQs`)

  console.log('\n✅ Done. Site is now content-rich.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
