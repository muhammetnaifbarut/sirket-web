import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function run() {
  // Try to add Çözümler menu item if it doesn't exist
  const all = await prisma.menuItem?.findMany?.({ orderBy: { order: 'asc' } } as any).catch(() => null)
  if (!all) {
    console.log('MenuItem model not found, skipping menu update')
    await prisma.$disconnect()
    return
  }

  const existing = all.find((m: any) => m.url === '/cozumler')
  if (existing) {
    console.log('✅ /cozumler menu item already exists')
  } else {
    await (prisma as any).menuItem.create({
      data: {
        label: 'Çözümler',
        url: '/cozumler',
        order: 2,
        location: 'header',
        isActive: true,
      },
    })
    console.log('✅ /cozumler menu item created')
  }

  // Print current menu
  const updated = await (prisma as any).menuItem.findMany({ orderBy: { order: 'asc' } })
  console.log('\nCurrent header menu:')
  updated.filter((m: any) => m.location === 'header' || !m.location).forEach((m: any) => {
    console.log(`  ${m.order}. ${m.label} → ${m.url}${m.isActive ? '' : ' (gizli)'}`)
  })

  await prisma.$disconnect()
}
run().catch(e => { console.error(e); process.exit(1) })
