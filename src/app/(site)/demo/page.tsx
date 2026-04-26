import DemoForm from '@/components/site/DemoForm'
import prisma from '@/lib/db'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Demo Talep Et',
  description: 'Ücretsiz demo talep edin ve ürünlerimizi deneyin',
}

export default async function DemoPage() {
  const products = await prisma.product.findMany({
    where: { status: 'ACTIVE' },
    select: { id: true, name: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Ücretsiz Demo Talep Et</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            14 gün boyunca tüm özellikleri ücretsiz kullanın. Kredi kartı gerekmez.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Benefits */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Demo'ya Neden Başvurmalısınız?</h2>
              {[
                { icon: '🎯', title: '14 Gün Ücretsiz', desc: 'Hiçbir ücret ödemeden tüm özellikleri deneyin.' },
                { icon: '👥', title: 'Kişisel Demo', desc: 'Uzman ekibimiz size özel demo sunar.' },
                { icon: '🔧', title: 'Özelleştirme', desc: 'İhtiyaçlarınıza göre konfigürasyon yapın.' },
                { icon: '📊', title: 'ROI Analizi', desc: 'Yatırım getirinizi hesaplayın.' },
                { icon: '🤝', title: 'Destek', desc: '7/24 teknik destek ve danışmanlık.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Demo Formu</h2>
                <DemoForm products={products} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
