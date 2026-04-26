'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ServicesAdmin({ services }: { services: any[] }) {
  const router = useRouter()

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" hizmetini silmek istediğinizden emin misiniz?`)) return
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Silindi'); router.refresh() }
    else toast.error('Hata')
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Hizmet</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Paketler</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Durum</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-600">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {services.map(s => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">{s.name}</div>
                <div className="text-xs text-gray-400">{s.slug}</div>
              </td>
              <td className="px-4 py-3 text-gray-500">{s.packages?.length || 0} paket</td>
              <td className="px-4 py-3">
                <span className={`badge ${s.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {s.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/admin/hizmetler/${s.id}`} className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 font-medium">
                    Düzenle
                  </Link>
                  <button onClick={() => handleDelete(s.id, s.name)} className="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50">
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
