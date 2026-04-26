'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Banner {
  id?: string
  text: string
  link: string
  linkText: string
  bgColor: string
  textColor: string
  isActive: boolean
  dismissible: boolean
  order: number
}

const emptyBanner: Banner = {
  text: '',
  link: '',
  linkText: 'Daha Fazla',
  bgColor: '#3B82F6',
  textColor: '#ffffff',
  isActive: true,
  dismissible: true,
  order: 0,
}

export default function BannerAdminPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [editing, setEditing] = useState<Banner | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/banner')
      .then((r) => r.json())
      .then((d) => { setBanners(d); setLoading(false) })
  }, [])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const method = editing.id ? 'PUT' : 'POST'
    const res = await fetch('/api/admin/banner', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    const saved = await res.json()
    if (editing.id) {
      setBanners((prev) => prev.map((b) => (b.id === saved.id ? saved : b)))
    } else {
      setBanners((prev) => [...prev, saved])
    }
    setEditing(null)
    setSaving(false)
    toast.success('Banner kaydedildi')
  }

  const remove = async (id: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return
    await fetch('/api/admin/banner', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setBanners((prev) => prev.filter((b) => b.id !== id))
    toast.success('Silindi')
  }

  const toggle = async (banner: Banner) => {
    const updated = { ...banner, isActive: !banner.isActive }
    await fetch('/api/admin/banner', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    setBanners((prev) => prev.map((b) => (b.id === banner.id ? updated : b)))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banner Yönetimi</h1>
          <p className="text-gray-500 text-sm mt-0.5">Sitenin üstünde gösterilecek duyuru bantları</p>
        </div>
        <button onClick={() => setEditing({ ...emptyBanner })}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors">
          + Yeni Banner
        </button>
      </div>

      {/* Önizleme ve Form */}
      {editing && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900">{editing.id ? 'Banner Düzenle' : 'Yeni Banner'}</h2>

          {/* Önizleme */}
          {editing.text && (
            <div className="rounded-xl py-3 px-4 text-sm font-medium flex items-center justify-between"
              style={{ background: editing.bgColor, color: editing.textColor }}>
              <span>{editing.text}</span>
              {editing.link && <span className="underline cursor-pointer">{editing.linkText}</span>}
              {editing.dismissible && <span className="cursor-pointer ml-2">✕</span>}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner Metni</label>
              <input value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                placeholder="Özel indirim! Bu hafta %20 indirim fırsatını kaçırmayın."
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
              <input value={editing.link} onChange={(e) => setEditing({ ...editing, link: e.target.value })}
                placeholder="/demo"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link Metni</label>
              <input value={editing.linkText} onChange={(e) => setEditing({ ...editing, linkText: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arka Plan Rengi</label>
              <div className="flex gap-2">
                <input type="color" value={editing.bgColor} onChange={(e) => setEditing({ ...editing, bgColor: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                <input value={editing.bgColor} onChange={(e) => setEditing({ ...editing, bgColor: e.target.value })}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yazı Rengi</label>
              <div className="flex gap-2">
                <input type="color" value={editing.textColor} onChange={(e) => setEditing({ ...editing, textColor: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                <input value={editing.textColor} onChange={(e) => setEditing({ ...editing, textColor: e.target.value })}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setEditing({ ...editing, dismissible: !editing.dismissible })}
                className={`relative w-12 h-6 rounded-full transition-colors ${editing.dismissible ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${editing.dismissible ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
              <span className="text-sm text-gray-700">Kapatılabilir</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={save} disabled={saving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50">
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button onClick={() => setEditing(null)}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition-colors">
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Liste */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-2">📢</div>
          <p>Henüz banner yok</p>
        </div>
      ) : (
        <div className="space-y-3">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 text-sm flex items-center justify-between"
                style={{ background: banner.bgColor, color: banner.textColor }}>
                <span>{banner.text}</span>
                {banner.link && <span className="text-xs underline">{banner.linkText}</span>}
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2 text-xs text-gray-400">
                  <span>{banner.dismissible ? 'Kapatılabilir' : 'Sabit'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggle(banner)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${banner.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {banner.isActive ? 'Aktif' : 'Pasif'}
                  </button>
                  <button onClick={() => setEditing(banner)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                    Düzenle
                  </button>
                  <button onClick={() => banner.id && remove(banner.id)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
