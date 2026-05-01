/**
 * Header menüsünden "Modüller" butonunu kaldır.
 * Kullanıcı isteği: "web sitesinden modüller butonunu sil"
 */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // /yazilimlar URL'li tüm header menü öğelerini sil veya pasifleştir
  const result = await (prisma as any).menuItem.updateMany({
    where: {
      location: 'header',
      OR: [
        { url: '/yazilimlar' },
        { label: 'Modüller' },
        { label: 'Yazılımlar' },
      ],
    },
    data: { isActive: false },
  })

  console.log(`✅ ${result.count} öğe pasifleştirildi (Modüller / Yazılımlar)`)

  // Aktif header menüyü göster
  const final = await (prisma as any).menuItem.findMany({
    where: { location: 'header', isActive: true },
    orderBy: { order: 'asc' },
  })
  console.log('\nAktif header menü:')
  final.forEach((m: any) => console.log(`  ${m.order}. ${m.label} → ${m.url}`))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
