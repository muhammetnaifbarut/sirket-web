import Link from 'next/link'
import prisma from '@/lib/db'
import * as Lucide from 'lucide-react'
import { ArrowRight, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Sektör Çözümleri',
  description: 'Klinik, restoran, market, eğitim, İK, e-ticaret — kooza\'nın sektöre özel dijital çözümleri.',
}

function Icon({ name, className, color }: { name: string; className?: string; color?: string }) {
  const Cmp = (Lucide as any)[name] as React.ComponentType<any> | undefined
  if (!Cmp) return null
  return <Cmp className={className} strokeWidth={1.75} style={color ? { color } : undefined} />
}

export default async function Page() {
  const sectors = await prisma.sectorSolution.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-20 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(113, 75, 103, 0.18) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Sektörel Dijital Çözümler
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
            Her sektöre özel,<br />
            <span className="text-purple-700">doğru çözüm.</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Genel yazılım değil, sektörünüzün sorunlarını anlayan paketler.
            Klinikten restorana, marketten eğitime — sizin işinize özel kurguladık.
          </p>
        </div>
      </section>

      {/* 10 ÜRÜN × HİZMET VERDİĞİ SEKTÖRLER */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-bold mb-4">
              🦋 10 ÜRÜN · 60+ SEKTÖR
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Hangi Üründe <span className="text-purple-700">Hangi Sektörler?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              kooza ekosisteminin 10 ürünü, Türkiye&apos;nin tüm KOBİ sektörlerine hizmet veriyor.
              Sektörünü bul, sana özel ürünü gör.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                emoji: '📅', name: 'kooza Randevu',
                url: 'https://randevu.kooza.tr',
                color: 'from-purple-500 to-purple-700',
                sectors: ['Klinik', 'Diş hekimi', 'Fizyoterapi', 'Veteriner', 'Kuaför', 'Berber', 'Güzellik salonu', 'Masaj/Spa', 'Spor salonu', 'Danışmanlık', 'Estetik', 'Psikolog', 'Diyetisyen']
              },
              {
                emoji: '🎓', name: 'kooza Eğitim',
                url: 'https://egitim.kooza.tr',
                color: 'from-indigo-500 to-blue-600',
                sectors: ['Anaokulu', 'Kreş', 'Etüt merkezi', 'Dershane', 'Dil okulu', 'Müzik kursu', 'Spor kursu', 'Yüzme kursu', 'Yetişkin eğitimi', 'Sanat atölyesi', 'Bilgisayar kursu']
              },
              {
                emoji: '🏘️', name: 'kooza Mesken',
                url: 'https://mesken.kooza.tr',
                color: 'from-cyan-500 to-blue-500',
                sectors: ['Site yönetimi', 'Apartman yöneticisi', 'Toplu konut', 'Yönetim firması', 'Plaza/AVM', 'Toplu işyeri', 'Karma site', 'Lüks rezidans']
              },
              {
                emoji: '🔧', name: 'kooza Tamir',
                url: 'https://tamir.kooza.tr',
                color: 'from-orange-500 to-red-500',
                sectors: ['Beyaz eşya servisi', 'Klima servisi', 'IT servisi', 'Telefon tamiri', 'Elektronik tamir', 'Asansör servis', 'Oto servis', 'Bahçıvan/Tesisat', 'Genel teknik servis']
              },
              {
                emoji: '⚖️', name: 'kooza Hukuk',
                url: 'https://hukuk.kooza.tr',
                color: 'from-violet-600 to-purple-600',
                sectors: ['Solo avukat', 'Hukuk bürosu', 'Hukuk müşaviri', 'Şirket avukatı', 'Aile hukuku', 'Ticaret hukuku', 'Ceza hukuku', 'İş hukuku', 'Gayrimenkul hukuku']
              },
              {
                emoji: '🏗️', name: 'kooza İnşaat',
                url: 'https://insaat.kooza.tr',
                color: 'from-amber-500 to-orange-600',
                sectors: ['Müteahhit', 'Yap-sat', 'Taahhüt firması', 'Taşeron', 'İhaleci', 'Yapı kooperatifi', 'Site kurucusu', 'Şantiye yönetimi']
              },
              {
                emoji: '🏠', name: 'kooza Emlak',
                url: 'https://emlak.kooza.tr',
                color: 'from-emerald-500 to-green-600',
                sectors: ['Emlak ofisi', 'Gayrimenkul danışmanı', 'Emlak danışmanlık', 'Toplu konut satış', 'Yatırım danışmanlığı', 'Kiralama firması', 'Devre mülk']
              },
              {
                emoji: '🍽️', name: 'kooza Servis',
                url: 'https://servis.kooza.tr',
                color: 'from-rose-500 to-pink-600',
                sectors: ['Restoran', 'Kafe', 'Bar/Pub', 'Pastane', 'Lokanta', 'Hızlı servis (fast food)', 'Cafe-bistro', 'Catering', 'Yiyecek standı', 'Yemek/içecek zinciri']
              },
              {
                emoji: '💰', name: 'kooza Muhasebe',
                url: 'https://muhasebe.kooza.tr',
                color: 'from-teal-500 to-emerald-600',
                sectors: ['KOBİ', 'Mikro işletme', 'Mali müşavir', 'e-Ticaret', 'Tek tip ürün satıcı', 'Toptan ticaret', 'Hizmet işletmesi', 'Şahıs şirketi', 'Limited şirket']
              },
              {
                emoji: '👥', name: 'kooza İK',
                url: 'https://ik.kooza.tr',
                color: 'from-sky-500 to-blue-600',
                sectors: ['Üretim firması', 'Restoran zinciri', 'Mağaza zinciri', 'KOBİ İK', 'Hizmet işletmesi (50+ personel)', 'İnşaat firması', 'Lojistik', 'Çağrı merkezi']
              },
            ].map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener"
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-300 hover:shadow-2xl hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-3xl shadow-lg shrink-0`}>
                    {p.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-lg text-gray-900 group-hover:text-purple-700 transition">{p.name}</h3>
                    <p className="text-xs font-semibold text-gray-500">{p.sectors.length} sektör için optimize</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.sectors.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-gray-50 hover:bg-purple-50 text-xs font-semibold text-gray-700 rounded-lg border border-gray-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs font-bold text-purple-700 group-hover:gap-2 transition-all flex items-center gap-1">
                  Demo aç <span className="ml-1">→</span>
                </div>
              </a>
            ))}
          </div>

          {/* Search hint */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm text-gray-700">
              <span className="text-lg">🔍</span>
              <span>Sektörünü göremiyor musun?</span>
              <Link href="/iletisim" className="text-purple-700 font-bold hover:underline">Bize sor →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 p-10 lg:p-14 text-white text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Sektörünüz listede yok mu?</h2>
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
              Her işletmeye özel çözüm üretiyoruz. Sürecinizi anlatın, size özel yapılandıralım.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-purple-700 hover:bg-gray-50 font-bold shadow-button transition"
            >
              Bize Ulaşın
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
