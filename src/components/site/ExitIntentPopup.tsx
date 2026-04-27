'use client'

import { useEffect, useState } from 'react'
import { X, Gift, ArrowRight } from 'lucide-react'

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false)
  const [done, setDone] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('exitIntentShown') === '1') return
    if (localStorage.getItem('exitIntentDismissed') === '1') return

    let triggered = false
    const onMouseLeave = (e: MouseEvent) => {
      if (triggered) return
      if (e.clientY <= 0 && e.relatedTarget === null) {
        triggered = true
        setShow(true)
        sessionStorage.setItem('exitIntentShown', '1')
      }
    }

    // Mobile: 30 saniye sonra göster (mouse leave yok)
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    let timer: any
    if (isTouch) {
      timer = setTimeout(() => {
        if (!triggered) {
          triggered = true
          setShow(true)
          sessionStorage.setItem('exitIntentShown', '1')
        }
      }, 45_000)
    } else {
      document.addEventListener('mouseleave', onMouseLeave)
    }

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave)
      if (timer) clearTimeout(timer)
    }
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Exit Intent Lead',
          email: email.trim(),
          message: 'Exit intent popup - sektörel rehber talep',
          subject: 'Sektörel Rehber',
          type: 'NEWSLETTER',
        }),
      })
      setDone(true)
    } catch {
      setDone(true)
    } finally {
      setLoading(false)
    }
  }

  function close() {
    setShow(false)
    if (typeof window !== 'undefined') localStorage.setItem('exitIntentDismissed', '1')
  }

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        <button
          onClick={close}
          aria-label="Kapat"
          className="absolute right-4 top-4 w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!done ? (
          <>
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2 tracking-tight">
              Bekle! 🦋 Sana hediye var.
            </h2>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Sektörünüze özel <strong>30+ sayfalık dijital dönüşüm rehberi</strong> hediyemiz olsun.
              E-mail bırak, anında PDF gelsin.
            </p>

            <form onSubmit={submit} className="space-y-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base hover:-translate-y-0.5 transition-all shadow-lg disabled:opacity-60"
              >
                {loading ? 'Gönderiliyor...' : 'Rehberimi Yolla'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
              <p className="text-xs text-gray-400 text-center">
                ✓ Spam yok &nbsp;·&nbsp; ✓ Tek tıkla abonelik iptali &nbsp;·&nbsp; ✓ KVKK uyumlu
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-5xl mb-3">📨</div>
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Rehber yolda!</h2>
            <p className="text-gray-600">
              Birkaç dakika içinde e-posta kutuna düşecek. Spam'a da bir bak — bazen oraya gidiyor.
            </p>
            <button
              onClick={close}
              className="mt-6 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all"
            >
              Süper, kapat
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
