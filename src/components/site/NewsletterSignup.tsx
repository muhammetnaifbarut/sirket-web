'use client'

import { useState } from 'react'
import { Mail, ArrowRight, Check } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: email.trim(),
          subject: 'Newsletter abonelik',
          message: 'Footer newsletter signup',
          type: 'NEWSLETTER',
        }),
      })
      setDone(true)
    } catch {
      setDone(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-100/60 to-pink-100/40 rounded-2xl p-6 border border-purple-100">
      <div className="flex items-start gap-3 mb-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-0.5">Haftalık bülten</h4>
          <p className="text-sm text-gray-600">
            KOBİ dijitalleşme ipuçları, sektör haberleri, ürün güncellemeleri.
          </p>
        </div>
      </div>

      {done ? (
        <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-100">
          <Check className="w-5 h-5" strokeWidth={3} />
          Abone oldun! İlk bülten cumartesi.
        </div>
      ) : (
        <form onSubmit={submit} className="flex gap-2">
          <input
            type="email"
            placeholder="ornek@sirket.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="E-posta adresiniz"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-sm bg-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors disabled:opacity-60 inline-flex items-center gap-1.5"
          >
            {loading ? '...' : (
              <>
                Abone ol
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
