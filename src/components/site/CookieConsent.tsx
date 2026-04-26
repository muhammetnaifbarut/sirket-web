'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STORAGE_KEY = 'keepx_cookie_consent_v1'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      if (!v) setShow(true)
    } catch {
      // storage blocked
    }
  }, [])

  const handle = (choice: 'accept' | 'reject') => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, at: Date.now() }))
    } catch {}
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-[55] p-4 sm:p-6 pointer-events-none"
        >
          <div className="max-w-5xl mx-auto pointer-events-auto">
            <div className="rounded-2xl bg-gray-950/95 backdrop-blur-lg border border-white/10 shadow-2xl shadow-black/50 p-5 sm:p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white mb-1">Gizliliğiniz bizim için önemli</p>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    Bu web sitesi deneyiminizi iyileştirmek ve trafiği analiz etmek için çerez kullanır.
                    Detaylar için{' '}
                    <Link href="/gizlilik-politikasi" className="text-blue-400 hover:text-blue-300 underline">
                      Gizlilik Politikamızı
                    </Link>{' '}
                    inceleyebilirsiniz.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto shrink-0">
                  <button
                    onClick={() => handle('reject')}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5 border border-white/10 transition-colors"
                  >
                    Reddet
                  </button>
                  <button
                    onClick={() => handle('accept')}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/20 transition-all"
                  >
                    Kabul Et
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
