import Link from 'next/link'
import { ArrowRight, Target, BookOpen, Calculator, MessageSquare, Users, Sparkles, TrendingDown, FileCheck } from 'lucide-react'

const MAGNETS = [
  {
    href: '/dijital-olgunluk-testi',
    icon: Target,
    badge: '🎯 2 dakika',
    title: 'Dijital Olgunluk Testi',
    description: '15 soruya cevap ver, işletmenizin dijital olgunluk skoru + 30 günlük yol haritası.',
    cta: 'Teste başla',
    color: 'from-purple-500 to-purple-700',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
    badgeColor: 'bg-purple-50 text-purple-700',
  },
  {
    href: '/araclar/no-show-kayip',
    icon: TrendingDown,
    badge: '💸 Anlık',
    title: 'No-Show Kayıp Hesaplayıcı',
    description: 'Klinik, kuaför, fizyo: gelmeyen müşteri yıllık ne kadar kazanç kaybettiriyor? WhatsApp hatırlatma ile ne kadar geri alırsın?',
    cta: 'Kaybını hesapla',
    color: 'from-red-500 to-rose-600',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-700',
    badgeColor: 'bg-red-50 text-red-700',
  },
  {
    href: '/araclar/whatsapp-lead',
    icon: MessageSquare,
    badge: '📱 WhatsApp',
    title: 'WhatsApp Lead Yakalama Analizi',
    description: 'Kaç fırsat WhatsApp\'tan geliyor? Cevap vermediğin müşteri rakibe gidiyor — ne kadar kayıp hesapla.',
    cta: 'Fırsatları gör',
    color: 'from-emerald-500 to-green-600',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    badgeColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    href: '/araclar/personel-maliyet',
    icon: Users,
    badge: '👥 Bordro',
    title: 'Personel Maliyet Analizi',
    description: 'Bordro + SGK + işveren payı + yan giderler. Personelin gerçek yıllık maliyeti ne?',
    cta: 'Tam maliyet hesabı',
    color: 'from-blue-500 to-cyan-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    badgeColor: 'bg-blue-50 text-blue-700',
  },
  {
    href: '/araclar/roi-kooza',
    icon: Calculator,
    badge: '💰 1 dakika',
    title: 'ROI Hesaplama (kooza vs Mevcut)',
    description: 'kooza\'ya geçince yıllık ne kadar tasarruf edersin? Sektör + büyüklük → 5 dakikada gerçekçi hesap.',
    cta: 'ROI hesapla',
    color: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    badgeColor: 'bg-amber-50 text-amber-700',
  },
  {
    href: '/araclar/ai-post-uretici',
    icon: Sparkles,
    badge: '🤖 AI · Yeni',
    title: 'AI Sosyal Medya Post Üretici',
    description: 'İşletme türünü ve hedefini söyle, AI Instagram + Facebook + WhatsApp postu üretsin. Ücretsiz.',
    cta: 'Post üret',
    color: 'from-pink-500 to-fuchsia-600',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-700',
    badgeColor: 'bg-pink-50 text-pink-700',
  },
  {
    href: '/araclar/efatura-checklist',
    icon: FileCheck,
    badge: '📋 Yasal',
    title: 'e-Fatura Geçiş Kontrol Listesi',
    description: '2026\'da e-Fatura zorunlusu sınırına yaklaştın mı? 10 maddeli checklist + indirilebilir PDF.',
    cta: 'Listeyi al',
    color: 'from-indigo-500 to-blue-600',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
    badgeColor: 'bg-indigo-50 text-indigo-700',
  },
  {
    href: '/dijital-rehber',
    icon: BookOpen,
    badge: '📘 PDF · 30 sayfa',
    title: 'Sektörel Dijitalleşme Rehberi',
    description: 'Sektörüne özel 30+ sayfa PDF rehber. En sık 10 hata, doğru aksiyon, beklenen kazanç.',
    cta: 'Rehberi indir',
    color: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-700',
    badgeColor: 'bg-violet-50 text-violet-700',
  },
]

export default function LeadMagnetTrio() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-purple-50/40 to-pink-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-bold mb-4">
            🎁 8 ÜCRETSIZ ARAÇ — Demo öncesi keşfet
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Önce <span className="text-purple-700">kendin hesapla</span>, sonra dene
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lead magnet sayfası değil — gerçekten işine yarayacak araçlar. Kayıt yok, sınır yok, anında sonuç.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MAGNETS.map((m) => {
            const Icon = m.icon
            return (
              <Link
                key={m.href}
                href={m.href}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-purple-300 p-5 hover:shadow-2xl hover:shadow-purple-900/10 transition-all hover:-translate-y-1 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${m.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${m.iconColor}`} />
                  </div>
                  <span className={`text-[10px] font-bold ${m.badgeColor} px-2 py-0.5 rounded-full`}>
                    {m.badge}
                  </span>
                </div>
                <h3 className="text-base font-black text-gray-900 mb-2 leading-tight tracking-tight">{m.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4 flex-1">{m.description}</p>
                <div className="text-sm font-bold text-purple-700 group-hover:text-purple-900 inline-flex items-center gap-1 mt-auto">
                  {m.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA bottom */}
        <div className="mt-12 text-center">
          <Link
            href="/araclar"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-200 rounded-xl text-purple-700 font-bold hover:bg-purple-50 transition"
          >
            🛠️ Tüm araçları gör (15+) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
