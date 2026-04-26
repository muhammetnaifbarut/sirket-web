'use client'

import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const fields = [
  { key: 'hero_title', label: 'Ana Başlık', type: 'text', placeholder: 'Dijital Dönüşümde\nÖncü Çözümler', hint: 'Yeni satır için \\n kullanın' },
  { key: 'hero_subtitle', label: 'Alt Başlık', type: 'textarea', placeholder: 'İşletmenizi geleceğe taşıyın.' },
  { key: 'hero_badge', label: 'Üst Rozet Yazısı', type: 'text', placeholder: 'Yeni Nesil İş Çözümleri' },
  { key: 'hero_cta_label', label: 'Buton 1 Yazısı', type: 'text', placeholder: 'Ücretsiz Demo Talep Et' },
  { key: 'hero_cta_url', label: 'Buton 1 Linki', type: 'text', placeholder: '/demo' },
  { key: 'hero_secondary_label', label: 'Buton 2 Yazısı', type: 'text', placeholder: 'Çözümleri Keşfet' },
  { key: 'hero_secondary_url', label: 'Buton 2 Linki', type: 'text', placeholder: '/yazilimlar' },
  { key: 'hero_gradient_from', label: 'Gradient Başlangıç Rengi', type: 'color', placeholder: '#0f172a' },
  { key: 'hero_gradient_via', label: 'Gradient Orta Rengi', type: 'color', placeholder: '#1e1b4b' },
  { key: 'hero_gradient_to', label: 'Gradient Bitiş Rengi', type: 'color', placeholder: '#312e81' },
  { key: 'hero_overlay_opacity', label: 'Overlay Opaklığı (0-1)', type: 'range', placeholder: '0.85' },
]

const toggleFields = [
  { key: 'hero_parallax', label: 'Parallax Efekti' },
  { key: 'hero_animation', label: 'Giriş Animasyonu' },
  { key: 'hero_blur', label: 'Arka Plan Blur Efekti' },
]

function MediaUploader({
  label,
  settingKey,
  accept,
  folder,
  currentUrl,
  onUploaded,
}: {
  label: string
  settingKey: string
  accept: string
  folder: string
  currentUrl: string
  onUploaded: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentUrl)

  useEffect(() => setPreview(currentUrl), [currentUrl])

  const handleFile = async (file: File) => {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', folder)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        setPreview(data.url)
        onUploaded(data.url)
        toast.success('Yüklendi!')
      } else {
        toast.error(data.error || 'Yükleme hatası')
      }
    } catch {
      toast.error('Yükleme hatası')
    } finally {
      setUploading(false)
    }
  }

  const isVideo = accept.includes('video')
  const isEmpty = !preview

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="flex gap-3 items-start">
        {/* Preview */}
        {preview && (
          <div className="relative shrink-0">
            {isVideo ? (
              <video
                src={preview}
                className="w-24 h-16 object-cover rounded-lg border border-gray-200"
                muted
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt=""
                className="w-24 h-16 object-cover rounded-lg border border-gray-200"
              />
            )}
            <button
              type="button"
              onClick={() => { setPreview(''); onUploaded('') }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}
        <div className="flex-1 space-y-2">
          {/* Upload button */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <span className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full" />
                Yükleniyor...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {isVideo ? 'Video Yükle' : 'Resim Yükle'}
              </>
            )}
          </button>
          {/* URL text field */}
          <input
            type="text"
            value={preview}
            onChange={(e) => { setPreview(e.target.value); onUploaded(e.target.value) }}
            placeholder={isEmpty ? 'ya da URL girin...' : ''}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
          e.target.value = ''
        }}
      />
    </div>
  )
}

