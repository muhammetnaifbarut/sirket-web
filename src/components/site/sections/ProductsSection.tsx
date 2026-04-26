'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ProductIcon from '@/components/site/ProductIcon'

interface Product {
  id: string
  name: string
  slug: string
  tagline: string | null
  description: string | null
  features: string[]
  screenshots: string[]
  icon: string | null
  badge: string | null
  videoUrl: string | null
}

// Single neutral palette — Odoo-style consistent cards
const accentColors = [
  { light: 'bg-gray-50', border: 'border-gray-100', icon: '#6b7280', text: 'text-gray-700', badge: 'bg-gray-50 text-gray-700 border-gray-200' },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const color = accentColors[index % accentColors.length]
  const hasScreenshot = product.screenshots && product.screenshots.length > 0
  const hasVideo = !!product.videoUrl

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group"
    >
      <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-2xl hover:shadow-purple-900/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        {/* Screenshot / Video preview */}
        <div className={`relative overflow-hidden ${hasScreenshot || hasVideo ? 'h-48' : 'h-36'}`}>
          {hasScreenshot ? (
            <>
              <Image
                src={product.screenshots[0]}
                alt={product.name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              {hasVideo && (
                <button
                  onClick={() => setVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
              {/* Browser chrome overlay */}
              <div className="absolute inset-x-0 top-0 h-6 bg-gray-100/90 backdrop-blur-sm border-b border-gray-200/50 flex items-center px-3 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400/70" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                <div className="w-2 h-2 rounded-full bg-green-400/70" />
              </div>
            </>
          ) : hasVideo ? (
            <div
              className={`w-full h-full ${color.light} flex items-center justify-center cursor-pointer`}
              onClick={() => setVideoPlaying(true)}
            >
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 ml-0.5" style={{ color: color.icon }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-gray-500">Tanıtım Videosunu İzle</p>
              </div>
            </div>
          ) : (
            /* Placeholder UI */
            <div className={`w-full h-full ${color.light} relative overflow-hidden`}>
              <div className="absolute inset-0 flex flex-col p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-300/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-300/60" />
                  <div className="w-3 h-3 rounded-full bg-green-300/60" />
                </div>
                <div className="flex-1 bg-white/50 rounded-lg p-3 space-y-2">
                  <div className="h-2 rounded-full bg-current opacity-20 w-3/4" style={{ color: color.icon }} />
                  <div className="h-2 rounded-full bg-current opacity-15 w-1/2" style={{ color: color.icon }} />
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-10 rounded-lg" style={{ backgroundColor: `${color.icon}18` }} />
                    ))}
                  </div>
                  <div className="h-12 rounded-lg w-full mt-1" style={{ backgroundColor: `${color.icon}10` }} />
                </div>
              </div>
              {/* Large icon overlay */}
              <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color.icon}15` }}>
                <ProductIcon name={product.icon || 'box'} className="w-5 h-5" style={{ color: color.icon }} />
              </div>
            </div>
          )}
        </div>

        {/* Card content */}
        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color.icon}15`, border: `1px solid ${color.icon}20` }}
              >
                <ProductIcon name={product.icon || 'box'} className="w-4.5 h-4.5" style={{ color: color.icon }} />
              </div>
              <h3 className="text-base font-bold text-gray-900">{product.name}</h3>
            </div>
            {product.badge && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${color.badge}`}>
                {product.badge}
              </span>
            )}
          </div>

          {product.tagline && (
            <p className="text-sm font-medium mb-2" style={{ color: color.icon }}>{product.tagline}</p>
          )}

          <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed flex-1">
            {product.description}
          </p>

          {/* Features */}
          <ul className="space-y-1.5 mb-5">
            {product.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: color.icon }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <Link
            href={`/yazilimlar/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold group/link"
            style={{ color: color.icon }}
          >
            Detayları İncele
            <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Video modal */}
      {videoPlaying && product.videoUrl && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setVideoPlaying(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video autoPlay controls className="w-full h-full">
              <source src={product.videoUrl} />
            </video>
            <button
              onClick={() => setVideoPlaying(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

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
            Yazılım Çözümleri
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
            İşletmeniz için güçlü araçlar.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Her sektöre özel geliştirilen yazılım çözümlerimizle verimliliğinizi artırın.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/yazilimlar"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 hover:shadow-md text-sm"
          >
            Tüm Yazılımları Görüntüle
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
