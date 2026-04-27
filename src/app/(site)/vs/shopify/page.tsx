import VersusTemplate from '@/components/site/sections/VersusTemplate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza vs Shopify — Türkçe E-Ticaret Karşılaştırması',
  description: 'Shopify Türkiye için iyi mi? kooza ile karşılaştırma: Trendyol/Hepsiburada entegrasyonu, GİB e-Arşiv, Iyzico, kargo otomasyonu.',
}

export default function Page() {
  return (
    <VersusTemplate
      competitor="Shopify"
      competitorTagline="Yabancı e-ticaret platformu"
      emoji="🛒"
      oneLineSummary="Shopify yurtdışı için harika ama Türkiye için pazaryeri/kargo/GİB eksik. kooza ise Trendyol+Hepsiburada+kargo+GİB hazır geliyor."
      rows={[
        { feature: 'Aylık başlangıç', kooza: '₺499', competitor: '$32 (~₺1.200)' },
        { feature: 'Trendyol entegrasyonu', kooza: true, competitor: false, highlight: true },
        { feature: 'Hepsiburada entegrasyonu', kooza: true, competitor: false, highlight: true },
        { feature: 'N11 entegrasyonu', kooza: true, competitor: false },
        { feature: 'Aras / Yurtiçi / Sürat / MNG kargo', kooza: true, competitor: false, highlight: true },
        { feature: 'GİB e-Fatura/e-Arşiv', kooza: true, competitor: 'Manuel/3.parti' },
        { feature: 'Iyzico ödeme', kooza: true, competitor: true },
        { feature: 'Türkçe arayüz', kooza: true, competitor: 'Çeviri' },
        { feature: 'KVKK uyumu', kooza: true, competitor: 'GDPR' },
        { feature: 'Türkçe destek', kooza: '7/24 + WhatsApp', competitor: 'İngilizce ticket' },
        { feature: 'Yurtdışı satış', kooza: 'Sınırlı', competitor: true },
        { feature: 'CRM dahili', kooza: true, competitor: 'Eklenti' },
        { feature: 'Stok senkronu (multi-channel)', kooza: true, competitor: 'Eklenti' },
        { feature: 'Kuruluş yılı', kooza: '2018', competitor: '2006' },
      ]}
      whenKooza={[
        'Türkiye\'de e-ticaret + pazaryeri (Trendyol/Hepsiburada) yapıyorsanız',
        'Stok birden fazla kanalda — senkron istiyorsunuz',
        'GİB e-Fatura otomatik kesilsin istiyorsunuz',
        'Türk kargo şirketleri ile entegre çalışmak istiyorsunuz',
        'Türkçe destek + KVKK uyumu kritik',
      ]}
      whenCompetitor={[
        'Yurtdışına ürün satıyorsunuz (Avrupa/ABD ana pazar)',
        'Çoklu para birimi + uluslararası lojistik gerekiyor',
        'Tema/tasarım çeşitliliği önceliğiniz (Shopify\'ın 100+ teması var)',
      ]}
    />
  )
}
