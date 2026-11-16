<template>
  <div class="pilot-page">
    <section class="pilot-hero" aria-label="导航首页">
      <div class="hero-heading">
        <div class="hero-copy">
          <h1 class="hero-title">编程严选导航</h1>
          <p class="hero-subtitle">
            {{ loading ? '正在加载站点…' : `已收录 ${totalCount} 个站点 · ${categoryCount} 个主题 · ${SCENES.length} 个场景` }}
          </p>
        </div>
        <span class="hero-hint">按 <kbd>/</kbd> 快速搜索</span>
      </div>

      <div class="search-box" :class="{ focused: searchFocused }">
        <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="m16.5 16.5 4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <input
          ref="searchInput"
          v-model="query"
          type="search"
          :placeholder="totalCount ? `搜索 ${totalCount} 个站点、网址、分类或细分` : '搜索站点、网址、分类或细分'"
          aria-label="搜索导航站点"
          autocomplete="off"
          @focus="searchFocused = true"
          @blur="searchFocused = false"
          @keydown.esc.prevent="clearSearch"
        />
        <button
          v-if="query"
          class="clear-btn"
          type="button"
          aria-label="清空搜索"
          @click="clearSearch"
        >
          ×
        </button>
        <kbd v-else class="search-kbd">/</kbd>
      </div>

      <div class="search-meta">
        <span v-if="isSearching">找到 <strong>{{ resultCount }}</strong> 个站点</span>
        <span v-else>名称 / 网址 / 分类 / 细分均可搜索</span>
        <button v-if="isSearching" class="link-btn" type="button" @click="clearSearch">清空搜索</button>
      </div>

      <div v-if="recentItems.length" class="quick-row">
        <span class="quick-label">最近</span>
        <div class="quick-list">
          <a
            v-for="item in recentItems"
            :key="`recent-${item.link}`"
            class="quick-chip"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            :title="item.name"
            @click="recordRecent(item, item.category)"
          >
            {{ item.name }}
          </a>
        </div>
        <button class="quick-clear" type="button" @click="clearRecent">清空</button>
      </div>

      <div v-if="favoriteItems.length" class="quick-row">
        <span class="quick-label">常用</span>
        <div class="quick-list">
          <a
            v-for="item in favoriteItems"
            :key="`favorite-${item.link}`"
            class="quick-chip favorite"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            :title="item.name"
            @click="recordRecent(item, item.category)"
          >
            {{ item.name }}
          </a>
        </div>
      </div>

      <nav v-if="!loading && !error" class="scene-tabs" aria-label="导航场景">
        <button
          v-for="tab in sceneTabs"
          :key="tab.key"
          class="scene-tab"
          :class="{ active: activeScene === tab.key }"
          type="button"
          :title="tab.description"
          :aria-pressed="activeScene === tab.key"
          @click="selectScene(tab.key)"
        >
          <span class="scene-tab-name">{{ tab.name }}</span>
          <span class="scene-tab-count">{{ tab.count }}</span>
        </button>
      </nav>
    </section>

    <FloatMenu
      v-if="menuItems.length"
      :menu-items="menuItems"
      :active-name="activeSection"
      class="pilot-float-menu"
      @menuClick="onMenuClick"
    />

    <div class="content-class">
      <div v-if="loading" class="loading-wrapper">
        <el-icon class="is-loading" :size="28"><Loading /></el-icon>
      </div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <template v-else>
        <div v-if="!visibleCount" class="empty-state">
          <p class="empty-title">
            {{ isSearching ? `没有找到“${query.trim()}”` : '该场景暂无站点' }}
          </p>
          <p class="empty-hint">试试英文名、拼音或分类名，比如 Kimi、qwen、云服务</p>
          <button class="empty-reset" type="button" @click="isSearching ? clearSearch() : selectScene('all')">
            {{ isSearching ? '清空搜索' : '查看全部' }}
          </button>
        </div>
        <div
          v-for="(value, key) in visibleList"
          :key="key"
          :id="generateId(key)"
          :data-category="key"
          class="category-section"
        >
          <div class="topic-head">
            <h2 class="topic-title">{{ key }}</h2>
            <span class="topic-count">{{ value.length }}</span>
            <span v-if="activeScene === 'all'" class="topic-scene">{{ sceneNameOf(key) }}</span>
          </div>
          <div
            v-for="group in subcategoryGroups(key, value)"
            :key="`${key}-${group.name}`"
            class="subcategory-group"
          >
            <div class="subcategory-head">
              <span class="subcategory-name">{{ group.name }}</span>
              <span class="subcategory-count">{{ group.items.length }}</span>
            </div>
            <CategoryComponents
              :list="group.items"
              :category="key"
              hide-header
              compact
              @open="recordRecent"
            />
          </div>
        </div>
      </template>
    </div>

    <button
      v-if="showBackTop"
      class="back-top"
      type="button"
      aria-label="回到顶部"
      @click="scrollToTop"
    >
      ↑
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import CategoryComponents from '@/components/categoryComponents.vue'
import FloatMenu from '@/components/common/FloatMenu.vue'
import axios from '@/axios'
import { Loading } from '@element-plus/icons-vue'
import type { MenuItem } from '@/components/common/FloatMenu.vue'
import type { ApiResponse } from '@/types/api'
import type { PilotItem, PilotList } from '@/types/pilot'
import {
  SCENES,
  SCENE_BY_TOPIC,
  SUBCATEGORY_ORDER,
  TOPIC_ORDER,
  subcategoryOf,
} from '@/data/pilotTaxonomy'
import { matchesPilotQuery, normalizePilotList } from '@/utils/pilotData'
import { usePilotPrefs } from '@/composables/usePilotPrefs'

