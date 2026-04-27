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

      {videoUrl ? (
        <button onClick={() => setPlaying(true)} className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center group-hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-gray-900 font-semibold text-sm">Demo videosunu izle</p>
            <p className="text-gray-500 text-xs">~5 dakika</p>
          </div>
        </button>
      ) : (
        <a href="/demo" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all shadow-button hover:-translate-y-0.5">
          Ücretsiz Demo Talep Et
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
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
              <div
                className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl cursor-pointer group aspect-video"
                onClick={() => setPlaying(true)}
              >
                {posterImage ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${posterImage})` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <svg className="w-7 h-7 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                  <svg className="w-3 h-3 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-white/90 font-medium">5:32</span>
                </div>
              </div>
            ) : (
              // Video yoksa: Animasyonlu CANLI dashboard önizlemesi
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <span className="text-xs text-gray-400 font-medium">app.kooza.com.tr</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    CANLI
                  </div>
                </div>
                <HeroDashboard />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {playing && videoUrl && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPlaying(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video autoPlay controls className="w-full h-full">
              <source src={videoUrl} />
            </video>
            <button
              onClick={() => setPlaying(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </section>
  )
}
