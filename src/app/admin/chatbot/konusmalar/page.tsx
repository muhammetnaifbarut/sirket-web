'use client'

import { useEffect, useState, useCallback } from 'react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import toast from 'react-hot-toast'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

interface ChatSession {
  id: string
  customerName: string | null
  email: string | null
  phone: string | null
  status: string
  createdAt: string
  updatedAt: string
  messages: ChatMessage[]
  _count: { messages: number }
}

export default function ChatbotKonusmalarPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ChatSession | null>(null)
  const [selectedDetail, setSelectedDetail] = useState<ChatSession | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)

  const fetchSessions = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: '20' })
    if (search) params.set('search', search)
    if (statusFilter) params.set('status', statusFilter)
    const res = await fetch(`/api/chat/sessions?${params}`)
    const data = await res.json()
    setSessions(data.sessions || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [page, search, statusFilter])

  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  const loadDetail = async (session: ChatSession) => {
    setSelected(session)
    setDetailLoading(true)
    const res = await fetch(`/api/chat/sessions/${session.id}`)
    const data = await res.json()
    setSelectedDetail(data)
    setDetailLoading(false)
  }

  const markResolved = async (id: string) => {
    await fetch('/api/chat/sessions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'resolved' }),
    })
    toast.success('Çözüldü olarak işaretlendi')
    fetchSessions()
    if (selected?.id === id) {
      setSelected((s) => s ? { ...s, status: 'resolved' } : null)
    }
  }

  const deleteSession = async (id: string) => {
    if (!confirm('Bu konuşmayı silmek istediğinize emin misiniz?')) return
    await fetch(`/api/chat/sessions/${id}`, { method: 'DELETE' })
    toast.success('Konuşma silindi')
    if (selected?.id === id) {
      setSelected(null)
      setSelectedDetail(null)
    }
    fetchSessions()
  }

  const totalPages = Math.ceil(total / 20)

  return (
    <div className="flex gap-4 h-[calc(100vh-8rem)]">
      {/* Sol: Session Listesi */}
      <div className="w-80 flex-shrink-0 flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Başlık + Filtreler */}
        <div className="p-4 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-900 mb-3">Chatbot Konuşmaları</h1>
          <input
            type="text"
            placeholder="İsim veya e-posta ara..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tümü ({total})</option>
            <option value="active">Aktif</option>
            <option value="resolved">Çözüldü</option>
          </select>
        </div>

        {/* Liste */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">Konuşma bulunamadı</div>
          ) : (
            sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => loadDetail(s)}
                className={`w-full text-left p-4 border-b border-gray-50 hover:bg-blue-50 transition-colors ${
                  selected?.id === s.id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {s.customerName || 'Anonim'}
                      </p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${
                        s.status === 'resolved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {s.status === 'resolved' ? 'Çözüldü' : 'Aktif'}
                      </span>
                    </div>
                    {s.email && (
                      <p className="text-xs text-gray-400 truncate">{s.email}</p>
                    )}
                    {s.messages[0] && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {s.messages[0].content}
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400">
                      {format(new Date(s.createdAt), 'dd MMM', { locale: tr })}
                    </p>
                    <p className="text-xs text-gray-400">{s._count.messages} mesaj</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Sayfalama */}
        {totalPages > 1 && (
          <div className="p-3 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
            >
              ← Önceki
            </button>
            <span className="text-xs text-gray-500">{page}/{totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
            >
              Sonraki →
            </button>
          </div>
        )}
      </div>

      {/* Sağ: Konuşma Detayı */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center flex-col gap-3 text-gray-400">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl">💬</div>
            <p className="text-sm font-medium">Bir konuşma seçin</p>
          </div>
        ) : (
          <>
            {/* Konuşma Header */}
            <div className="p-4 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h2 className="font-bold text-gray-900">
                  {selected.customerName || 'Anonim Kullanıcı'}
                </h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                  {selected.email && (
                    <span className="text-xs text-gray-500">📧 {selected.email}</span>
                  )}
                  {selected.phone && (
                    <span className="text-xs text-gray-500">📞 {selected.phone}</span>
                  )}
                  <span className="text-xs text-gray-500">
                    🕐 {format(new Date(selected.createdAt), "dd MMM yyyy, HH:mm", { locale: tr })}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {selected.status !== 'resolved' && (
                  <button
                    onClick={() => markResolved(selected.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors"
                  >
                    ✓ Çözüldü
                  </button>
                )}
                <button
                  onClick={() => deleteSession(selected.id)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
                >
                  Sil
                </button>
              </div>
            </div>

            {/* Mesajlar */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {detailLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full" />
                </div>
              ) : selectedDetail?.messages.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-8">Mesaj yok</p>
              ) : (
                selectedDetail?.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs mr-2 mt-1 flex-shrink-0">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-700 rounded-bl-sm shadow-sm border border-gray-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-xs mt-1.5 ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                        {format(new Date(msg.createdAt), 'HH:mm', { locale: tr })}
                        {msg.role === 'user' && (
                          <span className="ml-1">• {selectedDetail.customerName || 'Kullanıcı'}</span>
                        )}
                      </p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs ml-2 mt-1 flex-shrink-0">
                        {(selectedDetail.customerName || 'U')[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
