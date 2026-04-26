'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'

export type FieldType = 'text' | 'textarea' | 'date' | 'number' | 'checkbox' | 'color' | 'select' | 'json'

export interface FieldDef {
  key: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]  // for select
  rows?: number  // for textarea
  cols?: number  // grid layout — default 12
}

interface Props {
  apiPath: string  // e.g. '/api/case-studies'
  initialItems: any[]
  fields: FieldDef[]
  /** Used for the displayed "title" of each row in the list */
  rowTitle: (item: any) => string
  rowSubtitle?: (item: any) => string
  emptyTitle?: string
  newItemDefaults: Record<string, any>
}

export default function GenericListAdmin({
  apiPath,
  initialItems,
  fields,
  rowTitle,
  rowSubtitle,
  emptyTitle = 'Henüz kayıt yok',
  newItemDefaults,
}: Props) {
  const router = useRouter()
  const [items, setItems] = useState(initialItems)
  const [editing, setEditing] = useState<any | null>(null)
  const [showForm, setShowForm] = useState(false)

  const newItem = () => ({ id: '', ...newItemDefaults })

  const save = async (item: any) => {
    try {
      const isNew = !item.id
      const url = isNew ? apiPath : `${apiPath}/${item.id}`
      const method = isNew ? 'POST' : 'PUT'
      const { id, ...data } = item
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      const saved = await res.json()
      if (isNew) setItems([...items, saved])
      else setItems(items.map((x: any) => (x.id === saved.id ? saved : x)))
      toast.success(isNew ? 'Eklendi' : 'Güncellendi')
      setEditing(null)
      setShowForm(false)
      router.refresh()
    } catch {
      toast.error('Hata oluştu')
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Silmek istediğine emin misin?')) return
    try {
      const res = await fetch(`${apiPath}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setItems(items.filter((x: any) => x.id !== id))
      toast.success('Silindi')
      router.refresh()
    } catch {
      toast.error('Silinemedi')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{items.length} kayıt</p>
        <button
          onClick={() => { setEditing(newItem()); setShowForm(true) }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4" /> Yeni Ekle
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {items.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">{emptyTitle}</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((it: any) => (
              <div key={it.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 group">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{rowTitle(it)}</p>
                  {rowSubtitle && (
                    <p className="text-xs text-gray-500 truncate">{rowSubtitle(it)}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditing(it); setShowForm(true) }}
                    className="p-2 rounded-lg text-purple-700 hover:bg-purple-50"
                    title="Düzenle"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => remove(it.id)}
                    className="p-2 rounded-lg text-red-700 hover:bg-red-50"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="font-bold text-gray-900 text-lg">
                {editing.id ? 'Düzenle' : 'Yeni'}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditing(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); save(editing) }}
              className="p-6 space-y-4"
            >
              <div className="grid grid-cols-12 gap-3">
                {fields.map((f) => (
                  <FieldRender
                    key={f.key}
                    field={f}
                    value={editing[f.key]}
                    onChange={(v) => setEditing({ ...editing, [f.key]: v })}
                  />
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditing(null) }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 shadow-sm"
                >
                  <Save className="w-4 h-4" /> Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function FieldRender({
  field, value, onChange,
}: { field: FieldDef; value: any; onChange: (v: any) => void }) {
  const cols = field.cols ?? 12
  const inputBase =
    'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400'

  return (
    <div className={`col-span-12 ${cols < 12 ? `md:col-span-${cols}` : ''}`}>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
        {field.label}{field.required && ' *'}
      </label>

      {field.type === 'text' && (
        <input
          required={field.required}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputBase}
          placeholder={field.placeholder}
        />
      )}

      {field.type === 'number' && (
        <input
          type="number"
          required={field.required}
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className={inputBase}
        />
      )}

      {field.type === 'textarea' && (
        <textarea
          required={field.required}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          rows={field.rows ?? 3}
          className={`${inputBase} resize-y`}
          placeholder={field.placeholder}
        />
      )}

      {field.type === 'date' && (
        <input
          type="date"
          required={field.required}
          value={value ? new Date(value).toISOString().slice(0, 10) : ''}
          onChange={(e) => onChange(new Date(e.target.value).toISOString())}
          className={inputBase}
        />
      )}

      {field.type === 'select' && (
        <select
          required={field.required}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputBase}
        >
          <option value="">Seç…</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )}

      {field.type === 'color' && (
        <div className="flex gap-2">
          <input
            type="color"
            value={value ?? '#714B67'}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
          />
          <input
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputBase} flex-1 text-xs font-mono`}
          />
        </div>
      )}

      {field.type === 'checkbox' && (
        <label className="flex items-center gap-2 cursor-pointer pt-2">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 rounded text-purple-600"
          />
          <span className="text-sm text-gray-700">{field.placeholder ?? 'Aktif'}</span>
        </label>
      )}

      {field.type === 'json' && (
        <textarea
          required={field.required}
          value={typeof value === 'string' ? value : JSON.stringify(value ?? [], null, 2)}
          onChange={(e) => {
            try {
              onChange(JSON.parse(e.target.value))
            } catch {
              onChange(e.target.value)
            }
          }}
          rows={field.rows ?? 5}
          className={`${inputBase} font-mono text-xs resize-y`}
          placeholder={field.placeholder ?? '[]'}
        />
      )}
    </div>
  )
}
