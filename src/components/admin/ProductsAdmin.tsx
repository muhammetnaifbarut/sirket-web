'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ProductsAdmin({ products }: { products: any[] }) {
  const router = useRouter()

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" ürününü silmek istediğinizden emin misiniz?`)) return
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      toast.success('Ürün silindi')
      router.refresh()
    } catch {
      toast.error('Hata oluştu')
    }
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Ürün</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Durum</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Özellikler</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Başlangıç Fiyatı</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-600">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">{p.name}</div>
                <div className="text-xs text-gray-400">{p.slug}</div>
              </td>
              <td className="px-4 py-3">
                <span className={`badge ${p.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : p.status === 'COMING_SOON' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                  {p.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">{p.features?.length || 0} özellik</td>
              <td className="px-4 py-3">
                {p.price != null ? (
                  <span className="font-semibold text-gray-900">
                    {p.currency === 'USD' ? '$' : p.currency === 'EUR' ? '€' : '₺'}
                    {Number(p.price).toLocaleString('tr-TR')}
                    <span className="text-gray-400 font-normal text-xs ml-0.5">
                      /{p.billingType === 'yearly' ? 'yıl' : 'ay'}
                    </span>
                  </span>
                ) : p.pricing?.[0] ? (
                  <span className="font-semibold text-gray-900">
                    ₺{Number(p.pricing[0].monthlyPrice).toLocaleString('tr-TR')}
                    <span className="text-gray-400 font-normal text-xs ml-0.5">/ay</span>
                  </span>
                ) : (
                  <span className="text-gray-400 text-xs">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/yazilimlar/${p.slug}`} target="_blank" className="text-xs text-gray-400 hover:text-blue-600 px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                    Önizle
                  </Link>
                  <Link href={`/admin/urunler/${p.id}`} className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors font-medium">
                    Düzenle
                  </Link>
                  <button onClick={() => handleDelete(p.id, p.name)} className="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors">
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
