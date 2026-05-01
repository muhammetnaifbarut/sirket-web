import Link from 'next/link'
import { Check, X, Minus, Sparkles, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza vs Rakipler — Hangisi Sizin İçin Doğru?',
  description: 'kooza\'yı Bilet, Logo Tiger, Mikro, Calendly, Bookify, Shopify gibi alternatiflerle karşılaştırın. Türkiye\'ye özel sektörel paket, GİB e-Fatura, KVKK uyumu.',
}

const COMPARISON = [
  {
    feature: '🇹🇷 Türkiye için özel tasarım',
    kooza: { val: 'Yerli', good: true },
    foreign: { val: 'Çeviri', good: false },
    legacy: { val: 'Türkiye + ek modül', good: 'mid' },
  },
  {
    feature: '⚡ Kurulum süresi',
    kooza: { val: '5 dakika', good: true },
    foreign: { val: '1-2 hafta', good: false },
    legacy: { val: '3-6 ay', good: false },
  },
  {
    feature: '💰 Aylık başlangıç ücreti',
    kooza: { val: '₺499', good: true },
    foreign: { val: '$25-99 (~₺850-3.400)', good: false },
    legacy: { val: '₺2.500+', good: false },
  },
  {
    feature: '🏥 Klinik / 🍽️ Restoran / 💄 Salon UI',
    kooza: { val: 'tüm sektörler için hazır', good: true },
    foreign: { val: 'Genel', good: false },
    legacy: { val: 'Modül satın alarak', good: 'mid' },
  },
  {
    feature: '🧾 GİB e-Fatura / e-Arşiv',
    kooza: { val: 'Dahili (Pro+)', good: true },
    foreign: { val: 'Yok / 3. parti', good: false },
    legacy: { val: 'Ek lisans', good: 'mid' },
  },
  {
    feature: '🛍️ Trendyol / Yemeksepeti / Hepsiburada',
    kooza: { val: 'Hazır entegre', good: true },
    foreign: { val: 'Yok', good: false },
    legacy: { val: 'Manuel kod', good: false },
  },
  {
    feature: '🏥 MHRS / e-Reçete / SGK',
    kooza: { val: 'Dahili (Klinik paket)', good: true },
    foreign: { val: 'Yok', good: false },
    legacy: { val: 'Ayrı modül', good: 'mid' },
  },
  {
    feature: '📞 Türkçe destek',
    kooza: { val: '7/24 + WhatsApp', good: true },
    foreign: { val: 'İngilizce + ticket', good: false },
    legacy: { val: 'Mesai içi', good: 'mid' },
  },
  {
    feature: '☁️ Bulut tabanlı',
    kooza: { val: 'Evet (Türkiye)', good: true },
    foreign: { val: 'Evet (yurtdışı)', good: 'mid' },
    legacy: { val: 'Lokal kurulum', good: false },
  },
  {
    feature: '🔒 KVKK uyumu',
    kooza: { val: 'Sertifikalı', good: true },
    foreign: { val: 'GDPR (TR\'ye 100%? hayır)', good: 'mid' },
    legacy: { val: 'Modül + danışman', good: 'mid' },
  },
  {
    feature: '🆓 Ücretsiz deneme',
    kooza: { val: '14 gün, kart yok', good: true },
    foreign: { val: '7-14 gün, kart var', good: 'mid' },
    legacy: { val: 'Yok', good: false },
  },
  {
    feature: '🔄 Modül arası entegrasyon',
    kooza: { val: 'Native', good: true },
    foreign: { val: 'Zapier/API', good: 'mid' },
    legacy: { val: 'IT ekibi gerekli', good: false },
  },
  {
    feature: '📱 Mobil uygulama',
    kooza: { val: 'iOS + Android', good: true },
    foreign: { val: 'Sınırlı', good: 'mid' },
    legacy: { val: 'Yok / lokal', good: false },
  },
  {
    feature: '🔌 API / Webhook',
    kooza: { val: 'REST + Webhook (Pro+)', good: true },
    foreign: { val: 'API only', good: 'mid' },
    legacy: { val: 'Eski COM/SOAP', good: false },
  },
]

