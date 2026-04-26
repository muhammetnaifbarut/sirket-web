import prisma from '@/lib/db'
import Link from 'next/link'
import ServicesAdmin from '@/components/admin/ServicesAdmin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Danışmanlık Hizmetleri' }

export default async function HizmetlerPage() {
  const services = await prisma.service.findMany({
    include: { packages: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danışmanlık Hizmetleri</h1>
          <p className="text-gray-500 text-sm mt-1">{services.length} hizmet</p>
        </div>
        <Link href="/admin/hizmetler/yeni" className="btn-primary">+ Hizmet Ekle</Link>
      </div>
      <ServicesAdmin services={services} />
    </div>
  )
}
