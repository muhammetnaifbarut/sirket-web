'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const TABS = [
  { id: 'general', label: 'Genel', icon: '🏢', desc: 'Marka ve site bilgileri' },
  { id: 'contact', label: 'İletişim', icon: '📞', desc: 'Telefon, e-posta, adres' },
  { id: 'hero', label: 'Hero Alanı', icon: '🖼️', desc: 'Ana sayfa hero metni' },
  { id: 'social', label: 'Sosyal Medya', icon: '📱', desc: 'LinkedIn, Twitter, vb.' },
  { id: 'integrations', label: 'Entegrasyonlar', icon: '🔌', desc: 'WhatsApp, Analytics' },
  { id: 'seo', label: 'SEO', icon: '🔍', desc: 'Başlık, açıklama, OG' },
  { id: 'footer', label: 'Footer', icon: '📄', desc: 'Footer içeriği' },
]

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [activeTab, setActiveTab] = useState('general')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit } = useForm({ defaultValues: settings })

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast.success('Ayarlar kaydedildi!')
      router.refresh()
    } catch {
      toast.error('Hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const activeTabInfo = TABS.find((t) => t.id === activeTab)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar tabs */}
      <aside className="lg:col-span-1">
        <div className="bg-white border border-gray-200 rounded-2xl p-2 sticky top-24">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-purple-50 text-purple-700 border border-purple-100'
                  : 'text-gray-600 hover:bg-gray-50 border border-transparent'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{tab.label}</div>
                <div className={`text-[10px] truncate ${activeTab === tab.id ? 'text-purple-500' : 'text-gray-400'}`}>
                  {tab.desc}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Content */}
      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <span className="text-2xl">{activeTabInfo?.icon}</span>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">{activeTabInfo?.label}</h2>
              <p className="text-sm text-gray-500">{activeTabInfo?.desc}</p>
            </div>
          </div>

          {activeTab === 'general' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Site Adı" name="site_name" register={register} placeholder="kooza" />
                <Field label="Slogan" name="site_tagline" register={register} placeholder="Tek platform, tüm iş yazılımları" />
              </div>
              <Field
                label="Açıklama"
                name="site_description"
                register={register}
                textarea
                rows={3}
                placeholder="Sitenin kısa açıklaması (SEO için kullanılır)"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Logo URL" name="site_logo" register={register} placeholder="/uploads/logo.png" />
                <Field label="Favicon URL" name="site_favicon" register={register} placeholder="/favicon.ico" />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="E-posta" name="site_email" register={register} type="email" placeholder="info@kooza.com.tr" />
                <Field label="Telefon" name="site_phone" register={register} placeholder="+90 555 555 55 55" />
              </div>
              <Field label="Adres" name="site_address" register={register} textarea rows={2} placeholder="Şehir, sokak, no..." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Vergi Dairesi" name="tax_office" register={register} />
                <Field label="Vergi No / TC" name="tax_no" register={register} />
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-5">
              <div className="p-4 bg-purple-50 rounded-xl text-sm text-purple-800 border border-purple-100 flex items-start gap-2">
                <span>💡</span>
                <span>
                  Daha gelişmiş ayarlar için{' '}
                  <a href="/admin/hero" className="font-bold underline">Hero Yönetimi</a> sayfasını kullanın.
                </span>
              </div>
              <Field label="Üst Rozet Yazısı" name="hero_badge" register={register} placeholder="Türkiye'nin yeni nesil işletme platformu" />
              <Field label="Başlık" name="hero_title" register={register} placeholder="İşletmenin tüm yazılımları, tek platformda" />
              <Field label="Alt Başlık" name="hero_subtitle" register={register} textarea rows={2} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Buton 1 Yazısı" name="hero_cta_label" register={register} placeholder="Ücretsiz Başla" />
                <Field label="Buton 1 URL" name="hero_cta_url" register={register} placeholder="/demo" />
                <Field label="Buton 2 Yazısı" name="hero_secondary_label" register={register} />
                <Field label="Buton 2 URL" name="hero_secondary_url" register={register} />
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              {[
                { key: 'social_linkedin', label: 'LinkedIn', icon: '💼' },
                { key: 'social_twitter', label: 'Twitter / X', icon: '𝕏' },
                { key: 'social_facebook', label: 'Facebook', icon: '👥' },
                { key: 'social_instagram', label: 'Instagram', icon: '📸' },
                { key: 'social_youtube', label: 'YouTube', icon: '▶️' },
                { key: 'social_tiktok', label: 'TikTok', icon: '🎵' },
              ].map(({ key, label, icon }) => (
                <div key={key} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-purple-200 transition-colors">
                  <span className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-lg">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <label className="text-xs font-semibold text-gray-700 block mb-0.5">{label}</label>
                    <input
                      {...register(key as any)}
                      className="w-full px-0 py-0.5 border-0 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-0"
                      placeholder={`https://${label.toLowerCase().split(' ')[0]}.com/kooza`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-5">
              {/* WhatsApp */}
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-lg">💬</span>
                    <div>
                      <h3 className="font-bold text-emerald-900">WhatsApp</h3>
                      <p className="text-[11px] text-emerald-700">Floating WhatsApp butonu</p>
                    </div>
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs text-emerald-800">
                    <input {...register('whatsapp_enabled')} type="checkbox" className="rounded text-emerald-600" />
                    Aktif
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Numara" name="whatsapp_number" register={register} placeholder="+905551234567" />
                  <Field label="Varsayılan Mesaj" name="whatsapp_message" register={register} placeholder="Merhaba!" />
                </div>
              </div>

              {/* Analytics */}
              <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center text-lg">📊</span>
                  <div>
                    <h3 className="font-bold text-blue-900">Google Analytics</h3>
                    <p className="text-[11px] text-blue-700">Ziyaretçi takibi ve raporlama</p>
                  </div>
                </div>
                <Field label="Tracking ID" name="analytics_ga_id" register={register} placeholder="G-XXXXXXXXXX" />
              </div>

              {/* SMTP / Email */}
              <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg">✉️</span>
                  <div>
                    <h3 className="font-bold text-amber-900">E-posta (SMTP)</h3>
                    <p className="text-[11px] text-amber-700">Form gönderimleri için</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="SMTP Sunucu" name="smtp_host" register={register} placeholder="smtp.gmail.com" />
                  <Field label="SMTP Port" name="smtp_port" register={register} placeholder="587" />
                  <Field label="SMTP Kullanıcı" name="smtp_user" register={register} />
                  <Field label="SMTP Şifre" name="smtp_pass" register={register} type="password" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-5">
              <Field label="Varsayılan Sayfa Başlığı" name="seo_default_title" register={register} placeholder="kooza - Tek Platform" />
              <Field label="Varsayılan Meta Açıklaması" name="seo_default_description" register={register} textarea rows={3} />
              <Field label="Anahtar Kelimeler" name="site_keywords" register={register} placeholder="dijital dönüşüm, yazılım, crm" />
              <Field label="OG Görsel URL" name="og_image" register={register} placeholder="/uploads/og.jpg" />
              <Field label="Google Search Console Doğrulama" name="google_verification" register={register} />
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-5">
              <Field label="Footer Yazısı" name="footer_text" register={register} placeholder="© 2026 kooza. Tüm hakları saklıdır." />
              <Field label="Footer Açıklaması" name="footer_description" register={register} textarea rows={3} />
            </div>
          )}
        </div>

        {/* Sticky save button */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between sticky bottom-4 shadow-lg">
          <p className="text-sm text-gray-500">
            Değişiklikler {activeTabInfo?.label.toLowerCase()} sekmesine yansıyor.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm disabled:opacity-60 transition-colors shadow-md shadow-purple-200"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" />
                </svg>
                Kaydediliyor...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Ayarları Kaydet
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

interface FieldProps {
  label: string
  name: string
  register: any
  placeholder?: string
  type?: string
  textarea?: boolean
  rows?: number
}

function Field({ label, name, register, placeholder, type = 'text', textarea, rows = 3 }: FieldProps) {
  const baseClass =
    'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all bg-white'

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      {textarea ? (
        <textarea
          {...register(name)}
          className={baseClass + ' resize-y'}
          rows={rows}
          placeholder={placeholder}
        />
      ) : (
        <input {...register(name)} type={type} className={baseClass} placeholder={placeholder} />
      )}
    </div>
  )
}
