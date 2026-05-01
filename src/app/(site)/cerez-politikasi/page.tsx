import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Çerez Politikası',
  description: 'kooza ekosistemi çerez (cookie) kullanım politikası.',
}

export default function CerezPage() {
  return (
    <div className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
          🍪 Yasal Belge
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Çerez Politikası
        </h1>
        <p className="text-gray-500 mb-12">Son güncelleme: 1 Mayıs 2026</p>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700">
          <h2>1. Çerez Nedir?</h2>
          <p>
            Çerezler (cookies), bir internet sitesini ziyaret ettiğinizde tarayıcınız tarafından
            cihazınıza yerleştirilen küçük metin dosyalarıdır. Sitenin sizi tanımasına,
            tercihlerinizi hatırlamasına ve daha iyi bir deneyim sunmasına yardımcı olur.
          </p>

          <h2>2. Hangi Çerezleri Kullanıyoruz?</h2>

          <h3 className="text-xl font-bold mt-8 mb-3">🔒 Zorunlu Çerezler</h3>
          <p>
            Sitenin çalışması için zorunlu çerezlerdir. Kapatılamaz. Örneğin:
          </p>
          <ul>
            <li>Oturum çerezi (giriş bilgisi)</li>
            <li>Güvenlik çerezi (CSRF koruması)</li>
            <li>Tercih çerezi (dil, tema)</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-3">📊 Performans Çerezleri</h3>
          <p>
            Sitenin nasıl kullanıldığını anlamamıza yardımcı olur. Anonim verilerden oluşur.
          </p>
          <ul>
            <li>Vercel Analytics — sayfa görüntüleme istatistikleri</li>
            <li>Sentry — hata izleme</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-3">🎯 Pazarlama Çerezleri</h3>
          <p>
            Yalnızca <strong>açık rıza</strong> verdiğinizde kullanılır.
          </p>
          <ul>
            <li>Google Ads dönüşüm takibi (opsiyonel)</li>
            <li>Meta (Facebook) Pixel (opsiyonel)</li>
          </ul>

          <h2>3. Çerezleri Nasıl Kontrol Edebilirim?</h2>
          <p>
            Tarayıcınızın ayarlarından çerezleri yönetebilirsiniz:
          </p>
          <ul>
            <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
            <li><strong>Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler ve Site Verileri</li>
            <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezler</li>
            <li><strong>Edge:</strong> Ayarlar → Çerezler ve Site İzinleri</li>
          </ul>
          <p>
            <strong>Not:</strong> Zorunlu çerezleri kapatırsanız sitenin bazı işlevleri çalışmayabilir.
          </p>

          <h2>4. Üçüncü Taraf Çerezler</h2>
          <p>
            Sitemizde aşağıdaki üçüncü taraf hizmetlerin çerezleri bulunabilir:
          </p>
          <ul>
            <li><strong>Vercel</strong> (hosting + analytics)</li>
            <li><strong>iyzico/PayTR</strong> (ödeme — sadece ödeme sayfasında)</li>
            <li><strong>YouTube/Vimeo</strong> (gömülü videolar için)</li>
          </ul>
          <p>
            Bu hizmetlerin kendi gizlilik politikaları vardır.
          </p>

          <h2>5. Çerez Bilgileri Ne Kadar Saklanır?</h2>
          <ul>
            <li>Oturum çerezleri: Tarayıcı kapatıldığında silinir</li>
            <li>Kalıcı çerezler: 30 gün - 1 yıl arası</li>
            <li>Pazarlama çerezleri: 90 gün</li>
          </ul>

          <h2>6. Değişiklikler</h2>
          <p>
            Bu politikayı zaman zaman güncelleyebiliriz. Önemli değişiklikleri ana sayfada
            bildirgi ile duyururuz. Son güncelleme tarihini sayfanın üstünde görebilirsiniz.
          </p>

          <h2>7. İletişim</h2>
          <p>
            Çerez kullanımı hakkında sorularınız için:
            <a href="mailto:kvkk@kooza.tr" className="text-purple-700 hover:underline"> kvkk@kooza.tr</a>
          </p>
        </div>
      </section>
    </div>
  )
}
