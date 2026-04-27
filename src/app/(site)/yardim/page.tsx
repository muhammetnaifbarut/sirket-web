import Link from 'next/link'
import {
  Search, BookOpen, Settings, CreditCard, ShieldCheck, Users,
  Phone, Mail, MessageCircle, ArrowRight,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yardım Merkezi — kooza',
  description: 'kooza ile ilgili sıkça sorulan sorular, başlangıç rehberleri, sorun giderme. 7/24 Türkçe destek.',
}

const CATEGORIES = [
  {
    icon: BookOpen,
    color: 'bg-purple-100 text-purple-700',
    title: 'Başlangıç',
    desc: 'kooza\'ya yeni başladıysan',
    items: [
      'kooza nasıl kurulur? (5 dakika)',
      'İlk kullanıcı ekleme',
      'Sektörel paketi seçme',
      'Excel\'den veri taşıma',
      'Şirket bilgilerini doldurma',
    ],
  },
  {
    icon: Settings,
    color: 'bg-emerald-100 text-emerald-700',
    title: 'Modül Kullanımı',
    desc: 'Randevu, stok, CRM, bordro vs.',
    items: [
      'Randevu sistemi nasıl çalışır?',
      'Stok modülü temelleri',
      'CRM\'de lead nasıl eklenir?',
      'Bordro hesaplaması',
      'e-Fatura kesme',
    ],
  },
  {
    icon: CreditCard,
    color: 'bg-amber-100 text-amber-700',
    title: 'Fatura & Ödeme',
    desc: 'Aboneliklerle ilgili',
    items: [
      'Plan değiştirme',
      'Aylık vs yıllık ödeme',
      'Fatura görüntüleme',
      'Kredi kartı güncelleme',
      'İptal süreci',
    ],
  },
  {
    icon: ShieldCheck,
    color: 'bg-rose-100 text-rose-700',
    title: 'Güvenlik & KVKK',
    desc: 'Veri koruma ve uyum',
    items: [
      'Veri yedekleme nasıl yapılır?',
      'KVKK uyumu detayları',
      'Şifre sıfırlama',
      'İki faktörlü kimlik (2FA)',
      'Hesap silme',
    ],
  },
  {
    icon: Users,
    color: 'bg-cyan-100 text-cyan-700',
    title: 'Ekip Yönetimi',
    desc: 'Kullanıcı ve yetkilendirme',
    items: [
      'Kullanıcı ekleme / silme',
      'Rol bazlı yetki',
      'Ekip içi mesajlaşma',
      'Performans takibi',
      'Aktivite logları',
    ],
  },
  {
    icon: Settings,
    color: 'bg-slate-100 text-slate-700',
    title: 'Entegrasyonlar',
    desc: 'Üçüncü parti bağlantılar',
    items: [
      'Trendyol entegrasyonu',
      'Yemeksepeti bağlantısı',
      'GİB e-Fatura kurulumu',
      'WhatsApp Business',
      'Google Calendar',
    ],
  },
]

const QUICK_ANSWERS = [
  { q: 'kooza\'ya hangi sektörler uyumlu?', a: 'Klinik, restoran, market, eğitim, güzellik salonu, e-ticaret, diş hekimi, veteriner, İK — 9 sektör için özel paket. Sektörünüz yoksa /iletisim üzerinden bize yazın.' },
  { q: '14 gün ücretsiz deneme nasıl başlatılır?', a: '/demo sayfasından form doldurun, ekibimiz sizi arayıp hesabınızı kuruyor. Kredi kartı bilgisi istemiyoruz.' },
  { q: 'Mevcut yazılımdan veri nasıl taşırım?', a: 'Excel veya CSV dosyalarınızdan otomatik taşıma. Ekibimiz sizin yerinize yapıyor (Pro & Enterprise paketler ücretsiz).' },
  { q: 'Aylık plan iptal edilebilir mi?', a: 'Evet, istediğiniz an iptal edebilirsiniz. Yıllık paketlerde dönem sonunda otomatik iptal olur.' },
  { q: 'Telefon desteği var mı?', a: 'Pro pakette mesai içi (09:00-18:00), Enterprise pakette 7/24 telefon destek. Tüm paketlerde WhatsApp.' },
]

export default function YardimPage() {
  return (
    <div className="bg-white">
      {/* Hero with Search */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
            🆘 Yardım Merkezi
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            Nasıl yardımcı olabiliriz?
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed mb-8">
            Sıkça sorulan sorular, başlangıç rehberleri ve sorun giderme — bir tıkla.
          </p>

          {/* Search */}
          <form
            action="/blog"
            method="get"
            className="max-w-xl mx-auto bg-white rounded-2xl p-1.5 flex items-center gap-2 shadow-2xl"
          >
            <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
            <input
              type="text"
              name="q"
              placeholder="Sorunu yaz: 'randevu nasıl', 'stok ekleme'..."
              className="flex-1 px-2 py-3 outline-none text-gray-900 text-base"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors"
            >
              Ara
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight text-center">
            Kategoriler
          </h2>
          <p className="text-gray-600 text-center mb-12">Konuya göre kılavuzlara göz at.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <div
                  key={cat.title}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-purple-200 hover:shadow-cardHover transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{cat.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{cat.desc}</p>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="text-sm text-gray-700 flex items-center gap-2 hover:text-purple-700 cursor-pointer">
                        <ArrowRight className="w-3 h-3 text-gray-300 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Answers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 tracking-tight text-center">
            En çok sorulan 5 soru
          </h2>
          <div className="space-y-3">
            {QUICK_ANSWERS.map((qa) => (
              <details key={qa.q} className="bg-white rounded-xl p-5 group border border-gray-100">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between list-none">
                  {qa.q}
                  <ArrowRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0 ml-3" />
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{qa.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Direct contact */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight text-center">
            Cevap bulamadın mı?
          </h2>
          <p className="text-gray-600 text-center mb-10">3 farklı kanal — sana en uygun olanı seç.</p>

          <div className="grid md:grid-cols-3 gap-5">
            <a
              href="https://wa.me/905414142942?text=Merhaba%20kooza%20destek%20ekibi"
              className="group bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-2xl p-7 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-sm text-gray-600 mb-3">Anında, mesai içi ortalama yanıt 8 dk.</p>
              <span className="text-sm font-bold text-emerald-700 inline-flex items-center gap-1">
                Yaz: +90 541 414 29 42
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a
              href="tel:+905414142942"
              className="group bg-purple-50 hover:bg-purple-100 border border-purple-100 rounded-2xl p-7 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Telefon</h3>
              <p className="text-sm text-gray-600 mb-3">Mesai: Pzt-Cum 09:00-18:00</p>
              <span className="text-sm font-bold text-purple-700 inline-flex items-center gap-1">
                Ara: +90 541 414 29 42
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <Link
              href="/iletisim"
              className="group bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-2xl p-7 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">İletişim Formu</h3>
              <p className="text-sm text-gray-600 mb-3">Detaylı sorular için (24 saat içinde dönüş)</p>
              <span className="text-sm font-bold text-amber-700 inline-flex items-center gap-1">
                Forma git
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
