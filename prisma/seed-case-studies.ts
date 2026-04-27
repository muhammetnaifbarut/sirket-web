import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const STUDIES = [
  {
    slug: 'dis-klinigi-istanbul-randevu',
    company: 'Dental Estetik Klinik',
    sector: 'Diş Hekimliği',
    sectorColor: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    timeframe: '90 gün',
    challenge:
      'Bakırköy\'de 4 hekimli estetik diş kliniği. Randevular telefonla alınıyor, no-show oranı %22 (haftalık 14 boş slot = ~28.000 TL kayıp ciro). Hasta dosyaları kağıtta, geçmiş tedavi bulmak 5-10 dk sürüyor. Ödenmemiş tedavi takibi karışık.',
    solution:
      'kooza Diş Hekimi paketi kuruldu: dijital odontogram, otomatik WhatsApp randevu hatırlatma (24 saat + 2 saat öncesi), tedavi planı + ödeme planı, panoramik röntgen arşivi. Hasta verileri Excel\'den taşındı. Personel 1 günlük eğitim aldı.',
    quote:
      'No-show oranımız %22\'den %5\'e düştü, sadece bu fark 90 günde sistemin maliyetini 6 katına çıkardı. Hasta dosyasını 5 saniyede açıp geçmişi gösterdiğimde "vay siz çok profesyonelsiniz" tepkisi alıyorum.',
    person: 'Dr. Ayşe Demir',
    role: 'Klinik Sahibi & Diş Hekimi',
    results: [
      { label: 'No-show oranı', from: '%22', to: '%5', icon: 'CalendarOff' },
      { label: 'Hasta dosyası açma süresi', from: '5-10 dk', to: '5 saniye', icon: 'Clock' },
      { label: 'Ödenmemiş tedavi takibi', from: '%41 kayıp', to: '%96 tahsil', icon: 'CheckCircle' },
    ],
    order: 1,
  },
  {
    slug: 'restoran-zinciri-3-sube-kurye',
    company: 'Lezzet Sokağı Restoran',
    sector: 'Restoran & Kafe',
    sectorColor: 'bg-orange-50 text-orange-700 border-orange-100',
    timeframe: '60 gün',
    challenge:
      'Ankara\'da 3 şubeli geleneksel Türk mutfağı. Yemeksepeti, Getir ve Trendyol Yemek için 3 ayrı tablet açık tutuluyor. Sipariş kaçırılması haftada 8-10 kez. Adisyon defterde, ay sonu kasa açığı ortalama 4.500 TL. Stok takibi yok — servis sırasında biten malzeme nedeniyle haftada 2-3 müşteri kaybediliyor.',
    solution:
      'kooza Restoran paketi: 3 platformun siparişleri tek panelde birleşti. Tablet adisyon + mutfak ekranı (KDS). Reçete bazlı otomatik stok düşümü. e-Fatura GİB entegrasyonu. 3 şube tek merkezi panelden raporlanıyor. Personel 2 saatlik eğitim aldı.',
    quote:
      '3 platformu tek ekranda görmek operasyonu rahatlattı. Mutfak ekranıyla yanlış sipariş %85 azaldı. En önemlisi: aylık kasa açığım 4500 TL\'den sıfıra düştü.',
    person: 'Mehmet Kaya',
    role: 'Restoran Sahibi (3 Şube)',
    results: [
      { label: 'Sipariş işleme hızı', from: '90 sn', to: '30 sn', icon: 'Zap' },
      { label: 'Aylık kasa açığı', from: '4.500 TL', to: '0 TL', icon: 'Wallet' },
      { label: 'Yanlış sipariş', from: 'Haftalık 8', to: 'Haftalık 1', icon: 'CheckCircle2' },
    ],
    order: 2,
  },
  {
    slug: 'guzellik-salonu-online-randevu-sadakat',
    company: 'Reflect Studio',
    sector: 'Güzellik Salonu',
    sectorColor: 'bg-pink-50 text-pink-700 border-pink-100',
    timeframe: '120 gün',
    challenge:
      'İstanbul Beşiktaş\'ta 6 stilistli güzellik salonu. Randevular Instagram DM, telefon ve WhatsApp\'tan karışık geliyor — çift book sürekli oluyor. Müşterilerin "geçen seferki rengim/boyam neydi?" sorularına cevap aranıyor. Tekrar gelen müşteri oranı %38, hedef %60+.',
    solution:
      'kooza Güzellik Salonu paketi: Instagram bio\'ya özel /reflectstudio.kooza.tr randevu linki. Stilist bazlı online takvim (çakışma engelli). Müşteri profili — geçmiş hizmet, kullanılan ürün, foto öncesi/sonrası galeri. Sadakat puanı sistemi (her ziyarette puan, 10 puan = %10 indirim). WhatsApp otomatik randevu hatırlatma.',
    quote:
      '120 günde tekrar gelen müşteri %38\'den %71\'e çıktı. Instagram\'dan gelen randevular %3 → %47\'ye sıçradı. Stilistler kendi takvimlerini telefondan görüyor, çift book bitti.',
    person: 'Zeynep Akın',
    role: 'Salon Sahibesi',
    results: [
      { label: 'Tekrar gelen müşteri', from: '%38', to: '%71', icon: 'Heart' },
      { label: 'Instagram randevu', from: '%3', to: '%47', icon: 'TrendingUp' },
      { label: 'Aylık ciro', from: '38.000 TL', to: '64.000 TL', icon: 'DollarSign' },
    ],
    order: 3,
  },
]

async function main() {
  console.log('Vaka çalışmaları seed başlıyor...\n')
  for (const s of STUDIES) {
    const exists = await prisma.caseStudy.findUnique({ where: { slug: s.slug } })
    if (exists) {
      await prisma.caseStudy.update({ where: { slug: s.slug }, data: { ...s, isActive: true } as any })
      console.log(`UPDATED: ${s.slug}`)
    } else {
      await prisma.caseStudy.create({ data: { ...s, isActive: true } as any })
      console.log(`+ ${s.slug}`)
    }
  }
  console.log('\nVaka çalışmaları seed tamam.')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
