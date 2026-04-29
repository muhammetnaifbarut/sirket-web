import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Debug Health Check — Vercel canlısında hangi env eksik / DB OK mi göster
 * GET /api/health
 */
export async function GET() {
  const checks: Record<string, any> = {}

  // 1. Environment variables
  checks.env = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    DIRECT_URL: !!process.env.DIRECT_URL,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    EMAIL_FROM: !!process.env.EMAIL_FROM,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: !!process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  }

  // 2. Database connection
  try {
    const start = Date.now()
    await prisma.$queryRaw`SELECT 1`
    checks.database = {
      ok: true,
      latencyMs: Date.now() - start,
    }
  } catch (err: any) {
    checks.database = {
      ok: false,
      error: err?.message || String(err),
      code: err?.code,
    }
  }

  // 3. Tables exist?
  try {
    const counts = await Promise.all([
      prisma.product.count().catch(e => ({ error: e.message })),
      prisma.setting.count().catch(e => ({ error: e.message })),
      prisma.sector.count().catch(e => ({ error: e.message })),
      prisma.testimonial.count().catch(e => ({ error: e.message })),
    ])
    checks.tables = {
      product: counts[0],
      setting: counts[1],
      sector: counts[2],
      testimonial: counts[3],
    }
  } catch (err: any) {
    checks.tables = { error: err?.message }
  }

  // 4. Build / runtime info
  checks.runtime = {
    nodeVersion: process.version,
    platform: process.platform,
    timestamp: new Date().toISOString(),
  }

  const overall =
    !checks.env.DATABASE_URL ? 'missing_env' :
    !checks.database.ok ? 'db_failed' :
    'ok'

  return NextResponse.json({
    status: overall,
    checks,
  }, {
    status: overall === 'ok' ? 200 : 503,
  })
}
