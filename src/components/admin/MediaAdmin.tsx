'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function MediaAdmin({ media }: { media: any[] }) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'uploads')

        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        if (!res.ok) throw new Error(`${file.name} yüklenemedi`)
      }
      toast.success(`${files.length} dosya yüklendi`)
      router.refresh()
    } catch (e: any) {
      toast.error(e.message || 'Yükleme hatası')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('URL kopyalandı')
  }

  return (
    <div className="space-y-4">
      {/* Upload zone */}
      <div
        className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
        onClick={() => fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
        <div className="text-4xl mb-3">{uploading ? '⏳' : '📁'}</div>
        <p className="font-medium text-gray-700">
          {uploading ? 'Yükleniyor...' : 'Dosyaları buraya sürükleyin veya tıklayın'}
        </p>
        <p className="text-sm text-gray-400 mt-1">JPG, PNG, GIF, WebP (max 10MB)</p>
      </div>

      {/* Media grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {media.map((item) => (
          <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            {item.mimeType.startsWith('image/') ? (
              <Image src={item.url} alt={item.alt || item.filename} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-2xl">📄</div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => copyUrl(window.location.origin + item.url)}
                className="bg-white text-gray-900 text-xs px-2 py-1 rounded font-medium"
              >
                URL Kopyala
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs truncate">{item.filename}</p>
            </div>
          </div>
        ))}
        {media.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            Henüz dosya yüklenmedi
          </div>
        )}
      </div>
    </div>
  )
}
