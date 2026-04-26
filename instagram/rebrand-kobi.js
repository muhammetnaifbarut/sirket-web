/**
 * Topluca: "KOBİ" → "İşletme" rebrand
 * Tüm SVG'leri güncelle + PNG'leri yeniden üret.
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const dirs = ['instagram', 'instagram/v3', 'instagram/v4']

const replacements = [
  // En spesifik en önce gelmeli
  [/Türk KOBİ'lerinin tek dijital partneri/g, 'İşletmelerin tek dijital partneri'],
  [/Türk KOBİ'lerinin/g, 'İşletmelerin'],
  [/Türk KOBİ'sinin/g, 'İşletmelerin'],
  [/Türk KOBİ'leri/g, 'İşletmeler'],
  [/Türk KOBİ/g, 'Türk işletme'],
  [/KOBİ İPUCU/g, 'İŞLETME İPUCU'],
  [/Aktif KOBİ/g, 'Aktif İşletme'],
  [/500\+ KOBİ kooza'yı/g, '500+ İşletme kooza\'yı'],
  [/KOBİ'lerin/g, 'İşletmelerin'],
  [/KOBİ'ler/g, 'İşletmeler'],
  [/KOBİ'lere/g, 'İşletmelere'],
  [/KOBİ'nin/g, 'İşletmenin'],
  [/KOBİ'ye/g, 'İşletmeye'],
  [/(\d)\s*KOBİ\b/g, '$1 İşletme'],
  // Standalone KOBİ artık ayıklandığı için son kalıbı dikkatli yapmasak da olur
]

let totalChanged = 0

for (const dir of dirs) {
  const fullDir = path.join(__dirname, '..', dir)
  if (!fs.existsSync(fullDir)) continue
  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.svg'))
  for (const file of files) {
    const fullPath = path.join(fullDir, file)
    let content = fs.readFileSync(fullPath, 'utf-8')
    const original = content
    for (const [from, to] of replacements) {
      content = content.replace(from, to)
    }
    if (content !== original) {
      fs.writeFileSync(fullPath, content)
      totalChanged++
      console.log(`  ✏️  ${dir}/${file}`)
    }
  }
}

console.log(`\n✅ ${totalChanged} SVG güncellendi. PNG'ler yeniden üretiliyor...\n`)

;(async () => {
  for (const dir of dirs) {
    const fullDir = path.join(__dirname, '..', dir)
    if (!fs.existsSync(fullDir)) continue
    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.svg'))
    for (const file of files) {
      const svgPath = path.join(fullDir, file)
      const pngPath = svgPath.replace('.svg', '.png')
      try {
        await sharp(fs.readFileSync(svgPath), { density: 300 })
          .resize(1080, 1080, { fit: 'contain', background: '#fff' })
          .png({ quality: 100 })
          .toFile(pngPath)
      } catch (e) {
        console.error(`  ❌ ${file}`)
      }
    }
  }
  console.log('\n🎉 Tüm PNG\'ler yeniden üretildi.')
})()
