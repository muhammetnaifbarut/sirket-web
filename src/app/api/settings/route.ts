import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const group = searchParams.get('group') || undefined

  const settings = await prisma.setting.findMany({
    where: group ? { group } : undefined,
    orderBy: { key: 'asc' },
  })

  const obj = Object.fromEntries(settings.map((s) => [s.key, s.value]))
  return NextResponse.json(obj)
}

async function saveSettings(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const updates = Object.entries(body) as [string, string][]

  await Promise.all(
    updates.map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value), group: 'general' },
      })
    )
  )

  return NextResponse.json({ success: true })
}

export async function POST(req: NextRequest) {
  return saveSettings(req)
}

export async function PUT(req: NextRequest) {
  return saveSettings(req)
}
