'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'

// ─── Section visibility config ───────────────────────────────────────────────
const SECTIONS = [
  { key: 'section_stats_visible', label: 'İstatistikler', desc: 'Sayaçlar bölümü (500+ müşteri, vb.)' },
  { key: 'section_products_visible', label: 'Yazılım Ürünleri', desc: 'Ürün kartları grid' },
  { key: 'section_services_visible', label: 'Danışmanlık Hizmetleri', desc: 'Hizmet kartları' },
  { key: 'section_process_visible', label: 'Nasıl Çalışıyoruz', desc: 'Süreç adımları timeline' },
  { key: 'section_whyus_visible', label: 'Neden Biz?', desc: 'Avantajlar grid' },
  { key: 'section_clients_visible', label: 'Müşteri Logoları', desc: 'Logo slider' },
  { key: 'section_pricing_visible', label: 'Fiyatlandırma', desc: 'Plan kartları' },
  { key: 'section_testimonials_visible', label: 'Referanslar', desc: 'Müşteri yorumları' },
  { key: 'section_cta_visible', label: 'Demo CTA', desc: 'Alt çağrı bölümü' },
]

// ─── Stats config ─────────────────────────────────────────────────────────────
const STAT_DEFAULTS = [
  { value: '500+', label: 'Mutlu Müşteri', icon: '😊', color: '#3B82F6' },
  { value: '1000+', label: 'Kurulan Sistem', icon: '💻', color: '#8B5CF6' },
  { value: '%98', label: 'Memnuniyet Oranı', icon: '⭐', color: '#10B981' },
  { value: '7/24', label: 'Teknik Destek', icon: '🛡️', color: '#F59E0B' },
]

// ─── Helper toggle ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>
  )
}

export default function AnasayfaAyarlariPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'sections' | 'stats' | 'cta'>('sections')

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => { setValues(data || {}); setLoading(false) })
  }, [])

  const set = (key: string, val: string) => setValues((v) => ({ ...v, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      toast.success('Ayarlar kaydedildi!')
    } catch {
      toast.error('Kaydetme hatası')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" /></div>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Anasayfa Ayarları</h1>
          <p className="text-gray-500 text-sm mt-1">Bölüm görünürlüğü, istatistikler ve CTA içerikleri</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50"
        >
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { href: '/admin/hero', label: 'Hero Bölümü', icon: '🖼️', desc: 'Arka plan, başlık, butonlar' },
          { href: '/admin/tema', label: 'Tema & Renkler', icon: '🎨', desc: 'Font, renk, buton stili' },
          { href: '/admin/surec', label: 'Süreç Adımları', icon: '📋', desc: 'Timeline içerikleri' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="p-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="font-semibold text-sm text-gray-900">{item.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
          </Link>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {[
          { key: 'sections', label: 'Bölüm Görünürlüğü' },
          { key: 'stats', label: 'İstatistikler' },
          { key: 'cta', label: 'Demo CTA' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Section Visibility ── */}
      {activeTab === 'sections' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-1">
          <p className="text-sm text-gray-500 mb-4">Kapalı bölümler anasayfada görünmez. Hero bölümü her zaman gösterilir.</p>
          {SECTIONS.map((section) => (
            <div key={section.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{section.label}</p>
                <p className="text-xs text-gray-400">{section.desc}</p>
              </div>
              <Toggle
                checked={values[section.key] !== 'false'}
                onChange={() => set(section.key, values[section.key] !== 'false' ? 'false' : 'true')}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── TAB: Stats ── */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Değer formatları: <code className="bg-gray-100 px-1 rounded text-xs">500+</code>, <code className="bg-gray-100 px-1 rounded text-xs">%98</code>, <code className="bg-gray-100 px-1 rounded text-xs">7/24</code>
          </p>
          {[1, 2, 3, 4].map((i) => {
            const def = STAT_DEFAULTS[i - 1]
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${values[`stat${i}_color`] || def.color}20` }}
                  >
                    {values[`stat${i}_icon`] || def.icon}
                  </div>
                  <span className="font-semibold text-gray-900">İstatistik {i}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Değer</label>
                    <input
                      type="text"
                      value={values[`stat${i}_value`] ?? ''}
                      onChange={(e) => set(`stat${i}_value`, e.target.value)}
                      placeholder={def.value}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Etiket</label>
                    <input
                      type="text"
                      value={values[`stat${i}_label`] ?? ''}
                      onChange={(e) => set(`stat${i}_label`, e.target.value)}
                      placeholder={def.label}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">İkon (emoji)</label>
                    <input
                      type="text"
                      value={values[`stat${i}_icon`] ?? ''}
                      onChange={(e) => set(`stat${i}_icon`, e.target.value)}
                      placeholder={def.icon}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Renk</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={values[`stat${i}_color`] || def.color}
                        onChange={(e) => set(`stat${i}_color`, e.target.value)}
                        className="w-10 h-9 rounded-lg border border-gray-200 cursor-pointer p-1"
                      />
                      <input
                        type="text"
                        value={values[`stat${i}_color`] ?? ''}
                        onChange={(e) => set(`stat${i}_color`, e.target.value)}
                        placeholder={def.color}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── TAB: CTA ── */}
      {activeTab === 'cta' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Demo CTA Bölümü</h2>

          {[
            { key: 'cta_badge', label: 'Rozet Yazısı', placeholder: 'Ücretsiz 14 Gün Deneme' },
            { key: 'cta_title', label: 'Başlık (\\n ile satır kır)', placeholder: 'Hemen Başlamaya\\nHazır mısınız?' },
            { key: 'cta_subtitle', label: 'Alt Metin', placeholder: '14 gün ücretsiz deneme ile...', textarea: true },
            { key: 'cta_btn1_label', label: 'Buton 1 Yazısı', placeholder: 'Ücretsiz Demo Talep Et' },
            { key: 'cta_btn1_url', label: 'Buton 1 Linki', placeholder: '/demo' },
            { key: 'cta_btn2_label', label: 'Buton 2 Yazısı', placeholder: 'Bizimle İletişime Geç' },
            { key: 'cta_btn2_url', label: 'Buton 2 Linki', placeholder: '/iletisim' },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
              {(f as any).textarea ? (
                <textarea
                  rows={3}
                  value={values[f.key] ?? ''}
                  onChange={(e) => set(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type="text"
                  value={values[f.key] ?? ''}
                  onChange={(e) => set(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Güven Maddeleri (✓ listesi)</label>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <input
                  key={i}
                  type="text"
                  value={values[`cta_trust${i}`] ?? ''}
                  onChange={(e) => set(`cta_trust${i}`, e.target.value)}
                  placeholder={['14 gün ücretsiz', 'Kredi kartı gerekmez', 'İstediğiniz zaman iptal', '7/24 destek'][i - 1]}
                  className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-2xl p-4 text-sm text-blue-700 flex items-start gap-3">
        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Değişiklikler kaydedildikten sonra anasayfayı yenileyerek önizleyebilirsiniz.</span>
      </div>
    </div>
  )
}
