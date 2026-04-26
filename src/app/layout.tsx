import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { getSettings, getTheme } from '@/lib/settings'
import ThemeProvider from '@/components/providers/ThemeProvider'
import SessionProvider from '@/components/providers/SessionProvider'
import ToasterProvider from '@/components/providers/ToasterProvider'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings()
    const siteName = settings.site_name || 'kooza'
    const title = settings.seo_default_title || 'kooza — Türkiye\'nin yeni nesil işletme platformu'
    const description = settings.seo_default_description || 'Web sitesi, sektörel otomasyon, İK, CRM, muhasebe ve dijital dönüşüm danışmanlığı — tek partnerden.'
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
      title: { default: title, template: `%s | ${siteName}` },
      description,
      keywords: settings.site_keywords || 'web tasarım, sektörel otomasyon, dijital dönüşüm, KOBİ yazılımı',
      icons: { icon: settings.site_favicon || '/favicon.ico' },
      openGraph: {
        type: 'website',
        locale: 'tr_TR',
        siteName,
        title,
        description,
        images: [{ url: '/api/og', width: 1200, height: 630, alt: siteName }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/api/og'],
      },
      robots: { index: true, follow: true },
    }
  } catch {
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
      title: 'kooza',
      description: 'Türkiye\'nin yeni nesil işletme platformu',
    }
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let theme = null
  let settings: Record<string, string> = {}

  try {
    ;[theme, settings] = await Promise.all([getTheme(), getSettings()])
  } catch {
    // DB bağlantısı yoksa varsayılan değerlerle devam et
  }

  const cssVars = theme
    ? {
        '--primary': theme.primaryColor,
        '--secondary': theme.secondaryColor,
        '--accent': theme.accentColor,
      }
    : {}

  return (
    <html lang="tr" className={`${theme?.darkMode ? 'dark' : ''} ${lato.variable}`}>
      <body className="font-sans" style={cssVars as React.CSSProperties}>
        <SessionProvider>
          <ThemeProvider theme={theme} settings={settings}>
            {children}
            <ToasterProvider />
          </ThemeProvider>
        </SessionProvider>
        {settings.analytics_ga_id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.analytics_ga_id}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${settings.analytics_ga_id}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
