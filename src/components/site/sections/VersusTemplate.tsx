import Link from 'next/link'
import { Check, X, ArrowRight } from 'lucide-react'

export interface VersusRow {
  feature: string
  kooza: string | boolean
  competitor: string | boolean
  highlight?: boolean
}

export interface VersusProps {
  competitor: string
  competitorTagline: string
  emoji: string
  oneLineSummary: string
  rows: VersusRow[]
  whenKooza: string[]
  whenCompetitor: string[]
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={3} />
  if (value === false) return <X className="w-5 h-5 text-rose-500 mx-auto" strokeWidth={3} />
  return <span className="text-sm font-semibold text-gray-700">{value}</span>
}

export default function VersusTemplate({ competitor, competitorTagline, emoji, oneLineSummary, rows, whenKooza, whenCompetitor }: VersusProps) {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
            ⚖️ Karşılaştırma
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-5 tracking-tight">
            kooza <span className="text-purple-300">vs</span> {competitor}
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed mb-2">
            <span className="text-pink-200 font-semibold">{emoji} {competitorTagline}</span>
          </p>
          <p className="text-base text-purple-200 max-w-2xl mx-auto leading-relaxed">
            {oneLineSummary}
          </p>
        </div>
      </section>

      {/* Tablo */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight">
            Özellik karşılaştırması
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th className="text-left p-4 font-bold text-gray-700 min-w-[220px]">Özellik</th>
                  <th className="p-4 text-center bg-purple-100 font-bold text-purple-900">
                    🦋 kooza
                  </th>
                  <th className="p-4 text-center font-semibold text-gray-700">
                    {emoji} {competitor}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((r, i) => (
                  <tr key={i} className={`${r.highlight ? 'bg-purple-50/30' : ''} hover:bg-gray-50/50`}>
                    <td className="p-4 font-medium text-gray-900">{r.feature}</td>
                    <td className="p-4 text-center bg-purple-50/40"><Cell value={r.kooza} /></td>
                    <td className="p-4 text-center"><Cell value={r.competitor} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hangisi sana göre */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-10 text-center tracking-tight">
            Sen hangisini seçmelisin?
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border-2 border-purple-300 p-7 relative">
              <div className="absolute -top-3 left-6 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Önerilen
              </div>
              <div className="text-3xl mb-3">🦋</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">kooza ideal:</h3>
              <ul className="space-y-2">
                {whenKooza.map((it) => (
                  <li key={it} className="text-sm text-gray-700 flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" strokeWidth={3} />
                    {it}
                  </li>
                ))}
              </ul>
              <Link href="/demo" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-purple-700 hover:text-purple-900">
                14 gün ücretsiz dene <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <div className="text-3xl mb-3">{emoji}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">{competitor} ideal:</h3>
              <ul className="space-y-2">
                {whenCompetitor.map((it) => (
                  <li key={it} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/karsilastir" className="text-sm font-semibold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1">
              Tüm karşılaştırma tablosuna git
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Karşılaştırmayı kendin yap.</h2>
          <p className="text-purple-100 mb-7">
            14 gün ücretsiz dene, kart sormuyoruz. Beğenmezsen iptal — taahhüt yok.
          </p>
          <Link href="/demo" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-purple-700 font-bold hover:-translate-y-0.5 transition-all shadow-xl">
            14 Gün Ücretsiz Başla →
          </Link>
        </div>
      </section>
    </div>
  )
}
