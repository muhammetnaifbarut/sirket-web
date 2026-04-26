/**
 * kooza Instagram — 20 PREMIUM tanıtım postu.
 * Apple/Stripe seviyesinde estetik, etkili sloganlar.
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
  pinkSoft: '#fde2e6',
  white: '#ffffff',
  cream: '#faf8f9',
  ink: '#0f0a0d',
  inkSoft: '#3a2436',
  gray: '#9ca3af',
}

// Logo (mark only, scaled)
function logoMark(cx, cy, size, color, innerColor, accentColor) {
  return `
    <g transform="translate(${cx}, ${cy})">
      <circle cx="${-size}" cy="0" r="${size}" fill="${color}"/>
      <circle cx="${-size}" cy="0" r="${size*0.4}" fill="${innerColor}"/>
      <circle cx="${size + 8}" cy="0" r="${size}" fill="none" stroke="${color}" stroke-width="${size*0.36}"/>
      <circle cx="${size*2 + 16}" cy="${-size*0.85}" r="${size*0.2}" fill="${accentColor}"/>
    </g>
  `
}

function logoLockup(x, y, size, color, innerColor, accentColor) {
  return `
    <g transform="translate(${x}, ${y})">
      ${logoMark(size, size*0.3, size*0.6, color, innerColor, accentColor)}
      <text x="${size*3.5}" y="${size*0.55}" font-family="Arial Black, sans-serif" font-weight="900" font-size="${size*1.05}" fill="${color}" letter-spacing="-1">kooza</text>
    </g>
  `
}

// Decorative circles for cinematic feel
function bgGlow(color, x, y, r, opacity = 0.18) {
  const id = `glow_${Math.random().toString(36).slice(2)}`
  return `
    <defs>
      <radialGradient id="${id}" cx="${x}" cy="${y}" r="${r}">
        <stop offset="0%" stop-color="${color}" stop-opacity="${opacity}"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#${id})"/>
  `
}

// Bg gradients
function bgGradient(id, c1, c2) {
  return `
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
  `
}

// ─── TEMPLATE 1: HERO MAUVE — Premium tagline (Stripe/Linear stili) ───
function tHero({ slogan, subtitle, accent = C.pink }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${bgGradient('g', C.mauve, C.mauveDeep)}
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    ${bgGlow(accent, '0.85', '0.15', '0.55', 0.2)}
    ${bgGlow(C.pinkSoft, '0.15', '0.85', '0.5', 0.12)}
    ${logoLockup(80, 80, 30, C.white, C.mauve, accent)}
    <foreignObject x="80" y="380" width="920" height="500">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Arial Black',sans-serif;font-weight:900;font-size:130px;color:${C.white};line-height:0.98;letter-spacing:-5px;text-align:left">
        ${slogan}
      </div>
    </foreignObject>
    <line x1="80" y1="900" x2="200" y2="900" stroke="${accent}" stroke-width="3"/>
    <text x="80" y="950" font-family="Arial, sans-serif" font-weight="500" font-size="26" fill="${C.white}" opacity="0.85">${subtitle}</text>
    <text x="80" y="1020" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="${accent}">kooza.tr · @kooza</text>
  </svg>`
}

// ─── TEMPLATE 2: MINIMAL WHITE — Apple stili sade ───
function tMinimal({ slogan, subtitle }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${C.cream}"/>
    ${bgGlow(C.mauve, '0.5', '0.5', '0.4', 0.04)}
    ${logoLockup(80, 80, 28, C.ink, C.cream, C.mauve)}
    <foreignObject x="80" y="380" width="920" height="500">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Arial Black',sans-serif;font-weight:900;font-size:130px;color:${C.ink};line-height:0.98;letter-spacing:-5px;text-align:left">
        ${slogan}
      </div>
    </foreignObject>
    <line x1="80" y1="900" x2="200" y2="900" stroke="${C.mauve}" stroke-width="3"/>
    <text x="80" y="950" font-family="Arial, sans-serif" font-weight="500" font-size="26" fill="${C.gray}">${subtitle}</text>
    <text x="80" y="1020" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="${C.mauve}">kooza.tr · @kooza</text>
  </svg>`
}

// ─── TEMPLATE 3: CENTER ALIGNED — Symmetric premium ───
function tCenter({ slogan, subtitle, bgColor = C.mauveDeep, accent = C.pink, textColor = C.white }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    ${bgGlow(accent, '0.5', '0.5', '0.6', 0.18)}
    ${logoLockup(380, 130, 30, textColor, bgColor, accent)}
    <foreignObject x="60" y="420" width="960" height="400">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Arial Black',sans-serif;font-weight:900;font-size:120px;color:${textColor};line-height:1.0;letter-spacing:-4px;text-align:center">
        ${slogan}
      </div>
    </foreignObject>
    <line x1="450" y1="870" x2="630" y2="870" stroke="${accent}" stroke-width="3"/>
    <text x="540" y="930" font-family="Arial, sans-serif" font-weight="500" font-size="26" fill="${textColor}" opacity="0.85" text-anchor="middle">${subtitle}</text>
    <text x="540" y="1020" font-family="Arial, sans-serif" font-weight="700" font-size="18" fill="${accent}" text-anchor="middle">kooza.tr · Yazılım ve Danışmanlık</text>
  </svg>`
}

// ─── TEMPLATE 4: SPLIT — Quote + brand ───
function tSplit({ slogan, supporting }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H/2}" fill="${C.mauve}"/>
    <rect y="${H/2}" width="${W}" height="${H/2}" fill="${C.cream}"/>
    ${logoLockup(80, 80, 30, C.white, C.mauve, C.pink)}
    <foreignObject x="80" y="200" width="920" height="280">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Arial Black',sans-serif;font-weight:900;font-size:88px;color:${C.white};line-height:1.05;letter-spacing:-3px">
        ${slogan}
      </div>
    </foreignObject>
    <foreignObject x="80" y="640" width="920" height="320">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Georgia,serif;font-style:italic;font-weight:500;font-size:42px;color:${C.inkSoft};line-height:1.35">
        ${supporting}
      </div>
    </foreignObject>
    <text x="80" y="1020" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="${C.mauve}">kooza.tr · @kooza</text>
  </svg>`
}

// ─── TEMPLATE 5: DARK CINEMATIC — Premium dark ───
function tDark({ slogan, subtitle }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${bgGradient('g', C.ink, C.mauveDeep)}
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    ${bgGlow(C.mauve, '0.85', '0.2', '0.6', 0.4)}
    ${bgGlow(C.pink, '0.15', '0.8', '0.5', 0.15)}
    ${logoLockup(80, 80, 30, C.white, C.ink, C.pink)}
    <foreignObject x="80" y="380" width="920" height="500">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Arial Black',sans-serif;font-weight:900;font-size:130px;color:${C.white};line-height:0.98;letter-spacing:-5px;text-align:left">
        ${slogan}
      </div>
    </foreignObject>
    <line x1="80" y1="900" x2="200" y2="900" stroke="${C.pink}" stroke-width="3"/>
    <text x="80" y="950" font-family="Arial, sans-serif" font-weight="500" font-size="26" fill="${C.white}" opacity="0.85">${subtitle}</text>
    <text x="80" y="1020" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="${C.pink}">kooza.tr · @kooza</text>
  </svg>`
}

// ─── 20 POSTS WITH POWERFUL SLOGANS ───────────────────────
const posts = [
  // Premium hero (mauve gradient) — En güçlü sloganlar
  { fn: 'k-01.svg', svg: tHero({
    slogan: 'Yazılım kaosuna<br/>son.',
    subtitle: 'Tek platform · Tek partner · Tek fatura',
  })},
  { fn: 'k-02.svg', svg: tHero({
    slogan: 'İşinize<br/>odaklanın.',
    subtitle: 'Gerisini biz halledelim.',
  })},
  { fn: 'k-03.svg', svg: tHero({
    slogan: 'Tek karar.<br/>Sonsuz fark.',
    subtitle: '500+ KOBİ kooza\'yı seçti.',
  })},
  { fn: 'k-04.svg', svg: tHero({
    slogan: 'Şirketinizin<br/>yeni nefesi.',
    subtitle: 'Web · Otomasyon · İK · Muhasebe · Danışmanlık',
  })},
  { fn: 'k-05.svg', svg: tHero({
    slogan: 'Büyümeye<br/>hazır mısınız?',
    subtitle: 'kooza ile uçtan uca dijital dönüşüm.',
  })},

  // Minimal cream (Apple stili)
  { fn: 'k-06.svg', svg: tMinimal({
    slogan: 'Sade.<br/>Güçlü.<br/>kooza.',
    subtitle: 'Türk KOBİ\'lerinin tek dijital partneri',
  })},
  { fn: 'k-07.svg', svg: tMinimal({
    slogan: 'Geleceğiniz<br/>bir tık ötede.',
    subtitle: 'Ücretsiz dijital olgunluk testi · 2 dakika',
  })},
  { fn: 'k-08.svg', svg: tMinimal({
    slogan: 'Türkiye için,<br/>Türk\'ten.',
    subtitle: 'KVKK · e-Fatura · GİB · Türkçe destek 24/7',
  })},
  { fn: 'k-09.svg', svg: tMinimal({
    slogan: 'KOBİ\'nin<br/>akıllı seçimi.',
    subtitle: '12 sektörel modül · 1 platform',
  })},

  // Centered (premium symmetric)
  { fn: 'k-10.svg', svg: tCenter({
    slogan: 'Tek partner.<br/>Sonsuz çözüm.',
    subtitle: 'Web sitenizden bordronuza, her şey kooza\'da.',
  })},
  { fn: 'k-11.svg', svg: tCenter({
    slogan: 'Karmaşa son.<br/>Sadelik başlasın.',
    subtitle: '5 ayrı yazılım yerine 1 platform.',
    bgColor: C.mauve,
  })},
  { fn: 'k-12.svg', svg: tCenter({
    slogan: 'Bugün başla.<br/>Yarın fark yarat.',
    subtitle: 'İlk 30 dakika ücretsiz görüşme.',
  })},
  { fn: 'k-13.svg', svg: tCenter({
    slogan: 'Şirketiniz<br/>büyüsün.',
    subtitle: 'Sistem otomatik yetişsin — kooza ile.',
    bgColor: C.ink,
    accent: C.pink,
  })},

  // Split (top color + bottom cream)
  { fn: 'k-14.svg', svg: tSplit({
    slogan: 'Bir yazılım<br/>tedarikçisi gibi değil,<br/>bir iş ortağı gibi.',
    supporting: 'Yazılım veriyoruz, sürecinizi yönetiyoruz, ekibinize eğitim sunuyoruz, sürekli yanınızdayız. Bir tedarikçi mesafesi değil, bir partner yakınlığı.',
  })},
  { fn: 'k-15.svg', svg: tSplit({
    slogan: 'Yazılım değil,<br/>çözüm sunuyoruz.',
    supporting: 'Excel\'i bilen herkes yazılım yapabilir. Biz işinizin sorunlarını anlayıp gerçek çözümler tasarlıyoruz. Sektörünüze, ekibinize, hedeflerinize göre.',
  })},

  // Dark cinematic (premium black)
  { fn: 'k-16.svg', svg: tDark({
    slogan: 'Karmaşıklığa<br/>elveda.',
    subtitle: 'Sadeliğe merhaba. — kooza',
  })},
  { fn: 'k-17.svg', svg: tDark({
    slogan: 'Başarınızın<br/>dijital adı.',
    subtitle: '500+ KOBİ · 12 sektörel modül · 24/7 destek',
  })},
  { fn: 'k-18.svg', svg: tDark({
    slogan: 'Yarın çok geç<br/>olabilir.',
    subtitle: 'Dijitalleşmek artık zor değil. kooza yanınızda.',
  })},
  { fn: 'k-19.svg', svg: tDark({
    slogan: '5 yazılım yerine<br/>1 partner.',
    subtitle: 'Yıllık ortalama ~36.000 TL tasarruf.',
  })},
  { fn: 'k-20.svg', svg: tDark({
    slogan: 'kooza.<br/>Aklınızdaki<br/>sistem.',
    subtitle: 'Şirketinize özgü, herkese erişilebilir.',
  })},
]

// ─── GENERATE ─────────────────────────────────────────────
async function run() {
  console.log(`🎨 ${posts.length} PREMIUM post üretiliyor...\n`)
  for (const p of posts) {
    const svgPath = path.join(dir, p.fn)
    const pngPath = svgPath.replace('.svg', '.png')
    fs.writeFileSync(svgPath, p.svg)
    try {
      await sharp(Buffer.from(p.svg), { density: 300 }).resize(W, H, { fit: 'contain', background: '#fff' }).png({ quality: 100 }).toFile(pngPath)
      const kb = (fs.statSync(pngPath).size / 1024).toFixed(0)
      console.log(`  ✅ ${p.fn.replace('.svg', '.png')} (${kb} KB)`)
    } catch (e) {
      console.error(`  ❌ ${p.fn}: ${e.message.split('\n')[0]}`)
    }
  }
  console.log(`\n🎉 ${posts.length} premium post hazır!`)
  console.log(`📁 ${dir}`)
}

run()
