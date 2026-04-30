'use client'

/**
 * Client wrapper for HomePageContent.
 *
 * dynamic({ ssr: false }) sadece client component'ten çağrılabilir.
 * Bu shell, server component (page.tsx) içinden HomePageContent'i
 * tamamen client-only şekilde render etmemize izin verir.
 */

import dynamic from 'next/dynamic'

const HomePageContent = dynamic(() => import('./HomePageContent'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        minHeight: '70vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
      }}
    />
  ),
})

interface Props {
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

export default function HomePageShell(props: Props) {
  return <HomePageContent {...props} />
}
