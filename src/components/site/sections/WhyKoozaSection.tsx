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
            Bilet, Logo, Bookify değil — niye kooza?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sadece bir yazılım değil — sektörünüze özel, Türkiye'ye özel, tek platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 p-7">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mb-5">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Türkiye için tasarlandı</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Yabancı yazılım çevirisi değil. KVKK, GİB e-Fatura, SGK e-Bildirge, MHRS — yerli kurallar baştan ürünün parçası.
            </p>
            <p className="text-sm font-semibold text-purple-700">
              vs. Shopify/Calendly: Türkçe destek, e-Fatura, KVKK
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-100 p-7">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center mb-5">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">9 sektör, 1 platform</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Klinik, restoran, market, eğitim, salon, e-ticaret, veteriner, diş, İK — her birine özel paket. 12 modül birbirine bağlı.
            </p>
            <p className="text-sm font-semibold text-emerald-700">
              vs. Logo/Mikro: Sektöre özel UI + entegrasyonlar
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-7">
            <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">14 günde dijitalleş</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              "Kelebek metodu" — 5 dk kurulum, 1 hafta veri taşıma, 14 günde tüm operasyonunuz dijitalleşmiş, ekibiniz eğitimli.
            </p>
            <p className="text-sm font-semibold text-amber-700">
              vs. Klasik ERP: 6 ay yerine 14 gün
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
