import prisma from '@/lib/db'
import BlogCategoriesAdmin from '@/components/admin/BlogCategoriesAdmin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Blog Kategorileri' }

export default async function BlogKategorilerPage() {
  const categories = await prisma.blogCategory.findMany({ orderBy: { name: 'asc' } })
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Blog Kategorileri</h1>
      <BlogCategoriesAdmin categories={categories} />
    </div>
  )
}
