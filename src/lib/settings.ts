import prisma from './db'

export async function getSettings(group?: string) {
  const settings = await prisma.setting.findMany({
    where: group ? { group } : undefined,
  })
  return Object.fromEntries(settings.map((s) => [s.key, s.value]))
}

export async function getSetting(key: string, fallback = '') {
  const setting = await prisma.setting.findUnique({ where: { key } })
  return setting?.value ?? fallback
}

export async function updateSetting(key: string, value: string, group = 'general') {
  return prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value, group },
  })
}

export async function getTheme() {
  const theme = await prisma.themeSettings.findFirst({ where: { isActive: true } })
  return theme
}

export async function getMenuItems(location = 'header') {
  return prisma.menuItem.findMany({
    where: { location, parentId: null, isActive: true },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { order: 'asc' },
  })
}
