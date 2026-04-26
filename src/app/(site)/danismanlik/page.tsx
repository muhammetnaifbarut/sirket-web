import Link from 'next/link'
import prisma from '@/lib/db'
import ProductIcon from '@/components/site/ProductIcon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Danışmanlık Hizmetleri',
  description: 'Dijital dönüşüm ve işletme danışmanlığı hizmetleri',
}

export default async function DanismanlikPage() {
  const services = await prisma.service.findMany({
    where: { status: 'ACTIVE' },
    include: { packages: { where: { isActive: true } } },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-24 lg:py-28">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-20 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(135, 90, 123,0.18) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            Danışmanlık
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.05]">
            Uzman kadromuz yanınızda.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            İşletmenizi bir üst seviyeye taşıyacak danışmanlık ve koçluk hizmetleri.
            Süreçlerinizi analiz ediyor, dijital dönüşüm yolculuğunuzda yanınızda oluyoruz.
          </p>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🎯', title: 'Sonuç Odaklı', desc: 'Her danışmanlık projesinde ölçülebilir sonuçlar elde etmeyi hedefliyoruz.' },
              { icon: '🤝', title: 'Uzman Kadro', desc: '15+ yıl deneyimli danışmanlarımızla en karmaşık sorunları çözüyoruz.' },
              { icon: '📊', title: 'Veri Destekli', desc: 'Kararlarınızı veriye dayandırın, rekabet avantajı kazanın.' },
            ].map((item) => (
              <div key={item.title} className="p-4">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gray-100 flex items-center justify-center text-3xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center tracking-tight">
            Hizmetlerimiz.
          </h2>
          <div className="space-y-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <ProductIcon name={service.icon || 'settings'} className="w-6 h-6 text-gray-700" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  {service.packages.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Paketler</h4>
                      {service.packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className={`p-4 rounded-xl border ${
                            pkg.isPopular
                              ? 'bg-purple-50 border-purple-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-gray-900">{pkg.name}</span>
                            {pkg.isPopular && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white">
                                ÖNERİLEN
                              </span>
                            )}
                          </div>
                          {pkg.price && (
                            <p className="text-xl font-bold text-gray-900 tabular-nums">
                              ₺{Number(pkg.price).toLocaleString('tr-TR')}
                            </p>
                          )}
                          {pkg.duration && <p className="text-xs text-gray-500">{pkg.duration}</p>}
                        </div>
                      ))}
                      <Link
                        href="/demo"
                        className="block w-full text-center text-sm font-semibold py-2.5 mt-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                      >
                        Teklif Al
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-700 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Danışmanlık sürecini başlatın.
          </h2>
          <p className="text-lg text-purple-100 mb-9">
            Ücretsiz ön görüşme için hemen iletişime geçin.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-purple-700 font-bold hover:bg-purple-50 transition-all hover:-translate-y-0.5 shadow-xl shadow-purple-900/30"
          >
            Ücretsiz Görüşme Talep Et
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
