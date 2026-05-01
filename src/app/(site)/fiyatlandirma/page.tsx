import PricingSection from '@/components/site/sections/PricingSection'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Fiyatlandırma — Şeffaf, adil, gizli maliyet yok',
  description: 'kooza paketleri: Başlangıç ₺499/ay, Pro ₺999/ay, Kurumsal görüşmeyle. 14 gün ücretsiz deneme, kredi kartı gerekmez.',
}

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Yeni başlayan esnaf, küçük işletmeler için ideal başlangıç paketi.',
    monthlyPrice: 499,
    yearlyPrice: 4790,
    features: [
      '1 sektörel modül (ör. randevu)',
      '1 kullanıcı hesabı',
      '500 müşteri / ürün kaydı',
      'WhatsApp destek (mesai içi)',
      'Temel raporlar',
      'KVKK uyumlu altyapı',
      'Mobil ve masaüstü erişim',
      'Aylık otomatik yedekleme',
    ],
    limitations: [
      'API erişimi',
      'Çoklu şube',
      'Özel entegrasyonlar',
    ],
    isPopular: false,
    ctaLabel: 'Başla',
    ctaUrl: '/kayit?product=mesken&plan=baslangic',
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'Büyüyen işletmeler için tam donanımlı, en çok tercih edilen paket.',
    monthlyPrice: 999,
    yearlyPrice: 9590,
    features: [
      '3 sektörel modül (ör. randevu + CRM + muhasebe)',
      '5 kullanıcı hesabı',
      '5.000 müşteri / ürün kaydı',
      'Öncelikli destek (WhatsApp + telefon)',
      'Gelişmiş raporlar + dashboard',
      'API erişimi',
      '2 şube yönetimi',
      'e-Fatura / e-Arşiv (GİB)',
      'WhatsApp / SMS otomatik mesajlaşma',
      'Günlük otomatik yedekleme',
    ],
    limitations: [
      'Beyaz etiket (white-label)',
      'Sınırsız kullanıcı',
    ],
    isPopular: true,
    ctaLabel: 'En çok tercih edilen',
    ctaUrl: '/kayit?product=mesken&plan=pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Çoklu şube, kurumsal yapı, sınırsız kullanıcı için kişiselleştirilmiş çözüm.',
    monthlyPrice: 2999,
    yearlyPrice: 28790,
    features: [
      'Sınırsız modül',
      'Sınırsız kullanıcı',
      'Sınırsız müşteri / ürün kaydı',
      '7/24 telefon destek + özel hesap müdürü',
      'Özel kurulum + ekip eğitimi',
      'Beyaz etiket (kendi markanla)',
      'Sınırsız şube',
      'SLA %99.9 garantili',
      'Özel entegrasyonlar (LUCA, Mikro, ERP)',
      'Saatlik canlı yedekleme',
      'Özel sözleşme + KVKK danışmanlığı',
    ],
    limitations: [],
    isPopular: false,
    ctaLabel: 'Bizimle görüş',
    ctaUrl: '/iletisim?konu=enterprise',
  },
]

