<template>
  <ul id="menu" role="navigation" aria-label="导航分类">
    <li
      v-for="(item, index) in menuItems"
      :key="item.id || item.name"
      :title="item.name"
      :class="{ active: item.name === activeTitle }"
      role="button"
      tabindex="0"
      @click.stop="onMenuClick(item, index)"
      @keydown.enter.prevent="onMenuClick(item, index)"
      @keydown.space.prevent="onMenuClick(item, index)"
    >
      <span class="menu-label">{{ item.name }}</span>
      <span v-if="typeof item.count === 'number'" class="menu-count">{{ item.count }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface MenuItem {
  name: string
  id?: string
  count?: number
}

const props = withDefaults(
  defineProps<{
    menuItems: MenuItem[]
    activeName?: string
  }>(),
  {
    activeName: '',
  }
)

const emit = defineEmits<{
  menuClick: [item: MenuItem, index: number]
}>()

const localActive = ref('')
const activeTitle = computed(() => props.activeName || localActive.value)

// 使用 scrollIntoView + CSS scroll-margin-top，避免手算 header 高度导致锚点被遮挡。
const onMenuClick = (item: MenuItem, index: number): void => {
  localActive.value = item.name

  if (item.id) {
    const element = document.querySelector(item.id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  emit('menuClick', item, index)
}
</script>

<style lang="scss" scoped>
#menu {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 120px;
  height: auto;
  max-height: 100vh;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
  border-radius: 0 8px 8px 0;
  text-align: left;
  color: #6d7278;
  z-index: 3;
  user-select: none;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d8d8d8;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

#menu li {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 10px 14px;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.2s, background-color 0.2s;
}

#menu li.active,
#menu li:hover {
  color: #e02020;
}

#menu li:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: -2px;
}

.menu-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-count {
  flex: 0 0 auto;
  min-width: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: rgba(109, 114, 120, 0.12);
  color: inherit;
  font-size: 11px;
  line-height: 18px;
  text-align: center;
  opacity: 0.75;
}

#menu li + li::after {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -30px;
  content: '';
  width: 60px;
  border: 1px solid #f3f5f7;
}
</style>
