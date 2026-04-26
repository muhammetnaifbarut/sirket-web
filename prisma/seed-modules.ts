import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const MODULES = [
  { name: 'Randevu',       slug: 'randevu',   icon: 'calendar',     iconColor: '#714B67', bgColor: '#f7f2f5', order: 1 },
  { name: 'Stok',          slug: 'stok',      icon: 'box',          iconColor: '#2563eb', bgColor: '#eff6ff', order: 2 },
  { name: 'CRM',           slug: 'crm',       icon: 'users',        iconColor: '#059669', bgColor: '#ecfdf5', order: 3 },
  { name: 'Finans',        slug: 'finans',    icon: 'chart-bar',    iconColor: '#d97706', bgColor: '#fffbeb', order: 4 },
  { name: 'İK',            slug: 'ik',        icon: 'briefcase',    iconColor: '#db2777', bgColor: '#fdf2f8', order: 5 },
  { name: 'Analitik',      slug: 'analitik',  icon: 'trending-up',  iconColor: '#0891b2', bgColor: '#ecfeff', order: 6 },
  { name: 'Satış Noktası', slug: 'pos',       icon: 'shopping-cart',iconColor: '#ea580c', bgColor: '#fff7ed', order: 7 },
  { name: 'Pazarlama',     slug: 'pazarlama', icon: 'megaphone',    iconColor: '#7c3aed', bgColor: '#f5f3ff', order: 8 },
  { name: 'Belgeler',      slug: 'belgeler',  icon: 'file-text',    iconColor: '#0284c7', bgColor: '#f0f9ff', order: 9 },
  { name: 'Proje',         slug: 'proje',     icon: 'kanban',       iconColor: '#0d9488', bgColor: '#f0fdfa', order: 10 },
  { name: 'Yardım',        slug: 'yardim',    icon: 'life-buoy',    iconColor: '#e11d48', bgColor: '#fff1f2', order: 11 },
  { name: 'eTicaret',      slug: 'eticaret',  icon: 'shopping-bag', iconColor: '#a21caf', bgColor: '#fdf4ff', order: 12 },
]

const TICKER = [
  { emoji: '👥', text: 'Bu hafta 87 yeni işletme katıldı', order: 1 },
  { emoji: '⚡', text: '12.847 randevu bugün oluşturuldu', order: 2 },
  { emoji: '📦', text: '3.4M ürün aktif takipte', order: 3 },
  { emoji: '💼', text: '500+ KOBİ kooza kullanıyor', order: 4 },
  { emoji: '⏱️', text: 'Ortalama 5 dakikada kuruluyor', order: 5 },
  { emoji: '🎯', text: '%98.7 müşteri memnuniyeti', order: 6 },
]

const STATS = [
  { value: '500+',  label: 'Aktif İşletme', color: '#714B67', order: 1 },
  { value: '1.247', label: 'Kurulum',       color: '#2563eb', order: 2 },
  { value: '%98.7', label: 'Memnuniyet',    color: '#059669', order: 3 },
  { value: '24/7',  label: 'Destek',        color: '#d97706', order: 4 },
]

async function main() {
  console.log('Seeding modules + ticker + stats...\n')

  for (const m of MODULES) {
    await prisma.siteModule.upsert({
      where: { slug: m.slug },
      update: m,
      create: m,
    })
    console.log('+ module:', m.name)
  }

  // Clear existing ticker/stats then re-seed (small datasets, idempotent)
  await prisma.heroTicker.deleteMany()
  for (const t of TICKER) {
    await prisma.heroTicker.create({ data: t })
    console.log('+ ticker:', t.text)
  }

  await prisma.heroStat.deleteMany()
  for (const s of STATS) {
    await prisma.heroStat.create({ data: s })
    console.log('+ stat:', s.value, s.label)
  }

  console.log('\n✅ Done.')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
