import prisma from '@/lib/db'
import { Brain, Mail, Phone, Building2 } from 'lucide-react'

export const metadata = { title: 'AI Yol Haritası Talepleri' }

export const dynamic = 'force-dynamic'

export default async function Page() {
  const requests = await prisma.roadmapRequest.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  }).catch(() => [])

  const total = requests.length
  const thisMonth = requests.filter((r) => {
    const d = new Date(r.createdAt)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const sectors = requests.reduce((acc, r) => {
    acc[r.sector] = (acc[r.sector] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topSector = Object.entries(sectors).sort((a, b) => b[1] - a[1])[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">AI Yol Haritası Talepleri</h1>
        <p className="text-gray-500 text-sm mt-1">
          /dijital-yol-haritasi sayfasından AI rapor talep eden ziyaretçiler. Her talep CRM'e Lead olarak da düşer.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase mb-2">
            <Brain className="w-4 h-4" />
            Toplam Talep
          </div>
          <div className="text-3xl font-bold text-gray-900">{total}</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase mb-2">
            Bu Ay
          </div>
          <div className="text-3xl font-bold text-purple-700">{thisMonth}</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase mb-2">
            En Çok Sektör
          </div>
          <div className="text-xl font-bold text-gray-900">{topSector?.[0] ?? '—'}</div>
          {topSector && <div className="text-xs text-gray-500 mt-1">{topSector[1]} talep</div>}
        </div>
      </div>

      {/* Requests list */}
      <div className="rounded-xl bg-white border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-900">
          Son AI Yol Haritası Talepleri (en yeni 100)
        </div>
        {total === 0 ? (
          <div className="p-10 text-center text-gray-500">
            Henüz AI yol haritası talebi yok. Site'de tanıtın → /dijital-yol-haritasi
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {requests.map((r) => (
              <details key={r.id} className="group">
                <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 list-none">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                      <Brain className="w-5 h-5 text-purple-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <div className="font-semibold text-gray-900">{r.company}</div>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                          {r.sector}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                          {r.employeeCount}
                        </span>
                        {r.reportSent && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> Mail Gönderildi
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-700 flex flex-wrap gap-x-3 gap-y-1">
                        <span><strong>{r.name}</strong></span>
                        <a href={`mailto:${r.email}`} className="text-purple-700 hover:underline">{r.email}</a>
                        {r.phone && <a href={`tel:${r.phone}`} className="text-purple-700 hover:underline">{r.phone}</a>}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(r.createdAt).toLocaleString('tr-TR')}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 group-open:hidden">▼ Detay</div>
                    <div className="text-xs text-gray-400 hidden group-open:block">▲ Kapat</div>
                  </div>
                </summary>
                <div className="px-6 pb-6 bg-gray-50/50">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase mb-2">Hedefi</div>
                      <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-100">{r.goals}</p>
                      {r.websiteUrl && (
                        <div className="mt-3">
                          <div className="text-xs font-bold text-gray-500 uppercase mb-1">Web Sitesi</div>
                          <a href={r.websiteUrl} target="_blank" rel="noopener" className="text-sm text-purple-700 hover:underline">{r.websiteUrl}</a>
                        </div>
                      )}
                      {r.monthlyRevenue && (
                        <div className="mt-3">
                          <div className="text-xs font-bold text-gray-500 uppercase mb-1">Ciro</div>
                          <span className="text-sm text-gray-700">{r.monthlyRevenue}</span>
                        </div>
                      )}
                      <div className="mt-3">
                        <div className="text-xs font-bold text-gray-500 uppercase mb-1">Mevcut Sistemler</div>
                        <div className="flex flex-wrap gap-1.5">
                          {(r.currentSystems as string[]).length === 0 ? (
                            <span className="text-sm text-gray-500">Belirtmemiş</span>
                          ) : (
                            (r.currentSystems as string[]).map((s, i) => (
                              <span key={i} className="text-xs px-2 py-1 rounded-md bg-white border border-gray-200 text-gray-700">{s}</span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase mb-2">Üretilen Rapor</div>
                      <pre className="text-xs text-gray-700 bg-white rounded-lg p-4 border border-gray-100 overflow-auto max-h-96 whitespace-pre-wrap font-sans leading-relaxed">{r.generatedReport}</pre>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
