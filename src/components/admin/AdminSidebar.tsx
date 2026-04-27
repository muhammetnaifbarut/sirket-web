'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    label: 'Genel',
    items: [
      { href: '/admin', label: 'Dashboard', icon: HomeIcon },
      { href: '/admin/leads', label: 'Form Talepler', icon: InboxIcon, badge: true },
      { href: '/admin/olgunluk-testi', label: 'Olgunluk Testi', icon: ChartIcon },
      { href: '/admin/rehber-talepleri', label: 'Rehber Talepleri', icon: FileTextIcon },
      { href: '/admin/crm', label: 'CRM Pipeline', icon: PipelineIcon },
      { href: '/admin/bildirimler', label: 'Bildirimler', icon: BellIcon },
    ],
  },
  {
    label: 'İçerik',
    items: [
      { href: '/admin/urunler', label: 'Yazılım Ürünleri', icon: PackageIcon },
      { href: '/admin/cozumler', label: 'Sektör Çözümleri', icon: BriefcaseIcon },
      { href: '/admin/vaka-calismalari', label: 'Vaka Çalışmaları', icon: StarIcon },
      { href: '/admin/hizmetler', label: 'Danışmanlık', icon: BriefcaseIcon },
      { href: '/admin/fiyatlandirma', label: 'Fiyatlandırma', icon: TagIcon },
      { href: '/admin/blog', label: 'Blog', icon: FileTextIcon },
      { href: '/admin/blog/oto', label: 'AI Blog Üret', icon: SparkleIcon },
      { href: '/admin/faq', label: 'SSS Yönetimi', icon: QuestionIcon },
    ],
  },
  {
    label: 'Ana Sayfa',
    items: [
      { href: '/admin/anasayfa', label: 'Anasayfa Ayarları', icon: LayoutIcon },
      { href: '/admin/hero', label: 'Hero Bölümü', icon: PlayIcon },
      { href: '/admin/hero-ticker', label: 'Aktivite Şeridi', icon: MegaphoneIcon },
      { href: '/admin/hero-stats', label: 'Hero İstatistikleri', icon: ChartIcon },
      { href: '/admin/moduller', label: 'Modüller', icon: PackageIcon },
      { href: '/admin/surec', label: 'Nasıl Çalışıyoruz', icon: StepsIcon },
      { href: '/admin/neden-biz', label: 'Neden Biz?', icon: StarIcon },
      { href: '/admin/musteriler', label: 'Müşteri Logoları', icon: BuildingIcon },
      { href: '/admin/popup', label: 'Popup Yönetimi', icon: PopupIcon },
      { href: '/admin/banner', label: 'Banner Yönetimi', icon: MegaphoneIcon },
      { href: '/admin/chatbot', label: 'AI Chatbot', icon: BotIcon },
      { href: '/admin/chatbot/konusmalar', label: 'Konuşmalar', icon: ChatIcon },
    ],
  },
  {
    label: 'Analitik',
    items: [
      { href: '/admin/raporlar', label: 'Raporlar & Grafikler', icon: ChartIcon },
      { href: '/admin/loglar', label: 'Aktivite Logları', icon: LogIcon },
    ],
  },
  {
    label: 'Site Yönetimi',
    items: [
      { href: '/admin/menu', label: 'Menü', icon: MenuIcon },
      { href: '/admin/sayfalar', label: 'Sayfalar', icon: LayoutIcon },
      { href: '/admin/referanslar', label: 'Referanslar', icon: StarIcon },
      { href: '/admin/medya', label: 'Medya', icon: ImageIcon },
    ],
  },
  {
    label: 'Ayarlar',
    items: [
      { href: '/admin/tema', label: 'Tema & Renkler', icon: PaletteIcon },
      { href: '/admin/ayarlar', label: 'Site Ayarları', icon: SettingsIcon },
      { href: '/admin/kullanicilar', label: 'Kullanıcılar', icon: UsersIcon },
    ],
  },
]

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        // Mobile: fixed overlay, slide in/out
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col h-full shrink-0 transition-transform duration-300 ease-in-out',
        // Desktop: always visible, relative positioning
        'lg:relative lg:translate-x-0 lg:z-auto',
        // Mobile open/close
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
      )}
    >
      {/* Logo */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5" onClick={onClose}>
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm leading-none">kooza</p>
            <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
          </div>
        </Link>
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/admin' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'admin-sidebar-item',
                      isActive && 'active'
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-purple-700 transition-colors"
          onClick={onClose}
        >
          <ExternalLinkIcon className="w-3.5 h-3.5" />
          Siteyi Görüntüle
        </Link>
      </div>
    </aside>
  )
}

// Icon components
function HomeIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
}
function InboxIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
}
function PackageIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
}
function BriefcaseIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
}
function TagIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
}
function FileTextIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
}
function MenuIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16"/></svg>
}
function LayoutIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
}
function StarIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
}
function ImageIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
}
function PaletteIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
}
function SettingsIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
}
function UsersIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
}
function ExternalLinkIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
}
function PlayIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
}
function StepsIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
}
function BuildingIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
}
function BotIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
}
function ChatIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
}
function ChartIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
}
function SparkleIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
}
function PipelineIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>
}
function BellIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
}
function QuestionIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
}
function PopupIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
}
function MegaphoneIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
}
function LogIcon(p: any) {
  return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
}
