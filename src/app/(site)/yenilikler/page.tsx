import { Sparkles, Plus, Wrench, Bug, Zap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza Changelog — Yenilikler & Düzeltmeler',
  description: 'kooza ürününe ne eklendi, neler düzeldi, hangi performans iyileştirmeleri yapıldı. Son 6 aylık tüm güncellemeler.',
}

interface Entry {
  date: string
  version: string
  items: { type: 'new' | 'improve' | 'fix' | 'perf'; text: string }[]
}

const CHANGELOG: Entry[] = [
  {
    date: '27 Nisan 2026',
    version: 'v2.0.0',
    items: [
      { type: 'new', text: '🎉 kooza.tr resmi launch' },
      { type: 'new', text: 'Diş Hekimi, Veteriner, Güzellik Salonu, E-Ticaret sektör paketleri' },
      { type: 'new', text: 'Karşılaştırma sayfaları (vs Bilet, Logo, Calendly, Shopify, Paraşüt)' },
      { type: 'new', text: 'Marka kılavuzu /marka' },
      { type: 'new', text: 'Yardım Merkezi /yardim' },
      { type: 'improve', text: 'Hero başlığı netleştirildi: "Sektörünüze özel yazılım, tek platformda"' },
      { type: 'improve', text: 'Mini callback formu (ad+tel)' },
    ],
  },
  {
    date: '15 Nisan 2026',
    version: 'v1.9.0',
    items: [
      { type: 'new', text: 'Trendyol, Hepsiburada, N11 entegrasyonu' },
      { type: 'new', text: 'Aras, Yurtiçi, MNG, PTT kargo otomatik etiket' },
      { type: 'new', text: 'Yemeksepeti + Getir + Trendyol Yemek tek panelde' },
      { type: 'improve', text: 'CRM lead skorlama algoritması' },
      { type: 'fix', text: 'e-Fatura kesimi gecikmesi düzeltildi' },
    ],
  },
  {
    date: '5 Nisan 2026',
    version: 'v1.8.0',
    items: [
      { type: 'new', text: 'GİB e-Fatura/e-Arşiv otomatik kesim' },
      { type: 'new', text: 'WhatsApp Business otomatik mesaj' },
      { type: 'improve', text: 'Mobile dashboard %40 daha hızlı' },
      { type: 'perf', text: 'Lighthouse skoru 92 → 96' },
      { type: 'fix', text: 'Bordro hesaplamasında küsurat hatası' },
    ],
  },
  {
    date: '20 Mart 2026',
    version: 'v1.7.0',
    items: [
      { type: 'new', text: 'Vaka çalışmaları sayfası' },
      { type: 'new', text: 'ROI hesaplama aracı' },
      { type: 'improve', text: 'Randevu sistemi UI yenilendi' },
      { type: 'fix', text: 'Çoklu şube stok senkronu sorunu' },
    ],
  },
  {
    date: '5 Mart 2026',
    version: 'v1.6.0',
    items: [
      { type: 'new', text: 'Dijital Olgunluk Testi (10 soru, 2 dakika)' },
      { type: 'new', text: 'Sektörel Dijitalleşme Rehberi (PDF)' },
      { type: 'improve', text: 'Email bildirim şablonları' },
    ],
  },
  {
    date: '15 Şubat 2026',
    version: 'v1.5.0',
    items: [
      { type: 'new', text: 'Klinik & Sağlık paketi' },
      { type: 'new', text: 'Restoran & Kafe paketi' },
      { type: 'new', text: 'Market & Perakende paketi' },
      { type: 'new', text: 'Eğitim & Kurs paketi' },
      { type: 'new', text: 'İK & Bordro paketi' },
      { type: 'new', text: 'Web Sitesi & E-Ticaret paketi' },
      { type: 'improve', text: 'KVKK uyum modülü genişletildi' },
    ],
  },
]

const TYPE_META = {
  new: { icon: Plus, color: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'YENİ' },
  improve: { icon: Sparkles, color: 'bg-purple-100 text-purple-700 border-purple-200', label: 'İYİLEŞTİRME' },
  fix: { icon: Bug, color: 'bg-rose-100 text-rose-700 border-rose-200', label: 'DÜZELTME' },
  perf: { icon: Zap, color: 'bg-amber-100 text-amber-700 border-amber-200', label: 'PERFORMANS' },
}

export default function ChangelogPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
            📝 Changelog
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            Yenilikler & Düzeltmeler
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            kooza her hafta gelişiyor. Yeni özellikler, iyileştirmeler ve düzeltmeler — tek sayfada, kronolojik olarak.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10 text-sm">
            <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-semibold">Tümü</span>
            {Object.entries(TYPE_META).map(([k, m]) => (
              <span key={k} className={`px-3 py-1.5 rounded-full border ${m.color} font-semibold`}>
                {m.label}
              </span>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-purple-200 via-purple-400 to-purple-200" />
            <div className="space-y-10">
              {CHANGELOG.map((entry) => (
                <div key={entry.version} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-button">
                    {entry.version.split('.')[1]}
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-baseline justify-between gap-3 mb-4">
                      <h2 className="text-xl font-bold text-gray-900">{entry.version}</h2>
                      <span className="text-sm text-gray-500 font-mono">{entry.date}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {entry.items.map((item, i) => {
                        const meta = TYPE_META[item.type]
                        const Icon = meta.icon
                        return (
                          <li key={i} className="flex items-start gap-3">
                            <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${meta.color} mt-0.5`}>
                              <Icon className="w-3 h-3" />
                              {meta.label}
                            </span>
                            <span className="text-sm text-gray-700 leading-relaxed">{item.text}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
