'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import KoozaLogo from '@/components/site/KoozaLogo'

interface MenuItem {
  id: string
  label: string
  url: string
  children?: MenuItem[]
}

interface HeaderProps {
  settings: Record<string, string>
  menuItems: MenuItem[]
}

export default function Header({ settings, menuItems }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const siteName = settings.site_name || 'kooza'
  const logo = settings.site_logo

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-50'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-20 lg:h-24">
          {/* KOOZA logo — double-O mark + wordmark */}
          <Link href="/" className="shrink-0 flex items-center gap-2.5" aria-label="kooza">
            {logo ? (
              <Image
                src={logo}
                alt={siteName}
                width={300}
                height={300}
                className="h-12 w-auto object-contain"
              />
            ) : (
              <>
                <KoozaLogo className="h-9" variant="mark" color="#714B67" accentColor="#875A7B" />
                <span className="text-2xl font-black text-gray-900 tracking-tight lowercase">kooza</span>
              </>
            )}
          </Link>

          {/* Desktop Nav — absolute centered to viewport, not to available space */}
          <nav className="hidden lg:flex items-center justify-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {menuItems.filter((m) => m.url !== '/demo').map((item) =>
              item.children && item.children.length > 0 ? (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={cn(
                      'group flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-base font-semibold tracking-tight transition-all duration-200 relative',
                      pathname.startsWith(item.url)
                        ? 'text-[#714B67]'
                        : 'text-gray-700 hover:text-[#714B67]'
                    )}
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        className={cn(
                          'absolute -bottom-1 left-0 h-0.5 bg-[#714B67] transition-all duration-300',
                          pathname.startsWith(item.url)
                            ? 'w-full'
                            : 'w-0 group-hover:w-full'
                        )}
                      />
                    </span>
                    <svg
                      className={cn('w-4 h-4 transition-transform duration-200', openDropdown === item.id && 'rotate-180')}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {openDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.url}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#714B67]/5 hover:text-[#714B67] transition-colors"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FFC0CB]" />
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.id}
                  href={item.url}
                  className={cn(
                    'group px-4 py-2.5 rounded-xl text-base font-semibold tracking-tight transition-all duration-200 relative hover:-translate-y-0.5',
                    pathname === item.url
                      ? 'text-[#714B67]'
                      : 'text-gray-700 hover:text-[#714B67]'
                  )}
                >
                  <span className="relative inline-block">
                    {item.label}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-0.5 bg-[#714B67] transition-all duration-300',
                        pathname === item.url
                          ? 'w-full'
                          : 'w-0 group-hover:w-full'
                      )}
                    />
                  </span>
                </Link>
              )
            )}
          </nav>

          {/* Right side: Sign in to products + Demo CTA */}
          <div className="hidden lg:flex ml-auto items-center gap-2 shrink-0">
            <Link
              href="/hesabim"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-[#714B67] hover:bg-[#714B67]/5 transition-all"
            >
              👤 Hesabım
            </Link>
            {/* Ürün giriş dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown('product-login')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-[#714B67] hover:bg-[#714B67]/5 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Giriş
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <AnimatePresence>
                {openDropdown === 'product-login' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 overflow-hidden"
                  >
                    <div className="px-2 pb-2 mb-2 border-b border-gray-100">
                      <div className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">10 ÜRÜN · GİRİŞ</div>
                      <div className="text-xs text-gray-500">Aboneliğin yoksa <a href="/fiyatlandirma" className="text-purple-700 font-semibold hover:underline">fiyatlandırma</a></div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {[
                        { url: 'https://randevu.kooza.tr/login', emoji: '📅', name: 'Randevu', sub: 'Klinik · Kuaför', live: true },
                        { url: 'https://egitim.kooza.tr/login', emoji: '🎓', name: 'Eğitim', sub: 'Kurs · Dershane', live: true },
                        { url: 'https://mesken.kooza.tr/login', emoji: '🏘️', name: 'Mesken', sub: 'Site · Apartman', live: true },
                        { url: 'https://tamir.kooza.tr/login', emoji: '🔧', name: 'Tamir', sub: 'Teknik servis', live: true },
                        { url: 'https://hukuk.kooza.tr/login', emoji: '⚖️', name: 'Hukuk', sub: 'Avukat · Dava', live: true },
                        { url: 'https://insaat.kooza.tr/login', emoji: '🏗️', name: 'İnşaat', sub: 'Müteahhit', live: true },
                        { url: 'https://emlak.kooza.tr', emoji: '🏠', name: 'Emlak', sub: 'Gayrimenkul', live: true },
                        { url: 'https://servis.kooza.tr/demo', emoji: '🍽️', name: 'Servis', sub: 'Restoran POS', beta: true },
                        { url: 'https://muhasebe.kooza.tr', emoji: '💰', name: 'Muhasebe', sub: 'e-Fatura · Cari', live: true },
                        { url: 'https://ik.kooza.tr', emoji: '👥', name: 'İK', sub: 'Personel · Bordro', beta: true },
                      ].map((p) => (
                        <a
                          key={p.url}
                          href={p.url}
                          target="_blank"
                          rel="noopener"
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm hover:bg-[#714B67]/5 hover:scale-[1.02] transition-all group"
                        >
                          <span className="text-2xl group-hover:scale-110 transition-transform shrink-0">{p.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-sm text-gray-900 group-hover:text-[#714B67]">kooza {p.name}</span>
                              <span className={`text-[8px] font-black px-1.5 rounded-full ${
                                p.live
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}>
                                {p.live ? 'CANLI' : 'BETA'}
                              </span>
                            </div>
                            <div className="text-[10px] text-gray-500 truncate">{p.sub}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                    {/* KOM hub link */}
                    <a
                      href="https://kom.kooza.tr"
                      target="_blank"
                      rel="noopener"
                      className="mt-2 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 text-sm hover:shadow-md transition-all"
                    >
                      <span className="text-xl">🦋</span>
                      <div className="flex-1">
                        <div className="font-bold text-purple-900">KOM — Operasyon Merkezi</div>
                        <div className="text-[10px] text-purple-700">Tüm ürünlere tek panel</div>
                      </div>
                      <span className="text-purple-700 font-bold">→</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {(() => {
              const demoItem = menuItems.find((m) => m.url === '/demo')
              return demoItem ? (
                <Link
                  href={demoItem.url}
                  className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-[#714B67] text-white hover:bg-[#5d3e55] shadow-md shadow-[#714B67]/30 transition-all"
                >
                  {demoItem.label}
                </Link>
              ) : null
            })()}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden ml-auto p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1.5 relative">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-gray-700 rounded-full origin-center transition-all"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block h-0.5 bg-gray-700 rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-gray-700 rounded-full origin-center transition-all"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Ürün girişleri — mobile */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <a
                  href="https://randevu.kooza.tr/login"
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-start px-3 py-2.5 rounded-xl text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 relative"
                >
                  <span className="absolute top-1 right-2 text-[8px] font-bold text-emerald-600">CANLI</span>
                  <span className="text-base">📅</span>
                  <span className="font-semibold text-xs mt-1">Randevu</span>
                </a>
                <a
                  href="https://servis.kooza.tr"
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-start px-3 py-2.5 rounded-xl text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 relative"
                >
                  <span className="absolute top-1 right-2 text-[8px] font-bold text-emerald-600">CANLI</span>
                  <span className="text-base">🍽️</span>
                  <span className="font-semibold text-xs mt-1">Servis</span>
                </a>
                <a
                  href="https://egitim.kooza.tr/login"
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-start px-3 py-2.5 rounded-xl text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 relative"
                >
                  <span className="absolute top-1 right-2 text-[8px] font-bold text-emerald-600">CANLI</span>
                  <span className="text-base">🎓</span>
                  <span className="font-semibold text-xs mt-1">Eğitim</span>
                </a>
                <a
                  href="https://emlak.kooza.tr"
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-start px-3 py-2.5 rounded-xl text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 relative"
                >
                  <span className="absolute top-1 right-2 text-[8px] font-bold text-emerald-600">CANLI</span>
                  <span className="text-base">🏠</span>
                  <span className="font-semibold text-xs mt-1">Emlak</span>
                </a>
                <a
                  href="https://mesken.kooza.tr"
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-start px-3 py-2.5 rounded-xl text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 relative"
                >
                  <span className="absolute top-1 right-2 text-[8px] font-bold text-emerald-600">CANLI</span>
                  <span className="text-base">🏘️</span>
                  <span className="font-semibold text-xs mt-1">Mesken</span>
                </a>
                <a
                  href="https://tamir.kooza.tr"
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-start px-3 py-2.5 rounded-xl text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 relative"
                >
                  <span className="absolute top-1 right-2 text-[8px] font-bold text-emerald-600">CANLI</span>
                  <span className="text-base">🔧</span>
                  <span className="font-semibold text-xs mt-1">Tamir</span>
                </a>
                <a
                  href="https://hukuk.kooza.tr"
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-start px-3 py-2.5 rounded-xl text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 relative"
                >
                  <span className="absolute top-1 right-2 text-[8px] font-bold text-emerald-600">CANLI</span>
                  <span className="text-base">⚖️</span>
                  <span className="font-semibold text-xs mt-1">Hukuk</span>
                </a>
                <a
                  href="https://insaat.kooza.tr"
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-start px-3 py-2.5 rounded-xl text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 relative"
                >
                  <span className="absolute top-1 right-2 text-[8px] font-bold text-emerald-600">CANLI</span>
                  <span className="text-base">🏗️</span>
                  <span className="font-semibold text-xs mt-1">İnşaat</span>
                </a>
                <a
                  href="https://muhasebe.kooza.tr"
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-start px-3 py-2.5 rounded-xl text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 relative"
                >
                  <span className="absolute top-1 right-2 text-[8px] font-bold text-emerald-600">CANLI</span>
                  <span className="text-base">💰</span>
                  <span className="font-semibold text-xs mt-1">Muhasebe</span>
                </a>
                <a
                  href="https://ik.kooza.tr"
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-start px-3 py-2.5 rounded-xl text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 relative"
                >
                  <span className="absolute top-1 right-2 text-[8px] font-bold text-emerald-600">CANLI</span>
                  <span className="text-base">👥</span>
                  <span className="font-semibold text-xs mt-1">İK</span>
                </a>
              </div>

              {menuItems.map((item) => (
                <div key={item.id}>
                  <Link
                    href={item.url}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                      item.url === '/demo'
                        ? 'bg-[#714B67] text-white mt-2 shadow-md'
                        : pathname === item.url
                        ? 'text-[#714B67] bg-[#714B67]/5'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={child.url}
                      className="flex items-center gap-2 pl-10 pr-4 py-2.5 text-sm text-gray-400 hover:text-blue-600 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}

              {/* Mobile contact info */}
              {settings.site_phone && (
                <a
                  href={`tel:${settings.site_phone}`}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {settings.site_phone}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
