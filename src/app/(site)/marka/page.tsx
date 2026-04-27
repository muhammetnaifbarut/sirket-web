import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza Marka Kılavuzu — Logo, Renk, Ses Tonu',
  description: 'kooza marka kimliği: kelebek hikayesi, renk paleti, font kullanımı, ses tonu rehberi. Basın ve partnerler için.',
}

const COLORS = [
  { name: 'Kooza Mor', hex: '#714B67', bg: 'bg-[#714B67]', text: 'text-white', usage: 'Ana marka rengi, headline\'lar' },
  { name: 'Açık Mor', hex: '#875A7B', bg: 'bg-[#875A7B]', text: 'text-white', usage: 'Vurgular, hover state' },
  { name: 'Pembe Aksan', hex: '#FFC0CB', bg: 'bg-[#FFC0CB]', text: 'text-gray-900', usage: 'Kelebek detay, dekoratif' },
  { name: 'Koyu Mor BG', hex: '#1a0f17', bg: 'bg-[#1a0f17]', text: 'text-white', usage: 'Koyu zemin, gradyan son' },
  { name: 'Emerald', hex: '#059669', bg: 'bg-emerald-600', text: 'text-white', usage: 'Onay, başarı, KVKK' },
  { name: 'Amber', hex: '#d97706', bg: 'bg-amber-600', text: 'text-white', usage: 'Uyarı, kampanya, urgency' },
]

const TONE_DOS = [
  '✓ Samimi ama profesyonel — "siz" kullan, ama sıcak',
  '✓ Spesifik sayılar — "%62" "5 dakika" "3 şube"',
  '✓ Yerel referanslar — "GİB", "KVKK", "MHRS", "Yemeksepeti"',
  '✓ Fayda odaklı — "ne kazanırsınız" diye anlat, "ne yapar" değil',
  '✓ Dönüşüm metaforu — "tırtıl → kelebek" hikayesini hatırlat',
]

const TONE_DONTS = [
  '✗ "Disrupt", "synergy", "leverage" — corporate clichés',
  '✗ "Lider", "1 numara", "en iyi" — kanıtsız üstünlük iddiaları',
  '✗ Çok uzun cümleler — 1 fikir = 1 cümle',
  '✗ Soğuk teknik dil — "API endpoint" yerine "bağlantı"',
  '✗ Gereksiz İngilizce — "demo" Türkçe karşılığı kullan',
]

export default function MarkaPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
            🦋 Marka Kılavuzu
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            kooza Marka Kimliği
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Logo kullanımı, renk paleti, font, ses tonu — basın, partner ve içerik üreticileri için.
          </p>
        </div>
      </section>

      {/* Logo */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Logo</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            kooza logosu küçük harfle yazılır. Asla "Kooza", "KOOZA" veya "Kooza ®" şeklinde kullanılmaz.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-gray-200 p-10 text-center">
              <div className="text-5xl font-black text-[#714B67] mb-2">kooza</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Açık zeminde</div>
            </div>
            <div className="rounded-2xl bg-[#714B67] p-10 text-center">
              <div className="text-5xl font-black text-white mb-2">kooza</div>
              <div className="text-xs font-semibold text-purple-200 uppercase tracking-wider">Koyu zeminde</div>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
              <div className="font-bold text-emerald-900 mb-2">✓ Doğru kullanım</div>
              <ul className="space-y-1 text-emerald-800">
                <li>• "kooza" — küçük harf</li>
                <li>• Yazı tipi: Arial Black, sans-serif</li>
                <li>• Etrafında en az 16px boşluk</li>
                <li>• Minimum boyut: 24px</li>
              </ul>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
              <div className="font-bold text-rose-900 mb-2">✗ Yanlış kullanım</div>
              <ul className="space-y-1 text-rose-800">
                <li>• "Kooza" / "KOOZA" — büyük harf</li>
                <li>• Logoyu eğme/germe</li>
                <li>• Renk değiştirme</li>
                <li>• Diğer logolarla yan yana sıkışık</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Renkler */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Renk Paleti</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Ana renk Kooza Mor (Odoo'dan ilham). Aksan rengimiz pembe — kelebeğin işareti.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLORS.map((c) => (
              <div key={c.hex} className="rounded-2xl overflow-hidden border border-gray-200">
                <div className={`${c.bg} ${c.text} p-8`}>
                  <div className="font-bold text-lg">{c.name}</div>
                  <div className="font-mono text-sm opacity-80 mt-1">{c.hex}</div>
                </div>
                <div className="p-4 bg-white text-xs text-gray-600">
                  {c.usage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipografi */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Tipografi</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Ana font: <strong>Inter</strong>. Headline'larda 700-900 weight, body'de 400-500.
          </p>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">H1 — Display</div>
              <div className="text-5xl font-black text-gray-900 tracking-tight">Kelebek olmaya hazır mısın?</div>
              <div className="text-xs text-gray-400 mt-3 font-mono">Inter 900 · 48-72px · -0.025em tracking</div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">H2 — Section</div>
              <div className="text-3xl font-bold text-gray-900 tracking-tight">Sektörünüze özel paket</div>
              <div className="text-xs text-gray-400 mt-3 font-mono">Inter 700 · 32-40px</div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Body — Paragraph</div>
              <div className="text-base text-gray-700 leading-relaxed">
                kooza, KOBİ'lerin yazılım kaosuna son vermek için doğdu. Web sitenizden randevu yönetiminize, stoğunuzdan müşteri ilişkilerinize — her şey tek panelde.
              </div>
              <div className="text-xs text-gray-400 mt-3 font-mono">Inter 400 · 16px · 1.6 line-height</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ses Tonu */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Ses Tonu</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Samimi profesyonel. Bir mahalle kahvecisinin sıcaklığı, bir doktorun güvenilirliği.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <h3 className="font-bold text-emerald-900 mb-4 text-lg">✓ Yapılır</h3>
              <ul className="space-y-2 text-emerald-800 text-sm leading-relaxed">
                {TONE_DOS.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
              <h3 className="font-bold text-rose-900 mb-4 text-lg">✗ Yapılmaz</h3>
              <ul className="space-y-2 text-rose-800 text-sm leading-relaxed">
                {TONE_DONTS.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hikaye */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">🦋 Marka Hikayesi</h2>
          <p className="text-gray-600 mb-8">
            kooza'nın anlamı: <strong>koza</strong>. Tırtıl olan işletmeleri, kelebek olarak çıkaran dönüşüm süreci.
          </p>
          <a
            href="/hakkimizda"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all"
          >
            Tüm hikayeyi oku →
          </a>
        </div>
      </section>
    </div>
  )
}
