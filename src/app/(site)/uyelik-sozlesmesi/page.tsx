import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Üyelik Sözleşmesi',
  description: 'kooza ekosistemi üyelik ve hizmet kullanım sözleşmesi.',
}

export default function UyelikPage() {
  return (
    <div className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
          📜 Yasal Belge
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Üyelik Sözleşmesi
        </h1>
        <p className="text-gray-500 mb-12">Son güncelleme: 1 Mayıs 2026</p>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700">
          <h2>1. Taraflar</h2>
          <p>
            İşbu Üyelik Sözleşmesi (&ldquo;Sözleşme&rdquo;), <strong>kooza</strong> markası altında
            yazılım hizmetleri sunan firma (&ldquo;Hizmet Sağlayıcı&rdquo; veya &ldquo;kooza&rdquo;)
            ile bu hizmetlere üye olan gerçek/tüzel kişi (&ldquo;Üye&rdquo;) arasında akdedilmiştir.
          </p>

          <h2>2. Konu</h2>
          <p>
            Sözleşmenin konusu, kooza ekosistemi altındaki yazılım hizmetlerinin
            (Randevu, Eğitim, Mesken, Tamir, Hukuk, İnşaat, Emlak, Servis, Muhasebe, İK)
            abonelik temelli olarak kullanılmasına ilişkin koşulları belirlemektir.
          </p>

          <h2>3. Üyelik Şartları</h2>
          <ul>
            <li>18 yaşını doldurmuş olmak</li>
            <li>Tüzel kişiyi temsil yetkisine sahip olmak (firma için)</li>
            <li>Doğru ve güncel bilgi vermek</li>
            <li>Türkiye Cumhuriyeti yasalarına uygun faaliyet göstermek</li>
          </ul>

          <h2>4. Hizmetin Niteliği</h2>
          <p>
            kooza, hizmetlerini &ldquo;olduğu gibi&rdquo; ve &ldquo;mevcut olduğu sürece&rdquo;
            sunar. Sürekli erişim için makul çaba gösterilir; ancak teknik bakım, planlı kesinti
            veya öngörülemeyen aksaklıklar nedeniyle erişim geçici olarak engellenebilir.
            kooza beta aşamasında olan hizmetler için &ldquo;BETA&rdquo; rozeti kullanır;
            bu hizmetlerin tam fonksiyonelliği garanti edilmez.
          </p>

          <h2>5. Ücret ve Ödeme</h2>
          <ul>
            <li>Aboneliğin ücreti, kooza.tr/fiyatlandirma adresinde yayımlanan tarifelere göredir</li>
            <li>Yeni kullanıcılar 14 günlük ücretsiz deneme hakkına sahiptir</li>
            <li>Aboneliğe geçildikten sonra ödeme aylık veya yıllık olarak otomatik tahsil edilir</li>
            <li>Ödemeler PCI-DSS uyumlu sanal POS sağlayıcıları (iyzico, PayTR) üzerinden alınır</li>
            <li>Fiyat değişiklikleri en az 30 gün önceden Üye&apos;ye bildirilir</li>
          </ul>

          <h2>6. İade ve İptal</h2>
          <ul>
            <li><strong>14 gün koşulsuz iade:</strong> İlk ödemeden sonra 14 gün içinde iptal hakkı vardır</li>
            <li><strong>Aylık abonelik iptali:</strong> Bir sonraki dönem başlamadan iptal edilebilir</li>
            <li><strong>Yıllık abonelik:</strong> Kalan dönem için iade yapılmaz, hizmet dönem sonuna kadar devam eder</li>
            <li>İptal talebi <a href="mailto:destek@kooza.tr" className="text-purple-700 hover:underline">destek@kooza.tr</a> adresine gönderilebilir</li>
          </ul>

          <h2>7. Üye&apos;nin Yükümlülükleri</h2>
          <ul>
            <li>Hesap güvenliğini sağlamak (şifre koruma)</li>
            <li>Hizmeti yasalara aykırı amaçlarla kullanmamak</li>
            <li>Diğer kullanıcıların verilerine yetkisiz erişim sağlamaya çalışmamak</li>
            <li>Sistemin işleyişini bozacak eylemlerden kaçınmak (DDoS, scraping vb.)</li>
            <li>Hizmet kapsamında oluşturduğu içerikten (müşteri verisi, dava bilgisi vb.) Üye sorumludur</li>
          </ul>

          <h2>8. kooza&apos;nın Yükümlülükleri</h2>
          <ul>
            <li>Hizmetin sürekli erişilebilir olması için makul çabayı göstermek</li>
            <li>Verilerin güvenliğini KVKK ve sektörel standartlar çerçevesinde sağlamak</li>
            <li>Yedeklenmiş veri kaybı yaşandığında en yakın yedekten geri yüklemek</li>
            <li>Müşteri desteğini iş günleri 09:00-18:00 arası sağlamak</li>
          </ul>

          <h2>9. Sorumluluk Sınırı</h2>
          <p>
            kooza, dolaylı, arızi veya sonuçsal zararlardan sorumlu değildir. Toplam sorumluluk,
            son 12 ayda Üye tarafından ödenen abonelik ücreti ile sınırlıdır. Üye&apos;nin
            sistemde tuttuğu verilerden kaynaklı uyuşmazlıklarda kooza taraf olmaz.
          </p>

          <h2>10. Fikri Mülkiyet</h2>
          <p>
            Yazılım, marka, logo ve tüm tasarım unsurları kooza&apos;ya aittir.
            Üye, hizmetleri kişisel/ticari kullanım dışında çoğaltamaz, dağıtamaz, tersine
            mühendislik yapamaz.
          </p>

          <h2>11. Sözleşmenin Sona Ermesi</h2>
          <p>
            kooza, sözleşmeye aykırılık, ödememe veya yasalara aykırı kullanım hallerinde
            hesabı askıya alma veya sonlandırma hakkını saklı tutar. Hesap kapatıldığında
            6 ay süreyle veriler arşivde tutulur, sonra silinir.
          </p>

          <h2>12. Uyuşmazlıkların Çözümü</h2>
          <p>
            Bu sözleşmeden doğan uyuşmazlıklarda <strong>İstanbul Mahkemeleri</strong> ve
            İcra Daireleri yetkilidir. Uyuşmazlıklarda Türkiye Cumhuriyeti yasaları geçerlidir.
          </p>

          <h2>13. İletişim</h2>
          <p>
            <strong>E-posta:</strong> <a href="mailto:destek@kooza.tr" className="text-purple-700 hover:underline">destek@kooza.tr</a><br />
            <strong>Web:</strong> <a href="https://kooza.tr" className="text-purple-700 hover:underline">kooza.tr</a>
          </p>
        </div>
      </section>
    </div>
  )
}
