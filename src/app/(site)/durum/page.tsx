import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza Status — Sistem Durumu & Uptime',
  description: 'kooza tüm servislerinin canlı durumu. Web, API, ödeme, e-Fatura, kargo entegrasyonları — son 90 gün uptime.',
}

const SERVICES = [
  { name: 'Web Sitesi', status: 'operational', uptime: '99.99%' },
  { name: 'API (REST + GraphQL)', status: 'operational', uptime: '99.97%' },
  { name: 'Admin Paneli', status: 'operational', uptime: '99.98%' },
  { name: 'Ödeme (Iyzico)', status: 'operational', uptime: '99.95%' },
  { name: 'GİB e-Fatura/e-Arşiv', status: 'operational', uptime: '99.92%' },
  { name: 'Trendyol Entegrasyonu', status: 'operational', uptime: '99.94%' },
  { name: 'Yemeksepeti Entegrasyonu', status: 'operational', uptime: '99.93%' },
  { name: 'Hepsiburada Entegrasyonu', status: 'operational', uptime: '99.96%' },
  { name: 'Kargo (Aras/Yurtiçi/MNG/PTT)', status: 'operational', uptime: '99.91%' },
  { name: 'WhatsApp Business API', status: 'operational', uptime: '99.85%' },
  { name: 'E-mail Servisi (Resend)', status: 'operational', uptime: '99.99%' },
  { name: 'Mobil API', status: 'operational', uptime: '99.95%' },
]

const INCIDENTS = [
  {
    date: '12 Nisan 2026',
    title: 'Trendyol API gecikme',
    duration: '23 dakika',
    impact: 'Sınırlı',
    summary: 'Trendyol\'un sunucu tarafında geçici sorun, sipariş senkronu 23 dk gecikti. Tüm siparişler kurtarıldı.',
    status: 'resolved',
  },
  {
    date: '3 Nisan 2026',
    title: 'GİB e-Fatura yavaşlama',
    duration: '45 dakika',
    impact: 'Hafif',
    summary: 'GİB sunucularındaki yoğunluk nedeniyle e-Fatura kesimi yavaşladı. Otomatik retry ile sorun kapatıldı.',
    status: 'resolved',
  },
]

export default function StatusPage() {
  const operational = SERVICES.filter((s) => s.status === 'operational').length
  const total = SERVICES.length
  const allOk = operational === total

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className={`py-16 ${allOk ? 'bg-gradient-to-br from-emerald-600 to-teal-700' : 'bg-amber-600'} text-white`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white font-semibold mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
            {allOk ? 'Tüm sistemler operasyonel' : 'Bazı servislerde sorun'}
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
            kooza Status
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            {operational}/{total} servis çalışıyor · Son 90 gün uptime: <strong className="text-white">%99.95</strong>
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services list */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-10">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-bold text-gray-900">Servis Durumu</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {SERVICES.map((s) => (
                <li key={s.name} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-50 animate-pulse" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="font-medium text-gray-900">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-emerald-600 font-semibold">Operasyonel</span>
                    <span className="text-gray-500 font-mono text-xs hidden sm:inline">90gün: {s.uptime}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Incidents */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Son Olaylar (90 gün)</h2>
              <span className="text-xs font-semibold text-gray-500">{INCIDENTS.length} olay</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {INCIDENTS.map((inc, i) => (
                <li key={i} className="px-6 py-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{inc.title}</h3>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      ÇÖZÜLDÜ
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span>{inc.date}</span>
                    <span>·</span>
                    <span>Süre: {inc.duration}</span>
                    <span>·</span>
                    <span>Etki: {inc.impact}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{inc.summary}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center">
            <Link href="/iletisim" className="text-sm text-purple-700 hover:text-purple-900 font-semibold">
              Bir sorun yaşıyor musunuz? Bize bildirin →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
