'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/utils'

export default function BlogAdmin({ posts }: { posts: any[] }) {
  const router = useRouter()

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" yazısını silmek istediğinizden emin misiniz?`)) return
    try {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      toast.success('Yazı silindi')
      router.refresh()
    } catch {
      toast.error('Hata oluştu')
    }
  }

  if (!posts.length) {
    return (
      <div className="card p-12 text-center">
        <div className="text-4xl mb-3">📝</div>
        <p className="text-gray-500 mb-4">Henüz blog yazısı yok</p>
        <Link href="/admin/blog/yeni" className="btn-primary">İlk Yazıyı Oluştur</Link>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Başlık</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Kategori</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Durum</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Tarih</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-600">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900 line-clamp-1">{post.title}</div>
                <div className="text-xs text-gray-400">{post.slug}</div>
              </td>
              <td className="px-4 py-3">
                {post.category ? (
                  <span className="badge bg-blue-100 text-blue-700">{post.category.name}</span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-4 py-3">
                <span className={`badge ${
                  post.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                  post.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {post.status === 'PUBLISHED' ? 'Yayında' : post.status === 'DRAFT' ? 'Taslak' : 'Arşiv'}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-400 text-xs">
                {formatDate(post.createdAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  {post.status === 'PUBLISHED' && (
                    <Link href={`/blog/${post.slug}`} target="_blank" className="text-xs text-gray-400 hover:text-blue-600 px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                      Önizle
                    </Link>
                  )}
                  <Link href={`/admin/blog/${post.id}`} className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors font-medium">
                    Düzenle
                  </Link>
                  <button onClick={() => handleDelete(post.id, post.title)} className="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors">
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
