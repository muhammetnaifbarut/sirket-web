import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const items = await prisma.heroTicker.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { items } = await req.json()
  // Replace all
  await prisma.heroTicker.deleteMany()
  if (Array.isArray(items) && items.length > 0) {
    await prisma.heroTicker.createMany({ data: items })
  }
  const fresh = await prisma.heroTicker.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(fresh)
}
