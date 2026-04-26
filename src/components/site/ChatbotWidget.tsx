'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQ {
  id: string
  question: string
  answer: string
}

interface ChatbotConfig {
  isEnabled: boolean
  welcomeMessage: string
  botName: string
  botAvatar?: string
  primaryColor: string
  position: string
  typingDelay: number
}

interface Message {
  id: string
  role: 'bot' | 'user'
  text: string
  time: string
}

interface ApiMessage {
  role: 'user' | 'assistant'
  content: string
}

interface CustomerInfo {
  name: string
  email: string
  phone: string
}

const defaultFAQs: FAQ[] = [
  { id: '1', question: 'ERP sistemi nedir?', answer: '' },
  { id: '2', question: 'Fiyatlandırma nasıl?', answer: '' },
  { id: '3', question: 'Demo nasıl talep edebilirim?', answer: '' },
  { id: '4', question: 'Kurulum ne kadar sürer?', answer: '' },
]

export default function ChatbotWidget({
  config,
  faqs = [],
}: {
  config?: Partial<ChatbotConfig>
  faqs?: FAQ[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'info' | 'chat'>('info')
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
  })
  const [infoSubmitting, setInfoSubmitting] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [apiHistory, setApiHistory] = useState<ApiMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const cfg: ChatbotConfig = {
    isEnabled: config?.isEnabled ?? true,
    welcomeMessage: config?.welcomeMessage ?? 'Merhaba! 👋 Size nasıl yardımcı olabilirim?',
    botName: config?.botName ?? 'kooza Asistan',
    primaryColor: config?.primaryColor ?? '#3B82F6',
    position: config?.position ?? 'bottom-right',
    typingDelay: config?.typingDelay ?? 500,
  }

  const allFAQs = faqs.length > 0 ? faqs : defaultFAQs

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const nowTime = () =>
    new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })

  const startChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'bot',
        text: `Merhaba ${customerInfo.name}! 👋 ${cfg.welcomeMessage}`,
        time: nowTime(),
      },
    ])
  }

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerInfo.name.trim()) return
    setInfoSubmitting(true)
    // Kısa gecikme ile chat'e geç
    setTimeout(() => {
      setStep('chat')
      setInfoSubmitting(false)
      startChat()
      setTimeout(() => inputRef.current?.focus(), 100)
    }, 400)
  }

  const handleOpen = () => {
    setIsOpen(true)
    if (!hasOpened) {
      setHasOpened(true)
    }
  }

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      time: nowTime(),
    }

    const newApiHistory: ApiMessage[] = [
      ...apiHistory,
      { role: 'user', content: userText },
    ]

    setMessages((prev) => [...prev, userMsg])
    setApiHistory(newApiHistory)
    setInput('')
    setIsLoading(true)

    const botMsgId = (Date.now() + 1).toString()
    setMessages((prev) => [
      ...prev,
      { id: botMsgId, role: 'bot', text: '', time: nowTime() },
    ])

    try {
      abortRef.current = new AbortController()
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newApiHistory,
          sessionId,
          customerName: customerInfo.name || undefined,
          email: customerInfo.email || undefined,
          phone: customerInfo.phone || undefined,
        }),
        signal: abortRef.current.signal,
      })

      if (!res.ok || !res.body) throw new Error('API hatası')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      let firstChunk = true

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })

        // İlk chunk'ta session ID'yi yakala
        if (firstChunk && chunk.startsWith('__SESSION_ID__:')) {
          const lines = chunk.split('\n')
          const sessionLine = lines[0]
          const newSessionId = sessionLine.replace('__SESSION_ID__:', '').trim()
          setSessionId(newSessionId)
          // Session ID satırını çıkart, kalan metni ekle
          const rest = lines.slice(1).join('\n')
          if (rest) {
            fullText += rest
            setMessages((prev) =>
              prev.map((m) => (m.id === botMsgId ? { ...m, text: fullText } : m))
            )
          }
          firstChunk = false
          continue
        }

        firstChunk = false
        fullText += chunk
        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, text: fullText } : m))
        )
      }

      setApiHistory((prev) => [
        ...prev,
        { role: 'assistant', content: fullText },
      ])
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? { ...m, text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.' }
            : m
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleFAQ = (faq: FAQ) => {
    sendMessage(faq.question)
  }

  const handleSend = () => sendMessage(input.trim())

  if (!cfg.isEnabled) return null

  const positionClass =
    cfg.position === 'bottom-left' ? 'bottom-6 left-6' : 'bottom-6 right-6'

  return (
    <div className={`fixed ${positionClass} z-50`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="mb-4 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            style={{ maxHeight: '580px' }}
          >
            {/* Header */}
            <div
              className="p-4 flex items-center justify-between flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${cfg.primaryColor}, ${cfg.primaryColor}dd)` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-lg overflow-hidden">
                  {cfg.botAvatar ? (
                    <img src={cfg.botAvatar} alt={cfg.botName} className="w-full h-full object-cover" />
                  ) : (
                    '🤖'
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{cfg.botName}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="text-white/70 text-xs">AI Destekli • Çevrimiçi</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── MÜŞTERİ BİLGİ FORMU ── */}
            {step === 'info' && (
              <div className="flex-1 flex flex-col justify-center p-6">
                <div className="text-center mb-5">
                  <div className="text-4xl mb-2">👋</div>
                  <h3 className="font-bold text-gray-900 text-lg">Merhaba!</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Size daha iyi yardımcı olmak için birkaç bilgi alabilir miyiz?
                  </p>
                </div>
                <form onSubmit={handleInfoSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Adınız <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Adınız Soyadınız"
                      required
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': cfg.primaryColor } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      E-posta
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo((p) => ({ ...p, email: e.target.value }))}
                      placeholder="ornek@sirket.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': cfg.primaryColor } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+90 5xx xxx xx xx"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': cfg.primaryColor } as React.CSSProperties}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!customerInfo.name.trim() || infoSubmitting}
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                    style={{ background: cfg.primaryColor }}
                  >
                    {infoSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Başlatılıyor...
                      </span>
                    ) : (
                      'Sohbeti Başlat →'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomerInfo({ name: 'Ziyaretçi', email: '', phone: '' })
                      setStep('chat')
                      startChat()
                    }}
                    className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Bilgi vermeden devam et
                  </button>
                </form>
              </div>
            )}

            {/* ── CHAT EKRANI ── */}
            {step === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'text-white rounded-br-sm'
                              : 'bg-white text-gray-700 rounded-bl-sm shadow-sm border border-gray-100'
                          }`}
                          style={msg.role === 'user' ? { background: cfg.primaryColor } : {}}
                        >
                          {msg.text || (
                            msg.role === 'bot' && isLoading ? (
                              <span className="flex gap-1 items-center py-0.5">
                                {[0, 1, 2].map((i) => (
                                  <motion.span
                                    key={i}
                                    className="block w-2 h-2 bg-gray-400 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                                  />
                                ))}
                              </span>
                            ) : null
                          )}
                          {msg.text && (
                            <div className={`text-xs mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                              {msg.time}
                              {msg.role === 'bot' && msg.id !== 'welcome' && (
                                <span className="ml-1 opacity-60">• AI</span>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick FAQs */}
                {messages.length <= 1 && !isLoading && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex-shrink-0">
                    <p className="text-xs text-gray-400 mb-2 font-medium">Sık sorulan sorular:</p>
                    <div className="flex flex-wrap gap-2">
                      {allFAQs.slice(0, 3).map((faq) => (
                        <button
                          key={faq.id}
                          onClick={() => handleFAQ(faq)}
                          className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                        >
                          {faq.question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                      placeholder={isLoading ? 'Yanıt bekleniyor...' : 'Mesajınızı yazın...'}
                      disabled={isLoading}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-50"
                      style={{ '--tw-ring-color': cfg.primaryColor } as React.CSSProperties}
                    />
                    <button
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="p-2.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: cfg.primaryColor }}
                    >
                      {isLoading ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        className="relative w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${cfg.primaryColor}, ${cfg.primaryColor}cc)` }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-400" />
          </span>
        )}
      </motion.button>
    </div>
  )
}
