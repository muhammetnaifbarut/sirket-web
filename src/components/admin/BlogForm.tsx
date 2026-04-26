'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import RichTextEditor from './RichTextEditor'

export default function BlogForm({ post, categories }: { post?: any; categories: any[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const autoSlug = (title: string) =>
    title.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      excerpt: post?.excerpt || '',
      content: post?.content || '',
      coverImage: post?.coverImage || '',
      metaTitle: post?.metaTitle || '',
      metaDesc: post?.metaDesc || '',
      status: post?.status || 'DRAFT',
      featured: post?.featured || false,
      categoryId: post?.categoryId || '',
    },
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const url = post ? `/api/blog/${post.id}` : '/api/blog'
      const method = post ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast.success(post ? 'Yazı güncellendi' : 'Yazı oluşturuldu')
      router.push('/admin/blog')
    } catch {
      toast.error('Hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Content */}
        <div className="lg:col-span-2 space-y-4 card p-6">
          <div>
            <label className="form-label">Başlık *</label>
            <input
              {...register('title')}
              className="form-input text-lg font-medium"
              placeholder="Yazı başlığı..."
              onChange={e => {
                setValue('title', e.target.value)
                if (!post) setValue('slug', autoSlug(e.target.value))
              }}
            />
          </div>

          <div>
            <label className="form-label">Slug</label>
            <input {...register('slug')} className="form-input font-mono text-sm" />
          </div>

          <div>
            <label className="form-label">Özet</label>
            <textarea {...register('excerpt')} className="form-textarea" rows={3} placeholder="Kısa özet..." />
          </div>

          <div>
            <label className="form-label">İçerik</label>
            <RichTextEditor
              value={watch('content')}
              onChange={(html) => setValue('content', html)}
              placeholder="Yazınızı buraya yazın..."
            />
            <p className="text-xs text-gray-400 mt-1">
              Kalın, italik, hizalama (sola/ortaya/sağa/iki yana yasla), liste, başlık, görsel ve link ekleyebilirsiniz.
            </p>
          </div>

          {/* SEO */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-3">SEO Ayarları</h3>
            <div className="space-y-3">
              <div>
                <label className="form-label">SEO Başlık</label>
                <input {...register('metaTitle')} className="form-input" placeholder="Boş bırakırsanız yazı başlığı kullanılır" />
              </div>
              <div>
                <label className="form-label">Meta Açıklama</label>
                <textarea {...register('metaDesc')} className="form-textarea" rows={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-4">Yayın</h2>
            <div className="space-y-3">
              <div>
                <label className="form-label">Durum</label>
                <select {...register('status')} className="form-input">
                  <option value="DRAFT">Taslak</option>
                  <option value="PUBLISHED">Yayınla</option>
                  <option value="ARCHIVED">Arşiv</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input {...register('featured')} type="checkbox" id="featured" className="rounded" />
                <label htmlFor="featured" className="text-sm text-gray-700">Öne çıkar</label>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-4">Sınıflandırma</h2>
            <div className="space-y-3">
              <div>
                <label className="form-label">Kategori</label>
                <select {...register('categoryId')} className="form-input">
                  <option value="">Kategori seçin</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-4">Kapak Görseli</h2>
            <input {...register('coverImage')} className="form-input" placeholder="/uploads/image.jpg" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button type="button" onClick={() => router.back()} className="btn-outline">İptal</button>
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? 'Kaydediliyor...' : post ? 'Güncelle' : 'Oluştur'}
        </button>
      </div>
    </form>
  )
}
