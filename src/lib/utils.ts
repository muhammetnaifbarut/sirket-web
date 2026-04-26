import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency = 'TRY') {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string, locale = 'tr-TR') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncate(str: string, length = 100) {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '...'
}

export function generateColorShades(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const shades: Record<number, string> = {}
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

  levels.forEach((level) => {
    const factor = level <= 500 ? (500 - level) / 500 : (level - 500) / 500
    const isLighter = level <= 500

    const nr = isLighter ? Math.round(r + (255 - r) * factor) : Math.round(r * (1 - factor))
    const ng = isLighter ? Math.round(g + (255 - g) * factor) : Math.round(g * (1 - factor))
    const nb = isLighter ? Math.round(b + (255 - b) * factor) : Math.round(b * (1 - factor))

    shades[level] = `rgb(${nr},${ng},${nb})`
  })

  return shades
}
