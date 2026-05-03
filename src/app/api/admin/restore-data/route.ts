import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const ADMIN_KEY = process.env.ADMIN_KEY || 'kooza-admin-2026'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

function checkAuth(req: NextRequest): boolean {
  const key = req.headers.get('x-admin-key') || req.nextUrl.searchParams.get('key')
  return key === ADMIN_KEY
}

const PRODUCTS = [
  {
    slug: 'randevu',
    name: 'kooza Randevu',
    tagline: 'Randevular kelebek hızında, sektörünüze özel',
    description: 'Klinik, kuaför, fizyoterapi, masaj, spor salonu, veteriner ve tüm sektörel hizmet işletmeleri için randevu, müşteri ve finans yönetim platformu.',
    icon: '📅',
    badge: 'CANLI',
    videoUrl: 'https://randevu.kooza.tr',
    features: ['Online randevu takvimi', 'WhatsApp + SMS hatırlatma', '10 sektörel preset', 'Müşteri kartları + geçmiş', 'Çoklu personel + şube', 'Online ödeme entegre', 'Mobilde PWA', 'KVKK uyumlu raporlama'],
    screenshots: [],
    order: 1,
  },
  {
    slug: 'egitim',
    name: 'kooza Eğitim',
    tagline: 'Dershane, kurs ve eğitim merkezleri için tek panel',
    description: 'Öğrenci kayıt, ders programı, sınav, devam takibi, veli portalı ve faturalandırma. Dershane, etüt merkezi, dil okulu ve özel kurslar için.',
    icon: '📝',
    badge: 'CANLI',
    videoUrl: 'https://egitim.kooza.tr',
    features: ['Öğrenci ve veli yönetimi', 'Ders programı + öğretmen ataması', 'Online sınav modülü', 'Devam-devamsızlık takibi', 'Veli portalı', 'WhatsApp veli iletişimi', 'e-Fatura entegre', 'Çoklu şube'],
    screenshots: [],
    order: 2,
  },
  {
    slug: 'mesken',
    name: 'kooza Mesken',
    tagline: 'Site, apartman ve toplu konut yönetimi',
    description: 'Aidat takibi, sakin yönetimi, talep, muhasebe, raporlama. Site yöneticisi ve yönetim firmaları için modern, KVKK uyumlu platform.',
    icon: '🏢',
    badge: 'CANLI',
    videoUrl: 'https://mesken.kooza.tr',
    features: ['Aidat tahsilat + iyzico', 'Sakin/daire kayıtları', 'Talep yönetimi', 'Karar defteri', 'Gelir-gider muhasebesi', 'WhatsApp duyuru', 'PDF rapor', 'Yönetim firmaları için multi-site'],
    screenshots: [],
    order: 3,
  },
  {
    slug: 'tamir',
    name: 'kooza Tamir',
    tagline: 'Tamir, servis ve bakım işletmeleri için',
    description: 'Beyaz eşya, klima, telefon tamircisi, oto servis ve teknik servis işletmeleri için iş emri, müşteri ve stok yönetimi.',
    icon: '🔧',
    badge: 'CANLI',
    videoUrl: 'https://tamir.kooza.tr',
    features: ['İş emri açma + takip', 'Teknisyen atama', 'Yedek parça stoğu', 'WhatsApp müşteri bilgilendirme', 'Garanti takibi', 'Online ödeme', 'Adisyon + fatura', 'Mobil teknisyen uygulaması'],
    screenshots: [],
    order: 4,
  },
  {
    slug: 'hukuk',
    name: 'kooza Hukuk',
    tagline: 'Avukat ve hukuk büroları için tam çözüm',
    description: 'Dosya takibi, müvekkil yönetimi, duruşma takvimi, UYAP entegrasyonu ve faturalandırma. Bireysel avukat ve hukuk büroları için.',
    icon: '⚖️',
    badge: 'CANLI',
    videoUrl: 'https://hukuk.kooza.tr',
    features: ['Dosya + müvekkil yönetimi', 'Duruşma takvimi + hatırlatma', 'UYAP entegrasyon', 'Vekalet takibi', 'Tahsilat + e-Fatura', 'Çoklu avukat', 'Belge arşivi', 'KVKK uyumlu'],
    screenshots: [],
    order: 5,
  },
  {
    slug: 'insaat',
    name: 'kooza İnşaat',
    tagline: 'Müteahhit ve şantiye yönetimi',
    description: 'İhale takip, şantiye yönetimi, hakediş, malzeme stok, taşeron ve yap-sat projeleri için tam yönetim platformu.',
    icon: '🏗️',
    badge: 'CANLI',
    videoUrl: 'https://insaat.kooza.tr',
    features: ['Şantiye + proje yönetimi', 'İhale takibi', 'Hakediş hesaplama', 'Malzeme stok', 'Taşeron sözleşme', 'İş güvenliği takibi', 'Yap-sat daire kayıtları', 'Mobil saha uygulaması'],
    screenshots: [],
    order: 6,
  },
  {
    slug: 'emlak',
    name: 'kooza Emlak',
    tagline: 'Emlak ofisi ve danışman yönetimi',
    description: 'İlan yönetimi, müşteri portföyü, danışman performansı, sözleşme takibi. Emlak ofisleri ve bireysel danışmanlar için.',
    icon: '🏠',
    badge: 'CANLI',
    videoUrl: 'https://emlak.kooza.tr',
    features: ['İlan + portföy yönetimi', 'Müşteri-mülk eşleştirme', 'Sahibinden/Hepsiemlak entegre', 'Danışman komisyon takibi', 'Sözleşme + senet', 'Tur randevusu', 'WhatsApp müşteri', 'Mobil uygulama'],
    screenshots: [],
    order: 7,
  },
  {
    slug: 'servis',
    name: 'kooza Servis',
    tagline: 'Saha servis ve teknik destek',
    description: 'Saha servis ekipleri, teknik destek hizmetleri, periyodik bakım sözleşmeleri ve müşteri talep yönetimi.',
    icon: '🛠️',
    badge: 'CANLI',
    videoUrl: 'https://servis.kooza.tr',
    features: ['Saha ekibi yönetimi', 'Periyodik bakım takvimi', 'Sözleşme yenileme', 'SLA takibi', 'GPS rota optimizasyonu', 'Müşteri portalı', 'Stok + parça', 'Mobil teknisyen uygulaması'],
    screenshots: [],
    order: 8,
  },
  {
    slug: 'muhasebe',
    name: 'kooza Muhasebe',
    tagline: 'KOBİ için sade, hızlı muhasebe',
    description: 'Cari, fatura, e-Fatura, gelir-gider, KDV, muhtasar ve raporlama. Mali müşavirler ve KOBİ\'ler için.',
    icon: '💼',
    badge: 'BETA',
    videoUrl: 'https://muhasebe.kooza.tr',
    features: ['Cari yönetimi', 'e-Fatura + e-Arşiv', 'KDV + muhtasar beyanname', 'Gelir-gider tablosu', 'Bilanço raporu', 'Stok takibi', 'Banka mutabakatı', 'Mali müşavir paneli'],
    screenshots: [],
    order: 9,
  },
  {
    slug: 'ik',
    name: 'kooza İK',
    tagline: 'İnsan kaynakları ve bordro yönetimi',
    description: 'Personel kayıt, izin, bordro, SGK bildirim, performans ve eğitim. KOBİ ve orta ölçekli işletmeler için.',
    icon: '👥',
    badge: 'BETA',
    videoUrl: 'https://ik.kooza.tr',
    features: ['Personel sicili', 'İzin + mesai takibi', 'Bordro hesaplama', 'SGK bildirim entegre', 'Performans değerlendirme', 'Eğitim takibi', 'PDKS entegrasyonu', 'Mobil personel uygulaması'],
    screenshots: [],
    order: 10,
  },
]

