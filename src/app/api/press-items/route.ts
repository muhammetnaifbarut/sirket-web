import prisma from '@/lib/db'
import { makeCollectionRoute } from '@/lib/crud-api'
const r = makeCollectionRoute(prisma.pressItem as any, { orderBy: { date: 'desc' } })
export const GET = r.GET
export const POST = r.POST
