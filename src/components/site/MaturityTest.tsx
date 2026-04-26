'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle,
  TrendingUp, Award, Loader2,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Question {
  id: string
  area: string
  question: string
  options: { label: string; score: number }[]
}

const QUESTIONS: Question[] = [
  {
    id: 'q1', area: 'Web & Online Vitrin',
    question: 'Şirketinizin web sitesi var mı, müşteri ondan ulaşabiliyor mu?',
    options: [
      { label: 'Web sitemiz yok veya çok eski', score: 0 },
      { label: 'Var ama mobilde berbat / Google\'da bulunmuyor', score: 3 },
      { label: 'Var, çalışıyor — ama içerik güncel değil', score: 6 },
      { label: 'Modern, hızlı, mobil uyumlu, SEO yapıyoruz', score: 10 },
    ],
  },
  {
    id: 'q2', area: 'Müşteri Yönetimi',
    question: 'Müşteri bilgilerinizi nasıl tutuyorsunuz?',
    options: [
      { label: 'Defterde, telefonda, ajandada', score: 0 },
      { label: 'Excel\'de tutuyoruz', score: 3 },
      { label: 'CRM yazılımı kullanıyoruz ama düzensiz', score: 6 },
      { label: 'CRM\'de düzenli, satış takibi var', score: 10 },
    ],
  },
  {
    id: 'q3', area: 'Satış & Ödeme',
    question: 'Satış ve tahsilat süreciniz nasıl?',
    options: [
      { label: 'Manuel — fiş, ekstre, hatırlatma yok', score: 0 },
      { label: 'POS var ama takibi karışık', score: 4 },
      { label: 'Online ödeme + faturalama var', score: 8 },
      { label: 'Otomatik tahsilat + e-Fatura + alacak takibi', score: 10 },
    ],
  },
  {
    id: 'q4', area: 'Stok & Operasyon',
    question: 'Stok ve operasyonel süreçleriniz dijital mi?',
    options: [
      { label: 'Stok takibi yok / fiziksel sayım yapıyoruz', score: 0 },
      { label: 'Excel\'de takip ediyoruz', score: 3 },
      { label: 'Yazılım var ama sürekli güncel değil', score: 6 },
      { label: 'Anlık stok, otomatik sipariş, barkod', score: 10 },
    ],
  },
  {
    id: 'q5', area: 'İnsan Kaynakları',
    question: 'Personel, izin, bordro nasıl yönetiliyor?',
    options: [
      { label: 'Defter, dosya, manuel hesap', score: 0 },
      { label: 'Excel\'de tutuluyor', score: 3 },
      { label: 'Bordro programı var ama izin/performans manuel', score: 6 },
      { label: 'İK yazılımı + self-servis portal var', score: 10 },
    ],
  },
  {
    id: 'q6', area: 'Pazarlama',
    question: 'Müşterilere ulaşmak için hangi pazarlama araçlarını kullanıyorsunuz?',
    options: [
      { label: 'Sadece tabela / kulaktan kulağa', score: 0 },
      { label: 'Sosyal medya hesabımız var, ara sıra paylaşıyoruz', score: 3 },
      { label: 'Düzenli içerik + Google reklam veriyoruz', score: 7 },
      { label: 'SEO + içerik + email/SMS otomasyonu + analitik', score: 10 },
    ],
  },
  {
    id: 'q7', area: 'İletişim & Hizmet',
    question: 'Müşteri size nasıl ulaşıyor?',
    options: [
      { label: 'Sadece telefon ve gelip görerek', score: 0 },
      { label: 'WhatsApp + telefon', score: 4 },
      { label: 'Web formu + WhatsApp + telefon', score: 7 },
      { label: 'Online randevu + canlı destek + chatbot + tüm kanallar', score: 10 },
    ],
  },
  {
    id: 'q8', area: 'Veri & Karar',
    question: 'Şirket performansınızı (satış, maliyet, müşteri) nasıl ölçüyorsunuz?',
    options: [
      { label: 'Tahminle ve hisle yönetiyoruz', score: 0 },
      { label: 'Ay sonunda Excel\'de toparlıyoruz', score: 3 },
      { label: 'Yazılımdan rapor alıyoruz ama kullanmıyoruz', score: 6 },
      { label: 'Anlık dashboard + KPI takibi + veri-bazlı kararlar', score: 10 },
    ],
  },
  {
    id: 'q9', area: 'Otomasyon',
    question: 'Tekrar eden işleri (fatura, hatırlatma, rapor) otomatik yapıyor musunuz?',
    options: [
      { label: 'Hiçbir şey otomatik değil', score: 0 },
      { label: 'Bazıları otomatik (örn. e-Fatura)', score: 4 },
      { label: 'Çoğu süreç otomatik', score: 7 },
      { label: 'Süreçler tamamen otomatik, çalışan stratejiye odaklanıyor', score: 10 },
    ],
  },
  {
    id: 'q10', area: 'Güvenlik & Yedekleme',
    question: 'Verileriniz güvende mi, yedek var mı?',
    options: [
      { label: 'Yedek almıyoruz, güvenlik düşünmedik', score: 0 },
      { label: 'Ara sıra yedek alıyoruz', score: 3 },
      { label: 'Düzenli yedek + antivirüs var', score: 7 },
      { label: 'Otomatik yedek + KVKK uyumlu + 2FA + şifreli erişim', score: 10 },
    ],
  },
]

