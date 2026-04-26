import RoiCalculator from '@/components/site/RoiCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROI Hesaplama — kooza ile Ne Kazanırsınız?',
  description: 'Sektörünüze ve şirket büyüklüğünüze göre kooza\'nın yıllık tasarruf ve ROI tahminini 30 saniyede hesaplayın.',
}

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RoiCalculator />
        </div>
      </section>
    </div>
  )
}
