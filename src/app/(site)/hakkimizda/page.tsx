import Link from 'next/link'
import { Heart, Compass, Sparkles, Users, Award, Target, ArrowRight, Building2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'kooza — Türkiye\'nin yeni nesil işletme platformu. Web sitesinden sektörel otomasyona, İK\'dan dijital dönüşüm danışmanlığına tek partner.',
}

const VALUES = [
  {
    icon: Heart,
    title: 'KOBİ önce gelir',
    description: 'Büyük şirketler değil, mahalle esnafı, küçük klinik, lojistik firması, kuaför — onların hayatını kolaylaştırmak için varız.',
  },
  {
    icon: Compass,
    title: 'Sade ama derinlikli',
    description: 'Karmaşık özellik bombardımanı değil, gerçekten kullanılan modüller. Her butonu sorgularız.',
  },
  {
    icon: Sparkles,
    title: 'Sürekli iyileşme',
    description: 'Ürünü her hafta güncelliyoruz. Müşteri geri bildirimi gelir → 7 gün içinde tasarımdadır.',
  },
  {
    icon: Users,
    title: 'Türkiye için Türkiye\'de',
    description: 'KVKK, e-Fatura, vergi mevzuatı — yerli kurallar baştan tasarımın parçası. Yabancı yazılım çevirisi değil.',
  },
]

const TIMELINE = [
  {
    year: '2018',
    title: 'İlk projeler',
    description: 'Farklı sektörlerden KOBİ\'lere özel yazılım projeleri ile başladık. Her sektörün kendine özgü ihtiyaçlarını gözlemledik.',
  },
  {
    year: '2021',
    title: 'Sektörel uzmanlaşma',
    description: 'Klinik, restoran, market, eğitim gibi sektörlerde tekrar eden ihtiyaçları analiz edip standart paketler haline getirmeye başladık.',
  },
  {
    year: '2023',
    title: 'kooza fikrinin doğuşu',
    description: 'Web sitesi, otomasyon, İK, muhasebe, CRM — KOBİ\'nin tüm dijital ihtiyacını tek platforma taşıma vizyonu netleşti.',
  },
  {
    year: '2024',
    title: 'kooza resmi lansmanı',
    description: '12 sektörel modül, web sitesi yapımı ve dijital dönüşüm danışmanlığı ile birleşik platform olarak hizmete girdi.',
  },
  {
    year: '2026',
    title: 'Bugün: 500+ KOBİ',
    description: '7+ sektörde, 500+ aktif işletme, %98 memnuniyet. Türkiye\'nin yeni nesil işletme platformu olma yolculuğu sürüyor.',
  },
]

const TEAM_HIGHLIGHTS = [
  { value: '500+', label: 'Aktif KOBİ' },
  { value: '12',   label: 'Sektörel Modül' },
  { value: '50+',  label: 'Uzman Ekip' },
  { value: '24/7', label: 'Türkçe Destek' },
]

export default function HakkimizdaPage() {
  return (
    <div className="bg-white">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-20 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(135, 90, 123,0.20) 0%, transparent 70%)', filter: 'blur(40px)' }}
          />
          <div
            className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            Hakkımızda
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.05]">
            Türkiye'nin yeni nesil<br className="hidden sm:block" />
            işletme platformu.
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            kooza, KOBİ'lerin yazılım kaosuna son vermek için doğdu.
            Web sitesinden sektörel otomasyona, İK'dan dijital dönüşüme — her şey tek partnerden.
          </p>
        </div>
      </section>

      {/* ─── MANIFESTO ─── */}
      <section className="py-16 lg:py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
              Manifestomuz
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Neden var olduğumuz
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200 shadow-soft space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Türkiye'deki KOBİ'lerin %78'i</strong> birden fazla yazılım kullanıyor.
              Birinin müşteri verisi diğeriyle konuşmuyor. Üç ayrı faturaya para veriliyor.
              Her biri için ayrı destek aranıyor. <strong className="text-purple-700">Bu çağ bitti.</strong>
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              kooza, KOBİ'nin <strong className="text-gray-900">tüm operasyonunu tek platforma</strong> taşıyor.
              Web sitesinden randevuya, stoktan müşteriye, izinden bordroya — her şey aynı yerde,
              aynı dilde, aynı ekipten yönetilen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Sadece yazılım vermiyoruz. <strong className="text-gray-900">Yıllık dijital dönüşüm tecrübemizle</strong>,
              "nasıl daha iyi yapabilirim" sorusuna da cevap veriyoruz. Yanındayız — bir yazılım tedarikçisi gibi değil,
              bir <strong className="text-purple-700">iş ortağı gibi</strong>.
            </p>

            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">kooza Ekibi</p>
                  <p className="text-sm text-gray-500">Yazılım, danışmanlık ve sektör uzmanları</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-gray-200" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-sm">
                  MB
                </div>
                <div>
                  <p className="font-bold text-gray-900">Dr. Muhammet Naif BARUT</p>
                  <p className="text-sm text-gray-500">Kurucu & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KEY STATS ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {TEAM_HIGHLIGHTS.map((s) => (
              <div key={s.label}>
                <div className="text-4xl lg:text-5xl font-bold text-purple-700 mb-2 tabular-nums">
                  {s.value}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold mb-4">
              Hikayemiz
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Sektör tecrübesinden platforma
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-200 via-purple-400 to-purple-200" />

            <div className="space-y-8">
              {TIMELINE.map((t) => (
                <div key={t.year} className="flex gap-5 relative">
                  <div className="relative z-10 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-button">
                    {t.year}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{t.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold mb-4">
              Değerlerimiz
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Bizi yönlendiren ilkeler
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-cardHover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACHIEVEMENTS ─── */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50/30 border-y border-purple-100/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Award className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">ISO 27001 Sertifikalı</h3>
              <p className="text-sm text-gray-600">Veri güvenliği uluslararası standardı</p>
            </div>
            <div>
              <Target className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">KVKK Uyumlu</h3>
              <p className="text-sm text-gray-600">Türkiye'de saklanan, korunan veriler</p>
            </div>
            <div>
              <Sparkles className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">GİB Entegrasyonu</h3>
              <p className="text-sm text-gray-600">e-Fatura, e-Arşiv otomatik</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Yolculuk başlasın.
          </h2>
          <p className="text-lg text-purple-100 mb-9">
            500+ KOBİ'ye katılın. Ücretsiz keşif görüşmesi alın, ihtiyacınıza özel paket çıkaralım.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-purple-700 font-bold hover:bg-purple-50 transition-all hover:-translate-y-0.5 shadow-elevated min-h-[52px]"
          >
            Ücretsiz Görüşme Al
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
