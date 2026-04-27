import VersusTemplate from '@/components/site/sections/VersusTemplate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza vs Calendly — Türkçe Randevu Sistemi Karşılaştırması',
  description: 'Calendly\'nin Türkçe alternatifi kooza ile karşılaştırma: KVKK uyumu, GİB e-Fatura, MHRS entegrasyonu, çoklu personel takvimi.',
}

export default function Page() {
  return (
    <VersusTemplate
      competitor="Calendly"
      competitorTagline="Yabancı online randevu aracı"
      emoji="📅"
      oneLineSummary="Calendly İngilizce ve sadece randevu. kooza Türkçe + randevu + müşteri kartı + ödeme + KVKK + Türkiye'ye özel."
      rows={[
        { feature: 'Dil', kooza: 'Türkçe', competitor: 'İngilizce' },
        { feature: 'Aylık fiyat (USD/TRY)', kooza: '₺499', competitor: '$15-30/ay (~₺550-1.100)' },
        { feature: 'KVKK uyumu', kooza: true, competitor: 'GDPR (TR\'ye uyumlu mu? Belirsiz)', highlight: true },
        { feature: 'GİB e-Fatura', kooza: true, competitor: false },
        { feature: 'MHRS / e-Reçete (Klinik için)', kooza: true, competitor: false },
        { feature: 'Müşteri profili (CRM)', kooza: true, competitor: false },
        { feature: 'Online ödeme (Iyzico)', kooza: true, competitor: 'Stripe only' },
        { feature: 'WhatsApp hatırlatma', kooza: true, competitor: false },
        { feature: 'Çoklu personel takvimi', kooza: true, competitor: true },
        { feature: 'Türkçe destek', kooza: '7/24 + WhatsApp', competitor: 'İngilizce ticket' },
        { feature: 'Sektörel UI (klinik/salon)', kooza: true, competitor: false },
        { feature: 'Veri Türkiye\'de', kooza: true, competitor: false, highlight: true },
        { feature: 'Stok / fatura / muhasebe modülü', kooza: true, competitor: false },
      ]}
      whenKooza={[
        'Türkiye\'de işletmeniz var',
        'KVKK uyumu kritik (sağlık/finans/avukat)',
        'Sadece randevu değil, müşteri kartı + ödeme + fatura da gerek',
        'GİB e-Fatura entegrasyonu istiyorsunuz',
        'WhatsApp ile hatırlatma yollamak istiyorsunuz',
      ]}
      whenCompetitor={[
        'Yurtdışı müşterilerle çalışıyorsunuz (İngilizce randevu)',
        'Sadece basit randevu yeterli, başka modül istemiyorsunuz',
        'Mevcut Calendly kullanıcısıysanız',
      ]}
    />
  )
}
