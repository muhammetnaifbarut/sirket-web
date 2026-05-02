import type { Metadata } from 'next'
import PricingTabs from '@/components/site/sections/PricingTabs'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Fiyatlandırma — 10 ürün, 3 paket seçeneği',
  description: 'kooza ekosistemi: 10 farklı ürün için Başlangıç/Pro/Kurumsal paketleri. Veya Bundle ile %50 tasarruf. 14 gün ücretsiz, kredi kartı yok.',
}

export default async function FiyatlandirmaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
            💎 10 Ürün · 3 Paket · 1 Bundle
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight">
            Sektörüne özel paket seç
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Tek tek ürün al, ya da <strong>kooza Pro Bundle</strong> ile tüm ekosisteme erişim.
            <br />
            <span className="text-pink-200 font-semibold">14 gün ücretsiz — kredi kartı sormuyoruz.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-purple-100">
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span> KVKK uyumlu
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span> İstediğin zaman iptal
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span> Türkçe destek
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span> Mobilde app gibi
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-300">✓</span> e-Fatura
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Highlight */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-pink-500 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400/20 rounded-full translate-y-32 -translate-x-32 blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs font-bold mb-4">
                  🎁 EN POPÜLER · KOOZA PRO BUNDLE
                </div>
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">
                  10 ürünün <span className="text-pink-200">hepsi</span> tek pakette
                </h2>
                <p className="text-purple-100 mb-6 leading-relaxed">
                  Ayrı ayrı 7.000 ₺ değerinde olan kooza ekosisteminin tamamına <strong>tek aboneliğe</strong> erişim.
                  Sadece <strong className="text-pink-200">1.499 ₺/ay</strong>. Çoklu sektörde iş yapan firmalar için ideal.
                </p>
                <div className="flex flex-wrap gap-2 text-xs mb-6">
                  {['📅 Randevu', '🎓 Eğitim', '🏘️ Mesken', '🔧 Tamir', '⚖️ Hukuk', '🏗️ İnşaat', '🏠 Emlak', '🍽️ Servis', '💰 Muhasebe', '👥 İK'].map(p => (
                    <span key={p} className="bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">{p}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-black">1.499</span>
                  <span className="text-2xl">₺/ay</span>
                </div>
                <div className="text-sm text-purple-100 line-through mb-1">
                  Tek tek alırsan: 7.000 ₺/ay
                </div>
                <div className="inline-block bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold mb-4">
                  💰 %78 tasarruf · 5.500 ₺/ay daha az
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">✓ <span>10 ürün, sınırsız erişim</span></li>
                  <li className="flex items-center gap-2">✓ <span>10 kullanıcı (tüm ürünlerde)</span></li>
                  <li className="flex items-center gap-2">✓ <span>Öncelikli destek</span></li>
                  <li className="flex items-center gap-2">✓ <span>API erişimi (her ürün)</span></li>
                  <li className="flex items-center gap-2">✓ <span>14 gün ücretsiz</span></li>
                </ul>
                <a
                  href="/kayit?product=bundle&plan=pro"
                  className="block w-full bg-white text-purple-700 font-black text-center py-3.5 rounded-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                >
                  🚀 Bundle Aboneliğe Başla
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Per-product pricing tabs */}
      <PricingTabs />

      {/* Karşılaştırma */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">3 Paket Karşılaştırma</h2>
            <p className="text-gray-600">Her üründe ortak özellikler</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Özellik</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Başlangıç</th>
                  <th className="text-center p-4 font-semibold text-purple-700 bg-purple-50">Pro ⭐</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Kurumsal</th>
                  <th className="text-center p-4 font-semibold text-pink-700 bg-pink-50">🎁 Bundle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Kullanıcı sayısı', '1', '5', 'Sınırsız', 'Sınırsız (her üründe 5)'],
                  ['Müşteri/kayıt limiti', '500', '5.000', 'Sınırsız', 'Sınırsız'],
                  ['Şube yönetimi', '—', '2 şube', 'Sınırsız', 'Sınırsız'],
                  ['e-Fatura (GİB)', '—', '✓', '✓', '✓'],
                  ['API erişimi', '—', '✓', '✓', '✓ (her ürün)'],
                  ['WhatsApp/SMS otomasyon', '—', '✓', '✓', '✓'],
                  ['10 ürünün hepsine erişim', '—', '—', '—', '✓'],
                  ['Beyaz etiket', '—', '—', '✓', '—'],
                  ['SLA %99.9', '—', '—', '✓', '✓'],
                  ['Destek', 'WhatsApp', 'WA + Telefon', '7/24 + Hesap Müdürü', 'Öncelikli destek'],
                ].map(([label, s, p, e, b], i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-gray-700">{label}</td>
                    <td className="p-4 text-center text-gray-600">{s}</td>
                    <td className="p-4 text-center text-purple-700 bg-purple-50/40 font-semibold">{p}</td>
                    <td className="p-4 text-center text-gray-600">{e}</td>
                    <td className="p-4 text-center text-pink-700 bg-pink-50/40 font-semibold">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            * Tüm fiyatlara KDV dahil değildir · 14 gün ücretsiz deneme · Kredi kartı bilgisi sormuyoruz
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {[
              { q: '14 gün ücretsiz deneme nasıl çalışıyor?', a: 'Hesap açtıktan sonra 14 gün boyunca tüm özellikleri ücretsiz kullanırsın. Süre dolduğunda otomatik geçiş yapılmaz — bizim sana sorduktan sonra ödeme alırız. Kredi kartı sormuyoruz.' },
              { q: 'Plan değişikliği ne kadar kolay?', a: 'Anlık. Hesabım menüsünden plan yükselt veya düşür. Fark prorate hesaplanır.' },
              { q: 'Bundle ile tek tek ürün arasındaki fark?', a: 'Bundle 1999₺/ay → 10 ürünün hepsi · Tek tek 7000₺/ay → aynı 10 ürün. Yani Bundle %72 tasarruf. 3+ ürün kullanacaksanız Bundle daha hesaplı.' },
              { q: 'Yıllık ödeme indirimi var mı?', a: 'Evet — yıllık seçince 2 ay bedava (yaklaşık %17 ek tasarruf).' },
              { q: 'Aboneliği iptal edebilir miyim?', a: 'Evet. Hesabımdan tek tıkla iptal. 14 gün koşulsuz iade. Aylık planlarda anında. Yıllık planlarda dönem sonunda.' },
              { q: 'Kurulum ücreti var mı?', a: 'Hayır. Bütün paketler self-service kurulum. Kurumsal pakette ücretsiz veri taşıma + ekip eğitimi yapıyoruz.' },
              { q: 'Verilerim nerede saklanıyor?', a: 'Türkiye/AB sunucularında. KVKK ve GDPR uyumlu altyapı. AES-256 şifreleme. Detay /kvkk' },
              { q: 'Mobilde nasıl kullanırım?', a: 'Tarayıcıdan → Ana ekrana ekle → Native uygulama gibi açılır. iPhone+Android destek. PWA teknolojisi.' },
              { q: 'Hangi ödeme yöntemleri?', a: 'iyzico üzerinden kredi/banka kartı. Havale/EFT (Kurumsal). Şirketlere e-Fatura. PCI-DSS uyumlu.' },
              { q: 'Mevcut sistemden geçiş?', a: 'Pro ve Kurumsal pakette CSV/Excel/SQL\'den veri taşıma ekibimiz tarafından yapılır. Ortalama 2-3 iş günü.' },
            ].map((item) => (
              <details key={item.q} className="bg-white rounded-xl p-5 group border border-gray-100">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between list-none">
                  {item.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-5">Hangi paket sana uygun emin değilsin?</h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            14 gün ücretsiz dene → bilirsin. Memnun kalmazsan tek tıkla iptal et.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/kayit?product=bundle&plan=pro" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-purple-700 font-bold hover:-translate-y-0.5 transition-all shadow-xl">
              🚀 Bundle ile Başla
            </a>
            <a href="/iletisim" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur text-white font-bold border border-white/20 hover:bg-white/20 transition-all">
              Önce Konuşalım
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
