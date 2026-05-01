'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'

function HesabimContent() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/subscription/list?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Hata')
      setSubscriptions(data.subscriptions || [])
      setSearched(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const productEmoji: Record<string, string> = {
    randevu: '📅', egitim: '🎓', mesken: '🏘️', tamir: '🔧', hukuk: '⚖️',
    insaat: '🏗️', emlak: '🏠', servis: '🍽️', muhasebe: '💰', ik: '👥',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 text-sm font-semibold mb-4">
          ← Ana Sayfaya Dön
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">📋 Aboneliklerim</h1>
          <p className="text-gray-600 mb-8">
            Email adresinle giriş yap, kooza ekosistemindeki tüm aboneliklerini gör.
          </p>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="kayıt olduğun email adresi"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-xl disabled:opacity-50"
              >
                {loading ? '...' : 'Bul'}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
              ❌ {error}
            </div>
          )}

          {searched && subscriptions.length === 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-3">🔍</div>
              <h3 className="font-bold text-amber-900 mb-2">Bu email ile abonelik bulunamadı</h3>
              <p className="text-amber-700 text-sm mb-4">
                Henüz kayıt olmadıysan veya farklı bir email kullandıysan tekrar dene.
              </p>
              <Link
                href="/fiyatlandirma"
                className="inline-block px-5 py-2 bg-purple-700 text-white font-bold rounded-xl hover:bg-purple-600"
              >
                Şimdi kayıt ol
              </Link>
            </div>
          )}

          {subscriptions.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>{email}</strong> için {subscriptions.length} abonelik bulundu:
              </p>
              {subscriptions.map((sub) => {
                const emoji = productEmoji[sub.productId.toLowerCase()] || '🦋'
                const isActive = sub.status === 'ACTIVE' || sub.status === 'TRIAL'
                const productUrl = `https://${sub.productId.toLowerCase()}.kooza.tr`
                return (
                  <div key={sub.id} className="border border-gray-200 rounded-2xl p-5 hover:border-purple-300 transition">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{emoji}</div>
                        <div>
                          <h3 className="font-bold text-gray-900">{sub.productName}</h3>
                          <p className="text-sm text-gray-500">{sub.planName} · {sub.amount} ₺/ay</p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          isActive
                            ? 'bg-emerald-100 text-emerald-700'
                            : sub.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <a
                        href={`${productUrl}/login`}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white text-sm font-bold rounded-lg"
                      >
                        🚀 {sub.productName} Aç →
                      </a>
                      <Link
                        href="/iletisim"
                        className="inline-flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg"
                      >
                        💬 Destek
                      </Link>
                    </div>
                  </div>
                )
              })}

              <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 text-sm">
                <p className="font-bold text-purple-900 mb-1">💡 Yeni ürün eklemek ister misin?</p>
                <Link href="/fiyatlandirma" className="text-purple-700 hover:underline font-semibold text-sm">
                  Diğer kooza ürünlerini gör →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function HesabimPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>}>
      <HesabimContent />
    </Suspense>
  )
}
