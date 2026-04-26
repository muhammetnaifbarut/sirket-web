'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProductIcon from '@/components/site/ProductIcon'

interface Module {
  id: string
  name: string
  slug: string
  href: string
  icon: string
  iconColor: string
  bgColor: string
  description: string | null
  order: number
  isActive: boolean
}

export default function ModulesShowcase({ modules }: { modules: Module[] }) {
  const visible = modules.filter((m) => m.isActive)
  if (visible.length === 0) return null

  return (
    <section className="py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-4">
            Modüller
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
            Her ihtiyaca bir modül.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            İhtiyacınız olanı seçin, hepsini birlikte kullanın.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {visible.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.04,
                type: 'spring',
                bounce: 0.35,
              }}
            >
              <Link href={m.href} className="group flex flex-col items-center text-center">
                <div
                  className="w-full aspect-square rounded-2xl border border-gray-100 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1.5 group-hover:scale-105"
                  style={{ backgroundColor: m.bgColor }}
                >
                  <ProductIcon
                    name={m.icon}
                    className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: m.iconColor }}
                  />
                </div>
                <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-purple-700 transition-colors">
                  {m.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/yazilimlar"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-purple-200/60"
          >
            Tüm modülleri keşfet
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
