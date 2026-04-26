'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface ProcessStep {
  id?: string
  title: string
  description: string
  icon: string
  step: number
  color: string
  isActive: boolean
}

const ICONS = ['🔍', '📋', '⚡', '🎓', '🛡️', '🚀', '💡', '📊', '🔧', '✅']
const COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899']

const defaultSteps: ProcessStep[] = [
  { title: 'Analiz', description: 'İşletmenizin mevcut süreçlerini ve ihtiyaçlarını detaylı şekilde analiz ediyoruz.', icon: '🔍', step: 1, color: '#3B82F6', isActive: true },
  { title: 'Planlama', description: 'Analize göre size özel dijital dönüşüm yol haritası hazırlıyoruz.', icon: '📋', step: 2, color: '#8B5CF6', isActive: true },
  { title: 'Kurulum', description: 'Seçilen yazılım çözümlerini hızlı ve sorunsuz şekilde devreye alıyoruz.', icon: '⚡', step: 3, color: '#06B6D4', isActive: true },
  { title: 'Eğitim', description: 'Ekibinizi sistemi verimli kullanabilmeleri için kapsamlı şekilde eğitiyoruz.', icon: '🎓', step: 4, color: '#10B981', isActive: true },
  { title: 'Destek', description: '7/24 teknik destek ile sisteminizin kesintisiz çalışmasını sağlıyoruz.', icon: '🛡️', step: 5, color: '#F59E0B', isActive: true },
]

export default function ProcessAdminPage() {
  const [steps, setSteps] = useState<ProcessStep[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [newStep, setNewStep] = useState<Partial<ProcessStep>>({ title: '', description: '', icon: '🔍', color: '#3B82F6' })

  useEffect(() => {
    fetch('/api/process-steps')
      .then((r) => r.json())
      .then((data) => {
        setSteps(Array.isArray(data) && data.length > 0 ? data : [])
        setLoading(false)
      })
  }, [])

  const seedDefaults = async () => {
    for (const step of defaultSteps) {
      const res = await fetch('/api/process-steps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(step),
      })
      const created = await res.json()
      setSteps((s) => [...s, created])
    }
    toast.success('Varsayılan adımlar eklendi!')
  }

  const addStep = async () => {
    if (!newStep.title || !newStep.description) return
    const data = { ...newStep, step: steps.length + 1, isActive: true }
    const res = await fetch('/api/process-steps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const created = await res.json()
    setSteps((s) => [...s, created])
    setNewStep({ title: '', description: '', icon: '🔍', color: '#3B82F6' })
    toast.success('Adım eklendi!')
  }

  const updateStep = async (id: string, updates: Partial<ProcessStep>) => {
    setSaving(id)
    await fetch(`/api/process-steps/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    setSteps((s) => s.map((x) => (x.id === id ? { ...x, ...updates } : x)))
    setSaving(null)
    toast.success('Güncellendi!')
  }

  const deleteStep = async (id: string) => {
    await fetch(`/api/process-steps/${id}`, { method: 'DELETE' })
    setSteps((s) => s.filter((x) => x.id !== id))
    toast.success('Silindi!')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" /></div>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nasıl Çalışıyoruz?</h1>
          <p className="text-gray-500 text-sm mt-1">Süreç adımlarını düzenleyin</p>
        </div>
        {steps.length === 0 && (
          <button
            onClick={seedDefaults}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Varsayılanları Ekle
          </button>
        )}
      </div>

      {/* Steps list */}
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
              >
                {step.icon}
              </div>
              <div className="flex-1 min-w-0 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Başlık</label>
                    <input
                      value={step.title}
                      onChange={(e) => setSteps((s) => s.map((x) => x.id === step.id ? { ...x, title: e.target.value } : x))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">İkon</label>
                    <div className="flex gap-1 flex-wrap">
                      {ICONS.map((ic) => (
                        <button
                          key={ic}
                          onClick={() => setSteps((s) => s.map((x) => x.id === step.id ? { ...x, icon: ic } : x))}
                          className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all ${step.icon === ic ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-100'}`}
                        >
                          {ic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Açıklama</label>
                  <textarea
                    rows={2}
                    value={step.description}
                    onChange={(e) => setSteps((s) => s.map((x) => x.id === step.id ? { ...x, description: e.target.value } : x))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Renk</label>
                    <div className="flex gap-2">
                      {COLORS.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSteps((s) => s.map((x) => x.id === step.id ? { ...x, color: c } : x))}
                          className={`w-7 h-7 rounded-full transition-all ${step.color === c ? 'ring-2 ring-offset-1 ring-gray-800 scale-110' : ''}`}
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => step.id && updateStep(step.id, step)}
                    disabled={saving === step.id}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    {saving === step.id ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                  <button
                    onClick={() => step.id && deleteStep(step.id)}
                    className="px-4 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add new */}
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Yeni Adım Ekle</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Başlık</label>
            <input
              value={newStep.title || ''}
              onChange={(e) => setNewStep((s) => ({ ...s, title: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">İkon</label>
            <select
              value={newStep.icon}
              onChange={(e) => setNewStep((s) => ({ ...s, icon: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Açıklama</label>
          <textarea
            rows={2}
            value={newStep.description || ''}
            onChange={(e) => setNewStep((s) => ({ ...s, description: e.target.value }))}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={addStep}
          disabled={!newStep.title || !newStep.description}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50"
        >
          Adım Ekle
        </button>
      </div>
    </div>
  )
}
