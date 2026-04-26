'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Loader2, CheckCircle2, Mail, Brain } from 'lucide-react'
import toast from 'react-hot-toast'

const SECTORS = [
  '', 'Klinik / Sağlık', 'Restoran / Kafe', 'Market / Perakende', 'Eğitim / Kurs',
  'Hizmet Sektörü', 'İmalat / Üretim', 'E-Ticaret', 'İnşaat', 'Otomotiv', 'Lojistik', 'Diğer',
]

const EMPLOYEES = ['', '1-5', '6-20', '21-50', '51-100', '100+']

const REVENUES = ['', 'Belirtmek istemiyorum', '0-100K TL/ay', '100-500K TL/ay', '500K-2M TL/ay', '2M+ TL/ay']

const SYSTEM_OPTIONS = [
  'Excel / kağıt takibi',
  'Mevcut web sitesi',
  'CRM yazılımı',
  'Muhasebe yazılımı',
  'Stok yönetimi',
  'POS / kasa sistemi',
  'WhatsApp Business',
  'Sosyal medya yönetimi',
  'Email pazarlama',
  'Google Ads / SEO',
]

export default function RoadmapGenerator() {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form')
  const [info, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    sector: '',
    employeeCount: '',
    monthlyRevenue: '',
    websiteUrl: '',
    goals: '',
  })
  const [systems, setSystems] = useState<string[]>([])
  const [report, setReport] = useState('')

  const toggleSystem = (s: string) => {
    setSystems((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  const submit = async () => {
    if (!info.name || !info.email || !info.company || !info.sector || !info.goals) {
      toast.error('Yıldızlı alanları doldurun')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
      toast.error('Geçerli e-posta girin')
      return
    }
    setStep('loading')
    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...info, currentSystems: systems }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Hata')
      }
      const data = await res.json()
      setReport(data.report || '')
      setStep('result')
    } catch (e: any) {
      toast.error(e.message || 'Bir hata oluştu')
      setStep('form')
    }
  }

  // Render markdown manually to HTML
  const renderMarkdown = (md: string) => {
    return md
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('# ')) return <h1 key={i} className="text-3xl lg:text-4xl font-bold text-purple-700 mt-8 mb-4 leading-tight">{line.slice(2)}</h1>
        if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-3 leading-tight">{line.slice(3)}</h2>
        if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-gray-900 mt-5 mb-2">{line.slice(4)}</h3>
        if (line.startsWith('- ')) return <li key={i} className="text-gray-700 my-1.5 leading-relaxed">{line.slice(2)}</li>
        if (line.trim() === '') return <div key={i} className="h-2" />
        return <p key={i} className="text-gray-700 my-2 leading-relaxed">{line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>
      })
  }

  if (step === 'loading') {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="inline-block">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-200 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-elevated">
              <Brain className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-3">AI yol haritanız hazırlanıyor...</h2>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          Claude AI sizin için <strong>{info.company}</strong> şirketine özel kişiselleştirilmiş bir dijital dönüşüm yol haritası oluşturuyor. Bu işlem 30-60 saniye sürer.
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-purple-700">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Sektör analizi · Hedef değerlendirme · Aksiyon planı...</span>
        </div>
      </div>
    )
  }

  if (step === 'result') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 mb-5 shadow-elevated">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Yol Haritanız Hazır! 🎉</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Aşağıda raporunuzu görebilirsiniz. Aynı rapor <strong>{info.email}</strong> adresine de gönderildi.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-8 lg:p-12">
          <div className="prose prose-lg max-w-none">
            {renderMarkdown(report)}
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 p-8 lg:p-10 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-3">Bu raporu birlikte detaylandıralım</h3>
          <p className="text-white/85 mb-6 max-w-xl mx-auto">
            30 dakikalık ücretsiz keşif görüşmesinde, raporu detaylandırıp size özel teklif hazırlayabiliriz.
          </p>
          <a
            href="/iletisim?tip=ai-roadmap"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-purple-700 hover:bg-gray-50 font-bold shadow-button transition"
          >
            Ücretsiz Görüşme Talep Et
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setStep('form'); setReport(''); setSystems([]); }}
            className="text-sm text-gray-500 hover:text-purple-700"
          >
            ← Yeni rapor üret
          </button>
        </div>
      </div>
    )
  }

  // FORM
  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          AI Destekli — Ücretsiz
        </span>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-5 leading-[1.05]">
          Şirketinize özel<br />
          <span className="text-purple-700">dijital dönüşüm yol haritası.</span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Claude AI ile saniyeler içinde şirketinize özel kişiselleştirilmiş yol haritası alın.
          PDF olarak mailinize gelir, danışman görüşmesi ücretsizdir.
        </p>
      </div>

      <div className="rounded-2xl bg-white shadow-elevated border border-gray-100 p-8 lg:p-10 space-y-6">
        {/* Personal */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold inline-flex items-center justify-center">1</span>
            Kim olduğunuzu söyleyin
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Ad Soyad *" value={info.name} onChange={(v) => setInfo({ ...info, name: v })} placeholder="Adınız Soyadınız" />
            <Field label="E-posta *" type="email" value={info.email} onChange={(v) => setInfo({ ...info, email: v })} placeholder="ornek@firma.com" />
            <Field label="Telefon" value={info.phone} onChange={(v) => setInfo({ ...info, phone: v })} placeholder="0 5__ ___ __ __" />
            <Field label="Şirket Adı *" value={info.company} onChange={(v) => setInfo({ ...info, company: v })} placeholder="Şirketinizin adı" />
          </div>
        </div>

        {/* Company */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold inline-flex items-center justify-center">2</span>
            Şirket detayları
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Sektör *" value={info.sector} onChange={(v) => setInfo({ ...info, sector: v })} options={SECTORS} placeholder="Sektör seçin" />
            <Select label="Çalışan Sayısı *" value={info.employeeCount} onChange={(v) => setInfo({ ...info, employeeCount: v })} options={EMPLOYEES} placeholder="Çalışan sayısı" />
            <Select label="Aylık Ciro" value={info.monthlyRevenue} onChange={(v) => setInfo({ ...info, monthlyRevenue: v })} options={REVENUES} placeholder="Belirtmek istemiyorum" />
            <Field label="Web Siteniz" value={info.websiteUrl} onChange={(v) => setInfo({ ...info, websiteUrl: v })} placeholder="https://... (varsa)" />
          </div>
        </div>

        {/* Current systems */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold inline-flex items-center justify-center">3</span>
            Şu an neler kullanıyorsunuz?
          </h3>
          <p className="text-sm text-gray-500 mb-3">Hangisini kullanıyorsanız işaretleyin (birden çok seçebilirsiniz)</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {SYSTEM_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSystem(s)}
                className={`text-left px-4 py-3 rounded-xl border-2 transition ${
                  systems.includes(s)
                    ? 'border-purple-600 bg-purple-50 text-purple-900'
                    : 'border-gray-100 bg-white hover:border-purple-200 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center ${
                    systems.includes(s) ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                  }`}>
                    {systems.includes(s) && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-sm font-medium">{s}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold inline-flex items-center justify-center">4</span>
            Hedefiniz nedir?
          </h3>
          <textarea
            value={info.goals}
            onChange={(e) => setInfo({ ...info, goals: e.target.value })}
            rows={5}
            placeholder="Örnek: Müşteri sayımızı artırmak istiyoruz. Operasyonu daha verimli hale getirmek istiyoruz. Online satışa başlamak istiyoruz..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition resize-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            onClick={submit}
            className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-button transition"
          >
            <Brain className="w-5 h-5" />
            AI Yol Haritamı Üret
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
            <Mail className="w-3 h-3" />
            Rapor anında ekranda + mailinize gönderilir · Spam yok · KVKK uyumlu
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition"
      />
    </div>
  )
}

function Select({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition bg-white"
      >
        {options.map((o, i) => (
          <option key={i} value={o}>{o || placeholder || 'Seçin'}</option>
        ))}
      </select>
    </div>
  )
}
