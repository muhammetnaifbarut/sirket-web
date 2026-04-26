import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET() {
  const services = await prisma.service.findMany({
    include: { packages: true },
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(services)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { packages, ...data } = await req.json()
  const service = await prisma.service.create({
    data: {
      ...data,
      packages: packages ? { create: packages } : undefined,
    },
    include: { packages: true },
  })
  return NextResponse.json(service)
}
