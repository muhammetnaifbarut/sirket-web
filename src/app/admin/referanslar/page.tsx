import prisma from '@/lib/db'
import TestimonialsAdmin from '@/components/admin/TestimonialsAdmin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Referanslar' }

export default async function ReferanslarPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Referanslar</h1>
        <p className="text-gray-500 text-sm mt-1">Müşteri görüşlerini yönetin</p>
      </div>
      <TestimonialsAdmin testimonials={testimonials} />
    </div>
  )
}
