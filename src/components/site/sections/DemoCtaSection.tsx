'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DemoCtaSection({ settings }: { settings: Record<string, string> }) {
  const badge = settings.cta_badge || 'Ücretsiz 14 Gün Deneme'
  const titleRaw = settings.cta_title || 'Hemen başlamaya\nhazır mısınız?'
  const subtitle =
    settings.cta_subtitle ||
    '14 gün ücretsiz deneme ile tüm özellikleri keşfedin. Kredi kartı gerekmez, istediğiniz zaman iptal edebilirsiniz.'
  const btn1Label = settings.cta_btn1_label || 'Ücretsiz Demo Talep Et'
  const btn1Url = settings.cta_btn1_url || '/demo'
  const btn2Label = settings.cta_btn2_label || 'Bizimle İletişime Geç'
  const btn2Url = settings.cta_btn2_url || '/iletisim'

  const trustItems = [
    settings.cta_trust1 || '14 gün ücretsiz',
    settings.cta_trust2 || 'Kredi kartı gerekmez',
    settings.cta_trust3 || 'İstediğiniz zaman iptal',
    settings.cta_trust4 || '7/24 destek',
  ]

  const titleLines = titleRaw.split('\n')

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-700">
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/15 rounded-full blur-3xl" />
      </div>
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse" />
            {badge}
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p className="text-lg sm:text-xl text-purple-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
            <Link
              href={btn1Url}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-purple-700 text-base bg-white hover:bg-purple-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-purple-900/30"
            >
              {btn1Label}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={btn2Url}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              {btn2Label}
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {trustItems.filter(Boolean).map((item) => (
              <div key={item} className="flex items-center gap-2 text-purple-100 text-sm">
                <span className="text-amber-300 font-bold">✓</span>
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
