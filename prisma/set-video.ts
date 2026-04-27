import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function run() {
  await prisma.setting.upsert({
    where: { key: 'showcase_video_url' },
    update: { value: '/showcase-video.mp4' },
    create: { key: 'showcase_video_url', value: '/showcase-video.mp4', group: 'general' },
  })
  await prisma.setting.upsert({
    where: { key: 'section_video_visible' },
    update: { value: 'true' },
    create: { key: 'section_video_visible', value: 'true', group: 'sections' },
  })
  console.log('✅ Video URL ayarlandı: /showcase-video.mp4')
  await prisma.$disconnect()
}
run().catch(e => { console.error(e); process.exit(1) })
