'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

interface ReportData {
  summary: {
    totalLeads: number
    totalChatSessions: number
    totalChatMessages: number
    totalBlogPosts: number
    publishedBlogPosts: number
    thisMonthLeads: number
    thisMonthChats: number
    lastMonthLeads: number
    lastMonthChats: number
    thisWeekLeads: number
    thisWeekChats: number
    leadGrowth: number
    chatGrowth: number
  }
  dailyData: Array<{ date: string; leads: number; chats: number }>
  monthlyData: Array<{ month: string; leads: number; chats: number; posts: number }>
  leadsByType: Array<{ type: string; count: number }>
  leadsByStatus: Array<{ status: string; count: number }>
  topPosts: Array<{ title: string; views: number; slug: string; publishedAt: string | null }>
  recentCustomers: Array<{
    id: string
    customerName: string | null
    email: string | null
    phone: string | null
    createdAt: string
    _count: { messages: number }
  }>
}

const TYPE_LABELS: Record<string, string> = {
  DEMO: 'Demo', CONTACT: 'İletişim', QUOTE: 'Teklif', NEWSLETTER: 'Bülten',
}
const STATUS_LABELS: Record<string, string> = {
  NEW: 'Yeni', CONTACTED: 'İletişim', QUALIFIED: 'Nitelikli',
  PROPOSAL: 'Teklif', NEGOTIATION: 'Müzakere', WON: 'Kazanıldı', LOST: 'Kaybedildi',
}

const PIE_COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#EC4899']

function StatCard({
  label, value, sub, growth, icon, color,
}: {
  label: string; value: number | string; sub?: string; growth?: number; icon: string; color: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${color}18` }}>
          {icon}
        </div>
        {growth !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {growth >= 0 ? '↑' : '↓'} {Math.abs(growth)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

export default function RaporlarPage() {
  const [data, setData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<'30' | '7'>('30')

  useEffect(() => {
    fetch('/api/admin/reports')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
    </div>
  )
  if (!data) return <p className="text-red-500">Rapor yüklenemedi</p>

  const { summary } = data
  const displayDaily = period === '7' ? data.dailyData.slice(-7) : data.dailyData

  const pieTypeData = data.leadsByType.map((d) => ({ name: TYPE_LABELS[d.type] || d.type, value: d.count }))
  const pieStatusData = data.leadsByStatus.map((d) => ({ name: STATUS_LABELS[d.status] || d.status, value: d.count }))

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Raporlar & Analitik</h1>
          <p className="text-gray-500 text-sm mt-0.5">Platform genelinde istatistikler</p>
        </div>
        <div className="flex gap-2">
          {(['7', '30'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${period === p ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}
            >
              Son {p} gün
            </button>
          ))}
        </div>
      </div>

      {/* Özet Kartlar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Toplam Talep" value={summary.totalLeads}
          sub={`Bu ay: ${summary.thisMonthLeads} • Bu hafta: ${summary.thisWeekLeads}`}
          growth={summary.leadGrowth} icon="📥" color="#3B82F6" />
        <StatCard label="Chatbot Konuşması" value={summary.totalChatSessions}
          sub={`Bu ay: ${summary.thisMonthChats} • Bu hafta: ${summary.thisWeekChats}`}
          growth={summary.chatGrowth} icon="💬" color="#8B5CF6" />
        <StatCard label="Toplam Mesaj" value={summary.totalChatMessages}
          sub="Kullanıcı mesajları" icon="✉️" color="#10B981" />
        <StatCard label="Blog Yazısı" value={summary.publishedBlogPosts}
          sub={`Toplam taslak dahil: ${summary.totalBlogPosts}`} icon="📝" color="#F59E0B" />
      </div>

      {/* Büyüme Kartları */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Bu Ay Talepler</p>
          <p className="text-3xl font-extrabold text-blue-600">{summary.thisMonthLeads}</p>
          <p className="text-xs text-gray-400 mt-1">Geçen ay: {summary.lastMonthLeads}</p>
          <div className="mt-2 h-1.5 bg-gray-100 rounded-full">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((summary.thisMonthLeads / Math.max(summary.lastMonthLeads, 1)) * 50, 100)}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Bu Ay Chatbot</p>
          <p className="text-3xl font-extrabold text-purple-600">{summary.thisMonthChats}</p>
          <p className="text-xs text-gray-400 mt-1">Geçen ay: {summary.lastMonthChats}</p>
          <div className="mt-2 h-1.5 bg-gray-100 rounded-full">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.min((summary.thisMonthChats / Math.max(summary.lastMonthChats, 1)) * 50, 100)}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Dönüşüm Oranı</p>
          <p className="text-3xl font-extrabold text-green-600">
            {summary.totalChatSessions > 0
              ? Math.round((summary.totalLeads / summary.totalChatSessions) * 100) : 0}%
          </p>
          <p className="text-xs text-gray-400 mt-1">Chat → Form dönüşümü</p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-5">
          {period === '7' ? 'Son 7 Gün' : 'Son 30 Gün'} — Günlük Aktivite
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={displayDaily}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="leads" name="Talepler" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="chats" name="Chatbot" stroke="#8B5CF6" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-5">Son 6 Ay — Aylık Karşılaştırma</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="leads" name="Talepler" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="chats" name="Chatbot" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="posts" name="Blog" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Talep Türleri</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieTypeData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {pieTypeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Pipeline Durumları</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieStatusData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {pieStatusData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* En Çok Okunan Blog */}
      {data.topPosts.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">En Çok Okunan Blog Yazıları</h2>
          <div className="space-y-3">
            {data.topPosts.map((p, i) => (
              <div key={p.slug} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-sm font-bold text-blue-600 flex-shrink-0">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                  {p.publishedAt && <p className="text-xs text-gray-400">{format(new Date(p.publishedAt), 'dd MMM yyyy', { locale: tr })}</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-700">{p.views.toLocaleString('tr-TR')}</p>
                  <p className="text-xs text-gray-400">görüntülenme</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Müşteri Listesi */}
      {data.recentCustomers.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Son Chatbot Müşterileri</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="pb-3 font-medium text-gray-500">İsim</th>
                  <th className="pb-3 font-medium text-gray-500">E-posta</th>
                  <th className="pb-3 font-medium text-gray-500">Telefon</th>
                  <th className="pb-3 font-medium text-gray-500">Mesaj</th>
                  <th className="pb-3 font-medium text-gray-500">Tarih</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.recentCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{c.customerName || '—'}</td>
                    <td className="py-3 text-gray-600">{c.email || '—'}</td>
                    <td className="py-3 text-gray-600">{c.phone || '—'}</td>
                    <td className="py-3 text-gray-500">{c._count.messages}</td>
                    <td className="py-3 text-gray-400">{format(new Date(c.createdAt), 'dd MMM yyyy', { locale: tr })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
