'use client'

import { motion } from 'framer-motion'
import * as Lucide from 'lucide-react'

interface Props {
  sectorSlug: string
  iconColor: string
  bgColor: string
  iconName: string
}

const PROFILES: Record<string, {
  title: string
  metrics: { label: string; value: string; color?: string }[]
  rows: { left: string; mid: string; right: string; status: string; statusColor: string }[]
  feedTitle: string
  feedItems: { time: string; text: string }[]
}> = {
  klinik: {
    title: 'Bugünün randevuları',
    metrics: [
      { label: 'Bugün', value: '24', color: 'red' },
      { label: 'Bekleyen', value: '7' },
      { label: 'Tamamlanan', value: '17' },
    ],
    rows: [
      { left: 'Ayşe K.', mid: '09:30 · Diş Kontrol', right: 'Dr. Ahmet Y.', status: 'Geliyor', statusColor: 'text-blue-600 bg-blue-50' },
      { left: 'Mehmet D.', mid: '10:00 · Diş Çekimi', right: 'Dr. Selin B.', status: 'Bekliyor', statusColor: 'text-amber-600 bg-amber-50' },
      { left: 'Zeynep A.', mid: '10:30 · Implant', right: 'Dr. Ahmet Y.', status: 'Tamamlandı', statusColor: 'text-emerald-600 bg-emerald-50' },
    ],
    feedTitle: 'Sistem Aktivitesi',
    feedItems: [
      { time: '2 dk', text: 'e-Reçete: Ayşe K. · 3 ilaç' },
      { time: '8 dk', text: 'MHRS randevusu kaydedildi' },
      { time: '15 dk', text: 'SGK provizyon onaylandı' },
    ],
  },
  restoran: {
    title: 'Açık masalar',
    metrics: [
      { label: 'Aktif Masa', value: '18/24', color: 'orange' },
      { label: 'Bugün Ciro', value: '₺18.4K' },
      { label: 'Sipariş', value: '142' },
    ],
    rows: [
      { left: 'Masa 7', mid: '4 kişi · 38 dk', right: '₺680', status: 'Servis', statusColor: 'text-blue-600 bg-blue-50' },
      { left: 'Masa 3', mid: '2 kişi · 12 dk', right: '₺245', status: 'Sipariş', statusColor: 'text-amber-600 bg-amber-50' },
      { left: 'Masa 12', mid: '6 kişi · 1 sa', right: '₺1.420', status: 'Hesap', statusColor: 'text-emerald-600 bg-emerald-50' },
    ],
    feedTitle: 'Mutfak Akışı',
    feedItems: [
      { time: '🍽️', text: 'Masa 7 · Karışık ızgara hazır' },
      { time: '🚴', text: 'Yemeksepeti #4892 · kurye yolda' },
      { time: '🍕', text: 'Masa 12 · Pizza fırında' },
    ],
  },
  market: {
    title: 'Stok hareketi',
    metrics: [
      { label: 'Kritik Stok', value: '12', color: 'red' },
      { label: 'Bugün Satış', value: '₺34.7K' },
      { label: 'Sepet Sayısı', value: '287' },
    ],
    rows: [
      { left: 'Süt 1L', mid: '12 adet kaldı', right: 'min: 20', status: 'Kritik', statusColor: 'text-red-600 bg-red-50' },
      { left: 'Ekmek', mid: '45 adet', right: 'min: 30', status: 'Normal', statusColor: 'text-emerald-600 bg-emerald-50' },
      { left: 'Yumurta', mid: '8 koli', right: 'min: 5', status: 'Normal', statusColor: 'text-emerald-600 bg-emerald-50' },
    ],
    feedTitle: 'Kasa Aktivitesi',
    feedItems: [
      { time: '1 dk', text: 'Kasa #2 · ₺247.50 · sadakat kart' },
      { time: '3 dk', text: 'Stok güncelleme · 14 ürün' },
      { time: '8 dk', text: 'Tedarikçi e-Faturası · ABC Gıda' },
    ],
  },
  egitim: {
    title: 'Bugünkü dersler',
    metrics: [
      { label: 'Aktif Öğrenci', value: '342' },
      { label: 'Bugün Ders', value: '18' },
      { label: 'Devamsız', value: '5', color: 'red' },
    ],
    rows: [
      { left: '8.A · Matematik', mid: '09:00-09:45 · 24/26', right: 'Ali B.', status: 'Devam', statusColor: 'text-blue-600 bg-blue-50' },
      { left: '9.B · İngilizce', mid: '10:00-10:45 · 22/24', right: 'Selin K.', status: 'Devam', statusColor: 'text-blue-600 bg-blue-50' },
      { left: '10.A · Fizik', mid: '11:00-11:45', right: 'Ahmet Y.', status: 'Yaklaşan', statusColor: 'text-amber-600 bg-amber-50' },
    ],
    feedTitle: 'Veli Bildirimi',
    feedItems: [
      { time: '5 dk', text: 'Sınav sonucu yayınlandı · 9.A' },
      { time: '12 dk', text: 'Ödeme alındı · Mehmet K.' },
      { time: '20 dk', text: 'Devamsızlık SMS · 5 öğrenci' },
    ],
  },
  ik: {
    title: 'İK panel',
    metrics: [
      { label: 'Çalışan', value: '127' },
      { label: 'Bugün İzinli', value: '8' },
      { label: 'Açık Talep', value: '4', color: 'orange' },
    ],
    rows: [
      { left: 'Ayşe Yılmaz', mid: 'Yıllık izin · 25-29 Mar', right: '5 gün', status: 'Onayda', statusColor: 'text-amber-600 bg-amber-50' },
      { left: 'Mehmet Demir', mid: 'Mazeret · 26 Mar', right: '1 gün', status: 'Onaylı', statusColor: 'text-emerald-600 bg-emerald-50' },
      { left: 'Zeynep Aydın', mid: 'Sağlık raporu', right: '3 gün', status: 'Onaylı', statusColor: 'text-emerald-600 bg-emerald-50' },
    ],
    feedTitle: 'Bordro & Ödeme',
    feedItems: [
      { time: '1 sa', text: 'Mart bordrosu hazırlandı · 127 personel' },
      { time: '3 sa', text: 'PDKS senkronize · 247 giriş' },
      { time: '5 sa', text: 'İşe alım · 3 yeni başvuru' },
    ],
  },
  web: {
    title: 'Web sitesi yönetimi',
    metrics: [
      { label: 'Bu Ay Ziyaret', value: '24.7K' },
      { label: 'Form Talepleri', value: '47' },
      { label: 'Conversion', value: '%4.2' },
    ],
    rows: [
      { left: '/yazilimlar/crm', mid: '1.247 ziyaret', right: '+18%', status: 'Trend', statusColor: 'text-emerald-600 bg-emerald-50' },
      { left: '/blog/kobi-rehberi', mid: '892 ziyaret', right: '+5%', status: 'Yeni', statusColor: 'text-blue-600 bg-blue-50' },
      { left: '/iletisim', mid: '634 ziyaret', right: '12 form', status: 'Aktif', statusColor: 'text-amber-600 bg-amber-50' },
    ],
    feedTitle: 'Site Aktivitesi',
    feedItems: [
      { time: '2 dk', text: 'Yeni form talebi · Ali Yılmaz' },
      { time: '8 dk', text: 'Blog yazısı yayınlandı' },
      { time: '15 dk', text: 'Google indexleme tamamlandı' },
    ],
  },
}

