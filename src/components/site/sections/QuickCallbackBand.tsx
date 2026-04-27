import QuickCallbackForm from '@/components/site/QuickCallbackForm'
import { Phone, MessageCircle, Search } from 'lucide-react'

export default function QuickCallbackBand() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Sol: Mesaj */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-purple-200 text-purple-700 text-sm font-semibold mb-6">
              💬 30 saniyede başla
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
              Form doldurmak istemiyor musun?<br />
              <span className="text-purple-700">Sadece adını ve telefonunu yaz.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-7 leading-relaxed">
              Uzun demo formu yerine 2 alan: ad + telefon. <strong>15 dakika içinde uzmanımız sizi arasın</strong>, sektörünüze özel anlatsın. Mesai içinde ortalama yanıt süresi: 8 dk.
            </p>

            <div className="space-y-3">
              {[
                { i: <Search className="w-5 h-5 text-purple-600" />, t: 'Sektörünüze özel demo anlatımı' },
                { i: <MessageCircle className="w-5 h-5 text-purple-600" />, t: 'WhatsApp veya telefon — siz seçin' },
                { i: <Phone className="w-5 h-5 text-purple-600" />, t: 'Tüm sorularınızı 15 dk içinde cevaplayalım' },
              ].map((it, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white shadow-sm border border-purple-100 flex items-center justify-center shrink-0">
                    {it.i}
                  </div>
                  <span className="text-sm text-gray-700">{it.t}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-3 text-sm text-gray-500">
              <span>Veya direkt:</span>
              <a
                href="https://wa.me/905414142942?text=Merhaba%20kooza%2C%20bilgi%20almak%20istiyorum"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="tel:+905414142942"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +90 541 414 29 42
              </a>
            </div>
          </div>

          {/* Sağ: Form */}
          <div className="lg:pl-8">
            <QuickCallbackForm />
          </div>
        </div>
      </div>
    </section>
  )
}
