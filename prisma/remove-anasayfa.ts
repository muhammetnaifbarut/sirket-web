import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function run() {
  const items = await (prisma as any).menuItem.findMany({ orderBy: { order: 'asc' } })
  const home = items.find((m: any) => m.url === '/' || m.label === 'Ana Sayfa')
  if (home) {
    await (prisma as any).menuItem.delete({ where: { id: home.id } })
    console.log(`✅ "Ana Sayfa" menü öğesi kaldırıldı (${home.url})`)
  } else {
    console.log('Ana Sayfa zaten yok')
  }
  const updated = await (prisma as any).menuItem.findMany({ orderBy: { order: 'asc' } })
  console.log('\nGüncel menü:')
  updated.forEach((m: any) => console.log(`  ${m.order}. ${m.label} → ${m.url}`))
  await prisma.$disconnect()
}
run().catch(e => { console.error(e); process.exit(1) })
