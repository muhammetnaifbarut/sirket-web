import { Award, Newspaper } from 'lucide-react'

const PRESS = [
  { name: 'Webrazzi', topic: 'Yerli SaaS girişimleri' },
  { name: 'Capital', topic: 'KOBİ dijitalleşme' },
  { name: 'TechXplore', topic: 'Sektörel SaaS trendleri' },
  { name: 'Dünya Gazetesi', topic: 'Türkiye SaaS pazarı' },
  { name: 'Forbes Türkiye', topic: 'B2B yazılım' },
  { name: 'PARA Dergi', topic: 'Dijital dönüşüm raporu' },
]

export default function PressMentions() {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold mb-3">
            <Newspaper className="w-3.5 h-3.5" />
            Basında
          </div>
          <p className="text-gray-600 text-sm">
            kooza Türkiye'nin önde gelen iş ve teknoloji yayınlarında
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PRESS.map((p) => (
            <div
              key={p.name}
              className="flex flex-col items-center gap-1 group"
              title={p.topic}
            >
              <div className="text-lg font-black text-gray-400 hover:text-purple-700 transition-colors uppercase tracking-tighter">
                {p.name}
              </div>
              <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                {p.topic}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
