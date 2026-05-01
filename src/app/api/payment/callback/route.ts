import { NextRequest, NextResponse } from 'next/server'
import { retrieveCheckoutForm } from '@/lib/iyzico'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * iyzico ödeme tamamlandığında buraya redirect olur (POST formu).
 * Sonucu /odeme-sonuc sayfasına gösteririz.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const token = formData.get('token') as string
    const conv = request.nextUrl.searchParams.get('conv') || ''

    if (!token) {
      return NextResponse.redirect(
        `${request.nextUrl.origin}/odeme-sonuc?status=error&message=Token+bulunamadi`,
      )
    }

    const result = await retrieveCheckoutForm(token)

    if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
      // TODO: DB'ye kayıt + email gönderme
      return NextResponse.redirect(
        `${request.nextUrl.origin}/odeme-sonuc?status=success&conv=${conv}&amount=${result.paidPrice}`,
      )
    }

    return NextResponse.redirect(
      `${request.nextUrl.origin}/odeme-sonuc?status=error&message=${encodeURIComponent(
        result.errorMessage || 'Ödeme başarısız',
      )}`,
    )
  } catch (e: any) {
    return NextResponse.redirect(
      `${request.nextUrl.origin}/odeme-sonuc?status=error&message=${encodeURIComponent(
        e.message || 'Hata',
      )}`,
    )
  }
}

// GET de destekle (bazı iyzico durumları için)
export async function GET(request: NextRequest) {
  return NextResponse.redirect(`${request.nextUrl.origin}/odeme-sonuc?status=pending`)
}
