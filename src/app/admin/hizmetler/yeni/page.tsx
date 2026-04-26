import ServiceForm from '@/components/admin/ServiceForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Yeni Hizmet' }

export default function YeniHizmetPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Hizmet Ekle</h1>
        <p className="text-gray-500 text-sm mt-1">Danışmanlık hizmeti oluşturun</p>
      </div>
      <ServiceForm />
    </div>
  )
}
