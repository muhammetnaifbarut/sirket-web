import prisma from '@/lib/db'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Aktivite Logları' }

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
  LEAD_UPDATED: { label: 'Lead Güncellendi', color: 'bg-blue-100 text-blue-700' },
  LEAD_CREATED: { label: 'Lead Oluşturuldu', color: 'bg-green-100 text-green-700' },
  LEAD_DELETED: { label: 'Lead Silindi', color: 'bg-red-100 text-red-700' },
  POST_CREATED: { label: 'Blog Oluşturuldu', color: 'bg-purple-100 text-purple-700' },
  POST_UPDATED: { label: 'Blog Güncellendi', color: 'bg-indigo-100 text-indigo-700' },
  SETTINGS_UPDATED: { label: 'Ayar Güncellendi', color: 'bg-amber-100 text-amber-700' },
}

export default async function LoglarPage() {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  const totalToday = logs.filter((l) => {
    const today = new Date()
    const logDate = new Date(l.createdAt)
    return logDate.toDateString() === today.toDateString()
  }).length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Aktivite Logları</h1>
          <p className="text-gray-500 text-sm mt-0.5">Son 100 aktivite • Bugün: {totalToday} işlem</p>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-3">📋</div>
          <p>Henüz log kaydı yok</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-4 py-3 font-medium text-gray-500">İşlem</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Kullanıcı</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Varlık</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Detay</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Tarih</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {logs.map((log) => {
                  const cfg = ACTION_LABELS[log.action] || { label: log.action, color: 'bg-gray-100 text-gray-600' }
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{log.userEmail || '—'}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {log.entity && (
                          <span className="font-mono text-xs">
                            {log.entity}{log.entityId ? ` #${log.entityId.slice(0, 8)}` : ''}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-400 max-w-xs truncate text-xs">
                        {log.details}
                      </td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                        {format(new Date(log.createdAt), 'dd MMM, HH:mm', { locale: tr })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
