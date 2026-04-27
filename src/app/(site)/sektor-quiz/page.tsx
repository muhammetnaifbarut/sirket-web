'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react'

interface Q {
  q: string
  options: { label: string; sectors: string[] }[]
}

const QUESTIONS: Q[] = [
  {
    q: 'İşletmen müşteri ile nasıl etkileşim kuruyor?',
    options: [
      { label: 'Hasta/danışan randevusu alıyorum', sectors: ['klinik', 'dis-hekimi', 'veteriner', 'guzellik-salonu'] },
      { label: 'Mağazada/dükkanda ürün satıyorum', sectors: ['market', 'restoran'] },
      { label: 'Online sipariş alıyorum', sectors: ['e-ticaret', 'restoran'] },
      { label: 'Eğitim/kurs veriyorum', sectors: ['egitim'] },
      { label: 'Personel yönetiyorum (ana iş)', sectors: ['ik'] },
    ],
  },
  {
    q: 'Hangisi sana en uygun?',
    options: [
      { label: 'Hayvan sahipleriyle çalışıyorum', sectors: ['veteriner'] },
      { label: 'İnsan sağlığına yönelik hizmet', sectors: ['klinik', 'dis-hekimi'] },
      { label: 'Estetik / dış görünüş hizmeti', sectors: ['guzellik-salonu', 'dis-hekimi'] },
      { label: 'Yeme-içme', sectors: ['restoran'] },
      { label: 'Perakende ürün satışı', sectors: ['market', 'e-ticaret'] },
      { label: 'Ders / kurs / eğitim', sectors: ['egitim'] },
      { label: 'İK / şirket yönetimi', sectors: ['ik'] },
    ],
  },
  {
    q: 'Müşterin sana nasıl ulaşıyor?',
    options: [
      { label: 'Telefonla arıyor', sectors: ['klinik', 'dis-hekimi', 'guzellik-salonu', 'veteriner'] },
      { label: 'Online sipariş veriyor (web/app)', sectors: ['e-ticaret', 'restoran'] },
      { label: 'Mağazaya geliyor', sectors: ['market', 'restoran'] },
      { label: 'Sosyal medyadan (Instagram/WhatsApp)', sectors: ['guzellik-salonu', 'restoran', 'klinik'] },
      { label: 'Trendyol/Hepsiburada gibi pazaryeri', sectors: ['e-ticaret'] },
    ],
  },
  {
    q: 'Önemli olan ne?',
    options: [
      { label: 'Randevu yönetimi', sectors: ['klinik', 'dis-hekimi', 'guzellik-salonu', 'veteriner'] },
      { label: 'Stok ve kasa', sectors: ['market', 'restoran'] },
      { label: 'Pazaryeri + kargo entegrasyonu', sectors: ['e-ticaret'] },
      { label: 'Bordro + izin + personel takibi', sectors: ['ik'] },
      { label: 'Öğrenci kayıt + sınav + veli portalı', sectors: ['egitim'] },
      { label: 'Mutfak ekranı + adisyon', sectors: ['restoran'] },
    ],
  },
]

const SECTOR_INFO: Record<string, { name: string; emoji: string; href: string; desc: string }> = {
  'klinik': { name: 'Klinik & Sağlık', emoji: '🏥', href: '/cozumler/klinik', desc: 'Hasta dosyası, e-Reçete, MHRS, SGK provizyon' },
  'dis-hekimi': { name: 'Diş Hekimi', emoji: '🦷', href: '/cozumler/dis-hekimi', desc: 'Odontogram, panoramik, tedavi planı' },
  'veteriner': { name: 'Veteriner', emoji: '🐾', href: '/cozumler/veteriner', desc: 'Hayvan profili, aşı takvimi, mama satışı' },
  'guzellik-salonu': { name: 'Güzellik Salonu', emoji: '💄', href: '/cozumler/guzellik-salonu', desc: 'Stilist takvimi, sadakat, foto galeri' },
  'restoran': { name: 'Restoran & Kafe', emoji: '🍽️', href: '/cozumler/restoran', desc: 'Yemeksepeti/Trendyol, mutfak ekranı' },
  'market': { name: 'Market & Perakende', emoji: '🛒', href: '/cozumler/market', desc: 'Barkod, kasa, stok, sadakat' },
  'e-ticaret': { name: 'E-Ticaret', emoji: '🛍️', href: '/cozumler/e-ticaret', desc: 'Trendyol, Hepsiburada, kargo otomasyonu' },
  'egitim': { name: 'Eğitim & Kurs', emoji: '🎓', href: '/cozumler/egitim', desc: 'Öğrenci kayıt, sınav, veli portal' },
  'ik': { name: 'İnsan Kaynakları', emoji: '👥', href: '/cozumler/ik', desc: 'Bordro, izin, performans' },
}

export default function QuizPage() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})

  function answer(sectors: string[]) {
    setScores((prev) => {
      const updated = { ...prev }
      for (const s of sectors) {
        updated[s] = (updated[s] || 0) + 1
      }
      return updated
    })
    setStep(step + 1)
  }

  function reset() {
    setStep(0)
    setScores({})
  }

  const isDone = step >= QUESTIONS.length
  const top3 = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k)

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-purple-100">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-4">
              🎯 Sektör Bulma Quiz'i
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Hangi kooza paketi tam sana uygun?
            </h1>
            <p className="text-gray-500 mt-3">4 hızlı soru, 30 saniye.</p>
          </div>

          {!isDone ? (
            <>
              {/* Progress */}
              <div className="mb-7">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>Soru {step + 1} / {QUESTIONS.length}</span>
                  <span>%{Math.round(((step + 1) / QUESTIONS.length) * 100)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 leading-snug">
                {QUESTIONS[step].q}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {QUESTIONS[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => answer(opt.sectors)}
                    className="w-full text-left px-5 py-4 rounded-xl bg-gray-50 hover:bg-purple-50 border-2 border-gray-100 hover:border-purple-200 transition-all flex items-center justify-between group"
                  >
                    <span className="font-medium text-gray-900">{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-purple-700"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Önceki soru
                </button>
              )}
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="text-5xl mb-3">🎉</div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">İşte size en uygun 3 paket:</h2>
                <p className="text-gray-500">En çok eşleşenden başlayarak</p>
              </div>

              <div className="space-y-4">
                {top3.map((slug, i) => {
                  const info = SECTOR_INFO[slug]
                  if (!info) return null
                  return (
                    <Link
                      key={slug}
                      href={info.href}
                      className={`block rounded-2xl p-6 border-2 transition-all hover:-translate-y-0.5 ${
                        i === 0
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 shadow-lg'
                          : 'bg-white border-gray-200 hover:border-purple-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{info.emoji}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {i === 0 && <span className="text-xs font-bold text-purple-700 bg-white px-2 py-0.5 rounded">EN UYGUN</span>}
                            <h3 className="font-bold text-gray-900 text-lg">{info.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{info.desc}</p>
                          <span className="text-sm font-bold text-purple-700 inline-flex items-center gap-1">
                            Detayına git
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  onClick={reset}
                  className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Tekrar yap
                </button>
                <Link
                  href="/demo"
                  className="px-6 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Demo iste
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
