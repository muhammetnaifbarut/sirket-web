import prisma from '@/lib/db'
import LeadsTable from '@/components/admin/LeadsTable'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Talepler' }

export default async function LeadsPage({ searchParams }: { searchParams: { status?: string; type?: string } }) {
  const leads = await prisma.lead.findMany({
    where: {
      ...(searchParams.status ? { status: searchParams.status as any } : {}),
      ...(searchParams.type ? { type: searchParams.type as any } : {}),
    },
    include: { product: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const stats = await prisma.lead.groupBy({
    by: ['status'],
    _count: true,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Talepler</h1>
          <p className="text-gray-500 text-sm mt-1">Demo ve iletişim talepleri</p>
        </div>
        <div className="text-sm text-gray-500">
          Toplam: <span className="font-semibold text-gray-900">{leads.length}</span>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Tümü', value: '' },
          { label: 'Yeni', value: 'NEW' },
          { label: 'İletişimde', value: 'CONTACTED' },
          { label: 'Nitelikli', value: 'QUALIFIED' },
          { label: 'Kazanıldı', value: 'WON' },
          { label: 'Kaybedildi', value: 'LOST' },
        ].map((f) => (
          <a
            key={f.value}
            href={`/admin/leads${f.value ? `?status=${f.value}` : ''}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              (searchParams.status || '') === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
            }`}
          >
            {f.label}
            <span className="ml-1.5 text-xs opacity-70">
              {stats.find(s => s.status === f.value)?._count || (f.value === '' ? leads.length : 0)}
            </span>
          </a>
        ))}
      </div>

      <LeadsTable leads={leads} />
    </div>
  )
}
