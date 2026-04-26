'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  NEW: { label: 'Yeni', color: 'bg-orange-100 text-orange-700' },
  CONTACTED: { label: 'İletişimde', color: 'bg-blue-100 text-blue-700' },
  QUALIFIED: { label: 'Nitelikli', color: 'bg-purple-100 text-purple-700' },
  PROPOSAL: { label: 'Teklif', color: 'bg-yellow-100 text-yellow-700' },
  NEGOTIATION: { label: 'Müzakere', color: 'bg-indigo-100 text-indigo-700' },
  WON: { label: 'Kazanıldı', color: 'bg-green-100 text-green-700' },
  LOST: { label: 'Kaybedildi', color: 'bg-red-100 text-red-700' },
}

export default function LeadsTable({ leads }: { leads: any[] }) {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      toast.success('Durum güncellendi')
      router.refresh()
    } catch {
      toast.error('Hata oluştu')
    }
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Bu talebi silmek istediğinizden emin misiniz?')) return
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' })
      toast.success('Talep silindi')
      router.refresh()
    } catch {
      toast.error('Hata oluştu')
    }
  }

  if (!leads.length) {
    return (
      <div className="card p-12 text-center">
        <div className="text-4xl mb-3">📭</div>
        <p className="text-gray-500">Henüz talep yok</p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">İsim</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">E-posta</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Şirket</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Tür</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Durum</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Tarih</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.map((lead) => (
              <>
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelected(selected === lead.id ? null : lead.id)}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <a href={`mailto:${lead.email}`} className="hover:text-blue-600" onClick={e => e.stopPropagation()}>
                      {lead.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{lead.company || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${lead.type === 'DEMO' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                      {lead.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => { e.stopPropagation(); updateStatus(lead.id, e.target.value) }}
                      onClick={e => e.stopPropagation()}
                      className={`badge border-0 cursor-pointer font-medium text-xs ${STATUS_LABELS[lead.status]?.color || 'bg-gray-100 text-gray-600'}`}
                    >
                      {Object.entries(STATUS_LABELS).map(([val, { label }]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(lead.createdAt).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteLead(lead.id) }}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </td>
                </tr>
                {selected === lead.id && (
                  <tr key={`${lead.id}-detail`} className="bg-blue-50">
                    <td colSpan={7} className="px-4 py-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5">Telefon</p>
                          <p className="font-medium">{lead.phone || '-'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5">Ürün</p>
                          <p className="font-medium">{lead.product?.name || '-'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5">Kaynak</p>
                          <p className="font-medium">{lead.source || '-'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5">Mesaj</p>
                          <p className="font-medium">{lead.message || '-'}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
