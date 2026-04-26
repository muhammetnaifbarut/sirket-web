import prisma from '@/lib/db'
import { makeCollectionRoute } from '@/lib/crud-api'

const r = makeCollectionRoute(prisma.caseStudy as any, { orderBy: { order: 'asc' } })
export const GET = r.GET
export const POST = r.POST
