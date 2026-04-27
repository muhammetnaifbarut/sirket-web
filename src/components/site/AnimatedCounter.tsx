'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  value: string
  duration?: number
  className?: string
  style?: React.CSSProperties
}

// "500+" → 500 + suffix "+"
// "%98.7" → 98.7 + prefix "%"
// "24/7" → keep as-is (no number)
function parseValue(val: string): { num: number; prefix: string; suffix: string } | null {
  const match = val.match(/^([^\d]*)([\d,.]+)([^\d]*)$/)
  if (!match) return null
  const num = parseFloat(match[2].replace(',', '.'))
  if (isNaN(num)) return null
  return { num, prefix: match[1], suffix: match[3] }
}

export default function AnimatedCounter({ value, duration = 1500, className, style }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const parsed = parseValue(value)
  const hasNumber = !!parsed

  useEffect(() => {
    if (!hasNumber || !parsed) {
      setDisplay(value)
      return
    }
    if (!ref.current) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const startTime = performance.now()
            const decimals = (parsed.num.toString().split('.')[1] || '').length
            const tick = (now: number) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = parsed.num * eased
              const formatted = current.toFixed(decimals)
              setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`)
              if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            obs.disconnect()
          }
        }
      },
      { threshold: 0.3 }
    )

    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value, duration, hasNumber, parsed?.num])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}
