'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Client {
  id?: string
  name: string
  logo?: string
  url?: string
  isActive: boolean
  order: number
}

export default function ClientsAdminPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [newClient, setNewClient] = useState({ name: '', logo: '', url: '' })
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetch('/api/clients')
      .then((r) => r.json())
      .then((data) => {
        setClients(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  const addClient = async () => {
    if (!newClient.name) return
    setAdding(true)
    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newClient, isActive: true, order: clients.length }),
    })
    const created = await res.json()
    setClients((c) => [...c, created])
    setNewClient({ name: '', logo: '', url: '' })
    toast.success('Müşteri eklendi!')
    setAdding(false)
  }

  const deleteClient = async (id: string) => {
    await fetch(`/api/clients/${id}`, { method: 'DELETE' })
    setClients((c) => c.filter((x) => x.id !== id))
    toast.success('Silindi!')
  }

  const toggleActive = async (client: Client) => {
    if (!client.id) return
    await fetch(`/api/clients/${client.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !client.isActive }),
    })
    setClients((c) => c.map((x) => x.id === client.id ? { ...x, isActive: !x.isActive } : x))
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" /></div>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Müşteri Logoları</h1>
        <p className="text-gray-500 text-sm mt-1">Ana sayfadaki logo slider'ını yönetin</p>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {clients.length === 0 ? (
          <div className="p-12 text-center text-gray-400">Henüz müşteri eklenmedi</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Şirket</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Logo</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">URL</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Durum</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clients.map((client) => (
                <tr key={client.id} className={`${!client.isActive ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-3 font-medium text-gray-900 text-sm">{client.name}</td>
                  <td className="px-4 py-3">
                    {client.logo ? (
                      <img src={client.logo} alt={client.name} className="h-8 w-auto object-contain" />
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs truncate max-w-[120px]">{client.url || '—'}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(client)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${client.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${client.isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => client.id && deleteClient(client.id)} className="text-red-400 hover:text-red-600 p-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add new */}
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Yeni Müşteri Ekle</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Şirket Adı *</label>
            <input
              value={newClient.name}
              onChange={(e) => setNewClient((c) => ({ ...c, name: e.target.value }))}
              placeholder="ABC Holding"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Logo URL (opsiyonel)</label>
            <input
              value={newClient.logo}
              onChange={(e) => setNewClient((c) => ({ ...c, logo: e.target.value }))}
              placeholder="https://example.com/logo.png"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Website (opsiyonel)</label>
            <input
              value={newClient.url}
              onChange={(e) => setNewClient((c) => ({ ...c, url: e.target.value }))}
              placeholder="https://example.com"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={addClient}
          disabled={adding || !newClient.name}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50"
        >
          {adding ? 'Ekleniyor...' : 'Ekle'}
        </button>
      </div>
    </div>
  )
}
