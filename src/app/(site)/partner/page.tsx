import Link from 'next/link'
import { Users, TrendingUp, Award, Handshake, Check, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza Partner Programı — SMMM, Mali Müşavir, Bayi',
  description: 'kooza partner programı: SMMM\'ler, mali müşavirler ve bayiler için %20 komisyon, white-label seçeneği, müşteri yönetim paneli.',
}

const TIERS = [
  {
    name: 'Bronze',
    icon: '🥉',
    customers: '1-5 müşteri',
    commission: '%15',
    benefits: [
      'Müşteri başına %15 ilk yıl komisyonu',
      'Partner panel erişimi',
      'Aylık eğitim webinarı',
      'Ortak pazarlama materyali',
    ],
  },
  {
    name: 'Silver',
    icon: '🥈',
    customers: '6-15 müşteri',
    commission: '%20',
    benefits: [
      '%20 komisyon (ömür boyu yenilemelerde de)',
      'Partner manager (özel iletişim)',
      'Co-branded landing page',
      'Quarterly performance bonusu',
      'Müşteri yönetim ekranı',
    ],
    popular: true,
  },
  {
    name: 'Gold',
    icon: '🥇',
    customers: '16+ müşteri',
    commission: '%25',
    benefits: [
      '%25 komisyon ömür boyu',
      'White-label opsiyonu',
      'Co-marketing bütçesi',
      'Özel etkinlikler / Yıllık partner zirvesi',
      'API erişimi',
      'Ürün roadmap\'a etki',
    ],
  },
]

export default function PartnerPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
            🤝 Partner Programı
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            Mali müşaviriniz mi? <br />
            Bayi misiniz? Sektör uzmanı mısınız?
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Müşterilerinize kooza önerin, <strong className="text-pink-200">%25'e kadar ömür boyu komisyon</strong> kazanın.
            Türkiye'nin en cömert SaaS partner programı.
          </p>
        </div>
      </section>

      {/* Why partner with us */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Neden kooza partneri olmalısınız?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, t: 'Yüksek komisyon', d: '%25\'e kadar ömür boyu — Türkiye\'nin en cömert oranı.', c: 'bg-emerald-100 text-emerald-700' },
              { icon: Users, t: 'Müşteri yönetim paneli', d: 'Tüm müşterilerinizin durumu, kullanım, fatura ve abonelikleri tek panelde.', c: 'bg-purple-100 text-purple-700' },
              { icon: Handshake, t: 'White-label seçeneği', d: 'Gold tier\'da kendi markanızla satabilir, kooza\'yı arka planda kullanabilirsiniz.', c: 'bg-amber-100 text-amber-700' },
              { icon: Award, t: 'Eğitim & sertifikasyon', d: 'Aylık ücretsiz webinar, ürün eğitimi, satış koçluğu.', c: 'bg-cyan-100 text-cyan-700' },
              { icon: TrendingUp, t: 'Ortak pazarlama', d: 'Co-branded landing page, ortak webinar, social media.', c: 'bg-rose-100 text-rose-700' },
              { icon: Users, t: 'Topluluk', d: '500+ partner ile özel WhatsApp grup, Discord kanalı, yıllık zirve.', c: 'bg-purple-100 text-purple-700' },
            ].map((it, i) => {
              const Icon = it.icon
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-cardHover hover:border-purple-200 transition-all">
                  <div className={`w-12 h-12 rounded-xl ${it.c} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{it.t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{it.d}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">3 partner seviyesi</h2>
            <p className="text-gray-600">Müşteri sayınıza göre büyüyen avantajlar</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white rounded-3xl border-2 p-7 ${
                  tier.popular ? 'border-purple-500 shadow-xl shadow-purple-200/50 scale-[1.02]' : 'border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    En Popüler
                  </div>
                )}
                <div className="text-4xl mb-3">{tier.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                <p className="text-sm text-gray-500 mb-5">{tier.customers}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-purple-700">{tier.commission}</span>
                  <span className="text-gray-500 text-sm ml-1">komisyon</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" strokeWidth={3} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/iletisim?konu=partner"
                  className={`block w-full text-center py-3 rounded-xl font-bold text-sm ${
                    tier.popular ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-900 text-white hover:bg-gray-800'
                  } transition-colors`}
                >
                  Başvur →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Müşterilerinizle birlikte büyüyelim.</h2>
          <p className="text-purple-100 mb-7 leading-relaxed">
            Başvurun 24 saatte değerlendirilir. Onaylanırsa partner panele erişiminiz açılır,
            ilk müşterinizi referans olarak ekleyebilirsiniz.
          </p>
          <Link
            href="/iletisim?konu=partner"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-purple-700 font-bold hover:-translate-y-0.5 transition-all shadow-xl"
          >
            Partner Başvurusu Yap →
          </Link>
        </div>
      </section>
    </div>
  )
}
