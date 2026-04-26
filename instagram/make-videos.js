const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')

const dir = __dirname
const VIDEO_W = 1080
const VIDEO_H = 1920
const FPS = 30

const FFMPEG = 'ffmpeg'

// Helper: PNG'yi dikey Reels boyutuna sığdır
async function fitVertical(srcPath, outPath, bgColor = '#714B67') {
  await sharp(srcPath)
    .resize(VIDEO_W, VIDEO_H, {
      fit: 'contain',
      background: bgColor,
    })
    .png()
    .toFile(outPath)
}

// Helper: ffmpeg kommutunu çalıştır
function ff(cmd) {
  console.log(`  $ ffmpeg ${cmd.slice(0, 80)}...`)
  execSync(`${FFMPEG} -y ${cmd}`, { stdio: 'pipe' })
}

async function makeSlideshow(name, slides, perSlideSec, bgColor = '#714B67') {
  console.log(`\n🎬 ${name}`)
  const tempDir = path.join(dir, '_temp_' + name.replace(/\s/g, '_'))
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)

  // Resize each slide to vertical
  for (let i = 0; i < slides.length; i++) {
    const src = path.join(dir, slides[i])
    const out = path.join(tempDir, `s${String(i).padStart(3, '0')}.png`)
    await fitVertical(src, out, bgColor)
    console.log(`  ✅ ${slides[i]}`)
  }

  // Build FFmpeg input pattern with crossfade
  const outVideo = path.join(dir, `video-${name.replace(/\s/g, '-')}.mp4`)
  const inputs = slides.map((_, i) => `-loop 1 -t ${perSlideSec} -i "${path.join(tempDir, `s${String(i).padStart(3, '0')}.png`)}"`).join(' ')

  // Simple concat with fade in/out
  let filter = ''
  if (slides.length === 1) {
    filter = `[0:v]fps=${FPS},format=yuv420p[v]`
  } else {
    // Use concat
    filter = slides.map((_, i) => `[${i}:v]fps=${FPS},format=yuv420p[v${i}]`).join(';')
    filter += ';' + slides.map((_, i) => `[v${i}]`).join('') + `concat=n=${slides.length}:v=1:a=0[v]`
  }

  ff(`${inputs} -filter_complex "${filter}" -map "[v]" -c:v libx264 -pix_fmt yuv420p -preset fast -movflags +faststart "${outVideo}"`)

  // Cleanup
  fs.readdirSync(tempDir).forEach(f => fs.unlinkSync(path.join(tempDir, f)))
  fs.rmdirSync(tempDir)

  const sizeMB = (fs.statSync(outVideo).size / 1024 / 1024).toFixed(2)
  console.log(`  🎉 ${path.basename(outVideo)} (${sizeMB} MB, ${slides.length * perSlideSec}s)`)
}

async function run() {
  console.log('🎬 8 Reels videosu üretiliyor...\n')

  // VIDEO 1: Logo intro (3 sn — kapak)
  await makeSlideshow('1-logo-intro', [
    'post-00-tanitim-1-kapak.png',
  ], 3, '#714B67')

  // VIDEO 2: Tanıtım carousel slideshow (15 sn = 5 slayt × 3 sn)
  await makeSlideshow('2-tanitim-carousel', [
    'post-00-tanitim-1-kapak.png',
    'post-00-tanitim-2-kimiz.png',
    'post-00-tanitim-3-hizmetler.png',
    'post-00-tanitim-4-neden.png',
    'post-00-tanitim-5-cta.png',
  ], 3, '#714B67')

  // VIDEO 3: 12 modül showcase (15 sn = 5 slayt × 3 sn)
  await makeSlideshow('3-12-modul-showcase', [
    'post-21-12-modul.png',
    'post-06-klinik.png',
    'post-07-market.png',
    'post-08-egitim.png',
    'post-25-cta-final.png',
  ], 3, '#1f2937')

  // VIDEO 4: Stats reveal (12 sn = 4 slayt × 3 sn)
  await makeSlideshow('4-stats-reveal', [
    'post-20-stats-bombardiman.png',
    'post-04-karsilastirma.png',
    'post-22-3-adim-surec.png',
    'post-25-cta-final.png',
  ], 3, '#714B67')

  // VIDEO 5: İpucu serisi (12 sn = 4 slayt × 3 sn)
  await makeSlideshow('5-ipucu-serisi', [
    'post-14-ipucu-restoran.png',
    'post-15-ipucu-klinik.png',
    'post-16-ipucu-stok.png',
    'post-17-ipucu-web.png',
  ], 3, '#fafafa')

  // VIDEO 6: Quote alıntıları (9 sn = 3 slayt × 3 sn)
  await makeSlideshow('6-quote-alintilari', [
    'post-11-quote-isortagi.png',
    'post-12-quote-cag.png',
    'post-13-quote-odakla.png',
  ], 3, '#1f2937')

  // VIDEO 7: Önce-sonra + vaadimiz (9 sn)
  await makeSlideshow('7-once-sonra-vaad', [
    'post-24-once-sonra.png',
    'post-23-vaadimiz.png',
    'post-25-cta-final.png',
  ], 3, '#714B67')

  // VIDEO 8: Final CTA (10 sn)
  await makeSlideshow('8-final-cta', [
    'post-22-3-adim-surec.png',
    'post-25-cta-final.png',
  ], 5, '#714B67')

  console.log('\n🎉 8 video hazır!')
  console.log(`📁 Konum: ${dir}`)
  console.log('📱 Şimdi Instagram\'a Reels olarak yükleyebilirsin.')
}

run().catch(e => { console.error('❌', e); process.exit(1) })
