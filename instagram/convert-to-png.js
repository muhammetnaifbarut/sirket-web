const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const dir = __dirname

async function convert() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'))
  console.log(`🎨 ${files.length} SVG dosyası bulundu, PNG'ye çevriliyor...\n`)

  for (const file of files) {
    const inputPath = path.join(dir, file)
    const outputPath = path.join(dir, file.replace('.svg', '.png'))
    try {
      const svgBuffer = fs.readFileSync(inputPath)
      await sharp(svgBuffer, { density: 300 })
        .resize(1080, 1080, { fit: 'contain', background: '#ffffff' })
        .png({ quality: 95 })
        .toFile(outputPath)
      const sizeKB = (fs.statSync(outputPath).size / 1024).toFixed(0)
      console.log(`✅ ${file.padEnd(40)} → ${file.replace('.svg', '.png')}  (${sizeKB} KB)`)
    } catch (e) {
      console.error(`❌ ${file}: ${e.message}`)
    }
  }

  console.log('\n🎉 Tüm PNG dosyaları hazır!')
  console.log(`📁 Konum: ${dir}`)
  console.log('📱 Şimdi Instagram\'a yükleyebilirsin.')
}

convert()
