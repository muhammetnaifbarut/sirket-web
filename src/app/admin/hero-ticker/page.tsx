import prisma from '@/lib/db'
import HeroTickerAdmin from '@/components/admin/HeroTickerAdmin'

export const metadata = { title: 'Canlı Aktivite Şeridi' }

export default async function Page() {
  const items = await prisma.heroTicker.findMany({ orderBy: { order: 'asc' } })
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Canlı Aktivite Şeridi</h1>
        <p className="text-gray-500 text-sm mt-1">Anasayfa hero altında kayan aktivite mesajları.</p>
      </div>
      <HeroTickerAdmin initial={items} />
    </div>
  )
}
