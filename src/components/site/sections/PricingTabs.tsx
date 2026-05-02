'use client'

import { useState } from 'react'

type Plan = { name: string; price: number; users: string; limit: string }
type Product = {
  id: string
  name: string
  emoji: string
  tagline: string
  plans: { baslangic: Plan; pro: Plan; kurumsal: Plan }
  highlights: string[]
  status: 'CANLI' | 'BETA'
}

const PRODUCTS: Product[] = [
  {
    id: 'randevu', name: 'Randevu', emoji: '📅', status: 'CANLI',
    tagline: 'Klinik, kuaför, fizyo, masaj — sektörel randevu sistemi',
    plans: {
      baslangic: { name: 'Başlangıç', price: 299, users: '1', limit: '100 randevu/ay' },
      pro: { name: 'Pro', price: 599, users: '5', limit: 'Sınırsız + 500 SMS' },
      kurumsal: { name: 'Kurumsal', price: 1299, users: '∞', limit: 'Çoklu şube + API' },
    },
    highlights: ['Online ödeme', 'WhatsApp hatırlatma', '10 sektör preset'],
  },
  {
    id: 'egitim', name: 'Eğitim', emoji: '🎓', status: 'CANLI',
    tagline: 'Dershane, kurs, etüt, dil okulu yönetimi',
    plans: {
      baslangic: { name: 'Başlangıç', price: 999, users: '5 öğretmen', limit: '50 öğrenci' },
      pro: { name: 'Pro', price: 1999, users: '20 öğretmen', limit: '200 öğrenci' },
      kurumsal: { name: 'Kurumsal', price: 3999, users: '∞', limit: 'Sınırsız + e-okul entegre' },
    },
    highlights: ['Sınav modülü', 'Veli portalı', 'WhatsApp veli'],
  },
  {
    id: 'mesken', name: 'Mesken', emoji: '🏘️', status: 'CANLI',
    tagline: 'Site, apartman, toplu konut yönetimi',
    plans: {
      baslangic: { name: 'Mini Site', price: 499, users: '1 yönetici', limit: '50 daire' },
      pro: { name: 'Site', price: 999, users: '5 yetkili', limit: '200 daire + online tahsilat' },
      kurumsal: { name: 'Yönetim Firması', price: 2499, users: '∞', limit: 'Sınırsız site/blok' },
    },
    highlights: ['Aidat otomasyon', 'WhatsApp duyuru', 'Karar defteri'],
  },
  {
    id: 'tamir', name: 'Tamir', emoji: '🔧', status: 'CANLI',
    tagline: 'Beyaz eşya, IT, klima — teknik servis & saha hizmet',
    plans: {
      baslangic: { name: 'Solo', price: 399, users: '1', limit: '50 servis/ay' },
      pro: { name: 'Ekip', price: 799, users: '5 teknisyen', limit: 'Sınırsız + müşteri SMS' },
      kurumsal: { name: 'Çoklu Şube', price: 1499, users: '∞', limit: 'Sınırsız şube + raporlar' },
    },
    highlights: ['İş emri', '8 sektör preset', 'Garanti takibi'],
  },
  {
    id: 'hukuk', name: 'Hukuk', emoji: '⚖️', status: 'CANLI',
    tagline: 'Avukat, hukuk bürosu — dava, müvekkil, fatura',
    plans: {
      baslangic: { name: 'Tek Avukat', price: 799, users: '1', limit: '50 dava' },
      pro: { name: 'Büro', price: 1499, users: '5 avukat', limit: 'Sınırsız dava + UYAP' },
      kurumsal: { name: 'Kurumsal', price: 2999, users: '∞', limit: 'Ortaklık + saat takibi' },
    },
    highlights: ['UYAP entegre', 'Saat × ücret', 'KEP/e-tebligat'],
  },
  {
    id: 'insaat', name: 'İnşaat', emoji: '🏗️', status: 'CANLI',
    tagline: 'Müteahhit, taşeron, şantiye yönetimi',
    plans: {
      baslangic: { name: 'Başlangıç', price: 999, users: '3', limit: '1 proje' },
      pro: { name: 'Pro', price: 1999, users: '10', limit: '5 proje + ihale' },
      kurumsal: { name: 'Kurumsal', price: 3999, users: '∞', limit: 'Sınırsız + Bakanlık entegre' },
    },
    highlights: ['Hakediş', 'Şantiye fotoğraf', 'Daire satış'],
  },
  {
    id: 'emlak', name: 'Emlak', emoji: '🏠', status: 'CANLI',
    tagline: 'Emlak ofisi, danışman, gayrimenkul yönetimi',
    plans: {
      baslangic: { name: 'Solo', price: 599, users: '1 danışman', limit: '50 ilan' },
      pro: { name: 'Ekip', price: 1199, users: '5 danışman', limit: 'Sınırsız + portal entegre' },
      kurumsal: { name: 'Kurumsal', price: 2499, users: '∞', limit: 'Çoklu şube + AI' },
    },
    highlights: ['Hepsiemlak entegre', 'AI fiyat tahmini', 'Komisyon paylaşım'],
  },
  {
    id: 'servis', name: 'Servis', emoji: '🍽️', status: 'BETA',
    tagline: 'Restoran, kafe, hızlı servis POS',
    plans: {
      baslangic: { name: 'Tek Şube', price: 599, users: '5 personel', limit: '20 masa' },
      pro: { name: 'Çoklu Şube', price: 1199, users: '20', limit: 'Sınırsız masa + KDS' },
      kurumsal: { name: 'Zincir', price: 2999, users: '∞', limit: 'Sınırsız şube + entegrasyon' },
    },
    highlights: ['Adisyon + masa', 'Kurye entegre', 'Mutfak ekranı'],
  },
  {
    id: 'muhasebe', name: 'Muhasebe', emoji: '💰', status: 'CANLI',
    tagline: 'Ön muhasebe, e-fatura, cari yönetimi',
    plans: {
      baslangic: { name: 'KOBİ', price: 599, users: '2', limit: '500 fatura/ay' },
      pro: { name: 'Pro', price: 1199, users: '5', limit: 'Sınırsız + banka entegre' },
      kurumsal: { name: 'Kurumsal', price: 2499, users: '∞', limit: 'Mali müşavir + API' },
    },
    highlights: ['e-Fatura GİB', 'Banka entegre', 'AI kategorileme'],
  },
  {
    id: 'ik', name: 'İK', emoji: '👥', status: 'BETA',
    tagline: 'Personel, bordro, izin, mesai yönetimi',
    plans: {
      baslangic: { name: 'Başlangıç', price: 499, users: '1 İK', limit: '50 personel' },
      pro: { name: 'Pro', price: 999, users: '5 İK', limit: 'Sınırsız personel + PDKS' },
      kurumsal: { name: 'Kurumsal', price: 1999, users: '∞', limit: 'Sınırsız + SGK/İŞKUR' },
    },
    highlights: ['Bordro', 'PDKS', 'KEP/e-tebligat'],
  },
]

