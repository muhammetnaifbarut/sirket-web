/**
 * Instagram Reels için DİKEY showcase videosu (1080x1920, 9:16)
 * 24 saniye, 6 slayt x 4sn
 * Atlas Audio Corporate müziği ile
 */
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')

const W = 1080
const H = 1920
const FPS = 30
const PER_SLIDE = 4

const slides = [
  { title: 'kooza nedir?',           subtitle: 'İşletmenizin dijital\ndönüşüm partneri',  bg: '#714B67', accent: '#FFC0CB', emoji: '🦋' },
  { title: 'Web sitesi',             subtitle: 'Modern · Mobil uyumlu\nSEO optimize',     bg: '#714B67', accent: '#FFC0CB', emoji: '🌐' },
  { title: 'Sektörel\notomasyon',    subtitle: 'Klinik · Restoran\nMarket · Eğitim',      bg: '#dc2626', accent: '#fecaca', emoji: '🤖' },
  { title: 'İK + Bordro',            subtitle: 'Personel · İzin\nBordro · Performans',    bg: '#0891b2', accent: '#cffafe', emoji: '👥' },
  { title: 'CRM +\nMuhasebe',        subtitle: 'Müşteri · Satış\ne-Fatura · GİB',         bg: '#16a34a', accent: '#bbf7d0', emoji: '💼' },
  { title: 'Tek partner.\nTek platform.', subtitle: 'kooza · 500+ işletme\nbizi seçti',   bg: '#3a2436', accent: '#FFC0CB', emoji: '✨' },
]

const outDir = path.join(__dirname, '..', 'public')
const tempDir = path.join(__dirname, '_tmp_reels')
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

function svg(slide) {
  const titleLines = slide.title.split('\n')
  const subLines = slide.subtitle.split('\n')

  // Dikey layout:
  // - Logo: en üstte (y=140)
  // - Emoji: y=560 (büyük, 280px)
  // - Title: y=1000 (lines * 130)
  // - Subtitle: y=1400 (lines * 60)
  // - Footer: y=1820

  const titleStartY = 1000 - (titleLines.length - 1) * 65
  const titleSvg = titleLines.map((line, i) =>
    `<text x="540" y="${titleStartY + i * 140}" font-family="Arial Black, sans-serif" font-weight="900" font-size="130" fill="#ffffff" text-anchor="middle" letter-spacing="-3">${line}</text>`
  ).join('')

  const subStartY = 1400
  const subSvg = subLines.map((line, i) =>
    `<text x="540" y="${subStartY + i * 60}" font-family="Arial, sans-serif" font-weight="500" font-size="48" fill="${slide.accent}" text-anchor="middle">${line}</text>`
  ).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${slide.bg}"/>
        <stop offset="100%" stop-color="#1a0f17"/>
      </linearGradient>
      <radialGradient id="g1" cx="0.5" cy="0.2" r="0.7">
        <stop offset="0%" stop-color="${slide.accent}" stop-opacity="0.30"/>
        <stop offset="100%" stop-color="${slide.accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#g1)"/>

    <!-- Logo -->
    <g transform="translate(380, 140)">
      <circle cx="40" cy="40" r="36" fill="#ffffff"/>
      <circle cx="40" cy="40" r="14" fill="${slide.bg}"/>
      <circle cx="100" cy="40" r="36" fill="none" stroke="#ffffff" stroke-width="14"/>
      <circle cx="142" cy="6" r="7" fill="${slide.accent}"/>
      <text x="170" y="62" font-family="Arial Black, sans-serif" font-weight="900" font-size="54" fill="#ffffff">kooza</text>
    </g>

    <!-- Big emoji -->
    <text x="540" y="640" font-family="Arial, sans-serif" font-size="280" text-anchor="middle">${slide.emoji}</text>

    <!-- Title -->
    ${titleSvg}

    <!-- Subtitle -->
    ${subSvg}

    <!-- Footer -->
    <text x="540" y="1820" font-family="Arial, sans-serif" font-weight="700" font-size="32" fill="#ffffff" fill-opacity="0.7" text-anchor="middle">kooza.tr · @kooza.tr</text>
  </svg>`
}

async function run() {
  console.log('📱 Reels videosu üretiliyor (1080x1920)...\n')

  for (let i = 0; i < slides.length; i++) {
    const out = path.join(tempDir, `s${String(i).padStart(2, '0')}.png`)
    await sharp(Buffer.from(svg(slides[i])), { density: 200 })
      .resize(W, H, { fit: 'contain', background: '#000' })
      .png({ quality: 95 })
      .toFile(out)
    console.log(`  ✅ Slayt ${i + 1}: ${slides[i].title.replace(/\n/g, ' ')}`)
  }

  const inputs = slides.map((_, i) => `-loop 1 -t ${PER_SLIDE} -i "${path.join(tempDir, `s${String(i).padStart(2, '0')}.png`)}"`).join(' ')
  const filter = slides.map((_, i) => `[${i}:v]fps=${FPS},format=yuv420p[v${i}]`).join(';') +
    ';' + slides.map((_, i) => `[v${i}]`).join('') + `concat=n=${slides.length}:v=1:a=0[v]`

  // Müzik dahil (Atlas Audio - 24 sn'lik track)
  const musicFile = path.join(__dirname, '_tmp_music', 'track-final.mp3')
  const outVideo = path.join(outDir, 'kooza-reels.mp4')

  console.log('\n🎥 FFmpeg birleştiriyor (video + müzik)...')
  execSync(
    `ffmpeg -y ${inputs} -i "${musicFile}" -filter_complex "${filter}" -map "[v]" -map ${slides.length}:a ` +
    `-c:v libx264 -pix_fmt yuv420p -preset fast -movflags +faststart ` +
    `-c:a aac -b:a 192k -shortest "${outVideo}"`,
    { stdio: 'pipe' }
  )

  const sizeMB = (fs.statSync(outVideo).size / 1024 / 1024).toFixed(2)
  console.log(`\n🎉 Reels videosu hazır!`)
  console.log(`📂 ${outVideo}`)
  console.log(`📦 ${sizeMB} MB · ${slides.length * PER_SLIDE} saniye · ${W}x${H} (9:16 dikey)`)

  // Cleanup
  fs.readdirSync(tempDir).forEach(f => fs.unlinkSync(path.join(tempDir, f)))
  fs.rmdirSync(tempDir)
}

run().catch(e => { console.error('❌', e); process.exit(1) })
