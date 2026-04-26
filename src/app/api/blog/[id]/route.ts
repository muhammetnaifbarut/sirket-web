import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
    include: { category: true, tags: true },
  })
  if (!post) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const post = await prisma.blogPost.update({
    where: { id: params.id },
    data: {
      ...body,
      publishedAt: body.status === 'PUBLISHED' ? new Date() : undefined,
    },
  })
  return NextResponse.json(post)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  await prisma.blogPost.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
