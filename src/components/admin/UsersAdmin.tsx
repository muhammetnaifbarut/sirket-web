'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/utils'

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  SUPER_ADMIN: { label: 'Super Admin', color: 'bg-purple-100 text-purple-700' },
  ADMIN: { label: 'Admin', color: 'bg-blue-100 text-blue-700' },
  EDITOR: { label: 'Editör', color: 'bg-green-100 text-green-700' },
  VIEWER: { label: 'Görüntüleyici', color: 'bg-gray-100 text-gray-600' },
}

export default function UsersAdmin({ users }: { users: any[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Hata')
      }
      toast.success('Kullanıcı oluşturuldu')
      setShowForm(false)
      reset()
      router.refresh()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'İptal' : '+ Kullanıcı Ekle'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="card p-6">
          <h2 className="font-bold text-gray-900 mb-4">Yeni Kullanıcı</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><label className="form-label">Ad Soyad</label><input {...register('name')} className="form-input" /></div>
            <div><label className="form-label">E-posta *</label><input {...register('email', { required: true })} type="email" className="form-input" /></div>
            <div><label className="form-label">Şifre *</label><input {...register('password', { required: true })} type="password" className="form-input" /></div>
            <div>
              <label className="form-label">Rol</label>
              <select {...register('role')} className="form-input">
                <option value="EDITOR">Editör</option>
                <option value="ADMIN">Admin</option>
                <option value="VIEWER">Görüntüleyici</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => { setShowForm(false); reset() }} className="btn-outline">İptal</button>
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? 'Oluşturuluyor...' : 'Oluştur'}
            </button>
          </div>
        </form>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Kullanıcı</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Rol</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Kayıt Tarihi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {u.name?.charAt(0) || u.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{u.name || '-'}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`badge ${ROLE_LABELS[u.role]?.color || 'bg-gray-100 text-gray-600'}`}>
                    {ROLE_LABELS[u.role]?.label || u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(u.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