function Cell({ val, good }: { val: string; good: boolean | 'mid' }) {
  return (
    <td className="p-4 text-center">
      <div className="flex items-center justify-center gap-2">
        {good === true && <Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} />}
        {good === false && <X className="w-4 h-4 text-rose-500 shrink-0" strokeWidth={3} />}
        {good === 'mid' && <Minus className="w-4 h-4 text-amber-500 shrink-0" strokeWidth={3} />}
        <span className={`text-sm ${good === true ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
          {val}
        </span>
      </div>
    </td>
  )
}

export default function KarsilastirmaPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
            ⚖️ Karşılaştırma
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            kooza vs Diğer Yazılımlar
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Bilet, Logo Tiger, Mikro, Calendly, Bookify, Shopify, Salesforce — hepsi farklı, ama hangisi <strong>sizin</strong> için doğru?
          </p>
        </div>
      </section>

      {/* Karşılaştırma Tablosu */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th className="text-left p-4 font-bold text-gray-700 min-w-[200px]">Özellik</th>
                  <th className="p-4 text-center bg-purple-100">
                    <div className="flex items-center justify-center gap-1.5 font-bold text-purple-900">
                      <Sparkles className="w-4 h-4" /> kooza
                    </div>
                  </th>
                  <th className="p-4 text-center font-semibold text-gray-700">
                    Yabancı SaaS<br />
                    <span className="text-xs font-normal text-gray-500">Calendly, Shopify, HubSpot</span>
                  </th>
                  <th className="p-4 text-center font-semibold text-gray-700">
                    Klasik ERP<br />
                    <span className="text-xs font-normal text-gray-500">Logo, Mikro, Netsis</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                    <Cell val={row.kooza.val} good={row.kooza.good as any} />
                    <Cell val={row.foreign.val} good={row.foreign.good as any} />
                    <Cell val={row.legacy.val} good={row.legacy.good as any} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center text-sm">
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
              <Check className="w-5 h-5 mx-auto text-emerald-600 mb-1" strokeWidth={3} />
              <span className="text-emerald-700 font-semibold">Tam destek</span>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
              <Minus className="w-5 h-5 mx-auto text-amber-600 mb-1" strokeWidth={3} />
              <span className="text-amber-700 font-semibold">Kısmi / Ek ücret</span>
            </div>
            <div className="rounded-xl bg-rose-50 border border-rose-100 p-4">
              <X className="w-5 h-5 mx-auto text-rose-600 mb-1" strokeWidth={3} />
              <span className="text-rose-700 font-semibold">Yok / Zor</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hangisi sana göre? */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-10 tracking-tight">
            Hangisi sana göre?
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl border-2 border-purple-300 p-6 relative">
              <div className="absolute -top-3 left-6 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Önerilen
              </div>
              <div className="text-3xl mb-3">🦋</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">kooza</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                <strong>5-200 kişilik</strong> Türkiye'de iş yapan KOBİ'ler için ideal.
                Sektörel paket + Türkçe destek + KVKK + GİB.
              </p>
              <Link
                href="/demo"
                className="text-sm font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1"
              >
                Demo iste <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Yabancı SaaS</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                <strong>Yurtdışıyla iş yapan</strong> şirketler veya teknik ekibi olan startup'lar için.
                İngilizce destek, dolar ödeme.
              </p>
              <span className="text-sm text-gray-500">Calendly, Shopify, HubSpot</span>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Klasik ERP</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                <strong>500+ kişilik</strong> büyük üretim/holding firmaları için. Yüksek bütçe,
                IT ekibi, 6+ ay implementasyon.
              </p>
              <span className="text-sm text-gray-500">Logo, Mikro, Netsis, Workcube</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Karşılaştırmayı kendin yap.</h2>
          <p className="text-purple-100 mb-7">
            14 gün ücretsiz dene, beğenmezsen iptal. Kart sormuyoruz, taahhüt yok.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-purple-700 font-bold hover:-translate-y-0.5 transition-all shadow-xl"
          >
            14 Gün Ücretsiz Başla →
          </Link>
        </div>
      </section>
    </div>
  )
}
