'use client'

import { useState } from 'react'

export default function OdemeTestPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: 'Naif',
    surname: 'Barut',
    email: 'muhammetnaifbarut@gmail.com',
    gsmNumber: '+905555555555',
    identityNumber: '11111111111',
    address: 'Test Mahallesi, Test Sokak No:1',
    city: 'İstanbul',
    product: 'mesken',
    plan: 'baslangic',
    price: 499,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/payment/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: form.product,
          plan: form.plan,
          price: form.price,
          buyer: {
            name: form.name,
            surname: form.surname,
            email: form.email,
            gsmNumber: form.gsmNumber,
            identityNumber: form.identityNumber,
            address: form.address,
            city: form.city,
          },
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Ödeme başlatılamadı')
      }

      // Redirect to iyzico checkout form
      window.location.href = data.paymentPageUrl
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
              🧪 SANDBOX TEST · Gerçek para çekilmez
            </span>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              💳 iyzico Ödeme Test
            </h1>
            <p className="text-gray-600 text-sm">
              Test için iyzico Sandbox kullanılıyor. Aşağıdaki kart numarasıyla
              başarılı ödeme test edebilirsin:
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 mb-6 text-sm">
            <div className="font-bold text-purple-900 mb-2">🃏 Test Kart Bilgileri</div>
            <div className="grid grid-cols-2 gap-2 text-purple-800">
              <div><strong>Kart No:</strong> 5400 0100 0000 0001</div>
              <div><strong>SKT:</strong> 12/30</div>
              <div><strong>CVV:</strong> 123</div>
              <div><strong>3D OTP:</strong> 283126</div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Ad</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Soyad</label>
                <input type="text" value={form.surname} onChange={e => setForm({ ...form, surname: e.target.value })} required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">E-posta</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Telefon</label>
                <input type="tel" value={form.gsmNumber} onChange={e => setForm({ ...form, gsmNumber: e.target.value })} required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">T.C. Kimlik (sandbox: 11111111111)</label>
                <input type="text" value={form.identityNumber} onChange={e => setForm({ ...form, identityNumber: e.target.value })} required maxLength={11}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Adres</label>
              <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Şehir</label>
                <input type="text" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Ürün</label>
                <select value={form.product} onChange={e => setForm({ ...form, product: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option value="mesken">Mesken</option>
                  <option value="randevu">Randevu</option>
                  <option value="hukuk">Hukuk</option>
                  <option value="tamir">Tamir</option>
                  <option value="insaat">İnşaat</option>
                  <option value="emlak">Emlak</option>
                  <option value="muhasebe">Muhasebe</option>
                  <option value="ik">İK</option>
                  <option value="egitim">Eğitim</option>
                  <option value="servis">Servis</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tutar (TL)</label>
                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} required min={1}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-purple-700 hover:bg-purple-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-purple-500/30">
              {loading ? '⏳ Ödeme sayfası açılıyor...' : `💳 ${form.price} ₺ Öde`}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            🔒 Ödeme iyzico üzerinden, PCI-DSS uyumlu, kart bilgisi kooza tarafından saklanmaz.
          </p>
        </div>
      </div>
    </div>
  )
}