const { recentItems, favoriteItems, recordRecent, clearRecent } = usePilotPrefs()

const pilotList = ref<PilotList>({})
const loading = ref(true)
const error = ref<string | null>(null)

const query = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const searchFocused = ref(false)
const activeSection = ref('')
const showBackTop = ref(false)
const activeScene = ref('all')

// 分类名可能含 /（培训/课程/机构），必须转成 querySelector 可用的安全 id。
const generateId = (key: string): string => {
  const slug = key
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `category-${slug || 'unknown'}`
}

const isSearching = computed(() => query.value.trim().length > 0)
const totalCount = computed(() =>
  Object.values(pilotList.value).reduce((sum, items) => sum + items.length, 0)
)
const categoryCount = computed(() => Object.keys(pilotList.value).length)

const filteredList = computed<PilotList>(() => {
  const normalized = query.value.trim().toLowerCase()
  if (!normalized) return pilotList.value

  return Object.entries(pilotList.value).reduce<PilotList>((result, [category, items]) => {
    const matched = items.filter((item) => matchesPilotQuery(item, category, normalized))
    if (matched.length) result[category] = matched
    return result
  }, {})
})

const resultCount = computed(() =>
  Object.values(filteredList.value).reduce((sum, items) => sum + items.length, 0)
)

/** 场景 -> 主题顺序；“全部”使用跨场景的统一顺序。 */
const orderedTopics = computed<string[]>(() => {
  const scene = SCENES.find((item) => item.key === activeScene.value)
  return scene ? scene.topics : TOPIC_ORDER
})

/** 场景过滤后的列表，始终按场景内主题顺序输出。 */
const visibleList = computed<PilotList>(() => {
  const result: PilotList = {}
  orderedTopics.value.forEach((topic) => {
    const items = filteredList.value[topic]
    if (items?.length) result[topic] = items
  })
  return result
})

const visibleCount = computed(() =>
  Object.values(visibleList.value).reduce((sum, items) => sum + items.length, 0)
)

const sceneTabs = computed(() =>
  [
    { key: 'all', name: '全部', count: resultCount.value, description: '全部站点' },
    ...SCENES.map((scene) => ({
      key: scene.key,
      name: scene.name,
      count: scene.topics.reduce((sum, topic) => sum + (filteredList.value[topic]?.length || 0), 0),
      description: scene.description,
    })),
  ].filter((tab) => !isSearching.value || tab.key === 'all' || tab.count > 0)
)

const sceneNameOf = (topic: string): string => {
  const scene = SCENES.find((item) => item.key === SCENE_BY_TOPIC[topic])
  return scene?.name || ''
}

interface SubcategoryGroup {
  name: string
  items: PilotItem[]
}

/** 主题内按细分分组；未登记的条目会以“其他”分组出现，不会丢数据。 */
const subcategoryGroups = (topic: string, items: PilotItem[]): SubcategoryGroup[] => {
  const buckets = new Map<string, PilotItem[]>()

  items.forEach((item) => {
    const name = item.subcategory || subcategoryOf(topic, item.name)
    const bucket = buckets.get(name)
    if (bucket) bucket.push(item)
    else buckets.set(name, [item])
  })

  const order = SUBCATEGORY_ORDER[topic] || []
  const groups: SubcategoryGroup[] = []
  order.forEach((name) => {
    const bucket = buckets.get(name)
    if (bucket?.length) groups.push({ name, items: bucket })
  })
  buckets.forEach((bucket, name) => {
    if (!order.includes(name)) groups.push({ name, items: bucket })
  })
  return groups
}

