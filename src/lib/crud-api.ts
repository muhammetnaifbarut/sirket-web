import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

type Model = {
  findMany: (args?: any) => Promise<any[]>
  create: (args: { data: any }) => Promise<any>
  update: (args: { where: { id: string }; data: any }) => Promise<any>
  delete: (args: { where: { id: string } }) => Promise<any>
}

/**
 * Generic CRUD helpers for admin-only resources.
 * Wraps a Prisma model with authenticated POST/PUT/DELETE.
 */

export function makeCollectionRoute(model: Model, options?: { orderBy?: any }) {
  return {
    async GET() {
      const items = await model.findMany({
        orderBy: options?.orderBy ?? { createdAt: 'desc' },
      })
      return NextResponse.json(items)
    },
    async POST(req: NextRequest) {
      const session = await getServerSession(authOptions)
      if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
      const data = await req.json()
      const created = await model.create({ data })
      return NextResponse.json(created)
    },
  }
}

export function makeItemRoute(model: Model) {
  return {
    async PUT(req: NextRequest, { params }: { params: { id: string } }) {
      const session = await getServerSession(authOptions)
      if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
      const data = await req.json()
      const updated = await model.update({ where: { id: params.id }, data })
      return NextResponse.json(updated)
    },
    async DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
      const session = await getServerSession(authOptions)
      if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
      await model.delete({ where: { id: params.id } })
      return NextResponse.json({ success: true })
    },
  }
}
