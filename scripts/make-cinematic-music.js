/**
 * Sinematik müzik (24 sn) - epik trailer tarzı
 * - Sub bass drone
 * - Detuned string pad (çoklu detune ile koro efekti)
 * - Arpeggio melodi
 * - Soft kick rhythm
 * - Reverb (aecho)
 */
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const outDir = path.join(__dirname, '_tmp_music')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const out = path.join(outDir, 'cinematic.mp3')
const DUR = 24

// 6 akor x 4 saniye
// Dm - Am - F - C - G - Dm
const chords = [
  { root: 73.42,  pad: [146.83, 220.00, 293.66], arp: [587.33, 698.46, 880.00] }, // Dm
  { root: 110.00, pad: [220.00, 261.63, 329.63], arp: [659.25, 783.99, 1046.50] }, // Am
  { root: 87.31,  pad: [174.61, 220.00, 261.63], arp: [523.25, 698.46, 880.00] }, // F
  { root: 130.81, pad: [261.63, 329.63, 392.00], arp: [783.99, 1046.50, 1318.51] }, // C
  { root: 98.00,  pad: [196.00, 246.94, 293.66], arp: [739.99, 987.77, 1174.66] }, // G
  { root: 73.42,  pad: [146.83, 220.00, 293.66], arp: [587.33, 698.46, 880.00] }, // Dm
]

function genChord(c, idx) {
  const file = path.join(outDir, `chord_${idx}.wav`)
  // Detune cent helper: 1.003 = +5 cent
  const det = (f, c) => f * Math.pow(2, c / 1200)

  // String pad: 3 not x 3 detune = 9 layers ("chorus" efekti)
  const padLayers = []
  c.pad.forEach((freq, i) => {
    padLayers.push(`sine=frequency=${freq.toFixed(2)}:duration=4`)
    padLayers.push(`sine=frequency=${det(freq, 7).toFixed(2)}:duration=4`)
    padLayers.push(`sine=frequency=${det(freq, -7).toFixed(2)}:duration=4`)
  })

  // Arp: 4 vuruş (1sn arayla)
  // Her not 0.8 saniye, her vuruş arası 1 saniye
  const arpFile = path.join(outDir, `arp_${idx}.wav`)
  const arpCmd = `ffmpeg -y \
    -f lavfi -i "sine=frequency=${c.arp[0]}:duration=0.7" \
    -f lavfi -i "sine=frequency=${c.arp[1]}:duration=0.7" \
    -f lavfi -i "sine=frequency=${c.arp[2]}:duration=0.7" \
    -f lavfi -i "sine=frequency=${c.arp[1]}:duration=0.7" \
    -f lavfi -i "anullsrc=duration=0.3" \
    -filter_complex "[0]afade=t=in:d=0.05,afade=t=out:st=0.5:d=0.2,volume=0.3[a0]; \
                     [1]afade=t=in:d=0.05,afade=t=out:st=0.5:d=0.2,volume=0.25[a1]; \
                     [2]afade=t=in:d=0.05,afade=t=out:st=0.5:d=0.2,volume=0.25[a2]; \
                     [3]afade=t=in:d=0.05,afade=t=out:st=0.5:d=0.2,volume=0.25[a3]; \
                     [4]asplit=4[s0][s1][s2][s3]; \
                     [a0][s0][a1][s1][a2][s2][a3][s3]concat=n=8:v=0:a=1[arp]" \
    -map "[arp]" -ac 1 "${arpFile}"`
  execSync(arpCmd, { stdio: 'pipe' })

  // Pad - tüm katmanları mixle, hafif reverb
  const padInputs = padLayers.map(l => `-f lavfi -i "${l}"`).join(' ')
  const padMix = padLayers.map((_, i) => `[${i}:a]volume=${(0.5 / padLayers.length).toFixed(3)}[p${i}]`).join(';')
  const padFinal = padLayers.map((_, i) => `[p${i}]`).join('') + `amix=inputs=${padLayers.length}:duration=longest:normalize=0[pad]`

  const padFile = path.join(outDir, `pad_${idx}.wav`)
  execSync(`ffmpeg -y ${padInputs} -filter_complex "${padMix};${padFinal}" -map "[pad]" -ac 1 "${padFile}"`, { stdio: 'pipe' })

  // Bass
  const bassFile = path.join(outDir, `bass_${idx}.wav`)
  execSync(`ffmpeg -y -f lavfi -i "sine=frequency=${c.root}:duration=4" -af "volume=0.5,afade=t=in:d=0.3,afade=t=out:st=3.5:d=0.5" -ac 1 "${bassFile}"`, { stdio: 'pipe' })

  // Mix all 3 layers + add reverb
  const cmd = `ffmpeg -y \
    -i "${padFile}" -i "${arpFile}" -i "${bassFile}" \
    -filter_complex "[0:a]volume=0.6[p];[1:a]volume=0.7[a];[2:a]volume=0.8[b]; \
                     [p][a][b]amix=inputs=3:duration=longest:normalize=0,aecho=0.6:0.5:60:0.3,afade=t=in:d=0.4,afade=t=out:st=3.5:d=0.5" \
    -ac 1 "${file}"`
  execSync(cmd, { stdio: 'pipe' })

  // cleanup partials
  fs.unlinkSync(arpFile)
  fs.unlinkSync(padFile)
  fs.unlinkSync(bassFile)

  return file
}

console.log('🎬 Sinematik müzik üretiliyor...')
const chordFiles = chords.map((c, i) => {
  const f = genChord(c, i)
  console.log(`  ✅ Bölüm ${i + 1}/6`)
  return f
})

// Hepsini birleştir
const inputs = chordFiles.map(f => `-i "${f}"`).join(' ')
const filter = chordFiles.map((_, i) => `[${i}:a]`).join('') +
  `concat=n=${chordFiles.length}:v=0:a=1,afade=t=in:st=0:d=1.5,afade=t=out:st=22:d=2,volume=2.0[full]`

execSync(`ffmpeg -y ${inputs} -filter_complex "${filter}" -map "[full]" -ac 2 -b:a 192k "${out}"`, { stdio: 'pipe' })

chordFiles.forEach(f => fs.unlinkSync(f))

const sizeMB = (fs.statSync(out).size / 1024 / 1024).toFixed(2)
console.log(`\n✅ Hazır: ${out} (${sizeMB} MB, ${DUR}s)`)
