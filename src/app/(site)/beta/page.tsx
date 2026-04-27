'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Lock, Zap, Heart, ArrowRight, Check, Loader2 } from 'lucide-react'

export default function BetaPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Beta Tester',
          email: email.trim(),
          message: `BETA başvuru\n\nNeden beta olmak istiyorsun?\n${reason}`,
          subject: 'Beta program başvurusu',
          type: 'CONTACT',
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
    <div className="bg-white">
      <section className="bg-gradient-to-br from-purple-900 via-pink-700 to-amber-700 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white text-sm font-semibold mb-6">
            🚀 Beta Program
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-5 tracking-tight">
            Yarının özelliklerini<br />bugün dene.
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Beta tester'lar yeni özelliklere herkesten 2-3 ay önce erişiyor.
            <strong className="text-white"> Kelebek olmaya en yakın grup.</strong>
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Sol: Avantajlar */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Beta üyeliğin avantajları</h2>
              <div className="space-y-5">
                {[
                  { icon: Zap, t: 'Erken erişim', d: 'Yeni özellikler herkesten 2-3 ay önce sende.' },
                  { icon: Heart, t: 'Direkt etki', d: 'Geri bildirimleriniz ürün yol haritasını şekillendirir.' },
                  { icon: Lock, t: 'Yarı fiyat (Pro paket)', d: 'Beta süresince Pro paket ₺499 (normal ₺999).' },
                  { icon: Sparkles, t: 'Özel rozet + erken kullanıcı sertifikası', d: 'Profilinizde "Founding User" rozeti.' },
                  { icon: ArrowRight, t: 'Founder ile direkt görüşme', d: 'Aylık 1-on-1 (30 dk) ürün yöneticisi ile.' },
                ].map((it, i) => {
                  const Icon = it.icon
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0 w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-0.5">{it.t}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{it.d}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-100">
                <p className="text-sm text-amber-900 leading-relaxed">
                  ⚠️ <strong>Beklenti:</strong> Beta tester olarak ayda en az 1 saat geri bildirim, anket veya görüşme bekleniyor.
                  Hata yaşadığınızda anında bildirmeniz gerekiyor. Bunun karşılığında erken erişim + indirim alıyorsunuz.
                </p>
              </div>
            </div>

            {/* Sağ: Form */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
              {done ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-900 mb-2">Başvurun alındı! 🎉</h3>
                  <p className="text-gray-600 mb-6">
                    Beta program kontenjanı sınırlı. Ekibimiz başvurunu inceleyip 5 iş günü içinde dönüş yapacak.
                  </p>
                  <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all">
                    Ana sayfaya dön →
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
                      ⏳ Sınırlı kontenjan
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Beta üyelik başvurusu</h3>
                    <p className="text-sm text-gray-600">3 alan + bir cümle. 2 dakika.</p>
                  </div>

                  <form onSubmit={submit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Ad Soyad"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-sm bg-white"
                    />
                    <input
                      type="email"
                      placeholder="E-posta"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-sm bg-white"
                    />
                    <textarea
                      placeholder="Neden beta olmak istiyorsun? (Kısa ve dürüst ol — biraz ilgilensek yeter.)"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={4}
                      required
                      maxLength={500}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-sm bg-white resize-none"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm hover:-translate-y-0.5 transition-all shadow-lg disabled:opacity-60"
                    >
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...</> : <>Beta\'ya başvur <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
