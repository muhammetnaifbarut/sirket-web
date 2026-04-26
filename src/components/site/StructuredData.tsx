interface StructuredDataProps {
  settings: Record<string, string>
}

export default function StructuredData({ settings }: StructuredDataProps) {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const name = settings.site_name || 'kooza'

  const sameAs = [
    settings.social_linkedin,
    settings.social_twitter,
    settings.social_facebook,
    settings.social_instagram,
    settings.social_youtube,
  ].filter(Boolean)

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${base}#organization`,
    name,
    url: base,
    logo: settings.site_logo ? `${base}${settings.site_logo}` : `${base}/logo.png`,
    description:
      settings.site_description ||
      'Kurumsal yazılım ve dijital dönüşüm danışmanlığı ile işletmenizi geleceğe taşıyoruz.',
    ...(settings.site_phone && {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: settings.site_phone,
        contactType: 'customer service',
        email: settings.site_email,
        areaServed: 'TR',
        availableLanguage: ['Turkish', 'English'],
      },
    }),
    ...(settings.site_address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: settings.site_address,
        addressCountry: 'TR',
      },
    }),
    ...(sameAs.length > 0 && { sameAs }),
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${base}#website`,
    url: base,
    name,
    publisher: { '@id': `${base}#organization` },
    inLanguage: 'tr-TR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
