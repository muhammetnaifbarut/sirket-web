import ProductForm from '@/components/admin/ProductForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Yeni Ürün' }

export default function YeniUrunPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
        <p className="text-gray-500 text-sm mt-1">Yazılım ürünü oluşturun</p>
      </div>
      <ProductForm />
    </div>
  )
}
