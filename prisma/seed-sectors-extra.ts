/**
 * Ek sektör çözüm sayfaları:
 * - Diş Hekimi (klinik alt-dikey)
 * - Veteriner Kliniği
 * - Güzellik Salonu / Berber
 * - E-Ticaret (Trendyol/Hepsiburada vurgusu)
 */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const sectors = [
  {
    slug: 'dis-hekimi',
    name: 'Diş Hekimi & Estetik Diş',
    tagline: 'Diş hekimi muayenehaneleri ve estetik diş klinikleri için özel hasta yönetimi.',
    heroBadge: 'Diş Hekimi Çözümü',
    heroTitle: 'Muayenehanenizi\ndiş hekimine özel sistemle yönetin',
    heroSubtitle: 'Diş tablosu (odontogram), tedavi planı, panoramik röntgen, ödeme planı, randevu hatırlatma — diş hekimliğine özel tasarlanmış tek panel. Hasta gelir, sistem zaten her şeyi hazırlamış olur.',
    icon: 'Smile',
    iconColor: '#0891b2',
    bgColor: '#cffafe',
    problems: [
      { title: 'Diş tablosu kağıtta, kayıp gidiyor', description: 'Hangi dişe ne tedavi yapıldı geçmişi 5 dk arıyor.', icon: 'FileX' },
      { title: 'Tedavi planı ve ödeme planı ayrı sistemlerde', description: 'Hasta "ne kaldı, ne ödedim" sorusuna net cevap alamıyor.', icon: 'Repeat' },
      { title: 'Panoramik/periapikal röntgenler dağınık', description: 'Bilgisayarın klasörlerinde, arar bulamazsınız.', icon: 'Image' },
      { title: 'Randevu unutmaları ve no-show', description: 'Estetik tedavilerde 1 saatlik no-show = 1500 TL kayıp.', icon: 'CalendarOff' },
    ],
    features: [
      { title: 'Dijital Diş Tablosu (Odontogram)', description: 'Her diş için durum, tedavi geçmişi, planlanan işlem — görsel arayüz.', icon: 'Smile' },
      { title: 'Tedavi Planı & Ödeme Planı', description: 'Çok seanslı tedavileri planlayın, ödeme takvimi otomatik.', icon: 'ClipboardList' },
      { title: 'Görüntü Arşivi (Panoramik/Periapikal)', description: 'Röntgen, intraoral, foto her hasta kartında. Karşılaştırmalı görünüm.', icon: 'Image' },
      { title: 'Otomatik Randevu Hatırlatma', description: 'WhatsApp + SMS + email — no-show oranı %78 azalır.', icon: 'Bell' },
      { title: 'e-Reçete & e-Rapor', description: 'Sağlık Bakanlığı entegre, antibiyotik raporları otomatik.', icon: 'Pill' },
      { title: 'Online Ödeme & Taksit', description: 'POS, taksit, banka transferi — ödenmemiş tedavi takibi.', icon: 'CreditCard' },
    ],
    benefits: [
      { label: 'No-show oranı', value: '-%78', description: 'WhatsApp/SMS otomatik hatırlatma.' },
      { label: 'Hasta dosyası açma', value: '5×', description: 'Tek tıkla geçmiş tedaviler.' },
      { label: 'Ödenmemiş tedavi takibi', value: '+%92', description: 'Otomatik takip ve hatırlatma.' },
      { label: 'Aylık zaman tasarrufu', value: '35 saat', description: 'Sekretarya iş yükü azalır.' },
    ],
    modules: [
      { name: 'Odontogram', description: 'Dijital diş tablosu, geçmiş.' },
      { name: 'Tedavi & Ödeme Planı', description: 'Çok seanslı plan + taksit.' },
      { name: 'Görüntü Arşivi', description: 'Panoramik, periapikal, foto.' },
      { name: 'Randevu Hatırlatma', description: 'WhatsApp + SMS otomatik.' },
      { name: 'e-Reçete', description: 'Sağlık Bakanlığı entegre.' },
      { name: 'Online Ödeme', description: 'POS + taksit + raporlama.' },
    ],
    faqs: [
      { question: 'Birden fazla diş hekimi için kullanıcı yönetimi var mı?', answer: 'Evet. Her hekimin kendi takvimi, hasta listesi ve performans raporu olur. Asistanlar için ayrı yetki seviyesi.' },
      { question: 'Estetik diş klinikleri için özel modül var mı?', answer: 'Evet. Estetik vakalarında öncesi/sonrası foto karşılaştırma, tedavi paketleri ve kampanya yönetimi mevcut.' },
      { question: 'Mevcut hasta verilerimi nasıl taşırım?', answer: 'Excel veya eski yazılımdan ücretsiz veri taşıma yapıyoruz. Genelde 1-2 iş gününde hazır.' },
      { question: 'Periapikal/panoramik röntgen cihazımla entegre olur mu?', answer: 'En yaygın markalarla (Carestream, Planmeca, Vatech, Sirona) DICOM uyumlu entegrasyon mevcut.' },
      { question: 'KVKK uyumlu mu?', answer: 'Evet. Sağlık verisi özel kategori — KVKK uyumlu altyapı, şifreli yedek, ISO 27001 sertifikalı sunucu.' },
    ],
    ctaTitle: 'Diş muayenehanenizi dijitalleştirin',
    ctaSubtitle: '15 dakikalık demo görüşmesi — diş hekimliğine özel sistemi canlı gösterelim.',
    seoTitle: 'Diş Hekimi Yazılımı | Hasta Yönetim Sistemi | kooza',
    seoDescription: 'Diş hekimi muayenehaneleri için odontogram, tedavi planı, panoramik röntgen arşivi, randevu hatırlatma ve ödeme takibi — tek sistemde. Ücretsiz demo.',
    order: 7,
  },
  {
    slug: 'veteriner',
    name: 'Veteriner Kliniği',
    tagline: 'Veteriner kliniği ve pet shop için hayvan kayıt sistemi, aşı takvimi, mama satışı — hepsi tek pakette.',
    heroBadge: 'Veteriner Çözümü',
    heroTitle: 'Veteriner kliniğinizi\nbaştan sona dijitalleştirin',
    heroSubtitle: 'Hayvan profili, aşı takvimi, tedavi geçmişi, mama/aksesuar stok ve satış, sahip iletişimi — veteriner hekimliğe özel tasarlanmış sistem. Patiler memnun, sahipler rahat, kasanız düzenli.',
    icon: 'Dog',
    iconColor: '#16a34a',
    bgColor: '#dcfce7',
    problems: [
      { title: 'Hayvan kayıtları kağıtta, geçmiş aşı bilgisi karışık', description: 'Sahibi "geçen seneki aşı ne zaman?" sorduğunda 10 dk arıyor.', icon: 'FileX' },
      { title: 'Aşı hatırlatması manuel — unutuluyor', description: 'Sahip aşıyı geç yaptırıyor, ek satış kaybı.', icon: 'CalendarOff' },
      { title: 'Mama ve aksesuar stoğu klinikten ayrı sistemde', description: 'Tedavi anında satışla birlikte stok düşmüyor.', icon: 'PackageX' },
      { title: 'Sahip iletişimi WhatsApp\'ta dağınık', description: 'Hangi sahip kim, hangi hayvan kimin — karışıyor.', icon: 'MessageSquareWarning' },
    ],
    features: [
      { title: 'Hayvan Profili', description: 'Tür, ırk, doğum tarihi, kilo geçmişi, alerjiler — tek kart.', icon: 'Heart' },
      { title: 'Aşı Takvimi & Otomatik Hatırlatma', description: 'Aşı dönemi yaklaştığında sahibe SMS/WhatsApp otomatik.', icon: 'Syringe' },
      { title: 'Tedavi Geçmişi & Reçete', description: 'Operasyonlar, ilaç, vitamin — kronolojik kart.', icon: 'Stethoscope' },
      { title: 'Mama & Aksesuar Satışı (POS)', description: 'Stok takipli satış. Tedaviyle birlikte tek faturada.', icon: 'ShoppingBag' },
      { title: 'Sahip Yönetimi (CRM)', description: 'Birden fazla hayvanı olan sahibi tek profilde tutun.', icon: 'Users' },
      { title: 'Online Randevu', description: 'Sahipler 7/24 randevu alır, kliniğe çağrı azalır.', icon: 'CalendarCheck' },
    ],
    benefits: [
      { label: 'Aşı takip oranı', value: '+%84', description: 'Otomatik hatırlatma ile.' },
      { label: 'Mama satışı (cross-sell)', value: '+%47', description: 'Tedavi sırasında öneri.' },
      { label: 'Sahip iletişim hatası', value: '-%92', description: 'Tek profil, tüm geçmiş.' },
      { label: 'No-show oranı', value: '-%65', description: 'WhatsApp hatırlatma.' },
    ],
    modules: [
      { name: 'Hayvan Profili', description: 'Tür, ırk, kilo, alerji.' },
      { name: 'Aşı Takvimi', description: 'Otomatik hatırlatma.' },
      { name: 'Tedavi Geçmişi', description: 'Kronolojik kart.' },
      { name: 'Mama & Aksesuar Satışı', description: 'Stok takipli POS.' },
      { name: 'Sahip CRM', description: 'Çoklu hayvan yönetimi.' },
      { name: 'Online Randevu', description: '7/24 erişim.' },
    ],
    faqs: [
      { question: 'Mama/aksesuar stoğum binlerce kalem — sisteme nasıl yüklerim?', answer: 'Excel\'den ücretsiz toplu yükleme yapıyoruz. Barkod okuyucuyla saniyede 5 ürün eklenir.' },
      { question: 'Pet shop ve klinik aynı yerde — tek sistemden yönetebilir miyim?', answer: 'Evet. Klinik (tedavi/aşı) + Pet shop (mama/aksesuar) tek panelden, ayrı raporlamayla.' },
      { question: 'Sahibe SMS/WhatsApp gönderimi ücretli mi?', answer: 'WhatsApp ücretsiz (kendi numaranızdan). SMS aylık paket — 1000 SMS yaklaşık 50 TL.' },
      { question: 'Birden fazla veteriner çalışıyor, takvim çakışması olur mu?', answer: 'Hayır. Her hekimin kendi takvimi, sistem otomatik çakışma kontrolü yapar.' },
      { question: 'Hayvan resmi/röntgen yükleyebilir miyim?', answer: 'Evet. Her hayvan kartına sınırsız foto/röntgen/rapor eklenebilir.' },
    ],
    ctaTitle: 'Veteriner kliniğinizi büyütelim',
    ctaSubtitle: '15 dakikalık demo — kliniğinize özel kurulumu birlikte planlayalım.',
    seoTitle: 'Veteriner Kliniği Yazılımı | Pet Shop Yönetimi | kooza',
    seoDescription: 'Veteriner kliniği için hayvan kayıt, aşı takvimi, tedavi geçmişi, mama/aksesuar satışı — tek sistem. Ücretsiz demo.',
    order: 8,
  },
  {
    slug: 'guzellik-salonu',
    name: 'Güzellik Salonu & Kuaför',
    tagline: 'Güzellik salonu, kuaför, berber ve estetik merkezleri için randevu, sadakat ve sosyal medya yönetimi.',
    heroBadge: 'Güzellik & Estetik Çözümü',
    heroTitle: 'Salonunuzu\nakıllı şekilde büyütün',
    heroSubtitle: 'Stilist takvimi, online randevu, müşteri sadakat puanı, Instagram entegrasyonu, foto öncesi/sonrası galeri, hediye çeki — salonunuza özel hizmet otomasyonu. Müşteri tekrar gelir, sosyal medyanız zenginleşir.',
    icon: 'Scissors',
    iconColor: '#db2777',
    bgColor: '#fce7f3',
    problems: [
      { title: 'Randevular telefon/Instagram DM\'den karışık geliyor', description: 'Aynı saate iki müşteri, kayıp randevu, çift book.', icon: 'CalendarOff' },
      { title: 'Stilistlerin takvimleri ayrı tutuluyor', description: 'Hangi stilist müsait bilmek için 3 yere bakılıyor.', icon: 'Users' },
      { title: 'Sadakat puanı ve indirim manuel', description: 'Müşteri "ben kaç gelmiştim?" diye soruyor, kayıp.', icon: 'Gift' },
      { title: 'Öncesi/sonrası fotoğrafları telefonda dağınık', description: 'Sosyal medya paylaşımı için her seferinde arıyorsunuz.', icon: 'ImageOff' },
    ],
    features: [
      { title: 'Stilist Takvimi & Online Randevu', description: 'Müşteri stilistini, hizmetini, saatini seçer; sistem çakışmayı engeller.', icon: 'CalendarCheck' },
      { title: 'Müşteri Sadakat Puanı', description: 'Her ziyarette puan kazanır, indirimle döner. Otomatik takip.', icon: 'Gift' },
      { title: 'Foto Öncesi/Sonrası Galeri', description: 'Her müşterinin tedavi geçmişi görsel arşivde. Sosyal medyaya tek tık.', icon: 'Image' },
      { title: 'WhatsApp Otomatik Hatırlatma', description: '24 saat önce ve gün başında hatırlatma. No-show -%75.', icon: 'MessageSquare' },
      { title: 'Hediye Çeki & Kampanya', description: 'Online hediye çeki satışı, doğum günü kampanyası otomatik.', icon: 'Sparkles' },
      { title: 'Stok & Ürün Satışı', description: 'Şampuan, boya, makyaj — POS\'la entegre satış.', icon: 'ShoppingBag' },
    ],
    benefits: [
      { label: 'Tekrar gelen müşteri', value: '+%62', description: 'Sadakat sistemi ile.' },
      { label: 'Aylık ek satış (cross-sell)', value: '+%34', description: 'Hizmet sırasında ürün önerisi.' },
      { label: 'No-show oranı', value: '-%75', description: 'WhatsApp hatırlatma.' },
      { label: 'Instagram etkileşim', value: '+%48', description: 'Foto galeri otomatik paylaşım.' },
    ],
    modules: [
      { name: 'Online Randevu', description: 'Stilist + saat + hizmet seçimi.' },
      { name: 'Sadakat Puanı', description: 'Otomatik puan + indirim.' },
      { name: 'Foto Galeri', description: 'Öncesi/sonrası arşivi.' },
      { name: 'WhatsApp Hatırlatma', description: 'Otomatik mesaj.' },
      { name: 'Hediye Çeki', description: 'Online satış + barkod.' },
      { name: 'Ürün Satışı', description: 'POS + stok takibi.' },
    ],
    faqs: [
      { question: 'Instagram bio\'ma randevu linki koyabilir miyim?', answer: 'Evet. Salonunuza özel /sizin-salonunuz.kooza.tr randevu linki — Instagram bio, story, post hepsinde paylaşılabilir.' },
      { question: 'Birden fazla stilist çalışıyor — herkesin ayrı takvimi olabilir mi?', answer: 'Evet. Her stilistin kendi müsaitliği, hizmet listesi ve fiyatı olur. Müşteri seçerken görür.' },
      { question: 'Sadakat puanı sistemi nasıl çalışır?', answer: 'Her ziyarette müşteri otomatik puan kazanır (örn: 100 TL = 10 puan). Belli puanda indirim/hediye. Kart yok, telefon numarası yeter.' },
      { question: 'Sosyal medyaya foto paylaşmak için izin almak gerekiyor mu?', answer: 'Sistem otomatik izin formu sunuyor — müşteri onaylarsa galeride paylaşılabilir, KVKK uyumlu.' },
      { question: 'Kuaför / berber / SPA gibi farklı işletmelerde çalışır mı?', answer: 'Evet. Kuaför, berber, güzellik salonu, SPA, manikür stüdyosu, lazer epilasyon merkezi — hepsi için optimize.' },
    ],
    ctaTitle: 'Salonunuzu büyütelim',
    ctaSubtitle: '15 dakikalık demo — salonunuza özel sistemi canlı gösterelim.',
    seoTitle: 'Güzellik Salonu Yazılımı | Kuaför Randevu Sistemi | kooza',
    seoDescription: 'Güzellik salonu, kuaför, berber için stilist takvimi, online randevu, sadakat puanı, Instagram entegrasyonu — tek sistem. Ücretsiz demo.',
    order: 9,
  },
  {
    slug: 'e-ticaret',
    name: 'E-Ticaret & Pazaryeri',
    tagline: 'Trendyol, Hepsiburada, N11, Amazon entegrasyonu, kargo otomasyonu, çoklu satış kanalı yönetimi.',
    heroBadge: 'E-Ticaret Çözümü',
    heroTitle: 'Pazaryeri ve mağazanızı\ntek panelden yönetin',
    heroSubtitle: 'Trendyol, Hepsiburada, N11, Amazon, kendi siteniz — siparişleriniz, stoğunuz, kargonuz tek ekranda. Stok bir yerde tükenmiş diğerinde 100 olmuyor. Saatlerce kazanılan zaman, satışa giderdi.',
    icon: 'ShoppingCart',
    iconColor: '#7c3aed',
    bgColor: '#ede9fe',
    problems: [
      { title: 'Her marketplace için ayrı panel açıyorsunuz', description: 'Trendyol, Hepsiburada, N11 — 3 farklı ekran, sürekli geçiş.', icon: 'Layers' },
      { title: 'Stok senkronu yok — overselling oluyor', description: 'Bir kanaldan satılan ürün diğerinde hâlâ "stokta" görünür.', icon: 'PackageX' },
      { title: 'Kargo etiketi tek tek hazırlanıyor', description: 'Aras, Yurtiçi, Sürat, MNG — her birine ayrı giriş.', icon: 'Truck' },
      { title: 'Fatura kesilmiyor veya geç kesiliyor', description: 'Vergi karmaşası, e-Arşiv yetiştirememe sorunları.', icon: 'FileWarning' },
    ],
    features: [
      { title: 'Pazaryeri Entegrasyonu', description: 'Trendyol, Hepsiburada, N11, Amazon, Çiçeksepeti, GittiGidiyor — tek tıkla.', icon: 'Layers' },
      { title: 'Tek Panel Sipariş Yönetimi', description: 'Tüm kanallardan gelen sipariş tek listede, otomatik atama.', icon: 'List' },
      { title: 'Kargo Entegrasyonu', description: 'Aras, Yurtiçi, Sürat, MNG, PTT — etiket tek tıkla.', icon: 'Truck' },
      { title: 'Otomatik Stok Senkronu', description: 'Bir kanaldan satılan stok tüm kanallarda anlık güncellenir.', icon: 'RefreshCw' },
      { title: 'e-Fatura / e-Arşiv (GİB)', description: 'Sipariş onaylanır onaylanmaz fatura otomatik kesilir.', icon: 'FileText' },
      { title: 'Ürün/Varyant Yönetimi', description: 'Beden/renk varyantlarını tek üründe yönetin, tüm kanallara push.', icon: 'Package' },
    ],
    benefits: [
      { label: 'Aylık zaman tasarrufu', value: '60+ saat', description: 'Sipariş & stok yönetimi otomatik.' },
      { label: 'Overselling oranı', value: '-%97', description: 'Anlık stok senkronu ile.' },
      { label: 'Kargo işleme hızı', value: '5×', description: 'Tek tıkla etiket basımı.' },
      { label: 'Fatura yetiştirememe', value: '-%100', description: 'Otomatik kesim.' },
    ],
    modules: [
      { name: 'Pazaryeri Entegrasyonu', description: 'Trendyol, Hepsiburada, N11, Amazon.' },
      { name: 'Sipariş Yönetimi', description: 'Tek panel, çoklu kanal.' },
      { name: 'Kargo & Etiket', description: 'Aras, Yurtiçi, Sürat, MNG, PTT.' },
      { name: 'Stok Senkronu', description: 'Anlık çoklu kanal.' },
      { name: 'e-Fatura/e-Arşiv', description: 'GİB entegre, otomatik.' },
      { name: 'Ürün/Varyant', description: 'Beden/renk yönetimi.' },
    ],
    faqs: [
      { question: 'Hangi pazaryerleriyle entegre?', answer: 'Trendyol, Hepsiburada, N11, Amazon TR, Çiçeksepeti, GittiGidiyor, Pazarama, ePttAvm. Yeni eklenenleri de takip ediyoruz.' },
      { question: 'Kendi e-ticaret sitemi de yönetebilir miyim?', answer: 'Evet. Hem WooCommerce/Shopify gibi mevcut sitenizi entegre edebilirsiniz, hem de kooza\'nın kendi e-ticaret altyapısını kullanabilirsiniz.' },
      { question: 'Kargo entegrasyonları otomatik mi?', answer: 'Tamamen. Sipariş onaylanır, kargo şirketi seçilir, etiket otomatik basılır. Aras, Yurtiçi, Sürat, MNG, PTT — hepsi entegre.' },
      { question: 'Stok birden fazla depoda — yönetebilir mi?', answer: 'Evet. Çoklu depo, transfer takibi, depo bazlı stok ve satış raporu mevcut.' },
      { question: 'e-Fatura/e-Arşiv entegrasyonu var mı?', answer: 'GİB özel entegratörlerle direkt entegre. Sipariş onayında otomatik fatura kesimi, e-mail ile müşteriye gönderim.' },
      { question: 'Kaç ürünü yönetebilirim?', answer: 'Pro pakette 5.000, Enterprise\'da sınırsız. 100K+ ürünlü mağazalar için optimize altyapı.' },
    ],
    ctaTitle: 'E-ticaret operasyonunuzu hızlandıralım',
    ctaSubtitle: '15 dakikalık demo — pazaryeri ve kargo entegrasyonunu canlı gösterelim.',
    seoTitle: 'E-Ticaret Pazaryeri Yönetim Yazılımı | Trendyol Hepsiburada N11 | kooza',
    seoDescription: 'Trendyol, Hepsiburada, N11, Amazon entegrasyonu, kargo otomasyonu, çoklu kanal stok senkronu, e-Fatura — tek panel. Ücretsiz demo.',
    order: 10,
  },
]

async function main() {
  console.log('Ek sektör seed başlıyor...\n')
  for (const s of sectors) {
    const exists = await prisma.sectorSolution.findUnique({ where: { slug: s.slug } })
    if (exists) {
      await prisma.sectorSolution.update({
        where: { slug: s.slug },
        data: { ...s, isActive: true } as any,
      })
      console.log(`UPDATED: ${s.slug}`)
    } else {
      await prisma.sectorSolution.create({
        data: { ...s, isActive: true } as any,
      })
      console.log(`+ ${s.slug}`)
    }
  }
  console.log('\nEk sektör seed tamam.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
