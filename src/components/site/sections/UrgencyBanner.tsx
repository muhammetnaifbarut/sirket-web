'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Sparkles } from 'lucide-react'

export default function UrgencyBanner() {
  const [hidden, setHidden] = useState(false)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem('urgencyBannerDismissed') === '1') {
      setHidden(true)
      return
    }
    // Geri sayım: bu ayın sonu
    const tick = () => {
      const now = new Date()
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0)
      const diff = end.getTime() - now.getTime()
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      setDays(d)
      setHours(h)
      setMinutes(m)
    }
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  if (hidden) return null

  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center text-sm">
        <span className="flex items-center gap-1.5 font-semibold">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Nisan ayına özel: ilk 3 ay <strong className="font-bold">%30 indirim</strong></span>
        </span>
        <span className="hidden sm:inline opacity-50">·</span>
        <span className="text-xs sm:text-sm">
          Kalan süre:{' '}
          <span className="font-bold tabular-nums bg-white/15 backdrop-blur px-2 py-0.5 rounded">
            {days}g {hours}sa {minutes}dk
          </span>
        </span>
        <Link
          href="/demo?utm=urgency"
          className="bg-white text-orange-700 font-bold text-xs px-3 py-1 rounded hover:bg-orange-50 transition-colors"
        >
          Hemen başla →
        </Link>
      </div>
      <button
        type="button"
        aria-label="Bildirimi kapat"
        onClick={() => {
          setHidden(true)
          if (typeof window !== 'undefined') localStorage.setItem('urgencyBannerDismissed', '1')
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/15 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
