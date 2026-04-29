'use client'

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const KPIS = [
  {
    label: 'Aylık Gelir',
    value: 348200,
    format: (n: number) => `₺${(n / 1000).toFixed(1)}K`,
    delta: '+12.5%',
    positive: true,
    color: 'purple',
    spark: [38, 42, 40, 48, 52, 58, 62, 68],
  },
  {
    label: 'Aktif Müşteri',
    value: 2847,
    format: (n: number) => n.toLocaleString('tr-TR'),
    delta: '+8.2%',
    positive: true,
    color: 'blue',
    spark: [45, 48, 46, 52, 55, 58, 60, 64],
  },
  {
    label: 'Sipariş',
    value: 1392,
    format: (n: number) => n.toLocaleString('tr-TR'),
    delta: '+23.1%',
    positive: true,
    color: 'emerald',
    spark: [30, 45, 38, 55, 48, 65, 72, 78],
  },
  {
    label: 'Dönüşüm',
    value: 4.8,
    format: (n: number) => `%${n.toFixed(1)}`,
    delta: '-0.4%',
    positive: false,
    color: 'amber',
    spark: [55, 58, 60, 58, 54, 52, 50, 48],
  },
]

const CHART_POINTS = [28, 42, 38, 58, 52, 68, 62, 78, 72, 86, 82, 94]

const ROWS = [
  { name: 'Ayşe Kaya', company: 'Teknotaş A.Ş.', amount: '₺12.450', status: 'Ödendi', positive: true },
  { name: 'Mehmet Demir', company: 'Akın Lojistik', amount: '₺8.200', status: 'Beklemede', positive: false },
  { name: 'Zeynep Aydın', company: 'Form Medya', amount: '₺24.800', status: 'Ödendi', positive: true },
]

