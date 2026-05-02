'use client'

import { useState } from 'react'
import Link from 'next/link'

const CHECKLIST = [
  { id: 'mali', q: 'Mali müşavirin var mı?', desc: 'Kayıt ve süreç için zorunlu (vergi dairesinden onay alacak)' },
  { id: 'gib', q: 'GİB e-Devlet kaydı yapıldı mı?', desc: 'e-Fatura veya e-Arşiv için GİB onayı şart' },
  { id: 'sertifika', q: 'Mali Mühür / e-İmza sertifikası alındı mı?', desc: 'KamuSM\'den (TÜBİTAK) veya yetkili özel sağlayıcıdan alınır' },
  { id: 'ozelEntegrator', q: 'Özel entegrator seçildi mi?', desc: 'Logo, Mikro, Nethesap, kooza Muhasebe, Foriba vb.' },
  { id: 'cariKart', q: 'Cari kartlar düzenli mi?', desc: 'Müşteri/tedarikçi vergi numaraları, adresleri tam olmalı' },
  { id: 'ürünKart', q: 'Ürün/hizmet kartları KDV oranlı mı?', desc: 'Her ürün için KDV oranı (%1, %10, %20) atanmalı' },
  { id: 'şablon', q: 'Fatura şablonun (kaşe, logo) hazır mı?', desc: 'Vergi dairesinden onaylı şablon/format' },
  { id: 'banka', q: 'IBAN ve banka bilgilerin sistemde mi?', desc: 'Otomatik tahsilat ve mutabakat için' },
  { id: 'eposta', q: 'Email gönderim altyapısı var mı?', desc: 'Müşteriye e-fatura otomatik mail için' },
  { id: 'arşiv', q: '10 yıllık arşiv planın hazır mı?', desc: 'VUK gereği e-Faturalar 10 yıl saklanmalı' },
]

const LIMITS = [
  { yıl: '2024', limit: '3 milyon ₺', zorunlu: 'Brüt 3M+ olan firma' },
  { yıl: '2025', limit: '2 milyon ₺', zorunlu: 'Brüt 2M+ olan firma' },
  { yıl: '2026', limit: '1.5 milyon ₺', zorunlu: 'Brüt 1.5M+ olan firma (tahmin)' },
  { yıl: '2027', limit: '1 milyon ₺ (öngörülen)', zorunlu: 'Tüm KOBİ (öngörülen)' },
]

export default function EFaturaChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [yıllıkCiro, setYıllıkCiro] = useState(2500000)

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const completed = Object.values(checked).filter(Boolean).length
  const total = CHECKLIST.length
  const percent = Math.round((completed / total) * 100)

  // Zorunluluk kontrol
  const zorunlu = yıllıkCiro >= 1500000 // 2026 limit
  const yaklaşıyor = yıllıkCiro >= 1000000

  return (
    <div>
      <section className="bg-gradient-to-br from-indigo-700 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-sm font-bold mb-4">
            📋 e-Fatura 2026 Geçiş Kontrol Listesi
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            e-Fatura zorunlusu mı oldun?
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Yıllık ciron 1.5M ₺'i geçtiyse e-Fatura zorunlu. 10 maddelik checklist + ücretsiz PDF rehber.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {/* Ciro check */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8 mb-8">
            <h2 className="text-xl font-black text-gray-900 mb-6">📊 Önce: Sen zorunlu mı?</h2>

            <label className="block text-sm font-bold text-gray-700 mb-2">
              Yıllık brüt ciron (₺)
            </label>
            <input
              type="number"
              value={yıllıkCiro}
              onChange={(e) => setYıllıkCiro(Number(e.target.value))}
              step={100000}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-lg font-bold mb-4"
            />

            {zorunlu ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">🚨</div>
                  <div>
                    <h3 className="font-black text-red-900 mb-1">e-Fatura ZORUNLU!</h3>
                    <p className="text-sm text-red-700">
                      2026 limitini ({(1500000).toLocaleString('tr-TR')} ₺) geçtin. e-Fatura&apos;ya geçmek için
                      <strong> 30 gün içinde</strong> kayıt olmalısın. Aksi halde idari ceza var.
                    </p>
                  </div>
                </div>
              </div>
            ) : yaklaşıyor ? (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">⚠️</div>
                  <div>
                    <h3 className="font-black text-amber-900 mb-1">Limite yaklaşıyorsun</h3>
                    <p className="text-sm text-amber-700">
                      2026 zorunluluk limiti {(1500000).toLocaleString('tr-TR')} ₺. Şimdiden hazırlık yap, son anda kalma.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">✅</div>
                  <div>
                    <h3 className="font-black text-emerald-900 mb-1">Henüz zorunlu değilsin</h3>
                    <p className="text-sm text-emerald-700">
                      Ama ciron büyürse 1-2 yıl içinde zorunlu olabilir. Şimdiden e-Faturaya geçmek pek çok avantaj sağlar (kağıt yok, hızlı tahsilat, dijital arşiv).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Limits table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow p-6 mb-8">
            <h2 className="font-black text-gray-900 mb-4">📅 Yıllara göre zorunluluk limitleri</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left font-bold text-gray-700">Yıl</th>
                    <th className="p-3 text-left font-bold text-gray-700">Ciro Limiti</th>
                    <th className="p-3 text-left font-bold text-gray-700">Zorunlu</th>
                  </tr>
                </thead>
                <tbody>
                  {LIMITS.map((l, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-3 font-bold">{l.yıl}</td>
                      <td className="p-3 font-mono">{l.limit}</td>
                      <td className="p-3 text-gray-600">{l.zorunlu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900">📋 10 Maddelik Geçiş Kontrol Listesi</h2>
              <div className="text-sm font-bold text-indigo-700">{completed}/{total}</div>
            </div>

            {/* Progress */}
            <div className="bg-gray-100 rounded-full h-2 mb-6">
              <div
                className="bg-gradient-to-r from-indigo-600 to-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="space-y-3">
              {CHECKLIST.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                    checked[item.id]
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-white border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked[item.id] || false}
                    onChange={() => toggle(item.id)}
                    className="mt-1 w-5 h-5 text-indigo-600 rounded"
                  />
                  <div className="flex-1">
                    <div className={`font-bold ${checked[item.id] ? 'text-emerald-900 line-through' : 'text-gray-900'}`}>
                      {item.q}
                    </div>
                    <div className={`text-xs mt-0.5 ${checked[item.id] ? 'text-emerald-700' : 'text-gray-500'}`}>
                      {item.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {percent === 100 && (
              <div className="mt-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 text-center">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="font-black text-emerald-900 mb-1">Hazırsın!</h3>
                <p className="text-sm text-emerald-700">Tüm maddeler tamamlandı. e-Faturaya geçmeye hazırsın.</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-black mb-2">💼 Otomatik e-Fatura İstiyor musun?</h3>
            <p className="text-blue-100 mb-4 text-sm">
              kooza Muhasebe ile e-Fatura GİB&apos;e otomatik gider. Mali müşavirinle direkt entegrasyon.
            </p>
            <Link
              href="/kayit?product=muhasebe&plan=baslangic"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-black rounded-2xl hover:shadow-2xl transition"
            >
              💰 14 gün ücretsiz dene → kooza Muhasebe
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
