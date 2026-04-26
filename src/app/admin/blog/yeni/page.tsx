import prisma from '@/lib/db'
import BlogForm from '@/components/admin/BlogForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Yeni Blog Yazısı' }

export default async function YeniBlogPage() {
  const categories = await prisma.blogCategory.findMany()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Blog Yazısı</h1>
        <p className="text-gray-500 text-sm mt-1">İçerik oluşturun</p>
      </div>
      <BlogForm categories={categories} />
    </div>
  )
}