const COLOR_MAP = {
  purple: { hex: '#714B67', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  blue: { hex: '#2563eb', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  emerald: { hex: '#059669', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  amber: { hex: '#d97706', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
} as const

function useCountUp(target: number, delay = 0) {
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: 1600, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => mv.set(target), delay * 1000)
    const unsub = spring.on('change', (v) => setDisplay(v))
    return () => {
      clearTimeout(t)
      unsub()
    }
  }, [target, delay, mv, spring])

  return display
}

function KpiValue({ kpi, delay }: { kpi: (typeof KPIS)[number]; delay: number }) {
  const n = useCountUp(kpi.value, delay)
  return <div className="text-xl font-bold text-gray-900 leading-tight tabular-nums">{kpi.format(n)}</div>
}

function buildAreaPath(points: number[], width: number, height: number) {
  const step = width / (points.length - 1)
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const ys = points.map((p) => height - ((p - min) / range) * height * 0.85 - height * 0.08)

  let d = `M 0 ${ys[0]}`
  for (let i = 0; i < points.length - 1; i++) {
    const x1 = i * step
    const x2 = (i + 1) * step
    const y1 = ys[i]
    const y2 = ys[i + 1]
    const cx = (x1 + x2) / 2
    d += ` C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`
  }
  return { line: d, area: `${d} L ${width} ${height} L 0 ${height} Z`, ys }
}

function buildSparkPath(points: number[], w = 100, h = 28) {
  const step = w / (points.length - 1)
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  return points
    .map((p, i) => {
      const x = i * step
      const y = h - ((p - min) / range) * (h - 4) - 2
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

const NEW_ORDERS = [
  { name: 'Selin K.', amount: '₺3.450', emoji: '🛒' },
  { name: 'Berk T.', amount: '₺8.200', emoji: '💳' },
  { name: 'Cansu A.', amount: '₺1.890', emoji: '🛒' },
  { name: 'Murat E.', amount: '₺12.450', emoji: '💎' },
  { name: 'Deniz Y.', amount: '₺5.670', emoji: '🛒' },
]

export default function HeroDashboard() {
  const chartW = 720
  const chartH = 180
  const { line, area, ys } = buildAreaPath(CHART_POINTS, chartW, chartH)
  const lastX = chartW
  const lastY = ys[ys.length - 1]

  // 🔧 Hidration mismatch guard — framer-motion hook'ları SSR'da farklı subscribe ediyor.
  // Mounted olana kadar placeholder döndür. Tüm hook'lar bu check'ten ÖNCE çağrılmalı (Rules of Hooks).
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Hover-driven 3D tilt — hook'lar her zaman çağrılmalı (mounted'tan bağımsız)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const tiltX = useSpring(useTransform(mouseY, [-1, 1], [3, -3]), { stiffness: 150, damping: 20 })
  const tiltY = useSpring(useTransform(mouseX, [-1, 1], [-3, 3]), { stiffness: 150, damping: 20 })
  // 🔧 React #310 fix: glow spotlight efekti kaldırıldı
  // Önceden useTransform([glowX, glowY], ...) array pattern'i Next.js production'da
  // hooks count tutarsızlığına yol açıyordu. Glow yerine basit CSS hover yeterli.

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const py = ((e.clientY - rect.top) / rect.height) * 2 - 1
    mouseX.set(Math.max(-1, Math.min(1, px)))
    mouseY.set(Math.max(-1, Math.min(1, py)))
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  // Live "new order" notification — pops up faster while hovering
  const [orderIdx, setOrderIdx] = useState<number | null>(null)
  useEffect(() => {
    let i = 0
    const tick = () => {
      setOrderIdx(i)
      setTimeout(() => setOrderIdx(null), 2800)
      i = (i + 1) % NEW_ORDERS.length
    }
    const initialDelay = isHovered ? 600 : 2500
    const intervalMs = isHovered ? 2200 : 5500
    const start = setTimeout(tick, initialDelay)
    const interval = setInterval(tick, intervalMs)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [isHovered])

  // Live KPI bumps — pulse faster on hover
  const [bumpKey, setBumpKey] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setBumpKey((k) => k + 1), isHovered ? 1500 : 4500)
    return () => clearInterval(id)
  }, [isHovered])

  // 🔧 SSR'da placeholder dön — hidration tamamlanınca gerçek dashboard mount olsun
  if (!mounted) {
    return (
      <div className="aspect-[16/9] bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center">
        <div className="text-purple-600/40 text-sm font-medium animate-pulse">kooza dashboard...</div>
      </div>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1400,
        transformStyle: 'preserve-3d',
      }}
      className="aspect-[16/9] bg-white flex overflow-hidden text-gray-700 relative"
    >
      {/* Hover spotlight — basit CSS gradient (Hook bağımlılığı yok) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background:
            'radial-gradient(circle 320px at center, rgba(113, 75, 103, 0.10), transparent 70%)',
        }}
      />
      {/* Sidebar */}
      <div className="w-52 bg-gray-50 border-r border-gray-200 flex-shrink-0 flex flex-col">
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-purple-600 flex items-center justify-center text-white text-xs font-black">
              K
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-bold text-gray-900 leading-tight">kooza</div>
              <div className="text-[9px] text-gray-400">İşletme Platformu</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-0.5">
          <SidebarItem icon="home" label="Gösterge Paneli" active />
          <SidebarItem icon="users" label="CRM" />
          <SidebarItem icon="box" label="Stok & Depo" badge="24" />
          <SidebarItem icon="shopping" label="Siparişler" badge="new" />
          <SidebarItem icon="chart" label="Finans" />
          <SidebarItem icon="briefcase" label="İK" />
          <SidebarItem icon="report" label="Raporlar" />
        </nav>

        <div className="border-t border-gray-200 p-3">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white border border-gray-200">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-[10px] font-bold text-white">
              AY
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold text-gray-900 truncate">Ahmet Yılmaz</div>
              <div className="text-[8px] text-gray-500 truncate">Yönetici</div>
            </div>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
          <div>
            <div className="text-[11px] text-gray-500 mb-0.5">Hoş geldin, Ahmet 👋</div>
            <div className="text-sm font-bold text-gray-900">Gösterge Paneli</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-[10px] text-gray-500 min-w-[140px]">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Ara...
              <span className="ml-auto text-[8px] font-mono bg-white border border-gray-200 px-1 rounded">⌘K</span>
            </div>
            <button className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center relative">
              <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="h-7 px-3 rounded-lg bg-purple-600 flex items-center text-[10px] font-bold text-white">
              + Yeni
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-hidden bg-gray-50/50">
          {/* KPI cards */}
          <div className="grid grid-cols-4 gap-2.5 mb-3">
            {KPIS.map((k, i) => {
              const c = COLOR_MAP[k.color as keyof typeof COLOR_MAP]
              return (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -4, scale: 1.03, boxShadow: `0 12px 24px -8px ${c.hex}40` }}
                  style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
                  className="bg-white border border-gray-200 rounded-xl p-3 relative overflow-hidden cursor-pointer transition-colors hover:border-purple-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: c.hex }} />
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">{k.label}</span>
                    <motion.span
                      key={`${bumpKey}-${i}`}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className={`text-[9px] font-bold ${k.positive ? 'text-emerald-600' : 'text-red-500'}`}
                    >
                      {k.delta}
                    </motion.span>
                  </div>
                  <KpiValue kpi={k} delay={0.9 + i * 0.08} />
                  <svg viewBox="0 0 100 28" className="w-full h-5 mt-1.5">
                    <defs>
                      <linearGradient id={`sp-${i}`} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={c.hex} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={c.hex} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d={`${buildSparkPath(k.spark)} L 100 28 L 0 28 Z`}
                      fill={`url(#sp-${i})`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 + i * 0.08, duration: 0.6 }}
                    />
                    <motion.path
                      d={buildSparkPath(k.spark)}
                      fill="none"
                      stroke={c.hex}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.9 + i * 0.08, duration: 1, ease: 'easeOut' }}
                    />
                  </svg>
                </motion.div>
              )
            })}
          </div>

          {/* Chart + Donut */}
          <div className="grid grid-cols-3 gap-2.5 mb-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              whileHover={{ y: -2, boxShadow: '0 16px 32px -10px rgba(113, 75, 103, 0.25)' }}
              style={{ transformStyle: 'preserve-3d', transform: 'translateZ(15px)' }}
              className="col-span-2 bg-white border border-gray-200 rounded-xl p-3.5 relative overflow-hidden hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">
                    Gelir Trendi
                  </div>
                  <div className="text-sm font-bold text-gray-900">Son 12 Hafta</div>
                </div>
                <div className="flex gap-1">
                  {['1H', '1A', '3A', '1Y'].map((p, i) => (
                    <span
                      key={p}
                      className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                        i === 2 ? 'bg-purple-100 text-purple-700' : 'text-gray-400'
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative" style={{ height: chartH }}>
                {/* Live scanning beam — sweeps across chart */}
                <motion.div
                  aria-hidden
                  className="absolute inset-y-0 w-px pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent, rgba(113, 75, 103,0.5), transparent)',
                    boxShadow: '0 0 14px rgba(113, 75, 103,0.6)',
                  }}
                  animate={{ left: ['0%', '100%', '0%'] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
                <svg viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#714B67" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#714B67" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#875A7B" />
                      <stop offset="100%" stopColor="#714B67" />
                    </linearGradient>
                  </defs>
                  {[0.25, 0.5, 0.75].map((t) => (
                    <line key={t} x1="0" x2={chartW} y1={chartH * t} y2={chartH * t} stroke="rgba(0,0,0,0.05)" strokeDasharray="4 4" />
                  ))}
                  <motion.path
                    d={area}
                    fill="url(#areaGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                  />
                  <motion.path
                    d={line}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 1.6, ease: 'easeInOut' }}
                  />
                </svg>

                <div
                  className="absolute"
                  style={{
                    left: `calc(${(lastX / chartW) * 100}% - 6px)`,
                    top: `calc(${(lastY / chartH) * 100}% - 6px)`,
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-purple-500 animate-ping opacity-40" />
                    <div className="relative w-3 h-3 rounded-full bg-purple-600 ring-2 ring-white" />
                  </div>
                </div>

                <div
                  className="absolute bg-gray-900 text-white rounded-lg px-2 py-1.5 shadow-xl text-[9px] whitespace-nowrap"
                  style={{
                    left: `calc(${(lastX / chartW) * 100}% - 70px)`,
                    top: `calc(${(lastY / chartH) * 100}% - 50px)`,
                  }}
                >
                  <div className="text-gray-400 text-[8px]">Bu hafta</div>
                  <div className="font-bold">₺94.2K</div>
                  <div className="text-emerald-400 text-[8px] font-semibold">▲ 14.8%</div>
                </div>
              </div>
            </motion.div>

            {/* Donut */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.4 }}
              whileHover={{ y: -2, scale: 1.02, boxShadow: '0 16px 32px -10px rgba(113, 75, 103, 0.25)' }}
              style={{ transformStyle: 'preserve-3d', transform: 'translateZ(15px)' }}
              className="bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col hover:border-purple-300 transition-colors group"
            >
              <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">
                Satış Dağılımı
              </div>
              <div className="text-sm font-bold text-gray-900 mb-2">Bu Ay</div>

              <div className="relative w-20 h-20 mx-auto mb-3 transition-transform duration-700 group-hover:rotate-[20deg]">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3.2" />
                  <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke="#714B67" strokeWidth="3.2" strokeLinecap="round"
                    initial={{ strokeDasharray: '0 100' }}
                    animate={{ strokeDasharray: '52 100' }}
                    transition={{ delay: 1.4, duration: 1.2, ease: 'easeOut' }}
                  />
                  <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke="#2563eb" strokeWidth="3.2" strokeDashoffset="-52" strokeLinecap="round"
                    initial={{ strokeDasharray: '0 100' }}
                    animate={{ strokeDasharray: '28 100' }}
                    transition={{ delay: 1.9, duration: 0.9, ease: 'easeOut' }}
                  />
                  <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke="#059669" strokeWidth="3.2" strokeDashoffset="-80" strokeLinecap="round"
                    initial={{ strokeDasharray: '0 100' }}
                    animate={{ strokeDasharray: '20 100' }}
                    transition={{ delay: 2.3, duration: 0.8, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-sm font-black text-gray-900 leading-none">₺348K</div>
                  <div className="text-[8px] text-gray-400 mt-0.5">toplam</div>
                </div>
              </div>

              <div className="space-y-1">
                {[
                  { color: '#714B67', label: 'Yazılım', val: '52%' },
                  { color: '#2563eb', label: 'Danışmanlık', val: '28%' },
                  { color: '#059669', label: 'Eğitim', val: '20%' },
                ].map((d) => (
                  <div key={d.label} className="flex items-center gap-1.5 text-[9px]">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-gray-500 flex-1">{d.label}</span>
                    <span className="text-gray-900 font-semibold">{d.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent orders table */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.4 }}
            whileHover={{ y: -2, boxShadow: '0 16px 32px -10px rgba(113, 75, 103, 0.25)' }}
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden relative hover:border-purple-300 transition-colors"
          >
            {/* Live new order pop-up */}
            <AnimatePresence>
              {orderIdx !== null && (
                <motion.div
                  key={orderIdx}
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
                  className="absolute top-2 right-2 z-20 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                >
                  <span className="text-sm">{NEW_ORDERS[orderIdx].emoji}</span>
                  <div className="text-[9px] leading-tight">
                    <div className="font-bold">Yeni sipariş</div>
                    <div className="opacity-90">{NEW_ORDERS[orderIdx].name} · {NEW_ORDERS[orderIdx].amount}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-gray-100">
              <div className="text-[10px] text-gray-700 font-semibold">Son Siparişler</div>
              <span className="text-[9px] text-purple-600 font-semibold">Tümünü Gör →</span>
            </div>
            {ROWS.map((r, i) => (
              <div key={r.name} className={`flex items-center gap-3 px-3.5 py-2 ${i < ROWS.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">
                  {r.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold text-gray-900 truncate">{r.name}</div>
                  <div className="text-[8px] text-gray-500 truncate">{r.company}</div>
                </div>
                <div className="text-[10px] font-bold text-gray-900">{r.amount}</div>
                <div className={`text-[8px] font-semibold px-1.5 py-0.5 rounded ${r.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                  {r.status}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function SidebarItem({
  icon, label, active = false, badge,
}: { icon: string; label: string; active?: boolean; badge?: string }) {
  return (
    <div
      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-medium ${
        active ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <SidebarIcon name={icon} active={active} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
          badge === 'new' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}>
          {badge}
        </span>
      )}
    </div>
  )
}

function SidebarIcon({ name, active }: { name: string; active: boolean }) {
  const color = active ? '#714B67' : '#6b7280'
  const cls = 'w-3.5 h-3.5 flex-shrink-0'
  const stroke = { stroke: color, strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

  switch (name) {
    case 'home':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    case 'users':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    case 'box':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
    case 'shopping':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
    case 'chart':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    case 'briefcase':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    case 'report':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    default:
      return null
  }
}