const MENU_ITEMS = [
  { label: 'Ana Sayfa', url: '/', order: 1 },
  { label: 'Çözümler', url: '/cozumler', order: 2 },
  { label: 'Araçlar', url: '/araclar', order: 3 },
  { label: 'Fiyatlandırma', url: '/fiyatlandirma', order: 4 },
  { label: 'Blog', url: '/blog', order: 5 },
  { label: 'Hakkımızda', url: '/hakkimizda', order: 6 },
  { label: 'İletişim', url: '/iletisim', order: 7 },
]

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: any = { products: 0, menus: 0, errors: [] }

  // Products
  for (const p of PRODUCTS) {
    try {
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: {
          name: p.name,
          tagline: p.tagline,
          description: p.description,
          icon: p.icon,
          badge: p.badge,
          videoUrl: p.videoUrl,
          features: p.features,
          screenshots: p.screenshots,
          order: p.order,
          status: 'ACTIVE',
        },
        create: {
          slug: p.slug,
          name: p.name,
          tagline: p.tagline,
          description: p.description,
          icon: p.icon,
          badge: p.badge,
          videoUrl: p.videoUrl,
          features: p.features,
          screenshots: p.screenshots,
          order: p.order,
          status: 'ACTIVE',
        },
      })
      results.products++
    } catch (e) {
      results.errors.push(`product:${p.slug}: ${(e as Error).message}`)
    }
  }

  // Menu Items
  for (const m of MENU_ITEMS) {
    try {
      const existing = await prisma.menuItem.findFirst({
        where: { url: m.url, location: 'header' },
      })
      if (existing) {
        await prisma.menuItem.update({
          where: { id: existing.id },
          data: { label: m.label, order: m.order, isActive: true },
        })
      } else {
        await prisma.menuItem.create({
          data: { label: m.label, url: m.url, order: m.order, location: 'header', isActive: true },
        })
      }
      results.menus++
    } catch (e) {
      results.errors.push(`menu:${m.url}: ${(e as Error).message}`)
    }
  }

  return NextResponse.json({
    ok: true,
    summary: {
      products_seeded: results.products,
      menus_seeded: results.menus,
      errors: results.errors.length,
    },
    details: results,
  })
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const products = await prisma.product.count({ where: { status: 'ACTIVE' } })
  const menus = await prisma.menuItem.count({ where: { location: 'header', isActive: true } })
  return NextResponse.json({ products, menus, hint: 'POST to seed' })
}
