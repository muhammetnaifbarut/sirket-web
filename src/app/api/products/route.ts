import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET() {
  const products = await prisma.product.findMany({
    include: { pricing: true },
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const { pricing, ...productData } = body

  const product = await prisma.product.create({
    data: {
      ...productData,
      pricing: pricing ? { create: pricing } : undefined,
    },
    include: { pricing: true },
  })

  return NextResponse.json(product)
}
