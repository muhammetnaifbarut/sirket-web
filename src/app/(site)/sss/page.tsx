import prisma from '@/lib/db'
import EmptyState from '@/components/site/EmptyState'
import FAQSection from '@/components/site/sections/FAQSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular',
  description: 'kooza hakkında akıllarda kalan tüm sorular ve detaylı cevaplar.',
}

export default async function Page() {
  const faqs = await prisma.siteFaq.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="bg-white">
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            SSS
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
            Sıkça Sorulan Sorular.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            kooza hakkında akıllarda kalan her sorunun cevabı burada.
          </p>
        </div>
      </section>

      {faqs.length === 0 ? (
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4">
            <EmptyState
              icon="help-circle"
              title="Henüz SSS yok"
              description="Sorularını yazılı olarak iletebilirsin."
              cta={{ label: 'Bize Yaz', href: '/iletisim' }}
            />
          </div>
        </section>
      ) : (
        <FAQSection faqs={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
      )}
    </div>
  )
}
