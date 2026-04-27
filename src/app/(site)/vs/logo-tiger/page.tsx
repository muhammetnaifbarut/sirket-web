import VersusTemplate from '@/components/site/sections/VersusTemplate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza vs Logo Tiger — Hangisi Daha İyi? KOBİ İçin Karşılaştırma',
  description: 'Logo Tiger ile kooza karşılaştırması: kurulum süresi, fiyat, modüller. Logo Tiger kurumsal ERP, kooza ise modern bulut SaaS.',
}

export default function Page() {
  return (
    <VersusTemplate
      competitor="Logo Tiger"
      competitorTagline="Klasik kurumsal ERP (lokal kurulum)"
      emoji="🐅"
      oneLineSummary="Logo Tiger 500+ kişilik üretim şirketleri için. kooza ise 5-200 kişilik KOBİ'ler için bulut tabanlı, hızlı, sektörel."
      rows={[
        { feature: 'Hedef kitle', kooza: '5-200 kişi KOBİ', competitor: '500+ kurumsal' },
        { feature: 'Kurulum süresi', kooza: '5 dakika', competitor: '3-6 ay', highlight: true },
        { feature: 'Aylık başlangıç', kooza: '₺499', competitor: '₺2.500+' },
        { feature: 'Bulut tabanlı', kooza: true, competitor: 'Hibrit', highlight: true },
        { feature: 'Mobil uygulama', kooza: true, competitor: 'Sınırlı' },
        { feature: 'Sektörel paket (klinik/restoran/salon)', kooza: true, competitor: 'Modül satın alma' },
        { feature: 'Trendyol/Hepsiburada entegrasyonu', kooza: true, competitor: 'Manuel' },
        { feature: 'Yemeksepeti/Getir entegrasyonu', kooza: true, competitor: false },
        { feature: 'GİB e-Fatura/e-Arşiv', kooza: true, competitor: true },
        { feature: 'KVKK uyumu', kooza: true, competitor: 'Modül + danışman' },
        { feature: 'IT ekibi gerekli', kooza: false, competitor: true },
        { feature: 'Self-service kullanım', kooza: true, competitor: false },
        { feature: '14 gün ücretsiz deneme', kooza: 'Kart yok', competitor: false },
        { feature: 'Bayi (3. parti) gerek', kooza: false, competitor: true },
      ]}
      whenKooza={[
        'KOBİ veya orta ölçekli işletme (5-200 kişi)',
        'Hızlı kurulum istiyorsunuz (5 dakika)',
        'Bulut, mobil, modern UX arıyorsunuz',
        'Sektörünüze özel hazır paket (klinik/restoran/salon)',
        'IT ekibiniz yok ya da çok küçük',
      ]}
      whenCompetitor={[
        '500+ kişilik üretim/holding firmasısınız',
        'IT ekibiniz var, ERP süreci yönetebilirsiniz',
        'Bütçeniz ₺50K+ ve 6 ay implementasyon kabul',
        'Karmaşık üretim/sevkiyat akışlarınız var',
      ]}
    />
  )
}