export default function SectorMockup({ sectorSlug, iconColor, bgColor, iconName }: Props) {
  const profile = PROFILES[sectorSlug] || PROFILES.web
  const Icon = (Lucide as any)[iconName] as React.ComponentType<any> | undefined

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-elevated bg-white">
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[11px] text-gray-400 font-medium">app.kooza.com.tr/{sectorSlug}</span>
        </div>
        <div className="w-12" />
      </div>

      <div className="p-4 lg:p-5 bg-gradient-to-b from-white to-gray-50/50">
        {/* Header strip */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: bgColor }}>
              {Icon && <Icon className="w-4.5 h-4.5" style={{ color: iconColor }} strokeWidth={2} />}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 leading-tight">{profile.title}</div>
              <div className="text-[10px] text-gray-500">Canlı veri · son güncelleme şimdi</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-50" style={{ background: iconColor }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: iconColor }} />
            </span>
            <span className="text-[10px] text-gray-500 font-semibold">CANLI</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {profile.metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-gray-100 rounded-lg p-2.5"
            >
              <div className="text-[9px] text-gray-500 uppercase font-semibold tracking-wider mb-1">{m.label}</div>
              <div
                className="text-lg lg:text-xl font-bold tabular-nums leading-none"
                style={{ color: m.color === 'red' ? '#dc2626' : m.color === 'orange' ? '#ea580c' : iconColor }}
              >
                {m.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rows table */}
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden mb-4">
          {profile.rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`flex items-center gap-3 px-3 py-2.5 ${i < profile.rows.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-900 truncate">{r.left}</div>
                <div className="text-[10px] text-gray-500 truncate">{r.mid}</div>
              </div>
              <div className="text-xs font-semibold text-gray-700 hidden sm:block">{r.right}</div>
              <span className={`text-[9px] font-bold px-2 py-1 rounded ${r.statusColor}`}>{r.status}</span>
            </motion.div>
          ))}
        </div>

        {/* Activity feed */}
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 text-[10px] font-bold text-gray-700 uppercase tracking-wider">
            {profile.feedTitle}
          </div>
          {profile.feedItems.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className={`flex items-center gap-3 px-3 py-2 ${i < profile.feedItems.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="text-[10px] text-gray-400 font-mono w-12 shrink-0">{f.time}</div>
              <div className="text-[11px] text-gray-700 flex-1">{f.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
