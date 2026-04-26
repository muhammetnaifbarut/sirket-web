import Link from 'next/link'
import prisma from '@/lib/db'
import EmptyState from '@/components/site/EmptyState'
import { Plug, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Entegrasyonlar',
  description: 'kooza ile çalışan banka, ödeme, pazaryeri ve diğer servisler.',
}

export default async function Page() {
  const items = await prisma.integration.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  const categories = Array.from(new Set(items.map((i) => i.category)))
  const popular = items.filter((i) => i.isPopular)

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
            Entegrasyonlar
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
            Sevdiğin araçlarla çalış.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            kooza, kullandığın 20+ servisle hazır entegrasyonla geliyor. Bağla, çalıştır.
          </p>
        </div>
      </section>

      {items.length === 0 ? (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <EmptyState
              icon="settings"
              title="Henüz entegrasyon yok"
              description="Yakında entegrasyon listesi burada görünecek."
            />
          </div>
        </section>
      ) : (
        <>
          {/* Popular */}
          {popular.length > 0 && (
            <section className="py-12 bg-gray-50 border-y border-gray-100">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h2 className="text-xl font-bold text-gray-900">En Popüler</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {popular.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-cardHover transition-all text-center"
                    >
                      <div className="text-3xl mb-2">{p.logo}</div>
                      <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{p.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All by category */}
          <section className="py-16 lg:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              {categories.map((cat) => (
                <div key={cat}>
                  <h3 className="text-sm font-bold text-purple-700 uppercase tracking-[0.15em] mb-4">
                    {cat}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {items.filter((i) => i.category === cat).map((i) => (
                      <div
                        key={i.id}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-purple-200 transition-colors"
                      >
                        <div className="text-2xl">{i.logo}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{i.name}</p>
                          {i.isPopular && (
                            <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider">
                              Popüler
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Custom integration CTA */}
          <section className="py-16 bg-gradient-to-br from-purple-600 to-purple-700">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <Plug className="w-10 h-10 text-white mx-auto mb-3" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
                Aradığın entegrasyon yok mu?
              </h2>
              <p className="text-purple-100 mb-6">
                Enterprise planlarda özel entegrasyon yapıyoruz. Size özel sistemlerinizle bağlayalım.
              </p>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-purple-700 font-semibold hover:bg-purple-50 transition-all shadow-elevated"
              >
                Entegrasyon Talep Et
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
