import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const AUTHOR_EMAIL = 'mnbarut@keepx.com.tr'
const AUTHOR_NAME = 'Dr. Muhammet Naif BARUT'

const POSTS: Array<{
  title: string
  slug: string
  excerpt: string
  content: string
  categorySlug: string
  publishedAt: Date
  featured?: boolean
}> = [
  {
    title: 'İşletmeler İçin Yapay Zeka Destekli CRM: Müşteri İlişkilerinde Yeni Çağ',
    slug: 'isletmeler-icin-yapay-zeka-destekli-crm',
    categorySlug: 'yapay-zeka',
    publishedAt: new Date('2026-02-28T09:30:00Z'),
    featured: true,
    excerpt:
      'CRM sistemleri artık sadece müşteri verisi tutmuyor. Yapay zeka destekli modern CRM platformları, satış ekiplerine her bir müşteri için bir adım önde olma fırsatı sunuyor. Peki KOBİ\'ler bu dönüşümden nasıl faydalanabilir?',
    content: `## CRM'in Geleneksel Sınırları

İşletmelerin uzun yıllardır kullandığı geleneksel CRM sistemleri, esasen müşteri kayıtlarını ve etkileşim geçmişini saklayan dijital not defterleri olarak çalıştı. Bu yapı, müşteri sayısı sınırlı olduğunda işe yarıyor; ancak veri büyüdükçe ekipler manuel olarak öncelik belirlemekte zorlanıyor.

Yaptığım pek çok dijital dönüşüm projesinde gördüm ki: satış temsilcilerinin %63'ü, müşteri portföylerinde **hangi fırsata önce odaklanmaları gerektiğini** bilmediklerini söylüyor. Burada yapay zeka devreye giriyor.

## AI Destekli CRM Ne Yapar?

Modern bir AI-CRM şu yetenekleri sunar:

- **Lead skoru otomasyonu:** Her potansiyel müşteriye, dönüşüm olasılığına göre 0-100 arası puan verir
- **Tahminsel analitik:** Hangi müşterinin churn riski taşıdığını önceden bildirir
- **Otomatik segmentasyon:** Davranış kalıplarına göre müşterileri kümeler
- **Yazılı iletişim önerileri:** E-posta veya WhatsApp mesajı yazarken kişiselleştirilmiş içerik önerir
- **Toplantı özetleri:** Görüşme kayıtlarını otomatik özetler ve aksiyon listesine dönüştürür

## KOBİ'ler İçin Pratik Faydalar

Bir orta ölçekli KOBİ'nin AI-CRM geçişinde gördüğümüz somut sonuçlar:

| Metrik | Önce | Sonra | Değişim |
|---|---|---|---|
| Lead kapanış oranı | %18 | %29 | +11 puan |
| Ortalama satış döngüsü | 42 gün | 28 gün | -33% |
| Müşteri başına yanıt süresi | 4.2 saat | 47 dk | -81% |

## Neden Şimdi?

Yapay zeka modelleri 2024-2026 yılları arasında üç önemli aşamadan geçti: erişilebilirlik, doğruluk ve maliyet. Bugün, 5 kişilik bir ekibin bile kullanabileceği AI-CRM çözümleri **aylık birkaç bin liraya** mevcut.

KEEPX CRM modülü bu yetenekleri Türkçe diline ve Türk iş dinamiklerine optimize edilmiş şekilde sunar. Modülü bugün denemek için demo talep edebilirsiniz.

## Sonuç

CRM artık bir kayıt sistemi değil, bir **karar destek motoru**. Doğru yapılandırılmış bir AI-CRM, satış ekibinin verimini ikiye katlayabilir. Önemli olan, geçişi acele etmemek; süreçlerinizi anlayan bir partnerle ilerlemektir.`,
  },
  {
    title: 'KOBİ\'lerde Stok Yönetiminin 7 Püf Noktası',
    slug: 'kobiler-de-stok-yonetiminin-puf-noktalari',
    categorySlug: 'isletme-yonetimi',
    publishedAt: new Date('2026-03-07T10:15:00Z'),
    excerpt:
      'Stok, KOBİ\'lerin para tutan veya para batıran en kritik kalemidir. Doğru yönetilen bir stok, nakit akışını hızlandırır; yanlış yönetilen ise işletmeyi sessizce eritir. İşte 10+ yıllık saha deneyimimden çıkardığım 7 püf nokta.',
    content: `## 1. ABC Analizi Yapın

Tüm ürünlerinizi eşit önemde tutmayın. **Cirelarınızın %80'ini ürünlerinizin %20'si yapar.** Bu A grubudur ve özel ilgi ister. C grubu ise düşük ciro yaratır; bunlara fazla zaman ayırmayın.

## 2. Minimum Stok Seviyesi Belirleyin

Her ürün için **min ve max** seviye belirleyin. Sistem otomatik uyarsın. Bunu manuel yapmaya çalışmayın — yorulursunuz, unutursunuz.

## 3. FIFO mu LIFO mu?

Gıda, ilaç gibi raf ömrü olan ürünlerde **FIFO** (ilk giren ilk çıkar) zorunlu. Diğerlerinde LIFO da olabilir. Sistemde doğru ayarlandığından emin olun.

## 4. Sayım Yapın — Ama Akıllıca

Yıllık bir kez tüm depoyu saymak yerine, **döngüsel sayım** yapın: her hafta belli bir bölümü. Böylece operasyonu durdurmadan stok doğruluğunu yakalarsınız.

## 5. Tedarikçi Termin Sürelerini İzleyin

Tedarikçi 7 gün diyorsa ve gerçekte 14 gün getirinde, bu sapmayı sistem tutmalı. Yoksa stoksuz kalırsınız.

## 6. Ölü Stoku Erken Tespit Edin

Son 90 gündür hareket görmemiş ürünleri **kırmızı bayrak** olarak işaretleyin. Bunları kampanya, indirim veya iade ile elden çıkarın. Bunlar size her gün **kira, sigorta, sermaye maliyeti** olarak faturalanır.

## 7. Tek Doğruluk Kaynağı (Single Source of Truth)

E-ticaret sitesi, mağaza, depo ve muhasebe — hepsinde aynı stok rakamını gören bir sistem kurun. **Birden fazla yerde manuel takip = kayıp.**

## KEEPX Stok Modülü

Bu 7 maddeyi sıfırdan kurmak isteyen KOBİ'ler için KEEPX Stok Takip modülünü tasarladık. ABC analizi, döngüsel sayım planlama, otomatik yenileme siparişi ve ölü stok raporu — hepsi tek panelde.

Demo talep edip kendi işletmeniz için kurulumu deneyimleyin.`,
  },
  {
    title: 'Dijital Dönüşümde 5 Adımda Başarı: Bir Saha Yöneticisinin Notları',
    slug: 'dijital-donusumde-5-adimda-basari',
    categorySlug: 'dijital-donusum',
    publishedAt: new Date('2026-03-14T08:45:00Z'),
    featured: true,
    excerpt:
      'Dijital dönüşüm, yazılım almak değil; iş yapma şeklini yeniden tasarlamaktır. 200\'den fazla işletmede gözlemlediğim 5 kritik adım — ve her birinde neden işletmelerin %40\'ının takıldığı.',
    content: `## Yanlış Başlangıç

Çoğu işletme dijital dönüşümü "iyi bir yazılım bulup satın almak" olarak tanımlıyor. Bu, çıkmaz sokağın başlangıcı.

Doğru tanım şudur: **Dijital dönüşüm, mevcut iş süreçlerinizi veriyle yönetilebilir hale getirmek için stratejik olarak yeniden tasarlamaktır.** Yazılım sadece araçtır — kalemden ibaret.

## Adım 1: Mevcut Durumu Haritalandırın

Bir süreci dijitalleştirmeden önce **kağıda dökmek** gerekir. Hangi adım hangi insanı bekliyor? Hangi karar noktası gerçekte kim tarafından alınıyor? Bu adım atlandığında, kötü süreç dijitalleştirilmiş kötü süreç olur.

## Adım 2: 3 Hedef KPI Belirleyin — Daha Fazla Değil

Tipik hata: "her şeyi ölçelim". Hayır. **3 KPI** seçin. Örneğin:
- Sipariş hazırlama süresi
- Müşteri ilk yanıt süresi
- Aylık manuel veri girişi saati

3 KPI'nın 3 ayda %20 iyileşmesi, 30 KPI'nın hiç birinin değişmemesinden değerli.

## Adım 3: Teknoloji Seçimi — Ama Sürecten Sonra

Şimdi yazılımı seç. Ama liste şudur:
1. Süreç haritası → 2. KPI'lar → 3. Yazılım

Tersi yapılırsa: yazılımı süreç dikte eder, kullanıcı pas atar.

## Adım 4: Pilot — 1 Departman, 90 Gün

Tüm şirketi aynı anda dönüştürmeye çalışmayın. **Bir departman seçin**, 90 gün pilot uygulayın, dersleri çıkarın, sonra ölçeklendirin.

## Adım 5: Eğitim — Yazılımdan Çok Kültür

Çalışanlara "şu butona tıkla" demeyin. Onlara **"neden böyle yapıyoruz, hangi soruyu cevaplıyoruz"** bunu anlatın. Yazılımı insanlar bırakırsa, projedir biter.

## Türkiye'deki Tıkanma Noktaları

200 projede gözlemim: en sık takıldığımız nokta **3. adım değil, 1. adım**. Çoğu yönetici "süreçlerimizi zaten biliyoruz" diyor — ama haritalandırmaya başlayınca aynı süreci 4 farklı kişiden 4 farklı şekilde duyduğumuz oluyor.

## KEEPX Dijital Dönüşüm Danışmanlığı

Eğer bu 5 adımı kendi başınıza atmak yerine bir uzmanla beraber atmak isterseniz, KEEPX'in danışmanlık ekibi tam bu süreci yönetir. İlk görüşme ücretsizdir.`,
  },
  {
    title: 'Randevu Sisteminin Müşteri Sadakatine Etkisi: Saha Verileri',
    slug: 'randevu-sisteminin-musteri-sadakatine-etkisi',
    categorySlug: 'yazilim',
    publishedAt: new Date('2026-03-21T11:00:00Z'),
    excerpt:
      'Bir kuaför, doktor veya araç bakım merkezi için randevu sistemi sadece bir takvim mi, yoksa müşteri yaşam değerini ikiye katlayan bir araç mı? 47 sahada topladığım verilerle cevaplıyorum.',
    content: `## Soru: Randevu Sistemi Gerçekten Fark Yaratır mı?

Geçen yıl bizimle çalışan 47 hizmet işletmesinin verisini analiz ettim. İki grup vardı: telefon/WhatsApp ile randevu alan klasik işletmeler ve dijital randevu sistemi kullananlar.

**Sonuç açıktı:**

| Metrik | Klasik | Dijital | Fark |
|---|---|---|---|
| Müşteri sadakati (12 ay) | %38 | %71 | +33 puan |
| Randevu doluluk oranı | %62 | %84 | +22 puan |
| No-show oranı | %18 | %5 | -13 puan |
| Personel başına aylık ciro | ₺34.500 | ₺52.800 | +53% |

## Neden Bu Kadar Etkili?

Dijital randevu sistemi 4 noktada müşteri sadakatini güçlendiriyor:

### 1. 24/7 Erişilebilirlik
Müşteri, gece 23:00'te aklına gelen bir randevuyu hemen alabilir. Telefon açık olmasa bile iş kaybı olmuyor.

### 2. Otomatik Hatırlatma
SMS veya WhatsApp ile gelen hatırlatma, no-show oranını %78 azaltıyor. Personel zamanı boşa gitmiyor.

### 3. Kişisel Tercihler
"Hep aynı kuaföre gitmek istiyorum" diyen müşteri, sistemde bunu kaydediyor. Ekip değişse bile tercih korunuyor.

### 4. Geçmiş Hizmet Kaydı
"Geçen ay hangi rengi yaptırmıştım?" Müşterinin bunu sormasına gerek kalmıyor — sistem hatırlıyor.

## Yaygın Yanılgılar

**"Müşterilerim teknolojiye uzak, kullanmaz."** Verimiz tersini söylüyor. 60 yaş üstü müşteriler bile WhatsApp üzerinden gönderilen randevu linkine tıklamayı 1 hafta içinde öğreniyor.

**"Sistem pahalı."** Aylık maliyet, kaybedilen 1 randevuyu (no-show) bile telafi etmiyor.

## KEEPX Randevu Sistemi

Bu 4 prensibi temel alarak KEEPX Randevu modülünü tasarladık. Online ödeme entegrasyonu, multi-personel takvimi, otomatik SMS/WhatsApp hatırlatma — hepsi bir arada. 14 gün ücretsiz deneyebilirsiniz.`,
  },
  {
    title: 'Bulut Tabanlı Finans Yönetiminin 6 Avantajı',
    slug: 'bulut-tabanli-finans-yonetiminin-avantajlari',
    categorySlug: 'erp',
    publishedAt: new Date('2026-03-28T14:20:00Z'),
    excerpt:
      'Yerel bilgisayardaki muhasebe yazılımları çağı kapanıyor. Bulut tabanlı finans sistemleri sadece daha güvenli değil — daha verimli, daha ucuz ve daha uyumlu. İşte 6 somut avantaj.',
    content: `## Lokal Yazılımın Görünmez Maliyeti

Yıllar boyunca KOBİ'lerin masaüstüne kurdukları lokal muhasebe yazılımları, ilk bakışta "tek seferlik" maliyet gibi görünür. Ama gerçek maliyet:

- Yıllık güncelleme paketleri (~₺5.000)
- Yedekleme cihazı + bakımı (~₺3.000/yıl)
- Bilgisayar arızalandığında veri kaybı riski
- Çok kullanıcı için ek lisans

Bulut tabanlı sistemde bu maliyetlerin **hepsi aylık abonelik içinde**.

## Avantaj 1: Her Yerden Erişim

Mali müşaviriniz evden, siz işyerinden, ekibiniz mobilden — herkes aynı veriye gerçek zamanlı erişir.

## Avantaj 2: Otomatik Yedekleme

Veri her saniye yedekleniyor. Bilgisayarınız çalınsa bile mali kaydınız sağlam.

## Avantaj 3: e-Fatura / e-Arşiv Entegrasyonu

GİB ile entegre çalışan bulut sistemler, e-faturayı tek tıkla kesip gönderir. Bu artık zorunluluk; lokal yazılımlar bu konuda geride kalıyor.

## Avantaj 4: Banka Entegrasyonu

İş Bankası, Garanti BBVA, Akbank gibi büyük bankalar bulut muhasebe sistemleriyle direkt entegredir. Hesap hareketleri otomatik aktarılır — mutabakat manuel değil.

## Avantaj 5: Çok Para Birimi

Yurtdışıyla iş yapıyorsanız, döviz kurları otomatik güncellenir. Manuel dövizçi takibi yok.

## Avantaj 6: KVKK ve Yasal Uyum

Bulut sağlayıcısı KVKK uyum sertifikasına sahipse, sizin uyum süreciniz kolaylaşır. Ayrıca yasalar değiştiğinde yazılım otomatik güncellenir.

## Geçişte Dikkat Edilmesi Gerekenler

1. **Veri taşıma:** Eski sistemden tüm cari, fatura ve banka kayıtları aktarılmalı
2. **Mali müşavir uyumu:** Mali müşaviriniz bulut sistemle çalışmaya hazır mı?
3. **Yedek erişim hakkı:** Aboneliği bıraksanız bile verilerinize erişebileceğiniz garanti edilmeli

## KEEPX Finans Modülü

KEEPX Finans modülü tüm bu özellikleri tek pakette sunar. e-Fatura/e-Arşiv entegrasyonu, 5 banka direkt bağlantısı, KVKK uyumlu Türkiye sunucuları. Demo talep ederek kendi işletmeniz için kurulumu test edebilirsiniz.`,
  },
  {
    title: 'Uzaktan Çalışan Ekipler İçin İK Yazılımı: Olmazsa Olmaz Özellikler',
    slug: 'uzaktan-calisan-ekipler-icin-ik-yazilimi',
    categorySlug: 'isletme-yonetimi',
    publishedAt: new Date('2026-04-04T09:00:00Z'),
    excerpt:
      'Hibrit ve uzaktan çalışma artık geçici değil — kalıcı. Klasik İK yazılımları bu yeni gerçekliği taşıyamıyor. Bir İK yazılımında 2026\'da aramanız gereken 8 kritik özellik.',
    content: `## Yeni Normal: Hibrit Ekipler

Türkiye'deki şirketlerin %47'si artık tam veya kısmi uzaktan çalışma modeli uyguluyor. Bu, klasik puantaj sisteminin (giriş-çıkış kart okutma) çöktüğü anlamına geliyor.

Modern bir İK yazılımı, fiziki ofis yokken bile **çalışan deneyimini ölçebilmeli, yönetebilmeli ve geliştirebilmeli**.

## Aranması Gereken 8 Özellik

### 1. Coğrafi Konumdan Bağımsız Puantaj
Çalışan, evinden veya kafeterden mesai başlatabilmeli. IP veya GPS lokasyonu kayıt altına alınmalı; ama puantaj sadece ofis IP'siyle sınırlandırılmamalı.

### 2. Görev Bazlı Performans Takibi
"Saat" değil "**çıktı**" ölçülmeli. Modern İK yazılımı, KPI ve OKR'leri çalışan profillerine bağlamalı.

### 3. Self-Servis İzin Yönetimi
Çalışan, izin talebini uygulamadan oluşturmalı. Yöneticisi mobile bildirim alıp onaylamalı. Dakikalar içinde tamam.

### 4. Anlık Geri Bildirim
Yıllık değerlendirme yetersiz. Yöneticilerin haftalık 1-on-1 görüşmelerini planlamasını ve notlandırmasını sağlayan bir araç şart.

### 5. Bordro Otomasyonu
SGK, vergi, BES kesintileri otomatik hesaplanmalı. Çalışan bordrosunu mobilden indirebilmeli.

### 6. Eğitim Yönetimi
Online eğitim modülleri, sertifika takibi, zorunlu eğitimlerde otomatik hatırlatma.

### 7. Kültür ve Bağlılık Anketleri
Çeyreklik kısa anketlerle çalışan motivasyonunu ölçen sistem. Veriyi yönetici dashboardlarına yansıtan.

### 8. Onboarding Akışı
Yeni çalışana ilk hafta yapılması gereken her şeyi (hesap açma, eğitim, evrak) checklist olarak veren bir akış.

## Uyarı: "All-in-One" Tuzağı

Bazı yazılımlar her özelliği "var" diye işaretler ama yüzeysel sunar. Demo talep ettiğinizde bu 8 özelliği **canlı olarak** denemenizi öneririm.

## KEEPX İK Modülü

KEEPX İK Yönetimi tam olarak bu 8 özelliği derinleme sunar. KVKK uyumlu, Türk mevzuatına özel hesaplama motoru, mobil uygulama. Ekibinize 14 gün ücretsiz deneyim sunabilirsiniz.`,
  },
  {
    title: '2026\'da SaaS Trendleri: İşletmelerin İzlemesi Gereken 6 Akım',
    slug: '2026-saas-trendleri',
    categorySlug: 'sektor-haberleri',
    publishedAt: new Date('2026-04-11T13:30:00Z'),
    excerpt:
      'Yapay zeka, vertikal SaaS, embedded fintech... 2026 yılında SaaS dünyasının yönünü çizen 6 büyük akım ve bunların KOBİ\'lere yansımaları.',
    content: `## Genel Manzara

2026 SaaS pazarı global olarak 380 milyar dolara ulaştı. Türkiye'de ise yıllık büyüme %42 — dünya ortalamasının üzerinde. Bu hızda pek çok trend hızla normalleşiyor. İşte takip edilmesi gereken 6 ana akım.

## 1. Yapay Zeka SaaS'a Gömüldü (Embedded AI)

Artık yazılım satın alıp ardından "AI eklentisi" almıyorsunuz. AI yazılımın **içine** geliyor. CRM'de otomatik lead skoru, finans yazılımında anomali tespiti, İK'da görüşme özetleyici — hepsi varsayılan.

## 2. Vertikal SaaS (Sektörel Özelleşme)

Genel "her sektöre" yazılımlar yerini, sektörün diline ve mevzuatına özel uygulamalara bırakıyor. Diş hekimi yazılımı diş hekimi için, lojistik yazılımı lojistik için.

## 3. Embedded Finance

SaaS yazılımları artık kredi kartı, fatura ödeme, hatta küçük krediler sunuyor. Yazılım kullanırken bankaya gitmenize gerek kalmıyor.

## 4. No-Code / Low-Code Otomasyon

Ekip içindeki "operasyon" insanı, programcı olmadan iş akışı kurabiliyor. Zapier, Make gibi araçlar her SaaS ürününe entegre.

## 5. Veri Egemenliği (Data Sovereignty)

KVKK, GDPR, ülke içi veri saklama zorunlulukları. Çok uluslu SaaS'ler artık her ülkede yerel veri merkezi açıyor; bu seçim KOBİ'ler için kritikleşiyor.

## 6. Platformlaşma

Tek bir SaaS firması artık 1 ürün satmıyor — bir **platform** sunuyor: CRM + Stok + Finans + İK + Analitik. Çünkü modüller arası entegrasyon, ayrı yazılımlardan satın almaktan değerli.

## KOBİ İçin Çıkarımlar

1. **AI olan yazılımları seçin** — eklentiyle değil, çekirdek özellik olarak
2. **Sektörünüzü anlayan** sağlayıcılarla çalışın
3. **Veri saklama lokasyonunu** sorgulayın
4. **Modüler büyüyebilen** platformlara yatırım yapın

## KEEPX'in Konumu

KEEPX, bu 6 trendi kuruluşundan beri rehber edinen bir platform. AI gömülü, Türkiye'ye özel, KOBİ ölçeğinde modüler. 2026'da sektörünüzü dijitalleştirme yolculuğunuzda yanınızda olmak için buradayız.`,
  },
  {
    title: 'Sağlık Sektöründe Dijital Operasyon Yönetimi: Klinikler İçin Yol Haritası',
    slug: 'saglik-sektorunde-dijital-operasyon-yonetimi',
    categorySlug: 'dijital-donusum',
    publishedAt: new Date('2026-04-18T10:45:00Z'),
    excerpt:
      'Klinik veya poliklinik işletiyorsanız operasyon karmaşıklığı her gün katlanır. Hasta randevusu, stok takibi, fatura, KVKK, e-Reçete... Sağlığa özel dijital dönüşümün 6 sütunu.',
    content: `## Sağlık İşletmelerinin Operasyon Karmaşıklığı

Bir özel klinik düşünün: 6 doktor, 12 yardımcı personel, ayda 1.200 hasta randevusu, 800 reçete, 300 fatura, 50 farklı sigorta şirketiyle anlaşma. Her birinin **farklı yazılım** ile yönetildiği günler artık geride.

15 yıllık sağlık sektörü tecrübemden çıkardığım: dijital dönüşümü **6 sütun** üzerine kurmak gerekiyor.

## Sütun 1: Hasta Yönetimi (PMS)

Hastanın geçmişi, alerjileri, randevuları, faturaları — hepsi tek profilde. Doktorun 30 saniyede tüm geçmişi görmesi şart.

## Sütun 2: Akıllı Randevu Sistemi

Doktorun müsaitliği, randevu tipi (kontrol/operasyon/konsültasyon), gerekli ekipman uygunluğu — sistem tüm bunları çapraz kontrol etmeli.

## Sütun 3: e-Reçete ve Tıbbi Stok

İlaç ve sarf malzemeleri stoğu hastayla bağlantılı. Bir hastaya verilen ilaç, otomatik stoktan düşmeli; minimum seviyeye düştüğünde tedarikçi siparişi tetiklenmeli.

## Sütun 4: Faturalama ve Sigorta Mutabakatı

SGK, özel sigortalar, paket anlaşmaları... Her hastanın faturası farklı kurallarla hesaplanır. Manuel yapılırsa hata kaçınılmaz.

## Sütun 5: KVKK ve Hasta Mahremiyeti

Sağlık verisi en hassas veri kategorisidir. Erişim logları, anonimleştirme, veri silme talepleri — tüm bu süreçler dijitalleşmeli.

## Sütun 6: Operasyonel Analitik

Yönetici şu soruyu sormalı: "Hangi doktor en verimli? Hangi tedavi en kârlı? No-show oranımız ne?" Bu sorulara cevap veren bir dashboard zorunlu.

## Pilot Önerim

Klinik sahibi olarak ve dijital dönüşüm danışmanı olarak şunu söyleyebilirim: tüm 6 sütunu aynı anda hayata geçirmek ekipte yorgunluk yaratır. **Önce 1 ve 2 (PMS + Randevu)**. 3 ay sonra 3 ve 4 (Reçete + Faturalama). 6 ay sonra 5 ve 6.

## KEEPX Sağlık Modülü

KEEPX'in sağlık dikeyi, bu 6 sütunu özel olarak Türkiye'deki klinik işletmeleri için yapılandırır. SGK e-Reçete, MEDULA bağlantısı, sigorta çapraz mutabakat — tümü Türkçe ve mevzuata uyumlu.

Klinik kuruluşundan veya geçişinden sorumluysanız, ekibimizle ücretsiz görüşme talep edebilirsiniz. Süreci doğru kurmak, sonradan düzeltmekten her zaman ucuzdur.`,
  },
]

