import Link from 'next/link'
import prisma from '@/lib/db'
import EmptyState from '@/components/site/EmptyState'
import ProductIcon from '@/components/site/ProductIcon'
import { ArrowRight, Quote } from 'lucide-react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Vaka Çalışmaları',
  description: 'kooza ile gerçek KOBİ\'lerin gerçek dönüşüm hikayeleri.',
}

interface ResultItem { icon: string; label: string; from: string; to: string }

export default async function Page() {
  const cases = await prisma.caseStudy.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

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
            Vaka Çalışmaları
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
            Gerçek KOBİ'ler. Gerçek sonuçlar.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            kooza'yla çalışan işletmelerin önce/sonra hikayeleri — somut sayılar, gerçek dönüşümler.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {cases.length === 0 ? (
            <EmptyState
              icon="briefcase"
              title="Henüz vaka çalışması yok"
              description="Yakında müşteri başarı hikayelerini burada paylaşacağız."
              cta={{ label: 'İletişime Geç', href: '/iletisim' }}
            />
          ) : (
            cases.map((c) => {
              const results = (c.results as unknown as ResultItem[]) || []
              return (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-soft overflow-hidden"
                >
                  <div className="grid lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-1 p-6 lg:p-8 bg-gray-50/50 border-r border-gray-100">
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold border ${c.sectorColor} mb-3`}>
                        {c.sector}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">{c.company}</h2>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Süre</p>
                      <p className="font-bold text-purple-700 mb-6">{c.timeframe}</p>

                      <div className="relative pt-4 border-t border-gray-200">
                        <Quote className="absolute -top-2 left-0 w-6 h-6 text-purple-200" />
                        <p className="text-gray-700 italic text-sm leading-relaxed pl-7 mb-3">
                          "{c.quote}"
                        </p>
                        <div className="pl-7">
                          <p className="font-bold text-gray-900 text-sm">{c.person}</p>
                          <p className="text-xs text-gray-500">{c.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-2 p-6 lg:p-8 space-y-6">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-rose-600 mb-2">
                          Sorun
                        </p>
                        <p className="text-gray-700 leading-relaxed">{c.challenge}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-purple-700 mb-2">
                          Çözüm
                        </p>
                        <p className="text-gray-700 leading-relaxed">{c.solution}</p>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-700 mb-3">
                          Sonuç
                        </p>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {results.map((r, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100"
                            >
                              <ProductIcon name={r.icon} className="w-4 h-4 text-emerald-600 mb-1.5" />
                              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                {r.label}
                              </p>
                              <p className="text-sm font-bold text-gray-700">
                                <span className="text-gray-400 line-through">{r.from}</span>
                                <ArrowRight className="inline w-3 h-3 mx-1 text-emerald-500" />
                                <span className="text-emerald-700">{r.to}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            Sıradaki dönüşüm hikayesi seninki olabilir.
          </h2>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all hover:-translate-y-0.5 shadow-button"
          >
            Ücretsiz Başla
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
