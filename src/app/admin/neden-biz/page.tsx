'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface WhyUsItem {
  id?: string
  title: string
  description: string
  icon: string
  color: string
  order: number
  isActive: boolean
}

const ICONS = ['🏆', '🛡️', '🔐', '⚙️', '⚡', '⭐', '💡', '🚀', '📊', '🤝', '🌍', '✅']
const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899']

const defaultItems: WhyUsItem[] = [
  { title: '10+ Yıl Tecrübe', description: 'On yılı aşkın deneyimimizle yüzlerce projeyi başarıyla tamamladık.', icon: '🏆', color: '#F59E0B', order: 0, isActive: true },
  { title: '7/24 Teknik Destek', description: 'Uzman ekibimiz her an yanınızda, sorunlarınızı anında çözüyoruz.', icon: '🛡️', color: '#3B82F6', order: 1, isActive: true },
  { title: 'Yerli & Güvenli', description: 'Verileriniz Türkiye\'de, KVKK uyumlu altyapımızda güvende.', icon: '🔐', color: '#10B981', order: 2, isActive: true },
  { title: 'Özelleştirilebilir', description: 'Her işletmenin ihtiyacı farklıdır. Çözümlerimizi size özel tasarlıyoruz.', icon: '⚙️', color: '#8B5CF6', order: 3, isActive: true },
  { title: 'Hızlı Kurulum', description: 'Minimum kesinti ile maksimum hız. Sistemleriniz 48 saatte devrede.', icon: '⚡', color: '#06B6D4', order: 4, isActive: true },
  { title: '%98 Memnuniyet', description: 'Müşterilerimizin %98\'i bizi meslektaşlarına öneriyor.', icon: '⭐', color: '#EF4444', order: 5, isActive: true },
]

export default function WhyUsAdminPage() {
  const [items, setItems] = useState<WhyUsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [newItem, setNewItem] = useState<Partial<WhyUsItem>>({ title: '', description: '', icon: '⭐', color: '#3B82F6' })

  useEffect(() => {
    fetch('/api/why-us')
      .then((r) => r.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  const seedDefaults = async () => {
    for (const item of defaultItems) {
      const res = await fetch('/api/why-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
      const created = await res.json()
      setItems((s) => [...s, created])
    }
    toast.success('Varsayılan öğeler eklendi!')
  }

  const addItem = async () => {
    if (!newItem.title || !newItem.description) return
    const res = await fetch('/api/why-us', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newItem, order: items.length, isActive: true }),
    })
    const created = await res.json()
    setItems((s) => [...s, created])
    setNewItem({ title: '', description: '', icon: '⭐', color: '#3B82F6' })
    toast.success('Öğe eklendi!')
  }

  const deleteItem = async (id: string) => {
    await fetch(`/api/why-us/${id}`, { method: 'DELETE' })
    setItems((s) => s.filter((x) => x.id !== id))
    toast.success('Silindi!')
  }

  const toggleActive = async (item: WhyUsItem) => {
    if (!item.id) return
    await fetch(`/api/why-us/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !item.isActive }),
    })
    setItems((s) => s.map((x) => x.id === item.id ? { ...x, isActive: !x.isActive } : x))
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" /></div>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Neden Biz?</h1>
          <p className="text-gray-500 text-sm mt-1">Öne çıkan özelliklerinizi yönetin</p>
        </div>
        {items.length === 0 && (
          <button onClick={seedDefaults} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold">
            Varsayılanları Ekle
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className={`bg-white rounded-2xl border p-5 transition-opacity ${item.isActive ? 'border-gray-100' : 'border-gray-100 opacity-50'}`}>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
              >
                {item.icon}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleActive(item)} className={`relative w-10 h-5 rounded-full transition-colors ${item.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
                <button onClick={() => item.id && deleteItem(item.id)} className="text-red-400 hover:text-red-600 p-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
            <p className="text-gray-400 text-xs line-clamp-2">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Add new */}
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Yeni Özellik Ekle</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Başlık</label>
            <input
              value={newItem.title || ''}
              onChange={(e) => setNewItem((x) => ({ ...x, title: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">İkon</label>
            <div className="flex flex-wrap gap-1">
              {ICONS.map((ic) => (
                <button
                  key={ic}
                  onClick={() => setNewItem((x) => ({ ...x, icon: ic }))}
                  className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all ${newItem.icon === ic ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-100'}`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Açıklama</label>
          <textarea
            rows={2}
            value={newItem.description || ''}
            onChange={(e) => setNewItem((x) => ({ ...x, description: e.target.value }))}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Renk</label>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setNewItem((x) => ({ ...x, color: c }))}
                className={`w-8 h-8 rounded-full transition-all ${newItem.color === c ? 'ring-2 ring-offset-1 ring-gray-700 scale-110' : ''}`}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
        <button
          onClick={addItem}
          disabled={!newItem.title || !newItem.description}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50"
        >
          Ekle
        </button>
      </div>
    </div>
  )
}
