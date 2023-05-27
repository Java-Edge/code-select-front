<template>
  <div class="pilot-page">
    <!-- 左侧悬浮菜单 -->
    <FloatMenu 
      :menu-items="menuItems"
      @menuClick="onMenuClick"
      class="pilot-float-menu"
    />

    <div class="content-class">
      <div v-if="loading" class="loading-wrapper">
        <el-icon class="is-loading" :size="28"><Loading /></el-icon>
      </div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else>
        <!-- 为每个分类添加id作为锚点 -->
        <div 
          v-for="(value, key) in pilotList" 
          :key="key"
          :id="generateId(key)"
          class="category-section"
        >
          <CategoryComponents :list="value" :title="key"></CategoryComponents>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CategoryComponents from "@/components/categoryComponents.vue";
import FloatMenu from "@/components/common/FloatMenu.vue";
import axios from '@/axios';
import { Loading } from '@element-plus/icons-vue';

let pilotList = ref({});
let loading = ref(true);
let error = ref(null);

// 生成菜单项的id
const generateId = (key) => {
  return key.toLowerCase().replace(/\s+/g, '-');
};

// 根据pilotList动态生成菜单项
const menuItems = computed(() => {
  return Object.keys(pilotList.value).map(key => ({
    name: key,
    id: `#${generateId(key)}`
  }));
});

// 处理菜单点击
const onMenuClick = (item) => {
  console.log('Menu clicked:', item.name);
};

const getPilotType = async () => {
  try {
    const res = await axios.get('/back/pilot/getList');
    pilotList.value = res.data.result;
  } catch (err) {
    error.value = 'Failed to load pilot list';
    console.log('err', err);
  } finally {
    loading.value = false;
  }
};

getPilotType();
</script>

<style lang="scss" scoped>
.pilot-page {
  position: relative;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 20px;
}

// 覆盖默认的菜单样式
// 注意：FloatMenu 根元素本身就是 #menu，.pilot-float-menu class 也加在同一元素上
// 所以要直接写 :deep(.pilot-float-menu)，而不是 :deep(.pilot-float-menu) #menu
:deep(.pilot-float-menu) {
  position: fixed !important;
  top: 80px !important;   // header 72px + 8px 间距，不被遮挡
  left: 0 !important;
  transform: none !important;  // 清掉默认的 translateY(-50%) 垂直居中
  width: 150px !important;
  max-height: calc(100vh - 88px) !important;  // 不超出视口底部
  overflow-y: auto !important;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0 8px 8px 0;
  z-index: 10 !important;

  li {
    padding: 14px 20px;
    text-align: center;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.3s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover,
    &.active {
      color: var(--brand-ant);
      background-color: #e6f7ff;
    }

    &::after {
      display: none;
    }
  }
}

.content-class {
  padding-top: 10px;
  margin-left: 0; // 不需要为菜单留空间，因为菜单是固定定位
}

.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.category-section {
  margin-bottom: 40px;
  scroll-margin-top: 88px; // header 72px + 16px 缓冲，锚点跳转不被遮挡
}

.category-com {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.error-message {
  color: #f56c6c;
  text-align: center;
  margin: 20px 0;
}
</style>