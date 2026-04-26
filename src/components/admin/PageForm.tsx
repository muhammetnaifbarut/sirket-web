'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function PageForm({ page }: { page?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const autoSlug = (title: string) =>
    title.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').trim()

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: page?.title || '',
      slug: page?.slug || '',
      description: page?.description || '',
      content: page?.content || '',
      metaTitle: page?.metaTitle || '',
      metaDesc: page?.metaDesc || '',
      status: page?.status || 'DRAFT',
    },
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const url = page ? `/api/pages/${page.id}` : '/api/pages'
      const method = page ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error()
      toast.success(page ? 'Güncellendi' : 'Oluşturuldu')
      router.push('/admin/sayfalar')
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
            <label className="form-label">Sayfa Başlığı *</label>
            <input {...register('title')} className="form-input" onChange={e => { setValue('title', e.target.value); if (!page) setValue('slug', autoSlug(e.target.value)) }} />
          </div>
          <div>
            <label className="form-label">Slug (URL)</label>
            <input {...register('slug')} className="form-input font-mono text-sm" />
          </div>
          <div>
            <label className="form-label">Açıklama</label>
            <textarea {...register('description')} className="form-textarea" rows={3} />
          </div>
          <div>
            <label className="form-label">İçerik (HTML/Markdown)</label>
            <textarea {...register('content')} className="form-textarea font-mono text-sm" rows={15} />
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-3">SEO</h3>
            <div className="space-y-3">
              <div><label className="form-label">SEO Başlık</label><input {...register('metaTitle')} className="form-input" /></div>
              <div><label className="form-label">Meta Açıklama</label><textarea {...register('metaDesc')} className="form-textarea" rows={2} /></div>
            </div>
          </div>
        </div>
        <div className="card p-5 h-fit">
          <div><label className="form-label">Durum</label>
            <select {...register('status')} className="form-input">
              <option value="DRAFT">Taslak</option>
              <option value="PUBLISHED">Yayınla</option>
              <option value="ARCHIVED">Arşiv</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <button type="button" onClick={() => router.back()} className="btn-outline">İptal</button>
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? 'Kaydediliyor...' : page ? 'Güncelle' : 'Oluştur'}
        </button>
      </div>
    </form>
  )
}