const menuItems = computed<MenuItem[]>(() =>
  Object.entries(visibleList.value).map(([name, items]) => ({
    name,
    id: `#${generateId(name)}`,
    count: items.length,
  }))
)

const selectScene = (key: string): void => {
  activeScene.value = key
  activeSection.value = ''
  if (isSearching.value) query.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onMenuClick = (item: MenuItem): void => {
  activeSection.value = item.name
}

const clearSearch = (): void => {
  query.value = ''
  searchInput.value?.focus()
}

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

let sectionElements: HTMLElement[] = []
let scrollTicking = false

const updateActiveSection = (): void => {
  if (!sectionElements.length) return
  const offset = window.innerWidth <= 1024 ? 150 : 110
  let current = ''

  for (const element of sectionElements) {
    if (element.getBoundingClientRect().top <= offset) {
      current = element.dataset.category || ''
    } else {
      break
    }
  }

  activeSection.value = current || sectionElements[0]?.dataset.category || ''
}

const refreshSections = async (): Promise<void> => {
  await nextTick()
  sectionElements = Array.from(document.querySelectorAll<HTMLElement>('.category-section'))
  updateActiveSection()
}

const onScroll = (): void => {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(() => {
    scrollTicking = false
    showBackTop.value = window.scrollY > 600
    updateActiveSection()
  })
}

const onWindowKeydown = (event: KeyboardEvent): void => {
  const target = event.target as HTMLElement | null
  const isTyping =
    !!target &&
    (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)

  if (event.key === '/' && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault()
    searchInput.value?.focus()
  }
}

const getPilotType = async (): Promise<void> => {
  try {
    const res = await axios.get<ApiResponse<PilotList>>('/back/pilot/getList')
    pilotList.value = normalizePilotList(res.data.result || {})
  } catch (err) {
    error.value = '导航数据加载失败，请稍后重试'
    console.log('pilot list load failed', err)
  } finally {
    loading.value = false
  }
}

watch(isSearching, (value) => {
  if (value) {
    activeScene.value = 'all'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

watch([pilotList, visibleList], () => {
  void refreshSections()
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onWindowKeydown)
  void getPilotType()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onWindowKeydown)
})
</script>

<style lang="scss" scoped>
.pilot-page {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  grid-template-areas:
    'hero hero'
    'menu content';
  gap: 18px 24px;
  align-items: start;
  align-content: start;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 40px;
  position: relative;
  box-sizing: border-box;
}

.pilot-hero {
  grid-area: hero;
  min-width: 0;
  padding: 10px 2px 4px;
}

.hero-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.hero-copy {
  min-width: 0;
}

.hero-title {
  margin: 0;
  color: var(--dm-text-primary, #1f2329);
  font-size: 22px;
  line-height: 30px;
  font-weight: 700;
}

.hero-subtitle {
  margin: 2px 0 0;
  color: var(--dm-text-tertiary, #8a9099);
  font-size: 13px;
  line-height: 20px;
}

.hero-hint {
  flex: 0 0 auto;
  padding-top: 4px;
  color: var(--dm-text-tertiary, #8a9099);
  font-size: 12px;
  white-space: nowrap;
}

kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 20px;
  padding: 0 5px;
  border: 1px solid var(--dm-border-primary, #ddd6c8);
  border-radius: 4px;
  background: var(--dm-bg-secondary, #fff);
  color: var(--dm-text-secondary, #545c63);
  font-family: inherit;
  font-size: 11px;
  line-height: 1;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  max-width: 760px;
  margin-top: 12px;
  padding: 0 12px;
  border: 1px solid var(--dm-border-primary, #e2dccf);
  border-radius: 10px;
  background: var(--dm-bg-secondary, #fff);
  scroll-margin-top: 90px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-box.focused {
  border-color: var(--brand-ant);
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.12);
}

.search-icon {
  flex: 0 0 auto;
  color: var(--dm-text-tertiary, #9aa0a6);
}

.search-box input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--dm-text-primary, #1f2329);
  font-size: 14px;
}

.search-box input::-webkit-search-cancel-button {
  display: none;
}

.search-box input::placeholder {
  color: var(--dm-text-tertiary, #9aa0a6);
}

.search-kbd {
  flex: 0 0 auto;
}

.clear-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--dm-text-tertiary, #9aa0a6);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.clear-btn:hover {
  background: var(--dm-bg-tertiary, #f0f2f5);
  color: var(--dm-text-primary, #1f2329);
}

.search-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 760px;
  margin-top: 6px;
  color: var(--dm-text-tertiary, #8a9099);
  font-size: 12px;
  line-height: 18px;
}

.search-meta strong {
  color: var(--brand-ant);
  font-weight: 600;
}

.link-btn {
  padding: 0;
  border: none;
  background: transparent;
  color: var(--brand-ant);
  font-size: 12px;
  cursor: pointer;
}

.quick-row {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 760px;
  margin-top: 8px;
}

.quick-label {
  flex: 0 0 auto;
  color: var(--dm-text-tertiary, #8a9099);
  font-size: 12px;
}

.quick-list {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 6px;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.quick-list::-webkit-scrollbar {
  display: none;
}

.quick-chip {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  max-width: 160px;
  padding: 4px 9px;
  overflow: hidden;
  border: 1px solid var(--dm-border-primary, #e5e0d6);
  border-radius: 999px;
  background: var(--dm-bg-secondary, #fff);
  color: var(--dm-text-secondary, #545c63);
  font-size: 12px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quick-chip:hover {
  border-color: var(--brand-ant);
  color: var(--brand-ant);
}

.quick-chip.favorite {
  border-color: rgba(245, 166, 35, 0.4);
}

.quick-clear {
  flex: 0 0 auto;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--dm-text-tertiary, #9aa0a6);
  font-size: 12px;
  cursor: pointer;
}

.quick-clear:hover {
  color: var(--brand-ant);
}

.scene-tabs {
  display: flex;
  gap: 8px;
  margin-top: 14px;
  padding-bottom: 2px;
  overflow-x: auto;
  scrollbar-width: none;
}

.scene-tabs::-webkit-scrollbar {
  display: none;
}

.scene-tab {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 6px;
  padding: 7px 12px;
  border: 1px solid var(--dm-border-primary, #e5e0d6);
  border-radius: 999px;
  background: var(--dm-bg-secondary, #fff);
  color: var(--dm-text-secondary, #545c63);
  font-size: 13px;
  line-height: 18px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background-color 0.2s;
}

.scene-tab:hover {
  border-color: var(--brand-ant);
  color: var(--brand-ant);
}

.scene-tab.active {
  border-color: var(--brand-ant);
  background: rgba(24, 144, 255, 0.08);
  color: var(--brand-ant);
  font-weight: 600;
}

.scene-tab:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}

.scene-tab-count {
  min-width: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(109, 114, 120, 0.1);
  font-size: 11px;
  line-height: 18px;
  text-align: center;
  opacity: 0.8;
}

:deep(.pilot-float-menu) {
  grid-area: menu;
  position: sticky !important;
  top: 88px !important;
  left: auto !important;
  transform: none !important;
  width: 150px !important;
  // 侧栏在页面顶部时从 hero 下方开始，需要为 header + hero 预留高度。
  max-height: calc(100vh - 320px) !important;
  overflow-y: auto !important;
  padding-bottom: 4px;
  border-radius: 8px;
  background: var(--dm-bg-secondary, #fff);
  box-shadow: 0 4px 14px rgba(55, 99, 170, 0.08);
  z-index: 10 !important;

  li {
    padding: 9px 12px;
    border-bottom: 1px solid var(--dm-border-primary, #f0f0f0);
    color: var(--dm-text-secondary, #333);
    font-size: 13px;
    text-align: left;
  }

  li:last-child {
    border-bottom: none;
  }

  li:hover,
  li.active {
    color: var(--brand-ant);
    background-color: var(--dm-sidebar-bg-active, #e6f7ff);
  }

  li::after {
    display: none;
  }
}

.content-class {
  grid-area: content;
  min-width: 0;
}

.category-section {
  scroll-margin-top: 88px;
}

.category-section + .category-section {
  margin-top: 10px;
}

.topic-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0 10px;
}

.topic-title {
  margin: 0;
  color: var(--dm-text-primary, #1f2329);
  font-size: 19px;
  line-height: 26px;
  font-weight: 700;
}

.topic-count {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--dm-bg-tertiary, #eef1f5);
  color: var(--dm-text-tertiary, #8a9099);
  font-size: 12px;
  line-height: 20px;
}

.topic-scene {
  margin-left: auto;
  color: var(--dm-text-tertiary, #9aa0a6);
  font-size: 11px;
  white-space: nowrap;
}

.subcategory-group + .subcategory-group {
  margin-top: 14px;
}

.subcategory-head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 2px 8px;
}

.subcategory-name {
  color: var(--dm-text-secondary, #545c63);
  font-size: 13px;
  font-weight: 600;
}

.subcategory-count {
  color: var(--dm-text-tertiary, #9aa0a6);
  font-size: 11px;
}

.subcategory-head::after {
  flex: 1;
  height: 1px;
  margin-left: 4px;
  background: var(--dm-border-primary, #eee8dc);
  content: '';
}

.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  color: var(--dm-text-tertiary, #8a9099);
}

.error-message {
  margin: 40px 0;
  color: #f56c6c;
  font-size: 14px;
  text-align: center;
}

.empty-state {
  padding: 70px 20px;
  text-align: center;
}

.empty-title {
  margin: 0;
  color: var(--dm-text-primary, #1f2329);
  font-size: 16px;
  font-weight: 600;
}

.empty-hint {
  margin: 8px 0 0;
  color: var(--dm-text-tertiary, #8a9099);
  font-size: 13px;
}

.empty-reset {
  margin-top: 16px;
  padding: 7px 14px;
  border: 1px solid var(--brand-ant);
  border-radius: 8px;
  background: transparent;
  color: var(--brand-ant);
  font-size: 13px;
  cursor: pointer;
}

.empty-reset:hover {
  background: rgba(24, 144, 255, 0.08);
}

.back-top {
  position: fixed;
  right: 28px;
  bottom: 28px;
  z-index: 20;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid var(--dm-border-primary, #e5e0d6);
  border-radius: 50%;
  background: var(--dm-bg-secondary, #fff);
  box-shadow: 0 6px 18px rgba(55, 99, 170, 0.16);
  color: var(--dm-text-secondary, #545c63);
  font-size: 18px;
  cursor: pointer;
}

.back-top:hover {
  border-color: var(--brand-ant);
  color: var(--brand-ant);
}

@media (min-width: 1200px) {
  // 给右侧固定的“官方微信”留出空间，避免 6 列卡片被浮层压住。
  .pilot-page {
    padding-right: 96px;
  }
}

@media (max-width: 1024px) {
  .pilot-page {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0 16px 32px;
  }

  .pilot-hero {
    order: 0;
    width: 100%;
    padding-top: 8px;
  }

  :deep(.pilot-float-menu) {
    order: 1;
    position: static !important;
    top: auto !important;
    display: flex !important;
    width: 100% !important;
    max-height: none !important;
    margin: 4px 0 14px;
    padding: 3px;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(55, 99, 170, 0.1);
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      flex: 0 0 auto;
      padding: 8px 11px;
      border-bottom: none !important;
      border-radius: 6px;
      font-size: 13px;
      white-space: nowrap;
    }

    li + li::after {
      display: none;
    }
  }

  .content-class {
    order: 2;
    width: 100%;
  }

  .category-section {
    scroll-margin-top: 84px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  // 平板宽度仍会显示右侧“官方微信”，预留一条窄边。
  .pilot-page {
    padding-right: 80px;
  }
}

@media (min-width: 1025px) and (max-width: 1199px) {
  .pilot-page {
    padding-right: 80px;
  }
}

@media (max-width: 640px) {
  .pilot-page {
    padding: 0 14px 28px;
  }

  .hero-title {
    font-size: 20px;
    line-height: 28px;
  }

  .hero-hint {
    display: none;
  }

  .search-box {
    height: 42px;
    margin-top: 10px;
  }

  .search-meta {
    font-size: 11px;
  }

  .quick-row {
    align-items: flex-start;
  }

  .scene-tabs {
    margin-top: 10px;
  }

  .scene-tab {
    padding: 6px 10px;
    font-size: 12px;
  }

  .topic-title {
    font-size: 18px;
  }

  .topic-scene {
    display: none;
  }

  .quick-label {
    padding-top: 4px;
  }

  .back-top {
    right: 14px;
    bottom: 18px;
    width: 38px;
    height: 38px;
  }
}
</style>
