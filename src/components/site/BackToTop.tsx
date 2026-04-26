'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setVisible(scrolled > 600)
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Circular progress ring around button
  const r = 22
  const c = 2 * Math.PI * r
  const offset = c - (progress / 100) * c

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Yukarı çık"
          className="fixed bottom-28 right-6 z-40 w-12 h-12 rounded-full bg-white text-purple-700 shadow-elevated border border-gray-200 hover:bg-purple-50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center group"
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 -rotate-90 pointer-events-none"
            viewBox="0 0 48 48"
            aria-hidden
          >
            <circle
              cx="24"
              cy="24"
              r={r}
              fill="none"
              stroke="rgba(113,75,103,0.12)"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r={r}
              fill="none"
              stroke="#714B67"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={offset}
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>
          <ArrowUp className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
