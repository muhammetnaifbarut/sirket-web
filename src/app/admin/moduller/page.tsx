import prisma from '@/lib/db'
import ModulesAdmin from '@/components/admin/ModulesAdmin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Modüller' }

export default async function ModullerPage() {
  const modules = await prisma.siteModule.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Modüller</h1>
        <p className="text-gray-500 text-sm mt-1">
          Anasayfada gösterilen modül kartları. Sıralama, ikon ve renk değiştirilebilir.
        </p>
      </div>
      <ModulesAdmin initialModules={modules} />
    </div>
  )
}
