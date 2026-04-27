import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const INTEGRATIONS = [
  // Pazaryeri
  { slug: 'trendyol', name: 'Trendyol', category: 'Pazaryeri', logo: '🛍️', isPopular: true, order: 1 },
  { slug: 'hepsiburada', name: 'Hepsiburada', category: 'Pazaryeri', logo: '📦', isPopular: true, order: 2 },
  { slug: 'n11', name: 'N11', category: 'Pazaryeri', logo: '🛒', order: 3 },
  { slug: 'amazon-tr', name: 'Amazon TR', category: 'Pazaryeri', logo: '📚', order: 4 },
  { slug: 'ciceksepeti', name: 'Çiçeksepeti', category: 'Pazaryeri', logo: '🌷', order: 5 },
  { slug: 'gittigidiyor', name: 'GittiGidiyor', category: 'Pazaryeri', logo: '🛒', order: 6 },
  { slug: 'pttavm', name: 'ePttAVM', category: 'Pazaryeri', logo: '📮', order: 7 },

  // Yemek Platformu
  { slug: 'yemeksepeti', name: 'Yemeksepeti', category: 'Yemek Platformu', logo: '🍽️', isPopular: true, order: 10 },
  { slug: 'getir-yemek', name: 'Getir Yemek', category: 'Yemek Platformu', logo: '🛵', isPopular: true, order: 11 },
  { slug: 'trendyol-yemek', name: 'Trendyol Yemek', category: 'Yemek Platformu', logo: '🍕', order: 12 },
  { slug: 'migros-yemek', name: 'Migros Yemek', category: 'Yemek Platformu', logo: '🥘', order: 13 },

  // Kargo
  { slug: 'aras-kargo', name: 'Aras Kargo', category: 'Kargo', logo: '🚚', isPopular: true, order: 20 },
  { slug: 'yurtici-kargo', name: 'Yurtiçi Kargo', category: 'Kargo', logo: '📮', isPopular: true, order: 21 },
  { slug: 'mng-kargo', name: 'MNG Kargo', category: 'Kargo', logo: '🚛', order: 22 },
  { slug: 'ptt-kargo', name: 'PTT Kargo', category: 'Kargo', logo: '📬', order: 23 },
  { slug: 'surat-kargo', name: 'Sürat Kargo', category: 'Kargo', logo: '⚡', order: 24 },
  { slug: 'ups', name: 'UPS', category: 'Kargo', logo: '📦', order: 25 },

  // Ödeme
  { slug: 'iyzico', name: 'Iyzico', category: 'Ödeme', logo: '💳', isPopular: true, order: 30 },
  { slug: 'paytr', name: 'PayTR', category: 'Ödeme', logo: '💰', order: 31 },
  { slug: 'param', name: 'Param', category: 'Ödeme', logo: '💵', order: 32 },
  { slug: 'stripe', name: 'Stripe', category: 'Ödeme', logo: '💎', order: 33 },
  { slug: 'paratika', name: 'Paratika', category: 'Ödeme', logo: '🏦', order: 34 },

  // Banka
  { slug: 'garanti', name: 'Garanti BBVA', category: 'Banka', logo: '🏦', isPopular: true, order: 40 },
  { slug: 'isbank', name: 'İş Bankası', category: 'Banka', logo: '🏦', isPopular: true, order: 41 },
  { slug: 'akbank', name: 'Akbank', category: 'Banka', logo: '🏦', order: 42 },
  { slug: 'yapikredi', name: 'Yapı Kredi', category: 'Banka', logo: '🏦', order: 43 },
  { slug: 'ziraat', name: 'Ziraat Bankası', category: 'Banka', logo: '🏦', order: 44 },
  { slug: 'qnb', name: 'QNB Finansbank', category: 'Banka', logo: '🏦', order: 45 },

  // Resmi (GİB / SGK / e-Devlet)
  { slug: 'gib-efatura', name: 'GİB e-Fatura', category: 'Resmi', logo: '🧾', isPopular: true, order: 50 },
  { slug: 'gib-earsiv', name: 'GİB e-Arşiv', category: 'Resmi', logo: '📑', isPopular: true, order: 51 },
  { slug: 'gib-eirsaliye', name: 'GİB e-İrsaliye', category: 'Resmi', logo: '📄', order: 52 },
  { slug: 'sgk', name: 'SGK e-Bildirge', category: 'Resmi', logo: '👥', order: 53 },
  { slug: 'mhrs', name: 'MHRS', category: 'Resmi', logo: '🏥', order: 54 },
  { slug: 'medula', name: 'MEDULA / e-Reçete', category: 'Resmi', logo: '💊', order: 55 },

  // Muhasebe
  { slug: 'luca', name: 'LUCA', category: 'Muhasebe', logo: '📊', isPopular: true, order: 60 },
  { slug: 'mikro', name: 'Mikro', category: 'Muhasebe', logo: '📊', order: 61 },
  { slug: 'eta', name: 'ETA SQL', category: 'Muhasebe', logo: '📊', order: 62 },
  { slug: 'logo', name: 'LOGO Tiger/Netsis', category: 'Muhasebe', logo: '📊', order: 63 },
  { slug: 'parasut', name: 'Paraşüt', category: 'Muhasebe', logo: '📊', order: 64 },

  // İletişim & Pazarlama
  { slug: 'whatsapp-business', name: 'WhatsApp Business', category: 'İletişim', logo: '💬', isPopular: true, order: 70 },
  { slug: 'sms-iletim', name: 'Toplu SMS (Iletim)', category: 'İletişim', logo: '📱', order: 71 },
  { slug: 'mailchimp', name: 'Mailchimp', category: 'İletişim', logo: '📧', order: 72 },
  { slug: 'sendpulse', name: 'SendPulse', category: 'İletişim', logo: '📧', order: 73 },
  { slug: 'instagram', name: 'Instagram Business', category: 'İletişim', logo: '📸', isPopular: true, order: 74 },
  { slug: 'meta-ads', name: 'Meta Ads (FB+IG)', category: 'İletişim', logo: '📢', order: 75 },

  // Takvim & Toplantı
  { slug: 'google-calendar', name: 'Google Calendar', category: 'Takvim', logo: '📅', isPopular: true, order: 80 },
  { slug: 'outlook-calendar', name: 'Outlook Calendar', category: 'Takvim', logo: '📆', order: 81 },
  { slug: 'zoom', name: 'Zoom', category: 'Takvim', logo: '🎥', order: 82 },
  { slug: 'google-meet', name: 'Google Meet', category: 'Takvim', logo: '🎥', order: 83 },
  { slug: 'microsoft-teams', name: 'Microsoft Teams', category: 'Takvim', logo: '🎥', order: 84 },

  // Otomasyon & Veri
  { slug: 'zapier', name: 'Zapier', category: 'Otomasyon', logo: '⚡', order: 90 },
  { slug: 'make', name: 'Make (Integromat)', category: 'Otomasyon', logo: '🔄', order: 91 },
  { slug: 'google-sheets', name: 'Google Sheets', category: 'Otomasyon', logo: '📊', order: 92 },
  { slug: 'webhook', name: 'Custom Webhook', category: 'Otomasyon', logo: '🔗', order: 93 },
  { slug: 'rest-api', name: 'REST API', category: 'Otomasyon', logo: '🔌', order: 94 },

  // Analitik
  { slug: 'google-analytics', name: 'Google Analytics 4', category: 'Analitik', logo: '📈', isPopular: true, order: 100 },
  { slug: 'meta-pixel', name: 'Meta Pixel', category: 'Analitik', logo: '👁️', order: 101 },
  { slug: 'hotjar', name: 'Hotjar', category: 'Analitik', logo: '🔥', order: 102 },
  { slug: 'mixpanel', name: 'Mixpanel', category: 'Analitik', logo: '📊', order: 103 },
]

async function main() {
  console.log('Entegrasyonlar seed başlıyor...\n')
  let created = 0, updated = 0
  for (const i of INTEGRATIONS) {
    const exists = await prisma.integration.findUnique({ where: { slug: i.slug } })
    if (exists) {
      await prisma.integration.update({ where: { slug: i.slug }, data: { ...i, isActive: true } as any })
      updated++
    } else {
      await prisma.integration.create({ data: { ...i, isActive: true } as any })
      created++
    }
  }
  console.log(`+ ${created} yeni · ↻ ${updated} güncel`)
  console.log(`Toplam ${INTEGRATIONS.length} entegrasyon.`)
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
