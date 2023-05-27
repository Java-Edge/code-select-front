<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle-btn"
    :title="isDark ? '切换到明亮模式' : '切换到暗黑模式'"
  >
    <el-icon v-if="isDark" class="theme-icon">
      <Moon />
    </el-icon>
    <el-icon v-else class="theme-icon">
      <Sunny />
    </el-icon>
  </button>
</template>

<script setup>
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useTheme } from '@/composables/useTheme'

// isDark 为模块级单例（main.js 已在挂载前 initTheme），toggleTheme 切换并持久化
const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle-btn:hover {
  background: #f1f5f9;
  transform: scale(1.1);
  border-color: #cbd5e1;
}

.theme-icon {
  font-size: 16px;
  color: var(--text-muted);
}

/* 暗黑模式样式 */
html.dark .theme-toggle-btn {
  background: #334155;
  border-color: #475569;
}

html.dark .theme-toggle-btn:hover {
  background: #475569;
  border-color: #64748b;
}

html.dark .theme-icon {
  color: #f1f5f9;
}
</style>
