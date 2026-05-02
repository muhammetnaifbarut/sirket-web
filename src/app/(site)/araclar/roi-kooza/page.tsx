'use client'

import { useState } from 'react'
import Link from 'next/link'

const TRY = (n: number) => `${Math.round(n).toLocaleString('tr-TR')} ₺`

const SECTORS = [
  { id: 'klinik', name: '🏥 Klinik', avgPrice: 700, lostPercent: 18 },
  { id: 'kuafor', name: '💇 Kuaför', avgPrice: 350, lostPercent: 22 },
  { id: 'restoran', name: '🍽️ Restoran', avgPrice: 250, lostPercent: 8 },
  { id: 'emlak', name: '🏠 Emlak', avgPrice: 25000, lostPercent: 15 },
  { id: 'mesken', name: '🏘️ Site/Apartman', avgPrice: 800, lostPercent: 25 },
  { id: 'tamir', name: '🔧 Teknik servis', avgPrice: 600, lostPercent: 20 },
  { id: 'avukat', name: '⚖️ Hukuk bürosu', avgPrice: 3500, lostPercent: 10 },
  { id: 'kurs', name: '🎓 Eğitim/kurs', avgPrice: 5000, lostPercent: 12 },
]

export default function ROIPage() {
  const [sektör, setSektör] = useState(SECTORS[0])
  const [müşteriSayısı, setMüşteriSayısı] = useState(100)
  const [aylıkOrtalama, setAylıkOrtalama] = useState(15000) // mevcut sistem maliyeti (kağıt, defter, çağrı, vs.)

  // Kazançlar
  const aylıkGelir = müşteriSayısı * sektör.avgPrice
  const aylıkKayıpKazanç = (aylıkGelir * sektör.lostPercent) / 100
  const aylıkKurtarılan = aylıkKayıpKazanç * 0.7 // %70 kurtarılır
  const aylıkOperasyonelTasarruf = aylıkOrtalama * 0.6 // %60 daha verimli

  const toplamAylıkKazanç = aylıkKurtarılan + aylıkOperasyonelTasarruf
  const yıllıkKazanç = toplamAylıkKazanç * 12

  // kooza maliyeti
  const koozaAylık = 999 // örnek
  const koozaYıllık = koozaAylık * 12
  const netKazanç = yıllıkKazanç - koozaYıllık
  const roi = ((netKazanç / koozaYıllık) * 100).toFixed(0)

  return (
    <div>
      <section className="bg-gradient-to-br from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-sm font-bold mb-4">
            💰 ROI Hesaplayıcı (kooza vs Mevcut)
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            kooza'ya geçince ne kadar kazanırsın?
          </h1>
          <p className="text-amber-100 max-w-2xl mx-auto">
            Sektör + büyüklük → 1 dakikada gerçekçi yıllık tasarruf hesabı
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8">
            <h2 className="text-xl font-black text-gray-900 mb-6">İşletme bilgisi:</h2>

            <div className="space-y-5">
              {/* Sektör */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">📂 Sektörünüz</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SECTORS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSektör(s)}
                      className={`p-3 rounded-xl border text-sm transition ${
                        sektör.id === s.id
                          ? 'bg-amber-600 text-white border-amber-600 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="font-bold text-xs">{s.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Aylık müşteri sayın
                  </label>
                  <input
                    type="number"
                    value={müşteriSayısı}
                    onChange={(e) => setMüşteriSayısı(Number(e.target.value))}
                    min={1}
                    step={10}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 text-lg font-bold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Aylık operasyonel maliyet (₺)
                  </label>
                  <input
                    type="number"
                    value={aylıkOrtalama}
                    onChange={(e) => setAylıkOrtalama(Number(e.target.value))}
                    min={0}
                    step={1000}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 text-lg font-bold"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Kağıt, defter, ekstra personel, çağrı maliyeti vb.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sonuç */}
          <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border-2 border-amber-200">
            <h3 className="text-2xl font-black text-amber-900 mb-6">📊 Yıllık ROI Analizi</h3>

            <div className="bg-white rounded-2xl p-6 mb-4 border border-amber-100">
              <h4 className="font-bold text-gray-900 mb-3">💰 Aylık Kazanç</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mevcut aylık gelir</span>
                  <span className="font-mono font-bold">{TRY(aylıkGelir)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Kayıp gelir (%{sektör.lostPercent} no-show, follow-up yok)</span>
                  <span className="font-mono">-{TRY(aylıkKayıpKazanç)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-emerald-700">
                  <span className="font-bold">+ kooza ile kurtarılan (%70)</span>
                  <span className="font-mono font-bold">+{TRY(aylıkKurtarılan)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span className="font-bold">+ Operasyonel tasarruf (%60)</span>
                  <span className="font-mono font-bold">+{TRY(aylıkOperasyonelTasarruf)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-base">
                  <span className="font-black">📈 Aylık net kazanç</span>
                  <span className="font-mono font-black text-emerald-700">+{TRY(toplamAylıkKazanç)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-6 text-white">
              <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                YILLIK NET KAZANÇ (kooza maliyeti dahil)
              </div>
              <div className="text-5xl font-black mb-2">+{TRY(netKazanç)}</div>
              <div className="text-sm mb-3 opacity-90">
                Yıllık brüt kazanç: {TRY(yıllıkKazanç)} − kooza {koozaAylık} ₺/ay × 12 = {TRY(koozaYıllık)}
              </div>
              <hr className="my-3 border-white/30" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="text-xs opacity-80">ROI (yıllık)</div>
                  <div className="text-2xl font-black">%{roi}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="text-xs opacity-80">Geri ödeme süresi</div>
                  <div className="text-2xl font-black">{Math.max(1, Math.round(koozaYıllık / toplamAylıkKazanç))} ay</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <Link
              href="/fiyatlandirma"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black rounded-2xl shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              🚀 14 gün ücretsiz başla
            </Link>
            <p className="text-xs text-gray-500 mt-3">
              Hesaplama tahminîdir. Gerçek sonuç sektör + verim + uygulamaya göre değişir.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
