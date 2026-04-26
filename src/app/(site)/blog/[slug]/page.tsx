import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/db'
import { formatDate } from '@/lib/utils'
import ReadingProgress from '@/components/site/ReadingProgress'
import { ArrowLeft, Calendar, Eye, Share2, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } })
  if (!post) return {}
  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt || '',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

// Roughly: words / 200 wpm
function readingTime(content: string | null): number {
  if (!content) return 1
  const text = content.replace(/<[^>]*>/g, '')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, status: 'PUBLISHED' },
    include: { category: true },
  })

  if (!post) notFound()

  // Increment views (fire-and-forget)
  prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } }).catch(() => {})

  // Related posts: same category, exclude current, latest 3
  const related = post.categoryId
    ? await prisma.blogPost.findMany({
        where: { status: 'PUBLISHED', categoryId: post.categoryId, id: { not: post.id } },
        orderBy: { publishedAt: 'desc' },
        take: 3,
        include: { category: true },
      })
    : []

  const minutes = readingTime(post.content)

  return (
    <div className="bg-white">
      <ReadingProgress />

      {/* Hero */}
      <section className="bg-white pt-12 pb-8 lg:pt-16 lg:pb-10 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Tüm yazılar
          </Link>

          {post.category && (
            <Link
              href="/blog"
              className="inline-block px-3 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold mb-4 border border-purple-100"
            >
              {post.category.name}
            </Link>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {minutes} dk okuma
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              {post.views.toLocaleString('tr-TR')} okuma
            </span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-8">
          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-8 lg:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-purple-700 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:list-disc prose-li:text-gray-700
              prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
              prose-code:text-purple-700 prose-code:bg-purple-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
              prose-img:rounded-xl prose-img:border prose-img:border-gray-200"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
              <Share2 className="w-4 h-4" />
              Paylaş
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://kooza.com.tr/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium transition-colors"
              >
                𝕏 Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://kooza.com.tr/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium transition-colors"
              >
                💼 LinkedIn
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — https://kooza.com.tr/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
              Bunlar da ilgini çekebilir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-cardHover transition-all duration-300 overflow-hidden hover:-translate-y-1 p-6"
                >
                  {p.category && (
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold mb-3 border border-purple-100">
                      {p.category.name}
                    </span>
                  )}
                  <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-purple-700 transition-colors text-base leading-snug mb-2">
                    {p.title}
                  </h3>
                  {p.excerpt && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                      {p.excerpt}
                    </p>
                  )}
                  {p.publishedAt && (
                    <span className="text-xs text-gray-400">{formatDate(p.publishedAt)}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-purple-600 to-purple-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
            Bu yazıyı beğendin mi?
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            kooza ile işletmenin tüm yazılımlarını tek platformda topla.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-purple-700 font-bold hover:bg-purple-50 transition-all hover:-translate-y-0.5 shadow-elevated"
          >
            Ücretsiz Başla
          </Link>
        </div>
      </section>
    </div>
  )
}
