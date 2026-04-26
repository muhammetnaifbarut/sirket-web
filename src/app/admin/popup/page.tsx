'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Popup {
  id?: string
  title: string
  content: string
  buttonText: string
  buttonUrl: string
  bgColor: string
  delay: number
  frequency: string
  isActive: boolean
}

const emptyPopup: Popup = {
  title: '',
  content: '',
  buttonText: 'Daha Fazla Bilgi',
  buttonUrl: '/demo',
  bgColor: '#ffffff',
  delay: 3,
  frequency: 'once',
  isActive: true,
}

export default function PopupAdminPage() {
  const [popups, setPopups] = useState<Popup[]>([])
  const [editing, setEditing] = useState<Popup | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/popup')
      .then((r) => r.json())
      .then((d) => { setPopups(d); setLoading(false) })
  }, [])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const method = editing.id ? 'PUT' : 'POST'
    const res = await fetch('/api/admin/popup', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    const saved = await res.json()
    if (editing.id) {
      setPopups((prev) => prev.map((p) => (p.id === saved.id ? saved : p)))
    } else {
      setPopups((prev) => [saved, ...prev])
    }
    setEditing(null)
    setSaving(false)
    toast.success('Popup kaydedildi')
  }

  const remove = async (id: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return
    await fetch('/api/admin/popup', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setPopups((prev) => prev.filter((p) => p.id !== id))
    toast.success('Silindi')
  }

  const toggle = async (popup: Popup) => {
    const updated = { ...popup, isActive: !popup.isActive }
    await fetch('/api/admin/popup', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    setPopups((prev) => prev.map((p) => (p.id === popup.id ? updated : p)))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Popup Yönetimi</h1>
          <p className="text-gray-500 text-sm mt-0.5">Site ziyaretçilerine gösterilecek popup pencereler</p>
        </div>
        <button
          onClick={() => setEditing({ ...emptyPopup })}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          + Yeni Popup
        </button>
      </div>

      {/* Form */}
      {editing && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900">{editing.id ? 'Popup Düzenle' : 'Yeni Popup'}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">İçerik</label>
              <textarea rows={3} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buton Metni</label>
              <input value={editing.buttonText} onChange={(e) => setEditing({ ...editing, buttonText: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buton URL</label>
              <input value={editing.buttonUrl} onChange={(e) => setEditing({ ...editing, buttonUrl: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gecikme (saniye)</label>
              <input type="number" value={editing.delay} onChange={(e) => setEditing({ ...editing, delay: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gösterim Sıklığı</label>
              <select value={editing.frequency} onChange={(e) => setEditing({ ...editing, frequency: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="once">Bir kez</option>
                <option value="session">Her oturum</option>
                <option value="always">Her ziyaret</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
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
      ) : popups.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-2">🪟</div>
          <p>Henüz popup yok</p>
        </div>
      ) : (
        <div className="space-y-3">
          {popups.map((popup) => (
            <div key={popup.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-xl ${popup.isActive ? 'bg-green-50' : 'bg-gray-100'}`}>
                  🪟
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{popup.title}</p>
                  <p className="text-xs text-gray-400 truncate">{popup.content}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-gray-400">⏱ {popup.delay}s gecikme</span>
                    <span className="text-xs text-gray-400">• {popup.frequency === 'once' ? 'Bir kez' : popup.frequency === 'session' ? 'Her oturum' : 'Her ziyaret'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggle(popup)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${popup.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {popup.isActive ? 'Aktif' : 'Pasif'}
                </button>
                <button onClick={() => setEditing(popup)}
                  className="px-3 py-1.5 rounded-lg text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                  Düzenle
                </button>
                <button onClick={() => popup.id && remove(popup.id)}
                  className="px-3 py-1.5 rounded-lg text-xs bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
