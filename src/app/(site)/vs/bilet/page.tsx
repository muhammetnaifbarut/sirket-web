import VersusTemplate from '@/components/site/sections/VersusTemplate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'kooza vs Bilet — Hangisi Daha İyi? Karşılaştırma 2026',
  description: 'kooza ve Bilet karşılaştırması: fiyat, özellikler, sektörel paket, GİB e-Fatura, KVKK uyumu. KOBİ\'ler için hangi yazılım daha uygun?',
}

export default function Page() {
  return (
    <VersusTemplate
      competitor="Bilet"
      competitorTagline="Restoran ve perakende odaklı POS"
      emoji="🎫"
      oneLineSummary="Bilet sadece restoran/perakende için. kooza ise tüm sektörler için tam paket — bütünleşik CRM + İK + muhasebe ile."
      rows={[
        { feature: 'Sektör çeşitliliği', kooza: 'tüm sektörler', competitor: '2 (Restoran/Perakende)' },
        { feature: 'Aylık başlangıç ücreti', kooza: '₺499', competitor: '₺790+' },
        { feature: 'Klinik / İK / Eğitim modülleri', kooza: true, competitor: false },
        { feature: 'Yemeksepeti/Trendyol/Getir entegrasyonu', kooza: true, competitor: true, highlight: true },
        { feature: 'GİB e-Fatura', kooza: true, competitor: true },
        { feature: 'CRM dahili', kooza: true, competitor: false },
        { feature: 'Bordro & İK', kooza: true, competitor: false },
        { feature: 'Web sitesi yapımı', kooza: true, competitor: false },
        { feature: '14 gün ücretsiz deneme', kooza: 'Kart yok', competitor: '7 gün' },
        { feature: 'Türkçe destek', kooza: '7/24 + WhatsApp', competitor: 'Mesai içi' },
        { feature: 'Kurulum süresi', kooza: '5 dakika', competitor: '1 hafta' },
        { feature: 'Çoklu şube yönetimi', kooza: true, competitor: true },
        { feature: 'Mobil uygulama', kooza: true, competitor: 'Sınırlı' },
      ]}
      whenKooza={[
        'Restoran + ek sektörler (cafe + market + salon)',
        'CRM, İK, muhasebe gibi modüllere de ihtiyaç',
        'Çoklu sektör operasyonu (zincir + holding)',
        'Web sitesi de istiyorsanız',
        'Bütçeniz ekonomik ama profesyonel paket',
      ]}
      whenCompetitor={[
        'Sadece tek bir restoran ve sade POS arıyorsanız',
        'Mevcut Bilet kullanıcısıysanız ve geçiş istemiyorsanız',
      ]}
    />
  )
}
