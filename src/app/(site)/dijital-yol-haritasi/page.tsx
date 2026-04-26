import RoadmapGenerator from '@/components/site/RoadmapGenerator'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AI Dijital Dönüşüm Yol Haritası — Ücretsiz, Şirketinize Özel',
  description: 'Claude AI ile şirketinize özel dijital dönüşüm yol haritası alın. 30 saniyede özelleştirilmiş rapor mailinize gelir. Ücretsiz, KVKK uyumlu.',
}

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-purple-50/30 via-white to-white min-h-screen">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RoadmapGenerator />
        </div>
      </section>
    </div>
  )
}
