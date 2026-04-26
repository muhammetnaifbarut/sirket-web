import prisma from '@/lib/db'
import MenuAdmin from '@/components/admin/MenuAdmin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Menü Yönetimi' }

export default async function MenuPage() {
  const items = await prisma.menuItem.findMany({
    where: { location: 'header', parentId: null },
    include: { children: { orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Menü Yönetimi</h1>
        <p className="text-gray-500 text-sm mt-1">Site navigasyonunu düzenleyin</p>
      </div>
      <MenuAdmin items={items} />
    </div>
  )
}
