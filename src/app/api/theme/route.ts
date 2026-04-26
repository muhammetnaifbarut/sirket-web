import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET() {
  const theme = await prisma.themeSettings.findFirst({ where: { isActive: true } })
  return NextResponse.json(theme)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()

  const theme = await prisma.themeSettings.upsert({
    where: { id: 'default' },
    update: body,
    create: { id: 'default', ...body },
  })

  return NextResponse.json(theme)
}
