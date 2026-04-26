import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, phone, sector, employeeCount, answers, totalScore, level } = body

    if (!name || !email || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Eksik alan' }, { status: 400 })
    }

    const result = await prisma.maturityTestResult.create({
      data: {
        name,
        email,
        company: company || null,
        phone: phone || null,
        sector: sector || null,
        employeeCount: employeeCount || null,
        answers,
        totalScore: Number(totalScore) || 0,
        level: level || 'Başlangıç',
      },
    })

    // Also create a Lead so it shows up in the CRM pipeline
    try {
      await prisma.lead.create({
        data: {
          type: 'CONTACT',
          name,
          email,
          phone: phone || null,
          company: company || null,
          message: `Dijitalleşme Olgunluk Testi tamamlandı. Skor: ${totalScore}/100 — Seviye: ${level}. Sektör: ${sector || '-'}, Çalışan: ${employeeCount || '-'}.`,
          source: 'maturity-test',
          status: 'NEW',
          tags: ['maturity-test', sector || 'genel'],
        },
      })
    } catch (e) {
      console.warn('Lead create failed:', e)
    }

    return NextResponse.json({ ok: true, id: result.id })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message || 'Hata' }, { status: 500 })
  }
}
