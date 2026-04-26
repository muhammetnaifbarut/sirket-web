import Link from 'next/link'
import prisma from '@/lib/db'
import * as Lucide from 'lucide-react'
import { ArrowRight, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sektör Çözümleri',
  description: 'Klinik, restoran, market, eğitim, İK, e-ticaret — kooza\'nın sektöre özel dijital çözümleri.',
}

function Icon({ name, className, color }: { name: string; className?: string; color?: string }) {
  const Cmp = (Lucide as any)[name] as React.ComponentType<any> | undefined
  if (!Cmp) return null
  return <Cmp className={className} strokeWidth={1.75} style={color ? { color } : undefined} />
}

export default async function Page() {
  const sectors = await prisma.sectorSolution.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-20 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(113, 75, 103, 0.18) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Sektörel Dijital Çözümler
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
            Her sektöre özel,<br />
            <span className="text-purple-700">doğru çözüm.</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Genel yazılım değil, sektörünüzün sorunlarını anlayan paketler.
            Klinikten restorana, marketten eğitime — sizin işinize özel kurguladık.
          </p>
        </div>
      </section>

      {/* SECTOR GRID */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sectors.length === 0 ? (
            <div className="text-center py-20 text-gray-500">Henüz sektör çözümü yayınlanmadı.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectors.map((s) => (
                <Link
                  key={s.id}
                  href={`/cozumler/${s.slug}`}
                  className="group rounded-2xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-cardHover transition overflow-hidden flex flex-col"
                >
                  <div
                    className="p-8 pb-6"
                    style={{ background: `linear-gradient(135deg, ${s.bgColor} 0%, transparent 100%)` }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-sm"
                      style={{ background: 'white' }}
                    >
                      <Icon name={s.icon} className="w-6 h-6" color={s.iconColor} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition">{s.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.tagline}</p>
                  </div>
                  <div className="px-8 py-5 mt-auto border-t border-gray-100 flex items-center justify-between text-sm font-semibold" style={{ color: s.iconColor }}>
                    <span>Detayları İncele</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 p-10 lg:p-14 text-white text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Sektörünüz listede yok mu?</h2>
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
              Her işletmeye özel çözüm üretiyoruz. Sürecinizi anlatın, size özel yapılandıralım.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-purple-700 hover:bg-gray-50 font-bold shadow-button transition"
            >
              Bize Ulaşın
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
