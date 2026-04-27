import GuideDownloader from '@/components/site/GuideDownloader'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sektörel Dijitalleşme Rehberi — Ücretsiz İndir',
  description: 'Sektörünüze özel ücretsiz dijital dönüşüm rehberi. Klinik, restoran, market, eğitim, İK ve web siteleri için kapsamlı yol haritası.',
}

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-purple-50/30 via-white to-white min-h-screen">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GuideDownloader />
        </div>
      </section>
    </div>
  )
}
