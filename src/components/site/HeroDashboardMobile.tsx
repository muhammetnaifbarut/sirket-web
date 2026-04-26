'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, ShoppingCart, Bell } from 'lucide-react'

const KPIS = [
  { label: 'Aylık Gelir', value: '₺348K', delta: '+12.5%', color: '#714B67' },
  { label: 'Sipariş', value: '1.392', delta: '+23.1%', color: '#059669' },
]

const FEED = [
  { icon: Users, color: '#2563eb', text: 'Yeni müşteri kaydı', sub: 'Selin K. · 2dk önce' },
  { icon: ShoppingCart, color: '#16a34a', text: 'Yeni sipariş ₺3.450', sub: 'Berk T. · 5dk önce' },
  { icon: Bell, color: '#ea580c', text: 'Stok uyarısı', sub: '12 ürün kritik · 15dk önce' },
]

export default function HeroDashboardMobile() {
  return (
    <div className="aspect-[4/5] bg-white p-3 flex flex-col gap-2.5 text-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-1 py-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-purple-600 flex items-center justify-center text-white text-xs font-black">K</div>
          <div>
            <div className="text-xs font-bold text-gray-900 leading-tight">kooza</div>
            <div className="text-[9px] text-gray-400">Gösterge Paneli</div>
          </div>
        </div>
        <div className="relative">
          <Bell className="w-4 h-4 text-gray-500" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2">
        {KPIS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="bg-white border border-gray-200 rounded-lg p-2.5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: k.color }} />
            <div className="text-[8px] text-gray-500 uppercase font-semibold mb-1">{k.label}</div>
            <div className="text-base font-bold text-gray-900 tabular-nums leading-none">{k.value}</div>
            <div className="text-[9px] text-emerald-600 font-bold mt-1">▲ {k.delta}</div>
          </motion.div>
        ))}
      </div>

      {/* Mini chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white border border-gray-200 rounded-lg p-2.5"
      >
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <div className="text-[8px] text-gray-500 uppercase font-semibold">Gelir Trendi</div>
            <div className="text-xs font-bold text-gray-900">Son 12 hafta</div>
          </div>
          <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
        </div>
        <svg viewBox="0 0 200 60" className="w-full h-12">
          <defs>
            <linearGradient id="m-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#714B67" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#714B67" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 50 C 20 45, 30 40, 50 35 S 90 30, 110 25 S 150 20, 170 15 L 200 10 L 200 60 L 0 60 Z"
            fill="url(#m-area)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          />
          <motion.path
            d="M 0 50 C 20 45, 30 40, 50 35 S 90 30, 110 25 S 150 20, 170 15 L 200 10"
            fill="none"
            stroke="#714B67"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 1.2 }}
          />
        </svg>
      </motion.div>

      {/* Activity feed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="bg-white border border-gray-200 rounded-lg overflow-hidden flex-1"
      >
        <div className="px-2.5 py-1.5 border-b border-gray-100 text-[9px] font-bold text-gray-700 uppercase">
          Canlı Akış
        </div>
        {FEED.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.2 }}
            className={`flex items-center gap-2 px-2.5 py-2 ${i < FEED.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <div
              className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: `${f.color}15` }}
            >
              <f.icon className="w-3.5 h-3.5" style={{ color: f.color }} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold text-gray-900 truncate">{f.text}</div>
              <div className="text-[8px] text-gray-500 truncate">{f.sub}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