export default function HeroSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        setValues(data || {})
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      toast.success('Hero ayarları kaydedildi!')
    } catch {
      toast.error('Kaydetme hatası')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" /></div>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Bölümü</h1>
          <p className="text-gray-500 text-sm mt-1">Ana sayfa hero alanını düzenleyin</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50"
        >
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      {/* Arka Plan Medya */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Arka Plan</h2>
        <MediaUploader
          label="Arka Plan Resmi"
          settingKey="hero_bg_image"
          accept="image/*"
          folder="hero"
          currentUrl={values.hero_bg_image || ''}
          onUploaded={(url) => setValues((v) => ({ ...v, hero_bg_image: url }))}
        />
        <MediaUploader
          label="Arka Plan Videosu (video resmin önüne geçer)"
          settingKey="hero_bg_video"
          accept="video/mp4,video/webm"
          folder="hero"
          currentUrl={values.hero_bg_video || ''}
          onUploaded={(url) => setValues((v) => ({ ...v, hero_bg_video: url }))}
        />
      </div>

      {/* İçerik */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">İçerik</h2>
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {field.label}
              {field.hint && <span className="text-gray-400 font-normal ml-2 text-xs">({field.hint})</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                rows={3}
                value={values[field.key] || ''}
                onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : field.type === 'color' ? (
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={values[field.key] || '#0f172a'}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1"
                />
                <input
                  type="text"
                  value={values[field.key] || ''}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ) : field.type === 'range' ? (
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={values[field.key] || '0.85'}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-sm font-mono text-gray-600 w-12 text-right">
                  {values[field.key] || '0.85'}
                </span>
              </div>
            ) : (
              <input
                type="text"
                value={values[field.key] || ''}
                onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
        ))}
      </div>

      {/* Gradient Önizleme */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">Gradient Önizleme</h2>
        <div
          className="w-full h-16 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${values.hero_gradient_from || '#0f172a'}, ${values.hero_gradient_via || '#1e1b4b'}, ${values.hero_gradient_to || '#312e81'})`,
          }}
        />
      </div>

      {/* Arka Plan Deseni */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Arka Plan Deseni</h2>

        {/* Pattern type selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Desen Türü</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'none', label: 'Yok', preview: null },
              { value: 'diagonal', label: 'Çapraz Çizgi', preview: 'diagonal' },
              { value: 'dots', label: 'Noktalar', preview: 'dots' },
              { value: 'grid', label: 'Izgara', preview: 'grid' },
              { value: 'crosshatch', label: 'Çift Çapraz', preview: 'crosshatch' },
              { value: 'waves', label: 'Dalgalar', preview: 'waves' },
            ].map((opt) => {
              const isActive = (values.hero_pattern_type || 'diagonal') === opt.value
              const patternPreviews: Record<string, string> = {
                diagonal: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-rule='evenodd'%3E%3Cpath d='M0 20L20 0H10L0 10M20 20V10L10 20'/%3E%3C/g%3E%3C/svg%3E\")",
                dots: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='2' fill='%236366f1'/%3E%3C/svg%3E\")",
                grid: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%236366f1' stroke-width='0.8'/%3E%3C/svg%3E\")",
                crosshatch: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%236366f1' stroke-width='0.8' fill='none'%3E%3Cpath d='M0 0L20 20'/%3E%3Cpath d='M20 0L0 20'/%3E%3C/g%3E%3C/svg%3E\")",
                waves: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q5 0 10 10 Q15 20 20 10' fill='none' stroke='%236366f1' stroke-width='0.8'/%3E%3C/svg%3E\")",
              }
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setValues((v) => ({ ...v, hero_pattern_type: opt.value }))}
                  className={`relative p-3 rounded-xl border-2 text-center transition-all ${
                    isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {opt.preview ? (
                    <div
                      className="w-full h-8 rounded-lg mb-2 bg-gray-700"
                      style={{ backgroundImage: patternPreviews[opt.preview], opacity: 0.8 }}
                    />
                  ) : (
                    <div className="w-full h-8 rounded-lg mb-2 bg-gray-100 flex items-center justify-center text-gray-300 text-xs">—</div>
                  )}
                  <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>{opt.label}</span>
                  {isActive && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Pattern color */}
        {(values.hero_pattern_type || 'diagonal') !== 'none' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Desen Rengi</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={values.hero_pattern_color || '#ffffff'}
                onChange={(e) => setValues((v) => ({ ...v, hero_pattern_color: e.target.value }))}
                className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1"
              />
              <input
                type="text"
                value={values.hero_pattern_color || ''}
                onChange={(e) => setValues((v) => ({ ...v, hero_pattern_color: e.target.value }))}
                placeholder="#ffffff"
                className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-1.5">
                {['#ffffff', '#000000', '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setValues((v) => ({ ...v, hero_pattern_color: c }))}
                    className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                    style={{
                      backgroundColor: c,
                      borderColor: (values.hero_pattern_color || '#ffffff') === c ? '#3B82F6' : '#e5e7eb',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pattern opacity */}
        {(values.hero_pattern_type || 'diagonal') !== 'none' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Desen Opaklığı</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="0.3"
                step="0.005"
                value={values.hero_pattern_opacity || '0.04'}
                onChange={(e) => setValues((v) => ({ ...v, hero_pattern_opacity: e.target.value }))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-sm font-mono text-gray-600 w-14 text-right">
                {parseFloat(values.hero_pattern_opacity || '0.04').toFixed(3)}
              </span>
            </div>
          </div>
        )}

        {/* Pattern size */}
        {(values.hero_pattern_type || 'diagonal') !== 'none' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Desen Boyutu (px)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={values.hero_pattern_size || '40'}
                onChange={(e) => setValues((v) => ({ ...v, hero_pattern_size: e.target.value }))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-sm font-mono text-gray-600 w-14 text-right">
                {values.hero_pattern_size || '40'}px
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Efektler */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Efektler</h2>
        {toggleFields.map((field) => (
          <div key={field.key} className="flex items-center justify-between py-1">
            <span className="text-sm font-medium text-gray-700">{field.label}</span>
            <button
              onClick={() =>
                setValues((v) => ({
                  ...v,
                  [field.key]: v[field.key] === 'false' ? 'true' : 'false',
                }))
              }
              className={`relative w-12 h-6 rounded-full transition-colors ${
                values[field.key] !== 'false' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  values[field.key] !== 'false' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-2xl p-4 text-sm text-blue-700 flex items-start gap-3">
        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Değişiklikler kaydedildikten sonra siteyi yenileyerek önizleyebilirsiniz.</span>
      </div>
    </div>
  )
}
