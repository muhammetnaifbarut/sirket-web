import prisma from '@/lib/db'
import { BookOpen, Mail, Building2 } from 'lucide-react'

export const metadata = { title: 'Sektörel Rehber İndirmeleri' }
export const dynamic = 'force-dynamic'

const SECTOR_NAMES: Record<string, string> = {
  klinik: '🏥 Klinik & Sağlık',
  restoran: '🍽️ Restoran & Kafe',
  market: '🛒 Market & Perakende',
  egitim: '🎓 Eğitim & Kurs',
  ik: '👥 İnsan Kaynakları',
  web: '🌐 Web Sitesi & E-Ticaret',
}

export default async function Page() {
  const downloads: any[] = await (prisma as any).guideDownload.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  }).catch(() => [])

  const total = downloads.length
  const sectorStats: Record<string, number> = downloads.reduce((acc: Record<string, number>, d: any) => {
    acc[d.sector] = (acc[d.sector] || 0) + 1
    return acc
  }, {})

  const topSector = Object.entries(sectorStats).sort((a, b) => b[1] - a[1])[0] as [string, number] | undefined

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Sektörel Rehber İndirmeleri</h1>
        <p className="text-gray-500 text-sm mt-1">
          /dijital-rehber sayfasından sektörel rehber indiren ziyaretçiler. Her indirme CRM\'e Lead olarak da düşer.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase mb-2">
            <BookOpen className="w-4 h-4" />
            Toplam İndirme
          </div>
          <div className="text-3xl font-bold text-gray-900">{total}</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase mb-2">Bu Ay</div>
          <div className="text-3xl font-bold text-purple-700">
            {downloads.filter((d: any) => {
              const dt = new Date(d.createdAt)
              const now = new Date()
              return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear()
            }).length}
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase mb-2">En Popüler</div>
          <div className="text-lg font-bold text-gray-900">{topSector ? SECTOR_NAMES[topSector[0]] || topSector[0] : '—'}</div>
          {topSector && <div className="text-xs text-gray-500 mt-1">{topSector[1]} indirme</div>}
        </div>
      </div>

      {Object.keys(sectorStats).length > 0 && (
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <div className="text-sm font-bold text-gray-900 mb-3">Sektör Dağılımı</div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.keys(SECTOR_NAMES).map(s => (
              <div key={s} className="rounded-lg bg-purple-50 p-3 text-center">
                <div className="text-2xl font-bold text-purple-700">{sectorStats[s] || 0}</div>
                <div className="text-xs text-gray-600 mt-1">{SECTOR_NAMES[s]}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl bg-white border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-900">
          Son İndirmeler (en yeni 100)
        </div>
        {total === 0 ? (
          <div className="p-10 text-center text-gray-500">Henüz rehber indirme yok. /dijital-rehber sayfasında tanıtın.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">Tarih</th>
                  <th className="text-left px-6 py-3 font-semibold">Kişi</th>
                  <th className="text-left px-6 py-3 font-semibold">Şirket</th>
                  <th className="text-left px-6 py-3 font-semibold">Sektör</th>
                  <th className="text-left px-6 py-3 font-semibold">İletişim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {downloads.map((d: any) => (
                  <tr key={d.id} className="hover:bg-gray-50/60">
                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(d.createdAt).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-3">
                      <div className="font-medium text-gray-900">{d.name}</div>
                    </td>
                    <td className="px-6 py-3 text-gray-700">{d.company || '—'}</td>
                    <td className="px-6 py-3">
                      <span className="text-xs px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                        {SECTOR_NAMES[d.sector] || d.sector}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <a href={`mailto:${d.email}`} className="text-purple-700 hover:underline text-xs block">{d.email}</a>
                      {d.phone && <a href={`tel:${d.phone}`} className="text-gray-600 hover:underline text-xs block">{d.phone}</a>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