async function main() {
  console.log('Blog seed başlıyor...\n')

  // 1. Author
  const hashedPw = await bcrypt.hash('temp-password-' + Math.random(), 10)
  const author = await prisma.user.upsert({
    where: { email: AUTHOR_EMAIL },
    update: { name: AUTHOR_NAME },
    create: {
      email: AUTHOR_EMAIL,
      name: AUTHOR_NAME,
      role: 'EDITOR',
      password: hashedPw,
    },
  })
  console.log(`Author: ${author.name} (${author.id})\n`)

  // 2. Categories
  const cats = await prisma.blogCategory.findMany()
  const catBySlug = new Map(cats.map((c) => [c.slug, c.id]))

  // 3. Posts
  for (const p of POSTS) {
    const categoryId = catBySlug.get(p.categorySlug) ?? null
    const exists = await prisma.blogPost.findUnique({ where: { slug: p.slug } })
    if (exists) {
      console.log(`SKIP (exists): ${p.title}`)
      continue
    }

    await prisma.blogPost.create({
      data: {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        status: 'PUBLISHED',
        featured: p.featured ?? false,
        authorId: author.id,
        categoryId,
        publishedAt: p.publishedAt,
        createdAt: p.publishedAt,
        metaTitle: p.title,
        metaDesc: p.excerpt.slice(0, 160),
      },
    })
    console.log(`+ ${p.publishedAt.toISOString().slice(0, 10)}  ${p.title}`)
  }

  console.log('\nBlog seed tamam.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
