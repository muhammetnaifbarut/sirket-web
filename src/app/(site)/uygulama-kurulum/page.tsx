'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const PRODUCTS: Record<string, { name: string; emoji: string; url: string }> = {
  randevu: { name: 'kooza Randevu', emoji: '📅', url: 'https://randevu.kooza.tr' },
  egitim: { name: 'kooza Eğitim', emoji: '🎓', url: 'https://egitim.kooza.tr' },
  mesken: { name: 'kooza Mesken', emoji: '🏘️', url: 'https://mesken.kooza.tr' },
  tamir: { name: 'kooza Tamir', emoji: '🔧', url: 'https://tamir.kooza.tr' },
  hukuk: { name: 'kooza Hukuk', emoji: '⚖️', url: 'https://hukuk.kooza.tr' },
  insaat: { name: 'kooza İnşaat', emoji: '🏗️', url: 'https://insaat.kooza.tr' },
  emlak: { name: 'kooza Emlak', emoji: '🏠', url: 'https://emlak.kooza.tr' },
  servis: { name: 'kooza Servis', emoji: '🍽️', url: 'https://servis.kooza.tr' },
  muhasebe: { name: 'kooza Muhasebe', emoji: '💰', url: 'https://muhasebe.kooza.tr' },
  ik: { name: 'kooza İK', emoji: '👥', url: 'https://ik.kooza.tr' },
  kom: { name: 'kooza KOM', emoji: '🦋', url: 'https://kom.kooza.tr' },
}

function UygulamaKurulumContent() {
  const sp = useSearchParams()
  const productId = (sp.get('app') || 'mesken').toLowerCase()
  const product = PRODUCTS[productId] || PRODUCTS.mesken

  const [device, setDevice] = useState<'pc' | 'iphone' | 'android' | 'mac' | 'unknown'>('unknown')

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) setDevice('iphone')
    else if (/android/.test(ua)) setDevice('android')
    else if (/macintosh|mac os/.test(ua)) setDevice('mac')
    else if (/windows/.test(ua)) setDevice('pc')
    else setDevice('pc')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 text-sm font-semibold mb-4">
          ← Ana Sayfa
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-pink-500 rounded-3xl p-8 text-center text-white shadow-2xl mb-6">
          <div className="text-6xl mb-3">💻📱</div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            {product.emoji} {product.name}
          </h1>
          <p className="text-purple-100 leading-relaxed">
            <strong>Bilgisayarına</strong> ve <strong>telefonuna</strong> uygulama gibi kur
          </p>
          <p className="text-pink-200 text-sm mt-2">
            ✓ Tek tık · ✓ Splash screen · ✓ Sürekli açık · ✓ Adres çubuğu yok
          </p>
        </div>

        {/* Cihaz seçici */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {[
            { id: 'pc', label: '🪟 Windows', sub: 'Chrome/Edge' },
            { id: 'mac', label: '🍎 Mac', sub: 'Chrome/Edge' },
            { id: 'iphone', label: '📱 iPhone', sub: 'Safari' },
            { id: 'android', label: '🤖 Android', sub: 'Chrome' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDevice(d.id as any)}
              className={`py-3 px-3 rounded-xl font-bold text-sm transition ${
                device === d.id
                  ? 'bg-purple-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
              }`}
            >
              <div>{d.label}</div>
              <div className={`text-[10px] font-normal ${device === d.id ? 'text-purple-100' : 'text-gray-500'}`}>{d.sub}</div>
            </button>
          ))}
        </div>

        {/* Steps */}
        {(device === 'pc' || device === 'mac') && <PCSteps product={product} isMac={device === 'mac'} />}
        {device === 'iphone' && <Steps device="iphone" product={product} visible />}
        {device === 'android' && <Steps device="android" product={product} visible />}

        {/* CTA */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mt-6 text-center">
          <p className="text-gray-700 mb-4">
            <strong>Hazır mısın?</strong> Aç → tarayıcı sana otomatik &quot;Yükle&quot; sorar.
          </p>
          <a
            href={product.url}
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-700 to-pink-500 text-white font-black text-lg rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            {product.emoji} {product.name} Aç →
          </a>
        </div>

        {/* Sürekli açık vurgu */}
        <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-6 mt-4 border border-emerald-200">
          <h3 className="font-black text-emerald-900 mb-3">⚡ Kurulduktan sonra:</h3>
          <ul className="space-y-2 text-sm text-emerald-800">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Tek tıkla açılır</strong> — Notepad gibi anında</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Sürekli açık tutabilirsin</strong> — taskbar/dock'ta</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Native uygulama gibi</strong> — adres çubuğu yok, splash var</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Bildirim alabilirsin</strong> — yeni randevu, mesaj, vs.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Offline çalışabilir</strong> — internet kesilse bile son verilerini görürsün</span>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-5 mt-4 text-sm text-gray-700">
          <details className="mb-2">
            <summary className="font-bold cursor-pointer text-purple-700">❓ App Store / Play Store'dan mı?</summary>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Hayır! kooza <strong>PWA (Progressive Web App)</strong> teknolojisi kullanır. Doğrudan tarayıcıdan tek tıkla yüklenir. App Store onayı, indirme süresi yok.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-bold cursor-pointer text-purple-700">❓ Veri kullanımı?</summary>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Çok az. Akıllı önbellek var. Bir kez yüklendikten sonra çoğu sayfa anında açılır.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-bold cursor-pointer text-purple-700">❓ Güncelleme?</summary>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Otomatik. Sen hiçbir şey yapmazsın. Yeni özellikler 24 saat içinde sende.
            </p>
          </details>
          <details>
            <summary className="font-bold cursor-pointer text-purple-700">❓ Kaldırma?</summary>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Kolay. PC: Sağ tık → Kaldır. Telefon: ikon uzun bas → Kaldır.
            </p>
          </details>
        </div>
      </div>
    </div>
  )
}

