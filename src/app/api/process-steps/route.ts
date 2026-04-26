import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const steps = await prisma.processStep.findMany({
      where: { isActive: true },
      orderBy: { step: 'asc' },
    })
    return NextResponse.json(steps)
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const step = await prisma.processStep.create({ data: body })
    return NextResponse.json(step, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
