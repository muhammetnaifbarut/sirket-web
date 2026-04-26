'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Ad soyad gerekli').max(120),
  email: z.string().email('Geçerli e-posta girin'),
  phone: z.string().max(40).optional(),
  subject: z.string().min(2, 'Konu gerekli').max(200),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı').max(4000),
  // Honeypot
  website: z.string().max(0).optional(),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
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
        body: JSON.stringify({ ...data, type: 'CONTACT' }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.error || 'network')
      }
      setSubmitted(true)
      reset()
      toast.success('Mesajınız iletildi!')
    } catch (e: any) {
      toast.error(e?.message === 'network' ? 'Bağlantı hatası, tekrar deneyin.' : (e?.message || 'Hata oluştu, tekrar deneyin.'))
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-green-50">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Mesajınız İletildi</h3>
        <p className="text-gray-500 mb-6">En kısa sürede ekibimiz sizinle iletişime geçecek.</p>
        <button onClick={() => setSubmitted(false)} className="btn-outline">Yeni Mesaj Gönder</button>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all'
  const errorClass = 'text-red-500 text-xs mt-1.5 flex items-center gap-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot: görünmez, sadece botlar doldurur */}
      <div aria-hidden className="hidden" style={{ position: 'absolute', left: '-9999px' }}>
        <label>
          Website (boş bırakın)
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Ad Soyad <span className="text-red-500">*</span></label>
          <input {...register('name')} className={inputClass} placeholder="Ahmet Yılmaz" />
          {errors.name && (
            <p className={errorClass}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label className="form-label">E-posta <span className="text-red-500">*</span></label>
          <input {...register('email')} type="email" className={inputClass} placeholder="info@sirket.com" />
          {errors.email && (
            <p className={errorClass}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Telefon</label>
          <input {...register('phone')} className={inputClass} placeholder="+90 5xx xxx xx xx" />
        </div>
        <div>
          <label className="form-label">Konu <span className="text-red-500">*</span></label>
          <input {...register('subject')} className={inputClass} placeholder="Nasıl yardımcı olabiliriz?" />
          {errors.subject && (
            <p className={errorClass}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.subject.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="form-label">Mesaj <span className="text-red-500">*</span></label>
        <textarea
          {...register('message')}
          rows={5}
          className={`${inputClass} resize-y min-h-[120px]`}
          placeholder="Projeniz veya sorunuz hakkında kısaca bilgi verin..."
        />
        {errors.message && (
          <p className={errorClass}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.message.message}
          </p>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Formu göndererek <a href="/gizlilik-politikasi" className="text-blue-600 hover:underline">Gizlilik Politikamızı</a> kabul etmiş olursunuz.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Gönderiliyor...
          </>
        ) : (
          <>
            Mesaj Gönder
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}
