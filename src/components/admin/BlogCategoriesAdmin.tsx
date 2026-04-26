'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function BlogCategoriesAdmin({ categories }: { categories: any[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const { register, handleSubmit, reset, setValue } = useForm()

  const openEdit = (cat: any) => {
    setEditItem(cat)
    setValue('name', cat.name)
    setValue('slug', cat.slug)
    setValue('description', cat.description || '')
    setValue('color', cat.color || '#3B82F6')
    setShowForm(true)
  }

  const autoSlug = (name: string) =>
    name.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').trim()

  const onSubmit = async (data: any) => {
    const url = editItem ? `/api/blog/categories/${editItem.id}` : '/api/blog/categories'
    const method = editItem ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (res.ok) {
      toast.success(editItem ? 'Güncellendi' : 'Oluşturuldu')
      setShowForm(false); setEditItem(null); reset(); router.refresh()
    } else toast.error('Hata')
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" kategorisini silmek istediğinizden emin misiniz?`)) return
    await fetch(`/api/blog/categories/${id}`, { method: 'DELETE' })
    toast.success('Silindi')
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => { setShowForm(!showForm); setEditItem(null); reset() }} className="btn-primary">
          {showForm ? 'İptal' : '+ Kategori Ekle'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="card p-6">
          <h2 className="font-bold text-gray-900 mb-4">{editItem ? 'Düzenle' : 'Yeni Kategori'}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Adı</label>
              <input {...register('name')} className="form-input" onChange={e => { setValue('name', e.target.value); if (!editItem) setValue('slug', autoSlug(e.target.value)) }} />
            </div>
            <div>
              <label className="form-label">Slug</label>
              <input {...register('slug')} className="form-input font-mono text-sm" />
            </div>
            <div>
              <label className="form-label">Açıklama</label>
              <input {...register('description')} className="form-input" />
            </div>
            <div>
              <label className="form-label">Renk</label>
              <input {...register('color')} type="color" className="form-input h-10" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => { setShowForm(false); reset() }} className="btn-outline">İptal</button>
            <button type="submit" className="btn-primary">{editItem ? 'Güncelle' : 'Ekle'}</button>
          </div>
        </form>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Kategori</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Slug</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-600">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-2">
                  {cat.color && <span className="w-3 h-3 rounded-full" style={{ background: cat.color }} />}
                  <span className="font-medium text-gray-900">{cat.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-400 font-mono text-xs">{cat.slug}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(cat)} className="text-xs text-blue-600 font-medium px-2 py-1 rounded hover:bg-blue-50">Düzenle</button>
                    <button onClick={() => handleDelete(cat.id, cat.name)} className="text-xs text-red-400 px-2 py-1 rounded hover:bg-red-50">Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
