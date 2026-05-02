import Link from 'next/link'
import { ArrowRight, Calendar, GraduationCap, Home, Users, ShoppingCart, Building2, Wrench, Scale, HardHat, Calculator, Utensils } from 'lucide-react'

/**
 * "Şimdi Dene" bandı — kooza ekosistemindeki 10 ürünün hepsi.
 * Her ürün kendi subdomain'inde live. Direkt kayıt + ödeme.
 */
const PRODUCTS = [
  {
    title: 'kooza Randevu',
    subtitle: 'Klinik · Kuaför · Fizyo · 10 sektör',
    description: 'AI Asistan, WhatsApp hatırlatma, no-show önleme, müşteri portalı — 14 gün ücretsiz.',
    href: 'https://randevu.kooza.tr/register',
    detailHref: '/kayit?product=randevu&plan=baslangic',
    label: 'Hemen Dene',
    icon: Calendar,
    color: 'from-[#714B67] to-[#875A7B]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza Eğitim',
    subtitle: 'Kreş · Kurs · Dershane',
    description: 'Yoklama, ödeme, veli iletişimi (WhatsApp), sınav-karne — 14 gün ücretsiz.',
    href: 'https://egitim.kooza.tr/register',
    detailHref: '/kayit?product=egitim&plan=baslangic',
    label: 'Hemen Dene',
    icon: GraduationCap,
    color: 'from-[#5d3e55] to-[#875A7B]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza Mesken',
    subtitle: 'Site · Apartman · Aidat',
    description: 'Aidat, sakin, talep, muhasebe — tek panelde. Kapıcı defterleri ve Excel\'e veda.',
    href: 'https://mesken.kooza.tr/login',
    detailHref: '/kayit?product=mesken&plan=baslangic',
    label: 'Hemen Dene',
    icon: Building2,
    color: 'from-[#0891b2] to-[#06b6d4]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza Tamir',
    subtitle: 'Beyaz eşya · IT · Klima · Servis',
    description: 'İş emri, müşteri kart, parça stoğu, teknisyen rotası — 8 sektör preset.',
    href: 'https://tamir.kooza.tr/login',
    detailHref: '/kayit?product=tamir&plan=baslangic',
    label: 'Hemen Dene',
    icon: Wrench,
    color: 'from-[#ea580c] to-[#f97316]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza Hukuk',
    subtitle: 'Avukat · Müvekkil · Dava',
    description: 'Dava, duruşma, belge, saat takibi, faturalama — UYAP entegre.',
    href: 'https://hukuk.kooza.tr/login',
    detailHref: '/kayit?product=hukuk&plan=baslangic',
    label: 'Hemen Dene',
    icon: Scale,
    color: 'from-[#7c3aed] to-[#a855f7]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza İnşaat',
    subtitle: 'Müteahhit · İhale · Şantiye',
    description: 'Proje, hakediş, taşeron, daire/satış, malzeme stoğu — Bakanlık birim fiyat.',
    href: 'https://insaat.kooza.tr/login',
    detailHref: '/kayit?product=insaat&plan=baslangic',
    label: 'Hemen Dene',
    icon: HardHat,
    color: 'from-[#d97706] to-[#f59e0b]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza Emlak',
    subtitle: 'Gayrimenkul · İlan · Lead',
    description: 'AI fiyat tahmini, çoklu portal otomasyonu, WhatsApp lead — 14 gün ücretsiz.',
    href: 'https://emlak.kooza.tr',
    detailHref: '/kayit?product=emlak&plan=baslangic',
    label: 'Hemen Dene',
    icon: Home,
    color: 'from-[#16a34a] to-[#22c55e]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza Servis',
    subtitle: 'Restoran · Kafe · POS',
    description: 'Adisyon, masa yönetimi, mutfak ekranı, kurye — POS demosunu hemen aç.',
    href: 'https://servis.kooza.tr/demo',
    detailHref: '/kayit?product=servis&plan=baslangic',
    label: 'Demo Aç',
    icon: Utensils,
    color: 'from-[#dc2626] to-[#ef4444]',
    badge: '🆕 BETA',
    available: true,
  },
  {
    title: 'kooza Muhasebe',
    subtitle: 'Ön muhasebe · e-Fatura · Cari',
    description: 'GİB entegre e-Fatura, banka bağlantısı, AI kategorileme — KOBİ için optimize.',
    href: 'https://muhasebe.kooza.tr',
    detailHref: '/kayit?product=muhasebe&plan=baslangic',
    label: 'Hemen Dene',
    icon: Calculator,
    color: 'from-[#059669] to-[#10b981]',
    badge: '🦋 CANLI',
    available: true,
  },
  {
    title: 'kooza İK',
    subtitle: 'Personel · Bordro · İzin',
    description: 'Personel, bordro, izin, mesai, performans — KVKK + iş kanunu uyumlu.',
    href: 'https://ik.kooza.tr',
    detailHref: '/kayit?product=ik&plan=baslangic',
    label: 'BETA Aç',
    icon: Users,
    color: 'from-[#0284c7] to-[#0ea5e9]',
    badge: '🆕 BETA',
    available: true,
  },
]

export default function TryProductsBand() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            🚀 10 Ürün — Şimdi Dene
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Ürünlerimizi tek tıkla aç, hemen kullan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Demo formu doldurma — direkt kayıt ol, 14 gün ücretsiz dene. Beğenmezsen iptal et, kart sormuyoruz.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {PRODUCTS.map((p) => {
            const Icon = p.icon
            const isBeta = p.badge.includes('BETA')

            return (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noopener"
                className="group relative rounded-2xl p-5 border border-gray-200 hover:border-[#875A7B] hover:shadow-cardHover hover:-translate-y-1 bg-white cursor-pointer transition-all"
              >
                {/* Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isBeta
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-bold text-gray-900 mb-0.5 leading-tight text-sm">{p.title}</h3>
                <p className="text-[11px] text-gray-500 mb-2 leading-tight">{p.subtitle}</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">{p.description}</p>

                {/* CTA */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-xs font-bold text-[#714B67] group-hover:gap-1.5 transition-all">
                    {p.label}
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <Link
                    href={p.detailHref}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] text-gray-400 hover:text-[#714B67] underline-offset-2 hover:underline"
                  >
                    Satın Al
                  </Link>
                </div>
              </a>
            )
          })}
        </div>

        {/* Bundle ribbon */}
        <div className="mt-10 max-w-3xl mx-auto bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 rounded-2xl p-5 text-white text-center shadow-xl">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-2xl">🎁</span>
            <div>
              <strong className="text-base">10 ürünün hepsini</strong> tek pakette al →
              <span className="text-pink-200 font-black ml-1">1.499 ₺/ay</span>
              <span className="text-xs ml-2 opacity-80">(7.000 ₺ değerinde · %78 indirim)</span>
            </div>
            <Link
              href="/kayit?product=bundle&plan=pro"
              className="ml-2 px-5 py-2 bg-white text-purple-700 font-bold rounded-xl hover:shadow-lg transition text-sm"
            >
              Bundle Al →
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          ✓ 14 gün ücretsiz · ✓ Kart yok · ✓ İstediğin zaman iptal · ✓ KVKK uyumlu
        </p>
      </div>
    </section>
  )
}
