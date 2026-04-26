import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET() {
  const pages = await prisma.page.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(pages)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const body = await req.json()
  const page = await prisma.page.create({ data: body })
  return NextResponse.json(page)
}
