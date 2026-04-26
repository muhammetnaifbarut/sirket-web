'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import EmptyState from '@/components/site/EmptyState'
import { Search } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  publishedAt: Date | null
  category: { id: string; name: string; slug: string } | null
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function BlogList({
  posts,
  categories,
}: {
  posts: Post[]
  categories: Category[]
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (activeCategory && p.category?.id !== activeCategory) return false
      if (search) {
        const q = search.toLowerCase()
        const haystack = `${p.title} ${p.excerpt ?? ''}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [posts, activeCategory, search])

  return (
    <>
      {/* Search + filter bar */}
      <div className="mb-12 space-y-5">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Yazılarda ara..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all min-h-[44px]"
          />
        </div>

        {/* Category pills */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors min-h-[40px] ${
                activeCategory === null
                  ? 'bg-purple-600 text-white shadow-button'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-700'
              }`}
            >
              Tümü
              <span className="ml-1.5 text-[10px] opacity-70">{posts.length}</span>
            </button>
            {categories.map((cat) => {
              const count = posts.filter((p) => p.category?.id === cat.id).length
              if (count === 0) return null
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors min-h-[40px] ${
                    activeCategory === cat.id
                      ? 'bg-purple-600 text-white shadow-button'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-700'
                  }`}
                >
                  {cat.name}
                  <span className="ml-1.5 text-[10px] opacity-70">{count}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Posts grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="file-text"
          title={search ? `"${search}" için sonuç bulunamadı` : 'Henüz yazı yok'}
          description={search ? 'Farklı kelimelerle aramayı dene veya filtreyi temizle.' : 'Yakında ilk içerikler yayınlanacak.'}
          cta={search ? { label: 'Filtreyi temizle', href: '/blog' } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-cardHover transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              {post.coverImage ? (
                <div className="h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-purple-50 to-purple-100/30 flex items-center justify-center border-b border-gray-100">
                  <svg className="w-12 h-12 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}

              <div className="p-6">
                {post.category && (
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold mb-3 border border-purple-100">
                    {post.category.name}
                  </span>
                )}
                <h2 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors text-lg leading-snug">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
                  {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                  <span className="text-purple-700 font-semibold group-hover:underline">
                    Devamını Oku →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