export default async function FiyatlandirmaPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
            💎 Fiyatlandırma
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight">
            Şeffaf ve adil fiyatlandırma
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Gizli maliyet yok. Kurulum ücreti yok. Sözleşme dayatması yok.
            <br />
            <span className="text-pink-200 font-semibold">14 gün ücretsiz deneme — kredi kartı bile sormuyoruz.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-purple-100">
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span> Kredi kartı yok
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span> İstediğin zaman iptal
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span> Türkçe destek
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span> 5 dk kurulum
            </div>
          </div>
        </div>
      </section>

      <PricingSection plans={PLANS as any} />

      {/* Karşılaştırma Tablosu */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Detaylı karşılaştırma</h2>
            <p className="text-gray-600">Hangi paket hangi özelliği içeriyor?</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Özellik</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Starter</th>
                  <th className="text-center p-4 font-semibold text-purple-700 bg-purple-50">Professional ⭐</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Sektörel modül sayısı', '1', '3', 'Sınırsız'],
                  ['Kullanıcı hesabı', '1', '5', 'Sınırsız'],
                  ['Müşteri / ürün kaydı', '500', '5.000', 'Sınırsız'],
                  ['Şube yönetimi', '—', '2 şube', 'Sınırsız'],
                  ['e-Fatura / e-Arşiv (GİB)', '—', '✓', '✓'],
                  ['API erişimi', '—', '✓', '✓'],
                  ['WhatsApp/SMS otomasyon', '—', '✓', '✓'],
                  ['Beyaz etiket (white-label)', '—', '—', '✓'],
                  ['Özel entegrasyonlar (LUCA/ERP)', '—', '—', '✓'],
                  ['SLA %99.9', '—', '—', '✓'],
                  ['Yedekleme sıklığı', 'Aylık', 'Günlük', 'Saatlik'],
                  ['Destek kanalı', 'WhatsApp', 'WhatsApp + Telefon', '7/24 + Hesap Müdürü'],
                  ['Eğitim & Kurulum', 'Self-service', 'Online demo', 'Özel ekip eğitimi'],
                ].map(([label, s, p, e], i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-gray-700">{label}</td>
                    <td className="p-4 text-center text-gray-600">{s}</td>
                    <td className="p-4 text-center text-purple-700 bg-purple-50/40 font-semibold">{p}</td>
                    <td className="p-4 text-center text-gray-600">{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Tüm fiyatlara KDV dahil değildir. Kurumsal müşterilere özel sektörel paket fiyatlandırma sunulabilir.
          </p>
        </div>
      </section>

      {/* Sektörel Paket Bilgi */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sektöre özel paketler</h2>
          <p className="text-gray-600 mb-8">
            Klinik, restoran, market, eğitim — her sektör için özelleştirilmiş paketlerimiz var.
            Sektörünüzü seçin, size özel teklif sunalım.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {[
              { e: '🏥', l: 'Klinik', h: '/cozumler/klinik' },
              { e: '🍽️', l: 'Restoran', h: '/cozumler/restoran' },
              { e: '🛒', l: 'Market', h: '/cozumler/market' },
              { e: '🎓', l: 'Eğitim', h: '/cozumler/egitim' },
              { e: '👥', l: 'İK', h: '/cozumler/ik' },
              { e: '🌐', l: 'Web/E-tic.', h: '/cozumler/web' },
            ].map(s => (
              <a key={s.l} href={s.h} className="bg-white rounded-xl p-4 border border-purple-100 hover:border-purple-300 hover:-translate-y-0.5 transition-all">
                <div className="text-2xl mb-1">{s.e}</div>
                <div className="text-xs font-semibold text-gray-700">{s.l}</div>
              </a>
            ))}
          </div>
          <a href="/iletisim" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all">
            Sektöre özel teklif al →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Sık sorulan sorular</h2>
          <div className="space-y-3">
            {[
              { q: 'Ücretsiz deneme süresi var mı?', a: 'Evet, tüm paketler için 14 günlük ücretsiz deneme. Kredi kartı bilgisi istemiyoruz, anlık iptal edebilirsiniz.' },
              { q: 'Plan değiştirebilir miyim?', a: 'Tabii — istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklik anında uygulanır, fark prorate hesaplanır.' },
              { q: 'Fatura dönemim ne zaman başlar?', a: '14 günlük ücretsiz denemeniz bittikten sonra başlar. Aylık veya yıllık faturalandırma seçebilirsiniz.' },
              { q: 'Yıllık ödemede %20 indirim mi var?', a: 'Evet — yıllık paket seçerseniz toplamda 2 ay bedavaya gelir (yaklaşık %20 tasarruf).' },
              { q: 'Kurulum ücreti var mı?', a: 'Hayır. Starter ve Pro paketler self-service kurulur. Enterprise pakette ekibimiz ücretsiz kurulum + eğitim sağlar.' },
              { q: 'Verilerim güvende mi?', a: 'KVKK uyumlu altyapı, AES-256 şifreleme, ISO 27001 sertifikalı sunucular. Detay: /guvenlik' },
              { q: 'Sözleşme süresi var mı?', a: 'Hayır. Aylık paketlerde dilediğiniz zaman iptal edebilirsiniz. Yıllık paketlerde 12 ay sonunda otomatik yenilemez.' },
              { q: '50+ kullanıcılı şirket için özel fiyat?', a: 'Evet — Enterprise pakette kullanıcı sayısı sınırsız ve özel kurumsal fiyatlandırma sunuyoruz. /iletisim üzerinden bize yazın.' },
              { q: 'Hangi ödeme yöntemlerini destekliyorsunuz?', a: 'Kredi kartı (Iyzico), havale/EFT, e-Fatura, mali müşavir aracılığıyla ödeme. Tüm ödemeler güvenli ve PCI-DSS uyumludur.' },
              { q: 'Mevcut sistemden geçiş zor mu?', a: 'Pro ve Enterprise paketlerde Excel/CSV/SQL dosyalarınızdan veri aktarımı ekibimizce yapılır. Ortalama 2-3 iş gününde geçiş tamamlanır.' },
            ].map((item) => (
              <details key={item.q} className="bg-gray-50 rounded-xl p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between list-none">
                  {item.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-5">Hâlâ kararsız mısın?</h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            14 gün ücretsiz dene, beğenmezsen iptal et. Kredi kartı sormuyoruz.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/demo" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-purple-700 font-bold hover:-translate-y-0.5 transition-all shadow-xl">
              Ücretsiz başla →
            </a>
            <a href="/iletisim" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur text-white font-bold border border-white/20 hover:bg-white/20 transition-all">
              Bize ulaş
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
