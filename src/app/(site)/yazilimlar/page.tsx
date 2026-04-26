import Link from 'next/link'
import prisma from '@/lib/db'
import ProductIcon from '@/components/site/ProductIcon'
import EmptyState from '@/components/site/EmptyState'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yazılım Çözümleri',
  description: 'İşletmeniz için geliştirilmiş kurumsal yazılım çözümleri',
}

const PRODUCT_COLORS = [
  { bg: 'bg-purple-50', text: 'text-purple-600', accent: 'bg-purple-100', tag: 'bg-purple-50 text-purple-700 border-purple-100' },
  { bg: 'bg-blue-50', text: 'text-blue-600', accent: 'bg-blue-100', tag: 'bg-blue-50 text-blue-700 border-blue-100' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', accent: 'bg-emerald-100', tag: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { bg: 'bg-amber-50', text: 'text-amber-600', accent: 'bg-amber-100', tag: 'bg-amber-50 text-amber-700 border-amber-100' },
  { bg: 'bg-pink-50', text: 'text-pink-600', accent: 'bg-pink-100', tag: 'bg-pink-50 text-pink-700 border-pink-100' },
  { bg: 'bg-cyan-50', text: 'text-cyan-600', accent: 'bg-cyan-100', tag: 'bg-cyan-50 text-cyan-700 border-cyan-100' },
]

export default async function YazilimlarPage() {
  const products = await prisma.product.findMany({
    where: { status: 'ACTIVE' },
    include: { pricing: { where: { isPopular: true }, take: 1 } },
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
              background:
                'radial-gradient(circle at center, rgba(135, 90, 123,0.20) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                'radial-gradient(circle at center, rgba(251,146,60,0.15) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            Yazılım Çözümleri
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.05]">
            İşletmeniz için akıllı yazılımlar.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Randevu, stok, CRM, finans ve İK için ayrı ayrı yazılım kullanmayı bırakın.
            Hepsini tek bir akıllı platformda yönetin.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> 14 gün ücretsiz
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> Kredi kartı yok
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> 5 dakikada kurulum
            </span>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <EmptyState
              icon="package"
              title="Henüz yazılım eklenmemiş"
              description="Birazdan yazılım modüllerimizle bu sayfa dolacak. O zamana kadar bize yazabilirsin."
              cta={{ label: 'İletişime Geç', href: '/iletisim' }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, i) => {
                const c = PRODUCT_COLORS[i % PRODUCT_COLORS.length]
                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Top: visual */}
                    <div className={`relative h-40 ${c.bg} overflow-hidden flex items-center justify-center`}>
                      <div className={`w-20 h-20 rounded-2xl ${c.accent} flex items-center justify-center shadow-sm`}>
                        <ProductIcon name={product.icon || 'box'} className={`w-10 h-10 ${c.text}`} />
                      </div>
                      {product.badge && (
                        <span className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full border ${c.tag}`}>
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                      </div>
                      {product.tagline && (
                        <p className={`text-sm font-medium mb-3 ${c.text}`}>{product.tagline}</p>
                      )}
                      <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">
                        {product.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-5 flex-1">
                        {product.features.slice(0, 4).map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className={`w-4 h-4 mt-0.5 shrink-0 ${c.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Pricing pill */}
                      {product.pricing[0] && (
                        <div className={`${c.bg} rounded-xl p-3 mb-5`}>
                          <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${c.text}`}>
                            {product.pricing[0].name} planı
                          </p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">
                            ₺{Number(product.pricing[0].monthlyPrice).toLocaleString('tr-TR')}
                            <span className="text-sm font-normal text-gray-500"> /ay</span>
                          </p>
                        </div>
                      )}

                      {/* CTAs */}
                      <div className="flex gap-2">
                        <Link
                          href={`/yazilimlar/${product.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold transition-colors"
                        >
                          Detaylar
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link
                          href="/demo"
                          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 text-gray-700 text-sm font-semibold transition-colors"
                        >
                          Demo
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Comparison / Why all-in-one */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-4">
              Hepsi-bir-arada avantajı
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              5 ayrı yazılım yerine tek platform.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veriler birbiriyle konuşur, raporlar tek panelde toplanır, eğitim süresi kısalır.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Tek tıkla kurulum', text: '5 dakikada hesabınız hazır. Veri aktarımı için ekibimiz size yardımcı olur.' },
              { icon: '🔗', title: 'Ürünler konuşur', text: 'CRM\'deki müşteri, finans modülünde otomatik olarak görünür. Çift veri girişi yok.' },
              { icon: '📊', title: 'Tek panel, tek karar', text: 'Tüm KPI\'larınız tek bir gösterge panelinde. Karar verirken tahminin yerini veri alır.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-700 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Bütün yazılımları 14 gün ücretsiz dene.
          </h2>
          <p className="text-lg text-purple-100 mb-9 leading-relaxed">
            Kredi kartı gerekmez. İstediğiniz zaman iptal edebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-purple-700 font-bold hover:bg-purple-50 transition-all hover:-translate-y-0.5 shadow-xl shadow-purple-900/30"
            >
              Ücretsiz Başla
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 border-2 border-white/20 text-white font-semibold hover:bg-white/15 transition-all"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
