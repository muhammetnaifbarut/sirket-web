/**
 * Bilgi mimarisi düzelt:
 * Yazılımlar, Çözümler, Sektörler — 3 benzer menü vardı, müşteri kafası karışıyor.
 * Hepsini tek "Çözümler" altında topla, "Yazılımlar" tek modül listesi olarak kalsın.
 */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const items = await (prisma as any).menuItem.findMany({ orderBy: { order: 'asc' } })

  // Hedef header menü:
  // 1. Ana Sayfa
  // 2. Çözümler (ana — sektörel paketler)
  // 3. Modüller (yazılımlar)
  // 4. Fiyatlandırma
  // 5. Blog
  // 6. Hakkımızda
  // 7. İletişim
  // [CTA] Demo Talep Et

  const targetMenu = [
    { label: 'Ana Sayfa', url: '/', order: 1 },
    { label: 'Çözümler', url: '/cozumler', order: 2 },
    { label: 'Modüller', url: '/yazilimlar', order: 3 },
    { label: 'Fiyatlandırma', url: '/fiyatlandirma', order: 4 },
    { label: 'Blog', url: '/blog', order: 5 },
    { label: 'Hakkımızda', url: '/hakkimizda', order: 6 },
    { label: 'İletişim', url: '/iletisim', order: 7 },
  ]

  // Header'daki tüm öğeleri devre dışı bırak (önce temizle)
  await (prisma as any).menuItem.updateMany({
    where: { location: 'header' },
    data: { isActive: false },
  })

  // Hedefleri yeniden işle
  for (const m of targetMenu) {
    const existing = items.find((i: any) => i.url === m.url && i.location === 'header')
    if (existing) {
      await (prisma as any).menuItem.update({
        where: { id: existing.id },
        data: { ...m, location: 'header', isActive: true },
      })
      console.log(`UPDATED: ${m.label} → ${m.url}`)
    } else {
      await (prisma as any).menuItem.create({
        data: { ...m, location: 'header', isActive: true },
      })
      console.log(`+ CREATED: ${m.label} → ${m.url}`)
    }
  }

  // Eski karışık öğeleri temizle: Sektörler, Danışmanlık (ayrı sayfa olarak kalır ama menüde yok)
  console.log('\nFinal header menü:')
  const final = await (prisma as any).menuItem.findMany({
    where: { location: 'header', isActive: true },
    orderBy: { order: 'asc' },
  })
  final.forEach((m: any) => console.log(`  ${m.order}. ${m.label} → ${m.url}`))
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
