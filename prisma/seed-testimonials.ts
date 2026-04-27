import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const TESTIMONIALS = [
  {
    name: 'Dr. Selin Yılmaz', role: 'Klinik Sahibi', company: 'Klinika Sağlık · İstanbul',
    content: 'Randevu sisteminden e-reçeteye, hastadan stoğa kadar her şey tek panelde. Eskiden 3 farklı program kullanıyorduk — şimdi sadece kooza. No-show oranımız %18\'den %4\'e düştü.',
    rating: 5, order: 1,
  },
  {
    name: 'Mehmet Aksoy', role: 'Genel Müdür', company: 'Mavi Ufuk Lojistik · İzmir',
    content: 'Filo takibi, fatura yönetimi, müşteri ilişkileri — hepsi tek yerde. Aylık operasyonel sürede %35 tasarruf sağladık.',
    rating: 5, order: 2,
  },
  {
    name: 'Ayşe Demir', role: 'Kurucu Ortak', company: 'StokPro Mağazaları',
    content: '12 mağazamızın stoğunu gerçek zamanlı görmek hayal gibiydi. kooza ile artık gerçek. Ölü stok %60 azaldı.',
    rating: 5, order: 3,
  },
  {
    name: 'Burak Öztürk', role: 'CEO', company: 'Atölye Konsept Mimarlık',
    content: 'Müşteriden teklife, projeden faturaya tüm süreç tek akışta. Manuel tablolar tarihe karıştı. Geri dönüş süremiz 4 günden 8 saate indi.',
    rating: 5, order: 4,
  },
  {
    name: 'Fatma Kaya', role: 'İK Müdürü', company: 'Anadolu Endüstri',
    content: 'İK modülü beklediğimden çok daha güçlü çıktı. 80 kişilik ekibimizin izin, bordro ve performans takibi tek dashboarddan. Her sabah 1 saat tasarruf.',
    rating: 5, order: 5,
  },
  {
    name: 'Eren Şimşek', role: 'İşletme Sahibi', company: 'Yeni Çağ Restoran Grubu',
    content: '5 şubemiz var, hepsi farklı ihtiyaçta. kooza her birine özelleştirildi. Aylık fatura ne yazılıma ne danışmana — tek partnere ödüyorum.',
    rating: 5, order: 6,
  },
  {
    name: 'Zeynep Aydın', role: 'Pazarlama Direktörü', company: 'Bahar Eğitim Kurumları',
    content: 'CRM\'imiz, satış pipeline\'ımız, e-posta otomasyonumuz hepsi kooza\'da. Lead conversion oranımız ilk ayda %18\'den %29\'a yükseldi.',
    rating: 5, order: 7,
  },
  {
    name: 'Hakan Yıldız', role: 'Şube Müdürü', company: 'Esnaf+ Kooperatifi',
    content: 'kooza ile esnafımıza dijital geçişi sorunsuz yaptık. Yaşlı esnafımız bile WhatsApp kadar kolay diyor. Satışlar %22 arttı.',
    rating: 5, order: 8,
  },
]

async function main() {
  await prisma.testimonial.deleteMany()
  for (const t of TESTIMONIALS) {
    await prisma.testimonial.create({ data: { ...t, isActive: true } as any })
  }
  console.log(`✓ ${TESTIMONIALS.length} testimonials seeded.`)
}
main().catch(console.error).finally(() => prisma.$disconnect())
