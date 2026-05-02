import type { Metadata } from 'next'
import CalculatorsSuite from '@/components/site/sections/CalculatorsSuite'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ücretsiz Hesaplayıcılar — SGK, KDV, Kıdem, Aidat, Komisyon',
  description: 'kooza.tr ücretsiz iş hesaplayıcıları: SGK bordro 2026, kıdem tazminatı, yıllık izin, KDV, stopaj, aidat, emlak komisyonu, hakediş, restoran adisyon. Kayıt yok.',
  keywords: ['SGK hesaplama', 'bordro hesaplama', 'kıdem tazminatı', 'yıllık izin', 'KDV hesapla', 'aidat hesaplama', 'emlak komisyonu', 'hakediş'],
}

export default function HesaplayicilarPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
            🧮 10 Profesyonel Hesaplayıcı
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight">
            İşletmen için ücretsiz hesaplayıcılar
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            SGK bordro · Kıdem tazminatı · KDV · Aidat · Emlak komisyonu · Hakediş — hepsi anlık, kayıt istemeden.
          </p>
          <p className="text-sm text-pink-200 font-semibold mt-3">
            🇹🇷 2026 oranları · 📊 Anlık hesap · 🔒 Veri saklanmaz
          </p>
        </div>
      </section>

      <CalculatorsSuite />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
            Otomatik hesaplama mı istiyorsun?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Bu hesaplayıcılar tek seferlik. <strong>kooza ekosisteminde</strong> aynı işlemler otomatik:
            bordro her ay üretilir, e-Fatura GİB'e gider, aidat tahsilat sistemi sürekli çalışır.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/kayit?product=ik&plan=baslangic"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold transition shadow-lg"
            >
              👥 kooza İK 14 gün ücretsiz
            </a>
            <a
              href="/kayit?product=muhasebe&plan=baslangic"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold transition shadow-lg"
            >
              💰 kooza Muhasebe başla
            </a>
            <a
              href="/fiyatlandirma"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-purple-700 font-bold border border-purple-200 hover:bg-purple-50 transition"
            >
              Tüm ürünler
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
