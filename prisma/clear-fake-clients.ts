import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const fakeNames = [
    'ABC Holding', 'XYZ Teknoloji', 'Global Lojistik', 'Smart Retail',
    'EduTech AŞ', 'FinGroup', 'MedCare', 'AgriTech',
  ]
  const result = await prisma.client.deleteMany({
    where: { name: { in: fakeNames } },
  })
  console.log(`Silinen fake müşteri kayıt: ${result.count}`)

  // Toplam kalan
  const remaining = await prisma.client.count()
  console.log(`Kalan toplam müşteri: ${remaining}`)
  if (remaining === 0) {
    console.log('→ ClientsSection sektör chip moduna geçecek (clientes boş)')
  }
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
