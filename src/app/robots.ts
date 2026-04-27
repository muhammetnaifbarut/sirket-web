import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/login', '/register'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
        crawlDelay: 1,
      },
      {
        userAgent: ['GPTBot', 'CCBot', 'ChatGPT-User', 'Google-Extended', 'anthropic-ai', 'Claude-Web', 'PerplexityBot'],
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
