'use client'

import { useState } from 'react'
import { Calculator, ArrowRight } from 'lucide-react'

type CalcType = 'sgk' | 'kdv' | 'fatura'

export default function MiniCalculator() {
  const [tab, setTab] = useState<CalcType>('sgk')

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-100 text-purple-700 text-sm font-semibold mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Ücretsiz Hesaplayıcılar
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Anlık hesapla, hemen kullan
          </h2>
          <p className="text-gray-600">SGK bordro, KDV, e-Fatura — kayıt istemeden, ücretsiz.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-200 shadow-soft">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {[
              { id: 'sgk', label: '👥 SGK Bordro' },
              { id: 'kdv', label: '🧾 KDV' },
              { id: 'fatura', label: '📄 e-Fatura Vergi' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as CalcType)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                  tab === t.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'sgk' && <SGKCalc />}
          {tab === 'kdv' && <KDVCalc />}
          {tab === 'fatura' && <FaturaCalc />}
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          ⚠️ Bu hesaplayıcılar tahminîdir. Resmi hesaplama için mali müşaviriniz veya kooza Pro paketi kullanın.
        </p>
      </div>
    </section>
  )
}

function SGKCalc() {
  const [brut, setBrut] = useState(20000)
  const sgkIscii = brut * 0.14
  const issizlikIscii = brut * 0.01
  const gelirVergisi = (brut - sgkIscii - issizlikIscii) * 0.15
  const damga = brut * 0.00759
  const net = brut - sgkIscii - issizlikIscii - gelirVergisi - damga

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div>
        <h3 className="font-bold text-gray-900 text-lg mb-4">Bordro hesabı</h3>
        <label className="block mb-4">
          <span className="text-sm font-semibold text-gray-700 mb-2 block">Brüt maaş (₺/ay)</span>
          <input
            type="number"
            value={brut}
            onChange={(e) => setBrut(Number(e.target.value))}
            min={0}
            max={1000000}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-lg font-bold"
          />
        </label>
        <input
          type="range"
          min={5500}
          max={150000}
          step={500}
          value={brut}
          onChange={(e) => setBrut(Number(e.target.value))}
          className="w-full accent-purple-600"
        />
      </div>

      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Hesaplama</div>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between"><span className="text-gray-600">SGK İşçi (%14)</span><span className="font-mono font-bold text-rose-600">-{sgkIscii.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span></li>
          <li className="flex justify-between"><span className="text-gray-600">İşsizlik (%1)</span><span className="font-mono font-bold text-rose-600">-{issizlikIscii.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span></li>
          <li className="flex justify-between"><span className="text-gray-600">Gelir Vergisi (%15)</span><span className="font-mono font-bold text-rose-600">-{gelirVergisi.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span></li>
          <li className="flex justify-between"><span className="text-gray-600">Damga (%0.759)</span><span className="font-mono font-bold text-rose-600">-{damga.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span></li>
          <li className="flex justify-between pt-3 border-t border-purple-200 mt-3"><span className="font-bold text-gray-900">Net maaş</span><span className="font-mono font-bold text-emerald-700 text-lg">{net.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span></li>
        </ul>
        <a href="/cozumler/ik" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-purple-700 hover:text-purple-900">
          Otomatik bordro için kooza İK <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

function KDVCalc() {
  const [tutar, setTutar] = useState(10000)
  const [oran, setOran] = useState(20)
  const [mode, setMode] = useState<'haric' | 'dahil'>('haric')

  const hesap = mode === 'haric'
    ? { net: tutar, kdv: tutar * (oran / 100), brut: tutar * (1 + oran / 100) }
    : { brut: tutar, kdv: tutar - tutar / (1 + oran / 100), net: tutar / (1 + oran / 100) }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div>
        <h3 className="font-bold text-gray-900 text-lg mb-4">KDV hesabı</h3>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700 mb-2 block">Tutar (₺)</span>
            <input
              type="number"
              value={tutar}
              onChange={(e) => setTutar(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 outline-none text-lg font-bold"
            />
          </label>
          <div className="flex gap-2">
            {[1, 10, 20].map((o) => (
              <button
                key={o}
                onClick={() => setOran(o)}
                className={`flex-1 px-3 py-2 rounded-xl font-bold text-sm ${
                  oran === o ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                %{o}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('haric')}
              className={`flex-1 px-3 py-2 rounded-xl text-sm font-semibold ${
                mode === 'haric' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              KDV Hariç
            </button>
            <button
              onClick={() => setMode('dahil')}
              className={`flex-1 px-3 py-2 rounded-xl text-sm font-semibold ${
                mode === 'dahil' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              KDV Dahil
            </button>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Sonuç</div>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between"><span className="text-gray-600">KDV Hariç</span><span className="font-mono font-bold">{hesap.net.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span></li>
          <li className="flex justify-between"><span className="text-gray-600">KDV (%{oran})</span><span className="font-mono font-bold text-amber-600">{hesap.kdv.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span></li>
          <li className="flex justify-between pt-3 border-t border-purple-200 mt-3"><span className="font-bold text-gray-900">KDV Dahil Toplam</span><span className="font-mono font-bold text-emerald-700 text-lg">{hesap.brut.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span></li>
        </ul>
        <a href="/cozumler/web" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-purple-700 hover:text-purple-900">
          Otomatik fatura için kooza <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

function FaturaCalc() {
  const [tutar, setTutar] = useState(50000)
  const stopaj = tutar * 0.20
  const kdv = tutar * 0.20

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div>
        <h3 className="font-bold text-gray-900 text-lg mb-4">Serbest meslek faturası</h3>
        <p className="text-sm text-gray-600 mb-4">Avukat, mali müşavir, danışman gibi serbest meslek erbabı için.</p>
        <label className="block">
          <span className="text-sm font-semibold text-gray-700 mb-2 block">Brüt fatura tutarı (₺)</span>
          <input
            type="number"
            value={tutar}
            onChange={(e) => setTutar(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 outline-none text-lg font-bold"
          />
        </label>
      </div>

      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Hesaplama</div>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between"><span className="text-gray-600">Brüt</span><span className="font-mono font-bold">{tutar.toLocaleString('tr-TR')} ₺</span></li>
          <li className="flex justify-between"><span className="text-gray-600">Stopaj (%20)</span><span className="font-mono font-bold text-rose-600">-{stopaj.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span></li>
          <li className="flex justify-between"><span className="text-gray-600">KDV (%20)</span><span className="font-mono font-bold text-amber-600">+{kdv.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span></li>
          <li className="flex justify-between pt-3 border-t border-purple-200 mt-3"><span className="font-bold text-gray-900">Müşteriden tahsil</span><span className="font-mono font-bold text-emerald-700 text-lg">{(tutar + kdv).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span></li>
          <li className="flex justify-between"><span className="font-bold text-gray-900">Serbest meslek erbabına net</span><span className="font-mono font-bold text-emerald-700 text-lg">{(tutar - stopaj).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span></li>
        </ul>
      </div>
    </div>
  )
}
