'use client'

/**
 * HeroSection client-only wrapper.
 *
 * Sebep: HeroSection içindeki HeroDashboard, framer-motion useTransform/useSpring
 * gibi hook'lar kullanıyor. Bu hook'lar SSR + client hidration arasında
 * count mismatch yapabiliyor ve React #310 atıyor.
 *
 * Çözüm: dynamic({ ssr: false }) ile sayfayı server'da hiç render etme,
 * yalnızca client'ta mount olsun. Hydration mismatch yok.
 *
 * dynamic({ ssr: false }) sadece client component'ten çağrılabilir,
 * o yüzden bu wrapper var.
 */

import dynamic from 'next/dynamic'

const HeroSection = dynamic(() => import('./HeroSection'), {
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

export default HeroSection
