import dynamic from 'next/dynamic'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import StructuredData from '@/components/site/StructuredData'
import { getSettings, getMenuItems } from '@/lib/settings'

// Client-only utility component'ler (browser API'leri kullanan, hidration mismatch yapabilen)
const ScrollProgress = dynamic(() => import('@/components/site/ScrollProgress'), { ssr: false })
const BackToTop = dynamic(() => import('@/components/site/BackToTop'), { ssr: false })
const CookieConsent = dynamic(() => import('@/components/site/CookieConsent'), { ssr: false })
const WhatsAppButton = dynamic(() => import('@/components/site/WhatsAppButton'), { ssr: false })
const StickyMobileCTA = dynamic(() => import('@/components/site/StickyMobileCTA'), { ssr: false })
const ExitIntentPopup = dynamic(() => import('@/components/site/ExitIntentPopup'), { ssr: false })
const LiveActivityFeed = dynamic(() => import('@/components/site/LiveActivityFeed'), { ssr: false })

// Tüm site rotalarını dinamik render — build sırasında DB'ye gitme
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  const menuItems = await getMenuItems('header')

  return (
    <div className="flex flex-col min-h-screen">
      {/* A11y: skip-to-content link, only visible on focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-elevated"
      >
        İçeriğe geç
      </a>
      <StructuredData settings={settings} />
      <ScrollProgress />
      <Header settings={settings} menuItems={menuItems} />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
      <Footer settings={settings} />
      <BackToTop />
      <CookieConsent />
      <WhatsAppButton
        phone={settings.whatsapp_number || '+905414142942'}
        message={settings.whatsapp_message || 'Merhaba kooza, bilgi almak istiyorum.'}
      />
      <StickyMobileCTA />
      <ExitIntentPopup />
      <LiveActivityFeed />
    </div>
  )
}
