import prisma from '@/lib/db'
import BlogList from '@/components/site/BlogList'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dijital dönüşüm, yazılım ve danışmanlık hakkında güncel yazılar',
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
    }),
    prisma.blogCategory.findMany(),
  ])

  return (
    <div className="bg-white">
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
            Blog
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]">
            Bilgi, deneyim ve fikirler.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dijital dönüşüm, yazılım ve danışmanlık üzerine güncel yazılar.
          </p>
        </div>
      </section>

      <section className="bg-white py-8 lg:py-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogList
            posts={posts.map((p) => ({
              id: p.id,
              title: p.title,
              slug: p.slug,
              excerpt: p.excerpt,
              coverImage: p.coverImage,
              publishedAt: p.publishedAt,
              category: p.category ? { id: p.category.id, name: p.category.name, slug: p.category.slug } : null,
            }))}
            categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
          />
        </div>
      </section>
    </div>
  )
}
