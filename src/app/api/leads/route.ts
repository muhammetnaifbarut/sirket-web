import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/db'
import { rateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'
import { requireRole } from '@/lib/rbac'
import { notifyAdmin, leadEmailTemplate } from '@/lib/email'

const LEAD_LIMIT = 5
const LEAD_WINDOW_MS = 60 * 60 * 1000 // 1 saatte 5 talep

const leadSchema = z.object({
  name: z.string().trim().min(2, 'Ad en az 2 karakter olmalı').max(120),
  email: z.union([
    z.string().trim().toLowerCase().email('Geçerli bir e-posta gir'),
    z.literal(''),
  ]).optional().transform((v) => (v && v.length ? v : null)).nullable(),
  phone: z.string().trim().max(40).optional().nullable(),
  company: z.string().trim().max(160).optional().nullable(),
  message: z.string().trim().max(4000).optional().nullable(),
  subject: z.string().trim().max(200).optional().nullable(),
  productId: z.string().cuid().optional().nullable(),
  type: z.enum(['DEMO', 'CONTACT', 'QUOTE', 'NEWSLETTER']).optional(),
  // Honeypot: bot'lar doldurur, insan doldurmaz
  website: z.string().max(0).optional().or(z.literal('')).optional(),
})

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = rateLimit(`lead:${ip}`, { limit: LEAD_LIMIT, windowMs: LEAD_WINDOW_MS })

  if (!rl.success) {
    return NextResponse.json(
      { error: 'Çok fazla istek gönderdiniz, lütfen biraz sonra tekrar deneyin.' },
      { status: 429, headers: rateLimitHeaders(rl, LEAD_LIMIT) }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek' }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Doğrulama hatası', issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  // Honeypot doluysa sessizce başarılı gibi dön (bot hiçbir şey öğrenmesin)
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  try {
    const { name, email, phone, company, message, subject, productId, type } = parsed.data
    const finalEmail: string = email || `phone-${Date.now()}@kooza.local`
    const lead = await prisma.lead.create({
      data: {
        name,
        email: finalEmail,
        phone: phone || null,
        company: company || null,
        message: message || subject || null,
        productId: productId || null,
        type: type || 'CONTACT',
        status: 'NEW',
        source: req.headers.get('referer') || 'website',
        metadata: { ip, userAgent: req.headers.get('user-agent') ?? null },
      },
    })

    // Admin'e e-posta bildirimi (non-blocking)
    notifyAdmin(
      `Yeni ${type || 'CONTACT'} talebi: ${name}`,
      leadEmailTemplate({ name, email: finalEmail, phone, company, message: message || subject, source: type || 'CONTACT' })
    ).catch((e) => console.error('Email notify failed:', e))

    return NextResponse.json(
      { success: true, id: lead.id },
      { headers: rateLimitHeaders(rl, LEAD_LIMIT) }
    )
  } catch (error) {
    console.error('Lead create error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']).optional(),
  type: z.enum(['DEMO', 'CONTACT', 'QUOTE', 'NEWSLETTER']).optional(),
})

export async function GET(req: NextRequest) {
  const auth = await requireRole('VIEWER')
  if (!auth.ok) return auth.response

  const { searchParams } = new URL(req.url)
  const parsed = querySchema.safeParse({
    page: searchParams.get('page') ?? undefined,
    limit: searchParams.get('limit') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    type: searchParams.get('type') ?? undefined,
  })

  if (!parsed.success) {
    return NextResponse.json({ error: 'Geçersiz parametreler' }, { status: 400 })
  }

  const { page, limit, status, type } = parsed.data

  try {
    const where = {
      ...(status ? { status } : {}),
      ...(type ? { type } : {}),
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: { product: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ])

    return NextResponse.json({ leads, total, page, pages: Math.ceil(total / limit) })
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