const MAX_SCORE = QUESTIONS.length * 10

const SECTORS = [
  { value: '', label: 'Sektörünüz' },
  { value: 'klinik', label: 'Klinik / Sağlık' },
  { value: 'restoran', label: 'Restoran / Kafe' },
  { value: 'market', label: 'Market / Perakende' },
  { value: 'egitim', label: 'Eğitim / Kurs' },
  { value: 'hizmet', label: 'Hizmet Sektörü' },
  { value: 'imalat', label: 'İmalat / Üretim' },
  { value: 'eticaret', label: 'E-Ticaret' },
  { value: 'diger', label: 'Diğer' },
]

const EMPLOYEES = [
  { value: '', label: 'Çalışan sayısı' },
  { value: '1-5', label: '1-5' },
  { value: '6-20', label: '6-20' },
  { value: '21-50', label: '21-50' },
  { value: '51-100', label: '51-100' },
  { value: '100+', label: '100+' },
]

function levelFromScore(score: number): { name: string; color: string; emoji: string; description: string; recommendations: string[] } {
  const pct = (score / MAX_SCORE) * 100
  if (pct < 25) {
    return {
      name: 'Başlangıç',
      color: '#dc2626',
      emoji: '🌱',
      description: 'Henüz dijital yolculuğunuzun çok başındasınız. Bu büyük bir fırsat — kazanılacak çok şey var.',
      recommendations: [
        'Modern bir web sitesi ile dijital vitrin oluşturun',
        'Müşteri bilgilerini Excel\'den CRM\'e taşıyın',
        'En kritik tek bir süreci dijitalleştirin (önerimiz: müşteri yönetimi)',
        'kooza ile ücretsiz Dijital Dönüşüm Yol Haritası oturumu alın',
      ],
    }
  }
  if (pct < 50) {
    return {
      name: 'Gelişen',
      color: '#ea580c',
      emoji: '🌿',
      description: 'Bazı temel araçları kullanıyorsunuz ama parçalı bir sistem. Birleştirip daha fazla değer çıkarabilirsiniz.',
      recommendations: [
        'Kullandığınız sistemleri tek panele entegre edin',
        'Tekrar eden işleri (fatura, hatırlatma) otomatize edin',
        'Sektörünüze özel bir otomasyon paketi inceleyin',
        'Veri-bazlı kararlar için dashboard kurulumu yapın',
      ],
    }
  }
  if (pct < 75) {
    return {
      name: 'Dijital',
      color: '#0891b2',
      emoji: '🌳',
      description: 'İyi bir dijital altyapınız var. Şimdi optimize etme ve büyüme zamanı.',
      recommendations: [
        'Pazarlama otomasyonu ile müşteri tabanınızı büyütün',
        'AI / chatbot ile müşteri hizmetini ölçeklendirin',
        'KVKK ve güvenlik denetiminden geçin',
        'Performans analitik ve A/B test ile süreçleri optimize edin',
      ],
    }
  }
  return {
    name: 'Lider',
    color: '#16a34a',
    emoji: '🏆',
    description: 'Sektörünüzün dijital liderlerindensiniz. Şimdi inovasyon ve yenilik zamanı.',
    recommendations: [
      'AI ve makine öğrenmesi ile öngörü modelleri kurun',
      'Self-servis ve API entegrasyonları ile partneri büyütün',
      'Sektörünüzde örnek vaka çalışması olarak hikayenizi paylaşın',
      'kooza ile yenilikçi pilot projeler başlatın',
    ],
  }
}

