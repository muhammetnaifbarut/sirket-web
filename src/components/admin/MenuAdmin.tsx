'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function MenuAdmin({ items }: { items: any[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const { register, handleSubmit, reset, setValue } = useForm()

  const openEdit = (item: any) => {
    setEditItem(item)
    setValue('label', item.label)
    setValue('url', item.url)
    setValue('target', item.target)
    setValue('order', item.order)
    setValue('isActive', item.isActive)
    setShowForm(true)
  }

  const onSubmit = async (data: any) => {
    try {
      if (editItem) {
        await fetch(`/api/menu/${editItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        toast.success('Menü öğesi güncellendi')
      } else {
        await fetch('/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, location: 'header' }),
        })
        toast.success('Menü öğesi eklendi')
      }
      setShowForm(false)
      setEditItem(null)
      reset()
      router.refresh()
    } catch {
      toast.error('Hata oluştu')
    }
  }

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`"${label}" menü öğesini silmek istediğinizden emin misiniz?`)) return
    try {
      await fetch(`/api/menu/${id}`, { method: 'DELETE' })
      toast.success('Menü öğesi silindi')
      router.refresh()
    } catch {
      toast.error('Hata oluştu')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => { setShowForm(!showForm); setEditItem(null); reset() }}
          className="btn-primary"
        >
          {showForm ? 'İptal' : '+ Menü Öğesi Ekle'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="card p-6">
          <h2 className="font-bold text-gray-900 mb-4">{editItem ? 'Menü Öğesi Düzenle' : 'Yeni Menü Öğesi'}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Etiket *</label>
              <input {...register('label', { required: true })} className="form-input" placeholder="Ana Sayfa" />
            </div>
            <div>
              <label className="form-label">URL *</label>
              <input {...register('url', { required: true })} className="form-input" placeholder="/" />
            </div>
            <div>
              <label className="form-label">Hedef</label>
              <select {...register('target')} className="form-input">
                <option value="_self">Aynı Sekme</option>
                <option value="_blank">Yeni Sekme</option>
              </select>
            </div>
            <div>
              <label className="form-label">Sıra</label>
              <input {...register('order')} type="number" className="form-input" defaultValue={0} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input {...register('isActive')} type="checkbox" defaultChecked className="rounded" />
              Aktif
            </label>
            <button type="submit" className="btn-primary">
              {editItem ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      )}

      <div className="card overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Header Menüsü</h2>
          <span className="text-sm text-gray-400">{items.length} öğe</span>
        </div>
        <div className="divide-y divide-gray-50">
          {items.map((item) => (
            <div key={item.id}>
              <div className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50">
                <div className="w-6 h-6 flex items-center justify-center text-gray-300 cursor-grab">⠿</div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900">{item.label}</span>
                  <span className="text-gray-400 text-sm ml-2">{item.url}</span>
                  {!item.isActive && <span className="badge bg-gray-100 text-gray-400 ml-2 text-xs">Gizli</span>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 font-medium">
                    Düzenle
                  </button>
                  <button onClick={() => handleDelete(item.id, item.label)} className="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50">
                    Sil
                  </button>
                </div>
              </div>
              {item.children?.map((child: any) => (
                <div key={child.id} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 bg-gray-50/50">
                  <div className="w-6 ml-6 text-gray-200 text-xs">└</div>
                  <div className="flex-1">
                    <span className="text-gray-700">{child.label}</span>
                    <span className="text-gray-400 text-sm ml-2">{child.url}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(child)} className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 font-medium">
                      Düzenle
                    </button>
                    <button onClick={() => handleDelete(child.id, child.label)} className="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50">
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
