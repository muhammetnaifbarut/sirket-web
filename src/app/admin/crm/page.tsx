'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import toast from 'react-hot-toast'

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
  createdAt: string
  product?: { name: string } | null
}

const STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  NEW: { label: 'Yeni', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  CONTACTED: { label: 'İletişime Geçildi', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  QUALIFIED: { label: 'Nitelikli', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
  PROPOSAL: { label: 'Teklif', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  NEGOTIATION: { label: 'Müzakere', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
  WON: { label: 'Kazanıldı', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  LOST: { label: 'Kaybedildi', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
}

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'pipeline' | 'table'>('pipeline')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ limit: '200' })
    if (search) params.set('search', search)
    if (typeFilter) params.set('type', typeFilter)
    const res = await fetch(`/api/leads?${params}`)
    const data = await res.json()
    setLeads(Array.isArray(data) ? data : data.leads || [])
    setLoading(false)
  }, [search, typeFilter])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    toast.success('Durum güncellendi')
  }

  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 50) return 'text-amber-600'
    return 'text-gray-400'
  }

  const grouped = STATUSES.reduce<Record<string, Lead[]>>((acc, s) => {
    acc[s] = leads.filter((l) => l.status === s)
    return acc
  }, {})

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM Pipeline</h1>
          <p className="text-gray-500 text-sm mt-0.5">{leads.length} toplam lead</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('pipeline')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${view === 'pipeline' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            Pipeline
          </button>
          <button
            onClick={() => setView('table')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${view === 'table' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            Tablo
          </button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="İsim, email, şirket ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tüm Türler</option>
          <option value="DEMO">Demo</option>
          <option value="CONTACT">İletişim</option>
          <option value="QUOTE">Teklif</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      ) : view === 'pipeline' ? (
        /* ── PİPELINE GÖRÜNÜMÜ ── */
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4" style={{ minWidth: STATUSES.length * 280 }}>
            {STATUSES.map((status) => {
              const cfg = STATUS_CONFIG[status]
              const items = grouped[status]
              return (
                <div key={status} className="w-64 flex-shrink-0">
                  <div className={`flex items-center justify-between px-3 py-2 rounded-xl border mb-3 ${cfg.bg}`}>
                    <span className={`text-sm font-semibold ${cfg.color}`}>{cfg.label}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white ${cfg.color}`}>
                      {items.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {items.map((lead) => (
                      <Link
                        key={lead.id}
                        href={`/admin/crm/${lead.id}`}
                        className="block bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md hover:border-blue-200 transition-all"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 text-sm truncate">{lead.name}</p>
                            {lead.company && (
                              <p className="text-xs text-gray-400 truncate">{lead.company}</p>
                            )}
                          </div>
                          <span className={`text-sm font-bold flex-shrink-0 ${scoreColor(lead.score)}`}>
                            {lead.score > 0 && `${lead.score}p`}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mb-2">{lead.email}</p>
                        {lead.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {lead.tags.slice(0, 2).map((t) => (
                              <span key={t} className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-md">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {format(new Date(lead.createdAt), 'dd MMM', { locale: tr })}
                          </span>
                          <select
                            value={lead.status}
                            onChange={(e) => { e.preventDefault(); updateStatus(lead.id, e.target.value) }}
                            onClick={(e) => e.preventDefault()}
                            className="text-xs border border-gray-200 rounded-lg px-1.5 py-0.5 focus:outline-none"
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                            ))}
                          </select>
                        </div>
                      </Link>
                    ))}
                    {items.length === 0 && (
                      <div className="text-center py-6 text-gray-300 text-xs border-2 border-dashed rounded-xl">
                        Boş
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* ── TABLO GÖRÜNÜMÜ ── */
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-4 py-3 font-medium text-gray-500">İsim</th>
                  <th className="px-4 py-3 font-medium text-gray-500">E-posta</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Şirket</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Tür</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Durum</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Skor</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Tarih</th>
                  <th className="px-4 py-3 font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead) => {
                  const cfg = STATUS_CONFIG[lead.status]
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                      <td className="px-4 py-3 text-gray-500">{lead.company || '—'}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">{lead.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${scoreColor(lead.score)}`}>
                          {lead.score || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {format(new Date(lead.createdAt), 'dd MMM yyyy', { locale: tr })}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/crm/${lead.id}`}
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Detay →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
