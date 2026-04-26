'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function TestimonialsAdmin({ testimonials }: { testimonials: any[] }) {
  const router = useRouter()
  const [editItem, setEditItem] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, reset, setValue } = useForm()

  const openEdit = (t: any) => {
    setEditItem(t)
    Object.entries(t).forEach(([k, v]) => setValue(k, v))
    setShowForm(true)
  }

  const onSubmit = async (data: any) => {
    const url = editItem ? `/api/testimonials/${editItem.id}` : '/api/testimonials'
    const method = editItem ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      toast.success(editItem ? 'Güncellendi' : 'Eklendi')
      setShowForm(false); setEditItem(null); reset(); router.refresh()
    } else toast.error('Hata')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Silmek istediğinizden emin misiniz?')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
    toast.success('Silindi')
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => { setShowForm(!showForm); setEditItem(null); reset() }} className="btn-primary">
          {showForm ? 'İptal' : '+ Referans Ekle'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="card p-6">
          <h2 className="font-bold text-gray-900 mb-4">{editItem ? 'Düzenle' : 'Yeni Referans'}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><label className="form-label">Ad Soyad</label><input {...register('name')} className="form-input" /></div>
            <div><label className="form-label">Unvan</label><input {...register('role')} className="form-input" /></div>
            <div><label className="form-label">Şirket</label><input {...register('company')} className="form-input" /></div>
            <div><label className="form-label">Puan (1-5)</label><input {...register('rating')} type="number" min={1} max={5} className="form-input" defaultValue={5} /></div>
          </div>
          <div className="mb-4"><label className="form-label">Yorum</label><textarea {...register('content')} className="form-textarea" rows={3} /></div>
          <div className="flex gap-3">
            <button type="button" onClick={() => { setShowForm(false); reset() }} className="btn-outline">İptal</button>
            <button type="submit" className="btn-primary">{editItem ? 'Güncelle' : 'Ekle'}</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map(t => (
          <div key={t.id} className="card p-5">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-amber-400 text-sm">★</span>
              ))}
            </div>
            <p className="text-gray-700 text-sm italic mb-4">"{t.content}"</p>
            <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
            <p className="text-xs text-gray-500">{t.role} • {t.company}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => openEdit(t)} className="text-xs text-blue-600 hover:underline">Düzenle</button>
              <button onClick={() => handleDelete(t.id)} className="text-xs text-red-400 hover:underline">Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
