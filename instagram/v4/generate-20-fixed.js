/**
 * kooza Instagram v4 — 20 PREMIUM post.
 * Tüm metinler PURE SVG TEXT (foreignObject YOK).
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const dir = __dirname
const W = 1080, H = 1080

const C = {
  mauve: '#714B67',
  mauveDark: '#3a2436',
  mauveDeep: '#251722',
  pink: '#FFC0CB',
  white: '#ffffff',
  cream: '#faf8f9',
  ink: '#0f0a0d',
  inkSoft: '#3a2436',
  gray: '#9ca3af',
}

// Logo lockup (sol üstte küçük)
function logo(x, y, color, accent) {
  return `
    <g transform="translate(${x}, ${y})">
      <circle cx="30" cy="30" r="28" fill="${color}"/>
      <circle cx="30" cy="30" r="11" fill="${color === '#ffffff' ? '#714B67' : '#faf8f9'}"/>
      <circle cx="80" cy="30" r="28" fill="none" stroke="${color}" stroke-width="11"/>
      <circle cx="113" cy="2" r="6" fill="${accent}"/>
      <text x="135" y="48" font-family="Arial Black, sans-serif" font-weight="900" font-size="44" fill="${color}">kooza</text>
    </g>
  `
}

// SVG <text> with auto multi-line. lines = array of strings
function multilineText(lines, x, startY, fontSize, color, anchor = 'start', lineHeight = 1.0, weight = 900, family = 'Arial Black, sans-serif', letterSpacing = -3) {
  return lines.map((line, i) => `
    <text x="${x}" y="${startY + i * fontSize * lineHeight}"
          font-family="${family}" font-weight="${weight}" font-size="${fontSize}"
          fill="${color}" text-anchor="${anchor}" letter-spacing="${letterSpacing}">${line}</text>
  `).join('')
}

// ─── TEMPLATE 1: HERO MAUVE (sol hizalı) ───
function tHero({ lines, subtitle, accent = C.pink }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${C.mauve}"/>
        <stop offset="100%" stop-color="${C.mauveDeep}"/>
      </linearGradient>
      <radialGradient id="gl1" cx="0.85" cy="0.15" r="0.55">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="gl2" cx="0.15" cy="0.85" r="0.5">
        <stop offset="0%" stop-color="#fde2e6" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#fde2e6" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#gl1)"/>
    <rect width="${W}" height="${H}" fill="url(#gl2)"/>
    ${logo(80, 80, C.white, accent)}
    ${multilineText(lines, 80, 470, 130, C.white, 'start', 1.05)}
    <line x1="80" y1="900" x2="200" y2="900" stroke="${accent}" stroke-width="3"/>
    <text x="80" y="950" font-family="Arial, sans-serif" font-weight="500" font-size="26" fill="${C.white}" opacity="0.85">${subtitle}</text>
    <text x="80" y="1020" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="${accent}">kooza.tr · @kooza</text>
  </svg>`
}

// ─── TEMPLATE 2: MINIMAL CREAM (Apple stili) ───
function tMinimal({ lines, subtitle }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <radialGradient id="g" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="${C.mauve}" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="${C.mauve}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="${C.cream}"/>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    ${logo(80, 80, C.ink, C.mauve)}
    ${multilineText(lines, 80, 470, 130, C.ink, 'start', 1.05)}
    <line x1="80" y1="900" x2="200" y2="900" stroke="${C.mauve}" stroke-width="3"/>
    <text x="80" y="950" font-family="Arial, sans-serif" font-weight="500" font-size="26" fill="${C.gray}">${subtitle}</text>
    <text x="80" y="1020" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="${C.mauve}">kooza.tr · @kooza</text>
  </svg>`
}

// ─── TEMPLATE 3: CENTERED PREMIUM ───
function tCenter({ lines, subtitle, bgColor = C.mauveDeep, accent = C.pink, textColor = C.white }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <radialGradient id="g" cx="0.5" cy="0.5" r="0.6">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <g transform="translate(380, 130)">${logo(0, 0, textColor, accent).replace('translate(', 'translate(0,').replace('80,80', '0,0').replace('translate(0,80, 80', 'translate(0, 0')}</g>
    ${multilineText(lines, 540, 480, 110, textColor, 'middle', 1.05, 900, 'Arial Black, sans-serif', -4)}
    <line x1="450" y1="880" x2="630" y2="880" stroke="${accent}" stroke-width="3"/>
    <text x="540" y="940" font-family="Arial, sans-serif" font-weight="500" font-size="26" fill="${textColor}" opacity="0.85" text-anchor="middle">${subtitle}</text>
    <text x="540" y="1020" font-family="Arial, sans-serif" font-weight="700" font-size="18" fill="${accent}" text-anchor="middle">kooza.tr · Yazılım ve Danışmanlık</text>
  </svg>`
}

// ─── TEMPLATE 4: DARK CINEMATIC ───
function tDark({ lines, subtitle }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${C.ink}"/>
        <stop offset="100%" stop-color="${C.mauveDeep}"/>
      </linearGradient>
      <radialGradient id="gl" cx="0.85" cy="0.2" r="0.6">
        <stop offset="0%" stop-color="${C.mauve}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${C.mauve}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="gl2" cx="0.15" cy="0.8" r="0.5">
        <stop offset="0%" stop-color="${C.pink}" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="${C.pink}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#gl)"/>
    <rect width="${W}" height="${H}" fill="url(#gl2)"/>
    ${logo(80, 80, C.white, C.pink)}
    ${multilineText(lines, 80, 470, 130, C.white, 'start', 1.05)}
    <line x1="80" y1="900" x2="200" y2="900" stroke="${C.pink}" stroke-width="3"/>
    <text x="80" y="950" font-family="Arial, sans-serif" font-weight="500" font-size="26" fill="${C.white}" opacity="0.85">${subtitle}</text>
    <text x="80" y="1020" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="${C.pink}">kooza.tr · @kooza</text>
  </svg>`
}

// ─── TEMPLATE 5: SPLIT MANIFESTO ───
function tSplit({ topLines, bottomLines }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H/2}" fill="${C.mauve}"/>
    <rect y="${H/2}" width="${W}" height="${H/2}" fill="${C.cream}"/>
    ${logo(80, 80, C.white, C.pink)}
    ${multilineText(topLines, 80, 240, 78, C.white, 'start', 1.05)}
    <text x="80" y="640" font-family="Georgia, serif" font-style="italic" font-weight="500" font-size="36" fill="${C.inkSoft}">${bottomLines[0] || ''}</text>
    <text x="80" y="700" font-family="Georgia, serif" font-style="italic" font-weight="500" font-size="36" fill="${C.inkSoft}">${bottomLines[1] || ''}</text>
    <text x="80" y="760" font-family="Georgia, serif" font-style="italic" font-weight="500" font-size="36" fill="${C.inkSoft}">${bottomLines[2] || ''}</text>
    <text x="80" y="820" font-family="Georgia, serif" font-style="italic" font-weight="500" font-size="36" fill="${C.inkSoft}">${bottomLines[3] || ''}</text>
    <text x="80" y="880" font-family="Georgia, serif" font-style="italic" font-weight="500" font-size="36" fill="${C.inkSoft}">${bottomLines[4] || ''}</text>
    <text x="80" y="1020" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="${C.mauve}">kooza.tr · @kooza</text>
  </svg>`
}

// ─── 20 POSTS ─────────────────────────────────────────────
const posts = [
  // HERO MAUVE (5)
  { fn: 'k-01-yazilim-kaosu.svg', svg: tHero({ lines: ['Yazılım', 'kaosuna', 'son.'], subtitle: 'Tek platform · Tek partner · Tek fatura' }) },
  { fn: 'k-02-isinize-odaklanin.svg', svg: tHero({ lines: ['İşinize', 'odaklanın.'], subtitle: 'Gerisini biz halledelim.' }) },
  { fn: 'k-03-tek-karar.svg', svg: tHero({ lines: ['Tek karar.', 'Sonsuz fark.'], subtitle: '500+ KOBİ kooza\'yı seçti.' }) },
  { fn: 'k-04-yeni-nefes.svg', svg: tHero({ lines: ['Şirketinizin', 'yeni nefesi.'], subtitle: 'Web · Otomasyon · İK · Muhasebe' }) },
  { fn: 'k-05-buyume.svg', svg: tHero({ lines: ['Büyümeye', 'hazır mısınız?'], subtitle: 'kooza ile uçtan uca dijital dönüşüm.' }) },

  // MINIMAL CREAM (5)
  { fn: 'k-06-sade-guclu.svg', svg: tMinimal({ lines: ['Sade.', 'Güçlü.', 'kooza.'], subtitle: 'Türk KOBİ\'lerinin tek dijital partneri' }) },
  { fn: 'k-07-bir-tik.svg', svg: tMinimal({ lines: ['Geleceğiniz', 'bir tık ötede.'], subtitle: 'Ücretsiz olgunluk testi · 2 dakika' }) },
  { fn: 'k-08-turkiye.svg', svg: tMinimal({ lines: ['Türkiye için,', 'Türk\'ten.'], subtitle: 'KVKK · e-Fatura · 24/7 destek' }) },
  { fn: 'k-09-akilli-secim.svg', svg: tMinimal({ lines: ['KOBİ\'nin', 'akıllı seçimi.'], subtitle: '12 sektörel modül · 1 platform' }) },
  { fn: 'k-10-yarin-gec.svg', svg: tMinimal({ lines: ['Yarın çok geç', 'olabilir.'], subtitle: 'Dijitalleşmek artık zor değil.' }) },

  // CENTERED (5)
  { fn: 'k-11-tek-partner.svg', svg: tCenter({ lines: ['Tek partner.', 'Sonsuz çözüm.'], subtitle: 'Web sitenizden bordronuza, her şey kooza\'da.' }) },
  { fn: 'k-12-karmasa.svg', svg: tCenter({ lines: ['Karmaşa son.', 'Sadelik başlasın.'], subtitle: '5 ayrı yazılım yerine 1 platform.', bgColor: C.mauve }) },
  { fn: 'k-13-bugun-basla.svg', svg: tCenter({ lines: ['Bugün başla.', 'Yarın fark', 'yarat.'], subtitle: 'İlk 30 dakika ücretsiz görüşme.' }) },
  { fn: 'k-14-buyusun.svg', svg: tCenter({ lines: ['Şirketiniz', 'büyüsün.'], subtitle: 'Sistem otomatik yetişsin — kooza ile.', bgColor: C.ink, accent: C.pink }) },
  { fn: 'k-15-aklinizdaki.svg', svg: tCenter({ lines: ['Aklınızdaki', 'sistem.'], subtitle: 'kooza · Şirketinize özgü, herkese erişilebilir.', bgColor: C.mauveDeep }) },

  // DARK CINEMATIC (3)
  { fn: 'k-16-karmasiklik.svg', svg: tDark({ lines: ['Karmaşıklığa', 'elveda.'], subtitle: 'Sadeliğe merhaba. — kooza' }) },
  { fn: 'k-17-basari.svg', svg: tDark({ lines: ['Başarınızın', 'dijital adı.'], subtitle: '500+ KOBİ · 12 modül · 24/7 destek' }) },
  { fn: 'k-18-tasarruf.svg', svg: tDark({ lines: ['5 yazılım yerine', '1 partner.'], subtitle: 'Yıllık ortalama ~36.000 TL tasarruf.' }) },

  // SPLIT (2)
  { fn: 'k-19-is-ortagi.svg', svg: tSplit({
    topLines: ['Bir yazılım', 'tedarikçisi gibi değil,', 'bir iş ortağı gibi.'],
    bottomLines: [
      'Yazılım veriyoruz, sürecinizi yönetiyoruz,',
      'ekibinize eğitim sunuyoruz, sürekli',
      'yanınızdayız. Bir tedarikçi mesafesi',
      'değil, bir partner yakınlığı.',
      '— kooza Manifestomuz',
    ],
  }) },
  { fn: 'k-20-cozum.svg', svg: tSplit({
    topLines: ['Yazılım değil,', 'çözüm', 'sunuyoruz.'],
    bottomLines: [
      'Excel\'i bilen herkes yazılım yapabilir.',
      'Biz işinizin sorunlarını anlayıp gerçek',
      'çözümler tasarlıyoruz. Sektörünüze,',
      'ekibinize, hedeflerinize göre.',
      '— kooza',
    ],
  }) },
]

// ─── GENERATE ─────────────────────────────────────────────
async function run() {
  console.log(`🎨 ${posts.length} PREMIUM post (SVG text) üretiliyor...\n`)
  for (const p of posts) {
    const svgPath = path.join(dir, p.fn)
    const pngPath = svgPath.replace('.svg', '.png')
    fs.writeFileSync(svgPath, p.svg)
    try {
      await sharp(Buffer.from(p.svg), { density: 300 })
        .resize(W, H, { fit: 'contain', background: '#fff' })
        .png({ quality: 100 })
        .toFile(pngPath)
      const kb = (fs.statSync(pngPath).size / 1024).toFixed(0)
      console.log(`  ✅ ${p.fn.replace('.svg', '.png')} (${kb} KB)`)
    } catch (e) {
      console.error(`  ❌ ${p.fn}: ${e.message.split('\n')[0]}`)
    }
  }
  console.log(`\n🎉 ${posts.length} premium post hazır!`)
}

run()
