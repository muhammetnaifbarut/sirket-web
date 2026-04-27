import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { rateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'
import { notifyAdmin, sendEmail } from '@/lib/email'

const LIMIT = 5
const WINDOW = 60 * 60 * 1000

const SECTOR_NAMES: Record<string, string> = {
  klinik: 'Klinik & Sağlık',
  restoran: 'Restoran & Kafe',
  market: 'Market & Perakende',
  egitim: 'Eğitim & Kurs',
  ik: 'İnsan Kaynakları',
  web: 'Web Sitesi & E-Ticaret',
}

const GUIDE_CONTENT: Record<string, { title: string; intro: string; sections: { title: string; items: string[] }[] }> = {
  klinik: {
    title: 'Klinik & Sağlık Sektörü Dijitalleşme Rehberi 2026',
    intro: 'Klinik, poliklinik, diş hekimi ve estetik merkezleri için kapsamlı dijitalleşme yol haritası.',
    sections: [
      { title: '📊 Sektör Gerçekleri', items: [
        'Türkiye\'de 50.000+ klinik faaliyette',
        '%67\'si hala kağıt hasta dosyası kullanıyor',
        'Ortalama bir klinik aylık 4-6 saatini kâğıt işleriyle harcıyor',
        'Online randevu sistemli klinikler %32 daha çok hasta çekiyor',
      ]},
      { title: '❌ En Sık 5 Hata', items: [
        'Randevuları telefonla almak (boş slot oranı %40)',
        'Hasta dosyalarını kâğıtta tutmak (kayıp riski yüksek)',
        'e-Reçete için ayrı sistem açmak (zaman kaybı)',
        'SGK provizyonlarını manuel takip etmek (gelir kaybı)',
        'Hatırlatma SMS\'i göndermemek (no-show oranı %25)',
      ]},
      { title: '✅ Yapılması Gereken 10 Şey', items: [
        'Online randevu sistemi kurun (web + WhatsApp)',
        'Otomatik SMS hatırlatma aktif edin',
        'Hasta dosyalarını dijitale taşıyın',
        'e-Reçete sistemine geçin',
        'MHRS entegrasyonunu sağlayın',
        'SGK provizyon otomasyonu kurun',
        'Laboratuvar entegrasyonu yapın',
        'Online ödeme alın (POS + havale)',
        'Hasta memnuniyet anketi gönderin',
        'Performans raporları takip edin',
      ]},
      { title: '💰 Beklenen Kazançlar', items: [
        'Boş slot oranı: -%62',
        'Sekreter zaman tasarrufu: 40+ saat/ay',
        'Hasta memnuniyeti: +%38',
        'No-show (gelmeyen hasta) azalması: -%45',
        'Yıllık net kazanç: 80.000-180.000 TL (klinik büyüklüğüne göre)',
      ]},
    ],
  },
  restoran: {
    title: 'Restoran & Kafe Dijitalleşme Rehberi 2026',
    intro: 'Restoran, kafe, fast-food ve catering işletmeleri için adım adım dijitalleşme rehberi.',
    sections: [
      { title: '📊 Sektör Gerçekleri', items: [
        'Türkiye\'de 600.000+ yeme-içme işletmesi var',
        '%72\'si hala adisyonu defterde tutuyor',
        'Ortalama kasa açığı aylık 3.500 TL',
        'Yemeksepeti+Getir+Trendyol için 3 ayrı ekran kullananlar %85',
      ]},
      { title: '❌ En Sık 5 Hata', items: [
        'Adisyonu defterde tutmak (kasa açıkları)',
        'Kurye platformlarına ayrı ayrı sipariş girmek',
        'Stok takibi yapmamak (servis sırasında biten malzeme)',
        'Mutfak ile servis arasında kâğıt iletişimi',
        'Sadakat programı olmaması',
      ]},
      { title: '✅ Yapılması Gereken 10 Şey', items: [
        'Tablet adisyon sistemine geçin',
        'Mutfak ekranı (KDS) kurun',
        'Yemeksepeti, Getir, Trendyol entegrasyonu yapın',
        'Reçete bazlı stok takibi başlatın',
        'Sadakat kart programı kurun',
        'SMS/WhatsApp kampanya gönderin',
        'Z raporu otomatikleşsin',
        'e-Fatura sistemine geçin',
        'Vardiya yönetimini dijitalleştirin',
        'Müşteri yorumlarını takip edin',
      ]},
      { title: '💰 Beklenen Kazançlar', items: [
        'Kasa açığı: -%85',
        'Sipariş alma hızı: 3× artış',
        'Stok kaybı: -%40',
        'Tekrar müşteri oranı: +%25',
        'Yıllık net kazanç: 60.000-200.000 TL',
      ]},
    ],
  },
  market: {
    title: 'Market & Perakende Dijitalleşme Rehberi 2026',
    intro: 'Market, bakkal, kuruyemiş, kozmetik ve perakende noktaları için tam dijital dönüşüm rehberi.',
    sections: [
      { title: '📊 Sektör Gerçekleri', items: [
        'Türkiye\'de 200.000+ küçük market var',
        'Stok kayıp ortalaması: aylık ciro\'nun %5\'i',
        'Sadakat programı olan marketler %18 daha çok satıyor',
        'Çoklu şubeler arası senkronizasyon eksikliği yaygın',
      ]},
      { title: '❌ En Sık 5 Hata', items: [
        'Stok takibini Excel\'de yapmak',
        'Etiket değişikliklerini elle yapmak',
        'Şube bazlı performans karşılaştırması yapmamak',
        'Sadakat programı kullanmamak',
        'Tedarikçi e-Faturalarını manuel işlemek',
      ]},
      { title: '✅ Yapılması Gereken 10 Şey', items: [
        'Barkod + hızlı kasa sistemi kurun',
        'Anlık stok takibi başlatın',
        'Min/max stok seviyeleri belirleyin',
        'Toplu fiyat değişikliği özelliği kullanın',
        'Sadakat kart programı kurun',
        'Çoklu şube transfer sistemi',
        'Son kullanma tarihi takibi yapın',
        'Tedarikçi e-Fatura otomasyonu kurun',
        'Aylık kâr-zarar raporu alın',
        'Müşteri segmentasyonu yapın',
      ]},
      { title: '💰 Beklenen Kazançlar', items: [
        'Stok kaybı: -%55',
        'Kasa hızı: 2-3× artış',
        'Aylık ek satış (sadakat etkisi): +%18',
        'Etiket değişim süresi: -%90',
        'Yıllık net kazanç: 80.000-250.000 TL',
      ]},
    ],
  },
  egitim: {
    title: 'Eğitim & Kurs Dijitalleşme Rehberi 2026',
    intro: 'Dershane, kurs, anaokulu, dil okulu ve akademiler için dijital yönetim rehberi.',
    sections: [
      { title: '📊 Sektör Gerçekleri', items: [
        'Türkiye\'de 30.000+ özel eğitim kurumu var',
        '%58\'i taksit takibini Excel\'de yapıyor',
        'Veli portalı olan kurumlarda memnuniyet %47 daha yüksek',
        'Online sınav uygulayan kurumlar değerlendirme süresini %95 azaltıyor',
      ]},
      { title: '❌ En Sık 5 Hata', items: [
        'Öğrenci kayıtlarını Excel\'de tutmak',
        'Veli iletişimini WhatsApp grubuyla yapmak',
        'Sınav puanlamasını manuel yapmak',
        'Ders programı çakışmalarını fark etmemek',
        'Taksit hatırlatması göndermemek',
      ]},
      { title: '✅ Yapılması Gereken 10 Şey', items: [
        'Öğrenci yönetim sistemi kurun',
        'Online sınav + otomatik puanlama başlatın',
        'Veli portalı (web + mobil) sunun',
        'QR ile yoklama alın',
        'Otomatik taksit hatırlatma kurun',
        'Online ödeme alın',
        'SMS bildirim sistemini başlatın',
        'Eğitmen performans takibi yapın',
        'Aday-öğrenci dönüşüm CRM\'i',
        'Online ders/derslik kayıt sistemi',
      ]},
      { title: '💰 Beklenen Kazançlar', items: [
        'Tahsilat oranı: +%32',
        'Sınav değerlendirme süresi: -%95',
        'Veli memnuniyeti: +%47',
        'Yönetimsel zaman tasarrufu: 20+ saat/ay',
        'Yıllık net kazanç: 100.000-300.000 TL',
      ]},
    ],
  },
  ik: {
    title: 'İnsan Kaynakları Dijitalleşme Rehberi 2026',
    intro: '5-500 personel arası işletmeler için modern İK yönetimi rehberi.',
    sections: [
      { title: '📊 Sektör Gerçekleri', items: [
        'Türkiye\'de KOBİ\'lerin %78\'i bordroyu Excel\'de yapıyor',
        'Ortalama bordro hatası yıllık personel başı 2.500 TL',
        'Self-servis portal olan şirketlerde İK\'ya gelen sorgu %55 azalıyor',
        'Performans takibi yapan şirketlerde çalışan memnuniyeti %29 daha yüksek',
      ]},
      { title: '❌ En Sık 5 Hata', items: [
        'Bordroyu Excel\'de elle hesaplamak',
        'İzin taleplerini WhatsApp\'ta takip etmek',
        'Performansı yıllık değerlendirmek (sübjektif kalır)',
        'PDKS\'yi sisteme bağlamamak',
        'Çalışan özlüğünü kâğıt dosyalarda tutmak',
      ]},
      { title: '✅ Yapılması Gereken 10 Şey', items: [
        'Dijital özlük dosyası sistemine geçin',
        'Bordroyu otomatikleştirin (SGK + GV + AGİ)',
        'Online izin sistemine geçin',
        'PDKS entegrasyonu yapın',
        'Performans takibi (OKR/KPI) başlatın',
        '360° geri bildirim toplayın',
        'Self-servis çalışan portalı sunun',
        'İşe alım (ATS) sistemini başlatın',
        'KVKK uyumlu yedekleme yapın',
        'Aylık İK dashboard takibi',
      ]},
      { title: '💰 Beklenen Kazançlar', items: [
        'Bordro hata oranı: ~%0',
        'İK süreç hızı: 4× artış',
        'İK\'ya gelen talep: -%55',
        'Çalışan memnuniyeti: +%29',
        'Yıllık tasarruf: 50.000-150.000 TL',
      ]},
    ],
  },
  web: {
    title: 'Web Sitesi & E-Ticaret Rehberi 2026',
    intro: 'Modern, hızlı, SEO uyumlu web sitesi ve e-ticaret kurma rehberi.',
    sections: [
      { title: '📊 Sektör Gerçekleri', items: [
        'Müşterilerin %63\'ü önce Google\'da arama yapıyor',
        'Mobil hızı 3 sn\'yi geçen sitelerin %53\'ü terk ediliyor',
        'Modern siteye geçiş ortalama Google sıralamasını +8 sıra yükseltir',
        'Kendi e-ticaretiniz, marketplace komisyonundan %15-25 daha kârlı',
      ]},
      { title: '❌ En Sık 5 Hata', items: [
        'Eski, mobil uyumsuz site kullanmak',
        'Her değişiklik için ajansa para vermek',
        'SEO optimizasyonu yapmamak',
        'Site formundan gelen lead\'leri takip etmemek',
        'Yavaş hosting kullanmak',
      ]},
      { title: '✅ Yapılması Gereken 10 Şey', items: [
        'Modern, mobil-öncelikli site kurun',
        'Admin panelinden içerik yönetin',
        'PageSpeed 90+ skoru hedefleyin',
        'Schema.org markup ekleyin',
        'Sitemap + robots.txt aktif edin',
        'Form → CRM otomasyonu kurun',
        'SSL sertifikası (HTTPS) zorunlu',
        'Google Analytics + Search Console',
        'Düzenli sektörel blog yazın',
        'WhatsApp butonu ekleyin',
      ]},
      { title: '💰 Beklenen Kazançlar', items: [
        'Google sıralaması: +8 sıra ortalama',
        'Mobil hız (PageSpeed): 90+',
        'Form → satış dönüşümü: +%40',
        'Aylık içerik maliyeti: -%70',
        'Yıllık ek satış: 100.000-500.000 TL',
      ]},
    ],
  },
}

function buildGuideHtml(sector: string, name: string): string {
  const guide = GUIDE_CONTENT[sector]
  if (!guide) return '<p>Rehber bulunamadı.</p>'

  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:680px;margin:0 auto;padding:24px;background:#fafafa">
      <div style="background:linear-gradient(135deg,#714B67,#3a2436);color:white;padding:32px 24px;border-radius:16px 16px 0 0">
        <div style="font-size:14px;opacity:0.9;margin-bottom:8px;letter-spacing:2px;font-weight:600">KOOZA · ÜCRETSİZ REHBER</div>
        <div style="font-size:24px;font-weight:800;line-height:1.2">${guide.title}</div>
      </div>

      <div style="background:white;padding:32px 28px;border:1px solid #e5e7eb;border-top:none">
        <p style="color:#374151;font-size:16px;line-height:1.6">Merhaba <strong>${name}</strong>,</p>
        <p style="color:#6b7280;font-size:15px;line-height:1.6">${guide.intro}</p>

        ${guide.sections.map(s => `
          <h2 style="color:#714B67;font-size:22px;font-weight:800;margin-top:32px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #f3e8ee">${s.title}</h2>
          <ul style="padding-left:20px;margin:0;color:#374151;line-height:1.8">
            ${s.items.map(i => `<li style="margin:6px 0">${i}</li>`).join('')}
          </ul>
        `).join('')}

        <div style="margin-top:40px;padding:24px;background:linear-gradient(135deg,#f7f2f5,#fde2e6);border-radius:12px;text-align:center">
          <div style="font-size:18px;font-weight:700;color:#714B67;margin-bottom:8px">Bu rehberi uygulamak için kooza yanınızda</div>
          <div style="font-size:14px;color:#6b7280;margin-bottom:16px">Ücretsiz keşif görüşmesi · 30 dakika · Sıfır risk</div>
          <a href="https://kooza.tr/iletisim" style="display:inline-block;padding:14px 28px;background:#714B67;color:white;text-decoration:none;border-radius:10px;font-weight:600">
            Görüşme Talep Et →
          </a>
        </div>

        <div style="margin-top:24px;font-size:12px;color:#9ca3af;text-align:center">
          kooza.tr · İşletmenin tek dijital partneri
        </div>
      </div>
    </div>
  `
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = rateLimit(`guide:${ip}`, { limit: LIMIT, windowMs: WINDOW })

  if (!rl.success) {
    return NextResponse.json(
      { error: 'Çok fazla istek. Lütfen 1 saat sonra tekrar deneyin.' },
      { status: 429, headers: rateLimitHeaders(rl, LIMIT) }
    )
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek' }, { status: 400 })
  }

  const { name, email, phone, company, sector } = body
  if (!name || !email || !sector) {
    return NextResponse.json({ error: 'Eksik alan' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Geçerli e-posta girin' }, { status: 400 })
  }
  if (!GUIDE_CONTENT[sector]) {
    return NextResponse.json({ error: 'Sektör bulunamadı' }, { status: 400 })
  }

  // Save to DB
  let savedId = ''
  try {
    const saved = await (prisma as any).guideDownload.create({
      data: { name, email, phone: phone || null, company: company || null, sector },
    })
    savedId = saved.id

    await prisma.lead.create({
      data: {
        type: 'CONTACT',
        name,
        email,
        phone: phone || null,
        company: company || null,
        message: `Sektörel rehber indirdi: ${SECTOR_NAMES[sector] || sector}`,
        source: 'guide-download',
        status: 'NEW',
        tags: ['rehber', sector],
      },
    }).catch((e) => console.warn('Lead create failed:', e))
  } catch (e) {
    console.error('DB save failed:', e)
  }

  // Send guide to user
  const html = buildGuideHtml(sector, name)
  sendEmail({
    to: email,
    subject: `📘 ${GUIDE_CONTENT[sector].title}`,
    html,
  }).catch((e) => console.warn('User email failed:', e))

  // Notify admin
  notifyAdmin(
    `📘 Yeni Rehber İndirme: ${SECTOR_NAMES[sector] || sector}`,
    `<div style="font-family:system-ui,sans-serif"><h2>${SECTOR_NAMES[sector]} rehberi indirildi</h2><p><strong>Kişi:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Telefon:</strong> ${phone || '-'}<br><strong>Şirket:</strong> ${company || '-'}<br><strong>Sektör:</strong> ${SECTOR_NAMES[sector]}</p></div>`
  ).catch((e) => console.warn('Admin email failed:', e))

  return NextResponse.json({ ok: true, id: savedId, sector: SECTOR_NAMES[sector] })
}
