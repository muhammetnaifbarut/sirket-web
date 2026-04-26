'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'

const CATEGORIES = [
  { slug: 'dijital-donusum', name: 'Dijital Dönüşüm' },
  { slug: 'erp', name: 'ERP' },
  { slug: 'isletme-yonetimi', name: 'İşletme Yönetimi' },
  { slug: 'otomasyon', name: 'Otomasyon' },
  { slug: 'yapay-zeka', name: 'Yapay Zeka' },
]

interface GenerateResult {
  success: boolean
  post?: {
    id: string
    title: string
    slug: string
    status: string
    category: string
  }
  error?: string
}

export default function OtoBlogPage() {
  const [categorySlug, setCategorySlug] = useState('')
  const [customTopic, setCustomTopic] = useState('')
  const [publish, setPublish] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<GenerateResult | null>(null)

  const generate = async () => {
    setGenerating(true)
    setResult(null)
    try {
      const res = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categorySlug: categorySlug || undefined,
          topic: customTopic || undefined,
          publish,
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(`Blog yazısı oluşturuldu: "${data.post.title}"`)
        setResult(data)
      } else {
        toast.error(data.error || 'Hata oluştu')
        setResult(data)
      }
    } catch {
      toast.error('Bağlantı hatası')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Otomatik Blog Üretimi</h1>
          <p className="text-gray-500 text-sm mt-1">
            Yapay zeka ile SEO uyumlu blog yazısı üret
          </p>
        </div>
        <Link href="/admin/blog" className="btn-outline text-sm py-2">
          ← Blog Listesi
        </Link>
      </div>

      {/* Bilgi Kartı */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <div className="flex gap-3">
          <div className="text-2xl">🤖</div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">AI Blog Üretimi</h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              Claude AI, seçtiğiniz kategori ve konuya göre SEO uyumlu, profesyonel bir
              blog yazısı oluşturur. Yazar adı olarak <strong>Dr. Muhammet Naif BARUT</strong>{' '}
              otomatik eklenir.
            </p>
            <ul className="mt-2 space-y-1 text-sm text-blue-600">
              <li>✓ 600+ kelime içerik</li>
              <li>✓ SEO başlık ve meta açıklama</li>
              <li>✓ Otomatik kategori atama</li>
              <li>✓ Markdown formatında içerik</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900">Yazı Ayarları</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Kategori
          </label>
          <select
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Rastgele seç</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Özel Konu <span className="text-gray-400 font-normal">(isteğe bağlı)</span>
          </label>
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="örn: KOBİ'ler için ERP rehberi"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Boş bırakırsanız seçilen kategoriye göre otomatik konu seçilir.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPublish((p) => !p)}
            className={`relative w-12 h-6 rounded-full transition-colors ${publish ? 'bg-green-500' : 'bg-gray-200'}`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                publish ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
          <div>
            <p className="text-sm font-medium text-gray-700">
              {publish ? 'Hemen yayınla' : 'Taslak olarak kaydet'}
            </p>
            <p className="text-xs text-gray-400">
              {publish
                ? 'Yazı üretildikten sonra anında yayınlanır.'
                : 'Yazı taslak olarak kaydedilir, siz onayladıktan sonra yayınlanır.'}
            </p>
          </div>
        </div>

        <button
          onClick={generate}
          disabled={generating}
          className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: generating ? '#9CA3AF' : 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}
        >
          {generating ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              AI yazıyı oluşturuyor... (~20-30 saniye)
            </span>
          ) : (
            '✨ Blog Yazısı Üret'
          )}
        </button>
      </div>

      {/* Sonuç */}
      {result && (
        <div
          className={`rounded-2xl border p-5 ${
            result.success
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          {result.success && result.post ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✅</span>
                <h3 className="font-bold text-green-900">Yazı başarıyla oluşturuldu!</h3>
              </div>
              <div className="space-y-1 text-sm text-green-800">
                <p>
                  <strong>Başlık:</strong> {result.post.title}
                </p>
                <p>
                  <strong>Kategori:</strong> {result.post.category}
                </p>
                <p>
                  <strong>Durum:</strong>{' '}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      result.post.status === 'PUBLISHED'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {result.post.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                  </span>
                </p>
              </div>
              <div className="flex gap-3 mt-4">
                <Link
                  href={`/admin/blog/${result.post.id}/duzenle`}
                  className="text-sm px-4 py-2 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Düzenle
                </Link>
                <Link
                  href={`/blog/${result.post.slug}`}
                  target="_blank"
                  className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Görüntüle ↗
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-2xl">❌</span>
              <p className="text-red-800 font-medium">{result.error || 'Hata oluştu'}</p>
            </div>
          )}
        </div>
      )}

      {/* Haftalık Otomasyon Bilgisi */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
        <h3 className="font-semibold text-gray-900 mb-2">📅 Haftalık Otomatik Blog</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Haftada bir otomatik blog üretimi için bir cron job kurabilirsiniz. Aşağıdaki
          endpoint&apos;i haftada bir kez çağırın:
        </p>
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 overflow-x-auto">
          <p className="text-gray-500 mb-1"># Her Pazartesi 09:00&apos;da çalıştır</p>
          <p>0 9 * * 1 curl -X POST \</p>
          <p className="ml-4">-H &quot;Authorization: Bearer $CRON_SECRET&quot; \</p>
          <p className="ml-4">-H &quot;Content-Type: application/json&quot; \</p>
          <p className="ml-4">-d &apos;{`{"publish": true}`}&apos; \</p>
          <p className="ml-4">https://siteniz.com/api/blog/generate</p>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          CRON_SECRET değişkenini .env dosyanıza ekleyin.
        </p>
      </div>
    </div>
  )
}
