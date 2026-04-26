import { notFound } from 'next/navigation'
import prisma from '@/lib/db'
import BlogForm from '@/components/admin/BlogForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Blog Düzenle' }

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id: params.id }, include: { category: true } }),
    prisma.blogCategory.findMany(),
  ])
  if (!post) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Blog Yazısı Düzenle</h1>
        <p className="text-gray-500 text-sm mt-1 line-clamp-1">{post.title}</p>
      </div>
      <BlogForm post={post} categories={categories} />
    </div>
  )
}
