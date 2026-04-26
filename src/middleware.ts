import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

type Role = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER'

const ROLE_POWER: Record<Role, number> = {
  SUPER_ADMIN: 4,
  ADMIN: 3,
  EDITOR: 2,
  VIEWER: 1,
}

// Minimum rol gerektiren admin yolları
const ADMIN_ONLY_PREFIXES: [string, Role][] = [
  ['/admin/kullanicilar', 'ADMIN'],
  ['/admin/ayarlar', 'ADMIN'],
  ['/admin/tema', 'ADMIN'],
  ['/admin/loglar', 'ADMIN'],
]

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const role = (req.nextauth.token?.role as Role) || 'VIEWER'

    for (const [prefix, minRole] of ADMIN_ONLY_PREFIXES) {
      if (pathname.startsWith(prefix) && ROLE_POWER[role] < ROLE_POWER[minRole]) {
        const url = req.nextUrl.clone()
        url.pathname = '/admin'
        url.searchParams.set('error', 'forbidden')
        return NextResponse.redirect(url)
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/admin/giris',
    },
  }
)

export const config = {
  matcher: ['/admin/((?!giris).*)'],
}
