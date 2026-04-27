'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface SocialQuote {
  platform: 'twitter' | 'instagram' | 'linkedin' | 'whatsapp'
  username: string
  handle: string
  text: string
  date: string
  emoji?: string
}

const QUOTES: SocialQuote[] = [
  { platform: 'twitter', username: 'Mehmet Y.', handle: '@mehmetkooza', text: 'kooza\'ya geçeli 1 ay oldu, restoranımda 3 farklı sistemden 1\'ine düştüm. Ay sonu kasa açığım sıfıra indi 💜', date: '2 gün önce', emoji: '🔥' },
  { platform: 'instagram', username: 'Klinika Sağlık', handle: '@klinikasaglik', text: 'No-show oranımız %22\'den %5\'e düştü. WhatsApp hatırlatmaları gerçekten işe yarıyor.', date: '1 hafta önce', emoji: '👏' },
  { platform: 'linkedin', username: 'Burak Ö.', handle: 'CEO Atölye Konsept', text: 'Türkiye\'deki SaaS\'lar arasında en iyi UX kooza\'da. Ekibim 1 günde adapte oldu.', date: '3 gün önce', emoji: '💼' },
  { platform: 'twitter', username: 'Selin A.', handle: '@selinclothing', text: 'Trendyol + Hepsiburada + N11 stoklarımız tek panelden. Overselling sorunu bitti! 🎉', date: '5 gün önce', emoji: '🛍️' },
  { platform: 'instagram', username: 'Reflect Studio', handle: '@reflectstudiotr', text: 'Stilist takvimlerini tek yerden yönetiyorum. Müşteri sadakat puanı sayesinde tekrar gelen %71 oldu! 💕', date: '4 gün önce', emoji: '💄' },
  { platform: 'whatsapp', username: 'Ayşe D.', handle: '+90 532 *** ** **', text: 'Eskiden Excel\'de tutuyordum, kaybediyordum. Şimdi 12 mağazamın stoğu tek tıkla. 60+ saat tasarruf!', date: '1 hafta önce', emoji: '🛒' },
  { platform: 'twitter', username: 'Eren Ş.', handle: '@erensimsek', text: '5 şubeli restoranımı tek panelden yönetebilmek hayal gibiydi. kooza yaptı.', date: '2 hafta önce', emoji: '🍽️' },
  { platform: 'instagram', username: 'Dental Estetik', handle: '@dentalestetiktr', text: 'Panoramik röntgen arşivimiz dijital, hasta dosyası 5 saniyede. Yıllar önce başlasaydık keşke!', date: '3 gün önce', emoji: '🦷' },
  { platform: 'linkedin', username: 'Hakan Y.', handle: 'GM, Anadolu Endüstri', text: '50 kişilik ekibimizin bordro hesabı her ay 1 hafta sürerdi. kooza ile 1 saatte hazır oluyor.', date: '6 gün önce', emoji: '👥' },
]

const PLATFORM_COLORS = {
  twitter: { bg: 'bg-black', text: 'text-white', icon: '𝕏' },
  instagram: { bg: 'bg-gradient-to-br from-pink-500 to-amber-500', text: 'text-white', icon: '📸' },
  linkedin: { bg: 'bg-blue-600', text: 'text-white', icon: 'in' },
  whatsapp: { bg: 'bg-emerald-500', text: 'text-white', icon: '💬' },
}

function QuoteCard({ q, idx }: { q: SocialQuote; idx: number }) {
  const platform = PLATFORM_COLORS[q.platform]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-cardHover hover:-translate-y-0.5 transition-all break-inside-avoid mb-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-xl ${platform.bg} ${platform.text} flex items-center justify-center text-sm font-bold`}>
          {platform.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900 text-sm truncate">{q.username}</div>
          <div className="text-xs text-gray-500 truncate">{q.handle}</div>
        </div>
        {q.emoji && <span className="text-xl">{q.emoji}</span>}
      </div>
      <p className="text-sm text-gray-700 leading-relaxed mb-3">{q.text}</p>
      <div className="text-xs text-gray-400">{q.date}</div>
    </motion.div>
  )
}

export default function WallOfLove() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-sm font-semibold mb-4">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            Sevgi Duvarı
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Müşterilerimizin sosyal medya paylaşımları
          </h2>
          <p className="text-gray-600">
            Twitter, Instagram, LinkedIn, WhatsApp — gerçek müşterilerin gerçek deneyimleri.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {QUOTES.map((q, i) => (
            <QuoteCard key={i} q={q} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
