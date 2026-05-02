'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import HeroBackground from '@/components/site/HeroBackground'
import HeroDashboard from '@/components/site/HeroDashboard'
import HeroDashboardMobile from '@/components/site/HeroDashboardMobile'
import AnimatedCounter from '@/components/site/AnimatedCounter'
import { ArrowRight, Check } from 'lucide-react'

interface TickerItem {
  emoji: string
  text: string
}
interface StatItem {
  value: string
  label: string
  color: string
}
interface HeroProps {
  settings: Record<string, string>
  ticker?: TickerItem[]
  stats?: StatItem[]
}

const FALLBACK_TICKER: TickerItem[] = [
  { emoji: '👥', text: 'Bu hafta 87 yeni işletme katıldı' },
  { emoji: '⚡', text: '12.847 randevu bugün oluşturuldu' },
  { emoji: '📦', text: '3.4M ürün aktif takipte' },
  { emoji: '💼', text: '500+ KOBİ kooza kullanıyor' },
  { emoji: '⏱️', text: 'Ortalama 5 dakikada kuruluyor' },
  { emoji: '🎯', text: '%98.7 müşteri memnuniyeti' },
]

const FALLBACK_STATS: StatItem[] = [
  { value: '500+', label: 'Aktif İşletme', color: '#714B67' },
  { value: '1.247', label: 'Kurulum', color: '#714B67' },
  { value: '%98.7', label: 'Memnuniyet', color: '#714B67' },
  { value: '24/7', label: 'Destek', color: '#714B67' },
]

export default function HeroSection({ settings, ticker, stats }: HeroProps) {
  const tickerItems = ticker && ticker.length > 0 ? ticker : FALLBACK_TICKER
  const statItems = stats && stats.length > 0 ? stats : FALLBACK_STATS
  const title = settings.hero_title || 'Sektörünüze özel tüm yazılımlar, tek platformda'
  const subtitle =
    settings.hero_subtitle ||
    '10 farklı sektör için kurulmuş 10 hazır yazılım. Klinik, kafe, kuaför, hukuk bürosu, site yönetimi, emlak ofisi, müteahhit, eğitim merkezi, muhasebe ve İK — hepsi tek çatı altında. Türkçe, KVKK uyumlu, mobilde uygulama gibi.'
  const btn1Label = settings.hero_cta_label || 'Ücretsiz Başla'
  const btn1Url = settings.hero_cta_url || '/demo'
  const btn2Label = settings.hero_secondary_label || 'Ürünleri İncele'
  const btn2Url = settings.hero_secondary_url || '/yazilimlar'
  const heroScreenshot = settings.hero_screenshot
  const badge = settings.hero_badge || "Türkiye'nin yeni nesil işletme platformu"

  const titleLines = title.split('\n')

  return (
    <section className="relative bg-white overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28 pb-10 lg:pb-16">
        {/* ── Top badge — clickable, hints at modules below ───────────── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <Link
            href="/cozumler"
            className="group inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 hover:border-purple-300 hover:bg-purple-100 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-purple-700">
              {badge}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* ── Headline — display size, mobile-friendly ─────────────── */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-[2.25rem] sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.05] tracking-[-0.025em] mb-5 sm:mb-6 px-2"
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
              {i === titleLines.length - 1 ? '.' : ''}
            </span>
          ))}
        </motion.h1>

        {/* ── Subtitle ──────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4"
        >
          {subtitle}
        </motion.p>

        {/* ── CTAs — primary dominant, secondary outline, tertiary text ─ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center mb-5 px-4"
        >
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* PRIMARY — visually dominant */}
            <Link
              href={btn1Url}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-purple-600 text-white font-bold text-base hover:bg-purple-700 transition-all shadow-elevated hover:-translate-y-0.5 hover:shadow-button min-h-[52px]"
            >
              {btn1Label}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            {/* SECONDARY — outline */}
            <Link
              href={btn2Url}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-semibold text-base hover:border-purple-300 hover:bg-purple-50 transition-all min-h-[52px]"
            >
              {btn2Label}
            </Link>
          </div>
          {/* TERTIARY — 2 ücretsiz araç */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center justify-center text-sm">
            <Link
              href="/dijital-olgunluk-testi"
              className="text-purple-700 hover:text-purple-900 font-semibold inline-flex items-center gap-1.5 group"
            >
              <span className="text-base">🎯</span>
              <span>2 dk dijital olgunluk testi</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <span className="hidden sm:inline text-gray-300">·</span>
            <Link
              href="/dijital-rehber"
              className="text-purple-700 hover:text-purple-900 font-semibold inline-flex items-center gap-1.5 group"
            >
              <span className="text-base">📘</span>
              <span>Sektörel rehberi indir</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* ── Trust line — checkmarks ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-x-5 gap-y-1 text-xs sm:text-sm text-gray-500 mb-12 sm:mb-16 px-4"
        >
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-success-500" /> 14 gün ücretsiz
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-success-500" /> Kredi kartı yok
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-success-500" /> 5 dk kurulum
          </span>
        </motion.div>

        {/* ── Dashboard preview — gentle floating ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          <div
            aria-hidden
            className="absolute -inset-x-4 sm:-inset-x-12 -top-8 -bottom-8 bg-gradient-to-br from-purple-200/30 via-pink-200/20 to-amber-200/20 rounded-[40px] blur-3xl pointer-events-none animate-pulse"
            style={{ animationDuration: '6s' }}
          />

          <motion.div
            className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-card bg-white"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-xs text-gray-400 font-medium">app.kooza.com.tr</span>
              </div>
              <div className="w-12" />
            </div>

            {heroScreenshot ? (
              <div className="relative aspect-[16/9]">
                <Image
                  src={heroScreenshot}
                  alt="kooza"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            ) : (
              <>
                {/* Mobile: simplified vertical mockup */}
                <div className="block sm:hidden">
                  <HeroDashboardMobile />
                </div>
                {/* Tablet+: full interactive dashboard */}
                <div className="hidden sm:block">
                  <HeroDashboard />
                </div>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* ── Live ticker — moved AFTER dashboard, gives "pulse" ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative max-w-4xl mx-auto mt-12 sm:mt-16 overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          <motion.div
            className="flex gap-8 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
          >
            {[...tickerItems, ...tickerItems].map((it, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 shrink-0"
              >
                <span className="text-base">{it.emoji}</span>
                <span>{it.text}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 ml-4" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stats moved to END (own band) — Eren's call ──────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 border-t border-gray-100 bg-gray-50/40"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statItems.map((stat, i) => (
              <div key={i} className="text-center">
                <AnimatedCounter
                  value={stat.value}
                  className="text-3xl lg:text-4xl font-bold mb-1 tabular-nums block"
                  style={{ color: stat.color }}
                />
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
