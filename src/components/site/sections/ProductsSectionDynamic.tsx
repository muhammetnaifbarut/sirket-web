'use client'

import dynamic from 'next/dynamic'

const ProductsSection = dynamic(() => import('./ProductsSection'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '40vh' }} />,
})

export default ProductsSection
