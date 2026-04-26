import prisma from '@/lib/db'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const userName = (session?.user as any)?.name || 'Admin'
  const firstName = userName.split(' ')[0]

  const [
    leadsCount,
    newLeadsCount,
    leadsLastWeek,
    productsCount,
    postsCount,
    chatbotCount,
    newChatbotCount,
    customersCount,
    servicesCount,
  ] = await Promise.all([
    prisma.lead.count({ where: { NOT: { source: 'chatbot' } } }),
    prisma.lead.count({ where: { status: 'NEW', NOT: { source: 'chatbot' } } }),
    prisma.lead.count({
      where: {
        NOT: { source: 'chatbot' },
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    }),
    prisma.product.count({ where: { status: 'ACTIVE' } }),
    prisma.blogPost.count({ where: { status: 'PUBLISHED' } }),
    prisma.lead.count({ where: { source: 'chatbot' } }),
    prisma.lead.count({ where: { source: 'chatbot', status: 'NEW' } }),
    prisma.user.count(),
    prisma.service.count({ where: { status: 'ACTIVE' } }),
  ])

  const recentLeads = await prisma.lead.findMany({
    where: { NOT: { source: 'chatbot' } },
    orderBy: { createdAt: 'desc' },
    take: 6,
    include: { product: { select: { name: true } } },
  })

  // Last 7 days lead chart data
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const sevenDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - i))
    return d
  })
  const dailyLeads = await Promise.all(
    sevenDays.map(async (d) => {
      const next = new Date(d)
      next.setDate(next.getDate() + 1)
      const count = await prisma.lead.count({
        where: { createdAt: { gte: d, lt: next }, NOT: { source: 'chatbot' } },
      })
      return { day: d.toLocaleDateString('tr-TR', { weekday: 'short' }), count }
    })
  )
  const maxDaily = Math.max(...dailyLeads.map((d) => d.count), 1)

  const STATS = [
    {
      label: 'Toplam Talep',
      value: leadsCount,
      delta: `+${leadsLastWeek} son 7 gün`,
      positive: true,
      icon: '📥',
      color: 'purple',
      href: '/admin/leads',
    },
    {
      label: 'Yeni Talep',
      value: newLeadsCount,
      delta: newLeadsCount > 0 ? 'Bekliyor' : 'Boşta',
      positive: newLeadsCount > 0,
      icon: '🔔',
      color: 'amber',
      href: '/admin/leads?status=NEW',
    },
    {
      label: 'Aktif Ürün',
      value: productsCount,
      delta: `${servicesCount} hizmet`,
      positive: true,
      icon: '💻',
      color: 'blue',
      href: '/admin/urunler',
    },
    {
      label: 'Blog Yazısı',
      value: postsCount,
      delta: 'Yayınlandı',
      positive: true,
      icon: '📝',
      color: 'emerald',
      href: '/admin/blog',
    },
  ]

  const COLOR_MAP: Record<string, { bg: string; text: string; ring: string }> = {
    purple: { bg: 'bg-purple-50', text: 'text-purple-700', ring: 'ring-purple-100' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-100' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-100' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-100' },
  }

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Hoş geldin, {firstName} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/leads?status=NEW"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-purple-300 hover:text-purple-700 transition-colors"
          >
            🔔 Bildirimler
            {newLeadsCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full bg-amber-500 text-white">
                {newLeadsCount}
              </span>
            )}
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors shadow-sm"
          >
            Siteyi Görüntüle
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const c = COLOR_MAP[s.color]
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center text-xl`}>
                  {s.icon}
                </div>
                {s.delta && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
                    {s.delta}
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-900 tabular-nums">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </Link>
          )
        })}
      </div>

      {/* 7-day chart + Quick stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-gray-900">Son 7 Günde Gelen Talepler</h2>
              <p className="text-xs text-gray-500 mt-0.5">Günlük talep dağılımı</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
              Canlı
            </span>
          </div>

          <div className="flex items-end gap-3 h-44">
            {dailyLeads.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg relative group cursor-pointer hover:from-purple-700 hover:to-purple-500 transition-colors"
                    style={{ height: `${(d.count / maxDaily) * 100 || 4}%`, minHeight: '4px' }}
                  >
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {d.count} talep
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-gray-500 capitalize">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side stats */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
            <div className="text-xs font-medium uppercase tracking-wider text-purple-200 mb-2">Toplam Kullanıcı</div>
            <div className="text-4xl font-bold mb-1 tabular-nums">{customersCount}</div>
            <div className="text-xs text-purple-100">Sistemdeki aktif kullanıcılar</div>
            <Link
              href="/admin/kullanicilar"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-white hover:underline"
            >
              Yönet →
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">Sistem Durumu</div>
            <div className="space-y-2.5">
              <Row label="API" status="active" />
              <Row label="Veritabanı" status="active" />
              <Row label="E-posta" status={process.env.SMTP_HOST ? 'active' : 'idle'} />
              <Row label="Chatbot AI" status={process.env.ANTHROPIC_API_KEY ? 'active' : 'idle'} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Hızlı Erişim</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { href: '/admin/urunler/yeni', label: 'Ürün Ekle', icon: '➕', color: 'bg-purple-50 text-purple-700' },
            { href: '/admin/blog/yeni', label: 'Blog Yaz', icon: '✏️', color: 'bg-blue-50 text-blue-700' },
            { href: '/admin/leads', label: 'Talepler', icon: '📋', color: 'bg-amber-50 text-amber-700' },
            { href: '/admin/musteriler', label: 'Müşteriler', icon: '🏢', color: 'bg-emerald-50 text-emerald-700' },
            { href: '/admin/tema', label: 'Tema', icon: '🎨', color: 'bg-pink-50 text-pink-700' },
            { href: '/admin/ayarlar', label: 'Ayarlar', icon: '⚙️', color: 'bg-gray-100 text-gray-700' },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50/30 transition-all"
            >
              <span className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center text-lg`}>
                {a.icon}
              </span>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-purple-700">
                {a.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent leads */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Son Talepler</h2>
            <Link href="/admin/leads" className="text-xs font-semibold text-purple-700 hover:underline">
              Tümünü Gör →
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-gray-400 text-sm">Henüz talep yok</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads`}
                  className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {lead.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
                    <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lead.status === 'NEW'
                          ? 'bg-amber-100 text-amber-700'
                          : lead.status === 'WON'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {lead.status}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {new Date(lead.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Chatbot messages */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-gray-900">Chatbot Mesajları</h2>
              {newChatbotCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  {newChatbotCount}
                </span>
              )}
            </div>
            <Link href="/admin/chatbot/konusmalar" className="text-xs font-semibold text-purple-700 hover:underline">
              Tümünü Gör →
            </Link>
          </div>
          {chatbotCount === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">🤖</div>
              <p className="text-gray-400 text-sm">Henüz chatbot mesajı yok</p>
              <p className="text-gray-300 text-xs mt-1">AI chatbot aktivite verileri burada görünecek</p>
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-700 font-bold text-3xl tabular-nums">{chatbotCount}</p>
              <p className="text-gray-500 text-sm mt-1">toplam chatbot etkileşimi</p>
              <Link
                href="/admin/chatbot/konusmalar"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-purple-700 hover:underline"
              >
                Mesajları Gör →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ label, status }: { label: string; status: 'active' | 'idle' | 'down' }) {
  const cfg = {
    active: { bg: 'bg-emerald-500', label: 'Çalışıyor', text: 'text-emerald-700' },
    idle: { bg: 'bg-amber-500', label: 'Beklemede', text: 'text-amber-700' },
    down: { bg: 'bg-red-500', label: 'Sorun', text: 'text-red-700' },
  }[status]

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-700">{label}</span>
      <span className="flex items-center gap-1.5">
        <span className={`relative flex h-1.5 w-1.5`}>
          <span className={`animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full ${cfg.bg} opacity-60`} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${cfg.bg}`} />
        </span>
        <span className={`text-[11px] font-semibold ${cfg.text}`}>{cfg.label}</span>
      </span>
    </div>
  )
}
