import Link from 'next/link'
import prisma from '@/lib/db'
import EmptyState from '@/components/site/EmptyState'
import { Download, ExternalLink, Calendar, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Basın & Medya',
  description: 'kooza basın bültenleri, medya kit ve gazete haberleri.',
}

export default async function Page() {
  const items = await prisma.pressItem.findMany({
    where: { isActive: true },
    orderBy: { date: 'desc' },
  })

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-20 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(135, 90, 123,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            Basın & Medya
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
            kooza basında.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Haberler, basın bültenleri, marka kit ve medya iletişimi tek yerde.
          </p>
        </div>
      </section>

      {/* Press kit */}
      <section className="py-12 lg:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Medya Kit</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="/brand/kooza-instagram-full.png"
              download
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-cardHover hover:-translate-y-0.5 transition-all group"
            >
              <Download className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-1">Logo Paketi</h3>
              <p className="text-xs text-gray-500">PNG · SVG · 4 varyant</p>
            </a>
            <a
              href="/brand/BRAND.md"
              target="_blank"
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-cardHover hover:-translate-y-0.5 transition-all group"
            >
              <Download className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-1">Marka Rehberi</h3>
              <p className="text-xs text-gray-500">Renk · Font · Ton</p>
            </a>
            <Link
              href="/iletisim"
              className="p-5 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition-all group"
            >
              <Mail className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-1">Basın İletişim</h3>
              <p className="text-xs text-purple-100">basin@kooza.com.tr</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Press mentions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
            Bize Yer Verenler
          </h2>

          {items.length === 0 ? (
            <EmptyState
              icon="megaphone"
              title="Henüz basın haberi yok"
              description="Yakında basında çıkan haberlerimizi burada paylaşacağız."
            />
          ) : (
            <div className="space-y-4">
              {items.map((p) => (
                <a
                  key={p.id}
                  href={p.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-cardHover transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-700 flex-shrink-0">
                      {p.outlet.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                        <span className="font-bold text-purple-700 text-sm">{p.outlet}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(p.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-1.5 leading-snug">
                        {p.title}
                      </h3>
                      {p.excerpt && (
                        <p className="text-sm text-gray-600 leading-relaxed">{p.excerpt}</p>
                      )}
                    </div>
                    {p.url && (
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
