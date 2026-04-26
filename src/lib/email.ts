/**
 * Email gönderim helper'ı.
 * Resend kullanır — RESEND_API_KEY env'de olmalı.
 * Set edilmemişse sessizce log'lar (development).
 */

interface SendEmailParams {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

const FROM = process.env.EMAIL_FROM || 'kooza <onboarding@resend.dev>'
const ADMIN = process.env.EMAIL_TO_ADMIN || ''

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log('[email] RESEND_API_KEY not set, skipping send')
    console.log(`[email] Would send to ${Array.isArray(to) ? to.join(',') : to}: ${subject}`)
    return { ok: true }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        reply_to: replyTo,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('[email] Resend error:', error)
      return { ok: false, error }
    }
    return { ok: true }
  } catch (e: any) {
    console.error('[email] Send failed:', e)
    return { ok: false, error: e.message }
  }
}

/** Admin'e form bildirimi gönder. */
export async function notifyAdmin(subject: string, html: string) {
  if (!ADMIN) {
    console.log('[email] EMAIL_TO_ADMIN not set, skipping admin notification')
    return { ok: true }
  }
  return sendEmail({ to: ADMIN, subject: `[kooza] ${subject}`, html })
}

/** Lead form HTML şablonu. */
export function leadEmailTemplate(lead: {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  message?: string | null
  source?: string | null
}) {
  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      <div style="background: linear-gradient(135deg, #714B67 0%, #4a2f44 100%); color: white; padding: 24px; border-radius: 12px 12px 0 0;">
        <div style="font-size: 20px; font-weight: 700;">📩 Yeni form talebi</div>
        <div style="font-size: 13px; opacity: 0.85; margin-top: 4px;">kooza.com.tr — ${lead.source || 'site'}</div>
      </div>
      <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; font-size: 14px; color: #374151;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 100px;">Ad Soyad:</td><td style="padding: 8px 0; font-weight: 600;">${lead.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">E-posta:</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}" style="color: #714B67;">${lead.email}</a></td></tr>
          ${lead.phone ? `<tr><td style="padding: 8px 0; color: #6b7280;">Telefon:</td><td style="padding: 8px 0;"><a href="tel:${lead.phone}" style="color: #714B67;">${lead.phone}</a></td></tr>` : ''}
          ${lead.company ? `<tr><td style="padding: 8px 0; color: #6b7280;">Şirket:</td><td style="padding: 8px 0;">${lead.company}</td></tr>` : ''}
        </table>
        ${lead.message ? `
          <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px; font-size: 14px; color: #374151; line-height: 1.6;">
            ${lead.message.replace(/\n/g, '<br>')}
          </div>
        ` : ''}
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
          Bu mail kooza.com.tr formundan otomatik gönderildi.
        </div>
      </div>
    </div>
  `
}
