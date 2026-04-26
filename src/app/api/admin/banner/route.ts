import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const banners = await prisma.banner.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(banners)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const banner = await prisma.banner.create({ data: body })
  return NextResponse.json(banner)
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { id, ...data } = await req.json()
  const banner = await prisma.banner.update({ where: { id }, data })
  return NextResponse.json(banner)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { id } = await req.json()
  await prisma.banner.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
