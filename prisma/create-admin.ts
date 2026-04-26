import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'muhammet@operx.com'
  const name = 'Muhammet Barut'
  const plain = 'Op3rx.Admin2026'

  const password = await bcrypt.hash(plain, 12)
  const user = await prisma.user.upsert({
    where: { email },
    update: { name, password, role: UserRole.SUPER_ADMIN },
    create: { email, name, password, role: UserRole.SUPER_ADMIN },
  })

  console.log('OK:', user.email, '-', user.role)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