function PCSteps({ product, isMac }: { product: any; isMac: boolean }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">{isMac ? '🍎' : '🪟'}</span>
        <h2 className="text-xl font-black text-gray-900">
          {isMac ? "Mac'e Kurulum" : "Windows'a Kurulum"} (Chrome / Edge)
        </h2>
      </div>

      <Step num={1} title={`Chrome veya Edge ile ${product.name}'ı aç`}>
        <code className="block bg-gray-100 px-3 py-2 rounded-lg text-sm font-mono mt-2 text-purple-700">
          {product.url}
        </code>
        <p className="text-xs text-gray-500 mt-2">
          ⚠️ Internet Explorer veya Firefox değil — Chrome/Edge önerilir.
        </p>
      </Step>

      <Step num={2} title="Adres çubuğunda 'Yükle' ikonu">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl mt-2">
          <p className="text-sm text-gray-700 mb-2">
            URL'in <strong>sağ tarafında</strong> (yer imi yıldızının yanında):
          </p>
          <div className="text-3xl my-2 text-center">⊕</div>
          <p className="text-xs text-gray-600 text-center">
            (artı işaretli kutu — &quot;Yükle&quot; ikonu)<br />
            <em>Veya menüden: ⋮ → &quot;{product.name}'i yükle&quot;</em>
          </p>
        </div>
      </Step>

      <Step num={3} title="'Yükle' butonuna bas">
        <p className="text-sm text-gray-700 mt-2">
          Açılan dialog'da:
        </p>
        <div className="mt-2 bg-gray-50 rounded-xl p-3 border border-gray-200">
          <div className="font-semibold text-gray-900 mb-1">{product.emoji} {product.name}</div>
          <div className="text-xs text-gray-600 mb-3">Bu uygulamayı yüklemek istiyor musunuz?</div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-xs">İptal</button>
            <button className="px-4 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold">Yükle</button>
          </div>
        </div>
      </Step>

      <Step num={4} title={isMac ? "Dock'ta veya Launchpad'de açılır 🎉" : "Masaüstüne ve Başlat menüsüne eklenir 🎉"}>
        <p className="text-sm text-gray-700 mt-2">
          {isMac ? (
            <>
              <strong>{product.emoji} {product.name}</strong> Dock'ta görünür. Tek tıkla aç, native uygulama gibi çalışır.
              Launchpad'de de bulunur.
            </>
          ) : (
            <>
              Otomatik olarak <strong>masaüstüne kısayol</strong> + <strong>Başlat menüsü</strong> + <strong>görev çubuğu</strong>'na eklenir.
              Notepad gibi tek tıkla açılır, kendi penceresinde çalışır.
            </>
          )}
        </p>
      </Step>
    </div>
  )
}

