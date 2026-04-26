import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const unreadOnly = searchParams.get('unread') === 'true'

  const notifications = await prisma.siteNotification.findMany({
    where: unreadOnly ? { isRead: false } : undefined,
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  const unreadCount = await prisma.siteNotification.count({ where: { isRead: false } })
  return NextResponse.json({ notifications, unreadCount })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const notification = await prisma.siteNotification.create({ data: body })
  return NextResponse.json(notification)
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { id, markAll } = await req.json()

  if (markAll) {
    await prisma.siteNotification.updateMany({ data: { isRead: true } })
  } else if (id) {
    await prisma.siteNotification.update({ where: { id }, data: { isRead: true } })
  }

  return NextResponse.json({ ok: true })
}
