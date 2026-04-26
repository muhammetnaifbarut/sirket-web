'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  if (faqs.length === 0) return null

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-4">
            Sıkça Sorulan Sorular
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Akıllarda kalanlar.
          </h2>
          <p className="text-lg text-gray-600">
            Sorunun cevabı yoksa{' '}
            <Link href="/iletisim" className="text-purple-700 font-semibold hover:underline">
              bize yaz
            </Link>
            , 8 dakika içinde dönüyoruz.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f) => {
            const isOpen = openId === f.id
            return (
              <div
                key={f.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all ${
                  isOpen ? 'border-purple-200 shadow-soft' : 'border-gray-200'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : f.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-base sm:text-lg ${isOpen ? 'text-purple-700' : 'text-gray-900'}`}>
                    {f.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-purple-700' : 'text-gray-400'
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                        {f.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-100 rounded-2xl p-8">
          <MessageCircle className="w-10 h-10 text-purple-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 text-xl mb-2">Cevabını bulamadın mı?</h3>
          <p className="text-gray-600 mb-5 max-w-md mx-auto">
            Uzman ekibimiz WhatsApp üzerinden 7/24 yanındadır.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors shadow-button"
          >
            Bize Yaz
          </Link>
        </div>
      </div>
    </section>
  )
}