function Steps({ device, product, visible }: { device: 'iphone' | 'android'; product: any; visible: boolean }) {
  if (device === 'iphone') {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl">🍎</span>
          <h2 className="text-xl font-black text-gray-900">iPhone&apos;a Kurulum (Safari)</h2>
        </div>

        <Step num={1} title={`Safari'de ${product.name}'ı aç`}>
          <code className="block bg-gray-100 px-3 py-2 rounded-lg text-sm font-mono mt-2 text-purple-700">
            {product.url}
          </code>
          <p className="text-xs text-gray-500 mt-2">
            ⚠️ Chrome'dan değil <strong>Safari'den</strong> aç (iPhone'da PWA özellikleri Safari'ye özel)
          </p>
        </Step>

        <Step num={2} title="Alt menüden 'Paylaş' butonu">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl mt-2">
            <p className="text-sm text-gray-700">
              📱 Safari&apos;nin <strong>alt menüsünde</strong> ortada şu ikon var:
            </p>
            <div className="text-3xl my-2 text-center">⬆️</div>
            <p className="text-xs text-gray-600 text-center">(kutunun içinde yukarı ok)</p>
          </div>
        </Step>

        <Step num={3} title="'Ana Ekrana Ekle' seç">
          <div className="mt-2 bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">➕</div>
              <span className="font-semibold text-gray-900">Ana Ekrana Ekle</span>
            </div>
          </div>
        </Step>

        <Step num={4} title="'Ekle' tıkla, bitti! 🎉">
          <p className="text-sm text-gray-700 mt-2">
            Telefon ana ekranında <strong>{product.emoji} {product.name}</strong> ikonu çıkar. Tek tıkla aç!
          </p>
        </Step>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">🤖</span>
        <h2 className="text-xl font-black text-gray-900">Android&apos;e Kurulum (Chrome)</h2>
      </div>

      <Step num={1} title={`Chrome'da ${product.name}'ı aç`}>
        <code className="block bg-gray-100 px-3 py-2 rounded-lg text-sm font-mono mt-2 text-purple-700">
          {product.url}
        </code>
      </Step>

      <Step num={2} title="Sağ üstte 3 nokta menü">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl mt-2">
          <div className="text-3xl my-2 text-center">⋮</div>
          <p className="text-xs text-gray-600 text-center">(3 dikey nokta — menüyü açar)</p>
        </div>
      </Step>

      <Step num={3} title="'Ana ekrana ekle' veya 'Uygulamayı yükle'">
        <div className="mt-2 space-y-2">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">📲</div>
              <span className="font-semibold text-gray-900">Uygulamayı yükle</span>
            </div>
          </div>
        </div>
      </Step>

      <Step num={4} title="Onayla, bitti! 🎉">
        <p className="text-sm text-gray-700 mt-2">
          <strong>{product.emoji} {product.name}</strong> ikonu ana ekranda. Tek tıkla aç!
        </p>
      </Step>
    </div>
  )
}

function Step({ num, title, children }: { num: number; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-5 last:mb-0">
      <div className="shrink-0 w-9 h-9 rounded-full bg-purple-700 text-white font-black text-sm flex items-center justify-center">
        {num}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-base">{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default function UygulamaKurulumPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>}>
      <UygulamaKurulumContent />
    </Suspense>
  )
}
