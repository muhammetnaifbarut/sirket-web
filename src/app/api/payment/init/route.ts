import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutForm } from '@/lib/iyzico'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/payment/init
 * Body: {
 *   product: 'mesken' | 'tamir' | 'hukuk' | ...,
 *   plan: 'baslangic' | 'pro' | 'kurumsal',
 *   price: number,
 *   buyer: { name, surname, email, gsmNumber, address, city }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product, plan, price, buyer } = body

    if (!product || !plan || !price || !buyer) {
      return NextResponse.json(
        { error: 'product, plan, price, buyer alanları zorunlu' },
        { status: 400 },
      )
    }

    const conversationId = `conv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const basketId = `kooza-${product}-${plan}-${Date.now()}`

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
    const origin = request.headers.get('origin') || 'https://kooza.tr'

    const result = await createCheckoutForm({
      conversationId,
      price: String(price),
      paidPrice: String(price),
      currency: 'TRY',
      basketId,
      callbackUrl: `${origin}/api/payment/callback?conv=${conversationId}`,
      buyer: {
        id: `buyer-${Date.now()}`,
        name: buyer.name || 'Test',
        surname: buyer.surname || 'Kullanıcı',
        gsmNumber: buyer.gsmNumber || '+905555555555',
        email: buyer.email,
        identityNumber: buyer.identityNumber || '11111111111',
        registrationAddress: buyer.address || 'Test Adres, Türkiye',
        ip,
        city: buyer.city || 'İstanbul',
        country: 'Türkiye',
      },
      shippingAddress: {
        contactName: `${buyer.name || 'Test'} ${buyer.surname || 'Kullanıcı'}`,
        city: buyer.city || 'İstanbul',
        country: 'Türkiye',
        address: buyer.address || 'Test Adres',
      },
      billingAddress: {
        contactName: `${buyer.name || 'Test'} ${buyer.surname || 'Kullanıcı'}`,
        city: buyer.city || 'İstanbul',
        country: 'Türkiye',
        address: buyer.address || 'Test Adres',
      },
      basketItems: [
        {
          id: `${product}-${plan}`,
          name: `kooza ${product[0].toUpperCase() + product.slice(1)} - ${plan}`,
          category1: 'SaaS',
          itemType: 'VIRTUAL',
          price: String(price),
        },
      ],
    })

    if (result.status !== 'success') {
      return NextResponse.json(
        { error: result.errorMessage || 'Ödeme formu başlatılamadı' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      ok: true,
      paymentPageUrl: result.paymentPageUrl,
      token: result.token,
      conversationId,
    })
  } catch (e: any) {
    console.error('Payment init error:', e)
    return NextResponse.json(
      { error: e.message || 'Beklenmeyen hata' },
      { status: 500 },
    )
  }
}
