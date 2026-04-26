import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { startOfMonth, endOfMonth, subMonths, startOfWeek, endOfWeek, subWeeks, eachDayOfInterval, format } from 'date-fns'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  const now = new Date()

  // ── GENEL SAYILAR ──────────────────────────────────────────────
  const [
    totalLeads,
    totalChatSessions,
    totalBlogPosts,
    publishedBlogPosts,
    totalChatMessages,
    // Bu ay
    thisMonthLeads,
    thisMonthChats,
    // Geçen ay
    lastMonthLeads,
    lastMonthChats,
    // Bu hafta
    thisWeekLeads,
    thisWeekChats,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.chatSession.count(),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: 'PUBLISHED' } }),
    prisma.chatMessage.count({ where: { role: 'user' } }),
    prisma.lead.count({
      where: {
        createdAt: { gte: startOfMonth(now), lte: endOfMonth(now) },
      },
    }),
    prisma.chatSession.count({
      where: {
        createdAt: { gte: startOfMonth(now), lte: endOfMonth(now) },
      },
    }),
    prisma.lead.count({
      where: {
        createdAt: {
          gte: startOfMonth(subMonths(now, 1)),
          lte: endOfMonth(subMonths(now, 1)),
        },
      },
    }),
    prisma.chatSession.count({
      where: {
        createdAt: {
          gte: startOfMonth(subMonths(now, 1)),
          lte: endOfMonth(subMonths(now, 1)),
        },
      },
    }),
    prisma.lead.count({
      where: {
        createdAt: { gte: startOfWeek(now, { weekStartsOn: 1 }), lte: endOfWeek(now, { weekStartsOn: 1 }) },
      },
    }),
    prisma.chatSession.count({
      where: {
        createdAt: { gte: startOfWeek(now, { weekStartsOn: 1 }), lte: endOfWeek(now, { weekStartsOn: 1 }) },
      },
    }),
  ])

  // ── SON 30 GÜN GÜNLÜK DATA (Line Chart) ───────────────────────
  const thirtyDaysAgo = new Date(now)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29)

  const days = eachDayOfInterval({ start: thirtyDaysAgo, end: now })

  // Günlük lead sayıları
  const leadsPerDay = await prisma.$queryRaw<Array<{ day: string; count: number }>>`
    SELECT DATE("createdAt") as day, COUNT(*)::int as count
    FROM leads
    WHERE "createdAt" >= ${thirtyDaysAgo}
    GROUP BY DATE("createdAt")
    ORDER BY day ASC
  `

  const chatsPerDay = await prisma.$queryRaw<Array<{ day: string; count: number }>>`
    SELECT DATE("createdAt") as day, COUNT(*)::int as count
    FROM chat_sessions
    WHERE "createdAt" >= ${thirtyDaysAgo}
    GROUP BY DATE("createdAt")
    ORDER BY day ASC
  `

  const leadsMap = new Map(leadsPerDay.map((r) => [String(r.day).slice(0, 10), Number(r.count)]))
  const chatsMap = new Map(chatsPerDay.map((r) => [String(r.day).slice(0, 10), Number(r.count)]))

  const dailyData = days.map((day) => {
    const key = format(day, 'yyyy-MM-dd')
    return {
      date: format(day, 'dd MMM'),
      leads: leadsMap.get(key) || 0,
      chats: chatsMap.get(key) || 0,
    }
  })

  // ── SON 6 AY AYLIK DATA (Bar Chart) ───────────────────────────
  const monthlyData = await Promise.all(
    Array.from({ length: 6 }, (_, i) => {
      const month = subMonths(now, 5 - i)
      return Promise.all([
        prisma.lead.count({
          where: {
            createdAt: { gte: startOfMonth(month), lte: endOfMonth(month) },
          },
        }),
        prisma.chatSession.count({
          where: {
            createdAt: { gte: startOfMonth(month), lte: endOfMonth(month) },
          },
        }),
        prisma.blogPost.count({
          where: {
            createdAt: { gte: startOfMonth(month), lte: endOfMonth(month) },
          },
        }),
      ]).then(([leads, chats, posts]) => ({
        month: format(month, 'MMM yyyy'),
        leads,
        chats,
        posts,
      }))
    })
  )

  // ── LEAD TYPE DAĞILIMI ─────────────────────────────────────────
  const leadsByType = await prisma.lead.groupBy({
    by: ['type'],
    _count: true,
  })

  // ── LEAD STATUS DAĞILIMI ───────────────────────────────────────
  const leadsByStatus = await prisma.lead.groupBy({
    by: ['status'],
    _count: true,
  })

  // ── EN ÇOK GÖRÜNTÜLENEN BLOG YAZILARI ─────────────────────────
  const topPosts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { views: 'desc' },
    take: 5,
    select: { title: true, views: true, slug: true, publishedAt: true },
  })

  // ── SON CHAT MÜŞTERİLERİ ──────────────────────────────────────
  const recentCustomers = await prisma.chatSession.findMany({
    where: { email: { not: null } },
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: {
      id: true,
      customerName: true,
      email: true,
      phone: true,
      createdAt: true,
      _count: { select: { messages: true } },
    },
  })

  return NextResponse.json({
    summary: {
      totalLeads,
      totalChatSessions,
      totalChatMessages,
      totalBlogPosts,
      publishedBlogPosts,
      thisMonthLeads,
      thisMonthChats,
      lastMonthLeads,
      lastMonthChats,
      thisWeekLeads,
      thisWeekChats,
      leadGrowth:
        lastMonthLeads > 0
          ? Math.round(((thisMonthLeads - lastMonthLeads) / lastMonthLeads) * 100)
          : 0,
      chatGrowth:
        lastMonthChats > 0
          ? Math.round(((thisMonthChats - lastMonthChats) / lastMonthChats) * 100)
          : 0,
    },
    dailyData,
    monthlyData,
    leadsByType: leadsByType.map((r) => ({ type: r.type, count: r._count })),
    leadsByStatus: leadsByStatus.map((r) => ({ status: r.status, count: r._count })),
    topPosts,
    recentCustomers,
  })
}
