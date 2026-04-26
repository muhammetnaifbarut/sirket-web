import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'kooza gizlilik politikası ve kişisel veri işleme aydınlatma metni.',
}

export default function GizlilikPolitikasiPage() {
  return (
    <div className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
          Yasal
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.05]">
          Gizlilik politikası.
        </h1>
        <p className="text-gray-600 mb-8">
          Bu metin, kooza'in kişisel verilerinizi nasıl işlediğini açıklar.
        </p>

        <div className="prose prose-gray max-w-none space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">1. Veri sorumlusu</h2>
          <p>kooza, kişisel verilerinizi 6698 sayılı KVKK kapsamında veri sorumlusu sıfatıyla işler.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Toplanan veriler</h2>
          <p>
            Hesap oluştururken sağladığınız ad, e-posta, telefon ve şirket bilgilerini; kullanım sırasında oluşan
            log kayıtlarını; ve müşteri destek talepleri ile ilgili yazışmaları toplarız.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. İşleme amaçları</h2>
          <p>
            Verileriniz hizmetin sunulması, sözleşme yükümlülüklerinin yerine getirilmesi, faturalandırma ve
            yasal yükümlülüklerin karşılanması amacıyla işlenir.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">4. Haklarınız</h2>
          <p>
            KVKK kapsamında verilerinize erişim, düzeltme, silme ve işlenmenin sınırlandırılması haklarına
            sahipsiniz. Bu haklarınızı kullanmak için <a href="/iletisim" className="text-purple-700 font-semibold hover:underline">iletişim sayfasından</a> bize ulaşabilirsiniz.
          </p>

          <p className="text-sm text-gray-500 pt-8 border-t border-gray-100 mt-12">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </p>
        </div>
      </section>
    </div>
  )
}
