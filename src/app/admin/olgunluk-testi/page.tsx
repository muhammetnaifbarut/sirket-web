import prisma from '@/lib/db'
import { TrendingUp, Users, Award, Sparkles } from 'lucide-react'

export const metadata = { title: 'Olgunluk Testi Sonuçları' }

export default async function Page() {
  const results = await prisma.maturityTestResult.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  const total = results.length
  const avgScore = total > 0 ? Math.round(results.reduce((s, r) => s + r.totalScore, 0) / total) : 0
  const levels = results.reduce((acc, r) => {
    acc[r.level] = (acc[r.level] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const levelColors: Record<string, string> = {
    'Başlangıç': 'bg-red-50 text-red-700 border-red-200',
    'Gelişen': 'bg-orange-50 text-orange-700 border-orange-200',
    'Dijital': 'bg-cyan-50 text-cyan-700 border-cyan-200',
    'Lider': 'bg-green-50 text-green-700 border-green-200',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dijital Olgunluk Testi</h1>
        <p className="text-gray-500 text-sm mt-1">
          /dijital-olgunluk-testi sayfasında testi tamamlayan ziyaretçilerin sonuçları. Her sonuç CRM\'e Lead olarak da düşer.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase mb-2">
            <Users className="w-4 h-4" />
            Toplam Test
          </div>
          <div className="text-3xl font-bold text-gray-900">{total}</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase mb-2">
            <TrendingUp className="w-4 h-4" />
            Ortalama Skor
          </div>
          <div className="text-3xl font-bold text-purple-700">{avgScore}/100</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            Bu Ay
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {results.filter((r) => {
              const d = new Date(r.createdAt)
              const now = new Date()
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
            }).length}
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase mb-2">
            <Award className="w-4 h-4" />
            En Yaygın Seviye
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {Object.entries(levels).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'}
          </div>
        </div>
      </div>

      {/* Levels distribution */}
      {Object.keys(levels).length > 0 && (
        <div className="rounded-xl bg-white border border-gray-100 p-6">
          <div className="text-sm font-semibold text-gray-900 mb-4">Seviye Dağılımı</div>
          <div className="grid sm:grid-cols-4 gap-3">
            {['Başlangıç', 'Gelişen', 'Dijital', 'Lider'].map((lv) => (
              <div key={lv} className={`px-4 py-3 rounded-xl border ${levelColors[lv]}`}>
                <div className="text-xs font-semibold uppercase">{lv}</div>
                <div className="text-2xl font-bold mt-1">{levels[lv] ?? 0}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results table */}
      <div className="rounded-xl bg-white border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="font-semibold text-gray-900">Son Sonuçlar (en yeni 100)</div>
        </div>
        {total === 0 ? (
          <div className="p-10 text-center text-gray-500">Henüz test sonucu yok.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">Tarih</th>
                  <th className="text-left px-6 py-3 font-semibold">Kişi</th>
                  <th className="text-left px-6 py-3 font-semibold">Şirket</th>
                  <th className="text-left px-6 py-3 font-semibold">Sektör</th>
                  <th className="text-left px-6 py-3 font-semibold">Çalışan</th>
                  <th className="text-right px-6 py-3 font-semibold">Skor</th>
                  <th className="text-left px-6 py-3 font-semibold">Seviye</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/60">
                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </td>
                    <td className="px-6 py-3">
                      <div className="font-medium text-gray-900">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.email}</div>
                    </td>
                    <td className="px-6 py-3 text-gray-700">{r.company || '—'}</td>
                    <td className="px-6 py-3 text-gray-700">{r.sector || '—'}</td>
                    <td className="px-6 py-3 text-gray-700">{r.employeeCount || '—'}</td>
                    <td className="px-6 py-3 text-right font-bold text-gray-900">{r.totalScore}/100</td>
                    <td className="px-6 py-3">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold border ${levelColors[r.level] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                        {r.level}
                      </span>
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
