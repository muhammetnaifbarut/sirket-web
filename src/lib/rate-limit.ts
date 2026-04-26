type Bucket = { count: number; resetAt: number }

const store = new Map<string, Bucket>()

export interface RateLimitOptions {
  limit: number
  windowMs: number
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

export function rateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const bucket = store.get(key)

  if (!bucket || bucket.resetAt < now) {
    const resetAt = now + opts.windowMs
    store.set(key, { count: 1, resetAt })
    cleanup(now)
    return { success: true, remaining: opts.limit - 1, resetAt }
  }

  if (bucket.count >= opts.limit) {
    return { success: false, remaining: 0, resetAt: bucket.resetAt }
  }

  bucket.count += 1
  return { success: true, remaining: opts.limit - bucket.count, resetAt: bucket.resetAt }
}

function cleanup(now: number) {
  if (store.size < 5000) return
  store.forEach((v, k) => {
    if (v.resetAt < now) store.delete(k)
  })
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real.trim()
  return 'unknown'
}

export function rateLimitHeaders(result: RateLimitResult, limit: number): HeadersInit {
  return {
    'X-RateLimit-Limit': String(limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
  }
}
