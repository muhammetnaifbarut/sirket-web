'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import HeroDashboardMobile from '@/components/site/HeroDashboardMobile'

interface VideoShowcaseSectionProps {
  settings: Record<string, string>
}

export default function VideoShowcaseSection({ settings }: VideoShowcaseSectionProps) {
  const [playing, setPlaying] = useState(false)

  const videoUrl = settings.showcase_video_url || '/showcase-video.mp4'
  const posterImage = settings.showcase_poster_image
  const badge = settings.showcase_badge || 'Canlı Önizleme'
  const title = settings.showcase_title || 'Güçlü özellikleri keşfedin.'
  const subtitle =
    settings.showcase_subtitle ||
    'Her sektör için özelleştirilmiş paneller. CRM\'den stoka, randevudan bordroya — her şey tek ekranda, gerçek zamanlı.'

  const features = [
    settings.showcase_feat1 || '⚡ Anlık veri akışı, gecikme yok',
    settings.showcase_feat2 || '🎨 Sezgisel arayüz, eğitim gerekmez',
    settings.showcase_feat3 || '📊 Gerçek zamanlı raporlama ve analiz',
    settings.showcase_feat4 || '🔒 KVKK uyumlu, %99.9 uptime',
  ]

  const titleLines = title.split('\n')

  const renderTextSide = () => (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
        {badge}
      </span>
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
        {titleLines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">{subtitle}</p>
      <ul className="space-y-3 mb-8">
        {features.filter(Boolean).map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-gray-700 text-sm">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5 shrink-0">
              <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {feat}
          </li>
        ))}
      </ul>

      <a href="/demo" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all shadow-button hover:-translate-y-0.5">
        Ücretsiz Demo Talep Et
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </motion.div>
  )

  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-200/30 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {renderTextSide()}

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {videoUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-black aspect-video">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                  poster={posterImage || undefined}
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Video yükleniyor...</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

    </section>
  )
}
