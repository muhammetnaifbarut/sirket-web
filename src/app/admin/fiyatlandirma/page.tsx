import prisma from '@/lib/db'
import PricingAdmin from '@/components/admin/PricingAdmin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Fiyatlandırma' }

export default async function AdminFiyatlandirmaPage() {
  const plans = await prisma.pricingPlan.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Fiyatlandırma Planları</h1>
        <p className="text-gray-500 text-sm mt-1">Ana fiyatlandırma sayfasını yönetin</p>
      </div>
      <PricingAdmin plans={plans} />
    </div>
  )
}
