import { getSettings } from '@/lib/settings'
import prisma from '@/lib/db'
import HeroSection from '@/components/site/sections/HeroSection'
import QuickCallbackBand from '@/components/site/sections/QuickCallbackBand'
import WhyKoozaSection from '@/components/site/sections/WhyKoozaSection'
import LeadMagnetTrio from '@/components/site/sections/LeadMagnetTrio'
import UrgencyBanner from '@/components/site/sections/UrgencyBanner'
import TryProductsBand from '@/components/site/sections/TryProductsBand'
import PressMentions from '@/components/site/sections/PressMentions'
import WallOfLove from '@/components/site/sections/WallOfLove'
import MiniCalculator from '@/components/site/sections/MiniCalculator'
import ProductsSection from '@/components/site/sections/ProductsSection'
import ModulesShowcase from '@/components/site/sections/ModulesShowcase'
import SectorsSection from '@/components/site/sections/SectorsSection'
import ClientsSection from '@/components/site/sections/ClientsSection'
import TestimonialsSection from '@/components/site/sections/TestimonialsSection'
import DemoCtaSection from '@/components/site/sections/DemoCtaSection'
import VideoShowcaseSection from '@/components/site/sections/VideoShowcaseSection'
import FAQSection from '@/components/site/sections/FAQSection'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'


export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return {
    title: settings.site_name || 'kooza - Tek Platform, Tüm İş Yazılımları',
    description:
      settings.site_description ||
      'Randevu, stok, CRM, finans ve İK için ayrı yazılım kullanmayı bırakın. kooza ile her şey bir platformda.',
    keywords: settings.site_keywords,
    openGraph: {
      title: settings.site_name || 'kooza',
      description: settings.site_description,
      images: settings.og_image ? [settings.og_image] : [],
    },
  }
}

function isVisible(settings: Record<string, string>, key: string) {
  return settings[key] !== 'false'
}

// DB hata toleranslı çağrı — hata olursa boş döndür
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn() } catch (e) {
    console.warn('[homepage] DB error:', (e as Error).message)
    return fallback
  }
}

export default async function HomePage() {
  try {
    return await renderHomePage()
  } catch (e: any) {
    // 🚧 DEBUG: Next.js production hata mesajını sansürlüyor.
    // Try/catch ile yakalayıp HTML'e direkt yazıyoruz, böylece sansürü atlatıyoruz.
    return (
      <div style={{ padding: 24, fontFamily: 'monospace', fontSize: 13, color: '#7f1d1d', background: '#fef2f2', minHeight: '60vh' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔴 SERVER RENDER ERROR (debug)</h2>
        <p style={{ marginBottom: 8 }}><strong>Tür:</strong> {e?.name || 'Error'}</p>
        <p style={{ marginBottom: 8 }}><strong>Mesaj:</strong> {String(e?.message || e)}</p>
        {e?.code && <p style={{ marginBottom: 8 }}><strong>Code:</strong> {e.code}</p>}
        {e?.cause && <p style={{ marginBottom: 8 }}><strong>Cause:</strong> {String(e.cause)}</p>}
        <details open style={{ marginTop: 12 }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>📋 Stack trace</summary>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: 11, marginTop: 8, padding: 12, background: 'white', borderRadius: 8, border: '1px solid #fecaca', maxHeight: 480, overflow: 'auto' }}>
            {e?.stack || '(yok)'}
          </pre>
        </details>
      </div>
    )
  }
}

async function renderHomePage() {
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
    chatbotConfig,
    chatbotFaqs,
  ] = await Promise.all([
    safe(() => prisma.product.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { order: 'asc' },
      take: 6,
      select: {
        id: true, name: true, slug: true, tagline: true, description: true,
        features: true, screenshots: true, icon: true, badge: true, videoUrl: true,
      },
    }), [] as any[]),
    safe(() => prisma.siteModule.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(() => prisma.sector.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(() => prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(() => prisma.client.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(() => prisma.heroTicker.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(() => prisma.heroStat.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
    safe(() => prisma.siteFaq.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, take: 8 }), []),
    safe(() => prisma.chatbotSettings.findFirst(), null),
    safe(() => prisma.chatbotFAQ.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }), []),
  ])

  return (
    <>
      <UrgencyBanner />
      <HeroSection
        settings={settings}
        ticker={tickerItems.map((t) => ({ emoji: t.emoji, text: t.text }))}
        stats={statItems.map((s) => ({ value: s.value, label: s.label, color: s.color }))}
      />
      <WhyKoozaSection />
      <TryProductsBand />
      <LeadMagnetTrio />
      <QuickCallbackBand />
      {isVisible(settings, 'section_clients_visible') && <ClientsSection clients={clients} />}
      <PressMentions />
      {isVisible(settings, 'section_modules_visible') && <ModulesShowcase modules={modules} />}
      {isVisible(settings, 'section_products_visible') && <ProductsSection products={products} />}
      {isVisible(settings, 'section_sectors_visible') && <SectorsSection sectors={sectors} />}
      {settings.section_video_visible !== 'false' && <VideoShowcaseSection settings={settings} />}
      {isVisible(settings, 'section_testimonials_visible') && (
        <TestimonialsSection testimonials={testimonials} />
      )}
      <WallOfLove />
      <MiniCalculator />
      {faqs.length > 0 && (
        <FAQSection faqs={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
      )}
      {isVisible(settings, 'section_cta_visible') && <DemoCtaSection settings={settings} />}

    </>
  )
}
