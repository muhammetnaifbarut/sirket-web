import Link from 'next/link'
import { notFound } from 'next/navigation'
import prisma from '@/lib/db'
import * as Lucide from 'lucide-react'
import { ArrowRight, Check, ChevronRight, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'
import SectorFAQ from '@/components/site/SectorFAQ'
import SectorMockup from '@/components/site/SectorMockup'

interface Item { title: string; description: string; icon?: string }
interface Benefit { label: string; value: string; description?: string }
interface ModuleItem { name: string; description: string }
interface FAQ { question: string; answer: string }

function Icon({ name, className, style }: { name?: string; className?: string; style?: React.CSSProperties }) {
  if (!name) return null
  const Cmp = (Lucide as any)[name] as React.ComponentType<any> | undefined
  if (!Cmp) return null
  return <Cmp className={className} style={style} strokeWidth={1.75} />
}

export async function generateStaticParams() {
  const items = await prisma.sectorSolution.findMany({ where: { isActive: true }, select: { slug: true } })
  return items.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = await prisma.sectorSolution.findUnique({ where: { slug: params.slug } })
  if (!s) return { title: 'Bulunamadı' }
  const title = s.seoTitle || `${s.name} Çözümü`
  const description = s.seoDescription || s.tagline
  const og = `/api/og?title=${encodeURIComponent(s.heroTitle.replace(/\n/g, ' '))}&subtitle=${encodeURIComponent(s.tagline)}&badge=${encodeURIComponent(s.heroBadge)}`
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: [og] },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const s = await prisma.sectorSolution.findUnique({ where: { slug: params.slug } })
  if (!s || !s.isActive) notFound()

  const problems = (s.problems as unknown as Item[]) ?? []
  const features = (s.features as unknown as Item[]) ?? []
  const benefits = (s.benefits as unknown as Benefit[]) ?? []
  const modules = (s.modules as unknown as ModuleItem[]) ?? []
  const faqs = (s.faqs as unknown as FAQ[]) ?? []

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-gray-100 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-gray-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-purple-700">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/cozumler" className="hover:text-purple-700">Çözümler</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-700">{s.name}</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-20 w-[700px] h-[700px] rounded-full"
            style={{ background: `radial-gradient(circle, ${s.iconColor}28 0%, transparent 70%)`, filter: 'blur(60px)' }}
          />
          <div
            className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full"
            style={{ background: `radial-gradient(circle, ${s.iconColor}18 0%, transparent 70%)`, filter: 'blur(50px)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border"
                style={{ background: s.bgColor, color: s.iconColor, borderColor: `${s.iconColor}30` }}
              >
                <Icon name={s.icon} className="w-4 h-4" />
                {s.heroBadge}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.05] whitespace-pre-line">
                {s.heroTitle}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                {s.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/demo?sektor=${s.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-button transition"
                >
                  Ücretsiz Demo Talep Et
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-gray-200 hover:border-purple-300 text-gray-900 font-semibold transition"
                >
                  Uzmanla Görüş
                </Link>
              </div>
            </div>

            {/* Hero mockup — actual sector dashboard preview */}
            <div className="lg:col-span-5">
              <SectorMockup
                sectorSlug={s.slug}
                iconColor={s.iconColor}
                bgColor={s.bgColor}
                iconName={s.icon}
              />
              {/* Quick benefits strip below mockup */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {benefits.slice(0, 4).map((b, i) => (
                  <div key={i} className="rounded-xl bg-white border border-gray-100 p-3 shadow-soft">
                    <div className="text-xl font-bold leading-tight" style={{ color: s.iconColor }}>{b.value}</div>
                    <div className="text-[11px] font-semibold text-gray-700 mt-0.5">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      {problems.length > 0 && (
        <section className="py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-sm font-bold uppercase tracking-wider text-red-600 mb-3 block">Tanıdık geldi mi?</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {s.name} için bunlar, bilinen sorunlar.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {problems.map((p, i) => (
                <div key={i} className="rounded-2xl bg-white border border-gray-100 p-6 flex gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                    <Icon name={p.icon} className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{p.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES */}
      {features.length > 0 && (
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span
                className="text-sm font-bold uppercase tracking-wider mb-3 block"
                style={{ color: s.iconColor }}
              >
                Çözüm
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Tek sistemde, her şey hazır.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <div key={i} className="group rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-cardHover hover:border-purple-200 transition">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition group-hover:scale-110"
                    style={{ background: s.bgColor }}
                  >
                    <Icon name={f.icon} className="w-5 h-5" style={{ color: s.iconColor }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MODULES */}
      {modules.length > 0 && (
        <section className="py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 block">Pakette Neler Var</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {s.name} paketinin modülleri
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {modules.map((m, i) => (
                <div key={i} className="rounded-xl bg-white border border-gray-100 p-5 flex gap-3 items-start">
                  <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.bgColor }}>
                    <Check className="w-4 h-4" style={{ color: s.iconColor }} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{m.name}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{m.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQS */}
      {faqs.length > 0 && (
        <SectorFAQ
          title={`${s.name} hakkında sık sorulanlar`}
          subtitle="Bilmek istediğiniz başka bir şey varsa, iletişim formundan yazabilirsiniz."
          items={faqs}
          accent={s.iconColor}
        />
      )}

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative rounded-3xl overflow-hidden p-10 lg:p-16 text-white"
            style={{ background: `linear-gradient(135deg, ${s.iconColor} 0%, #714B67 100%)` }}
          >
            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{s.ctaTitle}</h2>
                <p className="text-lg text-white/85 max-w-xl leading-relaxed">{s.ctaSubtitle}</p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  href={`/demo?sektor=${s.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-purple-700 hover:bg-gray-50 font-bold shadow-button transition"
                >
                  Ücretsiz Demo Al
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/30 transition"
                >
                  Uzmanla Görüş
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
