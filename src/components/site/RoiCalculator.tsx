'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Clock, DollarSign, Sparkles, ArrowRight, Users } from 'lucide-react'

interface SectorPreset {
  slug: string
  name: string
  defaultEmployees: number
  defaultMonthlyRevenue: number
  description: string
  // Time saved per employee per month (hours)
  timeSavedPerEmployee: number
  // Stock loss reduction (%)
  stockLossReduction: number
  // Customer retention boost (%)
  retentionBoost: number
}

const SECTORS: SectorPreset[] = [
  { slug: 'klinik',   name: 'Klinik & Sağlık',     defaultEmployees: 8,  defaultMonthlyRevenue: 250000, description: 'Randevu, hasta dosyası, e-Reçete, MHRS', timeSavedPerEmployee: 22, stockLossReduction: 0,  retentionBoost: 18 },
  { slug: 'restoran', name: 'Restoran & Kafe',     defaultEmployees: 12, defaultMonthlyRevenue: 350000, description: 'Adisyon, kasa, mutfak ekranı, kurye',     timeSavedPerEmployee: 18, stockLossReduction: 25, retentionBoost: 15 },
  { slug: 'market',   name: 'Market & Perakende',  defaultEmployees: 6,  defaultMonthlyRevenue: 480000, description: 'Barkod, kasa, stok, sadakat kartı',       timeSavedPerEmployee: 16, stockLossReduction: 35, retentionBoost: 12 },
  { slug: 'egitim',   name: 'Eğitim & Kurs',       defaultEmployees: 10, defaultMonthlyRevenue: 280000, description: 'Öğrenci kayıt, sınav, taksit takibi',     timeSavedPerEmployee: 20, stockLossReduction: 0,  retentionBoost: 22 },
  { slug: 'ik',       name: 'İnsan Kaynakları',    defaultEmployees: 25, defaultMonthlyRevenue: 600000, description: 'Bordro, izin, mesai, performans',         timeSavedPerEmployee: 12, stockLossReduction: 0,  retentionBoost: 0  },
  { slug: 'genel',    name: 'Diğer / Genel',       defaultEmployees: 10, defaultMonthlyRevenue: 300000, description: 'Genel KOBİ otomasyon paketi',             timeSavedPerEmployee: 15, stockLossReduction: 15, retentionBoost: 10 },
]

const HOURLY_COST_TRY = 180  // ortalama TL/saat (KOBİ ortalaması, brüt + işveren)

function formatTRY(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n)
}

