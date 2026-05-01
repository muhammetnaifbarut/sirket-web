/**
 * iyzico Payment Helper
 * Sandbox + Production destekli
 */

// @ts-ignore - iyzipay has no types
import Iyzipay from 'iyzipay'

export const iyzicoClient = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY!,
  secretKey: process.env.IYZICO_SECRET_KEY!,
  uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
})

export type CheckoutFormRequest = {
  conversationId: string
  price: string  // string, e.g. "299.00"
  paidPrice: string
  currency: 'TRY' | 'USD' | 'EUR'
  basketId: string
  callbackUrl: string  // success callback
  buyer: {
    id: string
    name: string
    surname: string
    gsmNumber: string
    email: string
    identityNumber: string  // T.C. or 11111111111 for sandbox
    registrationAddress: string
    ip: string
    city: string
    country: string
  }
  shippingAddress: {
    contactName: string
    city: string
    country: string
    address: string
  }
  billingAddress: {
    contactName: string
    city: string
    country: string
    address: string
  }
  basketItems: Array<{
    id: string
    name: string
    category1: string
    itemType: 'PHYSICAL' | 'VIRTUAL'
    price: string
  }>
}

export async function createCheckoutForm(req: CheckoutFormRequest): Promise<{
  status: string
  paymentPageUrl?: string
  token?: string
  errorMessage?: string
}> {
  return new Promise((resolve, reject) => {
    iyzicoClient.checkoutFormInitialize.create(
      {
        locale: 'tr',
        conversationId: req.conversationId,
        price: req.price,
        paidPrice: req.paidPrice,
        currency: req.currency,
        basketId: req.basketId,
        paymentGroup: 'PRODUCT',
        callbackUrl: req.callbackUrl,
        enabledInstallments: [1, 2, 3, 6, 9],
        buyer: req.buyer,
        shippingAddress: req.shippingAddress,
        billingAddress: req.billingAddress,
        basketItems: req.basketItems,
      },
      (err: any, result: any) => {
        if (err) return reject(err)
        resolve(result)
      },
    )
  })
}

export async function retrieveCheckoutForm(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    iyzicoClient.checkoutForm.retrieve(
      { locale: 'tr', token },
      (err: any, result: any) => {
        if (err) return reject(err)
        resolve(result)
      },
    )
  })
}