export default function MaturityTest() {
  const [step, setStep] = useState(0) // 0 = intro, 1..N = questions, N+1 = info form, N+2 = result
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [info, setInfo] = useState({ name: '', email: '', company: '', phone: '', sector: '', employeeCount: '' })
  const [submitting, setSubmitting] = useState(false)
  const [resultId, setResultId] = useState<string | null>(null)

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const level = levelFromScore(totalScore)
  const progress = step === 0 ? 0 : Math.min(100, (step / (QUESTIONS.length + 1)) * 100)

  const answerQuestion = (qid: string, score: number) => {
    setAnswers((a) => ({ ...a, [qid]: score }))
    setTimeout(() => setStep((s) => s + 1), 200)
  }

  const submit = async () => {
    if (!info.name || !info.email) {
      toast.error('Ad ve e-posta zorunlu')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
      toast.error('Geçerli bir e-posta girin')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/maturity-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...info,
          answers: QUESTIONS.map((q) => ({ id: q.id, area: q.area, score: answers[q.id] ?? 0 })),
          totalScore,
          level: level.name,
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setResultId(data.id)
      setStep(QUESTIONS.length + 2)
    } catch {
      toast.error('Gönderim başarısız, tekrar deneyin')
    } finally {
      setSubmitting(false)
    }
  }

  // INTRO
  if (step === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          Ücretsiz Dijital Olgunluk Testi
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-[1.1]">
          Şirketiniz dijital olarak<br />
          <span className="text-purple-700">ne kadar hazır?</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
          10 sorudan oluşan kısa testi tamamlayın, şirketinize özel <strong>dijital olgunluk skoru</strong> ve
          uygulanabilir <strong>yol haritası</strong> alın. Süre: ~2 dakika.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-button transition"
          >
            Teste Başla
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-sm">
          <div className="p-4 rounded-xl bg-purple-50">
            <div className="font-bold text-purple-900 text-lg">10</div>
            <div className="text-purple-700 text-xs">Soru</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-50">
            <div className="font-bold text-purple-900 text-lg">2 dk</div>
            <div className="text-purple-700 text-xs">Süre</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-50">
            <div className="font-bold text-purple-900 text-lg">PDF</div>
            <div className="text-purple-700 text-xs">Rapor</div>
          </div>
        </div>
      </div>
    )
  }

  // QUESTIONS
  if (step >= 1 && step <= QUESTIONS.length) {
    const q = QUESTIONS[step - 1]
    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Soru {step} / {QUESTIONS.length}</span>
            <span>{q.area}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 leading-tight">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answerQuestion(q.id, opt.score)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition group ${
                    answers[q.id] === opt.score
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-100 hover:border-purple-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        answers[q.id] === opt.score ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                      }`}
                    >
                      {answers[q.id] === opt.score && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <span className="font-medium text-gray-900">{opt.label}</span>
                  </div>
                </button>
              ))}
            </div>
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="mt-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Önceki soru
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  // INFO FORM
  if (step === QUESTIONS.length + 1) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-purple-700" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">Test tamamlandı!</h2>
          <p className="text-gray-600">
            Sonuçlarınızı görmek ve <strong>kişiselleştirilmiş yol haritanızı</strong> almak için bilgilerinizi paylaşın.
          </p>
        </div>

        <div className="space-y-4 bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-soft">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Adınız *</label>
              <input
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition"
                placeholder="Adınız Soyadınız"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">E-posta *</label>
              <input
                type="email"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition"
                placeholder="ornek@firma.com"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Şirket</label>
              <input
                value={info.company}
                onChange={(e) => setInfo({ ...info, company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition"
                placeholder="Şirket adı"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon</label>
              <input
                value={info.phone}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition"
                placeholder="0 (5__) ___ __ __"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Sektör</label>
              <select
                value={info.sector}
                onChange={(e) => setInfo({ ...info, sector: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition"
              >
                {SECTORS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Çalışan sayısı</label>
              <select
                value={info.employeeCount}
                onChange={(e) => setInfo({ ...info, employeeCount: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition"
              >
                {EMPLOYEES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={submit}
            disabled={submitting}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-button transition disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Hazırlanıyor...
              </>
            ) : (
              <>
                Sonuçlarımı Gör
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center pt-1">
            <AlertCircle className="w-3 h-3 inline mr-1" />
            E-posta adresinize sadece raporu gönderiyoruz. Spam yok, KVKK uyumlu.
          </p>
        </div>
      </div>
    )
  }

  // RESULT
  const pct = Math.round((totalScore / MAX_SCORE) * 100)
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">{level.emoji}</div>
        <span
          className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
          style={{ background: `${level.color}15`, color: level.color }}
        >
          Seviye: {level.name}
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          Skorunuz: <span style={{ color: level.color }}>{totalScore}/{MAX_SCORE}</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{level.description}</p>
      </div>

      {/* Score bar */}
      <div className="mb-10 bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
        <div className="flex justify-between text-sm font-semibold mb-3">
          <span className="text-gray-500">0</span>
          <span style={{ color: level.color }}>{pct}%</span>
          <span className="text-gray-500">{MAX_SCORE}</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: level.color }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-2 uppercase font-semibold">
          <span>Başlangıç</span>
          <span>Gelişen</span>
          <span>Dijital</span>
          <span>Lider</span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          Sizin için öneriler
        </h3>
        <div className="space-y-3">
          {level.recommendations.map((r, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/60 border border-purple-100">
              <div className="shrink-0 w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                {i + 1}
              </div>
              <div className="text-gray-800 leading-relaxed pt-0.5">{r}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 p-8 lg:p-10 text-white text-center">
        <Award className="w-12 h-12 mx-auto mb-4 text-white/90" />
        <h3 className="text-2xl lg:text-3xl font-bold mb-3">Şimdi sıra eyleme geçmekte</h3>
        <p className="text-white/85 mb-6 max-w-xl mx-auto">
          Şirketinize özel dijitalleşme yol haritasını birlikte çıkaralım. 30 dakikalık ücretsiz keşif görüşmesi.
        </p>
        <a
          href="/iletisim?tip=dijital-donusum"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-purple-700 hover:bg-gray-50 font-bold shadow-button transition"
        >
          Ücretsiz Görüşme Al
          <ArrowRight className="w-4 h-4" />
        </a>
        {resultId && (
          <p className="text-xs text-white/60 mt-4">Test ID: {resultId}</p>
        )}
      </div>
    </div>
  )
}
