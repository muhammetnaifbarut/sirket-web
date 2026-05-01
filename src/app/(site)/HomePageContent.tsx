'use client'

/**
 * HomePageContent — kooza.tr ana sayfa client-only render
 *
 * page.tsx (server) data fetch yapar, props olarak buraya geçirir.
 * Bu component dynamic({ ssr: false }) ile import edilir → sıfır SSR,
 * tüm hook'lu component'ler client'ta mount olur, hidration mismatch yok.
 */

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
import SectorsSection from '@/components/site/sections/SectorsSection'
import ClientsSection from '@/components/site/sections/ClientsSection'
import TestimonialsSection from '@/components/site/sections/TestimonialsSection'
import DemoCtaSection from '@/components/site/sections/DemoCtaSection'
import VideoShowcaseSection from '@/components/site/sections/VideoShowcaseSection'
import FAQSection from '@/components/site/sections/FAQSection'

interface HomePageContentProps {
  settings: Record<string, string>
  products: any[]
  modules: any[]
  sectors: any[]
  testimonials: any[]
  clients: any[]
  tickerItems: { emoji: string; text: string }[]
  statItems: { value: string; label: string; color: string }[]
  faqs: { id: string; question: string; answer: string }[]
}

function isVisible(settings: Record<string, string>, key: string) {
  return settings[key] !== 'false'
}

export default function HomePageContent({
  settings,
  products,
  modules,
  sectors,
  testimonials,
  clients,
  tickerItems,
  statItems,
  faqs,
}: HomePageContentProps) {
  return (
    <>
      <UrgencyBanner />
      <HeroSection settings={settings} ticker={tickerItems} stats={statItems} />
      <WhyKoozaSection />
      <TryProductsBand />
      <LeadMagnetTrio />
      <QuickCallbackBand />
      {isVisible(settings, 'section_clients_visible') && <ClientsSection clients={clients} />}
      <PressMentions />
      {isVisible(settings, 'section_products_visible') && <ProductsSection products={products} />}
      {isVisible(settings, 'section_sectors_visible') && <SectorsSection sectors={sectors} />}
      {settings.section_video_visible !== 'false' && <VideoShowcaseSection settings={settings} />}
      {isVisible(settings, 'section_testimonials_visible') && (
        <TestimonialsSection testimonials={testimonials} />
      )}
      <WallOfLove />
      <MiniCalculator />
      {faqs.length > 0 && <FAQSection faqs={faqs} />}
      {isVisible(settings, 'section_cta_visible') && <DemoCtaSection settings={settings} />}
    </>
  )
}
