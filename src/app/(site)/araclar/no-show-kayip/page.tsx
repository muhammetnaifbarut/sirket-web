'use client'

import { useState } from 'react'
import Link from 'next/link'

const TRY = (n: number) => `${Math.round(n).toLocaleString('tr-TR')} ₺`

export default function NoShowPage() {
  const [sektör, setSektör] = useState('klinik')
  const [günlükRandevu, setGünlükRandevu] = useState(15)
  const [ortalamaUcret, setOrtalamaUcret] = useState(450)
  const [noShowOrani, setNoShowOrani] = useState(15) // %
  const [çalışmaGünü, setÇalışmaGünü] = useState(26)

  // Hesaplamalar
  const aylıkRandevu = günlükRandevu * çalışmaGünü
  const aylıkNoShow = (aylıkRandevu * noShowOrani) / 100
  const aylıkKayıp = aylıkNoShow * ortalamaUcret
  const yıllıkKayıp = aylıkKayıp * 12

  // WhatsApp hatırlatma ile kurtarılan: %70-80
  const kurtarılanOrani = 75
  const aylıkKurtarılan = (aylıkKayıp * kurtarılanOrani) / 100
  const yıllıkKurtarılan = aylıkKurtarılan * 12

  return (
    <div>
      <section className="bg-gradient-to-br from-red-700 to-rose-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-sm font-bold mb-4">
            💸 No-Show Kayıp Hesaplayıcı
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            Gelmeyen müşterin ne kadar kazandırmıyor?
          </h1>
          <p className="text-rose-100 max-w-2xl mx-auto">
            Klinik, kuaför, fizyoterapi: random no-show oranı %10-25. Hesaplayalım — sonra çözüm sunalım.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8">
            <h2 className="text-xl font-black text-gray-900 mb-6">Bilgilerini gir:</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sektör</label>
                <select
                  value={sektör}
                  onChange={(e) => setSektör(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500"
                >
                  <option value="klinik">🏥 Klinik (estetik, doktor, dişçi)</option>
                  <option value="kuafor">💇 Kuaför / Güzellik salonu</option>
                  <option value="fizyo">🤸 Fizyoterapi / Spor merkezi</option>
                  <option value="masaj">💆 Masaj salonu / Spa</option>
                  <option value="veteriner">🐾 Veteriner</option>
                  <option value="other">🔧 Diğer (servis, danışmanlık)</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Günlük randevu sayısı
                  </label>
                  <input
                    type="number"
                    value={günlükRandevu}
                    onChange={(e) => setGünlükRandevu(Number(e.target.value))}
                    min={1}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 text-lg font-bold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Ortalama hizmet ücreti (₺)
                  </label>
                  <input
                    type="number"
                    value={ortalamaUcret}
                    onChange={(e) => setOrtalamaUcret(Number(e.target.value))}
                    min={1}
                    step={50}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 text-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Tahmini No-Show oranı: <span className="text-red-600">%{noShowOrani}</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={40}
                  value={noShowOrani}
                  onChange={(e) => setNoShowOrani(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>%5 (mükemmel)</span>
                  <span>%15-20 (sektör ortalaması)</span>
                  <span>%40 (kötü)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Aylık çalışma günü
                </label>
                <input
                  type="number"
                  value={çalışmaGünü}
                  onChange={(e) => setÇalışmaGünü(Number(e.target.value))}
                  min={1}
                  max={31}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 text-lg font-bold"
                />
              </div>
            </div>
          </div>

          {/* Sonuç */}
          <div className="mt-8 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 rounded-3xl p-8 border-2 border-red-200">
            <h3 className="text-2xl font-black text-red-900 mb-6">📊 Senin Kayıp Hesabın</h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-5 border border-red-100">
                <div className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">AYLIK</div>
                <div className="text-3xl font-black text-red-700 mb-1">{TRY(aylıkKayıp)}</div>
                <div className="text-sm text-red-600">{Math.round(aylıkNoShow)} no-show × {ortalamaUcret} ₺</div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-red-100">
                <div className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">YILLIK</div>
                <div className="text-3xl font-black text-red-700 mb-1">{TRY(yıllıkKayıp)}</div>
                <div className="text-sm text-red-600">12 aylık tam kayıp</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border-2 border-emerald-200">
              <div className="flex items-start gap-3">
                <div className="text-3xl">💚</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    kooza Randevu ile WhatsApp hatırlatma → No-Show %75 azalır
                  </div>
                  <div className="text-2xl font-black text-emerald-700 mb-1">
                    +{TRY(yıllıkKurtarılan)}/yıl kurtarılır
                  </div>
                  <div className="text-sm text-emerald-700">
                    Sadece otomatik WhatsApp + SMS hatırlatma ile. Yıllık abonelik (599 ₺/ay × 12) = 7188 ₺.
                    <br />
                    <strong>Net kazanç: {TRY(yıllıkKurtarılan - 7188)}/yıl</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <Link
              href="/kayit?product=randevu&plan=baslangic"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black rounded-2xl shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              🚀 14 gün ücretsiz dene → kooza Randevu
            </Link>
            <p className="text-xs text-gray-500 mt-3">
              Sandbox değil — tam çalışan sistem. Kart sormuyoruz.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
