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

  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${base}#software`,
    name: 'kooza',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description:
      'Restoran, klinik, market, eğitim, güzellik salonu, e-ticaret için randevu, kasa, stok, CRM ve muhasebe — tek platformda Türkçe SaaS.',
    offers: [
      {
        '@type': 'Offer',
        name: 'Starter',
        price: '499',
        priceCurrency: 'TRY',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '499', priceCurrency: 'TRY', unitText: 'MONTH' },
      },
      {
        '@type': 'Offer',
        name: 'Professional',
        price: '999',
        priceCurrency: 'TRY',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '999', priceCurrency: 'TRY', unitText: 'MONTH' },
      },
      {
        '@type': 'Offer',
        name: 'Enterprise',
        price: '2999',
        priceCurrency: 'TRY',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '2999', priceCurrency: 'TRY', unitText: 'MONTH' },
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
    publisher: { '@id': `${base}#organization` },
    inLanguage: 'tr-TR',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'kooza ücretsiz mi denenebiliyor?',
        acceptedAnswer: { '@type': 'Answer', text: 'Evet — 14 günlük ücretsiz deneme, kredi kartı bilgisi istemiyoruz, anlık iptal edebilirsiniz.' },
      },
      {
        '@type': 'Question',
        name: 'Hangi sektörlere uygun?',
        acceptedAnswer: { '@type': 'Answer', text: 'Klinik, restoran, market, eğitim, güzellik salonu, e-ticaret, diş hekimi, veteriner, İK ve daha fazlası — tüm sektörlerel paket mevcut.' },
      },
      {
        '@type': 'Question',
        name: 'Aylık fiyatı nedir?',
        acceptedAnswer: { '@type': 'Answer', text: 'Starter ₺499/ay, Professional ₺999/ay (en popüler), Enterprise ₺2999/ay. Yıllık ödemede %20 indirim.' },
      },
      {
        '@type': 'Question',
        name: 'KVKK uyumlu mu?',
        acceptedAnswer: { '@type': 'Answer', text: 'Evet — KVKK uyumlu altyapı, AES-256 şifreleme, ISO 27001 sertifikalı sunucular Türkiye\'de.' },
      },
      {
        '@type': 'Question',
        name: 'e-Fatura entegrasyonu var mı?',
        acceptedAnswer: { '@type': 'Answer', text: 'GİB e-Fatura, e-Arşiv ve e-İrsaliye entegrasyonu Pro ve Enterprise paketlerde dahil.' },
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
