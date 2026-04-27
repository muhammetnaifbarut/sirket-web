/**
 * Kurumsal & İlham Verici müzik üretici (24 sn)
 * Yükselen akor ilerlemesi: C - G - Am - F - C - G - F - C
 * Apple/Google reklamı tarzı, yumuşak piyano + pad + bell
 */
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const outDir = path.join(__dirname, '_tmp_music')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const out = path.join(outDir, 'corporate.mp3')

// Akor frekansları (Hz)
// C major: C4=261.63, E4=329.63, G4=392.00
// G major: G3=196.00, B3=246.94, D4=293.66
// Am:     A3=220.00, C4=261.63, E4=329.63
// F major: F3=174.61, A3=220.00, C4=261.63
// Bell üst oktav melodisi: E5=659.25, G5=783.99, A5=880.00, C6=1046.50

// 24 saniye = 6 akor x 4sn (her slayt 4sn)
// Slayt sırası: C - G - Am - F - C - G
const chords = [
  { root: 130.81, third: 164.81, fifth: 196.00, bell: 523.25 }, // C (slayt 1: kooza nedir)
  { root: 196.00, third: 246.94, fifth: 293.66, bell: 783.99 }, // G (slayt 2: web sitesi)
  { root: 220.00, third: 261.63, fifth: 329.63, bell: 880.00 }, // Am (slayt 3: sektörel)
  { root: 174.61, third: 220.00, fifth: 261.63, bell: 698.46 }, // F (slayt 4: ik bordro)
  { root: 261.63, third: 329.63, fifth: 392.00, bell: 1046.50 }, // C up (slayt 5: crm)
  { root: 196.00, third: 246.94, fifth: 392.00, bell: 1567.98 }, // G high (slayt 6: tek partner)
]

function genChord(c, idx) {
  const file = path.join(outDir, `chord_${idx}.wav`)
  // Her akor 4 saniye; root + üçlü + beşli + bell üstte
  // sine wave + envelope
  const cmd = `ffmpeg -y \
    -f lavfi -i "sine=frequency=${c.root}:duration=4" \
    -f lavfi -i "sine=frequency=${c.third}:duration=4" \
    -f lavfi -i "sine=frequency=${c.fifth}:duration=4" \
    -f lavfi -i "sine=frequency=${c.bell}:duration=4" \
    -filter_complex "[0:a]volume=0.45[a0];[1:a]volume=0.30[a1];[2:a]volume=0.30[a2];[3:a]volume=0.18,tremolo=f=4:d=0.4[a3];[a0][a1][a2][a3]amix=inputs=4:duration=longest:normalize=0,afade=t=in:st=0:d=0.5,afade=t=out:st=3.3:d=0.7" \
    -ar 44100 -ac 1 "${file}"`
  execSync(cmd, { stdio: 'pipe' })
  return file
}

console.log('🎵 Kurumsal müzik üretiliyor...')
const chordFiles = chords.map((c, i) => {
  console.log(`  Akor ${i + 1}/6 üretildi`)
  return genChord(c, i)
})

const inputs = chordFiles.map(f => `-i "${f}"`).join(' ')
const filter = chordFiles.map((_, i) => `[${i}:a]`).join('') + `concat=n=${chordFiles.length}:v=0:a=1[full]`

execSync(`ffmpeg -y ${inputs} -filter_complex "${filter}" -map "[full]" -ac 2 -b:a 192k "${out}"`, { stdio: 'pipe' })

chordFiles.forEach(f => fs.unlinkSync(f))

const sizeMB = (fs.statSync(out).size / 1024 / 1024).toFixed(2)
console.log(`\n✅ Hazır: ${out} (${sizeMB} MB)`)
