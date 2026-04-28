import Link from 'next/link'
import {
  ArrowRight, Calendar, Users, MessageCircle, Brain, Repeat, Shield,
  Star, Smartphone, BarChart3, Megaphone, Building2, Check,
} from 'lucide-react'
import type { Metadata } from 'next'

const APP_URL = 'https://randevu.kooza.tr'

export const metadata: Metadata = {
  title: 'kooza Randevu — Akıllı Randevu Yönetim Sistemi',
  description:
    '12 sektör için tek panelde randevu, müşteri, finans ve raporlama. AI Asistan, WhatsApp hatırlatma, no-show önleme. 14 gün ücretsiz, kart yok.',
  openGraph: {
    title: 'kooza Randevu — Kelebek Hızında Randevu Yönetimi',
    description:
      'Klinik, salon, kuaför ve hizmet işletmeleri için. AI destekli, WhatsApp entegre, KVKK uyumlu.',
    url: 'https://kooza.tr/urunler/randevu',
    images: [{ url: 'https://randevu.kooza.tr/icon-512.svg', width: 512, height: 512 }],
  },
}

const SECTORS = [
  { icon: '🩺', label: 'Klinik' },
  { icon: '🦷', label: 'Diş Hekimi' },
  { icon: '🐾', label: 'Veteriner' },
  { icon: '💆', label: 'Fizyoterapi' },
  { icon: '💄', label: 'Güzellik' },
  { icon: '✂️', label: 'Kuaför' },
  { icon: '💈', label: 'Berber' },
  { icon: '🧖', label: 'Masaj / SPA' },
  { icon: '🎓', label: 'Eğitim' },
  { icon: '💼', label: 'Danışmanlık' },
  { icon: '🏋️', label: 'Spor / Fitness' },
  { icon: '🦋', label: 'Diğer Hizmet' },
]

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Asistan',
    desc: 'Claude AI ile "Bu ay neden gelirim düştü?" gibi soruları sor — gerçek iş danışmanı gibi cevap alır.',
    badge: 'Türkiye\'de İLK',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Business',
    desc: 'Meta Cloud API gerçek entegrasyon. %95+ açılma oranı. Onay/iptal tek tıkla.',
    badge: 'Resmi API',
  },
  {
    icon: Shield,
    title: 'No-Show Önleme',
    desc: '4 faktörlü risk skoru. Riskli müşterilere 24h önce otomatik onay iste.',
    badge: 'AI destekli',
  },
  {
    icon: Repeat,
    title: 'Tekrarlayan Randevular',
    desc: 'Haftalık fizyoterapi, aylık kontrol — tek seferde 12 hafta üst üste oluştur.',
  },
  {
    icon: Smartphone,
    title: 'Müşteri Portalı',
    desc: 'Müşteri kendi panelinden randevuları görür, iptal eder, sadakat puanlarını izler.',
  },
  {
    icon: Megaphone,
    title: 'Kampanya Yönetimi',
    desc: 'Doğum günü kuponu, "sizi özledik" mesajı, yeni hizmet duyurusu — 7 hedef segmenti.',
  },
  {
    icon: Building2,
    title: 'Çoklu Şube',
    desc: 'Birden fazla lokasyon, her biri kendi personeli ve takvimi. Süper admin paneli.',
  },
  {
    icon: BarChart3,
    title: 'AI Raporlama',
    desc: 'Gelir trendleri, en kârlı hizmetler, personel performansı — her şey grafikle.',
  },
  {
    icon: Star,
    title: 'Müşteri Yorumları',
    desc: 'Otomatik yorum daveti, yıldız puanı, public booking sayfasında ortalama puan görünür.',
  },
]

