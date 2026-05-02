'use client'

import { motion } from 'framer-motion'

const PRODUCTS = [
  { id: 'randevu', name: 'kooza Randevu', emoji: '📅', desc: 'Klinik, kuaför, fizyo · randevu yönetimi', url: 'https://randevu.kooza.tr', status: 'CANLI', color: '#714B67' },
  { id: 'egitim', name: 'kooza Eğitim', emoji: '🎓', desc: 'Dershane, kurs · öğrenci yönetimi', url: 'https://egitim.kooza.tr', status: 'CANLI', color: '#4f46e5' },
  { id: 'mesken', name: 'kooza Mesken', emoji: '🏘️', desc: 'Site, apartman · aidat & talep', url: 'https://mesken.kooza.tr', status: 'CANLI', color: '#0891b2' },
  { id: 'tamir', name: 'kooza Tamir', emoji: '🔧', desc: 'Beyaz eşya, IT · teknik servis', url: 'https://tamir.kooza.tr', status: 'CANLI', color: '#ea580c' },
  { id: 'hukuk', name: 'kooza Hukuk', emoji: '⚖️', desc: 'Avukat · dava, müvekkil, fatura', url: 'https://hukuk.kooza.tr', status: 'CANLI', color: '#7c3aed' },
  { id: 'insaat', name: 'kooza İnşaat', emoji: '🏗️', desc: 'Müteahhit · ihale, hakediş, şantiye', url: 'https://insaat.kooza.tr', status: 'CANLI', color: '#d97706' },
  { id: 'emlak', name: 'kooza Emlak', emoji: '🏠', desc: 'Gayrimenkul · ilan, lead, satış', url: 'https://emlak.kooza.tr', status: 'CANLI', color: '#16a34a' },
  { id: 'servis', name: 'kooza Servis', emoji: '🍽️', desc: 'Restoran, kafe · POS & adisyon', url: 'https://servis.kooza.tr/demo', status: 'BETA', color: '#dc2626' },
  { id: 'muhasebe', name: 'kooza Muhasebe', emoji: '💰', desc: 'KOBİ · e-fatura, cari, gelir-gider', url: 'https://muhasebe.kooza.tr', status: 'CANLI', color: '#059669' },
  { id: 'ik', name: 'kooza İK', emoji: '👥', desc: 'Personel · bordro, izin, mesai', url: 'https://ik.kooza.tr', status: 'BETA', color: '#0284c7' },
]

export default function EcosystemGrid() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-wider mb-4">
            🦋 KOOZA EKOSİSTEMİ · 10 ÜRÜN
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight max-w-3xl mx-auto leading-tight">
            10 farklı sektör için <span className="text-purple-700">tek</span> markalı yazılım
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Her sektöre özel modüller. Tek aboneliğe Bundle ile %72 tasarruf.
          </p>
        </div>

        {/* 10 product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-10">
          {PRODUCTS.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative bg-white rounded-2xl p-5 border border-gray-100 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Status badge */}
              <span
                className={`absolute top-2 right-2 text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                  p.status === 'CANLI'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}
              >
                {p.status}
              </span>

              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
                {p.emoji}
              </div>

              <h3 className="font-bold text-gray-900 text-sm mb-1 leading-tight">{p.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{p.desc}</p>

              <div className="mt-3 flex items-center text-xs font-semibold text-purple-700 group-hover:gap-2 transition-all">
                Demo Aç <span className="ml-1 group-hover:ml-2 transition-all">→</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bundle CTA */}
        <div className="text-center max-w-3xl mx-auto bg-gradient-to-br from-purple-700 via-purple-600 to-pink-500 rounded-3xl p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400/20 rounded-full translate-y-24 -translate-x-24 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs font-bold mb-4">
              🎁 KOOZA PRO BUNDLE
            </div>
            <h3 className="text-2xl lg:text-3xl font-black mb-3 tracking-tight">
              10 ürünü tek pakette al
            </h3>
            <p className="text-purple-100 mb-5 leading-relaxed">
              Ayrı ayrı 7.000 ₺ değerinde · Bundle ile sadece <strong className="text-pink-200 text-2xl">1.499 ₺/ay</strong>
              <br />
              <span className="text-sm">14 gün ücretsiz · Kredi kartı yok · İstediğin zaman iptal</span>
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="/kayit?product=bundle&plan=pro"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-purple-700 font-black hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                🚀 Bundle Aboneliğe Başla
              </a>
              <a
                href="/fiyatlandirma"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 backdrop-blur text-white font-bold border border-white/30 hover:bg-white/25 transition-all"
              >
                Tüm Paketler
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
