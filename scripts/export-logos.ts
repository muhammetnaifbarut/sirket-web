/**
 * Exports all SVG brand assets to PNG in multiple sizes.
 * Usage: npx tsx scripts/export-logos.ts
 */
import sharp from 'sharp'
import { readFile, writeFile, readdir } from 'fs/promises'
import path from 'path'

const BRAND_DIR = path.join(process.cwd(), 'public', 'brand')

const MARK_SIZES = [64, 128, 256, 512, 1024]
const FULL_SIZES = [320, 640, 1280, 2560]

async function svgToPng(
  svgPath: string,
  outPath: string,
  width: number,
  background: string | undefined = undefined
) {
  const svg = await readFile(svgPath)
  let pipeline = sharp(svg, { density: 600 }).resize({ width })
  if (background) {
    pipeline = pipeline.flatten({ background })
  }
  const buf = await pipeline.png({ compressionLevel: 9 }).toBuffer()
  await writeFile(outPath, buf)
  console.log(`  ✓ ${path.basename(outPath)}  (${(buf.length / 1024).toFixed(1)} KB)`)
}

async function main() {
  console.log('Exporting kooza brand assets...\n')

  const files = await readdir(BRAND_DIR)
  const svgs = files.filter((f) => f.endsWith('.svg'))

  for (const svg of svgs) {
    const base = svg.replace(/\.svg$/, '')
    const isMark = base.includes('mark')
    const sizes = isMark ? MARK_SIZES : FULL_SIZES

    console.log(`\n→ ${svg}`)
    for (const w of sizes) {
      const outPath = path.join(BRAND_DIR, `${base}-${w}.png`)
      await svgToPng(path.join(BRAND_DIR, svg), outPath, w)
    }

    // White variant: also produce a "padded" PNG with subtle background for
    // platforms that strip alpha (LinkedIn cover, some email clients).
    if (base.includes('color')) {
      const padPath = path.join(BRAND_DIR, `${base}-on-white-${isMark ? 256 : 1280}.png`)
      await svgToPng(
        path.join(BRAND_DIR, svg),
        padPath,
        isMark ? 256 : 1280,
        '#ffffff'
      )
    }
  }

  console.log('\n✅ Done. All assets in public/brand/')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
