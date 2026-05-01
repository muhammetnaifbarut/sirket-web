import Link from 'next/link'
import Image from 'next/image'
import KoozaLogo from '@/components/site/KoozaLogo'
import NewsletterSignup from '@/components/site/NewsletterSignup'
import StatusBadge from '@/components/site/StatusBadge'
import prisma from '@/lib/db'

interface FooterProps {
  settings: Record<string, string>
}

export default async function Footer({ settings }: FooterProps) {
  const siteName = settings.site_name || 'kooza'
  const logo = settings.site_logo
  const year = new Date().getFullYear()

  // Sectors as a compact text strip (not a module on the page)
  const sectors = await prisma.sector
    .findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: { name: true, slug: true },
    })
    .catch(() => [])

  // Sector solutions for footer column
  const solutions = await prisma.sectorSolution
    .findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: { name: true, slug: true },
      take: 6,
    })
    .catch(() => [])

  const socialLinks = [
    {
      href: settings.social_linkedin,
      label: 'LinkedIn',
      color: 'hover:bg-blue-700',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      href: settings.social_twitter,
      label: 'Twitter/X',
      color: 'hover:bg-black',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      href: settings.social_facebook,
      label: 'Facebook',
      color: 'hover:bg-blue-600',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      href: settings.social_instagram,
      label: 'Instagram',
      color: 'hover:bg-pink-600',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      href: settings.social_youtube,
      label: 'YouTube',
      color: 'hover:bg-red-600',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ].filter((s) => s.href)

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Top gradient bar */}
      <div className="h-px bg-gradient-to-r from-blue-600/0 via-blue-500/50 to-purple-500/0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              {logo ? (
                <div className="bg-white/10 rounded-xl px-3 py-2">
                  <Image src={logo} alt={siteName} width={180} height={52} className="h-11 w-auto object-contain" />
                </div>
              ) : (
                <>
                  <KoozaLogo className="h-10" variant="mark" color="#ffffff" accentColor="#875A7B" />
                  <span className="text-white font-black text-lg">{siteName}</span>
                </>
              )}
            </Link>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              {settings.site_description || 'Kurumsal yazılım ve dijital dönüşüm danışmanlığı ile işletmenizi geleceğe taşıyoruz.'}
            </p>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center ${s.color} transition-colors duration-200`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Sector solutions */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Sektörel Çözümler</h4>
            <ul className="space-y-3">
              {(solutions.length > 0 ? solutions : [
                { name: 'Klinik & Sağlık', slug: 'klinik' },
                { name: 'Restoran & Kafe', slug: 'restoran' },
                { name: 'Market & Perakende', slug: 'market' },
                { name: 'Eğitim & Kurs', slug: 'egitim' },
                { name: 'İnsan Kaynakları', slug: 'ik' },
              ]).map((s) => (
                <li key={s.slug}>
                  <Link href={`/cozumler/${s.slug}`} className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-purple-500 transition-colors" />
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cozumler" className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 group font-semibold">
                  <span className="w-1 h-1 rounded-full bg-purple-500" />
                  Tüm Çözümler →
                </Link>
              </li>
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Şirket</h4>
            <ul className="space-y-3">
              {[
                { label: 'Hakkımızda', href: '/hakkimizda' },
                { label: 'Vaka Çalışmaları', href: '/vaka-calismalari' },
                { label: 'Karşılaştırma', href: '/karsilastir' },
                { label: 'Marka Kılavuzu', href: '/marka' },
                { label: 'Danışmanlık', href: '/danismanlik' },
              ].map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-purple-500 transition-colors" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kaynaklar */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Kaynaklar</h4>
            <ul className="space-y-3">
              {[
                { label: 'Blog', href: '/blog' },
                { label: '📘 Sektörel Rehber', href: '/dijital-rehber' },
                { label: '🎯 Olgunluk Testi', href: '/dijital-olgunluk-testi' },
                { label: '💰 ROI Hesaplama', href: '/roi-hesaplama' },
                { label: '🆘 Yardım Merkezi', href: '/yardim' },
                { label: 'Sıkça Sorulanlar', href: '/sss' },
                { label: 'Entegrasyonlar', href: '/entegrasyonlar' },
                { label: 'Güvenlik & KVKK', href: '/guvenlik' },
              ].map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-purple-500 transition-colors" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">İletişim</h4>
            <ul className="space-y-4">
              {settings.site_phone && (
                <li>
                  <a href={`tel:${settings.site_phone}`} className="flex items-start gap-3 text-sm text-gray-500 hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-purple-600 flex items-center justify-center shrink-0 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="pt-1.5">{settings.site_phone}</span>
                  </a>
                </li>
              )}
              {settings.site_email && (
                <li>
                  <a href={`mailto:${settings.site_email}`} className="flex items-start gap-3 text-sm text-gray-500 hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-purple-600 flex items-center justify-center shrink-0 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="pt-1.5">{settings.site_email}</span>
                  </a>
                </li>
              )}
              {settings.site_address && (
                <li className="flex items-start gap-3 text-sm text-gray-500">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="pt-1.5 leading-relaxed">{settings.site_address}</span>
                </li>
              )}

              {/* Demo CTA */}
              <li className="pt-2">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-purple-500/30"
                >
                  Demo Talep Et
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter + Status */}
        <div className="border-t border-gray-800/60 pt-10 mb-10 grid lg:grid-cols-2 gap-6 items-center">
          <div className="lg:max-w-md">
            <NewsletterSignup />
          </div>
          <div className="flex items-center gap-4 lg:justify-end flex-wrap">
            <StatusBadge />
            <a
              href="https://kooza.tr"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/60 border border-gray-700 text-gray-400 text-xs font-semibold hover:bg-gray-800"
            >
              🌐 kooza.tr
            </a>
          </div>
        </div>

        {/* Sectors strip — compact text list, not a card module */}
        {sectors.length > 0 && (
          <div className="border-t border-gray-800/60 pt-8 mb-8">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              Hizmet Verdiğimiz Sektörler
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {sectors.map((s) => (
                <Link
                  key={s.slug}
                  href={`/sektorler/${s.slug}`}
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div className="border-t border-gray-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            {settings.footer_text || `© ${year} ${siteName}. Tüm hakları saklıdır.`}
          </p>
          <div className="flex items-center gap-x-5 gap-y-2 flex-wrap justify-center">
            <Link href="/kvkk" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
              KVKK
            </Link>
            <Link href="/gizlilik-politikasi" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
              Gizlilik
            </Link>
            <Link href="/uyelik-sozlesmesi" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
              Üyelik Sözleşmesi
            </Link>
            <Link href="/mesafeli-satis" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
              Mesafeli Satış
            </Link>
            <Link href="/cerez-politikasi" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
              Çerez
            </Link>
            <Link href="/kullanim-kosullari" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
              Kullanım Koşulları
            </Link>
            <Link href="/iletisim" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
