'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface FAQ {
  id?: string
  question: string
  answer: string
  order: number
  isActive: boolean
}

interface ChatbotConfig {
  isEnabled: boolean
  welcomeMessage: string
  botName: string
  primaryColor: string
  position: string
  typingDelay: number
}

export default function ChatbotAdminPage() {
  const [config, setConfig] = useState<ChatbotConfig>({
    isEnabled: true,
    welcomeMessage: 'Merhaba! Size nasıl yardımcı olabilirim?',
    botName: 'Asistan',
    primaryColor: '#3B82F6',
    position: 'bottom-right',
    typingDelay: 1000,
  })
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' })
  const [addingFaq, setAddingFaq] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/chatbot/settings').then((r) => r.json()),
      fetch('/api/chatbot/faqs').then((r) => r.json()),
    ]).then(([cfg, faqList]) => {
      if (cfg && !cfg.error) setConfig(cfg)
      if (Array.isArray(faqList)) setFaqs(faqList)
      setLoading(false)
    })
  }, [])

  const saveConfig = async () => {
    setSaving(true)
    try {
      await fetch('/api/chatbot/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      toast.success('Chatbot ayarları kaydedildi!')
    } catch {
      toast.error('Hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  const addFaq = async () => {
    if (!newFaq.question || !newFaq.answer) return
    setAddingFaq(true)
    try {
      const res = await fetch('/api/chatbot/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newFaq, order: faqs.length, isActive: true }),
      })
      const created = await res.json()
      setFaqs((f) => [...f, created])
      setNewFaq({ question: '', answer: '' })
      toast.success('SSS eklendi')
    } catch {
      toast.error('Hata oluştu')
    } finally {
      setAddingFaq(false)
    }
  }

  const deleteFaq = async (id: string) => {
    await fetch(`/api/chatbot/faqs/${id}`, { method: 'DELETE' })
    setFaqs((f) => f.filter((x) => x.id !== id))
    toast.success('Silindi')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" /></div>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Chatbot</h1>
          <p className="text-gray-500 text-sm mt-1">Chatbot ayarları ve hazır yanıtları yönetin</p>
        </div>
        <button
          onClick={saveConfig}
          disabled={saving}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50"
        >
          {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
        </button>
      </div>

      {/* Config */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="font-semibold text-gray-900">Genel Ayarlar</h2>
          <button
            onClick={() => setConfig((c) => ({ ...c, isEnabled: !c.isEnabled }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${config.isEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${config.isEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bot Adı</label>
            <input
              value={config.botName}
              onChange={(e) => setConfig((c) => ({ ...c, botName: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Konum</label>
            <select
              value={config.position}
              onChange={(e) => setConfig((c) => ({ ...c, position: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bottom-right">Sağ Alt</option>
              <option value="bottom-left">Sol Alt</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Karşılama Mesajı</label>
          <textarea
            rows={2}
            value={config.welcomeMessage}
            onChange={(e) => setConfig((c) => ({ ...c, welcomeMessage: e.target.value }))}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ana Renk</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => setConfig((c) => ({ ...c, primaryColor: e.target.value }))}
                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1"
              />
              <input
                type="text"
                value={config.primaryColor}
                onChange={(e) => setConfig((c) => ({ ...c, primaryColor: e.target.value }))}
                className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Yazı Gecikmesi (ms)</label>
            <input
              type="number"
              value={config.typingDelay}
              onChange={(e) => setConfig((c) => ({ ...c, typingDelay: Number(e.target.value) }))}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Hazır Yanıtlar (SSS)</h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm mb-1">{faq.question}</p>
                  <p className="text-gray-500 text-sm line-clamp-2">{faq.answer}</p>
                </div>
                <button
                  onClick={() => faq.id && deleteFaq(faq.id)}
                  className="shrink-0 text-red-400 hover:text-red-600 transition-colors p-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add FAQ */}
        <div className="border border-dashed border-gray-200 rounded-xl p-4 space-y-3">
          <p className="text-sm font-medium text-gray-700">Yeni SSS Ekle</p>
          <input
            value={newFaq.question}
            onChange={(e) => setNewFaq((f) => ({ ...f, question: e.target.value }))}
            placeholder="Soru"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows={2}
            value={newFaq.answer}
            onChange={(e) => setNewFaq((f) => ({ ...f, answer: e.target.value }))}
            placeholder="Cevap"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addFaq}
            disabled={addingFaq || !newFaq.question || !newFaq.answer}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {addingFaq ? 'Ekleniyor...' : 'Ekle'}
          </button>
        </div>
      </div>
    </div>
  )
}
