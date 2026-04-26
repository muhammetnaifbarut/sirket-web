import { notFound } from 'next/navigation'
import prisma from '@/lib/db'
import ProductForm from '@/components/admin/ProductForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ürün Düzenle' }

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { pricing: true },
  })
  if (!product) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ürün Düzenle</h1>
        <p className="text-gray-500 text-sm mt-1">{product.name}</p>
      </div>
      <ProductForm product={product} />
    </div>
  )
}
