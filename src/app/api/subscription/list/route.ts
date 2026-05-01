import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')
    if (!email) {
      return NextResponse.json({ error: 'Email gerekli' }, { status: 400 })
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { email: email.toLowerCase().trim() },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        productId: true,
        productName: true,
        planSlug: true,
        planName: true,
        amount: true,
        currency: true,
        status: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      ok: true,
      subscriptions: subscriptions.map((s) => ({
        ...s,
        amount: Number(s.amount),
      })),
    })
  } catch (e: any) {
    console.error('Subscription list error:', e)
    return NextResponse.json({ error: e.message || 'Hata' }, { status: 500 })
  }
}
