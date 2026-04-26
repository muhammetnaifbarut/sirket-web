'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const FONT_OPTIONS = ['Inter', 'Roboto', 'Poppins', 'Nunito', 'Open Sans', 'Lato', 'Montserrat', 'Raleway']
const RADIUS_OPTIONS = [
  { label: 'Yok', value: 'rounded-none' },
  { label: 'Küçük', value: 'rounded' },
  { label: 'Orta', value: 'rounded-lg' },
  { label: 'Büyük', value: 'rounded-xl' },
  { label: 'Tam Yuvarlak', value: 'rounded-full' },
]
const BUTTON_STYLES = [
  { label: 'Dolu', value: 'filled' },
  { label: 'Outline', value: 'outline' },
  { label: 'Ghost', value: 'ghost' },
]

export default function ThemeEditor({ theme }: { theme: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [primaryColor, setPrimaryColor] = useState(theme?.primaryColor || '#3B82F6')
  const [secondaryColor, setSecondaryColor] = useState(theme?.secondaryColor || '#8B5CF6')
  const [accentColor, setAccentColor] = useState(theme?.accentColor || '#10B981')

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fontSans: theme?.fontSans || 'Inter',
      fontHeading: theme?.fontHeading || 'Inter',
      darkMode: theme?.darkMode || false,
      borderRadius: theme?.borderRadius || 'rounded-lg',
      buttonStyle: theme?.buttonStyle || 'filled',
      layout: theme?.layout || 'default',
    },
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, primaryColor, secondaryColor, accentColor }),
      })
      toast.success('Tema kaydedildi! Sayfayı yenileyin.')
      router.refresh()
    } catch {
      toast.error('Hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colors */}
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span>🎨</span> Renk Paleti
          </h2>
          <div className="space-y-5">
            <div>
              <label className="form-label">Ana Renk (Primary)</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  className="form-input flex-1"
                  placeholder="#3B82F6"
                />
              </div>
              {/* Color presets */}
              <div className="flex gap-2 mt-2">
                {['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899', '#6B7280'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setPrimaryColor(c)}
                    className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                    style={{ backgroundColor: c, borderColor: primaryColor === c ? '#000' : 'transparent' }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">İkincil Renk (Secondary)</label>
              <div className="flex items-center gap-3">
                <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                <input type="text" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="form-input flex-1" />
              </div>
            </div>

            <div>
              <label className="form-label">Vurgu Renk (Accent)</label>
              <div className="flex items-center gap-3">
                <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                <input type="text" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="form-input flex-1" />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-5 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400 mb-3">Ön izleme</p>
            <div className="flex gap-2 flex-wrap">
              <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ background: primaryColor }}>
                Ana Renk
              </div>
              <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ background: secondaryColor }}>
                İkincil
              </div>
              <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ background: accentColor }}>
                Vurgu
              </div>
            </div>
          </div>
        </div>

        {/* Typography & Layout */}
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span>🔤</span> Tipografi & Düzen
          </h2>
          <div className="space-y-4">
            <div>
              <label className="form-label">Metin Fontu</label>
              <select {...register('fontSans')} className="form-input">
                {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            <div>
              <label className="form-label">Başlık Fontu</label>
              <select {...register('fontHeading')} className="form-input">
                {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            <div>
              <label className="form-label">Köşe Yuvarlama</label>
              <div className="grid grid-cols-3 gap-2">
                {RADIUS_OPTIONS.map(r => (
                  <label key={r.value} className="cursor-pointer">
                    <input {...register('borderRadius')} type="radio" value={r.value} className="sr-only peer" />
                    <div className="p-3 border-2 border-gray-200 rounded-xl text-center text-xs font-medium text-gray-600 peer-checked:border-blue-500 peer-checked:text-blue-600 peer-checked:bg-blue-50 hover:border-gray-300 transition-colors">
                      {r.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Buton Stili</label>
              <div className="grid grid-cols-3 gap-2">
                {BUTTON_STYLES.map(s => (
                  <label key={s.value} className="cursor-pointer">
                    <input {...register('buttonStyle')} type="radio" value={s.value} className="sr-only peer" />
                    <div className="p-3 border-2 border-gray-200 rounded-xl text-center text-xs font-medium text-gray-600 peer-checked:border-blue-500 peer-checked:text-blue-600 peer-checked:bg-blue-50 transition-colors cursor-pointer">
                      {s.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-sm text-gray-900">Karanlık Mod</p>
                <p className="text-xs text-gray-500">Siteyi karanlık modda göster</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input {...register('darkMode')} type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? 'Kaydediliyor...' : 'Temayı Kaydet'}
        </button>
      </div>
    </form>
  )
}
