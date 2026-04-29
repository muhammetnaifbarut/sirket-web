import Link from 'next/link'
import { ArrowRight, Calendar, GraduationCap, Home, Users, ShoppingCart } from 'lucide-react'

/**
 * "Şimdi Dene" bandı — kooza ekosistemindeki canlı ürünlere
 * direkt bağlantı veren section.
 *
 * Strateji: Her ürün kendi subdomain'inde live. Müşteri kooza.tr'den
 * tıklayınca direkt kayıt olabilir, demo formuna gerek yok.
 */
const PRODUCTS = [
  {
    title: 'kooza Servis',
    subtitle: 'Restoran · Kafe · Bar · Lokanta',
    description: 'POS, masa yönetimi, mutfak ekranı, QR menü, çoklu ödeme — 14 gün ücretsiz.',
    href: 'https://servis.kooza.tr/register',
    detailHref: '/urunler/servis',
    label: 'Hemen Dene',
    icon: ShoppingCart,
    color: 'from-[#714B67] to-[#875A7B]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza Randevu',
    subtitle: 'Klinik · Salon · Kuaför · 12 Sektör',
    description: 'AI Asistan, WhatsApp hatırlatma, no-show önleme, müşteri portalı — 14 gün ücretsiz.',
    href: 'https://randevu.kooza.tr/register',
    detailHref: '/urunler/randevu',
    label: 'Hemen Dene',
    icon: Calendar,
    color: 'from-[#714B67] to-[#875A7B]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza Eğitim',
    subtitle: 'Kreş · Anaokulu · Kurs · Dershane',
    description: 'Yoklama, ödeme, veli iletişimi (WhatsApp), sınav-karne — 14 gün ücretsiz.',
    href: 'https://egitim.kooza.tr/register',
    detailHref: '/urunler/egitim',
    label: 'Hemen Dene',
    icon: GraduationCap,
    color: 'from-[#5d3e55] to-[#875A7B]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza Emlak',
    subtitle: 'Gayrimenkul · İlan · Lead · Komisyon',
    description: 'AI fiyat tahmini, çoklu portal ilan otomasyonu, WhatsApp lead — 14 gün ücretsiz.',
    href: 'https://emlak.kooza.tr/login',
    detailHref: '/urunler/emlak',
    label: 'Hemen Dene',
    icon: Home,
    color: 'from-[#4a3144] to-[#714B67]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza E-Ticaret',
    subtitle: 'Trendyol · Hepsiburada · N11',
    description: 'Pazaryeri entegrasyonu, kargo otomasyonu, e-Fatura.',
    href: '#',
    label: 'Yakında',
    icon: ShoppingCart,
    color: 'from-[#3a2436] to-[#4a3144]',
    badge: 'YAKINDA',
    available: false,
  },
]

export default function TryProductsBand() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            🚀 Şimdi Dene
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Ürünlerimizi tek tıkla aç, hemen kullan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Demo formu doldurma — direkt kayıt ol, 14 gün ücretsiz dene. Beğenmezsen iptal et, kart sormuyoruz.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((p) => {
            const Icon = p.icon
            const Wrapper = p.available ? Link : 'div'
            const wrapperProps = p.available
              ? ({ href: p.href, target: '_blank', rel: 'noopener' } as any)
              : ({ 'aria-disabled': true } as any)

            return (
              <Wrapper
                key={p.title}
                {...wrapperProps}
                className={`group relative rounded-2xl p-6 border transition-all ${
                  p.available
                    ? 'border-gray-200 hover:border-[#875A7B] hover:shadow-cardHover hover:-translate-y-1 bg-white cursor-pointer'
                    : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-70'
                }`}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    p.available
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {p.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-bold text-gray-900 mb-1 leading-tight">{p.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{p.subtitle}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{p.description}</p>

                {/* CTA */}
                <div className="flex items-center justify-between gap-2">
                  <div className={`flex items-center gap-1.5 text-sm font-bold ${
                    p.available
                      ? 'text-[#714B67] group-hover:gap-2'
                      : 'text-gray-400'
                  } transition-all`}>
                    {p.label}
                    {p.available && <ArrowRight className="w-4 h-4" />}
                  </div>
                  {p.available && p.detailHref && (
                    <Link
                      href={p.detailHref}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-gray-500 hover:text-[#714B67] underline-offset-2 hover:underline"
                    >
                      Detay
                    </Link>
                  )}
                </div>
              </Wrapper>
            )
          })}
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          ✓ 14 gün ücretsiz · ✓ Kart yok · ✓ İstediğin zaman iptal · ✓ KVKK uyumlu
        </p>
      </div>
    </section>
  )
}
