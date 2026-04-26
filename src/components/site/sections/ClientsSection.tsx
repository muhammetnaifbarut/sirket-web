'use client'

import { motion } from 'framer-motion'

interface Client {
  id: string
  name: string
  logo?: string | null
  url?: string | null
}

const defaultClients: Client[] = [
  { id: '1', name: 'ABC Holding' },
  { id: '2', name: 'XYZ Teknoloji' },
  { id: '3', name: 'Global Lojistik' },
  { id: '4', name: 'Smart Retail' },
  { id: '5', name: 'EduTech AŞ' },
  { id: '6', name: 'FinGroup' },
  { id: '7', name: 'MedCare' },
  { id: '8', name: 'AgriTech' },
]

function ClientLogo({ client }: { client: Client }) {
  return (
    <div className="mx-8 shrink-0 group">
      <div className="h-14 flex items-center justify-center px-6 rounded-xl border border-gray-100 bg-white hover:border-purple-200 hover:shadow-md transition-all duration-300">
        {client.logo ? (
          <img
            src={client.logo}
            alt={client.name}
            className="h-8 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <span className="text-gray-400 font-bold text-sm group-hover:text-purple-600 transition-colors uppercase tracking-wider whitespace-nowrap">
            {client.name}
          </span>
        )}
      </div>
    </div>
  )
}

export default function ClientsSection({ clients }: { clients?: Client[] }) {
  const displayClients = clients && clients.length > 0 ? clients : defaultClients
  const doubled = [...displayClients, ...displayClients]

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
            Referanslarımız
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            500+ mutlu müşterimiz var.
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Türkiye'nin önde gelen şirketleri dijital dönüşüm için bize güveniyor.
          </p>
        </motion.div>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: displayClients.length * 3,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {doubled.map((client, i) => (
              <ClientLogo key={`${client.id}-${i}`} client={client} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
