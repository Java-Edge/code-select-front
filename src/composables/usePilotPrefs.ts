import { computed, ref } from 'vue'
import type { PilotItem, StoredPilotItem } from '@/types/pilot'

const RECENT_KEY = 'pilot_recent_items'
const FAVORITES_KEY = 'pilot_favorite_items'
const MAX_RECENT = 10
const MAX_FAVORITES = 30

const readStored = (key: string): StoredPilotItem[] => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is StoredPilotItem => {
      if (!item || typeof item !== 'object') return false
      const candidate = item as Partial<StoredPilotItem>
      return typeof candidate.name === 'string' && typeof candidate.link === 'string'
    })
  } catch {
    return []
  }
}

const writeStored = (key: string, value: StoredPilotItem[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 隐私模式/存储满时静默失败，不阻塞导航。
  }
}

// 模块级单例：Header 之外的卡片组件和页面顶部的“最近/常用”共享同一份状态。
const recentItems = ref<StoredPilotItem[]>(readStored(RECENT_KEY))
const favoriteItems = ref<StoredPilotItem[]>(readStored(FAVORITES_KEY))

const toStored = (item: PilotItem, category: string): StoredPilotItem => ({
  id: item.id,
  name: item.name,
  link: item.link,
  img: item.img,
  category,
})

export function usePilotPrefs() {
  const favoriteLinks = computed(() => new Set(favoriteItems.value.map((item) => item.link)))

  const recordRecent = (item: PilotItem, category: string): void => {
    const entry = toStored(item, category)
    recentItems.value = [entry, ...recentItems.value.filter((saved) => saved.link !== entry.link)].slice(0, MAX_RECENT)
    writeStored(RECENT_KEY, recentItems.value)
  }

  const toggleFavorite = (item: PilotItem, category: string): void => {
    const exists = favoriteItems.value.some((saved) => saved.link === item.link)
    favoriteItems.value = exists
      ? favoriteItems.value.filter((saved) => saved.link !== item.link)
      : [toStored(item, category), ...favoriteItems.value].slice(0, MAX_FAVORITES)
    writeStored(FAVORITES_KEY, favoriteItems.value)
  }

  const isFavorite = (link: string): boolean => favoriteLinks.value.has(link)

  const clearRecent = (): void => {
    recentItems.value = []
    writeStored(RECENT_KEY, [])
  }

  return {
    recentItems,
    favoriteItems,
    favoriteLinks,
    recordRecent,
    toggleFavorite,
    isFavorite,
    clearRecent,
  }
}
