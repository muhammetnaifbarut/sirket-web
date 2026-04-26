'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface LeadNote {
  id: string
  content: string
  authorId: string | null
  createdAt: string
}

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  type: string
  status: string
  score: number
  tags: string[]
  source: string | null
  message: string | null
  assignedTo: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
  product?: { name: string } | null
  leadNotes: LeadNote[]
}

const STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']
const STATUS_LABELS: Record<string, string> = {
  NEW: 'Yeni', CONTACTED: 'İletişime Geçildi', QUALIFIED: 'Nitelikli',
  PROPOSAL: 'Teklif', NEGOTIATION: 'Müzakere', WON: 'Kazanıldı', LOST: 'Kaybedildi',
}

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [addingNote, setAddingNote] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch(`/api/leads/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setLead(d)
        setScore(d.score || 0)
        setStatus(d.status)
        setLoading(false)
      })
  }, [id])

  const save = async (patch: Partial<Lead>) => {
    setSaving(true)
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    const updated = await res.json()
    setLead((prev) => prev ? { ...prev, ...updated } : prev)
    setSaving(false)
    toast.success('Kaydedildi')
  }

  const addNote = async () => {
    if (!newNote.trim()) return
    setAddingNote(true)
    const res = await fetch(`/api/leads/${id}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newNote }),
    })
    const note = await res.json()
    setLead((prev) => prev ? { ...prev, leadNotes: [note, ...prev.leadNotes] } : prev)
    setNewNote('')
    setAddingNote(false)
    toast.success('Not eklendi')
  }

  const addTag = () => {
    if (!newTag.trim() || !lead) return
    const tags = [...lead.tags, newTag.trim()]
    save({ tags })
    setLead((prev) => prev ? { ...prev, tags } : prev)
    setNewTag('')
  }

  const removeTag = (tag: string) => {
    if (!lead) return
    const tags = lead.tags.filter((t) => t !== tag)
    save({ tags })
    setLead((prev) => prev ? { ...prev, tags } : prev)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
    </div>
  )
  if (!lead) return <p className="text-red-500">Lead bulunamadı</p>

  const scoreColor = score >= 80 ? '#10B981' : score >= 50 ? '#F59E0B' : '#9CA3AF'

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/admin/crm" className="text-sm text-blue-600 hover:underline mb-1 block">
            ← CRM Pipeline
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
          {lead.company && <p className="text-gray-500 text-sm">{lead.company}</p>}
        </div>
        <button
          onClick={() => save({ status, score })}
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50"
        >
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sol: Müşteri Bilgileri */}
        <div className="lg:col-span-2 space-y-5">
          {/* İletişim Bilgileri */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-4">İletişim Bilgileri</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'E-posta', value: lead.email, icon: '📧' },
                { label: 'Telefon', value: lead.phone || '—', icon: '📞' },
                { label: 'Şirket', value: lead.company || '—', icon: '🏢' },
                { label: 'Kaynak', value: lead.source || '—', icon: '🔗' },
                { label: 'Ürün', value: lead.product?.name || '—', icon: '📦' },
                { label: 'Tür', value: lead.type, icon: '🏷️' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-gray-400 text-xs mb-0.5">{item.icon} {item.label}</p>
                  <p className="font-medium text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
            {lead.message && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-400 text-xs mb-1">💬 Mesaj</p>
                <p className="text-gray-700 text-sm">{lead.message}</p>
              </div>
            )}
          </div>

          {/* Durum ve Skor */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Pipeline Durumu</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Durum</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Lead Skoru: <span style={{ color: scoreColor }} className="font-bold">{score}</span>/100
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Soğuk</span>
                  <span>Orta</span>
                  <span>Sıcak</span>
                </div>
              </div>
            </div>

            {/* Etiketler */}
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Etiketler</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {lead.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 text-blue-400 hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Etiket ekle..."
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Notlar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Notlar</h2>

            {/* Not Ekle */}
            <div className="flex gap-2 mb-4">
              <textarea
                rows={2}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Not ekleyin..."
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button
                onClick={addNote}
                disabled={addingNote || !newNote.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors disabled:opacity-40"
              >
                {addingNote ? '...' : 'Ekle'}
              </button>
            </div>

            {/* Not Listesi */}
            <div className="space-y-3">
              {lead.leadNotes.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">Henüz not yok</p>
              )}
              {lead.leadNotes.map((note) => (
                <div key={note.id} className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-700">{note.content}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                    <span>{note.authorId || 'Admin'}</span>
                    <span>•</span>
                    <span>{format(new Date(note.createdAt), 'dd MMM yyyy, HH:mm', { locale: tr })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ: Özet Panel */}
        <div className="space-y-5">
          {/* Skor Göstergesi */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
            <p className="text-xs text-gray-400 mb-2 font-medium uppercase">Lead Skoru</p>
            <div className="relative w-28 h-28 mx-auto mb-3">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={scoreColor}
                  strokeWidth="12"
                  strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-extrabold" style={{ color: scoreColor }}>{score}</span>
              </div>
            </div>
            <p className="text-sm font-medium" style={{ color: scoreColor }}>
              {score >= 80 ? '🔥 Sıcak Lead' : score >= 50 ? '⚡ Orta' : '❄️ Soğuk Lead'}
            </p>
          </div>

          {/* Zaman Bilgisi */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3">Zaman</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Oluşturuldu</p>
                <p className="font-medium text-gray-700">
                  {format(new Date(lead.createdAt), 'dd MMMM yyyy, HH:mm', { locale: tr })}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Güncellendi</p>
                <p className="font-medium text-gray-700">
                  {format(new Date(lead.updatedAt), 'dd MMMM yyyy, HH:mm', { locale: tr })}
                </p>
              </div>
            </div>
          </div>

          {/* Hızlı Durum Değiştir */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3">Hızlı İşlemler</h3>
            <div className="space-y-2">
              {['CONTACTED', 'QUALIFIED', 'WON', 'LOST'].map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatus(s); save({ status: s, score }) }}
                  className={`w-full py-2 px-3 rounded-xl text-sm font-medium transition-colors border ${
                    status === s
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
