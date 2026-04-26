import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/db'
import ProductIcon from '@/components/site/ProductIcon'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'


interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } })
  if (!product) return {}
  return { title: product.name, description: product.description || '' }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { pricing: { orderBy: { isPopular: 'desc' } } },
  })

  if (!product) notFound()

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-blue-500/20 rounded-3xl flex items-center justify-center">
              <ProductIcon name={product.icon || 'box'} className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-extrabold">{product.name}</h1>
                {product.badge && (
                  <span className="badge bg-blue-500/20 text-blue-300 text-sm px-3 py-1">{product.badge}</span>
                )}
              </div>
              <p className="text-xl text-blue-200">{product.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hakkında</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Özellikler</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="card p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Demo Talep Et</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Ürünü 14 gün boyunca ücretsiz deneyin. Kredi kartı gerekmez.
                </p>
                <Link href="/demo" className="btn-primary w-full text-center mb-3">
                  Ücretsiz Demo Başlat
                </Link>
                <Link href="/iletisim" className="btn-outline w-full text-center">
                  Fiyat Teklifi Al
                </Link>
              </div>

              {/* Pricing plans */}
              {product.pricing.length > 0 && (
                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Fiyatlandırma</h3>
                  <div className="space-y-3">
                    {product.pricing.map((plan) => (
                      <div
                        key={plan.id}
                        className={`p-3 rounded-lg ${plan.isPopular ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm text-gray-900">{plan.name}</span>
                          {plan.isPopular && (
                            <span className="badge bg-blue-100 text-blue-700 text-xs">Popüler</span>
                          )}
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          ₺{Number(plan.monthlyPrice).toLocaleString('tr-TR')}
                          <span className="text-xs font-normal text-gray-500">/ay</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
