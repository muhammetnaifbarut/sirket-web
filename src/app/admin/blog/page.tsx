import prisma from '@/lib/db'
import Link from 'next/link'
import BlogAdmin from '@/components/admin/BlogAdmin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Blog' }

export default async function AdminBlogPage() {
  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.blogCategory.findMany(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} yazı</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/blog/kategoriler" className="btn-outline text-sm py-2">
            Kategoriler
          </Link>
          <Link href="/admin/blog/yeni" className="btn-primary text-sm py-2">
            + Yeni Yazı
          </Link>
        </div>
      </div>
      <BlogAdmin posts={posts} />
    </div>
  )
}
