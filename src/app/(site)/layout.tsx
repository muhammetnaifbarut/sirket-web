import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import WhatsAppButton from '@/components/site/WhatsAppButton'
import ScrollProgress from '@/components/site/ScrollProgress'
import BackToTop from '@/components/site/BackToTop'
import CookieConsent from '@/components/site/CookieConsent'
import StructuredData from '@/components/site/StructuredData'
import { getSettings, getMenuItems } from '@/lib/settings'

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
      {settings.whatsapp_enabled === 'true' && (
        <WhatsAppButton
          phone={settings.whatsapp_number || ''}
          message={settings.whatsapp_message || 'Merhaba, bilgi almak istiyorum.'}
        />
      )}
    </div>
  )
}
