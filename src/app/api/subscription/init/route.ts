import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutForm } from '@/lib/iyzico'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, productName, planSlug, planName, amount, buyer } = body

    if (!productId || !planSlug || !amount || !buyer?.email) {
      return NextResponse.json({ error: 'Eksik alan' }, { status: 400 })
    }

    const conversationId = `kooza-${productId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
    const origin = request.headers.get('origin') || 'https://kooza.tr'

    // Subscription kaydı oluştur (PENDING)
    const subscription = await prisma.subscription.create({
      data: {
        email: buyer.email,
        name: `${buyer.name} ${buyer.surname}`,
        phone: buyer.gsmNumber,
        company: buyer.company || null,
        taxId: buyer.taxId || null,
        productId,
        productName,
        planSlug,
        planName,
        amount: amount,
        currency: 'TRY',
        status: 'PENDING',
        conversationId,
      },
    })

    // iyzico checkout form
    const result = await createCheckoutForm({
      conversationId,
      price: String(amount),
      paidPrice: String(amount),
      currency: 'TRY',
      basketId: subscription.id,
      callbackUrl: `${origin}/api/subscription/callback?conv=${conversationId}`,
      buyer: {
        id: subscription.id,
        name: buyer.name || 'Müşteri',
        surname: buyer.surname || '',
        gsmNumber: buyer.gsmNumber || '+905555555555',
        email: buyer.email,
        identityNumber: buyer.taxId || '11111111111',
        registrationAddress: buyer.address || 'Türkiye',
        ip,
        city: buyer.city || 'İstanbul',
        country: 'Türkiye',
      },
      shippingAddress: {
        contactName: `${buyer.name} ${buyer.surname}`,
        city: buyer.city || 'İstanbul',
        country: 'Türkiye',
        address: buyer.address || buyer.city || 'Türkiye',
      },
      billingAddress: {
        contactName: buyer.company || `${buyer.name} ${buyer.surname}`,
        city: buyer.city || 'İstanbul',
        country: 'Türkiye',
        address: buyer.address || buyer.city || 'Türkiye',
      },
      basketItems: [
        {
          id: `${productId}-${planSlug}`,
          name: `${productName} - ${planName}`,
          category1: 'SaaS',
          itemType: 'VIRTUAL',
          price: String(amount),
        },
      ],
    })

    if (result.status !== 'success') {
      // Update subscription status to FAILED
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: 'FAILED', errorMessage: result.errorMessage || 'Ödeme başlatılamadı' },
      })
      return NextResponse.json({ error: result.errorMessage || 'Ödeme başlatılamadı' }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      paymentPageUrl: result.paymentPageUrl,
      token: result.token,
      conversationId,
      subscriptionId: subscription.id,
    })
  } catch (e: any) {
    console.error('Subscription init error:', e)
    return NextResponse.json({ error: e.message || 'Beklenmeyen hata' }, { status: 500 })
  }
}
