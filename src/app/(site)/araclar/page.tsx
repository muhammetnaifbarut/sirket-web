import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ücretsiz İş Araçları — kooza',
  description: 'No-show kayıp hesaplayıcı, WhatsApp lead analizi, personel maliyet, AI post üretici, e-Fatura checklist. Kayıt yok, anında sonuç.',
}

const TOOLS = [
  {
    cat: '🎯 Stratejik Analiz',
    items: [
      { url: '/dijital-olgunluk-testi', emoji: '🎯', name: 'Dijital Olgunluk Testi', desc: '15 soru → işletmenin dijital skoru + yol haritası', time: '2 dk' },
      { url: '/araclar/roi-kooza', emoji: '💰', name: 'ROI Hesaplayıcı', desc: 'kooza vs mevcut sistem — yıllık net kazanç', time: '1 dk' },
      { url: '/dijital-rehber', emoji: '📘', name: 'Sektörel Rehber PDF', desc: '30+ sayfalık rehber, indirilebilir', time: '5 dk okuma' },
    ],
  },
  {
    cat: '💸 Kayıp & Fırsat Analizleri',
    items: [
      { url: '/araclar/no-show-kayip', emoji: '📉', name: 'No-Show Kayıp Hesabı', desc: 'Gelmeyen müşteri yıllık ne kadar kazandırmıyor?', time: '1 dk' },
      { url: '/araclar/whatsapp-lead', emoji: '📱', name: 'WhatsApp Lead Analizi', desc: 'Cevap verilmeyen mesaj → kaybolan müşteri', time: '1 dk' },
    ],
  },
  {
    cat: '👥 İK & Bordro',
    items: [
      { url: '/araclar/personel-maliyet', emoji: '💼', name: 'Personel Tam Maliyeti', desc: 'Brüt + SGK + kıdem yedeği = gerçek yıllık maliyet', time: '2 dk' },
      { url: '/hesaplayicilar', emoji: '📊', name: 'SGK Bordro 2026', desc: 'Brüt → Net + İşveren maliyeti', time: '1 dk' },
      { url: '/hesaplayicilar', emoji: '💼', name: 'Kıdem Tazminatı', desc: '2026 tavanı 41.828 ₺ ile hesap', time: '1 dk' },
      { url: '/hesaplayicilar', emoji: '🏖️', name: 'Yıllık İzin', desc: 'İş Kanunu m.53 - hak kazanılan gün', time: '30 sn' },
    ],
  },
  {
    cat: '🧾 Vergi & Yasal',
    items: [
      { url: '/araclar/efatura-checklist', emoji: '📋', name: 'e-Fatura Checklist 2026', desc: '10 maddeli geçiş kontrol listesi', time: '5 dk' },
      { url: '/hesaplayicilar', emoji: '🧾', name: 'KDV Hesaplayıcı', desc: 'Dahil/Hariç + 3 oran', time: '30 sn' },
      { url: '/hesaplayicilar', emoji: '📜', name: 'Stopaj Hesaplayıcı', desc: 'Kira, serbest meslek, telif', time: '30 sn' },
    ],
  },
  {
    cat: '🏠 Sektörel Araçlar',
    items: [
      { url: '/hesaplayicilar', emoji: '🏘️', name: 'Aidat Hesaplayıcı', desc: 'Site/apartman aylık aidat', time: '30 sn' },
      { url: '/hesaplayicilar', emoji: '🏠', name: 'Emlak Komisyonu', desc: 'Satış + kiralama + KDV', time: '1 dk' },
      { url: '/hesaplayicilar', emoji: '🏗️', name: 'Müteahhit Hakediş', desc: 'Kesinti + stopaj + KDV', time: '1 dk' },
      { url: '/hesaplayicilar', emoji: '🍽️', name: 'Restoran Adisyon Bölme', desc: 'Servis + bahşiş + kişi başı', time: '30 sn' },
    ],
  },
  {
    cat: '🤖 AI & Pazarlama',
    items: [
      { url: '/araclar/ai-post-uretici', emoji: '✨', name: 'AI Post Üretici', desc: 'Instagram + Facebook + WhatsApp postu', time: '10 sn' },
    ],
  },
  {
    cat: '💰 SaaS & Finans',
    items: [
      { url: '/hesaplayicilar', emoji: '📈', name: 'MRR / ARR Hesaplayıcı', desc: 'SaaS metrikleri + 12 ay tahmin', time: '1 dk' },
    ],
  },
]

const totalTools = TOOLS.reduce((sum, c) => sum + c.items.length, 0)

export default function AraclarPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-bold mb-6">
            🛠️ {totalTools}+ Profesyonel Araç
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-5 tracking-tight">
            İşletmen için <span className="text-pink-200">ücretsiz</span> araçlar
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Lead magnet değil, gerçek değer. Kayıt yok, sınır yok, anında sonuç.
            Her araç sektörel + Türkiye için optimize.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {TOOLS.map((category) => (
            <div key={category.cat} className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-5 tracking-tight">
                {category.cat}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((tool) => (
                  <Link
                    key={tool.url + tool.name}
                    href={tool.url}
                    className="group bg-white rounded-2xl border border-gray-200 hover:border-purple-300 p-5 hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{tool.emoji}</div>
                      <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                        {tool.time}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{tool.desc}</p>
                    <div className="mt-3 text-xs font-bold text-purple-700 group-hover:gap-2 transition-all flex items-center gap-1">
                      Aç →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="bg-gradient-to-br from-purple-700 to-pink-600 rounded-3xl p-8 text-white text-center">
            <h2 className="text-3xl font-black mb-3 tracking-tight">
              Manuel hesaplamayı bırak, kooza otomatikleştirsin
            </h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Bu araçlar tek seferlik. kooza ekosisteminde her şey otomatik:
              bordro her ay üretilir, e-Fatura GİB'e gider, WhatsApp lead'leri otomatik takip edilir.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/kayit?product=bundle&plan=pro"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 font-black rounded-xl shadow-lg hover:-translate-y-0.5 transition"
              >
                🎁 Bundle (10 ürün) — 1999 ₺/ay
              </Link>
              <Link
                href="/fiyatlandirma"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur text-white font-bold rounded-xl border border-white/30 hover:bg-white/25 transition"
              >
                Tüm Paketler
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
