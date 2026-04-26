import prisma from '@/lib/db'
import ThemeEditor from '@/components/admin/ThemeEditor'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Tema Ayarları' }

export default async function TemaPage() {
  const theme = await prisma.themeSettings.findFirst({ where: { isActive: true } })
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tema & Renkler</h1>
        <p className="text-gray-500 text-sm mt-1">Site görünümünü özelleştirin</p>
      </div>
      <ThemeEditor theme={theme} />
    </div>
  )
}
