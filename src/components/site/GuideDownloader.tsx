'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight, Download, Mail, BookOpen, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const SECTORS = [
  { slug: 'klinik', name: 'Klinik & Sağlık', icon: '🏥', color: '#dc2626', bg: '#fef2f2', desc: 'Klinik, poliklinik, diş hekimi' },
  { slug: 'restoran', name: 'Restoran & Kafe', icon: '🍽️', color: '#ea580c', bg: '#fff7ed', desc: 'Restoran, kafe, fast-food' },
  { slug: 'market', name: 'Market & Perakende', icon: '🛒', color: '#16a34a', bg: '#f0fdf4', desc: 'Market, bakkal, perakende' },
  { slug: 'egitim', name: 'Eğitim & Kurs', icon: '🎓', color: '#4f46e5', bg: '#eef2ff', desc: 'Dershane, kurs, anaokulu' },
  { slug: 'ik', name: 'İnsan Kaynakları', icon: '👥', color: '#0891b2', bg: '#ecfeff', desc: '5-500 personel arası şirketler' },
  { slug: 'web', name: 'Web Sitesi & E-Ticaret', icon: '🌐', color: '#714B67', bg: '#f7f2f5', desc: 'Tüm işletmeler için' },
]

export default function GuideDownloader() {
  const [step, setStep] = useState<'select' | 'form' | 'done'>('select')
  const [selected, setSelected] = useState<typeof SECTORS[0] | null>(null)
  const [info, setInfo] = useState({ name: '', email: '', phone: '', company: '' })
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!info.name || !info.email) {
      toast.error('Ad ve e-posta zorunlu')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
      toast.error('Geçerli e-posta girin')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/guide-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...info, sector: selected!.slug }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Hata')
      }
      setStep('done')
    } catch (e: any) {
      toast.error(e.message || 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'done') {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 mb-6 shadow-elevated">
          <Mail className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Rehberiniz mailinize gönderildi! 📧</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
          <strong>{selected?.name}</strong> rehberi <strong>{info.email}</strong> adresine gönderildi.
          Spam klasörünü de kontrol etmeyi unutmayın.
        </p>
        <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 p-6 text-white">
          <p className="text-white/85 text-sm mb-4">Bu rehberi uygulamak için kooza yanınızda. 30 dakikalık ücretsiz keşif görüşmesi alın.</p>
          <a href="/iletisim" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-purple-700 hover:bg-gray-50 font-bold transition">
            Ücretsiz Görüşme Talep Et
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <button onClick={() => { setStep('select'); setSelected(null); setInfo({ name:'', email:'', phone:'', company:'' }) }} className="mt-6 text-sm text-gray-500 hover:text-purple-700">
          ← Başka rehber indir
        </button>
      </div>
    )
  }

  if (step === 'form' && selected) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-5 shadow-elevated" style={{ background: selected.bg }}>
            <span className="text-5xl">{selected.icon}</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{selected.name}</h2>
          <p className="text-gray-600">Rehberi mailinize göndermek için bilgilerinizi paylaşın</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-soft space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ad Soyad *</label>
              <input
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition"
                placeholder="Adınız Soyadınız"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">E-posta *</label>
              <input
                type="email"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition"
                placeholder="ornek@firma.com"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon</label>
              <input
                value={info.phone}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition"
                placeholder="0 5__ ___ __ __"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Şirket</label>
              <input
                value={info.company}
                onChange={(e) => setInfo({ ...info, company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition"
                placeholder="Şirket adı"
              />
            </div>
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-button transition disabled:opacity-60"
          >
            {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Gönderiliyor...</>) : (<><Download className="w-5 h-5" />Rehberi Mailime Gönder</>)}
          </button>

          <p className="text-xs text-gray-500 text-center pt-2">
            ✉️ Rehber anında mailinize gelir · Spam yok · KVKK uyumlu
          </p>

          <button onClick={() => { setStep('select'); setSelected(null) }} className="block mx-auto text-sm text-gray-500 hover:text-purple-700 pt-2">
            ← Başka sektör seç
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
          <BookOpen className="w-4 h-4" />
          Ücretsiz Sektörel Rehberler
        </span>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-5 leading-[1.05]">
          Sektörünüze özel<br />
          <span className="text-purple-700">dijitalleşme rehberi.</span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Sektörünüzü seçin, kapsamlı rehber mailinize gelsin.
          Sektör gerçekleri, en sık hatalar, yapılması gereken 10 şey ve beklenen kazançlar.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SECTORS.map((s) => (
          <button
            key={s.slug}
            onClick={() => { setSelected(s); setStep('form') }}
            className="group rounded-2xl bg-white border-2 border-gray-100 hover:border-purple-300 hover:shadow-elevated transition p-6 text-left"
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition group-hover:scale-110" style={{ background: s.bg }}>
              <span className="text-3xl">{s.icon}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{s.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{s.desc}</p>
            <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: s.color }}>
              <Download className="w-4 h-4" />
              Rehberi al
              <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        ✓ Ücretsiz · ✓ Anında mail ile · ✓ Spam yok · ✓ KVKK uyumlu
      </div>
    </div>
  )
}
