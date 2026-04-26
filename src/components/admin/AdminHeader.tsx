'use client'

import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AdminHeaderProps {
  session: Session
  onMenuToggle: () => void
}

export default function AdminHeader({ session, onMenuToggle }: AdminHeaderProps) {
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; message: string; type: string; createdAt: string }>>([])

  useEffect(() => {
    const fetchUnread = () => {
      fetch('/api/admin/notifications?unread=true')
        .then((r) => r.json())
        .then((d) => {
          setUnreadCount(d.unreadCount || 0)
          setNotifications(d.notifications || [])
        })
        .catch(() => {})
    }
    fetchUnread()
    const interval = setInterval(fetchUnread, 30000) // 30 saniyede bir kontrol
    return () => clearInterval(interval)
  }, [])

  const markAllRead = async () => {
    await fetch('/api/admin/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markAll: true }),
    })
    setUnreadCount(0)
    setNotifications([])
    setShowNotifications(false)
  }

  const TYPE_ICONS: Record<string, string> = {
    info: 'ℹ️', success: '✅', warning: '⚠️', error: '🚨',
  }

  return (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          aria-label="Menüyü aç"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <p className="text-sm font-semibold text-gray-900">
          {(session.user as any)?.role === 'SUPER_ADMIN' ? '👑 Super Admin' : 'Admin'}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Bildirim Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((v) => !v)}
            className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-gray-900 text-sm">Bildirimler</p>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline">
                    Tümünü Oku
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    Okunmamış bildirim yok
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0">
                      <div className="flex gap-2">
                        <span>{TYPE_ICONS[n.type] || 'ℹ️'}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{n.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="px-4 py-3 border-t border-gray-100">
                <Link
                  href="/admin/bildirimler"
                  onClick={() => setShowNotifications(false)}
                  className="text-sm text-blue-600 hover:underline block text-center"
                >
                  Tüm Bildirimleri Gör →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Siteye Git */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-xl hover:bg-blue-50"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Site
        </Link>

        {/* Kullanıcı */}
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
          <p className="text-xs text-gray-400">{session.user?.email}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
          {session.user?.name?.charAt(0) || 'A'}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/giris' })}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
          title="Çıkış Yap"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
        </button>
      </div>

      {/* Overlay for dropdown */}
      {showNotifications && (
        <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
      )}
    </header>
  )
}
