import { NextRequest, NextResponse } from 'next/server'
import { retrieveCheckoutForm } from '@/lib/iyzico'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const RESEND_API_KEY = process.env.RESEND_API_KEY

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function sendWelcomeEmail(sub: any) {
  if (!RESEND_API_KEY) return
  const productEmoji: Record<string, string> = {
    randevu: '📅', egitim: '🎓', mesken: '🏘️', tamir: '🔧', hukuk: '⚖️',
    insaat: '🏗️', emlak: '🏠', servis: '🍽️', muhasebe: '💰', ik: '👥',
  }
  const subdomain = sub.productId.toLowerCase()
  const productUrl = `https://${subdomain}.kooza.tr`
  const emoji = productEmoji[subdomain] || '🦋'

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'kooza <noreply@kooza.tr>',
        to: [sub.email],
        subject: `🎉 ${sub.productName} aboneliğin aktive oldu!`,
        html: `
<div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f9fafb;">
  <div style="background: linear-gradient(135deg, #714B67, #875A7B 50%, #FFC0CB); padding: 50px 30px; border-radius: 20px; color: white; text-align: center; margin-bottom: 24px;">
    <div style="font-size: 64px; margin-bottom: 16px;">${emoji}</div>
    <h1 style="margin: 0 0 12px; font-size: 30px; font-weight: 900;">Hoş geldin, ${sub.name}!</h1>
    <p style="margin: 0; opacity: 0.95; font-size: 17px;">${sub.productName} aboneliğin <strong>aktif</strong></p>
  </div>

  <div style="background: white; padding: 28px; border-radius: 16px; margin-bottom: 16px;">
    <h2 style="font-size: 18px; margin: 0 0 16px; color: #111827;">📋 Abonelik Detayların</h2>
    <table style="width:100%; font-size: 14px;">
      <tr><td style="color:#6b7280; padding: 6px 0;">Ürün:</td><td style="font-weight:600;">${sub.productName}</td></tr>
      <tr><td style="color:#6b7280; padding: 6px 0;">Paket:</td><td style="font-weight:600;">${sub.planName}</td></tr>
      <tr><td style="color:#6b7280; padding: 6px 0;">Aylık ücret:</td><td style="font-weight:600;">${sub.amount} ₺</td></tr>
      <tr><td style="color:#6b7280; padding: 6px 0;">Deneme süresi:</td><td style="font-weight:600;">14 gün ücretsiz</td></tr>
    </table>
  </div>

  <div style="background: #f0fdf4; padding: 24px; border-radius: 16px; border: 2px solid #86efac; margin-bottom: 16px;">
    <h2 style="font-size: 18px; margin: 0 0 12px; color: #14532d;">🚀 Hemen Başla</h2>
    <p style="margin: 0 0 16px; color: #166534; font-size: 14px;">
      Aşağıdaki butona tıkla, ${sub.productName}'a giriş yap.
    </p>
    <a href="${productUrl}/login" style="display: inline-block; padding: 14px 28px; background: #714B67; color: white; text-decoration: none; border-radius: 12px; font-weight: 700;">
      ${productUrl}/login →
    </a>
    <p style="margin: 16px 0 0; font-size: 12px; color: #166534;">
      Hesap bilgileri: <strong>${sub.email}</strong> · İlk girişte şifre sıfırlama talimatları gönderilecek.
    </p>
  </div>

  <div style="background: white; padding: 20px; border-radius: 16px; margin-bottom: 16px; font-size: 13px; color: #6b7280;">
    <p style="margin: 0 0 8px;"><strong style="color: #714B67;">🦋 kooza ekosistemi</strong></p>
    <p style="margin: 0; line-height: 1.6;">
      Tek aboneliğinle <a href="https://kom.kooza.tr" style="color: #714B67;">10 ürünlük ekosisteme</a> erişim kazandın.
      Sorun olursa <a href="mailto:destek@kooza.tr" style="color: #714B67;">destek@kooza.tr</a>.
    </p>
  </div>

  <p style="text-align: center; font-size: 12px; color: #9ca3af; margin: 24px 0 0;">
    Bu mail ${sub.email} adresine gönderildi · kooza.tr · Türkiye için tasarlandı 🇹🇷
  </p>
</div>
`,
      }),
    })
  } catch (e) {
    console.error('Welcome email error:', e)
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const token = formData.get('token') as string
    const conv = request.nextUrl.searchParams.get('conv') || ''

    if (!token) {
      return NextResponse.redirect(`${request.nextUrl.origin}/odeme-sonuc?status=error&message=Token+yok`)
    }

    const result = await retrieveCheckoutForm(token)
    const sub = await prisma.subscription.findUnique({ where: { conversationId: conv } })

    if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
      // Update subscription to ACTIVE
      const updated = await prisma.subscription.update({
        where: { conversationId: conv },
        data: {
          status: 'ACTIVE',
          paymentId: result.paymentId,
          paymentStatus: result.paymentStatus,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün
        },
      })

      // Send welcome email (non-blocking)
      sendWelcomeEmail(updated).catch(console.error)

      return NextResponse.redirect(
        `${request.nextUrl.origin}/odeme-sonuc?status=success&conv=${conv}&amount=${result.paidPrice}`,
      )
    }

    if (sub) {
      await prisma.subscription.update({
        where: { conversationId: conv },
        data: { status: 'FAILED', errorMessage: result.errorMessage || 'Ödeme başarısız' },
      })
    }

    return NextResponse.redirect(
      `${request.nextUrl.origin}/odeme-sonuc?status=error&message=${encodeURIComponent(result.errorMessage || 'Ödeme başarısız')}`,
    )
  } catch (e: any) {
    return NextResponse.redirect(
      `${request.nextUrl.origin}/odeme-sonuc?status=error&message=${encodeURIComponent(e.message || 'Hata')}`,
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.redirect(`${request.nextUrl.origin}/odeme-sonuc?status=pending`)
}
