import prisma from '@/lib/db'
import { makeItemRoute } from '@/lib/crud-api'

const r = makeItemRoute(prisma.caseStudy as any)
export const PUT = r.PUT
export const DELETE = r.DELETE
