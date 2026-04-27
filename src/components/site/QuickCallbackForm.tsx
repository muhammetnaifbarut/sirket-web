'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Check, Loader2 } from 'lucide-react'

export default function QuickCallbackForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim() || name.trim().length < 2) {
      setError('Lütfen adınızı girin')
      return
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setError('Geçerli bir telefon numarası girin')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: '',
          message: 'Mini callback formu — sizi arayalım',
          subject: 'Beni arayın',
          type: 'CONTACT',
          website,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Gönderim başarısız')
      }
      setDone(true)
      setName('')
      setPhone('')
    } catch (e: any) {
      setError(e.message || 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center"
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500 flex items-center justify-center">
          <Check className="w-6 h-6 text-white" strokeWidth={3} />
        </div>
        <div className="font-bold text-emerald-900 mb-1">Talebiniz alındı! 🎉</div>
        <div className="text-sm text-emerald-700">
          Mesai içinde sizi arayacağız. Bu arada{' '}
          <a href="https://wa.me/905414142942" className="underline font-semibold">
            WhatsApp'tan da yazabilirsiniz
          </a>
          .
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-purple-200 p-6 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <div className="font-bold text-gray-900">Sizi arayalım</div>
          <div className="text-xs text-gray-500">15 dakika içinde geri dönüş — uzun form yok</div>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Adınız"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
          maxLength={120}
          autoComplete="name"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-sm"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefon (örn: 0532 123 45 67)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          minLength={7}
          maxLength={40}
          autoComplete="tel"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-sm"
        />
        {/* Honeypot — bot tarafından doldurulur, gizli */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="absolute opacity-0 -left-[9999px] w-0 h-0"
          aria-hidden
        />

        {error && (
          <div className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-button"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Gönderiliyor...
            </>
          ) : (
            <>
              Beni Arayın
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="text-xs text-gray-500 text-center pt-1">
          ✓ Spam yok &nbsp;·&nbsp; ✓ KVKK uyumlu &nbsp;·&nbsp; ✓ 15 dk içinde dönüş
        </div>
      </form>
    </motion.div>
  )
}
