'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Item {
  id?: string
  value: string
  label: string
  color: string
  order: number
  isActive: boolean
}

export default function HeroStatsAdmin({ initial }: { initial: Item[] }) {
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
      { value: '0', label: 'Yeni metrik', color: '#714B67', order: items.length + 1, isActive: true },
    ])

  const save = async () => {
    setLoading(true)
    try {
      const payload = items
        .filter((x) => x.value && x.label)
        .map(({ id, ...rest }, idx) => ({ ...rest, order: idx + 1 }))
      const res = await fetch('/api/hero-stats', {
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
          <div key={i} className="grid grid-cols-12 gap-2 items-center">
            <input
              value={it.value}
              onChange={(e) => update(i, { value: e.target.value })}
              placeholder="500+"
              className="col-span-3 px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
            <input
              value={it.label}
              onChange={(e) => update(i, { label: e.target.value })}
              placeholder="Aktif İşletme"
              className="col-span-5 px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
            <div className="col-span-2 flex gap-1.5 items-center">
              <input
                type="color"
                value={it.color}
                onChange={(e) => update(i, { color: e.target.value })}
                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input
                value={it.color}
                onChange={(e) => update(i, { color: e.target.value })}
                className="flex-1 px-2 py-1.5 border border-gray-200 rounded text-[11px] font-mono"
              />
            </div>
            <label className="col-span-1 flex items-center justify-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={it.isActive}
                onChange={(e) => update(i, { isActive: e.target.checked })}
                className="rounded text-purple-600"
              />
            </label>
            <button
              onClick={() => remove(i)}
              className="col-span-1 px-2 py-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100"
            >
              Sil
            </button>
          </div>
        ))}

        <button
          onClick={add}
          className="w-full px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 text-sm font-semibold hover:border-purple-300 hover:text-purple-700"
        >
          + Yeni metrik ekle
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
