'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Event {
  id: number
  emoji: string
  city: string
  text: string
}

const SAMPLE_EVENTS: Omit<Event, 'id'>[] = [
  { emoji: '🦷', city: 'İstanbul', text: 'bir diş hekimi muayenehanesi demo aldı' },
  { emoji: '🍽️', city: 'Antep', text: 'bir restoran zinciri kooza\'ya geçti' },
  { emoji: '💄', city: 'İzmir', text: 'bir güzellik salonu Pro pakete yükseldi' },
  { emoji: '🛍️', city: 'Bursa', text: 'bir e-ticaret firması Trendyol entegrasyonunu kurdu' },
  { emoji: '🐾', city: 'Ankara', text: 'bir veteriner kliniği aşı takviminin keyfini çıkarıyor' },
  { emoji: '🏥', city: 'Konya', text: 'bir poliklinik MHRS entegrasyonunu aktive etti' },
  { emoji: '🛒', city: 'Adana', text: 'bir mahalle marketi barkod sistemiyle hızlandı' },
  { emoji: '🎓', city: 'Eskişehir', text: 'bir kurs merkezi öğrenci kayıt sistemi kurdu' },
  { emoji: '🍕', city: 'Trabzon', text: 'bir pizzacı Yemeksepeti entegrasyonunu tamamladı' },
  { emoji: '👥', city: 'Mersin', text: 'bir İK ekibi 80 kişilik bordro hesabını otomatize etti' },
  { emoji: '☕', city: 'Kayseri', text: 'bir kafe sadakat programını başlattı' },
  { emoji: '🦋', city: 'Diyarbakır', text: 'bir şirket dijital dönüşüm yolculuğuna başladı' },
  { emoji: '📊', city: 'Samsun', text: 'bir muhasebeci 12 müşterisini tek panelde topladı' },
  { emoji: '🍹', city: 'Antalya', text: 'bir bar/kafe ödeme sistemine geçti' },
]

let counter = 1

export default function LiveActivityFeed() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    function emit() {
      const sample = SAMPLE_EVENTS[Math.floor(Math.random() * SAMPLE_EVENTS.length)]
      setEvents((prev) => {
        const next = [{ ...sample, id: counter++ }, ...prev]
        return next.slice(0, 3)
      })
    }

    emit()
    const id = setInterval(emit, 7000 + Math.random() * 6000)
    return () => clearInterval(id)
  }, [])

  if (events.length === 0) return null

  return (
    <div className="fixed bottom-24 left-4 z-30 w-72 max-w-[calc(100vw-2rem)] hidden md:block pointer-events-none">
      <AnimatePresence>
        {events.map((e, idx) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: -40, y: 20, scale: 0.9 }}
            animate={{ opacity: 1 - idx * 0.25, x: 0, y: 0, scale: 1 - idx * 0.05 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="mb-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 flex items-center gap-3 pointer-events-auto"
            style={{ marginLeft: `${idx * 8}px` }}
          >
            <div className="text-2xl shrink-0">{e.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-700 leading-tight">
                <span className="font-bold text-purple-700">{e.city}</span>'da {e.text}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">Şu an</div>
            </div>
            <div className="relative shrink-0">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
