'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const PRODUCTS: Record<string, { name: string; emoji: string; plans: Record<string, { name: string; price: number }> }> = {
  randevu: {
    name: 'Randevu', emoji: '📅',
    plans: {
      baslangic: { name: 'Başlangıç', price: 299 },
      pro: { name: 'Pro', price: 599 },
      kurumsal: { name: 'Kurumsal', price: 1299 },
    },
  },
  egitim: {
    name: 'Eğitim', emoji: '🎓',
    plans: {
      baslangic: { name: 'Başlangıç', price: 999 },
      pro: { name: 'Pro', price: 1999 },
      kurumsal: { name: 'Kurumsal', price: 3999 },
    },
  },
  mesken: {
    name: 'Mesken', emoji: '🏘️',
    plans: {
      baslangic: { name: 'Mini Site', price: 499 },
      pro: { name: 'Site', price: 999 },
      kurumsal: { name: 'Yönetim Firması', price: 2499 },
    },
  },
  tamir: {
    name: 'Tamir', emoji: '🔧',
    plans: {
      baslangic: { name: 'Solo', price: 399 },
      pro: { name: 'Ekip', price: 799 },
      kurumsal: { name: 'Çoklu Şube', price: 1499 },
    },
  },
  hukuk: {
    name: 'Hukuk', emoji: '⚖️',
    plans: {
      baslangic: { name: 'Tek Avukat', price: 799 },
      pro: { name: 'Büro', price: 1499 },
      kurumsal: { name: 'Kurumsal', price: 2999 },
    },
  },
  insaat: {
    name: 'İnşaat', emoji: '🏗️',
    plans: {
      baslangic: { name: 'Başlangıç', price: 999 },
      pro: { name: 'Pro', price: 1999 },
      kurumsal: { name: 'Kurumsal', price: 3999 },
    },
  },
  emlak: {
    name: 'Emlak', emoji: '🏠',
    plans: {
      baslangic: { name: 'Başlangıç', price: 599 },
      pro: { name: 'Pro', price: 1199 },
      kurumsal: { name: 'Kurumsal', price: 2499 },
    },
  },
  muhasebe: {
    name: 'Muhasebe', emoji: '💰',
    plans: {
      baslangic: { name: 'Başlangıç', price: 599 },
      pro: { name: 'Pro', price: 1199 },
      kurumsal: { name: 'Kurumsal', price: 2499 },
    },
  },
  ik: {
    name: 'İK', emoji: '👥',
    plans: {
      baslangic: { name: 'Başlangıç', price: 499 },
      pro: { name: 'Pro', price: 999 },
      kurumsal: { name: 'Kurumsal', price: 1999 },
    },
  },
  bundle: {
    name: 'Pro Bundle (10 ürün)', emoji: '🎁',
    plans: {
      baslangic: { name: 'Bundle', price: 1499 },
      pro: { name: 'Pro Bundle', price: 1499 },
      kurumsal: { name: 'Enterprise Bundle', price: 3999 },
    },
  },
}

function KayitForm() {
  const sp = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const [productId, setProductId] = useState((sp.get('product') || 'mesken').toLowerCase())
  const [planSlug, setPlanSlug] = useState((sp.get('plan') || 'baslangic').toLowerCase())

  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    gsmNumber: '',
    company: '',
    taxId: '',
    address: '',
    city: 'İstanbul',
  })

  const product = PRODUCTS[productId] || PRODUCTS.mesken
  const plan = product.plans[planSlug] || product.plans.baslangic

  useEffect(() => {
    const p = (sp.get('product') || 'mesken').toLowerCase()
    const pl = (sp.get('plan') || 'baslangic').toLowerCase()
    if (PRODUCTS[p]) setProductId(p)
    if (product.plans[pl]) setPlanSlug(pl)
  }, [sp])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms) {
      setError('Devam etmek için sözleşmeleri kabul etmelisin.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/subscription/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          productName: `kooza ${product.name}`,
          planSlug,
          planName: plan.name,
          amount: plan.price,
          buyer: {
            name: form.name,
            surname: form.surname,
            email: form.email,
            gsmNumber: form.gsmNumber,
            company: form.company,
            taxId: form.taxId,
            address: form.address,
            city: form.city,
          },
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Bir sorun oluştu')

      // Redirect to iyzico payment page
      window.location.href = data.paymentPageUrl
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/fiyatlandirma" className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 text-sm font-semibold mb-4">
          ← Fiyatlandırmaya Dön
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 to-pink-500 p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{product.emoji}</span>
              <div>
                <h1 className="text-2xl font-black tracking-tight">kooza {product.name}</h1>
                <p className="text-purple-100">{plan.name} paketi</p>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-sm">Aylık</span>
              <span className="text-3xl font-black">{plan.price} ₺</span>
              <span className="text-xs bg-pink-300 text-purple-900 font-bold px-2 py-0.5 rounded-full ml-2">
                14 gün ücretsiz
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Ad *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Naif" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Soyad *</label>
                  <input type="text" value={form.surname} onChange={e => setForm({ ...form, surname: e.target.value })} required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="Barut" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">E-posta *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="seninisim@firma.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Telefon *</label>
                  <input type="tel" value={form.gsmNumber} onChange={e => setForm({ ...form, gsmNumber: e.target.value })} required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="+90 555 555 5555" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Şirket / İşletme Adı</label>
                <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="Demir Hukuk Bürosu" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Vergi/T.C. No</label>
                  <input type="text" value={form.taxId} onChange={e => setForm({ ...form, taxId: e.target.value })} maxLength={11}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="11111111111" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Şehir</label>
                  <input type="text" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Adres</label>
                <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="Mahalle, sokak, no" />
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-200">
                <input type="checkbox" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 rounded" />
                <span className="text-sm text-gray-700 leading-relaxed">
                  <a href="/uyelik-sozlesmesi" target="_blank" className="text-purple-700 hover:underline">Üyelik Sözleşmesi</a>{', '}
                  <a href="/mesafeli-satis" target="_blank" className="text-purple-700 hover:underline">Mesafeli Satış</a>{' ve '}
                  <a href="/kvkk" target="_blank" className="text-purple-700 hover:underline">KVKK Aydınlatma</a> metinlerini okudum, kabul ediyorum.
                </span>
              </label>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-purple-700 to-pink-500 hover:from-purple-600 hover:to-pink-400 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-purple-500/30 text-lg">
                {loading ? '⏳ Ödeme sayfası açılıyor...' : `🚀 Aboneliğe Başla — ${plan.price} ₺/ay`}
              </button>

              <p className="text-center text-xs text-gray-500">
                🔒 Ödeme iyzico üzerinden, PCI-DSS uyumlu · 14 gün koşulsuz iade · Kart bilgisi kooza tarafından saklanmaz
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function KayitPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>}>
      <KayitForm />
    </Suspense>
  )
}
