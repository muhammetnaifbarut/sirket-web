'use client'

import { useState } from 'react'
import { Bell, ArrowRight, Check, Smartphone, Wifi, Layers } from 'lucide-react'

export default function MobilUygulamaPage() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Mobile App Waitlist',
          email: email.trim(),
          message: 'Mobil uygulama erken erişim talebi',
          subject: 'Mobil App Waitlist',
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
    <div className="bg-white">
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur border border-amber-400/30 text-amber-200 text-sm font-semibold mb-6">
              📱 Yakında — Mayıs 2026
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
              kooza cebinde.
            </h1>
            <p className="text-lg text-purple-100 leading-relaxed mb-8">
              iOS + Android native mobil uygulama. Randevu, satış, müşteri, bildirim — her şey cebinde, parmağının ucunda.
              <strong className="text-white"> Erken erişim listesine katıl, ilk biz sana haber verelim.</strong>
            </p>

            {done ? (
              <div className="bg-emerald-500/15 border border-emerald-400/30 rounded-2xl p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-emerald-300" strokeWidth={3} />
                  <div>
                    <div className="font-bold text-white">Listedesin! 🎉</div>
                    <div className="text-sm text-emerald-200">Lansmanda ilk sana haber vereceğiz.</div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="E-posta adresin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur text-white placeholder:text-white/50 outline-none focus:border-white/40 text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-purple-700 font-bold text-sm hover:-translate-y-0.5 transition-all shadow-xl disabled:opacity-60"
                >
                  <Bell className="w-4 h-4" />
                  Erken erişim
                </button>
              </form>
            )}

            <div className="mt-8 flex items-center gap-4">
              <div className="opacity-60 px-3 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-xs">
                <div className="text-white/70 text-[10px]">Yakında</div>
                <div className="font-bold text-white">App Store</div>
              </div>
              <div className="opacity-60 px-3 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-xs">
                <div className="text-white/70 text-[10px]">Yakında</div>
                <div className="font-bold text-white">Google Play</div>
              </div>
            </div>
          </div>

          {/* Mockup */}
          <div className="hidden lg:block">
            <div className="relative mx-auto w-72 h-[600px] bg-gradient-to-br from-purple-700 to-pink-600 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-900/50">
              <div className="w-full h-full bg-white rounded-[2.4rem] overflow-hidden p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4 pt-4">
                  <div className="text-xs font-bold text-gray-900">9:41</div>
                  <div className="flex gap-1">
                    <Wifi className="w-3 h-3 text-gray-700" />
                  </div>
                </div>
                <div className="text-2xl font-black text-purple-700 mb-1">kooza</div>
                <div className="text-xs text-gray-500 mb-5">Hoş geldin Mehmet 👋</div>
                <div className="space-y-3 mb-5">
                  <div className="bg-purple-100 rounded-2xl p-3">
                    <div className="text-[10px] text-purple-700 font-semibold">Bugünkü ciro</div>
                    <div className="text-xl font-bold text-gray-900">₺18.4K</div>
                  </div>
                  <div className="bg-emerald-100 rounded-2xl p-3">
                    <div className="text-[10px] text-emerald-700 font-semibold">Yeni randevu</div>
                    <div className="text-xl font-bold text-gray-900">12</div>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-2xl p-3">
                  <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">Son aktivite</div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Yemeksepeti'nden 3 sipariş
                    </div>
                    <div className="text-xs text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Yeni müşteri: Ayşe K.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">Mobil uygulamada neler olacak?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, t: 'Native iOS + Android', d: 'Hızlı, akıcı — Web değil, gerçek native uygulama.' },
              { icon: Wifi, t: 'Offline çalışır', d: 'İnternet kesilse bile satış/randevu alabilirsin, otomatik senkron.' },
              { icon: Bell, t: 'Anlık bildirim', d: 'Yeni sipariş, randevu, ödeme — telefonda anında bildiri.' },
              { icon: Layers, t: 'Her modül', d: 'Web\'deki her özellik mobilde de var.' },
              { icon: Smartphone, t: 'Barkod tarama', d: 'Kameranı barkod okuyucu olarak kullan.' },
              { icon: Bell, t: 'Push to WhatsApp', d: 'Bildirimi WhatsApp\'a da çevirebilirsin.' },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-purple-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{f.t}</h3>
                  <p className="text-sm text-gray-600">{f.d}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
