import prisma from '@/lib/db'
import MediaAdmin from '@/components/admin/MediaAdmin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Medya Kütüphanesi' }

export default async function MedyaPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Medya Kütüphanesi</h1>
        <p className="text-gray-500 text-sm mt-1">Yüklenen dosyalar</p>
      </div>
      <MediaAdmin media={media} />
    </div>
  )
}
