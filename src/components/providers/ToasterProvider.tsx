'use client'

import dynamic from 'next/dynamic'

/**
 * Dynamic import with ssr:false ensures react-hot-toast is NEVER loaded on
 * the server. Without this, goober (react-hot-toast's CSS-in-JS engine)
 * injects a <style> tag during SSR that gets serialized into <title>,
 * causing a hydration mismatch.
 */
const Toaster = dynamic(
  () => import('react-hot-toast').then((m) => ({ default: m.Toaster })),
  { ssr: false }
)

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: { borderRadius: '10px', fontSize: '14px' },
      }}
    />
  )
}
