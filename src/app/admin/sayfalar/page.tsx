import prisma from '@/lib/db'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sayfalar' }

export default async function SayfalarPage() {
  const pages = await prisma.page.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sayfalar</h1>
          <p className="text-gray-500 text-sm mt-1">Dinamik sayfa yönetimi</p>
        </div>
        <Link href="/admin/sayfalar/yeni" className="btn-primary">+ Sayfa Ekle</Link>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Başlık</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Slug</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Durum</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-600">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pages.map(page => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{page.title}</div>
                  {page.isSystem && <span className="badge bg-gray-100 text-gray-500 text-xs mt-0.5">Sistem</span>}
                </td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">/{page.slug}</td>
                <td className="px-4 py-3">
                  <span className={`badge ${page.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {page.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link href={`/${page.slug}`} target="_blank" className="text-xs text-gray-400 hover:text-blue-600 px-2 py-1 rounded hover:bg-blue-50">
                      Görüntüle
                    </Link>
                    <Link href={`/admin/sayfalar/${page.id}`} className="text-xs text-blue-600 font-medium px-2 py-1 rounded hover:bg-blue-50">
                      Düzenle
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Henüz sayfa oluşturulmadı</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
