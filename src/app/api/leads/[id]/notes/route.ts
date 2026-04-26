import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { content } = await req.json()
  if (!content?.trim()) return NextResponse.json({ error: 'Not içeriği gerekli' }, { status: 400 })

  const note = await prisma.leadNote.create({
    data: {
      leadId: params.id,
      content: content.trim(),
      authorId: (session.user as any)?.email ?? null,
    },
  })

  return NextResponse.json(note)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { noteId } = await req.json()
  await prisma.leadNote.delete({ where: { id: noteId } })
  return NextResponse.json({ ok: true })
}
