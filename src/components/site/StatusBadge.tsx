'use client'

import { useEffect, useState } from 'react'

export default function StatusBadge() {
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <a
      href="/guvenlik"
      title="Tüm sistemler operasyonel"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 ${
            pulse ? 'opacity-75 scale-150' : 'opacity-0 scale-100'
          } transition-all duration-700`}
        />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      Tüm sistemler aktif · %99.95 uptime
    </a>
  )
}
