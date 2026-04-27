import VersusTemplate from '@/components/site/sections/VersusTemplate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza vs Paraşüt — Hangisi KOBİ İçin Daha İyi?',
  description: 'Paraşüt sadece muhasebe; kooza ise muhasebe + CRM + randevu + stok + bordro. Aynı bütçeyle daha çok modül.',
}

export default function Page() {
  return (
    <VersusTemplate
      competitor="Paraşüt"
      competitorTagline="Sadece ön muhasebe SaaS"
      emoji="📊"
      oneLineSummary="Paraşüt sadece ön muhasebe. kooza ise tek aboneliğe muhasebe + CRM + randevu + stok + İK + bordro koyuyor."
      rows={[
        { feature: 'Aylık başlangıç', kooza: '₺499', competitor: '₺499' },
        { feature: 'Ön muhasebe', kooza: true, competitor: true },
        { feature: 'GİB e-Fatura/e-Arşiv', kooza: true, competitor: true },
        { feature: 'CRM (müşteri yönetimi)', kooza: true, competitor: 'Sınırlı', highlight: true },
        { feature: 'Randevu sistemi', kooza: true, competitor: false, highlight: true },
        { feature: 'Stok yönetimi', kooza: true, competitor: 'Temel' },
        { feature: 'İK & Bordro', kooza: true, competitor: false, highlight: true },
        { feature: 'Sektörel UI (klinik/salon/restoran)', kooza: true, competitor: false },
        { feature: 'Web sitesi yapımı dahil', kooza: true, competitor: false },
        { feature: 'Trendyol/Yemeksepeti', kooza: true, competitor: false },
        { feature: 'Banka entegrasyonu', kooza: true, competitor: true },
        { feature: '14 gün ücretsiz deneme', kooza: 'Kart yok', competitor: '14 gün' },
        { feature: 'Mali müşavir paylaşımı', kooza: true, competitor: true },
        { feature: 'Mobil uygulama', kooza: true, competitor: true },
        { feature: 'Türkçe destek', kooza: '7/24 + WhatsApp', competitor: 'Ticket' },
      ]}
      whenKooza={[
        'Sadece muhasebe değil, CRM/randevu/stok/İK gibi modüllere de ihtiyaç',
        'Sektörel iş yapıyorsunuz (klinik, salon, restoran, eğitim)',
        'Web sitesi de istiyorsunuz',
        'Tek paket + tek ödeme + tek destek istiyorsunuz',
        'Çalışan personel takibi (bordro) gerekli',
      ]}
      whenCompetitor={[
        'Sadece ön muhasebe yeterli — başka modül istemiyorsunuz',
        'Mevcut Paraşüt kullanıcısıysanız ve memnun çalışıyorsunuz',
        'Mali müşaviriniz Paraşüt\'e alışkın',
      ]}
    />
  )
}
