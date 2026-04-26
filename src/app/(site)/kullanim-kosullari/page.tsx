import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kullanım Koşulları',
  description: 'kooza hizmetlerinin kullanımına ilişkin koşul ve şartlar.',
}

export default function KullanimKosullariPage() {
  return (
    <div className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
          Yasal
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.05]">
          Kullanım koşulları.
        </h1>
        <p className="text-gray-600 mb-8">
          kooza hizmetlerini kullanırken aşağıdaki koşulları kabul etmiş sayılırsınız.
        </p>

        <div className="prose prose-gray max-w-none space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">1. Hizmetin kapsamı</h2>
          <p>kooza, işletme yönetimi yazılımları ve danışmanlık hizmetleri sunan bir SaaS platformudur.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">2. Hesap güvenliği</h2>
          <p>
            Hesap erişim bilgilerinizin güvenliğinden siz sorumlusunuz. Yetkisiz erişim durumunda derhal
            bizimle iletişime geçmeniz gerekir.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">3. Ödeme ve iptal</h2>
          <p>
            Aboneliğinizi istediğiniz zaman iptal edebilirsiniz. İptal sonrası mevcut dönem sonuna kadar
            hizmete erişiminiz devam eder; iade yapılmaz.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">4. Sorumluluk reddi</h2>
          <p>
            kooza, hizmeti olduğu gibi sunar. Hizmetin kullanımından doğan dolaylı zararlardan kooza sorumlu
            tutulamaz.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">5. Yetkili mahkeme</h2>
          <p>İşbu koşullardan doğan uyuşmazlıklarda Türkiye Cumhuriyeti hukuku uygulanır.</p>

          <p className="text-sm text-gray-500 pt-8 border-t border-gray-100 mt-12">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </p>
        </div>
      </section>
    </div>
  )
}
