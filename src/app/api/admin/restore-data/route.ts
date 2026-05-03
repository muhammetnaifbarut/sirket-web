import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const ADMIN_KEY = process.env.ADMIN_KEY || 'kooza-admin-2026'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

function checkAuth(req: NextRequest): boolean {
  const key = req.headers.get('x-admin-key') || req.nextUrl.searchParams.get('key')
  return key === ADMIN_KEY
}

const PRODUCTS = [
  { slug: 'randevu', name: 'kooza Randevu', tagline: 'Randevular kelebek hızında, sektörünüze özel', description: 'Klinik, kuaför, fizyoterapi, masaj, spor salonu, veteriner ve tüm sektörel hizmet işletmeleri için randevu, müşteri ve finans yönetim platformu.', icon: '📅', badge: 'CANLI', videoUrl: 'https://randevu.kooza.tr', features: ['Online randevu takvimi', 'WhatsApp + SMS hatırlatma', '10 sektörel preset', 'Müşteri kartları + geçmiş', 'Çoklu personel + şube', 'Online ödeme entegre', 'Mobilde PWA', 'KVKK uyumlu raporlama'], screenshots: [], order: 1 },
  { slug: 'egitim', name: 'kooza Eğitim', tagline: 'Dershane, kurs ve eğitim merkezleri için tek panel', description: 'Öğrenci kayıt, ders programı, sınav, devam takibi, veli portalı ve faturalandırma.', icon: '📝', badge: 'CANLI', videoUrl: 'https://egitim.kooza.tr', features: ['Öğrenci ve veli yönetimi', 'Ders programı + öğretmen ataması', 'Online sınav modülü', 'Devam-devamsızlık takibi', 'Veli portalı', 'WhatsApp veli iletişimi', 'e-Fatura entegre', 'Çoklu şube'], screenshots: [], order: 2 },
  { slug: 'mesken', name: 'kooza Mesken', tagline: 'Site, apartman ve toplu konut yönetimi', description: 'Aidat takibi, sakin yönetimi, talep, muhasebe, raporlama.', icon: '🏢', badge: 'CANLI', videoUrl: 'https://mesken.kooza.tr', features: ['Aidat tahsilat + iyzico', 'Sakin/daire kayıtları', 'Talep yönetimi', 'Karar defteri', 'Gelir-gider muhasebesi', 'WhatsApp duyuru', 'PDF rapor', 'Yönetim firmaları için multi-site'], screenshots: [], order: 3 },
  { slug: 'tamir', name: 'kooza Tamir', tagline: 'Tamir, servis ve bakım işletmeleri için', description: 'Beyaz eşya, klima, telefon tamircisi, oto servis ve teknik servis için iş emri yönetimi.', icon: '🔧', badge: 'CANLI', videoUrl: 'https://tamir.kooza.tr', features: ['İş emri açma + takip', 'Teknisyen atama', 'Yedek parça stoğu', 'WhatsApp müşteri bilgilendirme', 'Garanti takibi', 'Online ödeme', 'Adisyon + fatura', 'Mobil teknisyen'], screenshots: [], order: 4 },
  { slug: 'hukuk', name: 'kooza Hukuk', tagline: 'Avukat ve hukuk büroları için tam çözüm', description: 'Dosya takibi, müvekkil yönetimi, duruşma takvimi, UYAP entegrasyonu ve faturalandırma.', icon: '⚖️', badge: 'CANLI', videoUrl: 'https://hukuk.kooza.tr', features: ['Dosya + müvekkil yönetimi', 'Duruşma takvimi + hatırlatma', 'UYAP entegrasyon', 'Vekalet takibi', 'Tahsilat + e-Fatura', 'Çoklu avukat', 'Belge arşivi', 'KVKK uyumlu'], screenshots: [], order: 5 },
  { slug: 'insaat', name: 'kooza İnşaat', tagline: 'Müteahhit ve şantiye yönetimi', description: 'İhale takip, şantiye yönetimi, hakediş, malzeme stok, taşeron ve yap-sat projeleri için.', icon: '🏗️', badge: 'CANLI', videoUrl: 'https://insaat.kooza.tr', features: ['Şantiye + proje yönetimi', 'İhale takibi', 'Hakediş hesaplama', 'Malzeme stok', 'Taşeron sözleşme', 'İş güvenliği takibi', 'Yap-sat daire kayıtları', 'Mobil saha'], screenshots: [], order: 6 },
  { slug: 'emlak', name: 'kooza Emlak', tagline: 'Emlak ofisi ve danışman yönetimi', description: 'İlan yönetimi, müşteri portföyü, danışman performansı, sözleşme takibi.', icon: '🏠', badge: 'CANLI', videoUrl: 'https://emlak.kooza.tr', features: ['İlan + portföy yönetimi', 'Müşteri-mülk eşleştirme', 'Sahibinden/Hepsiemlak entegre', 'Danışman komisyon takibi', 'Sözleşme + senet', 'Tur randevusu', 'WhatsApp müşteri', 'Mobil uygulama'], screenshots: [], order: 7 },
  { slug: 'servis', name: 'kooza Servis', tagline: 'Restoran ve kafe için POS, adisyon ve sipariş yönetimi', description: 'Restoran, kafe, bar, fast food için adisyon, masa, mutfak ekranı, kurye entegrasyonu, sadakat ve e-Fatura.', icon: '🍽️', badge: 'CANLI', videoUrl: 'https://servis.kooza.tr', features: ['Görsel masa & adisyon', 'Mutfak ekranı (KDS)', 'Yemeksepeti+Getir entegre', 'QR menü + sipariş', 'Çoklu ödeme + e-Fatura', 'Sadakat sistemi', 'Stok + reçete', 'Çoklu şube'], screenshots: [], order: 8 },
  { slug: 'muhasebe', name: 'kooza Muhasebe', tagline: 'KOBİ için sade, hızlı muhasebe', description: 'Cari, fatura, e-Fatura, gelir-gider, KDV, muhtasar ve raporlama.', icon: '💼', badge: 'BETA', videoUrl: 'https://muhasebe.kooza.tr', features: ['Cari yönetimi', 'e-Fatura + e-Arşiv', 'KDV + muhtasar beyanname', 'Gelir-gider tablosu', 'Bilanço raporu', 'Stok takibi', 'Banka mutabakatı', 'Mali müşavir paneli'], screenshots: [], order: 9 },
  { slug: 'ik', name: 'kooza İK', tagline: 'İnsan kaynakları ve bordro yönetimi', description: 'Personel kayıt, izin, bordro, SGK bildirim, performans ve eğitim.', icon: '👥', badge: 'BETA', videoUrl: 'https://ik.kooza.tr', features: ['Personel sicili', 'İzin + mesai takibi', 'Bordro hesaplama', 'SGK bildirim entegre', 'Performans değerlendirme', 'Eğitim takibi', 'PDKS entegrasyonu', 'Mobil personel'], screenshots: [], order: 10 },
]

