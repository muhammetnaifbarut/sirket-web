import Link from 'next/link'
import { Sparkles, Wrench, Lightbulb, Rocket, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza Yol Haritası — Geliyor, Geliştiriliyor, Hayalde',
  description: 'kooza ürün yol haritası. Hangi özellikler geliyor, hangileri geliştiriliyor, hangileri planlanıyor. Şeffaf gelişim.',
}

const NOW_BUILDING = [
  { title: 'WhatsApp Business API', desc: 'Otomatik mesajlaşma + müşteri segmenti', eta: 'Mayıs 2026' },
  { title: 'Mobil Uygulama (iOS+Android)', desc: 'Tam özellikli native uygulama', eta: 'Mayıs 2026' },
  { title: 'AI Sektör Asistanı', desc: 'Chatbot ile sektör bazlı kurulum önerileri', eta: 'Haziran 2026' },
  { title: 'Stripe Connect', desc: 'Yurtdışı ödeme alma', eta: 'Haziran 2026' },
]

const NEXT_QUARTER = [
  { title: 'Özel raporlar (BI)', desc: 'Drag-drop dashboard tasarım' },
  { title: 'Slack/Discord webhook', desc: 'Bildirimleri kanallara gönderme' },
  { title: 'Çoklu dil — İngilizce', desc: 'Uluslararası müşteriler için' },
  { title: 'API v2', desc: 'GraphQL desteği' },
  { title: 'Müşteri sadakat puanı', desc: 'Salon/kafe/restoran için' },
  { title: 'POS entegrasyonu', desc: 'Garanti POS + Akbank POS direkt' },
]

const FUTURE = [
  { title: 'AI tahminleyici (lead skor)' },
  { title: 'Sesli komut (kasa)' },
  { title: 'IoT sensör entegrasyonu' },
  { title: 'Blockchain fatura imzalama' },
  { title: 'Açık kaynaklı eklenti pazarı' },
  { title: 'Marketplace (kooza app store)' },
]

const RECENTLY_SHIPPED = [
  { title: 'Diş Hekimi paketi', date: '15 Nisan 2026' },
  { title: 'Veteriner paketi', date: '15 Nisan 2026' },
  { title: 'Güzellik salonu paketi', date: '15 Nisan 2026' },
  { title: 'E-ticaret pazaryeri entegrasyonu (Trendyol, Hepsiburada, N11)', date: '10 Nisan 2026' },
  { title: 'GİB e-Fatura/e-Arşiv otomatik kesim', date: '5 Nisan 2026' },
  { title: 'Resmi launch — kooza.tr', date: '27 Nisan 2026' },
]

export default function RoadmapPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
            🛣️ Public Roadmap
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            Şeffaf yol haritası
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Hangi özellikler geliyor, hangileri planlandı, hangileri tartışılıyor — saklamıyoruz.
            Müşteri talepleri yön haritasını şekillendiriyor.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* NOW BUILDING */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">🛠️ Şu an geliştirilen</h2>
                <p className="text-sm text-gray-500">Ekibimizin aktif çalıştığı 4 büyük özellik</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {NOW_BUILDING.map((it) => (
                <div key={it.title} className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{it.title}</h3>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {it.eta}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{it.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* NEXT QUARTER */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">🚀 Önümüzdeki çeyrekte</h2>
                <p className="text-sm text-gray-500">Q3 2026 — planda</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {NEXT_QUARTER.map((it) => (
                <div key={it.title} className="bg-white border border-purple-100 rounded-xl p-4 hover:border-purple-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{it.title}</h3>
                  <p className="text-xs text-gray-500">{it.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FUTURE */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-cyan-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">💭 Hayal aşamasında</h2>
                <p className="text-sm text-gray-500">Tartışıyor, ama kesin değil — geri bildiriminiz yön verebilir</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {FUTURE.map((it) => (
                <div key={it.title} className="bg-cyan-50 border border-cyan-100 rounded-full px-4 py-2 text-sm text-cyan-800 font-medium">
                  {it.title}
                </div>
              ))}
            </div>
          </div>

          {/* SHIPPED */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">✅ Yakında çıkanlar</h2>
                <p className="text-sm text-gray-500">Son 3 ayda yayına aldığımız özellikler</p>
              </div>
            </div>
            <div className="space-y-2">
              {RECENTLY_SHIPPED.map((it) => (
                <div key={it.title} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4">
                  <span className="font-medium text-gray-900 text-sm">{it.title}</span>
                  <span className="text-xs text-gray-500 font-mono">{it.date}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/yenilikler" className="text-sm font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1">
                Tüm changelog\'u gör <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Suggest Feature */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 text-center border border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💡 Bir özellik önerisin var mı?</h3>
            <p className="text-gray-600 mb-5 max-w-xl mx-auto">
              Müşteri talepleri ürün yol haritasını şekillendiriyor.
              "Şu olsa harika olurdu" diye düşündüğün şeyi bize gönder.
            </p>
            <Link
              href="/iletisim?konu=feature-request"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all"
            >
              Özellik öner →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
