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
}

function MobilKurulumContent() {
  const sp = useSearchParams()
  const productId = (sp.get('app') || 'insaat').toLowerCase()
  const product = PRODUCTS[productId] || PRODUCTS.insaat

  const [device, setDevice] = useState<'iphone' | 'android' | 'unknown'>('unknown')

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) setDevice('iphone')
    else if (/android/.test(ua)) setDevice('android')
    else setDevice('unknown')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 text-sm font-semibold mb-4">
          ← Ana Sayfa
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-pink-500 rounded-3xl p-8 text-center text-white shadow-2xl mb-6">
          <div className="text-6xl mb-3">📱</div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {product.emoji} {product.name}
          </h1>
          <p className="text-purple-100 leading-relaxed">
            Telefonuna <strong>uygulama gibi</strong> ekle
          </p>
          <p className="text-pink-200 text-sm mt-2">
            ✓ Adres çubuğu görünmez · ✓ Ana ekranda ikon · ✓ Hızlı erişim · ✓ Bildirimler
          </p>
        </div>

        {/* Device tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setDevice('iphone')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${
              device === 'iphone'
                ? 'bg-purple-700 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            🍎 iPhone (Safari)
          </button>
          <button
            onClick={() => setDevice('android')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${
              device === 'android'
                ? 'bg-purple-700 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            🤖 Android (Chrome)
          </button>
        </div>

        {/* Steps */}
        {(device === 'iphone' || device === 'unknown') && (
          <Steps device="iphone" product={product} visible={device === 'iphone'} />
        )}
        {(device === 'android' || device === 'unknown') && (
          <Steps device="android" product={product} visible={device === 'android'} />
        )}

        {/* CTA */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mt-6 text-center">
          <p className="text-gray-700 mb-4">
            <strong>Hazır mısın?</strong> Aşağıya bas, {product.name}&apos;ı aç.
          </p>
          <a
            href={product.url}
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-700 to-pink-500 text-white font-black text-lg rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            {product.emoji} {product.name} Aç →
          </a>
          <p className="text-xs text-gray-500 mt-3">
            Açıldıktan sonra, yukarıdaki adımları uygulayarak ana ekrana ekle.
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-5 mt-4 text-sm text-gray-700">
          <details className="mb-2">
            <summary className="font-bold cursor-pointer text-purple-700">❓ Bu &quot;native uygulama&quot; mı?</summary>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Tam değil. <strong>PWA (Progressive Web App)</strong> teknolojisi. App Store/Play Store&apos;dan değil, doğrudan telefonun ana ekranına ekleniyor.
              Kullanım deneyimi <strong>native uygulama gibi</strong> — adres çubuğu yok, splash screen var, hızlı.
            </p>
          </details>
          <details className="mb-2">
            <summary className="font-bold cursor-pointer text-purple-700">❓ Veri kullanır mı?</summary>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Çok az. Web tabanlı çalışır, akıllı önbellekleme yapar. Bir kez yüklendikten sonra çoğu sayfa anında açılır (offline destek).
            </p>
          </details>
          <details>
            <summary className="font-bold cursor-pointer text-purple-700">❓ Çıkış yapabilir miyim?</summary>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Evet. Uygulama içinden çıkış yapabilirsin. Veya ikonu uzun bas → &quot;Kaldır&quot;.
            </p>
          </details>
        </div>
      </div>
    </div>
  )
}

function Steps({ device, product, visible }: { device: 'iphone' | 'android'; product: any; visible: boolean }) {
  if (device === 'iphone') {
    return (
      <div className={`bg-white rounded-3xl p-6 shadow-xl ${!visible ? 'opacity-50' : ''}`}>
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
            <p className="text-xs text-gray-600 text-center">
              (kutunun içinde yukarı ok — &quot;Paylaş&quot; ikonu)
            </p>
          </div>
        </Step>

        <Step num={3} title="'Ana Ekrana Ekle' seç">
          <p className="text-sm text-gray-700 mt-2">
            Açılan menüde aşağı kaydır, şunu bul:
          </p>
          <div className="mt-2 bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                ➕
              </div>
              <span className="font-semibold text-gray-900">Ana Ekrana Ekle</span>
            </div>
          </div>
        </Step>

        <Step num={4} title="'Ekle' tıkla, bitti! 🎉">
          <p className="text-sm text-gray-700 mt-2">
            Telefon ana ekranında <strong>{product.emoji} {product.name}</strong> ikonu çıkar.
            Tıkladığında native uygulama gibi açılır.
          </p>
        </Step>
      </div>
    )
  }

  // Android
  return (
    <div className={`bg-white rounded-3xl p-6 shadow-xl ${!visible ? 'opacity-50' : ''}`}>
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
          <p className="text-sm text-gray-700 mb-2">
            Chrome&apos;un sağ üst köşesinde:
          </p>
          <div className="text-3xl my-2 text-center">⋮</div>
          <p className="text-xs text-gray-600 text-center">
            (3 dikey nokta — menüyü açar)
          </p>
        </div>
      </Step>

      <Step num={3} title="'Ana ekrana ekle' veya 'Uygulamayı yükle'">
        <p className="text-sm text-gray-700 mt-2">
          Açılan menüde şu seçeneklerden biri var:
        </p>
        <div className="mt-2 space-y-2">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">📲</div>
              <span className="font-semibold text-gray-900">Ana ekrana ekle</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">📥</div>
              <span className="font-semibold text-gray-900">Uygulamayı yükle</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Hangisi varsa onu tıkla.
        </p>
      </Step>

      <Step num={4} title="Onayla, bitti! 🎉">
        <p className="text-sm text-gray-700 mt-2">
          Telefon ana ekranında <strong>{product.emoji} {product.name}</strong> ikonu çıkar.
          Native uygulama gibi tek tıkla açılır.
        </p>
      </Step>
    </div>
  )
}

function Step({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
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

export default function MobilKurulumPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>}>
      <MobilKurulumContent />
    </Suspense>
  )
}
