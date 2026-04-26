import Link from 'next/link'
import { getSettings } from '@/lib/settings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Talep Alındı',
  description: 'Demo talebiniz için teşekkürler. Yakında sizinle iletişime geçeceğiz.',
}

export default async function TesekkurlerPage() {
  const settings = await getSettings()
  const phone = settings.whatsapp_number || settings.site_phone

  // Build WhatsApp link
  const wa = phone
    ? `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent('Merhaba, az önce demo talep ettim. Detayları konuşabilir miyiz?')}`
    : null

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-card border border-gray-100 p-8 lg:p-12 text-center">
        {/* Animated checkmark */}
        <div className="relative inline-flex mb-6">
          <span className="absolute inset-0 rounded-full bg-success-100 animate-ping opacity-40" />
          <span className="relative w-20 h-20 rounded-full bg-gradient-to-br from-success-500 to-emerald-600 flex items-center justify-center shadow-elevated">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Talep alındı! 🎉
        </h1>

        <p className="text-gray-600 leading-relaxed mb-8">
          Teşekkürler. Ekibimiz <strong>1 iş günü içinde</strong> seninle iletişime
          geçecek ve demo'yu birlikte planlayacağız. Şimdiden notlarını hazırla;
          her sorunu cevaplamayı seveceğiz.
        </p>

        {/* What's next box */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-8 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Sırada ne var?
          </p>
          <ul className="space-y-2.5 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex w-5 h-5 rounded-full bg-purple-100 text-purple-700 items-center justify-center text-[10px] font-bold flex-shrink-0">1</span>
              <span>E-posta ile bir onay mesajı alacaksın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex w-5 h-5 rounded-full bg-purple-100 text-purple-700 items-center justify-center text-[10px] font-bold flex-shrink-0">2</span>
              <span>1 iş günü içinde uzmanımız seni arayacak</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex w-5 h-5 rounded-full bg-purple-100 text-purple-700 items-center justify-center text-[10px] font-bold flex-shrink-0">3</span>
              <span>15 dakikalık demo ile sistemin nasıl çalıştığını görürsün</span>
            </li>
          </ul>
        </div>

        {/* Quick actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-success-500 hover:bg-success-600 text-white font-semibold text-sm transition-colors min-h-[48px]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp'tan Yaz
            </a>
          )}
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-semibold text-sm hover:border-purple-300 hover:bg-purple-50 transition-all min-h-[48px]"
          >
            Bekleyene kadar bloga göz at →
          </Link>
        </div>

        <Link
          href="/"
          className="inline-block mt-6 text-xs text-gray-400 hover:text-purple-700 transition-colors"
        >
          ← Ana sayfaya dön
        </Link>
      </div>
    </div>
  )
}