export default function RoiCalculator() {
  const [sectorSlug, setSectorSlug] = useState<string>('klinik')
  const sector = SECTORS.find((s) => s.slug === sectorSlug)!
  const [employees, setEmployees] = useState<number>(sector.defaultEmployees)
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(sector.defaultMonthlyRevenue)
  const [hourlyCost, setHourlyCost] = useState<number>(HOURLY_COST_TRY)

  const result = useMemo(() => {
    // Time saved: hours/emp/month × emp × cost = TL/month
    const monthlyTimeValue = sector.timeSavedPerEmployee * employees * hourlyCost
    // Stock loss reduction: 5% of revenue is typical loss → reduce by stockLossReduction%
    const baseLoss = monthlyRevenue * 0.05
    const stockSavings = baseLoss * (sector.stockLossReduction / 100)
    // Retention boost: extra revenue from existing customers staying
    const retentionRevenue = monthlyRevenue * (sector.retentionBoost / 100) * 0.3 // %30 dönüşüm
    const totalMonthly = monthlyTimeValue + stockSavings + retentionRevenue
    const totalYearly = totalMonthly * 12
    const koozaCost = 4500 + (employees * 80) // dummy estimate: aylık paket
    const koozaYearly = koozaCost * 12
    const netYearly = totalYearly - koozaYearly
    const roi = koozaYearly > 0 ? (netYearly / koozaYearly) * 100 : 0
    const paybackMonths = totalMonthly > 0 ? Math.ceil(koozaCost / totalMonthly * 1.2) : 12
    return {
      monthlyTimeValue,
      stockSavings,
      retentionRevenue,
      totalMonthly,
      totalYearly,
      koozaCost,
      koozaYearly,
      netYearly,
      roi,
      paybackMonths,
      hoursSaved: sector.timeSavedPerEmployee * employees,
    }
  }, [sector, employees, monthlyRevenue, hourlyCost])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-6">
          <Calculator className="w-4 h-4" />
          ROI Hesaplayıcı
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-[1.1]">
          kooza kurarsanız<br />
          <span className="text-purple-700">ne kazanırsınız?</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sektörünüze ve şirket büyüklüğünüze göre 30 saniyede tahmini yıllık tasarruf ve geri ödeme süresini hesaplayın.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
        {/* INPUTS */}
        <div className="space-y-6">
          {/* Sector */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">1. Sektörünüz</label>
            <div className="grid grid-cols-2 gap-2">
              {SECTORS.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => {
                    setSectorSlug(s.slug)
                    setEmployees(s.defaultEmployees)
                    setMonthlyRevenue(s.defaultMonthlyRevenue)
                  }}
                  className={`px-4 py-3 rounded-xl border-2 text-left transition ${
                    sectorSlug === s.slug
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-100 hover:border-purple-200 bg-white'
                  }`}
                >
                  <div className="text-sm font-semibold text-gray-900">{s.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{s.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Employees */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              2. Çalışan sayısı: <span className="text-purple-700">{employees}</span>
            </label>
            <input
              type="range"
              min={1}
              max={200}
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1</span>
              <span>50</span>
              <span>100</span>
              <span>200+</span>
            </div>
          </div>

          {/* Revenue */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              3. Aylık ciro: <span className="text-purple-700">{formatTRY(monthlyRevenue)}</span>
            </label>
            <input
              type="range"
              min={50000}
              max={5000000}
              step={50000}
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>50K</span>
              <span>1M</span>
              <span>5M+</span>
            </div>
          </div>

          {/* Hourly cost */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              4. Saatlik ortalama personel maliyeti: <span className="text-purple-700">{formatTRY(hourlyCost)}/saat</span>
            </label>
            <input
              type="range"
              min={80}
              max={500}
              step={10}
              value={hourlyCost}
              onChange={(e) => setHourlyCost(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="text-xs text-gray-500 mt-1">Brüt + işveren payı dahil ortalama</div>
          </div>
        </div>

        {/* RESULT */}
        <div className="space-y-4">
          {/* Big number */}
          <motion.div
            key={result.totalYearly}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 text-white p-8 lg:p-10"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm font-semibold uppercase mb-3">
              <Sparkles className="w-4 h-4" />
              Yıllık net kazanç
            </div>
            <div className="text-5xl lg:text-6xl font-bold mb-2 leading-none tracking-tight">
              {formatTRY(result.netYearly)}
            </div>
            <div className="text-white/80 text-sm">
              Geri ödeme: <strong className="text-white">~{result.paybackMonths} ay</strong> · ROI: <strong className="text-white">%{Math.round(result.roi)}</strong>
            </div>
          </motion.div>

          {/* Breakdown */}
          <div className="rounded-2xl bg-white border border-gray-100 p-6 space-y-4">
            <div className="text-sm font-bold text-gray-900 mb-3">Tasarruf kalemleri (aylık)</div>
            <div className="space-y-3">
              <Row
                icon={Clock}
                label="Personel zaman tasarrufu"
                detail={`${result.hoursSaved} saat / ay`}
                value={formatTRY(result.monthlyTimeValue)}
                color="text-blue-600"
              />
              {result.stockSavings > 0 && (
                <Row
                  icon={TrendingUp}
                  label="Stok kaybı azalması"
                  detail={`%${sector.stockLossReduction} fire azalması`}
                  value={formatTRY(result.stockSavings)}
                  color="text-green-600"
                />
              )}
              {result.retentionRevenue > 0 && (
                <Row
                  icon={Users}
                  label="Ek müşteri tutma geliri"
                  detail={`%${sector.retentionBoost} retention artışı`}
                  value={formatTRY(result.retentionRevenue)}
                  color="text-pink-600"
                />
              )}
              <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm font-semibold text-gray-900">Toplam aylık tasarruf</div>
                <div className="text-xl font-bold text-purple-700">{formatTRY(result.totalMonthly)}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5 flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <strong>kooza tahmini yıllık maliyet:</strong> {formatTRY(result.koozaYearly)} <span className="text-amber-700">(aylık ~{formatTRY(result.koozaCost)})</span>.
              Kesin teklif için <a href="/iletisim" className="underline font-semibold">bize ulaşın</a>.
            </div>
          </div>

          <a
            href="/iletisim?tip=roi-teklif"
            className="block text-center px-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-button transition"
          >
            Bu Senaryo İçin Ücretsiz Teklif Al
            <ArrowRight className="w-4 h-4 inline ml-2" />
          </a>
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-gray-400 max-w-2xl mx-auto">
        Hesaplama varsayımları: Ortalama {sector.timeSavedPerEmployee} saat/personel/ay zaman tasarrufu, %{sector.stockLossReduction} stok kayıp azalması ve %{sector.retentionBoost} müşteri tutma artışı (kooza müşteri ortalaması). Gerçek sonuçlar şirket büyüklüğüne ve süreçlere göre değişebilir.
      </div>
    </div>
  )
}

function Row({
  icon: Icon, label, detail, value, color,
}: {
  icon: React.ComponentType<any>; label: string; detail: string; value: string; color: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`shrink-0 w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-900">{label}</div>
        <div className="text-xs text-gray-500">{detail}</div>
      </div>
      <div className="text-sm font-bold text-gray-900">{value}</div>
    </div>
  )
}
