import type { MetadataRoute } from 'next'
import prisma from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/yazilimlar`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/cozumler`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/danismanlik`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/sektorler`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/fiyatlandirma`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/demo`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/vaka-calismalari`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/kariyer`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/basin`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/entegrasyonlar`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/sss`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/guvenlik`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/dijital-olgunluk-testi`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/roi-hesaplama`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/gizlilik-politikasi`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/kullanim-kosullari`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  try {
    const [products, services, posts, pages, sectors, caseStudies] = await Promise.all([
      prisma.product.findMany({ where: { status: 'ACTIVE' }, select: { slug: true, updatedAt: true } }),
      prisma.service.findMany({ where: { status: 'ACTIVE' }, select: { slug: true, updatedAt: true } }),
      prisma.blogPost.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }),
      prisma.page.findMany({ where: { status: 'PUBLISHED', isSystem: false }, select: { slug: true, updatedAt: true } }),
      prisma.sectorSolution.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }).catch(() => []),
      prisma.caseStudy.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }).catch(() => []),
    ])

    const route = (path: string, updatedAt: Date, freq: any = 'monthly', priority = 0.6): MetadataRoute.Sitemap[number] =>
      ({ url: `${base}${path}`, lastModified: updatedAt, changeFrequency: freq, priority })

    return [
      ...staticRoutes,
      ...products.map((p) => route(`/yazilimlar/${p.slug}`, p.updatedAt, 'monthly', 0.7)),
      ...services.map((s) => route(`/danismanlik/${s.slug}`, s.updatedAt, 'monthly', 0.7)),
      ...posts.map((b) => route(`/blog/${b.slug}`, b.updatedAt, 'weekly', 0.6)),
      ...pages.map((p) => route(`/${p.slug}`, p.updatedAt, 'monthly', 0.5)),
      ...sectors.map((s) => route(`/cozumler/${s.slug}`, s.updatedAt, 'weekly', 0.85)),
      ...caseStudies.map((c) => route(`/vaka-calismalari/${c.slug}`, c.updatedAt, 'monthly', 0.65)),
    ]
  } catch {
    return staticRoutes
  }
}
