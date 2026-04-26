import prisma from '@/lib/db'
import GenericListAdmin from '@/components/admin/GenericListAdmin'

export const metadata = { title: 'Vaka Çalışmaları' }

export default async function Page() {
  const items = await prisma.caseStudy.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Vaka Çalışmaları</h1>
        <p className="text-gray-500 text-sm mt-1">Müşteri başarı hikayeleri — /vaka-calismalari sayfasında görünür.</p>
      </div>
      <GenericListAdmin
        apiPath="/api/case-studies"
        initialItems={items}
        rowTitle={(i) => i.company}
        rowSubtitle={(i) => `${i.sector} · ${i.timeframe} · ${i.person}`}
        emptyTitle="Henüz vaka çalışması yok"
        newItemDefaults={{
          company: '', slug: '', sector: '', sectorColor: 'bg-purple-50 text-purple-700 border-purple-100',
          challenge: '', solution: '', quote: '', person: '', role: '', timeframe: '',
          results: [], order: 1, isActive: true,
        }}
        fields={[
          { key: 'company', label: 'Şirket', type: 'text', required: true, cols: 6 },
          { key: 'slug', label: 'Slug', type: 'text', required: true, cols: 6 },
          { key: 'sector', label: 'Sektör', type: 'text', required: true, cols: 6 },
          { key: 'timeframe', label: 'Süre (örn. 6 ay)', type: 'text', cols: 6 },
          { key: 'sectorColor', label: 'Sektör Etiket Stili (Tailwind)', type: 'text' },
          { key: 'challenge', label: 'Sorun', type: 'textarea', rows: 3, required: true },
          { key: 'solution', label: 'Çözüm', type: 'textarea', rows: 3, required: true },
          { key: 'quote', label: 'Müşteri Yorumu', type: 'textarea', rows: 2, required: true },
          { key: 'person', label: 'Kişi', type: 'text', cols: 6, required: true },
          { key: 'role', label: 'Pozisyon', type: 'text', cols: 6, required: true },
          { key: 'results', label: 'Sonuçlar (JSON: [{icon,label,from,to}])', type: 'json', rows: 6, required: true },
          { key: 'order', label: 'Sıra', type: 'number', cols: 6 },
          { key: 'isActive', label: 'Aktif', type: 'checkbox', cols: 6, placeholder: 'Yayında' },
        ]}
      />
    </div>
  )
}
