import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mesafeli Satış Sözleşmesi',
  description: 'kooza ekosistemi mesafeli satış sözleşmesi - 6502 sayılı Tüketicinin Korunması Hakkında Kanun.',
}

export default function MesafeliSatisPage() {
  return (
    <div className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
          📜 Yasal Belge
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Mesafeli Satış Sözleşmesi
        </h1>
        <p className="text-gray-500 mb-12">Son güncelleme: 1 Mayıs 2026</p>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700">
          <h2>1. Taraflar</h2>
          <p>
            <strong>SATICI:</strong> kooza<br />
            <strong>Adres:</strong> Türkiye<br />
            <strong>E-posta:</strong> destek@kooza.tr<br />
            <strong>Web:</strong> kooza.tr
          </p>
          <p>
            <strong>ALICI:</strong> kooza üyelik formu doldurarak hizmet abone olan kişi (gerçek/tüzel)
          </p>

          <h2>2. Sözleşmenin Konusu</h2>
          <p>
            İşbu sözleşme, ALICI&apos;nın SATICI&apos;dan kooza ekosistemi kapsamındaki
            yazılım abonelik hizmetlerini (SaaS) elektronik ortamda satın alması ve
            kullanmasına ilişkin koşulları belirler. 6502 sayılı Tüketicinin Korunması Hakkında
            Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uygulanır.
          </p>

          <h2>3. Hizmetin Özellikleri</h2>
          <ul>
            <li><strong>Hizmet türü:</strong> Bulut tabanlı yazılım abonelik hizmeti (SaaS)</li>
            <li><strong>Teslim:</strong> Anında, dijital ortamda</li>
            <li><strong>Süre:</strong> Aylık veya yıllık (seçime göre)</li>
            <li><strong>Ücret:</strong> kooza.tr/fiyatlandirma sayfasında ilan edilir</li>
            <li><strong>KDV:</strong> Fiyatlara dahildir</li>
          </ul>

          <h2>4. Ödeme</h2>
          <p>
            Ödemeler PCI-DSS uyumlu sanal POS sağlayıcıları (iyzico, PayTR) üzerinden
            kredi/banka kartı ile alınır. Kart bilgileri kooza tarafından saklanmaz;
            doğrudan ödeme sağlayıcısının güvenli sunucularına iletilir.
          </p>

          <h2>5. Cayma Hakkı</h2>
          <p>
            <strong>14 gün koşulsuz iade:</strong> ALICI, abonelik başlangıç tarihinden itibaren
            14 gün içinde herhangi bir gerekçe göstermeksizin sözleşmeden cayma hakkına sahiptir.
          </p>
          <p>Cayma hakkını kullanmak için:</p>
          <ul>
            <li>destek@kooza.tr adresine yazılı bildirim gönderin</li>
            <li>Talebiniz 7 iş günü içinde sonuçlandırılır</li>
            <li>Ücret iadesi orijinal ödeme yöntemine yapılır (10 iş günü içinde)</li>
          </ul>
          <p>
            <strong>İstisna:</strong> ALICI, hizmeti aktif olarak kullanmaya başladıktan sonra
            (örn. veri girişi, müşteri ekleme) cayma hakkını yine kullanabilir; ancak
            kullanım süresi orantılı ücrete tabi olabilir.
          </p>

          <h2>6. Sözleşmenin Süresi ve Yenilenmesi</h2>
          <ul>
            <li><strong>Aylık abonelik:</strong> Her ay otomatik yenilenir, iptal edilmediği sürece devam eder</li>
            <li><strong>Yıllık abonelik:</strong> 12 ay sonunda otomatik yenilenir (önceden bildirim ile)</li>
            <li>İptal: Bir sonraki yenileme tarihinden 7 gün öncesine kadar iptal edilebilir</li>
          </ul>

          <h2>7. Hizmetin İfası</h2>
          <p>
            Ödemeyi takiben en geç 1 saat içinde hesabınız aktive edilir. Bu süre
            içinde hizmet açılmazsa destek@kooza.tr&apos;ye iletişime geçin.
          </p>

          <h2>8. Sorumluluk</h2>
          <p>
            SATICI&apos;nın toplam sorumluluğu, son 12 ayda ALICI&apos;dan tahsil edilen
            abonelik ücreti ile sınırlıdır. Veri kaybı durumunda en güncel yedekten
            geri yükleme yapılır.
          </p>

          <h2>9. Veri Güvenliği</h2>
          <p>
            ALICI&apos;nın sisteme girdiği tüm veriler KVKK ve sektör standartlarına uygun
            olarak şifrelenmiş halde Türkiye/AB sunucularında saklanır. Detay için
            <a href="/kvkk" className="text-purple-700 hover:underline"> KVKK Aydınlatma Metni</a>&apos;ne bakın.
          </p>

          <h2>10. Yetkili Mahkeme</h2>
          <p>
            Sözleşmeden doğan uyuşmazlıklar için <strong>İstanbul Mahkemeleri</strong>
            ve İcra Daireleri yetkilidir. Tüketici uyuşmazlıkları için Tüketici Hakem
            Heyetleri ve Tüketici Mahkemeleri de yetkilidir.
          </p>

          <h2>11. Onay</h2>
          <p>
            ALICI, kooza üyelik formunu doldurup ücreti ödediğinde işbu sözleşmeyi
            okuduğunu, anladığını ve kabul ettiğini beyan eder.
          </p>
        </div>
      </section>
    </div>
  )
}
