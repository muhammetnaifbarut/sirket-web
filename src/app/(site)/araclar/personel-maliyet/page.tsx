'use client'

import { useState } from 'react'
import Link from 'next/link'

const TRY = (n: number) => `${Math.round(n).toLocaleString('tr-TR')} ₺`

export default function PersonelMaliyetPage() {
  const [brut, setBrut] = useState(35000)
  const [çocukSayısı, setÇocukSayısı] = useState(0)
  const [ekGiderler, setEkGiderler] = useState(2000) // yemek, ulaşım, özel sağlık vs.
  const [yıllıkPrim, setYıllıkPrim] = useState(2) // ay sayısı (4 maaş=2 ay)

  // SGK işveren payları (2026)
  const sgkIsveren = brut * 0.205
  const issizlikIsveren = brut * 0.02
  const aylıkIsverenSGK = sgkIsveren + issizlikIsveren

  // Kıdem + ihbar yedeği (yıllık 1.33 maaş = aylık %11)
  const kıdemYedeği = brut / 12 // her ay bir günlük

  // Yıllık izin yedeği (14 gün = aylık %3.8)
  const izinYedeği = (brut * 14) / 365

  // Aylık toplam maliyet
  const aylıkMaliyet = brut + aylıkIsverenSGK + ekGiderler + kıdemYedeği + izinYedeği

  // Yıllık (12 ay maaş + prim)
  const yıllıkMaliyet = aylıkMaliyet * 12 + (brut * yıllıkPrim)

  // Net maaş (kabaca)
  const sgkIsci = brut * 0.14
  const issizlikIsci = brut * 0.01
  const sgkMatrahi = brut - sgkIsci - issizlikIsci
  const gelirVergisi = sgkMatrahi * 0.15 // basit
  const damga = brut * 0.00759
  const net = brut - sgkIsci - issizlikIsci - gelirVergisi - damga

  // Brüt → Toplam çarpan
  const çarpan = aylıkMaliyet / brut
  const çarpanYıllık = yıllıkMaliyet / (brut * 12)

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-700 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-sm font-bold mb-4">
            👥 Personel Tam Maliyet Hesabı
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            Personelinin gerçek yıllık maliyeti
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Brüt maaş + SGK işveren + kıdem yedeği + izin + prim + yan giderler. Şu anda eksik hesaplıyor olabilirsin.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8">
            <h2 className="text-xl font-black text-gray-900 mb-6">Personel bilgisi:</h2>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Brüt Maaş (₺/ay)</label>
                  <input
                    type="number"
                    value={brut}
                    onChange={(e) => setBrut(Number(e.target.value))}
                    min={5000}
                    step={1000}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg font-bold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Çocuk Sayısı</label>
                  <input
                    type="number"
                    value={çocukSayısı}
                    onChange={(e) => setÇocukSayısı(Number(e.target.value))}
                    min={0}
                    max={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Aylık Ek Giderler (₺) <span className="text-gray-400 font-normal">— yemek, ulaşım, sağlık, telefon vb.</span>
                </label>
                <input
                  type="number"
                  value={ekGiderler}
                  onChange={(e) => setEkGiderler(Number(e.target.value))}
                  min={0}
                  step={500}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Yıllık prim (kaç maaş?): <span className="text-blue-600">{yıllıkPrim} maaş</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={0.5}
                  value={yıllıkPrim}
                  onChange={(e) => setYıllıkPrim(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 (yok)</span>
                  <span>2 (sektör ort.)</span>
                  <span>4 (yüksek)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sonuç */}
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-black text-blue-900 mb-6">📊 Detaylı Maliyet Analizi</h3>

            <div className="bg-white rounded-2xl p-6 mb-4 border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-3">📅 Aylık Toplam</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Brüt Maaş</span> <span className="font-mono font-bold">{TRY(brut)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">+ SGK İşveren (%20.5)</span> <span className="font-mono">{TRY(sgkIsveren)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">+ İşsizlik İşveren (%2)</span> <span className="font-mono">{TRY(issizlikIsveren)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">+ Kıdem Yedeği (1/12)</span> <span className="font-mono">{TRY(kıdemYedeği)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">+ Yıllık İzin Yedeği</span> <span className="font-mono">{TRY(izinYedeği)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">+ Yan Giderler</span> <span className="font-mono">{TRY(ekGiderler)}</span></div>
                <hr className="my-2" />
                <div className="flex justify-between text-base">
                  <span className="font-bold">📊 Aylık Toplam</span>
                  <span className="font-mono font-black text-blue-700">{TRY(aylıkMaliyet)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">YILLIK GERÇEK MALİYET</div>
              <div className="text-4xl font-black mb-2">{TRY(yıllıkMaliyet)}</div>
              <div className="text-sm opacity-90">
                12 ay × {TRY(aylıkMaliyet)} + {yıllıkPrim} maaş prim
              </div>
              <hr className="my-3 border-white/30" />
              <div className="text-sm">
                💡 Personel sana göre **{çarpan.toFixed(2)}x** maliyetli (brüt × 1.0 değil)
                <br />
                💡 Yıllık çarpan: <strong>{çarpanYıllık.toFixed(2)}x</strong> (brüt × 12 yerine)
                <br />
                💡 Personelin net aldığı: <strong>{TRY(net)}/ay</strong> — yani sana <strong>{TRY(aylıkMaliyet - net)}</strong> ekstra maliyetli
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <Link
              href="/kayit?product=ik&plan=baslangic"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-2xl shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              👥 14 gün ücretsiz dene → kooza İK
            </Link>
            <p className="text-xs text-gray-500 mt-3">
              Bordro otomasyonu, izin takibi, performans değerlendirme — tek panelde.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
