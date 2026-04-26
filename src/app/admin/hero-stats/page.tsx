import prisma from '@/lib/db'
import HeroStatsAdmin from '@/components/admin/HeroStatsAdmin'

export const metadata = { title: 'Hero İstatistikleri' }

export default async function Page() {
  const items = await prisma.heroStat.findMany({ orderBy: { order: 'asc' } })
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Hero İstatistikleri</h1>
        <p className="text-gray-500 text-sm mt-1">Anasayfada hero altındaki 4 sayı kartı.</p>
      </div>
      <HeroStatsAdmin initial={items} />
    </div>
  )
}
