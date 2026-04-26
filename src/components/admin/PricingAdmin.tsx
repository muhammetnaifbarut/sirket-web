'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function PricingAdmin({ plans }: { plans: any[] }) {
  const router = useRouter()
  const [editPlan, setEditPlan] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues: {
      name: '',
      description: '',
      monthlyPrice: '',
      yearlyPrice: '',
      features: [{ value: '' }],
      isPopular: false,
      isActive: true,
      ctaLabel: 'Başlayın',
      ctaUrl: '/demo',
      order: 0,
    }
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'features' as any })

  const openEdit = (plan: any) => {
    setEditPlan(plan)
    setValue('name', plan.name)
    setValue('description', plan.description || '')
    setValue('monthlyPrice', plan.monthlyPrice)
    setValue('yearlyPrice', plan.yearlyPrice)
    setValue('features', plan.features.map((f: string) => ({ value: f })))
    setValue('isPopular', plan.isPopular)
    setValue('isActive', plan.isActive)
    setValue('ctaLabel', plan.ctaLabel)
    setValue('ctaUrl', plan.ctaUrl)
    setValue('order', plan.order)
    setShowForm(true)
  }

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      features: data.features.map((f: any) => f.value).filter(Boolean),
      monthlyPrice: parseFloat(data.monthlyPrice),
      yearlyPrice: parseFloat(data.yearlyPrice),
    }

    const url = editPlan ? `/api/pricing/${editPlan.id}` : '/api/pricing'
    const method = editPlan ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      toast.success(editPlan ? 'Plan güncellendi' : 'Plan oluşturuldu')
      setShowForm(false)
      setEditPlan(null)
      reset()
      router.refresh()
    } else {
      toast.error('Hata oluştu')
    }
  }

  return (
    <div className="space-y-6">
      {/* Plans overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className={`card p-5 ${plan.isPopular ? 'border-blue-300 border-2' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">{plan.name}</h3>
              <div className="flex gap-1">
                {plan.isPopular && <span className="badge bg-blue-100 text-blue-700 text-xs">Popüler</span>}
                {!plan.isActive && <span className="badge bg-gray-100 text-gray-500 text-xs">Gizli</span>}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              ₺{Number(plan.monthlyPrice).toLocaleString('tr-TR')}
              <span className="text-sm font-normal text-gray-400">/ay</span>
            </p>
            <p className="text-xs text-gray-500 mb-3">{plan.features.length} özellik</p>
            <button onClick={() => openEdit(plan)} className="w-full btn-outline text-sm py-2">
              Düzenle
            </button>
          </div>
        ))}
        <div
          className="card p-5 border-dashed border-2 flex items-center justify-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
          onClick={() => { setEditPlan(null); reset(); setShowForm(true) }}
        >
          <div className="text-center">
            <div className="text-3xl mb-1">+</div>
            <p className="text-sm text-gray-500">Yeni Plan Ekle</p>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="card p-6">
          <h2 className="font-bold text-gray-900 mb-5">{editPlan ? 'Plan Düzenle' : 'Yeni Plan'}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Plan Adı</label>
              <input {...register('name')} className="form-input" />
            </div>
            <div>
              <label className="form-label">Açıklama</label>
              <input {...register('description')} className="form-input" />
            </div>
            <div>
              <label className="form-label">Aylık Fiyat (₺)</label>
              <input {...register('monthlyPrice')} type="number" className="form-input" />
            </div>
            <div>
              <label className="form-label">Yıllık Fiyat (₺)</label>
              <input {...register('yearlyPrice')} type="number" className="form-input" />
            </div>
            <div>
              <label className="form-label">CTA Yazısı</label>
              <input {...register('ctaLabel')} className="form-input" />
            </div>
            <div>
              <label className="form-label">CTA URL</label>
              <input {...register('ctaUrl')} className="form-input" />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="form-label mb-0">Özellikler</label>
              <button type="button" onClick={() => append({ value: '' } as any)} className="text-xs text-blue-600 font-medium">
                + Ekle
              </button>
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

          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input {...register('isPopular')} type="checkbox" />
              En Popüler
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input {...register('isActive')} type="checkbox" defaultChecked />
              Aktif
            </label>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => { setShowForm(false); reset() }} className="btn-outline">İptal</button>
            <button type="submit" className="btn-primary">{editPlan ? 'Güncelle' : 'Oluştur'}</button>
          </div>
        </form>
      )}
    </div>
  )
}
