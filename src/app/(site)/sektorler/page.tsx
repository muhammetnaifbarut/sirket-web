import Link from 'next/link'
import prisma from '@/lib/db'
import ProductIcon from '@/components/site/ProductIcon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sektörler',
  description: 'Her sektöre özel yazılım ve danışmanlık çözümleri',
}

export default async function SektorlerPage() {
  const sectors = await prisma.sector.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-20 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(135, 90, 123,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            Sektörler
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
            Sektörünüze özel çözümler.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            kooza, farklı sektörlerin ihtiyaçlarına göre özelleştirilebilir.
            Aşağıda sıkça hizmet verdiğimiz alanlar:
          </p>
        </div>
      </section>

      {/* Compact sector list — not card-modules */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden bg-white">
            {sectors.map((sector) => (
              <li key={sector.id}>
                <Link
                  href={`/sektorler/${sector.slug}`}
                  className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <ProductIcon name={sector.icon || 'globe'} className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{sector.name}</h3>
                    {sector.description && (
                      <p className="text-sm text-gray-500 mt-0.5 truncate">{sector.description}</p>
                    )}
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200/60"
            >
              Sektörünüze özel demo isteyin
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
