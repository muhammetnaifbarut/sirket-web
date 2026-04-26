import prisma from '@/lib/db'
import GenericListAdmin from '@/components/admin/GenericListAdmin'

export const metadata = { title: 'Sektör Çözümleri' }

export default async function Page() {
  const items = await prisma.sectorSolution.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Sektör Çözümleri</h1>
        <p className="text-gray-500 text-sm mt-1">
          /cozumler/[slug] altında yayınlanan sektörel landing sayfaları. SEO + lead toplama amaçlı.
        </p>
      </div>
      <GenericListAdmin
        apiPath="/api/sector-solutions"
        initialItems={items}
        rowTitle={(i) => i.name}
        rowSubtitle={(i) => `/cozumler/${i.slug} · ${i.tagline?.slice(0, 80) ?? ''}…`}
        emptyTitle="Henüz sektör çözümü yok"
        newItemDefaults={{
          slug: '', name: '', tagline: '',
          heroBadge: 'Sektörel Çözüm',
          heroTitle: '', heroSubtitle: '',
          icon: 'Building2', iconColor: '#714B67', bgColor: '#f7f2f5',
          problems: [], features: [], benefits: [], modules: [], faqs: [],
          ctaTitle: 'Hemen başlayın', ctaSubtitle: 'Ücretsiz keşif görüşmesi alın.',
          seoTitle: '', seoDescription: '',
          order: 99, isActive: true,
        }}
        fields={[
          { key: 'name', label: 'Sektör Adı', type: 'text', required: true, cols: 6 },
          { key: 'slug', label: 'URL Slug (örn. klinik)', type: 'text', required: true, cols: 6 },
          { key: 'tagline', label: 'Tek Cümle Açıklama', type: 'textarea', rows: 2, required: true },
          { key: 'heroBadge', label: 'Hero Rozet (örn. Sağlık Sektörü Çözümü)', type: 'text', cols: 6 },
          { key: 'icon', label: 'Lucide İkon (Stethoscope, ShoppingCart...)', type: 'text', cols: 6 },
          { key: 'iconColor', label: 'İkon Rengi', type: 'color', cols: 6 },
          { key: 'bgColor', label: 'Arka Plan Rengi', type: 'color', cols: 6 },
          { key: 'heroTitle', label: 'Hero Başlık (\\n ile satır kır)', type: 'textarea', rows: 2, required: true },
          { key: 'heroSubtitle', label: 'Hero Alt Metin', type: 'textarea', rows: 3, required: true },
          { key: 'problems', label: 'Problemler — JSON: [{title,description,icon}]', type: 'json', rows: 8, required: true },
          { key: 'features', label: 'Özellikler — JSON: [{title,description,icon}]', type: 'json', rows: 10, required: true },
          { key: 'benefits', label: 'Faydalar (sayısal) — JSON: [{label,value,description}]', type: 'json', rows: 6, required: true },
          { key: 'modules', label: 'Modüller — JSON: [{name,description}]', type: 'json', rows: 6, required: true },
          { key: 'faqs', label: 'SSS — JSON: [{question,answer}]', type: 'json', rows: 8, required: true },
          { key: 'ctaTitle', label: 'CTA Başlık', type: 'text', cols: 6 },
          { key: 'ctaSubtitle', label: 'CTA Alt Metin', type: 'textarea', rows: 2 },
          { key: 'seoTitle', label: 'SEO Başlık', type: 'text' },
          { key: 'seoDescription', label: 'SEO Açıklama', type: 'textarea', rows: 2 },
          { key: 'order', label: 'Sıra', type: 'number', cols: 6 },
          { key: 'isActive', label: 'Aktif', type: 'checkbox', cols: 6, placeholder: 'Yayında' },
        ]}
      />
    </div>
  )
}
