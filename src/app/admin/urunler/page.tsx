import prisma from '@/lib/db'
import Link from 'next/link'
import ProductsAdmin from '@/components/admin/ProductsAdmin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Yazılım Ürünleri' }

export default async function UrunlerPage() {
  const products = await prisma.product.findMany({
    include: { pricing: { take: 1, orderBy: { isPopular: 'desc' } } },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yazılım Ürünleri</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} ürün</p>
        </div>
        <Link href="/admin/urunler/yeni" className="btn-primary">
          + Yeni Ürün Ekle
        </Link>
      </div>
      <ProductsAdmin products={products} />
    </div>
  )
}
