import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const ADMIN_KEY = process.env.ADMIN_KEY || 'kooza-admin-2026'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-admin-key',
}

function checkAuth(req: NextRequest): boolean {
  const key = req.headers.get('x-admin-key') || req.nextUrl.searchParams.get('key')
  return key === ADMIN_KEY
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: CORS_HEADERS })
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: CORS_HEADERS })
  }

  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Aktif abonelik sayısı
    const activeSubsCount = await prisma.subscription.count({
      where: { status: { in: ['ACTIVE', 'TRIAL', 'PAID'] } },
    })

    // Toplam subscription
    const totalSubsCount = await prisma.subscription.count()

    // Bu ay yeni kayıt
    const newThisMonth = await prisma.subscription.count({
      where: { createdAt: { gte: startOfMonth } },
    })

    // Bugün yeni kayıt
    const newToday = await prisma.subscription.count({
      where: { createdAt: { gte: startOfDay } },
    })

    // Geçen ay yeni
    const newLastMonth = await prisma.subscription.count({
      where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
    })

    // MRR (aktif aboneliklerin aylık toplam tutarı)
    const activeSubs = await prisma.subscription.findMany({
      where: { status: { in: ['ACTIVE', 'TRIAL', 'PAID'] } },
      select: { amount: true, productId: true },
    })

    const mrr = activeSubs.reduce((sum, s) => sum + Number(s.amount), 0)
    const arr = mrr * 12

    // İptal oranı (basit hesap: cancelled / total)
    const cancelledCount = await prisma.subscription.count({
      where: { status: 'CANCELLED' },
    })
    const churn = totalSubsCount > 0 ? (cancelledCount / totalSubsCount) * 100 : 0

    // Ürün dağılımı
    const productGroups: Record<string, number> = {}
    activeSubs.forEach((s) => {
      productGroups[s.productId] = (productGroups[s.productId] || 0) + 1
    })

    // Lead sayısı
    const totalLeads = await prisma.lead.count()
    const leadsThisMonth = await prisma.lead.count({
      where: { createdAt: { gte: startOfMonth } },
    })

    // Trial → Paid conversion
    const trialOrFailedCount = await prisma.subscription.count({
      where: { status: { in: ['TRIAL', 'FAILED', 'PENDING'] } },
    })
    const paidCount = await prisma.subscription.count({
      where: { status: { in: ['ACTIVE', 'PAID'] } },
    })
    const conversion = trialOrFailedCount + paidCount > 0
      ? (paidCount / (trialOrFailedCount + paidCount)) * 100
      : 0

    return NextResponse.json({
      ok: true,
      stats: {
        activeSubsCount,
        totalSubsCount,
        cancelledCount,
        newThisMonth,
        newToday,
        newLastMonth,
        mrr,
        arr,
        churn: Math.round(churn * 10) / 10,
        conversion: Math.round(conversion * 10) / 10,
        productDistribution: productGroups,
        totalLeads,
        leadsThisMonth,
      },
    }, { headers: CORS_HEADERS })
  } catch (e: any) {
    console.error('Admin stats error:', e)
    return NextResponse.json({ error: e.message || 'Hata' }, { status: 500, headers: CORS_HEADERS })
  }
}
