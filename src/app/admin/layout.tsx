import AdminLayoutClient from '@/components/admin/AdminLayoutClient'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata = {
  title: { default: 'Admin Panel', template: '%s | Admin' },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  // Login sayfası için raw render — middleware zaten yetki kontrolü yapıyor
  if (!session) {
    return <>{children}</>
  }

  return (
    <AdminLayoutClient session={session}>
      {children}
    </AdminLayoutClient>
  )
}
