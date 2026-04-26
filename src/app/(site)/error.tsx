'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react'

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error)
    }
  }, [error])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-white relative overflow-hidden">
      {/* Soft mauve glow */}
      <div
        aria-hidden
        className="absolute -top-32 -right-20 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.10) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(135, 90, 123, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-50 border border-red-100 text-red-500 mb-6 shadow-soft">
          <AlertTriangle className="w-10 h-10" strokeWidth={1.75} />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Beklenmedik Hata
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Bir şeyler ters gitti
        </h1>
        <p className="text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">
          Sayfayı yüklerken beklenmedik bir sorun oluştu. Çoğunlukla yenilemek işe yarar —
          eğer devam ederse bize ulaşabilirsiniz, hızlıca bakarız.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all hover:-translate-y-0.5 shadow-button min-h-[48px]"
          >
            <RefreshCw className="w-4 h-4" />
            Tekrar Dene
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-semibold hover:border-purple-300 hover:bg-purple-50 transition-all min-h-[48px]"
          >
            <Home className="w-4 h-4" />
            Ana Sayfa
          </Link>
        </div>

        <Link
          href="/iletisim"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-700 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Sorunu bize bildir
        </Link>

        {error.digest && (
          <p className="text-xs text-gray-400 mt-8 font-mono bg-gray-50 inline-block px-3 py-1 rounded">
            Hata kodu: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
