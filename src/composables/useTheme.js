import { ref } from 'vue'

/**
 * 主题状态管理 composable（单一真相源）
 *
 * 此前 main.js 与 ThemeToggle.vue 各自实现一遍「读取 localStorage + 切换
 * documentElement.dark class + 维护 isDark」的逻辑，形成双源、且 isDark 仅存
 * 组件局部 ref 无法跨组件共享。本模块把状态收敛为模块级单例 ref，全局共享。
 *
 * 约定：localStorage key = 'theme'，取值 'dark' | 'light'（缺失视为 light）。
 */

const STORAGE_KEY = 'theme'

// 模块级单例：所有调用方共享同一份 isDark 状态
const isDark = ref(false)
let initialized = false

const applyTheme = (dark) => {
  const root = document.documentElement
  if (dark) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

// 在 app mount 前调用一次，保证首屏无主题闪烁
export const initTheme = () => {
  const dark = localStorage.getItem(STORAGE_KEY) === 'dark'
  isDark.value = dark
  applyTheme(dark)
  initialized = true
}

// 切换并持久化
export const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}

export function useTheme() {
  // 防御性：若组件在 main.js 初始化前被使用，仍可保证状态正确
  if (!initialized) {
    initTheme()
  }
  return { isDark, initTheme, toggleTheme }
}
