import type { PilotItem, PilotList } from '@/types/pilot'
import { sanitizeIconUrl, fixMojibakeName } from '@/utils/iconMap'
import {
  CATEGORY_ORDER,
  HIDDEN_LINKS,
  HIDDEN_NAMES,
  LINK_FIXES,
  MOVES,
  MOVE_BY_NAME,
  NAME_FIXES,
  SEARCH_ALIASES,
} from '@/data/pilotOverrides'

const normalizeName = (name: string): string => {
  const trimmed = (name || '').trim()
  return (NAME_FIXES[trimmed] || fixMojibakeName(trimmed)).trim()
}

const normalizeLink = (link: string): string => {
  const trimmed = (link || '').trim()
  return (LINK_FIXES[trimmed] || trimmed).trim()
}

/**
 * 读取层归一化：改名 -> 改链接 -> 隐藏 -> 移动 -> 分类内按 link 去重。
 * 不修改后端数据，所有规则集中在 data/pilotOverrides.ts，便于后端修完后整体删除。
 */
export function normalizePilotList(raw: PilotList): PilotList {
  const bucket: PilotList = {}
  const seen: Record<string, Set<string>> = {}
  const known = new Set(CATEGORY_ORDER)
  const order = [...CATEGORY_ORDER, ...Object.keys(raw).filter((key) => !known.has(key))]

  for (const category of order) {
    bucket[category] = []
    seen[category] = new Set<string>()
  }

  for (const [sourceCategory, items] of Object.entries(raw)) {
    for (const item of items) {
      const originalLink = (item.link || '').trim()
      if (!originalLink) continue

      const originalName = (item.name || '').trim()
      if (HIDDEN_NAMES.has(originalName)) continue

      const link = normalizeLink(originalLink)
      if (HIDDEN_LINKS.has(originalLink) || HIDDEN_LINKS.has(link)) continue

      const name = normalizeName(originalName)
      if (!name || HIDDEN_NAMES.has(name)) continue

      const target = MOVES[link] || MOVE_BY_NAME[name] || sourceCategory
      if (!bucket[target]) {
        bucket[target] = []
        seen[target] = new Set<string>()
      }
      if (seen[target].has(link)) continue

      seen[target].add(link)
      bucket[target].push({
        ...item,
        name,
        link,
        img: sanitizeIconUrl(item.img || '', name),
      })
    }
  }

  const finalOrder = [...order, ...Object.keys(bucket).filter((category) => !known.has(category))]
  return finalOrder.reduce<PilotList>((result, category) => {
    if (bucket[category]?.length) result[category] = bucket[category]
    return result
  }, {})
}

/** 名称 / 网址 / 分类 / 别名，多关键词按 AND 匹配。 */
export function matchesPilotQuery(item: PilotItem, category: string, query: string): boolean {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true

  const aliases = SEARCH_ALIASES[item.name.toLowerCase()] || []
  const haystack = [item.name, item.link, category, ...aliases].join(' ').toLowerCase()
  return normalized.split(/\s+/).every((part) => haystack.includes(part))
}
