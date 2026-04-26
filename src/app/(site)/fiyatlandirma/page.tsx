import prisma from '@/lib/db'
import PricingSection from '@/components/site/sections/PricingSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fiyatlandırma',
  description: 'Bütçenize uygun yazılım ve danışmanlık planları',
}

export default async function FiyatlandirmaPage() {
  const plans = await prisma.pricingPlan.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <section className="bg-gradient-to-br from-green-900 to-blue-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Fiyatlandırma</h1>
          <p className="text-xl text-green-200 max-w-2xl mx-auto">
            Şeffaf ve adil fiyatlandırma. Gizli maliyet yok.
          </p>
        </div>
      </section>

      <PricingSection plans={plans} />

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {[
              { q: 'Ücretsiz deneme süresi var mı?', a: 'Evet, tüm planlar için 14 günlük ücretsiz deneme süresi sunuyoruz. Kredi kartı bilgisi gerekmez.' },
              { q: 'Plan değiştirmek mümkün mü?', a: 'İstediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklik anında geçerli olur.' },
              { q: 'Fatura dönemim ne zaman başlar?', a: 'Fatura döneminiz ücretsiz deneme sürenizin sona ermesinden itibaren başlar.' },
              { q: 'Enterprise plan için özel fiyat alabilir miyim?', a: 'Evet, 50+ kullanıcı için özel kurumsal fiyatlandırma sunuyoruz. Satış ekibimizle iletişime geçin.' },
              { q: 'Veri güvenliği nasıl sağlanıyor?', a: 'Tüm veriler AES-256 ile şifrelenir. ISO 27001 sertifikalı altyapıda barındırılır.' },
            ].map((item) => (
              <details key={item.q} className="card p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between list-none">
                  {item.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
