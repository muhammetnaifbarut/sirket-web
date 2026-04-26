'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const ICON_OPTIONS = ['bar-chart', 'zap', 'target', 'settings', 'book-open', 'briefcase', 'users', 'globe', 'shield', 'star']

export default function ServiceForm({ service }: { service?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const defaultFeatures = service?.features?.map((f: string) => ({ value: f })) || [{ value: '' }]

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      name: service?.name || '',
      slug: service?.slug || '',
      description: service?.description || '',
      icon: service?.icon || 'settings',
      status: service?.status || 'ACTIVE',
      order: service?.order || 0,
      features: defaultFeatures,
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'features' as any })

  const autoSlug = (name: string) =>
    name.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').trim()

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const payload = { ...data, features: data.features.map((f: any) => f.value).filter(Boolean) }
      const url = service ? `/api/services/${service.id}` : '/api/services'
      const method = service ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      toast.success(service ? 'Güncellendi' : 'Oluşturuldu')
      router.push('/admin/hizmetler')
    } catch {
      toast.error('Hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6 space-y-4">
          <div>
            <label className="form-label">Hizmet Adı *</label>
            <input {...register('name')} className="form-input" onChange={e => { setValue('name', e.target.value); if (!service) setValue('slug', autoSlug(e.target.value)) }} />
          </div>
          <div>
            <label className="form-label">Slug</label>
            <input {...register('slug')} className="form-input font-mono text-sm" />
          </div>
          <div>
            <label className="form-label">Açıklama</label>
            <textarea {...register('description')} className="form-textarea" rows={4} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="form-label mb-0">Özellikler</label>
              <button type="button" onClick={() => append({ value: '' } as any)} className="text-xs text-blue-600 font-medium">+ Ekle</button>
            </div>
            <div className="space-y-2">
              {fields.map((f, i) => (
                <div key={f.id} className="flex gap-2">
                  <input {...register(`features.${i}.value` as any)} className="form-input flex-1" />
                  <button type="button" onClick={() => remove(i)} className="text-gray-300 hover:text-red-500 px-2">×</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card p-5 space-y-4 h-fit">
          <div><label className="form-label">Durum</label><select {...register('status')} className="form-input"><option value="ACTIVE">Aktif</option><option value="ARCHIVED">Arşiv</option></select></div>
          <div><label className="form-label">İkon</label><select {...register('icon')} className="form-input">{ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
          <div><label className="form-label">Sıra</label><input {...register('order')} type="number" className="form-input" /></div>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <button type="button" onClick={() => router.back()} className="btn-outline">İptal</button>
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? 'Kaydediliyor...' : service ? 'Güncelle' : 'Oluştur'}
        </button>
      </div>
    </form>
  )
}
