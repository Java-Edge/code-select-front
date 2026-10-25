<template>
  <ul>
    <li class="clearfix" v-for="item in list" :key="item.code">
      <span class="label">{{ item.name }}</span>
      <div class="select-list">
        <a
          @click="handleItemClick(cItem)"
          v-for="cItem in item.subLevelModelList"
          :key="cItem.code"
          :class="{ active: selectedIds.includes(cItem.code) }"
        >
          {{ cItem.name }}
          <el-icon v-show="selectedIds.includes(cItem.code)"><Check /></el-icon>
        </a>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'
import type { IndustryNode } from './useFilterData'

withDefaults(
  defineProps<{
    list: IndustryNode[]
    selectedIds?: number[]
  }>(),
  {
    selectedIds: () => []
  }
)

const emit = defineEmits<{
  (e: 'item-click', item: IndustryNode): void
}>()

const handleItemClick = (item: IndustryNode) => {
  emit('item-click', item)
}
</script>

<style lang="scss" scoped>
ul {
  width: 884px;
  height: 286px;
  
  li {
    position: relative;
    padding-left: 182px;
    
    .label {
      position: absolute;
      top: 8px;
      left: 0;
      z-index: 1;
      width: 182px;
      padding: 0 16px;
      font-size: 14px;
      font-weight: 500;
      color: #222;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .select-list {
      width: 100%;
      overflow: hidden;
      
      a {
        position: relative;
        width: 25%;
        float: left;
        padding: 8px 24px 8px 8px;
        font-size: 14px;
        font-weight: 400;
        color: #333;
        line-height: 20px;
        border-radius: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 0.2s linear;
        cursor: pointer;
        
        .el-icon {
          position: absolute;
          font-weight: 700;
          font-size: 12px;
          top: 12px;
          right: 8px;
          z-index: 1;
          color: #00a6a7;
        }
        
        &.active {
          color: #00a6a7;
          font-weight: 500;
        }
        
        &:hover {
          background: #f8f8f8;
          color: #00a6a7;
          font-weight: 500;
        }
      }
    }
  }
}
</style>

