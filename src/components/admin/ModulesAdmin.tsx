'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import ProductIcon from '@/components/site/ProductIcon'

interface Module {
  id: string
  name: string
  slug: string
  href: string
  icon: string
  iconColor: string
  bgColor: string
  description: string | null
  order: number
  isActive: boolean
}

const ICON_OPTIONS = [
  'box', 'calendar', 'users', 'chart-bar', 'briefcase', 'trending-up',
  'shopping-cart', 'megaphone', 'file-text', 'kanban', 'life-buoy',
  'shopping-bag', 'globe', 'settings', 'heart', 'truck', 'cpu',
  'book-open', 'zap', 'target', 'dollar-sign', 'package',
]

export default function ModulesAdmin({ initialModules }: { initialModules: Module[] }) {
  const router = useRouter()
  const [modules, setModules] = useState(initialModules)
  const [editing, setEditing] = useState<Module | null>(null)
  const [showForm, setShowForm] = useState(false)

  const newModule = (): Module => ({
    id: '',
    name: '',
    slug: '',
    href: '/yazilimlar',
    icon: 'box',
    iconColor: '#714B67',
    bgColor: '#f7f2f5',
    description: '',
    order: modules.length + 1,
    isActive: true,
  })

  const save = async (m: Module) => {
    try {
      const isNew = !m.id
      const url = isNew ? '/api/modules' : `/api/modules/${m.id}`
      const method = isNew ? 'POST' : 'PUT'
      const { id, ...data } = m
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      const saved = await res.json()
      if (isNew) setModules([...modules, saved])
      else setModules(modules.map((x) => (x.id === saved.id ? saved : x)))
      toast.success(isNew ? 'Modül eklendi' : 'Modül güncellendi')
      setEditing(null)
      setShowForm(false)
      router.refresh()
    } catch {
      toast.error('Hata oluştu')
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Bu modülü silmek istediğine emin misin?')) return
    try {
      const res = await fetch(`/api/modules/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setModules(modules.filter((m) => m.id !== id))
      toast.success('Silindi')
      router.refresh()
    } catch {
      toast.error('Silinemedi')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{modules.length} modül</p>
        <button
          onClick={() => {
            setEditing(newModule())
            setShowForm(true)
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors shadow-sm"
        >
          <span className="text-base leading-none">+</span> Yeni Modül
        </button>
      </div>

      {/* Grid preview — same look as site */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {modules.map((m) => (
          <div
            key={m.id}
            className="group relative bg-white border border-gray-200 rounded-2xl p-4 hover:border-purple-300 transition-all"
          >
            {!m.isActive && (
              <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gray-200 text-gray-700">
                PASIF
              </span>
            )}
            <div
              className="w-full aspect-square rounded-xl flex items-center justify-center mb-2"
              style={{ backgroundColor: m.bgColor }}
            >
              <ProductIcon name={m.icon} className="w-10 h-10" style={{ color: m.iconColor }} />
            </div>
            <p className="text-xs font-bold text-center text-gray-900 truncate">{m.name}</p>
            <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditing(m)
                  setShowForm(true)
                }}
                className="flex-1 py-1 text-[10px] font-semibold rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100"
              >
                Düzenle
              </button>
              <button
                onClick={() => remove(m.id)}
                className="flex-1 py-1 text-[10px] font-semibold rounded-md bg-red-50 text-red-700 hover:bg-red-100"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form modal */}
      {showForm && editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="font-bold text-gray-900 text-lg">
                {editing.id ? 'Modülü Düzenle' : 'Yeni Modül'}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditing(null) }}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >×</button>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); save(editing) }}
              className="p-6 space-y-5"
            >
              {/* Live preview */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Önizleme</p>
                <div
                  className="inline-flex flex-col items-center w-32"
                >
                  <div
                    className="w-full aspect-square rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: editing.bgColor }}
                  >
                    <ProductIcon name={editing.icon} className="w-12 h-12" style={{ color: editing.iconColor }} />
                  </div>
                  <span className="mt-3 text-sm font-semibold text-gray-700">{editing.name || 'Modül adı'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">İsim *</label>
                  <input
                    required
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value, slug: editing.id ? editing.slug : e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
                    placeholder="Randevu"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Slug *</label>
                  <input
                    required
                    value={editing.slug}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Bağlantı (URL)</label>
                <input
                  value={editing.href}
                  onChange={(e) => setEditing({ ...editing, href: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
                  placeholder="/yazilimlar/randevu"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">İkon</label>
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                  {ICON_OPTIONS.map((ico) => (
                    <button
                      key={ico}
                      type="button"
                      onClick={() => setEditing({ ...editing, icon: ico })}
                      className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                        editing.icon === ico ? 'bg-purple-100 ring-2 ring-purple-500' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      title={ico}
                    >
                      <ProductIcon name={ico} className="w-5 h-5 text-gray-700" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">İkon Rengi</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={editing.iconColor}
                      onChange={(e) => setEditing({ ...editing, iconColor: e.target.value })}
                      className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      value={editing.iconColor}
                      onChange={(e) => setEditing({ ...editing, iconColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Arka Plan Rengi</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={editing.bgColor}
                      onChange={(e) => setEditing({ ...editing, bgColor: e.target.value })}
                      className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      value={editing.bgColor}
                      onChange={(e) => setEditing({ ...editing, bgColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Açıklama (opsiyonel)</label>
                <textarea
                  value={editing.description ?? ''}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={2}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 resize-y"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Sıra</label>
                  <input
                    type="number"
                    value={editing.order}
                    onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400"
                  />
                </div>
                <label className="flex items-center gap-2 mt-6 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.isActive}
                    onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600"
                  />
                  <span className="text-sm font-semibold text-gray-700">Aktif</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditing(null) }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 shadow-sm"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
