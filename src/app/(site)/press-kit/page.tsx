import Link from 'next/link'
import { Download, FileText, Image as ImageIcon, Mail, Quote } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza Basın Kiti — Logo, Foto, Bilgi',
  description: 'Gazeteciler ve içerik üreticileri için kooza basın kiti: logo, founder fotoğrafı, kurumsal bilgi, founder quote\'ları, screenshots.',
}

const FACTS = [
  { label: 'Kuruluş', value: '2018' },
  { label: 'Resmi Lansman', value: '27 Nisan 2026' },
  { label: 'Merkez', value: 'İstanbul, Türkiye' },
  { label: 'Sektörel Paket', value: 'tüm sektörler' },
  { label: 'Modül Sayısı', value: '12+' },
  { label: 'Aktif Müşteri', value: '500+' },
]

const QUOTES = [
  {
    text: 'kooza, KOBİ\'lerin yazılım kaosuna son vermek için doğdu. Tek bir platformda her şey — sade, derinlikli, Türkiye\'ye özel.',
    author: 'Dr. Muhammet Naif BARUT',
    role: 'Kurucu & CEO',
  },
  {
    text: 'Bir mahalle marketinin de, 50 kişilik klinik zincirinin de aynı yazılımı kullanabileceği bir platform yaptık. Modüler ama bütünleşik.',
    author: 'Dr. Muhammet Naif BARUT',
    role: 'Kurucu & CEO',
  },
  {
    text: '14 günde dijitalleşme — tırtıl olarak girip kelebek olarak çıktığın bir koza. Hikayemiz bu.',
    author: 'Dr. Muhammet Naif BARUT',
    role: 'Kurucu & CEO',
  },
]

export default function PressKitPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
            📰 Basın Kiti
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            kooza Press Kit
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Gazeteciler, blog yazarları ve içerik üreticileri için resmi marka materyalleri ve şirket bilgisi.
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Hızlı bilgi (Quick Facts)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {FACTS.map((f) => (
              <div key={f.label} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{f.label}</div>
                <div className="text-2xl font-bold text-gray-900">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Şirket hakkında (Boilerplate)</h2>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>kooza</strong>, Türkiye'nin yeni nesil işletme platformudur. KOBİ\'lerin yazılım kaosuna
              son vermek için 2018\'de Dr. Muhammet Naif BARUT tarafından kuruldu ve 2026\'da resmi olarak
              kooza markası altında lanse edildi.
            </p>
            <p>
              Klinik, restoran, market, eğitim, güzellik salonu, e-ticaret, diş hekimi, veteriner ve
              insan kaynakları gibi tüm sektörler için özelleştirilmiş paketler sunan kooza,
              randevu, kasa, stok, CRM, muhasebe ve dijital dönüşüm danışmanlığını tek platformda toplar.
            </p>
            <p>
              <strong>Kelebek Metodu</strong> ile, geleneksel iş süreçlerini 14 günde dijital sistemlere
              dönüştürür. KVKK uyumlu, ISO 27001 sertifikalı, GİB e-Fatura entegre.
            </p>
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Founder quote'ları</h2>
          <div className="space-y-5">
            {QUOTES.map((q, i) => (
              <blockquote key={i} className="bg-white rounded-2xl border-l-4 border-purple-500 border border-gray-200 p-6">
                <Quote className="w-6 h-6 text-purple-300 mb-3" />
                <p className="text-gray-700 italic leading-relaxed mb-3">"{q.text}"</p>
                <footer className="text-sm">
                  <strong className="text-gray-900">{q.author}</strong>
                  <span className="text-gray-500"> — {q.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">İndirilebilir materyaller</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: ImageIcon, t: 'Logo paketi', d: 'PNG, SVG, EPS — koyu/açık zemin', size: '2.4 MB', href: '/marka' },
              { icon: ImageIcon, t: 'Founder fotoğrafları', d: 'Yüksek çözünürlük, profesyonel çekim', size: '8.1 MB', href: '/iletisim?konu=press' },
              { icon: ImageIcon, t: 'Ürün screenshots', d: '12 modülün ekran görüntüleri', size: '15.3 MB', href: '/iletisim?konu=press' },
              { icon: FileText, t: 'Şirket profili (PDF)', d: 'Detaylı şirket bilgisi, ürün, vizyon', size: '1.8 MB', href: '/iletisim?konu=press' },
              { icon: FileText, t: 'Basın bülteni şablonu', d: 'Yayına hazır metin', size: '180 KB', href: '/iletisim?konu=press' },
              { icon: FileText, t: 'Marka kılavuzu', d: 'Logo, renk, font kullanımı', size: 'Web', href: '/marka' },
            ].map((d, i) => {
              const Icon = d.icon
              return (
                <Link
                  key={i}
                  href={d.href}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-purple-200 hover:shadow-cardHover transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-purple-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{d.t}</h3>
                  <p className="text-sm text-gray-600 mb-3">{d.d}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-mono">{d.size}</span>
                    <span className="text-purple-700 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      <Download className="w-3.5 h-3.5" />
                      Talep et
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Mail className="w-10 h-10 text-purple-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Basın iletişim</h2>
          <p className="text-gray-600 mb-6">
            Röportaj, yorum, makale veya etkinlik konuğu olarak çağrı için doğrudan iletişim:
          </p>
          <a
            href="mailto:basin@kooza.tr?subject=Basın%20Talebi"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all"
          >
            basin@kooza.tr →
          </a>
          <p className="mt-4 text-sm text-gray-500">
            Ortalama yanıt süresi: <strong>4 saat</strong> · Mesai: Pzt-Cum 09:00-18:00
          </p>
        </div>
      </section>
    </div>
  )
}
