'use client'

import { motion } from 'framer-motion'

interface Testimonial {
  id: string
  name: string
  role: string | null
  company: string | null
  content: string
  rating: number
  avatar: string | null
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-4">
            Müşteri Referansları
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
            Müşterilerimiz ne diyor?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Yüzlerce şirketin güvendiği çözümlerimizle fark yaratın.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-5xl text-gray-100 group-hover:text-purple-100 transition-colors font-serif leading-none">
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg
                    key={j}
                    className={`w-4 h-4 ${j < t.rating ? 'text-amber-400' : 'text-gray-200'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                "{t.content}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-base shrink-0">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">
                    {t.role}
                    {t.company ? ` • ${t.company}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
        >
          {[
            { icon: '🔒', text: 'KVKK Uyumlu' },
            { icon: '⭐', text: '%98 Memnuniyet' },
            { icon: '🏆', text: '10+ Yıl Tecrübe' },
            { icon: '🛡️', text: '7/24 Destek' },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-gray-500 text-sm">
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