const MENU_ITEMS = [
  { label: 'Ana Sayfa', url: '/', order: 1 },
  { label: 'Çözümler', url: '/cozumler', order: 2 },
  { label: 'Araçlar', url: '/araclar', order: 3 },
  { label: 'Fiyatlandırma', url: '/fiyatlandirma', order: 4 },
  { label: 'Blog', url: '/blog', order: 5 },
  { label: 'Hakkımızda', url: '/hakkimizda', order: 6 },
  { label: 'İletişim', url: '/iletisim', order: 7 },
]

// 10 ürün için /cozumler/[slug] tanıtım sayfası verileri
const SOLUTIONS = [
  {
    slug: 'randevu', name: 'kooza Randevu', icon: 'Calendar', iconColor: '#714B67', bgColor: '#f7f2f5',
    tagline: 'Sektörünüze özel, kelebek hızında randevu yönetimi',
    heroBadge: 'Randevu Sistemi', heroTitle: 'Randevular kelebek hızında,\nsektörünüze özel',
    heroSubtitle: 'Klinik, kuaför, fizyoterapi, veteriner, masaj, spor salonu — 10 sektör için hazır şablon. WhatsApp + SMS hatırlatma, online ödeme, çoklu personel, mobil PWA. Tek panelde her şey.',
    problems: [
      { title: 'Telefon kapanmıyor, no-show ödüyor', description: 'Müşteri unutuyor, gelmiyor, slot boş kalıyor; aylık 15-20K TL kayıp.', icon: 'PhoneOff' },
      { title: 'Defter karmaşası, çakışan randevular', description: 'Personel takvimi senkron değil, aynı saate iki müşteri yazılıyor.', icon: 'AlertTriangle' },
      { title: 'WhatsApp\'tan tek tek mesaj atmak', description: 'Personel saatlerce hatırlatma mesajı yazıyor, müşteriye kişiselleştirilmiş hizmet kalmıyor.', icon: 'MessageSquareWarning' },
    ],
    features: [
      { title: 'Online randevu sayfası', description: 'Müşteri kendi rezervasyon yapar, ödeme alır, tek tıkla onaylar.', icon: 'Globe' },
      { title: 'WhatsApp + SMS hatırlatma', description: 'Otomatik hatırlatma 24 saat ve 1 saat öncesinde gider, no-show %70 azalır.', icon: 'Bell' },
      { title: 'Çoklu personel takvimi', description: 'Her personel için renk kodlu takvim, çakışma engelleyici, kapasite planlama.', icon: 'Users' },
      { title: 'Müşteri kartları + geçmiş', description: 'Önceki randevu, alerji, not, fotoğraf — tek ekranda müşteri 360°.', icon: 'IdCard' },
      { title: 'Online ödeme + iyzico', description: 'Randevu sırasında ön ödeme, kapora, paket satışı — gelir garanti.', icon: 'CreditCard' },
      { title: 'Mobil PWA uygulaması', description: 'Personel telefondan kullanır, bildirim alır, müşteri kartı açar — uygulama gibi.', icon: 'Smartphone' },
    ],
    benefits: [
      { label: 'No-show azalması', value: '%70', description: 'Otomatik hatırlatma sayesinde' },
      { label: 'Personel zamanı', value: '4 saat/gün', description: 'Telefon yerine işine odaklan' },
      { label: 'Yeni müşteri', value: '+40%', description: 'Online rezervasyon ile' },
      { label: 'Kurulum süresi', value: '< 24 saat', description: 'Şablon seç, yayında' },
    ],
    modules: [
      { name: 'Randevu Takvimi', description: 'Gün/hafta/ay görünüm, sürükle-bırak' },
      { name: 'Müşteri CRM', description: 'Kart, geçmiş, not, fotoğraf' },
      { name: 'Personel Yönetimi', description: 'Vardiya, izin, komisyon' },
      { name: 'Hizmet Kataloğu', description: 'Süre, fiyat, kategori' },
      { name: 'Ödeme + Adisyon', description: 'iyzico, nakit, kart, taksit' },
      { name: 'WhatsApp Bot', description: 'Otomatik mesaj, hatırlatma' },
      { name: 'Raporlama', description: 'Ciro, doluluk, müşteri analizi' },
      { name: 'Online Sayfa', description: 'Subdomain, SEO, ödeme' },
    ],
    faqs: [
      { question: 'Hangi sektörler için uygun?', answer: 'Klinik, kuaför, kuaför erkek, güzellik salonu, masaj, fizyoterapi, veteriner, spor salonu, terapist, doktor — 10+ hazır şablon. Şablonu seç, anında çalışmaya başla.' },
      { question: 'No-show oranını gerçekten %70 azaltır mı?', answer: 'Evet. Otomatik WhatsApp + SMS hatırlatma 24 saat ve 1 saat öncesinde gönderiliyor. Müşteri tek tıkla iptal ya da onay veriyor. İstatistik müşterilerimizden: %65-75 azalma ortalama.' },
      { question: 'Online ödeme komisyon ne kadar?', answer: 'iyzico komisyon oranı %2.49 + 0.25 TL. Kooza\'dan ek komisyon yok. Para 1-2 iş günü içinde banka hesabına geçiyor.' },
      { question: 'Mobil uygulama var mı?', answer: 'Evet, PWA olarak telefondan ana ekrana ekleniyor. App Store/Play Store gerekmiyor. iOS + Android + PC tek kod, sürekli güncel.' },
    ],
    ctaTitle: 'Randevu kaybetmeyi bırakın', ctaSubtitle: '14 gün ücretsiz dene. Kart bilgisi sormuyoruz, kurulum 15 dakika.', order: 1,
  },
  {
    slug: 'egitim', name: 'kooza Eğitim', icon: 'GraduationCap', iconColor: '#3B82F6', bgColor: '#eff6ff',
    tagline: 'Dershane, kurs ve eğitim merkezleri için tek panel',
    heroBadge: 'Eğitim Yönetimi', heroTitle: 'Öğrenci, veli ve ders\nartık tek panelde',
    heroSubtitle: 'Dershane, etüt merkezi, dil okulu, özel kurs için: öğrenci kayıt, ders programı, sınav, devam takibi, veli portalı, faturalandırma. Excel ve WhatsApp grupları kapanır.',
    problems: [
      { title: 'Excel\'de öğrenci listesi karmaşası', description: '3 farklı dosya, 5 versiyon, kayıp not. Veli arıyor cevap yok.', icon: 'FileSpreadsheet' },
      { title: 'Veli WhatsApp grubu cehennemi', description: '200 mesaj, kim hangi veli, hangi öğrenci anlaşılmıyor.', icon: 'MessagesSquare' },
      { title: 'Devam-devamsızlık defterde', description: 'Ay sonu hesap çıkmıyor, fatura kesemiyorsun.', icon: 'BookX' },
    ],
    features: [
      { title: 'Öğrenci + veli kartları', description: 'Tüm öğrenciler tek listede; veli iletişim, ödeme geçmişi, sınav notları görünür.', icon: 'IdCard' },
      { title: 'Ders programı + öğretmen', description: 'Sürükle-bırak haftalık program, öğretmen ataması, sınıf çakışma uyarısı.', icon: 'CalendarDays' },
      { title: 'Online sınav + otomatik puan', description: 'Çoktan seçmeli sınav, otomatik puanlama, sınıf sıralama.', icon: 'PenLine' },
      { title: 'Devam-devamsızlık takibi', description: 'QR kod ile öğrenci giriş-çıkış, otomatik devamsızlık raporu.', icon: 'CircleCheck' },
      { title: 'Veli portalı', description: 'Veli giriş yapar, çocuğun notlarını, devamsızlığını, ödevi görür.', icon: 'Users' },
      { title: 'WhatsApp + e-Fatura', description: 'Veliye otomatik mesaj, fatura kesimi, tahsilat takibi tek ekranda.', icon: 'Receipt' },
    ],
    benefits: [
      { label: 'Tahsilat hızı', value: '3x daha hızlı', description: 'Otomatik fatura + hatırlatma' },
      { label: 'Veli memnuniyet', value: '+85%', description: 'Şeffaf takip, anlık bildirim' },
      { label: 'Personel zamanı', value: '6 saat/hafta', description: 'Excel\'le uğraşmaktan kurtulur' },
      { label: 'Şube limiti', value: 'Sınırsız', description: 'Tek panelden tüm şubeler' },
    ],
    modules: [
      { name: 'Öğrenci Kayıt', description: 'Veli, ders, paket, ödeme planı' },
      { name: 'Ders Programı', description: 'Haftalık, öğretmen, sınıf' },
      { name: 'Sınav Modülü', description: 'Online + manuel puanlama' },
      { name: 'Devam Takibi', description: 'QR kod giriş-çıkış' },
      { name: 'Veli Portalı', description: 'Notlar, ödev, duyuru' },
      { name: 'Fatura + Tahsilat', description: 'e-Fatura, taksit, hatırlatma' },
      { name: 'WhatsApp Bildirim', description: 'Otomatik veli mesajları' },
      { name: 'Şube Yönetimi', description: 'Çoklu lokasyon, raporlama' },
    ],
    faqs: [
      { question: 'Hangi eğitim kurumları için uygun?', answer: 'Dershane, etüt merkezi, dil okulu, özel kurs (matematik, müzik, dans, kodlama), sürücü kursu, KPSS hazırlık. 50+ öğrencisi olan tüm yapılar için uygun.' },
      { question: 'e-Fatura entegrasyonu var mı?', answer: 'Evet, GİB onaylı entegratörler ile entegre. Veli ödediğinde otomatik e-Fatura kesilip mail/WhatsApp ile gönderiliyor.' },
      { question: 'Veli portalında ne görünüyor?', answer: 'Notlar, devamsızlık, ödevler, ders programı, ödeme geçmişi, fatura indirme, öğretmen iletişim, etkinlik duyuruları.' },
      { question: 'Online sınav nasıl çalışır?', answer: 'Çoktan seçmeli, açık uçlu, eşleştirme tipi sorular. Süreli/süresiz, kişisel/grup, otomatik puanlama. Sonuçlar anında veliye iletilebilir.' },
    ],
    ctaTitle: 'Excel\'le vedalaşma zamanı', ctaSubtitle: '14 gün ücretsiz, tüm öğrencileri içe aktarın.', order: 2,
  },
  {
    slug: 'mesken', name: 'kooza Mesken', icon: 'Building2', iconColor: '#10B981', bgColor: '#ecfdf5',
    tagline: 'Site, apartman ve toplu konut için modern yönetim',
    heroBadge: 'Site Yönetimi', heroTitle: 'Aidat takibi, sakin\niletişimi — tek panel',
    heroSubtitle: 'Site, apartman, rezidans yönetimi: aidat tahsilat, sakin kayıt, talep yönetimi, karar defteri, gelir-gider muhasebesi. Yönetim firmaları için multi-site, KVKK uyumlu.',
    problems: [
      { title: 'Aidat tahsilat zorluk', description: 'Hangi daire ödedi, hangi ödemedi takip edilmiyor; ay sonu kapanmıyor.', icon: 'Banknote' },
      { title: 'Sakin talep yönetimi yok', description: 'Asansör bozuldu, sakin WhatsApp\'tan yazıyor; takip edilmiyor, çözülmüyor.', icon: 'AlertCircle' },
      { title: 'Yönetim firması verimsiz', description: '5 site yönetiyorsun, her biri ayrı Excel; çapraz rapor çıkaramıyorsun.', icon: 'FolderX' },
    ],
    features: [
      { title: 'Aidat tahsilat + iyzico', description: 'Sakin online ödeme yapar, otomatik makbuz, hatırlatma; kasa açığı kapanır.', icon: 'CreditCard' },
      { title: 'Sakin / daire kayıtları', description: 'Daire bilgisi, sahip-kiracı, iletişim, geçmiş. KVKK uyumlu arşiv.', icon: 'IdCard' },
      { title: 'Talep yönetimi', description: 'Sakin formdan talep açar, yönetici atar, sakine bildirim gider.', icon: 'ClipboardList' },
      { title: 'Karar defteri dijital', description: 'Yönetim kararları kayıt altında; yıl sonu raporu otomatik.', icon: 'BookOpenCheck' },
      { title: 'Gelir-gider muhasebesi', description: 'Aidat geliri, fatura, bakım, personel; aylık bütçe raporu hazır.', icon: 'PieChart' },
      { title: 'WhatsApp duyuru', description: 'Asansör bakımı, su kesintisi, toplantı duyuruları otomatik gider.', icon: 'Megaphone' },
    ],
    benefits: [
      { label: 'Tahsilat oranı', value: '+%35', description: 'Online ödeme + otomatik hatırlatma' },
      { label: 'Sakin memnuniyet', value: '+90%', description: 'Şeffaf takip, hızlı geri dönüş' },
      { label: 'Yönetici zamanı', value: '8 saat/hafta', description: 'Otomasyonla' },
      { label: 'Site limiti', value: 'Sınırsız', description: 'Yönetim firmaları için' },
    ],
    modules: [
      { name: 'Aidat Tahsilatı', description: 'Online + nakit + havale' },
      { name: 'Sakin Yönetimi', description: 'Daire, sahip, kiracı' },
      { name: 'Talep Yönetimi', description: 'Form, atama, takip' },
      { name: 'Karar Defteri', description: 'Toplantı, oy, karar' },
      { name: 'Muhasebe', description: 'Gelir-gider, bütçe, rapor' },
      { name: 'Duyuru Sistemi', description: 'WhatsApp + SMS + e-posta' },
      { name: 'Personel Yönetimi', description: 'Kapıcı, temizlik, güvenlik' },
      { name: 'Multi-Site', description: 'Tek panelden 100+ site' },
    ],
    faqs: [
      { question: 'Yönetim firmaları için uygun mu?', answer: 'Evet. Multi-site mimari ile bir panelde 100+ site yönetebilirsin. Site bazında roller, çapraz raporlar, fatura kesme.' },
      { question: 'Online aidat ödeme komisyon?', answer: 'iyzico %2.49 + 0.25 TL. Kooza ek komisyon almıyor. Tahsilat 1-2 iş gününde banka hesabınıza geçiyor.' },
      { question: 'KVKK uyumluluk nasıl sağlanıyor?', answer: 'Sakin verileri şifreli saklanıyor, erişim logları tutuluyor, veri silme talepleri tek tıkla işleniyor. KVKK Aydınlatma Metni şablonu hazır.' },
      { question: 'E-fatura gönderilebiliyor mu?', answer: 'Evet, mali müşavir entegrasyonu ile aidat tahsilatlarına otomatik e-Fatura kesilip sakine mail gönderilir.' },
    ],
    ctaTitle: 'Site yönetimi artık dijital', ctaSubtitle: '14 gün ücretsiz, ilk siteni 1 saatte kurulum.', order: 3,
  },
  {
    slug: 'tamir', name: 'kooza Tamir', icon: 'Wrench', iconColor: '#F59E0B', bgColor: '#fffbeb',
    tagline: 'Tamir, servis ve bakım işletmeleri için iş emri',
    heroBadge: 'Servis Yönetimi', heroTitle: 'İş emri, parça, müşteri\ntek ekranda',
    heroSubtitle: 'Beyaz eşya, klima, telefon, oto servis, teknik servis için: iş emri açma, teknisyen atama, yedek parça stok, garanti takibi, WhatsApp müşteri bilgilendirme. Mobilde teknisyen uygulaması.',
    problems: [
      { title: 'İş emri kağıtta kayboluyor', description: 'Teknisyen kağıt iş emri taşıyor; ay sonu hangi iş ne kadar tutmuş bilinmiyor.', icon: 'FileX' },
      { title: 'Yedek parça stoğu kafa karışık', description: 'Hangi parça var, hangisi geliyor takip edilmiyor; müşteri bekliyor.', icon: 'PackageX' },
      { title: 'Garanti takibi yok', description: 'Hangi cihaz ne zaman tamir edildi, ücretsiz iade hakkı var mı bilinmiyor.', icon: 'ShieldAlert' },
    ],
    features: [
      { title: 'İş emri açma + takip', description: 'Müşteri kabul, cihaz fotoğrafı, semptom, tahmini ücret — tek formda.', icon: 'ClipboardList' },
      { title: 'Teknisyen atama + mobil', description: 'Teknisyene mobil bildirim gider, parça gerekiyorsa anında stoktan kontrol eder.', icon: 'Users' },
      { title: 'Yedek parça stoğu', description: 'Stok seviyesi, sipariş, tedarikçi yönetimi; otomatik düşük stok uyarısı.', icon: 'Package' },
      { title: 'Garanti + iade takibi', description: 'Cihaz seri no, tamir tarihi, garanti süresi takip; tekrar geldiğinde otomatik tespit.', icon: 'Shield' },
      { title: 'WhatsApp müşteri bilgi', description: 'İş alındı, ücret onay, tamir bitti, ödeme bekliyor — otomatik mesaj.', icon: 'MessageCircle' },
      { title: 'Adisyon + e-Fatura', description: 'Müşteri ödediğinde adisyon yazılıyor, e-Fatura otomatik kesiliyor.', icon: 'Receipt' },
    ],
    benefits: [
      { label: 'İş tamamlama hızı', value: '+%40', description: 'Mobil teknisyen + parça stok' },
      { label: 'Müşteri memnuniyet', value: '+%75', description: 'Şeffaf süreç + bildirim' },
      { label: 'Stok kayıp', value: '-%60', description: 'Otomatik takip ile' },
      { label: 'Aylık ek gelir', value: '15-30K TL', description: 'Garanti dışı ürün satışları' },
    ],
    modules: [
      { name: 'İş Emri', description: 'Açma, takip, tamamlama' },
      { name: 'Teknisyen Mobil', description: 'PWA, bildirim, fotoğraf' },
      { name: 'Yedek Parça', description: 'Stok, sipariş, tedarikçi' },
      { name: 'Garanti Takip', description: 'Seri no, tarih, kapsam' },
      { name: 'Müşteri CRM', description: 'Geçmiş, cihaz, iletişim' },
      { name: 'Adisyon', description: 'Hesap, ödeme, e-Fatura' },
      { name: 'WhatsApp Bot', description: 'Otomatik bilgi mesajları' },
      { name: 'Raporlama', description: 'Ciro, teknisyen, parça analizi' },
    ],
    faqs: [
      { question: 'Hangi servisler için uygun?', answer: 'Beyaz eşya tamiri, klima servisi, telefon-tablet tamiri, oto servis, kombi-petek bakım, bilgisayar tamiri, yetkili teknik servis.' },
      { question: 'Mobil teknisyen uygulaması nasıl?', answer: 'PWA olarak telefondan ana ekrana eklenir. Bildirim alır, müşteri kartı açar, iş emrini günceller, fotoğraf çeker — App Store gerekmez.' },
      { question: 'Yedek parça stok nasıl yönetiliyor?', answer: 'Her parça için min/max stok, tedarikçi, alış/satış fiyatı tutulur. Düşük stok uyarısı, otomatik sipariş önerisi yapar.' },
      { question: 'e-Fatura entegrasyonu?', answer: 'GİB entegratörleri ile çalışır. Adisyon kapatıldığında otomatik e-Fatura kesilir ve müşteriye gönderilir.' },
    ],
    ctaTitle: 'İş emri artık dijital', ctaSubtitle: '14 gün ücretsiz, mevcut müşteri listenizi içe aktarın.', order: 4,
  },
  {
    slug: 'hukuk', name: 'kooza Hukuk', icon: 'Scale', iconColor: '#8B5CF6', bgColor: '#f5f3ff',
    tagline: 'Avukat ve hukuk büroları için tam yönetim',
    heroBadge: 'Hukuk Otomasyonu', heroTitle: 'Dosya, müvekkil ve\nduruşma — tek panel',
    heroSubtitle: 'Avukat ve hukuk büroları için: dosya takibi, müvekkil yönetimi, duruşma takvimi, UYAP entegrasyonu, vekalet, e-Fatura. Çoklu avukat, KVKK uyumlu, mobilde tam erişim.',
    problems: [
      { title: 'Dosyalar kağıt klasörlerde', description: 'Müvekkil aradığında dosya bulunamıyor, eski belgeler kaybolup gidiyor.', icon: 'FolderX' },
      { title: 'Duruşma kaçırma riski', description: 'Tek bir takvim yok, dijital hatırlatma yok; kritik duruşma kaçabiliyor.', icon: 'CalendarX' },
      { title: 'UYAP\'a manuel girme', description: 'Her dosya için UYAP\'a tek tek giriliyor, çift veri girişi, hata payı yüksek.', icon: 'Repeat' },
    ],
    features: [
      { title: 'Dosya + müvekkil yönetimi', description: 'Dava türü, taraflar, belgeler, durum — tek dosyada 360° görünüm.', icon: 'FolderKanban' },
      { title: 'Duruşma takvimi + hatırlatma', description: 'Tüm duruşmalar tek takvimde, 7/3/1 gün öncesi otomatik bildirim.', icon: 'CalendarClock' },
      { title: 'UYAP entegrasyonu', description: 'Dava bilgileri otomatik UYAP\'a yazılıyor, çift giriş yok.', icon: 'Link2' },
      { title: 'Vekalet + sözleşme', description: 'Vekalet, ücret sözleşmesi, ek protokoller; e-imza desteği.', icon: 'FileSignature' },
      { title: 'Tahsilat + e-Fatura', description: 'Müvekkil ödemeleri takibi, otomatik e-Fatura, taksit yönetimi.', icon: 'Wallet' },
      { title: 'Çoklu avukat + roller', description: 'Büro avukatları farklı yetkilerle, her dosyaya atama yapılabiliyor.', icon: 'Users' },
    ],
    benefits: [
      { label: 'Duruşma kaçırma', value: '0%', description: 'Otomatik hatırlatma sistemi' },
      { label: 'Dosya bulma süresi', value: '< 30 sn', description: 'Tüm arşiv tek tıkla' },
      { label: 'Tahsilat hızı', value: '+%50', description: 'e-Fatura + otomatik takip' },
      { label: 'Müvekkil sayısı', value: 'Sınırsız', description: 'Hobi planda bile' },
    ],
    modules: [
      { name: 'Dosya Yönetimi', description: 'Dava, taraflar, belge' },
      { name: 'Müvekkil CRM', description: 'İletişim, geçmiş, fatura' },
      { name: 'Duruşma Takvimi', description: 'Hatırlatma, görev, not' },
      { name: 'UYAP Bağlantı', description: 'Tek tıkla veri aktarımı' },
      { name: 'Vekalet & Sözleşme', description: 'Şablon, e-imza, arşiv' },
      { name: 'Tahsilat', description: 'Fatura, taksit, online ödeme' },
      { name: 'Belge Arşivi', description: 'PDF, OCR, etiket' },
      { name: 'Avukat Paneli', description: 'Çoklu kullanıcı, roller' },
    ],
    faqs: [
      { question: 'Bireysel avukat için uygun mu?', answer: 'Evet, tek kullanıcı planı var. Büyük büro için multi-user planı.' },
      { question: 'UYAP entegrasyonu nasıl çalışıyor?', answer: 'UYAP API üzerinden dava bilgileri otomatik aktarılıyor; manuel veri girişi azalıyor. Resmi entegrasyon yapısı kullanılır.' },
      { question: 'KVKK uyumlu mu?', answer: 'Evet, müvekkil verileri şifreli saklanır, erişim logları tutulur, KVKK Aydınlatma Metni şablonu hazır.' },
      { question: 'e-Fatura kesimi otomatik mi?', answer: 'Müvekkil ödediğinde sistem otomatik e-Fatura keser ve müvekkile gönderir. Mali müşavir entegrasyonu ile muhasebeye aktarılır.' },
    ],
    ctaTitle: 'Hukuk büronuz dijitalleşsin', ctaSubtitle: '14 gün ücretsiz, mevcut dosyaları içe aktarın.', order: 5,
  },
  {
    slug: 'insaat', name: 'kooza İnşaat', icon: 'HardHat', iconColor: '#F97316', bgColor: '#fff7ed',
    tagline: 'Müteahhit ve şantiye yönetimi için kapsamlı çözüm',
    heroBadge: 'İnşaat Yönetimi', heroTitle: 'Şantiye, hakediş, taşeron\nve daire — tek panel',
    heroSubtitle: 'Müteahhit, ihaleci ve yap-sat firmalar için: ihale takibi, şantiye yönetimi, hakediş, malzeme stok, taşeron sözleşmesi, iş güvenliği, daire kayıtları. Mobilde saha uygulaması.',
    problems: [
      { title: 'Hakediş hesabı sürekli yanlış', description: 'Excel\'de manuel hesaplama, taşeronla anlaşmazlık, ödeme gecikmesi.', icon: 'CalculatorIcon' },
      { title: 'Malzeme stoğu kaybı', description: 'Şantiyede malzeme nereye gitti bilinmiyor, %15-20 kayıp normal sayılıyor.', icon: 'PackageX' },
      { title: 'İş güvenliği takibi yok', description: 'SGK denetimi geliyor, eğitim kayıtları yok, ceza yiyorsun.', icon: 'AlertOctagon' },
    ],
    features: [
      { title: 'Şantiye + proje yönetimi', description: 'Birden fazla şantiye, görev atama, ilerleme takibi, fotoğraf arşivi.', icon: 'Building' },
      { title: 'İhale takip sistemi', description: 'EKAP entegre, ihale duyuruları, sonuç takibi, dosya arşivi.', icon: 'FileText' },
      { title: 'Hakediş hesaplama', description: 'Otomatik metraj, birim fiyat, KDV, stopaj — taşerona/müteahhide hatasız.', icon: 'Calculator' },
      { title: 'Malzeme stok takibi', description: 'Şantiyeye giren-çıkan malzeme, kayıp önleme, otomatik sipariş.', icon: 'Package' },
      { title: 'Taşeron sözleşme', description: 'Sözleşme şablonları, ek protokol, ödeme planı, iade-fesih.', icon: 'FileSignature' },
      { title: 'Yap-sat daire kayıtları', description: 'Hangi daire satıldı, kapora, taksit, tapu süreci — tek ekranda.', icon: 'Home' },
    ],
    benefits: [
      { label: 'Hakediş hatası', value: '< 1%', description: 'Otomatik hesaplama' },
      { label: 'Malzeme kayıp', value: '-%70', description: 'Stok takip + denetim' },
      { label: 'Proje süresi', value: '-%15', description: 'Daha iyi planlama' },
      { label: 'Şantiye limiti', value: 'Sınırsız', description: 'Tek panel, çok proje' },
    ],
    modules: [
      { name: 'Şantiye Yönetimi', description: 'Görev, fotoğraf, ilerleme' },
      { name: 'İhale Takip', description: 'EKAP, dosya, sonuç' },
      { name: 'Hakediş', description: 'Metraj, birim fiyat, vergi' },
      { name: 'Malzeme Stok', description: 'Giren-çıkan, sipariş, tedarikçi' },
      { name: 'Taşeron', description: 'Sözleşme, ödeme, fesih' },
      { name: 'İş Güvenliği', description: 'Eğitim, kontrol, kayıt' },
      { name: 'Yap-Sat', description: 'Daire, müşteri, tapu' },
      { name: 'Mobil Saha', description: 'PWA, fotoğraf, bildirim' },
    ],
    faqs: [
      { question: 'Hangi inşaat firmaları için uygun?', answer: 'Müteahhit (yap-sat), ihaleci (kamu ihale), taşeron, mimar, mühendis büroları. Küçük şantiyeden 50+ kişilik firmaya kadar.' },
      { question: 'EKAP entegrasyonu var mı?', answer: 'Evet, ihale duyuruları otomatik çekiliyor, başvuru durumu takip ediliyor, sonuçlar bildirim olarak geliyor.' },
      { question: 'Yap-sat daire takibi nasıl?', answer: 'Her daire için: alıcı bilgisi, kapora, taksit planı, tapu süreci, anahtar teslim tarihi takip edilir. PDF satış senedi otomatik üretilir.' },
      { question: 'Mobil saha uygulaması?', answer: 'PWA olarak telefondan kullanılır. Şantiye fotoğrafı, ilerleme raporu, malzeme kabul, iş güvenliği kontrolü mobilde yapılır.' },
    ],
    ctaTitle: 'Şantiye yönetimini ele al', ctaSubtitle: '14 gün ücretsiz, ilk şantiyenizi 1 saatte kurulum.', order: 6,
  },
  {
    slug: 'emlak', name: 'kooza Emlak', icon: 'Home', iconColor: '#06B6D4', bgColor: '#ecfeff',
    tagline: 'Emlak ofisi ve danışman için tam çözüm',
    heroBadge: 'Emlak Otomasyon', heroTitle: 'İlan, müşteri ve\nkomisyon — tek panel',
    heroSubtitle: 'Emlak ofisleri ve bireysel danışmanlar için: ilan yönetimi, müşteri portföyü, danışman komisyon takibi, sözleşme, sahibinden/hepsiemlak entegrasyonu, tur randevusu.',
    problems: [
      { title: 'İlanlar 5 farklı sitede', description: 'Sahibinden, Hepsiemlak, Emlakjet — her birine ayrı ayrı yükleniyor; düzenleme cehennem.', icon: 'Globe' },
      { title: 'Müşteri-mülk eşleştirme manuel', description: 'Hangi müşteri ne arıyor, ona uygun mülk var mı; saatlerce manuel arama.', icon: 'SearchX' },
      { title: 'Danışman komisyon karmaşası', description: 'Hangi satışı kim getirdi, ne kadar komisyon hesabı sürekli tartışma.', icon: 'BadgeAlert' },
    ],
    features: [
      { title: 'İlan + portföy yönetimi', description: 'Tek panelde ilanlar; sahibinden/hepsiemlak\'a tek tıkla aktar.', icon: 'Globe' },
      { title: 'Müşteri-mülk eşleştirme', description: 'Müşteri ne arıyorsa otomatik eşleşen mülkler önerilir.', icon: 'Sparkles' },
      { title: 'Danışman komisyon takibi', description: 'Her satışın komisyonu otomatik hesaplanır, danışman paneli görür.', icon: 'TrendingUp' },
      { title: 'Sözleşme + senet', description: 'Satış sözleşmesi, kira sözleşmesi, senet — şablon ve e-imza.', icon: 'FileSignature' },
      { title: 'Tur randevusu', description: 'Müşteri ile mülk gezme randevuları, otomatik hatırlatma.', icon: 'CalendarDays' },
      { title: 'WhatsApp müşteri', description: 'Yeni mülk geldiğinde uygun müşterilere otomatik WhatsApp gider.', icon: 'MessageCircle' },
    ],
    benefits: [
      { label: 'İlan zamanı', value: '5 dk → 30 sn', description: 'Tek tıkla 5 siteye yayın' },
      { label: 'Müşteri eşleşme', value: '+%80', description: 'Otomatik öneri' },
      { label: 'Komisyon kayıp', value: '0%', description: 'Şeffaf takip' },
      { label: 'Satış hızı', value: '+%35', description: 'Hızlı eşleştirme' },
    ],
    modules: [
      { name: 'İlan Yönetimi', description: 'Yayın, düzenle, arşiv' },
      { name: 'Portföy', description: 'Mülk, sahip, fotoğraf' },
      { name: 'Müşteri CRM', description: 'Talep, eşleşme, geçmiş' },
      { name: 'Danışman Paneli', description: 'Komisyon, performans' },
      { name: 'Sözleşme', description: 'Şablon, e-imza, arşiv' },
      { name: 'Tur Randevusu', description: 'Takvim, hatırlatma' },
      { name: 'Sahibinden Entegre', description: 'Otomatik yayın' },
      { name: 'WhatsApp Bot', description: 'Otomatik müşteri mesajı' },
    ],
    faqs: [
      { question: 'Bireysel danışman için uygun mu?', answer: 'Evet, tek kullanıcı planı var. Ofis büyüdükçe danışman ekleyebilirsiniz.' },
      { question: 'Sahibinden + Hepsiemlak entegrasyonu?', answer: 'API üzerinden: ilan tek panelden hazırlanır, tüm sitelere otomatik aktarılır. Düzenleme tek yerden, anında her sitede güncellenir.' },
      { question: 'Komisyon takibi nasıl çalışıyor?', answer: 'Her satışın hangi danışman tarafından getirildiği, komisyon yüzdesi, ofis payı otomatik hesaplanır. Aylık rapor ile şeffaf paylaşım.' },
      { question: 'Mobil uygulama var mı?', answer: 'Evet, PWA olarak telefondan kullanılır. Mülk fotoğrafı, müşteri görüşme notu, randevu takibi mobilde.' },
    ],
    ctaTitle: 'Emlak ofisinizi otomatize edin', ctaSubtitle: '14 gün ücretsiz, mevcut ilanlarınızı içe aktarın.', order: 7,
  },
  {
    slug: 'servis', name: 'kooza Servis', icon: 'UtensilsCrossed', iconColor: '#F97316', bgColor: '#fff7ed',
    tagline: 'Restoran ve kafe için POS, adisyon ve sipariş yönetimi',
    heroBadge: 'Restoran & Kafe POS', heroTitle: 'Adisyon, mutfak ve\nkurye — tek panel',
    heroSubtitle: 'Restoran, kafe, bar, fast food ve fırın için: görsel masa planı, adisyon, mutfak ekranı (KDS), Yemeksepeti+Getir entegrasyonu, QR menü, sadakat sistemi, e-Fatura.',
    problems: [
      { title: 'Adisyon karışıklığı, hata bedeli', description: 'Garson el yazısı adisyon, mutfağa yanlış sipariş, müşteri kavgası.', icon: 'FileX' },
      { title: 'Sipariş kanalları dağınık', description: 'Yemeksepeti, Getir, telefon, masa — hepsi ayrı sistem, kaos.', icon: 'Network' },
      { title: 'Stok kayıpları görünmez', description: 'Reçete takibi yok, fire kontrolü yok, ay sonunda %15-20 ürün eksik.', icon: 'PackageX' },
    ],
    features: [
      { title: 'Görsel masa & adisyon', description: 'Sürükle-bırak masa planı, hızlı adisyon, masa transfer ve birleştirme.', icon: 'LayoutDashboard' },
      { title: 'Mutfak ekranı (KDS)', description: 'Mutfağa renkli sipariş ekranı, hazır oldu butonu, sıra ve gecikme takibi.', icon: 'Tv' },
      { title: 'Kurye entegrasyonu', description: 'Yemeksepeti, Getir, Trendyol Yemek API entegre, otomatik sipariş alımı.', icon: 'Bike' },
      { title: 'QR menü + sipariş', description: 'Müşteri telefondan menüyü görür, masadan sipariş verir, garson çağırır.', icon: 'QrCode' },
      { title: 'Çoklu ödeme + e-Fatura', description: 'Nakit, kart, ticket, multinet, parçalı ödeme. Otomatik e-Arşiv kesimi.', icon: 'CreditCard' },
      { title: 'Stok + reçete', description: 'Reçeteye göre otomatik stok düşme, kritik uyarı, fire takibi, tedarikçi sipariş.', icon: 'Package' },
    ],
    benefits: [
      { label: 'Ortalama ciro artışı', value: '+%40', description: 'Tüm kanalları tek panelde' },
      { label: 'Sipariş hatası', value: '-%85', description: 'Dijital adisyon + KDS' },
      { label: 'Stok kayıp', value: '-%60', description: 'Reçete + fire takip' },
      { label: 'Sadakat tekrar gelme', value: '+%35', description: 'Kart + kampanya' },
    ],
    modules: [
      { name: 'Masa Planı', description: 'Görsel düzen, transfer, birleştir' },
      { name: 'Adisyon', description: 'Hızlı, modifier destekli' },
      { name: 'Mutfak Ekranı', description: 'KDS, sıra, gecikme uyarısı' },
      { name: 'Kurye Entegre', description: 'Yemeksepeti, Getir, Trendyol' },
      { name: 'QR Menü', description: 'Masa siparişi + çağrı' },
      { name: 'Sadakat', description: 'Kart, puan, kampanya' },
      { name: 'Stok & Reçete', description: 'Otomatik düşme, fire' },
      { name: 'Raporlar', description: 'Z, ciro, garson performans' },
    ],
    faqs: [
      { question: 'Hangi tür işletmeler için uygun?', answer: 'Restoran, kafe, bar, fast food, kahveci, fırın, pastane, dondurmacı, lokanta, pizzacı, lounge, beach club. Tek tezgah veya 50+ şube.' },
      { question: 'Yemeksepeti / Getir entegrasyonu var mı?', answer: 'Evet, Yemeksepeti, Getir Yemek, Trendyol Yemek API entegrasyonu hazır. Sipariş otomatik mutfağa düşer.' },
      { question: 'QR menü nasıl çalışıyor?', answer: 'Her masaya QR yapıştırırsınız. Müşteri telefonu ile okutur, menüyü görür, sipariş verir, garson çağırır, hesabı görür.' },
      { question: 'Mutfak ekranı (KDS) nedir?', answer: 'Mutfak için tablet/TV ekranı. Yeni siparişler renkli kartlar olarak gelir, hazır oldu butonuna basıldığında garsona bildirilir.' },
    ],
    ctaTitle: 'Restoranınızı dijitalleştirin', ctaSubtitle: '14 gün ücretsiz, menünüzü ve masa planınızı kurulum yapalım.', order: 8,
  },
  {
    slug: 'muhasebe', name: 'kooza Muhasebe', icon: 'Calculator', iconColor: '#6366F1', bgColor: '#eef2ff',
    tagline: 'KOBİ için sade, hızlı muhasebe çözümü',
    heroBadge: 'Muhasebe BETA', heroTitle: 'Cari, fatura ve\nbeyanname — tek panel',
    heroSubtitle: 'KOBİ ve mali müşavirler için: cari yönetimi, e-Fatura/e-Arşiv, KDV ve muhtasar beyanname, gelir-gider, bilanço, stok takibi, banka mutabakatı.',
    problems: [
      { title: 'Excel ile cari hesap zor', description: '50+ cari, alacaklı-borçlu durumu kafa karışık, mutabakat yapmak işkence.', icon: 'FileSpreadsheet' },
      { title: 'Beyanname zamanında verilemiyor', description: 'KDV, muhtasar tarih unutuluyor, ceza ödüyorsun.', icon: 'AlarmClockOff' },
      { title: 'Banka mutabakatı manuel', description: 'Banka ekstresi tek tek karşılaştırılıyor, saatlerce iş.', icon: 'Banknote' },
    ],
    features: [
      { title: 'Cari yönetimi', description: 'Alacaklı, borçlu, alacak yaşlandırma, otomatik hatırlatma.', icon: 'Users' },
      { title: 'e-Fatura + e-Arşiv', description: 'GİB onaylı, otomatik kesim, müşteriye mail/SMS gönderim.', icon: 'Receipt' },
      { title: 'KDV + muhtasar beyanname', description: 'Otomatik beyanname hazırlama, GİB\'e elektronik gönderim.', icon: 'FileCheck' },
      { title: 'Gelir-gider tablosu', description: 'Kategori bazlı gelir-gider, dönemsel raporlama, trend analizi.', icon: 'PieChart' },
      { title: 'Banka mutabakatı', description: 'Banka ekstresi içe aktarımı, otomatik eşleşme, fark raporu.', icon: 'Building2' },
      { title: 'Mali müşavir paneli', description: 'Mali müşavirinize otomatik veri akışı, çift veri girişi yok.', icon: 'BookOpen' },
    ],
    benefits: [
      { label: 'Beyanname hazırlık', value: '< 5 dk', description: 'Otomatik hesaplama' },
      { label: 'Mutabakat süresi', value: '-%85', description: 'Banka entegrasyonu' },
      { label: 'Ceza riski', value: '0%', description: 'Otomatik takvim + uyarı' },
      { label: 'Cari sayısı', value: 'Sınırsız', description: 'Hatta hobi planda' },
    ],
    modules: [
      { name: 'Cari Hesap', description: 'Alacaklı, borçlu, yaşlandırma' },
      { name: 'e-Fatura', description: 'Kesim, gönderim, arşiv' },
      { name: 'KDV Beyannamesi', description: 'Otomatik hazırlık' },
      { name: 'Muhtasar', description: 'Stopaj hesaplama' },
      { name: 'Gelir-Gider', description: 'Kategori, dönem, trend' },
      { name: 'Stok', description: 'Ürün, hareket, değerleme' },
      { name: 'Banka Mutabakat', description: 'Ekstre, eşleşme, fark' },
      { name: 'Mali Müşavir', description: 'Veri paylaşımı' },
    ],
    faqs: [
      { question: 'Mali müşavirim ne kullanmalı?', answer: 'Sizinle aynı paneli kullanabilir veya bizden gelen veri exportunu kendi yazılımına aktarabilir. Çift veri girişi olmaz.' },
      { question: 'e-Fatura entegrasyonu hangi entegratörler?', answer: 'GİB tarafından onaylı tüm entegratörler ile çalışır: Logo, Mikro, Nebim, Foriba, Logo İşbaşı vb.' },
      { question: 'Banka entegrasyonu nasıl?', answer: 'XLSX/CSV ekstre yükleyebilirsiniz; sistem otomatik eşleştirir. API entegrasyonu Garanti BBVA, İş Bankası, Akbank vb. için yapım aşamasında.' },
      { question: 'BETA ne demek, kullanmalı mıyım?', answer: 'Çekirdek özellikler tamamen çalışıyor, son rötuşlar yapılıyor. BETA kullanıcılarına %50 indirim ve yıl sonuna kadar ücretsiz upgrade.' },
    ],
    ctaTitle: 'Muhasebe artık dijital', ctaSubtitle: '14 gün ücretsiz, mevcut cari listenizi içe aktarın.', order: 9,
  },
  {
    slug: 'ik', name: 'kooza İK', icon: 'Users', iconColor: '#EC4899', bgColor: '#fdf2f8',
    tagline: 'İnsan kaynakları ve bordro yönetimi',
    heroBadge: 'İK BETA', heroTitle: 'Personel, izin ve\nbordro — tek panel',
    heroSubtitle: 'KOBİ ve orta ölçekli işletmeler için: personel sicili, izin/mesai takibi, bordro hesaplama, SGK bildirim, performans değerlendirme, eğitim takibi, PDKS entegrasyonu.',
    problems: [
      { title: 'İzin takibi WhatsApp\'ta', description: 'Personel WhatsApp\'tan izin istiyor, kayıtsız onaylanıyor, ay sonu hesap karışıyor.', icon: 'MessageCircleX' },
      { title: 'Bordro hesabı manuel', description: 'Vergi, SGK, ek mesai, kesinti — Excel\'de hesaplanıyor; hata payı yüksek.', icon: 'CalculatorIcon' },
      { title: 'SGK bildirimi unutuluyor', description: 'İşe giriş-çıkış bildirimi geç yapılıyor, ceza yiyorsun.', icon: 'AlarmClockOff' },
    ],
    features: [
      { title: 'Personel sicili', description: 'Kimlik, iletişim, banka, sözleşme, izin geçmişi — tek dosyada.', icon: 'IdCard' },
      { title: 'İzin + mesai takibi', description: 'Personel mobilden izin ister, yönetici onaylar, takvime düşer.', icon: 'CalendarCheck' },
      { title: 'Bordro hesaplama', description: 'Otomatik vergi, SGK, ek mesai, kesinti hesabı; PDF bordro.', icon: 'Calculator' },
      { title: 'SGK bildirim entegre', description: 'İşe giriş-çıkış otomatik bildirimi, gecikme uyarısı, e-Bildirge.', icon: 'FileCheck' },
      { title: 'Performans değerlendirme', description: 'Yıllık değerlendirme şablonları, hedef takibi, gelişim planı.', icon: 'TrendingUp' },
      { title: 'PDKS entegrasyonu', description: 'Parmak izi/yüz tanıma cihazları ile entegre giriş-çıkış.', icon: 'Fingerprint' },
    ],
    benefits: [
      { label: 'Bordro hata', value: '< 0.1%', description: 'Otomatik hesaplama' },
      { label: 'İK personel zamanı', value: '-%60', description: 'Otomasyonla' },
      { label: 'SGK ceza', value: '0', description: 'Otomatik bildirim' },
      { label: 'Personel limiti', value: 'Sınırsız', description: 'Pakete göre' },
    ],
    modules: [
      { name: 'Personel Sicili', description: 'Kimlik, iletişim, sözleşme' },
      { name: 'İzin Yönetimi', description: 'Yıllık, mazeret, raporlu' },
      { name: 'Mesai Takibi', description: 'Normal, ek, hafta sonu' },
      { name: 'Bordro', description: 'Vergi, SGK, ek mesai' },
      { name: 'SGK Bildirim', description: 'e-Bildirge, giriş-çıkış' },
      { name: 'Performans', description: 'Hedef, değerlendirme' },
      { name: 'Eğitim Takibi', description: 'Plan, sertifika, arşiv' },
      { name: 'Mobil Personel', description: 'PWA, izin, bordro' },
    ],
    faqs: [
      { question: 'Kaç personel için uygun?', answer: '5\'ten 500\'e kadar. KOBİ ve orta ölçekli işletmeler için tasarlandı. Daha büyük yapılar için Enterprise planı.' },
      { question: 'PDKS cihaz entegrasyonu hangileri?', answer: 'ZKTeco, Anviz, Suprema, Hikvision gibi yaygın PDKS cihazları ile API üzerinden entegre. Cihaz yoksa mobil PWA üzerinden GPS bazlı giriş-çıkış.' },
      { question: 'Bordro hesaplaması güvenilir mi?', answer: 'Güncel vergi dilimleri, SGK oranları, AGİ ile otomatik hesaplama. Mali müşavir kontrolü için PDF/Excel export. BETA döneminde paralel kontrol önerilir.' },
      { question: 'BETA dönemi ne kadar?', answer: '2026 yıl sonuna kadar. BETA kullanıcılarına %50 indirim + sonsuz upgrade. Ana modüller stabil, performans + raporlama özellikleri ekleniyor.' },
    ],
    ctaTitle: 'İK\'yı modernleştirin', ctaSubtitle: '14 gün ücretsiz, mevcut personel listenizi içe aktarın.', order: 10,
  },
]

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: any = { products: 0, menus: 0, solutions: 0, errors: [] }

  for (const p of PRODUCTS) {
    try {
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: { name: p.name, tagline: p.tagline, description: p.description, icon: p.icon, badge: p.badge, videoUrl: p.videoUrl, features: p.features, screenshots: p.screenshots, order: p.order, status: 'ACTIVE' },
        create: { slug: p.slug, name: p.name, tagline: p.tagline, description: p.description, icon: p.icon, badge: p.badge, videoUrl: p.videoUrl, features: p.features, screenshots: p.screenshots, order: p.order, status: 'ACTIVE' },
      })
      results.products++
    } catch (e) {
      results.errors.push(`product:${p.slug}: ${(e as Error).message}`)
    }
  }

  for (const m of MENU_ITEMS) {
    try {
      const existing = await prisma.menuItem.findFirst({ where: { url: m.url, location: 'header' } })
      if (existing) {
        await prisma.menuItem.update({ where: { id: existing.id }, data: { label: m.label, order: m.order, isActive: true } })
      } else {
        await prisma.menuItem.create({ data: { label: m.label, url: m.url, order: m.order, location: 'header', isActive: true } })
      }
      results.menus++
    } catch (e) {
      results.errors.push(`menu:${m.url}: ${(e as Error).message}`)
    }
  }

  for (const s of SOLUTIONS) {
    try {
      await prisma.sectorSolution.upsert({
        where: { slug: s.slug },
        update: { name: s.name, tagline: s.tagline, heroBadge: s.heroBadge, heroTitle: s.heroTitle, heroSubtitle: s.heroSubtitle, icon: s.icon, iconColor: s.iconColor, bgColor: s.bgColor, problems: s.problems as any, features: s.features as any, benefits: s.benefits as any, modules: s.modules as any, faqs: s.faqs as any, ctaTitle: s.ctaTitle, ctaSubtitle: s.ctaSubtitle, order: s.order, isActive: true },
        create: { slug: s.slug, name: s.name, tagline: s.tagline, heroBadge: s.heroBadge, heroTitle: s.heroTitle, heroSubtitle: s.heroSubtitle, icon: s.icon, iconColor: s.iconColor, bgColor: s.bgColor, problems: s.problems as any, features: s.features as any, benefits: s.benefits as any, modules: s.modules as any, faqs: s.faqs as any, ctaTitle: s.ctaTitle, ctaSubtitle: s.ctaSubtitle, order: s.order, isActive: true },
      })
      results.solutions++
    } catch (e) {
      results.errors.push(`solution:${s.slug}: ${(e as Error).message}`)
    }
  }

  return NextResponse.json({
    ok: true,
    summary: { products_seeded: results.products, menus_seeded: results.menus, solutions_seeded: results.solutions, errors: results.errors.length },
    details: results,
  })
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const products = await prisma.product.count({ where: { status: 'ACTIVE' } })
  const menus = await prisma.menuItem.count({ where: { location: 'header', isActive: true } })
  const solutions = await prisma.sectorSolution.count({ where: { isActive: true } })
  return NextResponse.json({ products, menus, solutions, hint: 'POST to seed' })
}
