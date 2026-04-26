'use client'

import { useEffect, useState } from 'react'

/**
 * Top-of-page reading progress bar.
 * Shows how far the user has scrolled in the current article.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calc = () => {
      const scrolled = window.scrollY
      const total =
        document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) {
        setProgress(0)
        return
      }
      setProgress(Math.min(100, (scrolled / total) * 100))
    }

    calc()
    window.addEventListener('scroll', calc, { passive: true })
    window.addEventListener('resize', calc)
    return () => {
      window.removeEventListener('scroll', calc)
      window.removeEventListener('resize', calc)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full bg-purple-600 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
