import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from './auth'

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER'

const ROLE_POWER: Record<Role, number> = {
  SUPER_ADMIN: 4,
  ADMIN: 3,
  EDITOR: 2,
  VIEWER: 1,
}

export interface AuthedUser {
  id: string
  email: string
  name?: string | null
  role: Role
}

export async function getAuthedUser(): Promise<AuthedUser | null> {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null
  const user = session.user as any
  if (!user.id || !user.email || !user.role) return null
  return {
    id: user.id,
    email: user.email,
    name: user.name ?? null,
    role: user.role,
  }
}

export function hasRole(user: AuthedUser | null, minimum: Role): boolean {
  if (!user) return false
  return ROLE_POWER[user.role] >= ROLE_POWER[minimum]
}

export async function requireRole(minimum: Role): Promise<
  { ok: true; user: AuthedUser } | { ok: false; response: NextResponse }
> {
  const user = await getAuthedUser()
  if (!user) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Yetkisiz' }, { status: 401 }),
    }
  }
  if (!hasRole(user, minimum)) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Bu işlem için yetkiniz yok' }, { status: 403 }),
    }
  }
  return { ok: true, user }
}
