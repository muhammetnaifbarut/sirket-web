import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    let settings = await prisma.chatbotSettings.findFirst()
    if (!settings) {
      settings = await prisma.chatbotSettings.create({
        data: {
          isEnabled: true,
          welcomeMessage: 'Merhaba! Size nasıl yardımcı olabilirim?',
          botName: 'Asistan',
          primaryColor: '#3B82F6',
          position: 'bottom-right',
          typingDelay: 1000,
        },
      })
    }
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const existing = await prisma.chatbotSettings.findFirst()
    let settings
    if (existing) {
      settings = await prisma.chatbotSettings.update({
        where: { id: existing.id },
        data: body,
      })
    } else {
      settings = await prisma.chatbotSettings.create({ data: body })
    }
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
