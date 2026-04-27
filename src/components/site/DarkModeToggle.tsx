'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('darkMode')
    const prefers = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    const initial = stored !== null ? stored === '1' : false // varsayılan light
    setDark(initial)
    document.documentElement.classList.toggle('dark', initial)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    if (typeof window !== 'undefined') localStorage.setItem('darkMode', next ? '1' : '0')
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
      title={dark ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
      className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