const COMPARE_ROWS = [
  { feature: 'Sektör çeşitliliği',          kooza: '12 sektör',     fresha: '8',       booksy: '6',       local: '1-2' },
  { feature: 'AI Asistan',                  kooza: '✓ Claude',      fresha: '✗',       booksy: '✗',       local: '✗' },
  { feature: 'WhatsApp Business',           kooza: '✓ Resmi API',   fresha: '✗',       booksy: '✗',       local: 'Link only' },
  { feature: 'No-show önleme (AI)',         kooza: '✓',             fresha: '✗',       booksy: '✗',       local: '✗' },
  { feature: 'Türkçe arayüz + destek',      kooza: '✓ Native',      fresha: '✗',       booksy: '✗',       local: '✓' },
  { feature: 'Iyzico ödeme',                kooza: '✓',             fresha: 'Stripe',  booksy: '✗',       local: '~' },
  { feature: 'KVKK uyumlu',                 kooza: '✓ Tam',         fresha: 'GDPR',    booksy: 'GDPR',    local: '~' },
  { feature: 'Tekrarlayan randevu',         kooza: '✓',             fresha: '✓',       booksy: '✓',       local: '✗' },
  { feature: 'Müşteri portalı',             kooza: '✓',             fresha: '✓',       booksy: '✓',       local: '✗' },
  { feature: '14 gün ücretsiz, kart yok',   kooza: '✓',             fresha: '✓',       booksy: '✓',       local: 'Değişir' },
]

const PRICING = [
  {
    name: 'Starter',
    price: '499',
    period: '/ay',
    desc: 'Tek personel, başlangıç işletmeler',
    features: [
      'Sınırsız randevu',
      '1 personel + 1 şube',
      '500 müşteri kaydı',
      'WhatsApp link gönderimi',
      'Email hatırlatma',
      'Temel raporlar',
    ],
    cta: '14 Gün Ücretsiz Başla',
    href: APP_URL + '/register',
    popular: false,
  },
  {
    name: 'Professional',
    price: '999',
    period: '/ay',
    desc: 'Büyüyen ekipler, 2-10 personel',
    features: [
      'Starter\'daki tüm özellikler',
      '10 personel + 3 şube',
      'Sınırsız müşteri',
      'WhatsApp Business API',
      'AI Asistan',
      'Kampanya yönetimi',
      'No-show önleme',
      'Müşteri portalı',
      'Iyzico ödeme entegrasyonu',
    ],
    cta: '14 Gün Ücretsiz Başla',
    href: APP_URL + '/register',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '2999',
    period: '/ay',
    desc: 'Zincir işletmeler, kurumsal kullanım',
    features: [
      'Professional\'daki tüm özellikler',
      'Sınırsız personel + şube',
      'Öncelikli destek',
      'Özel entegrasyonlar (API)',
      'SLA %99.9 uptime',
      'Adanmış hesap yöneticisi',
      'e-Fatura entegrasyonu',
      'Custom branding (white-label)',
    ],
    cta: 'Bizimle Görüşün',
    href: '/iletisim?konu=enterprise-randevu',
    popular: false,
  },
]

