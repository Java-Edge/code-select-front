<template>
  <section class="view-box">
    <div class="head-line">
      <h2 class="head-title">{{ title }}</h2>
      <span class="head-count">{{ list.length }}</span>
    </div>
    <div class="item-list">
      <div
        v-for="item in list"
        :key="`${item.id}-${item.link}`"
        class="item-class"
        :class="{ 'is-favorite': favoriteLinks.has(item.link) }"
      >
        <a
          class="item-link"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          :title="item.link"
          @click="onOpen(item)"
        >
          <img
            :src="item.img || defaultIcon"
            :alt="item.name"
            width="24"
            height="24"
            loading="lazy"
            decoding="async"
            referrerpolicy="no-referrer"
            @error="onImgError"
          />
          <span class="item-name">{{ item.name }}</span>
          <span class="external-mark" aria-hidden="true">↗</span>
        </a>
        <button
          class="fav-btn"
          type="button"
          :class="{ active: favoriteLinks.has(item.link) }"
          :aria-label="favoriteLinks.has(item.link) ? '取消常用' : '加入常用'"
          :aria-pressed="favoriteLinks.has(item.link)"
          :title="favoriteLinks.has(item.link) ? '取消常用' : '加入常用'"
          @click.stop.prevent="onToggleFavorite(item)"
        >
          {{ favoriteLinks.has(item.link) ? '★' : '☆' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from '@/axios'
import defaultIcon from '@/assets/default-icon.svg'
import type { ApiResponse } from '@/types/api'
import type { PilotItem } from '@/types/pilot'
import { usePilotPrefs } from '@/composables/usePilotPrefs'

interface PilotParam {
  type: number
  category: string
  order: string
  isOnlyShow: boolean
  itemId: string | number
}

const props = withDefaults(
  defineProps<{
    title?: string
    list?: PilotItem[]
    category?: string
  }>(),
  {
    title: '',
    list: () => [],
    category: '',
  }
)

const emit = defineEmits<{
  open: [item: PilotItem, category: string]
}>()

const { favoriteLinks, toggleFavorite } = usePilotPrefs()

const queryParams = ref<{ param: PilotParam }>({
  param: {
    type: 1,
    category: '',
    order: '',
    isOnlyShow: false,
    itemId: '',
  },
})

const onImgError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  if (target.dataset.fallback === '1') return
  target.dataset.fallback = '1'
  target.src = defaultIcon
}

const onOpen = (item: PilotItem): void => {
  emit('open', item, props.category)
  queryParams.value.param.itemId = item.id
  void axios.post<ApiResponse<unknown>>('/back/pilot/pv', queryParams.value).catch(() => {
    // 点击统计失败不影响跳转。
  })
}

const onToggleFavorite = (item: PilotItem): void => {
  toggleFavorite(item, props.category)
}
</script>

<style lang="scss" scoped>
.view-box {
  width: 100%;
  margin: 0 0 24px;
  border-radius: 8px;
  padding: 0 2px;
}

.head-line {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0 10px;
}

.head-title {
  margin: 0;
  font-size: 18px;
  line-height: 26px;
  font-weight: 600;
  color: var(--dm-text-primary, #1f2329);
}

.head-count {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--dm-bg-tertiary, #eef1f5);
  color: var(--dm-text-tertiary, #8a9099);
  font-size: 12px;
  line-height: 1;
}

.item-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

.item-class {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 54px;
  padding: 10px 12px;
  overflow: hidden;
  border: 1px solid #fff;
  border-radius: 8px;
  background-color: #f5f7fd;
  background-image: linear-gradient(0deg, #fff, #f3f5f8);
  box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, 0.1);
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.item-class:hover {
  background-color: #dce3f8;
}

.item-class.is-favorite {
  border-color: rgba(245, 166, 35, 0.45);
}

.item-link {
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 0;
  gap: 8px;
  padding-right: 20px;
  color: inherit;
  text-decoration: none;
}

.item-class img {
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.item-name {
  flex: 1;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: var(--dm-text-primary, #333);
  font-size: 14px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.external-mark {
  flex: 0 0 auto;
  color: var(--dm-text-tertiary, #9aa0a6);
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.item-class:hover .external-mark,
.item-link:focus-visible .external-mark {
  opacity: 1;
}

.fav-btn {
  position: absolute;
  top: 50%;
  right: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--dm-text-tertiary, #b3b8c2);
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  opacity: 0.35;
  transform: translateY(-50%);
  transition: opacity 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

.fav-btn:hover,
.fav-btn.active,
.fav-btn:focus-visible {
  opacity: 1;
  color: #f5a623;
  background: rgba(245, 166, 35, 0.12);
}

.item-link:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 3px;
  border-radius: 4px;
}

@media (hover: none) {
  .fav-btn {
    opacity: 0.8;
  }
}

@media (max-width: 640px) {
  .view-box {
    margin-bottom: 20px;
    padding: 0;
  }

  .head-title {
    font-size: 17px;
  }

  .item-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .item-class {
    min-height: 50px;
    padding: 9px 10px;
  }

  .item-class img {
    flex-basis: 22px;
    width: 22px;
    height: 22px;
  }

  .item-name {
    font-size: 13px;
  }

  .item-link {
    gap: 6px;
    padding-right: 18px;
  }
}
</style>
