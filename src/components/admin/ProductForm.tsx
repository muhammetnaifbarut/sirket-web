'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(1, 'Ürün adı gerekli'),
  slug: z.string().min(1, 'Slug gerekli'),
  tagline: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  badge: z.string().optional(),
  demoUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  status: z.enum(['ACTIVE', 'COMING_SOON', 'ARCHIVED']),
  order: z.coerce.number().default(0),
  price: z.coerce.number().min(0).optional().nullable(),
  currency: z.string().default('TRY'),
  billingType: z.enum(['monthly', 'yearly']).default('monthly'),
  features: z.array(z.object({ value: z.string() })),
})

type FormData = z.infer<typeof schema>

const ICON_OPTIONS = [
  'calendar', 'package', 'users', 'trending-up', 'briefcase',
  'bar-chart', 'zap', 'target', 'settings', 'book-open',
  'box', 'globe', 'shield', 'star'
]

export default function ProductForm({ product }: { product?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const defaultFeatures = product?.features?.map((f: string) => ({ value: f })) || [{ value: '' }]

  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product?.name || '',
      slug: product?.slug || '',
      tagline: product?.tagline || '',
      description: product?.description || '',
      icon: product?.icon || 'box',
      badge: product?.badge || '',
      demoUrl: product?.demoUrl || '',
      videoUrl: product?.videoUrl || '',
      status: product?.status || 'ACTIVE',
      order: product?.order || 0,
      price: product?.price ? Number(product.price) : null,
      currency: product?.currency || 'TRY',
      billingType: product?.billingType || 'monthly',
      features: defaultFeatures,
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'features' })

  const autoSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const payload = {
        ...data,
        features: data.features.map(f => f.value).filter(Boolean),
      }

      const url = product ? `/api/products/${product.id}` : '/api/products'
      const method = product ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      toast.success(product ? 'Ürün güncellendi' : 'Ürün oluşturuldu')
      router.push('/admin/urunler')
    } catch {
      toast.error('Hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4 card p-6">
          <h2 className="font-bold text-gray-900 mb-2">Temel Bilgiler</h2>
          <div>
            <label className="form-label">Ürün Adı *</label>
            <input
              {...register('name')}
              className="form-input"
              onChange={e => {
                setValue('name', e.target.value)
                if (!product) setValue('slug', autoSlug(e.target.value))
              }}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="form-label">Slug (URL)</label>
            <input {...register('slug')} className="form-input font-mono text-sm" />
            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
          </div>

          <div>
            <label className="form-label">Slogan</label>
            <input {...register('tagline')} className="form-input" placeholder="Kısa tanıtım cümlesi" />
          </div>

          <div>
            <label className="form-label">Açıklama</label>
            <textarea {...register('description')} className="form-textarea" rows={4} />
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="form-label mb-0">Özellikler</label>
              <button type="button" onClick={() => append({ value: '' })} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                + ��zellik Ekle
              </button>
            </div>
            <div className="space-y-2">
              {fields.map((field, idx) => (
                <div key={field.id} className="flex gap-2">
                  <input {...register(`features.${idx}.value`)} className="form-input flex-1" placeholder="Özellik açıklaması" />
                  <button type="button" onClick={() => remove(idx)} className="text-gray-300 hover:text-red-500 px-2">×</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-4">Yayın</h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Durum</label>
                <select {...register('status')} className="form-input">
                  <option value="ACTIVE">Aktif</option>
                  <option value="COMING_SOON">Yakında</option>
                  <option value="ARCHIVED">Arşiv</option>
                </select>
              </div>
              <div>
                <label className="form-label">Sıra</label>
                <input {...register('order')} type="number" className="form-input" />
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-4">Görsel & İkon</h2>
            <div className="space-y-3">
              <div>
                <label className="form-label">İkon</label>
                <select {...register('icon')} className="form-input">
                  {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Rozet (Opsiyonel)</label>
                <input {...register('badge')} className="form-input" placeholder="Yeni, Popüler..." />
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-4">Fiyatlandırma</h2>
            <div className="space-y-3">
              <div>
                <label className="form-label">Fiyat</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₺</span>
                  <input
                    {...register('price')}
                    type="number"
                    min="0"
                    step="0.01"
                    className="form-input pl-7"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Para Birimi</label>
                <select {...register('currency')} className="form-input">
                  <option value="TRY">TRY — Türk Lirası (₺)</option>
                  <option value="USD">USD — Amerikan Doları ($)</option>
                  <option value="EUR">EUR — Euro (€)</option>
                </select>
              </div>
              <div>
                <label className="form-label">Fatura Dönemi</label>
                <select {...register('billingType')} className="form-input">
                  <option value="monthly">Aylık</option>
                  <option value="yearly">Yıllık</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-4">Linkler</h2>
            <div className="space-y-3">
              <div>
                <label className="form-label">Demo URL</label>
                <input {...register('demoUrl')} className="form-input" placeholder="https://..." />
              </div>
              <div>
                <label className="form-label">Video URL</label>
                <input {...register('videoUrl')} className="form-input" placeholder="https://youtube.com/..." />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button type="button" onClick={() => router.back()} className="btn-outline">
          İptal
        </button>
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? 'Kaydediliyor...' : product ? 'Güncelle' : 'Oluştur'}
        </button>
      </div>
    </form>
  )
}
