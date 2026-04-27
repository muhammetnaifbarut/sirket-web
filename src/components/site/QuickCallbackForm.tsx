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
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
        className="relative bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl p-8 text-center overflow-hidden"
      >
        {/* Konfeti partikülleri */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0, x: '50%' }}
              animate={{
                y: [0, 200],
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                rotate: [0, 360],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1.5 + Math.random() * 1.5,
                delay: Math.random() * 0.4,
                ease: 'easeOut',
              }}
              className="absolute top-0 w-2.5 h-2.5"
              style={{
                background: ['#a855f7', '#ec4899', '#22c55e', '#f59e0b', '#3b82f6'][i % 5],
                borderRadius: i % 2 ? '50%' : '2px',
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.6, delay: 0.2 }}
          className="relative w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-300"
        >
          <Check className="w-8 h-8 text-white" strokeWidth={3.5} />
        </motion.div>

        <div className="relative">
          <div className="text-2xl font-bold text-emerald-900 mb-2">
            Hoş geldin kelebek 🦋
          </div>
          <div className="text-base text-emerald-800 mb-1 font-semibold">
            Talebin alındı, ekip 15 dakika içinde arıyor.
          </div>
          <div className="text-sm text-emerald-700 mb-5">
            Mesai dışındaysa ilk mesai başlangıcında.
          </div>

          <div className="bg-white rounded-xl p-4 border border-emerald-100">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Bu arada ne yapabilirsin?
            </div>
            <div className="space-y-2 text-sm">
              <a
                href="https://wa.me/905414142942?text=Merhaba%20kooza%2C%20az%20önce%20callback%20formu%20doldurdum"
                className="flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-900 transition-colors"
              >
                💬 WhatsApp'tan acil yaz →
              </a>
              <a
                href="/dijital-olgunluk-testi"
                className="flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 transition-colors"
              >
                🎯 2 dakikada dijital olgunluk testi yap →
              </a>
              <a
                href="/dijital-rehber"
                className="flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors"
              >
                📘 Sektörel rehberini indir →
              </a>
            </div>
          </div>
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
        <label className="block">
          <span className="sr-only">Adınız</span>
          <input
            type="text"
            name="name"
            placeholder="Adınız (örn: Mehmet Yılmaz)"
            aria-label="Adınız ve soyadınız"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-sm"
          />
        </label>
        <label className="block">
          <span className="sr-only">Telefon numaranız</span>
          <input
            type="tel"
            name="phone"
            placeholder="Telefon (0532 ile başlayan)"
            aria-label="Telefon numaranız - sizi bu numaradan arayacağız"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            minLength={7}
            maxLength={40}
            autoComplete="tel"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-sm"
          />
        </label>
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
