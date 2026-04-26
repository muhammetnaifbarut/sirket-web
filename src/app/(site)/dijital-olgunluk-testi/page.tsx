import MaturityTest from '@/components/site/MaturityTest'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dijital Olgunluk Testi — Ücretsiz Skor + Yol Haritası',
  description: 'Şirketinizin dijital olgunluğunu 2 dakikada ölçün. 10 sorudan oluşan testi tamamlayın, kişiselleştirilmiş skor ve yol haritası alın.',
}

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MaturityTest />
        </div>
      </section>
    </div>
  )
}
