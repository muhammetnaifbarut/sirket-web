import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const UPDATES = [
  { key: 'site_email', value: 'info@kooza.tr' },
  { key: 'site_url', value: 'https://kooza.tr' },
  { key: 'whatsapp_message', value: 'Merhaba kooza, bilgi almak istiyorum.' },
]

async function main() {
  console.log('Domain ile ilgili settings güncelleniyor...\n')
  for (const u of UPDATES) {
    await prisma.setting.upsert({
      where: { key: u.key },
      update: { value: u.value },
      create: { key: u.key, value: u.value, group: 'site' },
    })
    console.log(`✓ ${u.key} = ${u.value}`)
  }
  console.log('\nTamam.')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