export default function Page() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f17] via-[#3a2436] via-[#5d3e55] to-[#714B67]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#875A7B]/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFC0CB]/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/30 text-xs font-bold text-white mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-300 animate-pulse" />
              BETA · ERKEN ERİŞİM · 14 GÜN ÜCRETSİZ
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
              Randevular kolay,<br />
              <span className="text-pink-200">kelebek hızında</span>.
            </h1>

            <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">
              12 sektör için tek panelde randevu, müşteri, finans, kampanya yönetimi.
              AI destekli, WhatsApp entegre, KVKK uyumlu. Türkiye'nin en gelişmiş randevu SaaS'ı.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={APP_URL + '/register'}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-[#714B67] font-bold shadow-2xl hover:scale-105 transition-transform"
              >
                14 Gün Ücretsiz Başla
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={APP_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/30 text-white font-bold hover:bg-white/20 transition-colors"
              >
                Demo'yu Gör
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/70 text-sm font-medium">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-300" /> Kart bilgisi sormuyor</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-300" /> KVKK uyumlu</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-300" /> Türkiye sunucularında</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-300" /> Türkçe destek</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEKTÖRLER */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#714B67]/10 text-[#714B67] text-sm font-bold mb-4">
              12 SEKTÖR İÇİN HAZIR
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              İşletmen ne olursa olsun, kooza Randevu uyuyor
            </h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {SECTORS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center gap-2 py-5 px-3 rounded-xl bg-white border border-gray-200 hover:border-[#875A7B] hover:shadow-md transition-all"
              >
                <span className="text-3xl">{s.icon}</span>
                <span className="text-sm font-medium text-gray-700">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#714B67]/10 text-[#714B67] text-sm font-bold mb-4">
              9 GÜÇLÜ MODÜL
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Sadece randevu yönetimi değil,<br />
              <span className="text-[#714B67]">tam bir işletme platformu</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="relative p-6 rounded-2xl bg-white border border-gray-200 hover:border-[#875A7B] hover:shadow-cardHover transition-all"
                >
                  {f.badge && (
                    <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-[#FFC0CB]/30 text-[#714B67] text-[10px] font-bold uppercase tracking-wider">
                      {f.badge}
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#714B67] to-[#875A7B] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-4">
              KARŞILAŞTIRMA
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Neden global rakipler değil de kooza?
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-700">Özellik</th>
                  <th className="text-center px-5 py-4 text-sm font-bold text-[#714B67]">kooza Randevu</th>
                  <th className="text-center px-5 py-4 text-sm font-medium text-gray-500">Fresha 🌐</th>
                  <th className="text-center px-5 py-4 text-sm font-medium text-gray-500">Booksy 🌐</th>
                  <th className="text-center px-5 py-4 text-sm font-medium text-gray-500">Yerel rakipler</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                  >
                    <td className="px-5 py-3 text-sm text-gray-700 font-medium">{row.feature}</td>
                    <td className="text-center px-5 py-3 text-sm text-[#714B67] font-bold">{row.kooza}</td>
                    <td className="text-center px-5 py-3 text-sm text-gray-500">{row.fresha}</td>
                    <td className="text-center px-5 py-3 text-sm text-gray-500">{row.booksy}</td>
                    <td className="text-center px-5 py-3 text-sm text-gray-500">{row.local}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="fiyatlandirma" className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#714B67]/10 text-[#714B67] text-sm font-bold mb-4">
              ŞEFFAF FİYATLANDIRMA
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Senin için hangi paket?
            </h2>
            <p className="text-lg text-gray-600 mt-3">14 gün ücretsiz, kart sormuyoruz, istediğin zaman iptal et.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-7 transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-br from-[#714B67] to-[#3a2436] text-white shadow-2xl scale-105 -mt-2'
                    : 'bg-white border border-gray-200 hover:border-[#875A7B] hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFC0CB] text-[#714B67] text-xs font-bold px-3 py-1 rounded-full">
                    EN POPÜLER
                  </span>
                )}
                <h3 className={`font-bold text-xl mb-1 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-5 ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-black ${plan.popular ? 'text-white' : 'text-gray-900'}`}>₺{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>{plan.period}</span>
                </div>

                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.popular ? 'text-white/90' : 'text-gray-700'}`}>
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-pink-200' : 'text-emerald-600'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  target={plan.href.startsWith('http') ? '_blank' : undefined}
                  rel={plan.href.startsWith('http') ? 'noopener' : undefined}
                  className={`block text-center py-3 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? 'bg-white text-[#714B67] hover:scale-105'
                      : 'bg-[#714B67] text-white hover:bg-[#5d3e55]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-10">
            Tüm planlarda KVKK uyumu, Türkiye sunucuları, otomatik yedekleme ve SSL dahildir.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-[#1a0f17] via-[#3a2436] to-[#714B67] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFC0CB] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#875A7B] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
            14 günde işletmen<br />
            <span className="text-pink-200">kelebeğe dönüşsün</span>.
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Hiçbir şey yüklemeden, kart vermeden — randevuyu, müşteriyi, finansı tek panelde yönet.
          </p>
          <Link
            href={APP_URL + '/register'}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-[#714B67] font-bold text-lg shadow-2xl hover:scale-105 transition-transform"
          >
            🦋 Hemen Başla
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-6 text-sm text-white/60">
            kooza ekosistemi · Eğitim, CRM, E-ticaret yakında
          </p>
        </div>
      </section>
    </div>
  )
}
