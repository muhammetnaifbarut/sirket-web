'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

interface Plan {
  id: string
  name: string
  description: string | null
  monthlyPrice: any
  yearlyPrice: any
  features: string[]
  limitations: string[]
  isPopular: boolean
  ctaLabel: string
  ctaUrl: string
  badge?: string
}

const PLAN_ICONS: Record<string, string> = {
  Starter: '🚀',
  Professional: '💎',
  Enterprise: '🏢',
}

export default function PricingSection({ plans }: { plans: Plan[] }) {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Subtle pastel background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-4">
            Fiyatlandırma
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
            Bütçenize uygun planlar.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            İhtiyacınıza göre ölçeklenebilir çözümler. İstediğiniz zaman plan değiştirebilirsiniz.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                !isYearly ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isYearly ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Yıllık
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isYearly ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
              }`}>
                %20 indirim
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const price = isYearly ? Number(plan.yearlyPrice) / 12 : Number(plan.monthlyPrice)
            const icon = PLAN_ICONS[plan.name] || '📦'

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-purple-600 to-purple-700 border-2 border-purple-500/30 shadow-2xl shadow-purple-300/40 scale-[1.03] z-10'
                    : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                      En Popüler
                    </span>
                  </div>
                )}

                <div className="mb-7">
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className={`text-xl font-bold mb-2 ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.isPopular ? 'text-purple-100' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-7">
                  <div className="flex items-end gap-1">
                    <span className={`text-5xl font-bold tracking-tight ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>
                      {formatPrice(price)}
                    </span>
                    <span className={`text-sm mb-2.5 ${plan.isPopular ? 'text-purple-200' : 'text-gray-500'}`}>
                      /ay
                    </span>
                  </div>
                  {isYearly && (
                    <p className={`text-xs mt-1.5 ${plan.isPopular ? 'text-purple-200' : 'text-gray-500'}`}>
                      Yıllık {formatPrice(Number(plan.yearlyPrice))} faturalandırılır
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.isPopular ? 'bg-white/20' : 'bg-emerald-100'
                      }`}>
                        <svg
                          className={`w-3 h-3 ${plan.isPopular ? 'text-white' : 'text-emerald-600'}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-sm ${plan.isPopular ? 'text-purple-50' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.limitations.map((lim) => (
                    <li key={lim} className="flex items-start gap-3 opacity-40">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.isPopular ? 'bg-white/10' : 'bg-gray-100'
                      }`}>
                        <svg className={`w-3 h-3 ${plan.isPopular ? 'text-white/50' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className={`text-sm ${plan.isPopular ? 'text-purple-200' : 'text-gray-400'}`}>
                        {lim}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaUrl}
                  className={`group block w-full text-center py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                    plan.isPopular
                      ? 'bg-white text-purple-700 hover:bg-purple-50 shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.ctaLabel}
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 mt-12"
        >
          ✓ Kredi kartı gerekmez &nbsp;·&nbsp; ✓ İstediğiniz zaman iptal &nbsp;·&nbsp; ✓ 14 gün ücretsiz deneme
        </motion.p>
      </div>
    </section>
  )
}
