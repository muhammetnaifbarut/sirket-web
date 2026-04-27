/**
 * Hero başlık ve alt yazısını daha net mesaja günceller.
 * 10-persona testte Fatma, Mehmet, Elif "anlamıyorum" dedi - somut sektör vurgusu.
 */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const SETTINGS = [
  { key: 'hero_badge',          value: '🌟 Restoran, klinik, dükkân - hepsi için tek yazılım', group: 'hero' },
  { key: 'hero_title',          value: 'Sektörünüze özel\nyazılım, tek platformda', group: 'hero' },
  { key: 'hero_subtitle',       value: 'Restoran, klinik, market, eğitim, güzellik salonu, e-ticaret. Her sektör için randevu, kasa, stok, CRM ve muhasebe - hepsi tek panelde, türkçe, KVKK uyumlu.', group: 'hero' },
  { key: 'hero_cta_label',      value: '14 Gün Ücretsiz Dene · Kart Yok', group: 'hero' },
  { key: 'hero_cta_url',        value: '/demo', group: 'hero' },
  { key: 'hero_secondary_label', value: 'Sektörünüzü Seçin', group: 'hero' },
  { key: 'hero_secondary_url',   value: '/cozumler', group: 'hero' },
  // Showcase video bölümü - daha net mesaj
  { key: 'showcase_title',      value: 'Güçlü özellikleri keşfedin', group: 'showcase' },
  { key: 'showcase_subtitle',   value: 'Her sektör için özelleştirilmiş paneller. CRM’den stoka, randevudan bordroya — her şey tek ekranda, gerçek zamanlı.', group: 'showcase' },
]

async function main() {
  console.log('Hero settings güncelleniyor...\n')
  for (const s of SETTINGS) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group },
      create: { key: s.key, value: s.value, group: s.group },
    })
    console.log(`✓ ${s.key}`)
  }
  console.log('\nTamam.')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
