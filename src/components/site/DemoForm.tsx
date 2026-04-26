'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalı').max(120),
  email: z.string().email('Geçerli bir e-posta girin'),
  phone: z.string().max(40).optional(),
  company: z.string().max(160).optional(),
  productId: z.string().optional(),
  message: z.string().max(4000).optional(),
  website: z.string().max(0).optional(), // honeypot
})

type FormData = z.infer<typeof schema>

interface Product { id: string; name: string }

export default function DemoForm({ products }: { products: Product[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'DEMO' }),
      })
      if (!res.ok) throw new Error()
      reset()
      // Redirect to thank-you page (also enables GA conversion tracking)
      router.push('/demo/tesekkurler')
    } catch {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Talebiniz Alındı!</h3>
        <p className="text-gray-600 mb-6">Uzman ekibimiz 1 iş günü içinde sizinle iletişime geçecek.</p>
        <button onClick={() => setSubmitted(false)} className="btn-outline">
          Yeni Talep Gönder
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <div aria-hidden className="hidden" style={{ position: 'absolute', left: '-9999px' }}>
        <label>
          Website (boş bırakın)
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Ad Soyad *</label>
          <input {...register('name')} className="form-input" placeholder="Ahmet Yılmaz" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="form-label">E-posta *</label>
          <input {...register('email')} type="email" className="form-input" placeholder="ahmet@sirket.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Telefon</label>
          <input {...register('phone')} className="form-input" placeholder="+90 5xx xxx xx xx" />
        </div>
        <div>
          <label className="form-label">Şirket Adı</label>
          <input {...register('company')} className="form-input" placeholder="Şirket A.Ş." />
        </div>
      </div>

      <div>
        <label className="form-label">İlgilendiğiniz Ürün</label>
        <select {...register('productId')} className="form-input">
          <option value="">Ürün seçin (opsiyonel)</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="form-label">Mesajınız</label>
        <textarea {...register('message')} className="form-textarea" placeholder="İhtiyaçlarınızı ve beklentilerinizi kısaca anlatın..." rows={4} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Gönderiliyor...
          </>
        ) : 'Demo Talebi Gönder'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Gönder tuşuna basarak{' '}
        <a href="/gizlilik-politikasi" className="underline">Gizlilik Politikamızı</a> kabul etmiş olursunuz.
      </p>
    </form>
  )
}
