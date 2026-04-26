'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import toast from 'react-hot-toast'

interface Notification {
  id: string
  title: string
  message: string
  type: string
  isRead: boolean
  link: string | null
  createdAt: string
}

const TYPE_CONFIG: Record<string, { icon: string; bg: string; text: string }> = {
  info: { icon: 'ℹ️', bg: 'bg-blue-50', text: 'text-blue-700' },
  success: { icon: '✅', bg: 'bg-green-50', text: 'text-green-700' },
  warning: { icon: '⚠️', bg: 'bg-amber-50', text: 'text-amber-700' },
  error: { icon: '🚨', bg: 'bg-red-50', text: 'text-red-700' },
}

export default function BildirimlerPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    fetch('/api/admin/notifications')
      .then((r) => r.json())
      .then((d) => {
        setNotifications(d.notifications || [])
        setUnreadCount(d.unreadCount || 0)
        setLoading(false)
      })
  }, [])

  const markRead = async (id?: string) => {
    await fetch('/api/admin/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id ? { id } : { markAll: true }),
    })
    if (id) {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
      setUnreadCount((c) => Math.max(0, c - 1))
    } else {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
      setUnreadCount(0)
      toast.success('Tüm bildirimler okundu olarak işaretlendi')
    }
  }

  const unread = notifications.filter((n) => !n.isRead)
  const read = notifications.filter((n) => n.isRead)

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bildirimler</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-blue-600 mt-0.5">{unreadCount} okunmamış bildirim</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={() => markRead()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors">
            Tümünü Okundu İşaretle
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-3">🔔</div>
          <p className="font-medium">Bildirim yok</p>
        </div>
      ) : (
        <div className="space-y-5">
          {unread.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Okunmamış</p>
              <div className="space-y-2">
                {unread.map((n) => {
                  const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.info
                  return (
                    <div key={n.id} className={`rounded-2xl border border-transparent p-4 ${cfg.bg} flex items-start gap-3`}>
                      <span className="text-xl flex-shrink-0">{cfg.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm ${cfg.text}`}>{n.title}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {format(new Date(n.createdAt), 'dd MMM yyyy, HH:mm', { locale: tr })}
                        </p>
                      </div>
                      <button onClick={() => markRead(n.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-white text-gray-600 hover:bg-gray-100 flex-shrink-0 transition-colors">
                        Okundu
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {read.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Okunmuş</p>
              <div className="space-y-2">
                {read.map((n) => {
                  const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.info
                  return (
                    <div key={n.id} className="rounded-2xl border border-gray-100 bg-white p-4 flex items-start gap-3 opacity-60">
                      <span className="text-xl flex-shrink-0">{cfg.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-700">{n.title}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {format(new Date(n.createdAt), 'dd MMM yyyy, HH:mm', { locale: tr })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
