import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const ADMIN_KEY = process.env.ADMIN_KEY || 'kooza-admin-2026'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function checkAuth(req: NextRequest): boolean {
  const key = req.headers.get('x-admin-key') || req.nextUrl.searchParams.get('key')
  return key === ADMIN_KEY
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50')
    const status = request.nextUrl.searchParams.get('status')
    const productId = request.nextUrl.searchParams.get('product')

    const where: any = {}
    if (status) where.status = status
    if (productId) where.productId = productId

    const subscriptions = await prisma.subscription.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json({
      ok: true,
      subscriptions: subscriptions.map((s) => ({
        ...s,
        amount: Number(s.amount),
      })),
    })
  } catch (e: any) {
    console.error('Admin subscriptions error:', e)
    return NextResponse.json({ error: e.message || 'Hata' }, { status: 500 })
  }
}
