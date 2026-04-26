import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File
  const folder = (formData.get('folder') as string) || 'uploads'

  if (!file) return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })

  const isVideo = file.type.startsWith('video/')
  const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024 // 100MB video, 10MB image
  if (file.size > maxSize) {
    return NextResponse.json({ error: `Dosya çok büyük (max ${isVideo ? '100MB' : '10MB'})` }, { status: 400 })
  }

  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    'video/mp4', 'video/webm', 'video/ogg',
  ]
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Desteklenmeyen dosya türü' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = path.extname(file.name)
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
  const uploadDir = path.join(process.cwd(), 'public', folder)

  await mkdir(uploadDir, { recursive: true })
  await writeFile(path.join(uploadDir, filename), buffer)

  const url = `/${folder}/${filename}`

  const media = await prisma.media.create({
    data: {
      filename,
      url,
      mimeType: file.type,
      size: file.size,
      folder,
    },
  })

  return NextResponse.json({ url, id: media.id })
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const media = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  return NextResponse.json(media)
}
