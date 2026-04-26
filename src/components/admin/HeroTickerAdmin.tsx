'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Item {
  id?: string
  emoji: string
  text: string
  order: number
  isActive: boolean
}

export default function HeroTickerAdmin({ initial }: { initial: Item[] }) {
  const router = useRouter()
  const [items, setItems] = useState<Item[]>(initial)
  const [loading, setLoading] = useState(false)

  const update = (i: number, patch: Partial<Item>) => {
    setItems(items.map((x, idx) => (idx === i ? { ...x, ...patch } : x)))
  }
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i))
  const add = () =>
    setItems([
      ...items,
      { emoji: '✨', text: '', order: items.length + 1, isActive: true },
    ])

  const save = async () => {
    setLoading(true)
    try {
      const payload = items
        .filter((x) => x.text.trim())
        .map(({ id, ...rest }, idx) => ({ ...rest, order: idx + 1 }))
      const res = await fetch('/api/hero-ticker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payload }),
      })
      if (!res.ok) throw new Error()
      toast.success('Kaydedildi')
      router.refresh()
    } catch {
      toast.error('Hata')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={it.emoji}
              onChange={(e) => update(i, { emoji: e.target.value })}
              maxLength={4}
              className="w-14 px-2 py-2.5 text-center text-xl border border-gray-200 rounded-lg"
            />
            <input
              value={it.text}
              onChange={(e) => update(i, { text: e.target.value })}
              placeholder="Bu hafta 87 yeni işletme katıldı"
              className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
            />
            <label className="flex items-center gap-1 px-3 py-2.5 border border-gray-200 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={it.isActive}
                onChange={(e) => update(i, { isActive: e.target.checked })}
                className="rounded text-purple-600"
              />
              <span className="text-xs font-semibold">Aktif</span>
            </label>
            <button
              onClick={() => remove(i)}
              className="px-3 py-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100"
            >
              Sil
            </button>
          </div>
        ))}

        <button
          onClick={add}
          className="w-full px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 text-sm font-semibold hover:border-purple-300 hover:text-purple-700 transition-colors"
        >
          + Yeni mesaj ekle
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm disabled:opacity-60 shadow-md shadow-purple-200"
        >
          {loading ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
        </button>
      </div>
    </div>
  )
}
