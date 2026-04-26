'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Faq {
  id?: string
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
}

const emptyFaq: Faq = { question: '', answer: '', category: '', order: 0, isActive: true }

const CATEGORIES = ['Genel', 'Fiyatlandırma', 'Teknik', 'Demo', 'Entegrasyon', 'Destek']

export default function FaqAdminPage() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [editing, setEditing] = useState<Faq | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [filterCat, setFilterCat] = useState('')

  useEffect(() => {
    fetch('/api/admin/faq').then((r) => r.json()).then((d) => { setFaqs(d); setLoading(false) })
  }, [])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const method = editing.id ? 'PUT' : 'POST'
    const res = await fetch('/api/admin/faq', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    const saved = await res.json()
    if (editing.id) {
      setFaqs((prev) => prev.map((f) => (f.id === saved.id ? saved : f)))
    } else {
      setFaqs((prev) => [...prev, saved])
    }
    setEditing(null)
    setSaving(false)
    toast.success('SSS kaydedildi')
  }

  const remove = async (id: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return
    await fetch('/api/admin/faq', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setFaqs((prev) => prev.filter((f) => f.id !== id))
    toast.success('Silindi')
  }

  const toggle = async (faq: Faq) => {
    const updated = { ...faq, isActive: !faq.isActive }
    await fetch('/api/admin/faq', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    setFaqs((prev) => prev.map((f) => (f.id === faq.id ? updated : f)))
  }

  const filtered = filterCat ? faqs.filter((f) => f.category === filterCat) : faqs

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SSS Yönetimi</h1>
          <p className="text-gray-500 text-sm mt-0.5">Site genelinde sık sorulan sorular</p>
        </div>
        <button onClick={() => setEditing({ ...emptyFaq })}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors">
          + Yeni SSS
        </button>
      </div>

      {/* Filtre */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setFilterCat('')}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${!filterCat ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
          Tümü ({faqs.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = faqs.filter((f) => f.category === cat).length
          if (count === 0) return null
          return (
            <button key={cat} onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filterCat === cat ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {/* Form */}
      {editing && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900">{editing.id ? 'SSS Düzenle' : 'Yeni SSS'}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Soru</label>
              <input value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cevap</label>
              <textarea rows={4} value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Kategori seçin</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sıra</label>
              <input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm disabled:opacity-50">
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button onClick={() => setEditing(null)}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm">
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
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400"><div className="text-4xl mb-2">❓</div><p>Henüz SSS yok</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((faq) => (
            <div key={faq.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {faq.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">{faq.category}</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${faq.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {faq.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900">{faq.question}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{faq.answer}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggle(faq)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    {faq.isActive ? '🔴' : '🟢'}
                  </button>
                  <button onClick={() => setEditing(faq)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                    Düzenle
                  </button>
                  <button onClick={() => faq.id && remove(faq.id)}
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
