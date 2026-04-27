import Link from 'next/link'
import { ArrowRight, Target, BookOpen, Calculator } from 'lucide-react'

const MAGNETS = [
  {
    href: '/dijital-olgunluk-testi',
    icon: Target,
    badge: '🎯 2 dakika',
    title: 'Dijital Olgunluk Testi',
    description: '10 soruya cevap verin, işletmenizin dijital olgunluk skoru ve kişisel yol haritasını e-mail ile alın.',
    cta: 'Teste başla →',
    color: 'from-purple-500 to-purple-700',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
  },
  {
    href: '/dijital-rehber',
    icon: BookOpen,
    badge: '📘 PDF · Ücretsiz',
    title: 'Sektörel Dijitalleşme Rehberi',
    description: 'Sektörünüze özel hazırlanmış 30+ sayfalık PDF rehber. En sık hatalar, 10 aksiyon, beklenen kazançlar.',
    cta: 'Rehberi indir →',
    color: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
  {
    href: '/roi-hesaplama',
    icon: Calculator,
    badge: '💰 1 dakika',
    title: 'ROI Hesaplama Aracı',
    description: 'kooza\'ya geçince yıllık ne kadar tasarruf edersiniz? Sektör + büyüklük girin, anında hesap.',
    cta: 'ROI hesapla →',
    color: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
]

export default function LeadMagnetTrio() {
  return (
    <section className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-4">
            Demo öncesi — ücretsiz araçlar
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Önce kendin hesapla, sonra demo iste.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            3 dakika içinde işletmenizin dijital olgunluk skorunu, sektörel rehberinizi ve ROI hesabını alın.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {MAGNETS.map((m) => {
            const Icon = m.icon
            return (
              <Link
                key={m.href}
                href={m.href}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-purple-200 p-7 hover:shadow-cardHover transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl ${m.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${m.iconColor}`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {m.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{m.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{m.description}</p>
                <div className="text-sm font-bold text-purple-700 group-hover:text-purple-900 inline-flex items-center gap-1">
                  {m.cta.replace(' →', '')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
