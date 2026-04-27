import Link from 'next/link'
import { Download, FileSpreadsheet, FileText, ClipboardList, Users, Calculator, Calendar, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ücretsiz Şablonlar — KOBİ İçin Excel & PDF Araçlar',
  description: 'KOBİ\'ler için hazır şablonlar: bordro, çalışan değerlendirme, randevu defteri, müşteri formu, KVKK aydınlatma metni, e-Fatura örneği.',
}

const TEMPLATES = [
  {
    icon: FileSpreadsheet,
    cat: 'Excel',
    title: 'Personel Bordro Hesaplama',
    desc: 'SGK, vergi, BES kesintileri otomatik. 2026 vergi dilimleri güncel.',
    items: 4,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: FileSpreadsheet,
    cat: 'Excel',
    title: 'Stok Sayım Formu',
    desc: 'Yıl sonu sayım için kullanışlı şablon. Çoklu depo destekli.',
    items: 3,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: FileText,
    cat: 'PDF',
    title: 'KVKK Aydınlatma Metni',
    desc: 'Hazır şablon. Şirket adı + sektörünü gir, hemen kullan.',
    items: 5,
    color: 'bg-rose-100 text-rose-700',
  },
  {
    icon: FileText,
    cat: 'PDF',
    title: 'Çalışan Açık Rıza Beyanı',
    desc: 'KVKK\'ya uygun, çalışanların imzalaması için hazır metin.',
    items: 2,
    color: 'bg-rose-100 text-rose-700',
  },
  {
    icon: ClipboardList,
    cat: 'Excel',
    title: 'Müşteri Memnuniyet Anketi',
    desc: '10 soruluk template, NPS skoru otomatik hesaplanır.',
    items: 10,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    icon: Calendar,
    cat: 'PDF',
    title: 'Randevu Defteri',
    desc: 'Yazıcıdan çıkar, doldur. Klinik/salon için.',
    items: 30,
    color: 'bg-cyan-100 text-cyan-700',
  },
  {
    icon: Users,
    cat: 'Excel',
    title: 'İK Performans Değerlendirme',
    desc: '5 başlık, 360° değerlendirme şablonu.',
    items: 5,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    icon: Calculator,
    cat: 'Excel',
    title: 'KDV Hesaplama Aracı',
    desc: 'KDV dahil/hariç, çoklu oran (%1, %10, %20).',
    items: 6,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: FileText,
    cat: 'PDF',
    title: 'e-Fatura Örnek Tasarımı',
    desc: 'GİB uyumlu örnek e-Fatura görseli + alanları.',
    items: 1,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: ClipboardList,
    cat: 'Excel',
    title: 'Lead Takip Tablosu',
    desc: 'Müşteri adayı yönetimi için basit pipeline.',
    items: 6,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    icon: FileSpreadsheet,
    cat: 'Excel',
    title: 'Restoran Reçete Maliyet',
    desc: 'Yemek başına maliyet ve kar marjı hesaplayıcı.',
    items: 4,
    color: 'bg-orange-100 text-orange-700',
  },
  {
    icon: FileText,
    cat: 'PDF',
    title: 'İşten Ayrılış Formu',
    desc: 'Çıkış süreci için imzalanması gereken belgeler.',
    items: 3,
    color: 'bg-slate-100 text-slate-700',
  },
]

export default function SablonPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur border border-amber-400/30 text-amber-200 text-sm font-semibold mb-6">
            🎁 Tamamen Ücretsiz
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            KOBİ Şablon Kütüphanesi
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Excel, PDF ve form şablonları — KVKK, bordro, anket, takvim, hesaplayıcı.
            <strong className="text-white"> Hepsi ücretsiz, indir kullan.</strong>
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEMPLATES.map((t, i) => {
              const Icon = t.icon
              return (
                <Link
                  key={i}
                  href={`/iletisim?konu=sablon-${encodeURIComponent(t.title)}`}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-purple-200 hover:shadow-cardHover transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${t.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider">
                      {t.cat}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{t.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{t.desc}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{t.items} sayfa</span>
                    <span className="text-purple-700 font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      <Download className="w-3.5 h-3.5" />
                      İndir
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter prompt */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Yeni şablonlardan haberdar ol
          </h2>
          <p className="text-gray-600 mb-7">
            Her ay 2-3 yeni şablon ekliyoruz. Newsletter'a abone ol, anında haberin olsun.
          </p>
          <Link
            href="/dijital-rehber"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all"
          >
            Sektörel rehberi de indir →
          </Link>
        </div>
      </section>
    </div>
  )
}
