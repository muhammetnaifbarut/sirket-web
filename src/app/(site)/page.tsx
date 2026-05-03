import { getSettings } from '@/lib/settings'
import prisma from '@/lib/db'
import type { Metadata } from 'next'
import HomePageShell from './HomePageShell'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return {
    title: settings.site_name || 'kooza - Tek Platform, TÃ¼m Ä°ÅŸ YazÄ±lÄ±mlarÄ±',
    description:
      settings.site_description ||
      'Randevu, stok, CRM, finans ve Ä°K iÃ§in ayrÄ± yazÄ±lÄ±m kullanmayÄ± bÄ±rakÄ±n. kooza ile her ÅŸey bir platformda.',
    keywords: settings.site_keywords,
    openGraph: {
      title: settings.site_name || 'kooza',
      description: settings.site_description,
      images: settings.og_image ? [settings.og_image] : [],
    },
  }
}

// DB hata toleranslÄ± Ã§aÄŸrÄ± â€” hata olursa boÅŸ dÃ¶ndÃ¼r
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (e) {
    console.warn('[homepage] DB error:', (e as Error).message)
    return fallback
  }
}

export default async function HomePage() {
  const settings = await getSettings()

  const [
    products,
    modules,
    sectors,
    testimonials,
    clients,
    tickerItems,
    statItems,
    faqs,
  ] = await Promise.all([
    safe(
      () =>
        prisma.product.findMany({
          where: { status: 'ACTIVE' },
          orderBy: { order: 'asc' },
          take: 10,
          select: {
            id: true,
            name: true,
            slug: true,
            tagline: true,
            description: true,
            features: true,
            screenshots: true,
            icon: true,
            badge: true,
            videoUrl: true,
          },
        }),
      [] as any[],
    ),
    safe(() => prisma.siteModule.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(() => prisma.sector.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(() => prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(() => prisma.client.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(() => prisma.heroTicker.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(() => prisma.heroStat.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(
      () =>
        prisma.siteFaq.findMany({
          where: { isActive: true },
          orderBy: { order: 'asc' },
          take: 8,
        }),
      [],
    ),
  ])

  return (
    <HomePageShell
      settings={settings}
      products={products as any[]}
      modules={modules as any[]}
      sectors={sectors as any[]}
      testimonials={testimonials as any[]}
      clients={clients as any[]}
      tickerItems={tickerItems.map((t: any) => ({ emoji: t.emoji, text: t.text }))}
      statItems={statItems.map((s: any) => ({ value: s.value, label: s.label, color: s.color }))}
      faqs={faqs.map((f: any) => ({ id: f.id, question: f.question, answer: f.answer }))}
    />
  )
}
