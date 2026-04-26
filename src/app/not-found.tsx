'use client'

import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-white">
      {/* Soft mauve glow */}
      <div
        aria-hidden
        className="absolute -top-32 -right-20 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(135, 90, 123, 0.20) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(251, 146, 60, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 text-center max-w-lg">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          Sayfa Bulunamadı
        </div>

        <h1 className="text-[8rem] sm:text-[10rem] font-black text-purple-600 leading-none tracking-tighter mb-2">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          Bu sayfa kaybolmuş 🔍
        </h2>
        <p className="text-gray-600 leading-relaxed mb-10 max-w-md mx-auto">
          Aradığın sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          Endişelenme — buradan devam edebilirsin.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all hover:-translate-y-0.5 shadow-button min-h-[48px]"
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-semibold hover:border-purple-300 hover:bg-purple-50 transition-all min-h-[48px]"
          >
            <Search className="w-4 h-4" />
            Bloga Göz At
          </Link>
        </div>

        <button
          onClick={() => typeof window !== 'undefined' && window.history.back()}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Geri dön
        </button>
      </div>
    </div>
  )
}
