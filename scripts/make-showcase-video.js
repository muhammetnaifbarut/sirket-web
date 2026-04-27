/**
 * Site "Güçlü özellikleri keşfedin" bölümü için özel tanıtım videosu.
 * 16:9 oranında, 20 saniye, fade geçişli.
 */
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')

const W = 1920
const H = 1080
const FPS = 30
const PER_SLIDE = 4 // saniye

const slides = [
  // Slayt başlık + alt + arkaplan rengi + emoji
  { title: 'kooza nedir?',           subtitle: 'İşletmenizin dijital dönüşüm partneri',  bg: '#714B67', accent: '#FFC0CB', emoji: '🦋' },
  { title: 'Web sitesi',             subtitle: 'Modern, mobil uyumlu, SEO optimize',     bg: '#714B67', accent: '#FFC0CB', emoji: '🌐' },
  { title: 'Sektörel otomasyon',     subtitle: 'Klinik · Restoran · Market · Eğitim',    bg: '#dc2626', accent: '#fecaca', emoji: '🤖' },
  { title: 'İK + Bordro',            subtitle: 'Personel, izin, bordro, performans',     bg: '#0891b2', accent: '#cffafe', emoji: '👥' },
  { title: 'CRM + Muhasebe',         subtitle: 'Müşteri, satış, e-Fatura, GİB',          bg: '#16a34a', accent: '#bbf7d0', emoji: '💼' },
  { title: 'Tek partner.\nTek platform.', subtitle: 'kooza · 500+ işletme bizi seçti',    bg: '#3a2436', accent: '#FFC0CB', emoji: '✨' },
]

const outDir = path.join(__dirname, '..', 'public')
const tempDir = path.join(__dirname, '_tmp_showcase')
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

function svg(slide, idx) {
  const titleLines = slide.title.split('\n')
  const titleY = 480 - (titleLines.length - 1) * 60
  const titleSvg = titleLines.map((line, i) =>
    `<text x="960" y="${titleY + i * 130}" font-family="Arial Black, sans-serif" font-weight="900" font-size="120" fill="#ffffff" text-anchor="middle" letter-spacing="-3">${line}</text>`
  ).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${slide.bg}"/>
        <stop offset="100%" stop-color="#1a0f17"/>
      </linearGradient>
      <radialGradient id="g1" cx="0.85" cy="0.15" r="0.6">
        <stop offset="0%" stop-color="${slide.accent}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="${slide.accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#g1)"/>

    <!-- Logo -->
    <g transform="translate(80, 80)">
      <circle cx="40" cy="40" r="36" fill="#ffffff"/>
      <circle cx="40" cy="40" r="14" fill="${slide.bg}"/>
      <circle cx="100" cy="40" r="36" fill="none" stroke="#ffffff" stroke-width="14"/>
      <circle cx="142" cy="6" r="7" fill="${slide.accent}"/>
      <text x="170" y="62" font-family="Arial Black, sans-serif" font-weight="900" font-size="54" fill="#ffffff">kooza</text>
    </g>

    <!-- Big emoji -->
    <text x="960" y="320" font-family="Arial, sans-serif" font-size="200" text-anchor="middle">${slide.emoji}</text>

    <!-- Title -->
    ${titleSvg}

    <!-- Subtitle -->
    <text x="960" y="780" font-family="Arial, sans-serif" font-weight="500" font-size="44" fill="${slide.accent}" text-anchor="middle">${slide.subtitle}</text>

    <!-- Footer -->
    <text x="960" y="1010" font-family="Arial, sans-serif" font-weight="700" font-size="26" fill="#ffffff" fill-opacity="0.7" text-anchor="middle">kooza.tr · @kooza</text>
  </svg>`
}

async function run() {
  console.log('🎬 Showcase videosu üretiliyor...\n')

  for (let i = 0; i < slides.length; i++) {
    const out = path.join(tempDir, `s${String(i).padStart(2, '0')}.png`)
    await sharp(Buffer.from(svg(slides[i], i)), { density: 200 })
      .resize(W, H, { fit: 'contain', background: '#000' })
      .png({ quality: 95 })
      .toFile(out)
    console.log(`  ✅ Slayt ${i + 1}: ${slides[i].title.replace('\n', ' / ')}`)
  }

  const inputs = slides.map((_, i) => `-loop 1 -t ${PER_SLIDE} -i "${path.join(tempDir, `s${String(i).padStart(2, '0')}.png`)}"`).join(' ')
  const filter = slides.map((_, i) => `[${i}:v]fps=${FPS},format=yuv420p[v${i}]`).join(';') +
    ';' + slides.map((_, i) => `[v${i}]`).join('') + `concat=n=${slides.length}:v=1:a=0[v]`

  const outVideo = path.join(outDir, 'showcase-video.mp4')
  console.log('\n🎥 FFmpeg birleştiriyor...')
  execSync(`ffmpeg -y ${inputs} -filter_complex "${filter}" -map "[v]" -c:v libx264 -pix_fmt yuv420p -preset fast -movflags +faststart "${outVideo}"`, { stdio: 'pipe' })

  const sizeMB = (fs.statSync(outVideo).size / 1024 / 1024).toFixed(2)
  console.log(`\n🎉 Video hazır: ${outVideo}`)
  console.log(`📦 ${sizeMB} MB · ${slides.length * PER_SLIDE} saniye · ${W}x${H}`)

  // Cleanup
  fs.readdirSync(tempDir).forEach(f => fs.unlinkSync(path.join(tempDir, f)))
  fs.rmdirSync(tempDir)
}

run().catch(e => { console.error('❌', e); process.exit(1) })
