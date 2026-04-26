import { notFound } from 'next/navigation'
import prisma from '@/lib/db'
import ServiceForm from '@/components/admin/ServiceForm'

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: params.id }, include: { packages: true } })
  if (!service) notFound()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Hizmet Düzenle</h1>
      <ServiceForm service={service} />
    </div>
  )
}
