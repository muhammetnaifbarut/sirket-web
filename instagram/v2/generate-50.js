/**
 * kooza Instagram — 50 etkileyici post üretici
 * 10 farklı tasarım stili, her stilden 5 varyant.
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const dir = __dirname
const W = 1080, H = 1080

// ─── KOOZA BRAND TOKENS ──────────────────────────────────
const C = {
  mauve: '#714B67',
  mauveDark: '#3a2436',
  mauveLight: '#a384a0',
  pink: '#FFC0CB',
  white: '#ffffff',
  black: '#0f172a',
  cream: '#fafafa',
  ink: '#1f2937',
  gray: '#6b7280',
  red: '#dc2626',
  orange: '#ea580c',
  green: '#16a34a',
  blue: '#2563eb',
  indigo: '#4f46e5',
  cyan: '#0891b2',
  yellow: '#ca8a04',
}

// ─── LOGO COMPONENTS ─────────────────────────────────────
function logoMark(x, y, size, fillColor, strokeColor, accentColor) {
  const r = size
  return `
    <g transform="translate(${x}, ${y})">
      <circle cx="${-r/2}" cy="0" r="${r}" fill="${fillColor}"/>
      <circle cx="${-r/2}" cy="0" r="${r*0.4}" fill="${strokeColor}"/>
      <circle cx="${r/2 + 5}" cy="0" r="${r}" fill="none" stroke="${fillColor}" stroke-width="${r*0.35}"/>
      <circle cx="${r*1.5 + 12}" cy="${-r*0.85}" r="${r*0.18}" fill="${accentColor}"/>
    </g>
  `
}

function logoFull(x, y, scale, color, bgColor, accentColor) {
  return `
    <g transform="translate(${x}, ${y}) scale(${scale})">
      ${logoMark(0, 0, 28, color, bgColor, accentColor)}
      <text x="60" y="20" font-family="Arial Black, sans-serif" font-weight="900" font-size="44" fill="${color}">kooza</text>
    </g>
  `
}

function footer(text, color = C.mauve) {
  return `<text x="540" y="1020" font-family="Arial, sans-serif" font-weight="600" font-size="18" fill="${color}" text-anchor="middle" opacity="0.7">${text}</text>`
}

// ─── DESIGN STYLES ───────────────────────────────────────

// STYLE 1: Bold solid color + huge type (HOOK posts)
function s1_hook({ filename, hook, subtitle, bgColor, textColor = C.white, accentColor = C.pink }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    ${logoFull(80, 80, 1.0, textColor, bgColor, accentColor)}
    <text x="540" y="380" font-family="Arial, sans-serif" font-weight="700" font-size="32" fill="${textColor}" fill-opacity="0.7" text-anchor="middle" letter-spacing="3">SORU</text>
    <foreignObject x="80" y="430" width="920" height="400">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial Black,sans-serif;font-weight:900;font-size:88px;color:${textColor};line-height:1.05;text-align:center;letter-spacing:-3px">
        ${hook}
      </div>
    </foreignObject>
    <text x="540" y="900" font-family="Arial, sans-serif" font-weight="500" font-size="28" fill="${accentColor}" text-anchor="middle">${subtitle}</text>
    ${footer('@kooza · kooza.tr', textColor)}
  </svg>`
}

// STYLE 2: Big number / stat reveal
function s2_stat({ filename, number, label, context, bgColor = C.cream, accentColor = C.mauve }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    <radialGradient id="g" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
    </radialGradient>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    ${logoFull(80, 80, 0.9, C.ink, bgColor, accentColor)}
    <text x="540" y="280" font-family="Arial, sans-serif" font-weight="700" font-size="22" fill="${accentColor}" text-anchor="middle" letter-spacing="4">${context}</text>
    <text x="540" y="700" font-family="Arial Black, sans-serif" font-weight="900" font-size="380" fill="${accentColor}" text-anchor="middle" letter-spacing="-15">${number}</text>
    <text x="540" y="820" font-family="Arial, sans-serif" font-weight="700" font-size="44" fill="${C.ink}" text-anchor="middle">${label}</text>
    ${footer('kooza.tr · Yazılım ve Danışmanlık')}
  </svg>`
}

// STYLE 3: Quote / Manifesto (cinematic dark)
function s3_quote({ filename, quote, attribution = '— kooza Manifestomuz', bgColor = C.black, accentColor = C.mauve }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    <radialGradient id="g" cx="0.5" cy="0.5" r="0.6"><stop offset="0%" stop-color="${accentColor}" stop-opacity="0.3"/><stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/></radialGradient>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <text x="540" y="370" font-family="Georgia, serif" font-weight="900" font-size="280" fill="${accentColor}" text-anchor="middle" opacity="0.5">"</text>
    <foreignObject x="80" y="450" width="920" height="350">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Georgia,serif;font-style:italic;font-weight:600;font-size:60px;color:${C.white};line-height:1.25;text-align:center">
        ${quote}
      </div>
    </foreignObject>
    <line x1="450" y1="850" x2="630" y2="850" stroke="${C.pink}" stroke-width="2"/>
    <text x="540" y="900" font-family="Arial, sans-serif" font-weight="600" font-size="22" fill="${C.pink}" text-anchor="middle">${attribution}</text>
    ${footer('kooza.tr', C.white)}
  </svg>`
}

// STYLE 4: Icon + Headline + 3 bullets
function s4_solution({ filename, icon, title, bullets, bgColor = C.mauve, textColor = C.white, accentColor = C.pink }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    ${logoFull(80, 80, 1.0, textColor, bgColor, accentColor)}
    <text x="540" y="270" font-family="Arial, sans-serif" font-size="120" text-anchor="middle">${icon}</text>
    <text x="540" y="400" font-family="Arial Black, sans-serif" font-weight="900" font-size="68" fill="${textColor}" text-anchor="middle" letter-spacing="-2">${title}</text>
    ${bullets.map((b, i) => `
      <g transform="translate(540, ${500 + i*120})">
        <text x="-360" y="0" font-family="Arial, sans-serif" font-weight="700" font-size="32" fill="${accentColor}">✓</text>
        <text x="-310" y="0" font-family="Arial, sans-serif" font-weight="600" font-size="32" fill="${textColor}">${b}</text>
      </g>
    `).join('')}
    <g transform="translate(540, 940)">
      <rect x="-220" y="-40" width="440" height="80" rx="40" fill="${accentColor}"/>
      <text x="0" y="13" font-family="Arial Black, sans-serif" font-weight="900" font-size="28" fill="${C.mauve}" text-anchor="middle">kooza.tr</text>
    </g>
  </svg>`
}

// STYLE 5: Versus / Comparison split
function s5_vs({ filename, leftLabel, leftItems, rightLabel, rightItems, bigOutcome, bgColor = C.cream }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="540" height="${H}" fill="#fef2f2"/>
    <rect x="540" width="540" height="${H}" fill="#f0fdf4"/>
    ${logoFull(540 - 105, 70, 0.85, C.ink, bgColor, C.pink)}
    <g transform="translate(270, 200)"><rect x="-100" y="-30" width="200" height="50" rx="25" fill="${C.red}"/><text x="0" y="6" font-family="Arial, sans-serif" font-weight="800" font-size="20" fill="${C.white}" text-anchor="middle">${leftLabel}</text></g>
    <g transform="translate(810, 200)"><rect x="-100" y="-30" width="200" height="50" rx="25" fill="${C.green}"/><text x="0" y="6" font-family="Arial, sans-serif" font-weight="800" font-size="20" fill="${C.white}" text-anchor="middle">${rightLabel}</text></g>
    ${leftItems.map((t, i) => `<text x="40" y="${320 + i*70}" font-family="Arial, sans-serif" font-weight="600" font-size="24" fill="#7f1d1d">${t}</text>`).join('')}
    ${rightItems.map((t, i) => `<text x="580" y="${320 + i*70}" font-family="Arial, sans-serif" font-weight="600" font-size="24" fill="#14532d">${t}</text>`).join('')}
    <g transform="translate(540, 920)">
      <rect x="-460" y="-50" width="920" height="100" rx="20" fill="${C.mauve}"/>
      <text x="0" y="-10" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="${C.white}" text-anchor="middle" letter-spacing="2">SONUÇ</text>
      <text x="0" y="35" font-family="Arial Black, sans-serif" font-weight="900" font-size="44" fill="${C.pink}" text-anchor="middle">${bigOutcome}</text>
    </g>
    ${footer('kooza.tr')}
  </svg>`
}

// STYLE 6: Did You Know? (clean info card)
function s6_didyouknow({ filename, fact, source, bgColor = C.cream, accentColor = C.mauve }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    ${logoFull(80, 80, 0.9, C.ink, bgColor, C.pink)}
    <g transform="translate(540, 280)">
      <rect x="-200" y="-30" width="400" height="60" rx="30" fill="${accentColor}"/>
      <text x="0" y="10" font-family="Arial, sans-serif" font-weight="800" font-size="22" fill="${C.white}" text-anchor="middle" letter-spacing="2">💡 BİLİYOR MUYDUNUZ?</text>
    </g>
    <foreignObject x="80" y="380" width="920" height="500">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;font-weight:700;font-size:54px;color:${C.ink};line-height:1.3;text-align:center">
        ${fact}
      </div>
    </foreignObject>
    <text x="540" y="940" font-family="Arial, sans-serif" font-weight="500" font-size="20" fill="${C.gray}" text-anchor="middle" font-style="italic">${source}</text>
    ${footer('@kooza · kooza.tr')}
  </svg>`
}

// STYLE 7: Bold tagline (premium black/white)
function s7_tagline({ filename, line1, line2, line3, bgColor = C.black, accentColor = C.pink }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    <radialGradient id="g" cx="0.5" cy="0.3" r="0.7"><stop offset="0%" stop-color="${C.mauve}" stop-opacity="0.35"/><stop offset="100%" stop-color="${C.mauve}" stop-opacity="0"/></radialGradient>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    ${logoFull(80, 80, 1.0, C.white, bgColor, accentColor)}
    <text x="540" y="500" font-family="Arial Black, sans-serif" font-weight="900" font-size="100" fill="${C.white}" text-anchor="middle" letter-spacing="-3">${line1}</text>
    <text x="540" y="610" font-family="Arial Black, sans-serif" font-weight="900" font-size="100" fill="${accentColor}" text-anchor="middle" letter-spacing="-3">${line2}</text>
    <text x="540" y="720" font-family="Arial Black, sans-serif" font-weight="900" font-size="100" fill="${C.white}" text-anchor="middle" letter-spacing="-3">${line3}</text>
    <line x1="450" y1="820" x2="630" y2="820" stroke="${accentColor}" stroke-width="2"/>
    <text x="540" y="880" font-family="Arial, sans-serif" font-weight="500" font-size="26" fill="${C.white}" text-anchor="middle" opacity="0.7">Türk KOBİ'lerinin tek dijital partneri</text>
    ${footer('kooza.tr · Yazılım ve Danışmanlık', C.white)}
  </svg>`
}

// STYLE 8: Step process (3 steps with arrows)
function s8_process({ filename, title, steps, bgColor = C.mauve, textColor = C.white, accentColor = C.pink }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    ${logoFull(80, 80, 1.0, textColor, bgColor, accentColor)}
    <text x="540" y="280" font-family="Arial Black, sans-serif" font-weight="900" font-size="60" fill="${textColor}" text-anchor="middle" letter-spacing="-2">${title}</text>
    ${steps.map((s, i) => `
      <g transform="translate(80, ${380 + i*180})">
        <rect width="920" height="150" rx="20" fill="${C.white}" fill-opacity="0.1"/>
        <circle cx="80" cy="75" r="42" fill="${accentColor}"/>
        <text x="80" y="92" font-family="Arial Black, sans-serif" font-weight="900" font-size="48" fill="${C.mauve}" text-anchor="middle">${i+1}</text>
        <text x="160" y="60" font-family="Arial, sans-serif" font-weight="800" font-size="34" fill="${textColor}">${s.title}</text>
        <text x="160" y="100" font-family="Arial, sans-serif" font-weight="500" font-size="22" fill="${textColor}" fill-opacity="0.75">${s.subtitle}</text>
      </g>
    `).join('')}
    ${footer('kooza.tr', textColor)}
  </svg>`
}

// STYLE 9: Single icon spotlight
function s9_spotlight({ filename, icon, title, subtitle, bgColor = C.mauve, accentColor = C.pink }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    <radialGradient id="g" cx="0.5" cy="0.4" r="0.5"><stop offset="0%" stop-color="${accentColor}" stop-opacity="0.25"/><stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/></radialGradient>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    ${logoFull(80, 80, 1.0, C.white, bgColor, accentColor)}
    <circle cx="540" cy="450" r="170" fill="${C.white}" fill-opacity="0.1"/>
    <text x="540" y="510" font-family="Arial, sans-serif" font-size="200" text-anchor="middle">${icon}</text>
    <text x="540" y="730" font-family="Arial Black, sans-serif" font-weight="900" font-size="76" fill="${C.white}" text-anchor="middle" letter-spacing="-2">${title}</text>
    <text x="540" y="800" font-family="Arial, sans-serif" font-weight="500" font-size="32" fill="${accentColor}" text-anchor="middle">${subtitle}</text>
    ${footer('kooza.tr · Tek partnerden uçtan uca', C.white)}
  </svg>`
}

// STYLE 10: List of services (clean grid)
function s10_grid({ filename, title, items, bgColor = C.cream }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    ${logoFull(80, 70, 0.9, C.ink, bgColor, C.pink)}
    <text x="540" y="220" font-family="Arial, sans-serif" font-weight="700" font-size="22" fill="${C.mauve}" text-anchor="middle" letter-spacing="3">HİZMETLERİMİZ</text>
    <text x="540" y="310" font-family="Arial Black, sans-serif" font-weight="900" font-size="68" fill="${C.ink}" text-anchor="middle" letter-spacing="-2">${title}</text>
    ${items.map((item, i) => {
      const col = i % 2
      const row = Math.floor(i / 2)
      return `
        <g transform="translate(${80 + col*460}, ${400 + row*130})">
          <rect width="440" height="110" rx="16" fill="${item.color}"/>
          <text x="30" y="50" font-size="36">${item.icon}</text>
          <text x="80" y="50" font-family="Arial, sans-serif" font-weight="800" font-size="24" fill="${C.white}">${item.title}</text>
          <text x="30" y="90" font-family="Arial, sans-serif" font-weight="500" font-size="16" fill="${C.white}" fill-opacity="0.85">${item.desc}</text>
        </g>
      `
    }).join('')}
    ${footer('kooza.tr · 12 modül, tek platform')}
  </svg>`
}

// ─── 50 POST CONFIGS ─────────────────────────────────────
const posts = [
  // ═══ HOOK soruları (10) ═══
  { fn: 'v2-01-hook.svg', svg: s1_hook({ hook: '5 farklı yazılıma para vermekten yoruldun mu?', subtitle: 'Sen yalnız değilsin · KOBİ\'lerin %78\'i aynı durumda', bgColor: C.mauve }) },
  { fn: 'v2-02-hook.svg', svg: s1_hook({ hook: 'Müşteri verisi 3 ayrı yerde mi duruyor?', subtitle: 'Birleştirme zamanı · kooza ile tek panel', bgColor: C.indigo }) },
  { fn: 'v2-03-hook.svg', svg: s1_hook({ hook: 'Web siten Google\'da 5. sayfada mı?', subtitle: 'Modern siteyle ilk sayfaya çıkalım', bgColor: C.cyan }) },
  { fn: 'v2-04-hook.svg', svg: s1_hook({ hook: 'Bordro ay sonu kabusun mu?', subtitle: 'SGK + GV + AGİ — tek tıkla, sıfır hata', bgColor: C.green }) },
  { fn: 'v2-05-hook.svg', svg: s1_hook({ hook: 'Stok kayıpların aylık ne kadar?', subtitle: 'Ortalama bir KOBİ\'de %5 ciro kayıp', bgColor: C.orange }) },
  { fn: 'v2-06-hook.svg', svg: s1_hook({ hook: 'Form geliyor — sen 3 saat sonra mı görüyorsun?', subtitle: 'CRM otomatik bildirim, anında yakala', bgColor: C.red }) },
  { fn: 'v2-07-hook.svg', svg: s1_hook({ hook: 'Müşteri 2. kez gelmiyor mu?', subtitle: 'Sadakat programı + otomatik SMS — geri kazan', bgColor: '#7c3aed' }) },
  { fn: 'v2-08-hook.svg', svg: s1_hook({ hook: 'Personel izinlerini hala WhatsApp\'tan mı yönetiyorsun?', subtitle: 'Modern İK = self-servis portal', bgColor: '#0e7490' }) },
  { fn: 'v2-09-hook.svg', svg: s1_hook({ hook: 'e-Fatura gönderirken hata mı alıyorsun?', subtitle: 'GİB tam entegre — tek tıkla yollanır', bgColor: '#059669' }) },
  { fn: 'v2-10-hook.svg', svg: s1_hook({ hook: 'Şirketin dijital olarak ne kadar hazır?', subtitle: '2 dakikada öğren · Ücretsiz olgunluk testi', bgColor: C.mauveDark }) },

  // ═══ STAT/NUMBER (8) ═══
  { fn: 'v2-11-stat.svg', svg: s2_stat({ number: '500+', label: 'Aktif KOBİ kullanıyor', context: 'GÜVEN', accentColor: C.mauve }) },
  { fn: 'v2-12-stat.svg', svg: s2_stat({ number: '12', label: 'Sektörel modül, tek platformda', context: 'KAPSAM', accentColor: C.indigo }) },
  { fn: 'v2-13-stat.svg', svg: s2_stat({ number: '%98.7', label: 'Müşteri memnuniyeti', context: 'KALİTE', accentColor: C.green }) },
  { fn: 'v2-14-stat.svg', svg: s2_stat({ number: '24/7', label: 'Türkçe canlı destek', context: 'YANINIZDAYIZ', accentColor: C.cyan }) },
  { fn: 'v2-15-stat.svg', svg: s2_stat({ number: '36K', label: 'TL yıllık ortalama tasarruf', context: 'KÂRLILIK', accentColor: C.orange }) },
  { fn: 'v2-16-stat.svg', svg: s2_stat({ number: '5 dk', label: 'Ortalama ilk kurulum süresi', context: 'HIZ', accentColor: C.red }) },
  { fn: 'v2-17-stat.svg', svg: s2_stat({ number: '%55', label: 'Stok kaybı azalması', context: 'SONUÇ', accentColor: '#16a34a' }) },
  { fn: 'v2-18-stat.svg', svg: s2_stat({ number: '+%32', label: 'Tahsilat oranı artışı', context: 'GELİR', accentColor: '#7c3aed' }) },

  // ═══ QUOTE/MANIFESTO (6) ═══
  { fn: 'v2-19-quote.svg', svg: s3_quote({ quote: 'Bir yazılım tedarikçisi gibi değil,<br/>bir iş ortağı gibi.' }) },
  { fn: 'v2-20-quote.svg', svg: s3_quote({ quote: '5 farklı yazılıma para vermenin<br/>çağı bitti.' }) },
  { fn: 'v2-21-quote.svg', svg: s3_quote({ quote: 'Siz işinize odaklanın,<br/>gerisini biz halledelim.' }) },
  { fn: 'v2-22-quote.svg', svg: s3_quote({ quote: 'Türk KOBİ\'sinin dilinden anlayan,<br/>Türk için kurgulanmış.' }) },
  { fn: 'v2-23-quote.svg', svg: s3_quote({ quote: 'Karmaşık özellik bombardımanı değil,<br/>gerçekten kullanılan modüller.' }) },
  { fn: 'v2-24-quote.svg', svg: s3_quote({ quote: 'Yazılım vermiyoruz,<br/>dijital dönüşümünüze ortak oluyoruz.' }) },

  // ═══ SOLUTION SHOWCASE (5) ═══
  { fn: 'v2-25-sol.svg', svg: s4_solution({ icon: '🌐', title: 'Modern Web Sitesi', bullets: ['Mobil uyumlu, 90+ PageSpeed', 'Admin\'den her şey yönetilebilir', 'SEO + form → CRM otomatik'], bgColor: C.mauve }) },
  { fn: 'v2-26-sol.svg', svg: s4_solution({ icon: '🤖', title: 'Sektörel Otomasyon', bullets: ['12 sektör için hazır paketler', 'Türk mevzuatı entegre', 'Kurulum 3-7 gün, eğitim dahil'], bgColor: C.indigo }) },
  { fn: 'v2-27-sol.svg', svg: s4_solution({ icon: '👥', title: 'İnsan Kaynakları', bullets: ['Bordro, izin, performans', 'Self-servis çalışan portalı', 'PDKS entegre, KVKK uyumlu'], bgColor: C.cyan }) },
  { fn: 'v2-28-sol.svg', svg: s4_solution({ icon: '💼', title: 'CRM + Muhasebe', bullets: ['e-Fatura, e-Arşiv otomatik', 'Müşteri pipeline + teklif', 'Pazarlama otomasyonu dahil'], bgColor: C.green }) },
  { fn: 'v2-29-sol.svg', svg: s4_solution({ icon: '💡', title: 'Dijital Dönüşüm Danışmanlık', bullets: ['Süreç analizi + iyileştirme', 'Ekip eğitimi yerinde/online', 'Sürekli teknik destek'], bgColor: C.yellow }) },

  // ═══ VERSUS (5) ═══
  { fn: 'v2-30-vs.svg', svg: s5_vs({ leftLabel: 'ÖNCE', rightLabel: 'SONRA', leftItems: ['😩 5 farklı yazılım', '📞 5 destek hattı', '💸 ~36.000 TL/yıl', '📊 Excel\'de stok', '😴 Geç tahsilat'], rightItems: ['🎯 Tek platform', '🤝 Tek partner', '💰 Tek fatura', '📦 Otomatik stok', '⚡ Otomatik tahsilat'], bigOutcome: '~36.000 TL yıllık tasarruf' }) },
  { fn: 'v2-31-vs.svg', svg: s5_vs({ leftLabel: 'GENEL YAZILIM', rightLabel: 'KOOZA', leftItems: ['❌ Generic özellikler', '❌ Türk değil', '❌ Yabancı destek', '❌ Sektör bilmiyor', '❌ Karmaşık'], rightItems: ['✅ Sektöre özel', '✅ KVKK uyumlu', '✅ Türkçe 24/7', '✅ İş ortağı gibi', '✅ Sade'], bigOutcome: 'Türk KOBİ için, Türk\'ten' }) },
  { fn: 'v2-32-vs.svg', svg: s5_vs({ leftLabel: 'ELLE', rightLabel: 'OTOMATİK', leftItems: ['📝 Manuel fiş', '📊 Excel raporu', '📞 Telefonla randevu', '✉️ Manuel mail', '📓 Defter takibi'], rightItems: ['💳 Otomatik kasa', '📈 Anlık rapor', '🌐 Online randevu', '🤖 SMS otomasyon', '☁️ Bulut sistem'], bigOutcome: 'Saatler kazanç → büyümeye ayır' }) },
  { fn: 'v2-33-vs.svg', svg: s5_vs({ leftLabel: 'KOMPLİKE', rightLabel: 'kooza', leftItems: ['💸 Yüksek ön ödeme', '⏳ 6 aylık kurulum', '🤔 Kullanılmayan özellik', '👨‍💻 Teknik ekip gerekli', '📚 Aylar süren eğitim'], rightItems: ['💰 Aylık abonelik', '⚡ 5 dakika kurulum', '🎯 Sadece gerekenler', '👤 Tek kişi yeter', '⏱️ 1 saatlik eğitim'], bigOutcome: 'Sade ama derinlikli' }) },
  { fn: 'v2-34-vs.svg', svg: s5_vs({ leftLabel: 'AJANS', rightLabel: 'kooza', leftItems: ['🏢 Site için ajans', '💻 Yazılım için başka', '📞 Bordro için 3.kişi', '🎨 Tasarım için ayrı', '🎯 5 ayrı toplantı'], rightItems: ['🌐 Site dahil', '🤖 Yazılım dahil', '👥 İK dahil', '🎨 Tasarım dahil', '🤝 1 partner'], bigOutcome: 'Tek partner = tek sorumluluk' }) },

  // ═══ DID YOU KNOW (5) ═══
  { fn: 'v2-35-dyk.svg', svg: s6_didyouknow({ fact: 'Türkiye\'deki KOBİ\'lerin <strong style="color:#714B67">%78\'i</strong> birden fazla yazılım kullanıyor.', source: 'Kaynak: KOBİ Dijitalleşme Raporu 2025' }) },
  { fn: 'v2-36-dyk.svg', svg: s6_didyouknow({ fact: 'Mobil hızı <strong style="color:#714B67">3 saniyenin</strong> üstünde olan sitelerin %53\'ü terk ediliyor.', source: 'Kaynak: Google PageSpeed Research' }) },
  { fn: 'v2-37-dyk.svg', svg: s6_didyouknow({ fact: 'Bordro hatası bir personele yıllık <strong style="color:#714B67">~2.500 TL</strong>\'ye mal olabilir.', source: 'Kaynak: SGK Müfettişlik raporu' }) },
  { fn: 'v2-38-dyk.svg', svg: s6_didyouknow({ fact: 'Sadakat programı olan işletmeler <strong style="color:#714B67">+%18</strong> daha fazla tekrar müşteri çekiyor.', source: 'Kaynak: Türkiye Perakende 2024' }) },
  { fn: 'v2-39-dyk.svg', svg: s6_didyouknow({ fact: 'Online randevu sistemi olan klinikler boş slot\'larını <strong style="color:#714B67">%62</strong> azaltıyor.', source: 'Kaynak: Sağlık Bakanlığı eRandevu istatistik' }) },

  // ═══ TAGLINE / Premium (4) ═══
  { fn: 'v2-40-tag.svg', svg: s7_tagline({ line1: 'Şirketinizi', line2: 'uçtan uca', line3: 'dijitalleştiriyoruz.' }) },
  { fn: 'v2-41-tag.svg', svg: s7_tagline({ line1: 'Tek partner.', line2: 'Tek platform.', line3: 'Tek fatura.' }) },
  { fn: 'v2-42-tag.svg', svg: s7_tagline({ line1: 'Bugün başla,', line2: 'yarın', line3: 'fark yarat.' }) },
  { fn: 'v2-43-tag.svg', svg: s7_tagline({ line1: 'Yazılım değil,', line2: 'iş ortaklığı.', line3: 'kooza.' }) },

  // ═══ PROCESS (3) ═══
  { fn: 'v2-44-proc.svg', svg: s8_process({ title: '3 adımda dijitalleşin', steps: [
    { title: 'Ücretsiz keşif görüşmesi', subtitle: '30 dakika · Sürecinizi anlıyoruz' },
    { title: 'Size özel kurulum + eğitim', subtitle: '3-7 gün · Veri taşıma + ekip eğitimi' },
    { title: 'Yayında + sürekli destek', subtitle: 'İlk ay ücretsiz · 24/7 Türkçe destek' },
  ]}) },
  { fn: 'v2-45-proc.svg', svg: s8_process({ title: 'Demo süreciniz', steps: [
    { title: 'Demo formu doldurun', subtitle: '1 dakika · İhtiyaçlarınızı yazın' },
    { title: 'Uzmanımız sizi arar', subtitle: '24 saat içinde · Size özel demo' },
    { title: 'Beğenirseniz başlayın', subtitle: 'İlk ay ücretsiz · Risk almazsınız' },
  ], bgColor: C.indigo }) },
  { fn: 'v2-46-proc.svg', svg: s8_process({ title: 'Olgunluk testimiz', steps: [
    { title: '10 hızlı soru', subtitle: '2 dakika · Hiç abartısız' },
    { title: 'Anında skor + seviye', subtitle: 'Başlangıç → Lider · 4 seviye' },
    { title: 'Kişisel yol haritası', subtitle: 'PDF rapor · E-postanıza gelir' },
  ], bgColor: C.green }) },

  // ═══ SPOTLIGHT (3) ═══
  { fn: 'v2-47-spot.svg', svg: s9_spotlight({ icon: '🎯', title: 'Olgunluk Testi', subtitle: '2 dakikada şirketinizin dijital seviyesini öğrenin' }) },
  { fn: 'v2-48-spot.svg', svg: s9_spotlight({ icon: '💬', title: 'Ücretsiz Görüşme', subtitle: '30 dakika · Sıfır risk · Sadece keşif', bgColor: C.indigo }) },
  { fn: 'v2-49-spot.svg', svg: s9_spotlight({ icon: '🚀', title: '14 Gün Ücretsiz', subtitle: 'Kredi kartı yok · İstediğin zaman iptal', bgColor: C.green }) },

  // ═══ FINAL CTA (1) ═══
  { fn: 'v2-50-cta.svg', svg: s10_grid({ title: 'kooza\'da neler var?', items: [
    { icon: '🌐', title: 'Web Sitesi', desc: 'Kurumsal · E-ticaret · Blog', color: C.mauve },
    { icon: '🏥', title: 'Klinik', desc: 'Hasta dosyası · e-Reçete', color: C.red },
    { icon: '🍽️', title: 'Restoran', desc: 'Adisyon · Kasa · Kurye', color: C.orange },
    { icon: '🛒', title: 'Market', desc: 'Barkod · Kasa · Stok', color: C.green },
    { icon: '🎓', title: 'Eğitim', desc: 'Öğrenci · Sınav · Veli', color: C.indigo },
    { icon: '👥', title: 'İK', desc: 'Bordro · İzin · PDKS', color: C.cyan },
    { icon: '🧾', title: 'Muhasebe', desc: 'e-Fatura · GİB', color: '#059669' },
    { icon: '👤', title: 'CRM', desc: 'Pipeline · Teklif', color: '#db2777' },
  ]}) },
]

// ─── GENERATE ─────────────────────────────────────────────
async function run() {
  console.log(`🎨 ${posts.length} yeni post üretiliyor...\n`)

  for (const p of posts) {
    const svgPath = path.join(dir, p.fn)
    const pngPath = svgPath.replace('.svg', '.png')
    fs.writeFileSync(svgPath, p.svg)
    try {
      await sharp(Buffer.from(p.svg), { density: 300 }).resize(W, H, { fit: 'contain', background: '#fff' }).png({ quality: 95 }).toFile(pngPath)
      const kb = (fs.statSync(pngPath).size / 1024).toFixed(0)
      console.log(`  ✅ ${p.fn.replace('.svg', '.png')} (${kb} KB)`)
    } catch (e) {
      console.error(`  ❌ ${p.fn}: ${e.message.split('\n')[0]}`)
    }
  }

  console.log(`\n🎉 ${posts.length} post hazır!`)
  console.log(`📁 ${dir}`)
}

run()
