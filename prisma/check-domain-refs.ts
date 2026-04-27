import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Settings içinde kooza.vercel.app referansı var mı?
  const settings = await prisma.setting.findMany()
  const hasOld = settings.filter((s) => s.value?.includes('kooza.vercel.app'))
  console.log(`\n${hasOld.length} setting'te kooza.vercel.app referansı var:`)
  hasOld.forEach((s) => console.log(`  ${s.key} = ${s.value}`))

  // Update them
  for (const s of hasOld) {
    const newValue = s.value!.replace(/kooza\.vercel\.app/g, 'kooza.tr')
    await prisma.setting.update({
      where: { key: s.key },
      data: { value: newValue },
    })
    console.log(`  ↻ updated: ${s.key} → ${newValue}`)
  }

  console.log('\nTamam.')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
