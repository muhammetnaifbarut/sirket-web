import PageForm from '@/components/admin/PageForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Yeni Sayfa' }

export default function YeniSayfaPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Yeni Sayfa</h1>
      <PageForm />
    </div>
  )
}
