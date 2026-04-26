import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/chat/sessions/[id] - Tek konuşmanın tüm mesajlarını getir
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  const chatSession = await prisma.chatSession.findUnique({
    where: { id: params.id },
    include: {
      messages: { orderBy: { createdAt: 'asc' } },
    },
  })

  if (!chatSession) {
    return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  }

  return NextResponse.json(chatSession)
}

// DELETE /api/chat/sessions/[id] - Konuşmayı sil
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  await prisma.chatSession.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
