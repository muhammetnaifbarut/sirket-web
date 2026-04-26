import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const popups = await prisma.popup.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(popups)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const popup = await prisma.popup.create({ data: body })
  return NextResponse.json(popup)
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { id, ...data } = await req.json()
  const popup = await prisma.popup.update({ where: { id }, data })
  return NextResponse.json(popup)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { id } = await req.json()
  await prisma.popup.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
