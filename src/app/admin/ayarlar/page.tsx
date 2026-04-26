import prisma from '@/lib/db'
import SettingsForm from '@/components/admin/SettingsForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Site Ayarları' }

export default async function AyarlarPage() {
  const settings = await prisma.setting.findMany({ orderBy: { key: 'asc' } })
  const obj = Object.fromEntries(settings.map((s) => [s.key, s.value]))

  const lastUpdated = settings.length > 0
    ? settings.reduce((latest, s) =>
        s.updatedAt > latest ? s.updatedAt : latest,
        settings[0].updatedAt
      )
    : null

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Site Ayarları</h1>
          <p className="text-gray-500 text-sm mt-1">
            Marka, iletişim, SEO, sosyal medya ve entegrasyonların.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-gray-700">Tüm değişiklikler kaydediliyor</span>
          </div>
          {lastUpdated && (
            <span>
              Son güncelleme: {new Date(lastUpdated).toLocaleString('tr-TR', {
                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
              })}
            </span>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Aktif Ayar</div>
          <div className="text-2xl font-bold text-gray-900 tabular-nums">{settings.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Tema</div>
          <div className="text-2xl font-bold text-gray-900">Mauve</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Site Adı</div>
          <div className="text-2xl font-bold text-purple-700">{obj.site_name || 'kooza'}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Bakım Modu</div>
          <div className="text-2xl font-bold text-emerald-600">Açık</div>
        </div>
      </div>

      {/* Form */}
      <SettingsForm settings={obj} />
    </div>
  )
}
