import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const faqs = await prisma.siteFaq.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] })
  return NextResponse.json(faqs)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const faq = await prisma.siteFaq.create({ data: body })
  return NextResponse.json(faq)
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { id, ...data } = await req.json()
  const faq = await prisma.siteFaq.update({ where: { id }, data })
  return NextResponse.json(faq)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { id } = await req.json()
  await prisma.siteFaq.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
