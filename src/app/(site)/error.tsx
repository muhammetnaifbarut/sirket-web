'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react'

// 🚧 DEBUG MODE — kooza.tr runtime hatası teşhisi için verbose hata sayfası
// Sorun çözüldükten sonra bu dosyayı eski sade haline geri al.

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [healthCheck, setHealthCheck] = useState<any>(null)
  const [loadingHealth, setLoadingHealth] = useState(false)

  useEffect(() => {
    console.error('[SiteError]', error)

    setLoadingHealth(true)
    fetch('/api/health')
      .then((r) => r.json())
      .then((data) => setHealthCheck(data))
      .catch((e) => setHealthCheck({ error: String(e) }))
      .finally(() => setLoadingHealth(false))
  }, [error])

  return (
    <div className="min-h-screen px-4 py-12 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-50 border border-red-100 text-red-500 mb-6">
            <AlertTriangle className="w-10 h-10" strokeWidth={1.75} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Bir şeyler ters gitti</h1>
          <p className="text-gray-600 mb-6">Aşağıdaki teşhisi geliştirici ekibe gönderin.</p>

          <div className="flex gap-3 justify-center mb-6">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Tekrar Dene
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-semibold"
            >
              <Home className="w-4 h-4" />
              Ana Sayfa
            </Link>
          </div>
        </div>

        {/* 🔴 Hata detayı */}
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <h3 className="text-sm font-bold text-red-800 mb-2">🔴 Runtime Hatası</h3>
          <p className="text-xs text-red-900 font-mono break-all mb-2">
            <strong>Mesaj:</strong> {error?.message || '(yok)'}
          </p>
          {error?.name && (
            <p className="text-xs text-red-800 font-mono mb-1">
              <strong>Tür:</strong> {error.name}
            </p>
          )}
          {error?.digest && (
            <p className="text-xs text-red-800 font-mono mb-1">
              <strong>Digest:</strong> {error.digest}
            </p>
          )}
          {error?.stack && (
            <details className="mt-2" open>
              <summary className="text-xs text-red-800 cursor-pointer font-semibold">
                📋 Stack trace (kopyala bana yolla)
              </summary>
              <pre className="text-[10px] text-red-900 whitespace-pre-wrap break-all mt-2 p-2 bg-white rounded border border-red-200 max-h-96 overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}
        </div>

        {/* 🩺 Health check */}
        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <h3 className="text-sm font-bold text-gray-900 mb-2">🩺 Sistem Teşhisi</h3>
          {loadingHealth ? (
            <p className="text-xs text-gray-500">Yükleniyor...</p>
          ) : healthCheck ? (
            <pre className="text-[10px] text-gray-900 whitespace-pre-wrap break-all max-h-64 overflow-auto p-2 bg-white rounded">
              {JSON.stringify(healthCheck, null, 2)}
            </pre>
          ) : (
            <p className="text-xs text-red-600">Health check de başarısız!</p>
          )}
        </div>

        <Link
          href="/iletisim"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-700"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Sorunu bize bildir
        </Link>

        <p className="text-xs text-gray-400 mt-6 text-center">
          kooza Debug Mode · Bu ekran sorun çözüldükten sonra kaldırılır
        </p>
      </div>
    </div>
  )
}
