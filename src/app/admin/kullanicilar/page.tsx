import prisma from '@/lib/db'
import UsersAdmin from '@/components/admin/UsersAdmin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Kullanıcılar' }

export default async function KullanicilarPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kullanıcılar</h1>
        <p className="text-gray-500 text-sm mt-1">{users.length} kullanıcı</p>
      </div>
      <UsersAdmin users={users} />
    </div>
  )
}
