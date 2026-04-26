import prisma from './db'

/**
 * Tüm fonksiyonlar DB hatalarına karşı dayanıklı —
 * build sırasında veya geçici DB sorunlarında boş/varsayılan döndürür.
 */

export async function getSettings(group?: string): Promise<Record<string, string>> {
  try {
    const settings = await prisma.setting.findMany({
      where: group ? { group } : undefined,
    })
    return Object.fromEntries(settings.map((s) => [s.key, s.value]))
  } catch (e) {
    console.warn('[getSettings] DB error, returning empty:', (e as Error).message)
    return {}
  }
}

export async function getSetting(key: string, fallback = ''): Promise<string> {
  try {
    const setting = await prisma.setting.findUnique({ where: { key } })
    return setting?.value ?? fallback
  } catch {
    return fallback
  }
}

export async function updateSetting(key: string, value: string, group = 'general') {
  return prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value, group },
  })
}

export async function getTheme() {
  try {
    return await prisma.themeSettings.findFirst({ where: { isActive: true } })
  } catch {
    return null
  }
}

export async function getMenuItems(location = 'header') {
  try {
    return await prisma.menuItem.findMany({
      where: { location, parentId: null, isActive: true },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    })
  } catch {
    return []
  }
}
