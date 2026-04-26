import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const status = searchParams.get('status') || undefined

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: status ? { status: status as any } : {},
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.blogPost.count({ where: status ? { status: status as any } : {} }),
  ])

  return NextResponse.json({ posts, total, page, pages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const post = await prisma.blogPost.create({
    data: {
      ...body,
      authorId: (session.user as any).id,
      publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
    },
  })
  return NextResponse.json(post)
}
