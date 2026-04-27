'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => {
      setShow(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!show}
    >
      <div className="bg-white border-t border-gray-200 shadow-2xl px-3 py-2.5 flex items-center gap-2 safe-area-inset-bottom">
        <a
          href="tel:+905414142942"
          className="shrink-0 w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center"
          aria-label="Bizi ara"
        >
          <Phone className="w-5 h-5 text-gray-700" />
        </a>
        <a
          href="https://wa.me/905414142942?text=Merhaba%20kooza%2C%20bilgi%20almak%20istiyorum"
          className="shrink-0 w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center"
          aria-label="WhatsApp"
        >
          <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.71.3 1.262.481 1.695.629.712.227 1.36.195 1.871.121.571-.091 1.758-.721 2.006-1.418.247-.703.247-1.298.173-1.42-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c0-5.445 4.455-9.885 9.942-9.885a9.86 9.86 0 0 1 7.022 2.91 9.748 9.748 0 0 1 2.913 6.99c-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
          </svg>
        </a>
        <Link
          href="/demo"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm shadow-button hover:bg-purple-700 transition-all"
        >
          14 Gün Ücretsiz Başla
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