export default function PricingTabs() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0])
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  const yearlyDiscount = (price: number) => Math.round(price * 12 * 0.83) // 17% off

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Tek tek ürün al
          </h2>
          <p className="text-gray-600">Sadece ihtiyacın olanı seç — esnek modüler yapı</p>
        </div>

        {/* Product picker */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              className={`group relative px-4 py-3 rounded-2xl border transition-all ${
                selectedProduct.id === p.id
                  ? 'bg-purple-700 text-white border-purple-700 shadow-lg shadow-purple-500/30 scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <span className="text-xl mr-1.5">{p.emoji}</span>
              <span className="font-semibold text-sm">{p.name}</span>
              {p.status === 'BETA' && (
                <span className={`absolute -top-1 -right-1 text-[8px] font-black px-1.5 py-0.5 rounded-full ${
                  selectedProduct.id === p.id ? 'bg-pink-200 text-purple-900' : 'bg-amber-100 text-amber-700'
                }`}>
                  β
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Selected product header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-3">{selectedProduct.emoji}</div>
          <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2 tracking-tight">
            kooza {selectedProduct.name}
            {selectedProduct.status === 'BETA' && (
              <span className="ml-3 inline-flex items-center text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full align-middle">
                BETA
              </span>
            )}
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-4">{selectedProduct.tagline}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedProduct.highlights.map(h => (
              <span key={h} className="text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-full">
                ✓ {h}
              </span>
            ))}
          </div>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
                billing === 'monthly' ? 'bg-white text-gray-900 shadow' : 'text-gray-500'
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition relative ${
                billing === 'yearly' ? 'bg-white text-gray-900 shadow' : 'text-gray-500'
              }`}
            >
              Yıllık <span className="ml-1 text-xs text-emerald-600 font-bold">-17%</span>
            </button>
          </div>
        </div>

        {/* 3 plans */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {(['baslangic', 'pro', 'kurumsal'] as const).map((planKey, idx) => {
            const plan = selectedProduct.plans[planKey]
            const isPopular = planKey === 'pro'
            const monthlyPrice = plan.price
            const yearlyPrice = yearlyDiscount(plan.price)
            const displayPrice = billing === 'monthly' ? monthlyPrice : Math.round(yearlyPrice / 12)

            return (
              <div
                key={planKey}
                className={`relative rounded-2xl p-6 border-2 transition-all ${
                  isPopular
                    ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl scale-105'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    EN POPÜLER
                  </div>
                )}

                <h4 className="font-bold text-lg text-gray-900 mb-1">{plan.name}</h4>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black text-gray-900">{displayPrice}</span>
                  <span className="text-gray-500">₺/ay</span>
                </div>

                {billing === 'yearly' && (
                  <div className="text-xs text-emerald-600 font-semibold mb-3">
                    Yıllık {yearlyPrice} ₺ (2 ay bedava)
                  </div>
                )}

                <ul className="space-y-2 mb-6 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span><strong>{plan.users}</strong> kullanıcı</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>{plan.limit}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>{planKey === 'kurumsal' ? '7/24 öncelikli destek' : planKey === 'pro' ? 'WhatsApp + telefon destek' : 'WhatsApp destek'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>{planKey === 'baslangic' ? 'Aylık yedek' : planKey === 'pro' ? 'Günlük yedek' : 'Saatlik yedek'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>{planKey === 'baslangic' ? 'Mobil + masaüstü' : planKey === 'pro' ? 'API + e-Fatura' : 'API + Beyaz etiket + SLA'}</span>
                  </li>
                  <li className="flex items-start gap-2 text-emerald-600 font-semibold">
                    <span className="font-bold">✓</span>
                    <span>14 gün ücretsiz</span>
                  </li>
                </ul>

                <a
                  href={`/kayit?product=${selectedProduct.id}&plan=${planKey}`}
                  className={`block text-center py-3 rounded-xl font-bold transition ${
                    isPopular
                      ? 'bg-purple-700 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Aboneliğe Başla →
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
