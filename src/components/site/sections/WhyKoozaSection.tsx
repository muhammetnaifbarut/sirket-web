import { Sparkles, MapPin, Layers } from 'lucide-react'

export default function WhyKoozaSection() {
  return (
    <section className="py-16 lg:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-sm font-semibold mb-4">
            🦋 Neden kooza?
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Tek platform, tüm işletmen.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Defter, Excel ve dağınık WhatsApp gruplarıyla vedalaş.
            <br className="hidden sm:block" />
            kooza ile randevu, stok, finans ve müşteri — hepsi tek panelde.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 1. Türkiye'ye özel */}
          <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 p-7">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mb-5">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Türkiye için tasarlandı
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              KVKK, GİB e-Fatura, SGK e-Bildirge — yerli yasal gereksinimler
              baştan ürünün içinde. Türkçe destek, Türk müşteri davranışlarına uygun
              akışlar, TL fiyatlandırma.
            </p>
            <p className="text-sm font-semibold text-purple-700">
              ✓ Yerli sunucular · KVKK uyumlu · TR mevzuatı
            </p>
          </div>

          {/* 2. Tüm sektörler */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-100 p-7">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center mb-5">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Tüm sektörler için tek platform
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Restoran, klinik, kuaför, market, hukuk bürosu, site yönetimi —
              hangi sektörde olursan ol, sana özel modüller ve şablonlarla
              gelir.
            </p>
            <p className="text-sm font-semibold text-emerald-700">
              ✓ Sektörel hazır şablonlar · Sınırsız büyüme
            </p>
          </div>

          {/* 3. Hızlı kurulum */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-7">
            <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Dakikalar içinde başla
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Karmaşık kurulum yok, eğitim danışmanı çağırma. 5 dakikada hesabını
              aç, önceden hazır şablonlarla çalışmaya başla. İlk 14 gün ücretsiz.
            </p>
            <p className="text-sm font-semibold text-amber-700">
              ✓ Kart bilgisi yok · Anında aktivasyon
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
