'use client'

import { useState } from 'react'
import Link from 'next/link'

const TRY = (n: number) => `${Math.round(n).toLocaleString('tr-TR')} ₺`

export default function WhatsAppLeadPage() {
  const [günlükMesaj, setGünlükMesaj] = useState(20)
  const [yanıtOrani, setYanıtOrani] = useState(40) // %
  const [donüşümOrani, setDonüşümOrani] = useState(15) // % (yanıt verenden müşteri)
  const [müşteriDeğeri, setMüşteriDeğeri] = useState(800)

  // Şu anki durum
  const aylıkMesaj = günlükMesaj * 30
  const aylıkYanıt = (aylıkMesaj * yanıtOrani) / 100
  const aylıkMüşteri = (aylıkYanıt * donüşümOrani) / 100
  const aylıkGelir = aylıkMüşteri * müşteriDeğeri
  const aylıkKayıpMesaj = aylıkMesaj - aylıkYanıt

  // kooza ile (otomasyon ile yanıt oranı %95'e çıkar)
  const koozaYanıt = (aylıkMesaj * 95) / 100
  const koozaMüşteri = (koozaYanıt * donüşümOrani) / 100
  const koozaGelir = koozaMüşteri * müşteriDeğeri
  const ekKazanç = koozaGelir - aylıkGelir

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-700 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-sm font-bold mb-4">
            📱 WhatsApp Lead Yakalama Analizi
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            Kaç fırsat WhatsApp'tan kaçıyor?
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Cevap vermediğin her mesaj rakibe gidiyor. Hesaplayalım, ardından otomatik çözüm.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8">
            <h2 className="text-xl font-black text-gray-900 mb-6">Bilgilerini gir:</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Günde kaç WhatsApp/Instagram DM mesajı geliyor?
                </label>
                <input
                  type="number"
                  value={günlükMesaj}
                  onChange={(e) => setGünlükMesaj(Number(e.target.value))}
                  min={1}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-lg font-bold"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Müşteri sorularını, ilan bilgilerini içeren mesajlar
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Şu an cevap verme oranın: <span className="text-emerald-600">%{yanıtOrani}</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={yanıtOrani}
                  onChange={(e) => setYanıtOrani(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>%10 (kötü)</span>
                  <span>%40 (sektör ort.)</span>
                  <span>%100 (mükemmel)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Cevap verdiğin mesajdan müşteriye dönüşüm oranı: <span className="text-emerald-600">%{donüşümOrani}</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={50}
                  value={donüşümOrani}
                  onChange={(e) => setDonüşümOrani(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>%5</span>
                  <span>%15-20 (sektör ort.)</span>
                  <span>%50</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Bir müşterinin sana ortalama getirisi (₺)
                </label>
                <input
                  type="number"
                  value={müşteriDeğeri}
                  onChange={(e) => setMüşteriDeğeri(Number(e.target.value))}
                  min={50}
                  step={50}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-lg font-bold"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Bir kez gelen müşteri ortalama ne kadar harcıyor?
                </p>
              </div>
            </div>
          </div>

          {/* Sonuç */}
          <div className="mt-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 border-2 border-emerald-200">
            <h3 className="text-2xl font-black text-emerald-900 mb-6">📊 Senin Durumun</h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-5 border border-red-200">
                <div className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">
                  ŞU ANDA — KAYIP
                </div>
                <div className="text-3xl font-black text-red-600 mb-1">
                  {Math.round(aylıkKayıpMesaj)} mesaj/ay
                </div>
                <div className="text-sm text-red-600">cevapsız kalıyor (rakibe gidiyor)</div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                  GELİR (Mevcut)
                </div>
                <div className="text-3xl font-black text-emerald-700 mb-1">{TRY(aylıkGelir)}/ay</div>
                <div className="text-sm text-emerald-700">{Math.round(aylıkMüşteri)} müşteri × {müşteriDeğeri} ₺</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-300">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-4xl">⚡</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    kooza Randevu / Emlak / CRM ile WhatsApp Otomasyon
                  </div>
                  <div className="text-sm text-emerald-700 mb-3">
                    Otomatik karşılama mesajı, AI cevap önerisi, lead atama → cevap oranı <strong>%95</strong>'e çıkar.
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-emerald-50 rounded-xl p-4">
                  <div className="text-xs font-bold text-emerald-700 mb-1">Yeni gelir</div>
                  <div className="text-2xl font-black text-emerald-700">{TRY(koozaGelir)}/ay</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-4 text-white">
                  <div className="text-xs font-bold uppercase tracking-wider mb-1">Ek Kazanç</div>
                  <div className="text-2xl font-black">+{TRY(ekKazanç)}/ay</div>
                  <div className="text-xs">Yıllık: {TRY(ekKazanç * 12)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <Link
              href="/fiyatlandirma"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black rounded-2xl shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              🚀 14 gün ücretsiz dene
            </Link>
            <p className="text-xs text-gray-500 mt-3">
              kooza Randevu, kooza Emlak, kooza Tamir — hepsinde WhatsApp entegre.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
