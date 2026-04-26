import Link from 'next/link'
import prisma from '@/lib/db'
import EmptyState from '@/components/site/EmptyState'
import { Briefcase, MapPin, Clock, Sparkles, Heart, Globe2 } from 'lucide-react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Kariyer',
  description: 'kooza ekibine katıl. Açık pozisyonlar ve şirket kültürü.',
}

const PERKS = [
  { icon: Globe2,    title: 'Uzaktan çalışma',     desc: 'Dünyanın her yerinden katılabilirsin' },
  { icon: Heart,     title: 'Sağlık sigortası',    desc: 'Tüm aileyi kapsayan özel sigorta' },
  { icon: Sparkles,  title: 'Eğitim bütçesi',      desc: 'Yıllık $2.000 öğrenme bütçesi' },
  { icon: Briefcase, title: 'Hisse opsiyonları',   desc: 'Şirketin bir parçası ol' },
]

export default async function Page() {
  const jobs = await prisma.jobPosting.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  const departments = Array.from(new Set(jobs.map((j) => j.department)))

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-20 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(135, 90, 123,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            Kariyer
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
            Bizimle KOBİ\'lerin geleceğini inşa et.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            500+ KOBİ\'ye dokunan bir takımın parçası ol. Esnek çalışma, ortak büyüme, anlamlı iş.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-10 tracking-tight">
            Neden kooza?
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PERKS.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-5 border border-gray-200 text-center">
                <p.icon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 tracking-tight text-center">
            Açık Pozisyonlar
          </h2>

          {jobs.length === 0 ? (
            <EmptyState
              icon="briefcase"
              title="Şu an açık pozisyon yok"
              description="Yine de CV gönderebilirsin — uygun pozisyon açıldığında ilk haberdar olursun."
              cta={{ label: 'CV Gönder', href: '/iletisim' }}
            />
          ) : (
            <div className="space-y-8">
              {departments.map((dep) => (
                <div key={dep}>
                  <h3 className="text-sm font-bold text-purple-700 uppercase tracking-[0.15em] mb-4">
                    {dep}
                  </h3>
                  <div className="space-y-3">
                    {jobs.filter((j) => j.department === dep).map((j) => (
                      <Link
                        key={j.id}
                        href={`/iletisim?ref=${j.slug}`}
                        className="group flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-cardHover hover:-translate-y-0.5 transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-1">
                            {j.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {j.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {j.type}
                            </span>
                            {j.isRemote && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                                Uzaktan
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-purple-700 font-semibold text-sm shrink-0 ml-4 group-hover:translate-x-1 transition-transform">
                          Başvur →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-purple-600 to-purple-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
            Aradığın pozisyon yok mu?
          </h2>
          <p className="text-purple-100 mb-6">
            CV\'ni gönder, açıldığında haberdar olalım.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-purple-700 font-semibold hover:bg-purple-50 transition-all shadow-elevated"
          >
            CV Gönder
          </Link>
        </div>
      </section>
    </div>
  )
}
