'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Client {
  id: string
  name: string
  logo?: string | null
  url?: string | null
}

// Sektörel temsil — "fake müşteri logosu" yerine hangi sektörlerde uzmanız
const SECTORS = [
  { id: 's1', emoji: '🏥', label: 'Klinikler', href: '/cozumler/klinik' },
  { id: 's2', emoji: '🍽️', label: 'Restoran & Kafe', href: '/cozumler/restoran' },
  { id: 's3', emoji: '🛒', label: 'Market & Perakende', href: '/cozumler/market' },
  { id: 's4', emoji: '🎓', label: 'Eğitim Kurumları', href: '/cozumler/egitim' },
  { id: 's5', emoji: '👥', label: 'İK & Bordro', href: '/cozumler/ik' },
  { id: 's6', emoji: '🌐', label: 'Web & E-Ticaret', href: '/cozumler/e-ticaret' },
  { id: 's7', emoji: '🦷', label: 'Diş Hekimleri', href: '/cozumler/dis-hekimi' },
  { id: 's8', emoji: '🐾', label: 'Veteriner Klinikleri', href: '/cozumler/veteriner' },
  { id: 's9', emoji: '💄', label: 'Güzellik Salonları', href: '/cozumler/guzellik-salonu' },
]

function SectorChip({ sector }: { sector: typeof SECTORS[number] }) {
  return (
    <Link href={sector.href} className="mx-3 shrink-0 group">
      <div className="h-14 flex items-center gap-2.5 px-5 rounded-xl border border-gray-100 bg-white hover:border-purple-200 hover:shadow-md transition-all duration-300 whitespace-nowrap">
        <span className="text-2xl">{sector.emoji}</span>
        <span className="text-gray-700 font-semibold text-sm group-hover:text-purple-700 transition-colors">
          {sector.label}
        </span>
      </div>
    </Link>
  )
}

function RealClientLogo({ client }: { client: Client }) {
  return (
    <div className="mx-6 shrink-0 group">
      <div className="h-14 flex items-center justify-center px-6 rounded-xl border border-gray-100 bg-white hover:border-purple-200 hover:shadow-md transition-all duration-300">
        {client.logo ? (
          <img
            src={client.logo}
            alt={client.name}
            className="h-8 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <span className="text-gray-500 font-bold text-sm group-hover:text-purple-600 transition-colors uppercase tracking-wider whitespace-nowrap">
            {client.name}
          </span>
        )}
      </div>
    </div>
  )
}

export default function ClientsSection({ clients }: { clients?: Client[] }) {
  // Gerçek müşteri yoksa sektör chip'lerini göster (jenerik fake firma yerine)
  const hasRealClients = clients && clients.length > 0
  const items = hasRealClients ? [...clients!, ...clients!] : [...SECTORS, ...SECTORS]

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-4">
            {hasRealClients ? 'Müşterilerimiz' : 'Hizmet Verdiğimiz Sektörler'}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {hasRealClients
              ? 'İşletmeler kooza\'ya güveniyor.'
              : 'Sektörünüze uygun çözüm var.'}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {hasRealClients
              ? 'Türkiye\'nin önde gelen şirketleri dijital dönüşüm için bize güveniyor.'
              : 'tüm sektörler için özel paket. Sizinkini hemen seçin, demo isteyin.'}
          </p>
        </motion.div>
      </div>

      {/* Slider */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: items.length * 2.5,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {hasRealClients
              ? items.map((c: any, i) => <RealClientLogo key={`c-${c.id}-${i}`} client={c} />)
              : items.map((s: any, i) => <SectorChip key={`s-${s.id}-${i}`} sector={s} />)}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
