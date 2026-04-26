import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: {
      product: { select: { name: true } },
      leadNotes: { orderBy: { createdAt: 'desc' } },
    },
  })
  if (!lead) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json(lead)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const { status, score, tags, assignedTo, notes } = body

  const lead = await prisma.lead.update({
    where: { id: params.id },
    data: {
      ...(status !== undefined && { status }),
      ...(score !== undefined && { score }),
      ...(tags !== undefined && { tags }),
      ...(assignedTo !== undefined && { assignedTo }),
      ...(notes !== undefined && { notes }),
    },
  })

  await prisma.activityLog.create({
    data: {
      userEmail: (session.user as any)?.email ?? null,
      action: 'LEAD_UPDATED',
      entity: 'Lead',
      entityId: params.id,
      details: JSON.stringify(body),
    },
  })

  return NextResponse.json(lead)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  await prisma.lead.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
