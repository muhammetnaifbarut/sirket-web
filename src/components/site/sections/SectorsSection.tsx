'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProductIcon from '@/components/site/ProductIcon'

interface Sector {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
}

export default function SectorsSection({ sectors }: { sectors: Sector[] }) {
  if (!sectors || sectors.length === 0) return null

  // Duplicate for seamless infinite scroll
  const doubled = [...sectors, ...sectors]

  return (
    <section className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: sectors.length * 5,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {doubled.map((sector, i) => (
            <Link
              key={`${sector.id}-${i}`}
              href={`/sektorler/${sector.slug}`}
              className="group flex flex-col items-center text-center p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-400 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 w-44 shrink-0"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3 transition-transform group-hover:scale-110">
                <ProductIcon name={sector.icon || 'globe'} className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">{sector.name}</h3>
              {sector.description && (
                <p className="text-xs text-gray-500 line-clamp-2 leading-snug">
                  {sector.description}
                </p>
              )}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
