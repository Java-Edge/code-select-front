<template>
  <div class="search-condition-wrapper clearfix">
    <div class="city-area-select">
      <div class="city-area-dropdown">
        <div class="area-dropdown-item">
          <ul class="dropdown-city-list">
            <li
              v-for="item in data.hotCityList"
              :key="item.code"
              :class="{ active: item.name === currentCity }"
            >
              {{ item.name }}
            </li>
            <li @click="openCityDialog">其它城市</li>
          </ul>
        </div>
      </div>
    </div>
    <industry-select
      :clear="clear"
      @changeCheck="(data) => handleChange('industry', data)"
    />
    <position-select
      :clear="clear"
      @changeCheck="(data) => handleChange('position', data)"
    />
    <my-select
      :list="item.data"
      :multiple="item.multiple"
      v-for="(item, key) in selectList"
      :key="key"
      :name="item.name"
      @changeCheck="(type, data) => handleSelectChange(key, type, data)"
    />
    <a @click="handleReset" class="clear-search-btn">清空筛选条件</a>
  </div>
</template>

<script setup lang="ts">
import MySelect from './mySelect.vue'
import IndustrySelect from './industrySelect.vue'
import PositionSelect from './positionSelect.vue'
import data from '../city.json'
import type { FilterGroup } from './useFilterData'

defineProps<{
  selectList: Record<string, FilterGroup>
  currentCity?: string
  clear?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', payload: { key: string; type?: boolean; id?: number; data?: number[] }): void
  (e: 'reset'): void
  (e: 'open-city-dialog'): void
}>()

const handleChange = (key: string, data?: number[]) => {
  emit('change', { key, data })
}

const handleSelectChange = (key: string, type?: boolean, id?: number) => {
  emit('change', { key, type, id })
}

const handleReset = () => {
  emit('reset')
}

const openCityDialog = () => {
  emit('open-city-dialog')
}
</script>

<style lang="scss" scoped>
.search-condition-wrapper {
  margin: 0 auto;
  
  .city-area-select {
    margin-top: 20px;
    
    .area-dropdown-item {
      position: relative;
      
      .dropdown-city-list {
        margin: 18px 2px -10px;
        
        li {
          display: inline-block;
          white-space: nowrap;
          font-size: 14px;
          font-weight: 400;
          color: #333;
          line-height: 20px;
          cursor: pointer;
          margin: 0 10px 10px;
          
          &.active {
            position: relative;
            color: #00a6a7;
            font-weight: 500;
          }
        }
      }
    }
  }
  
  .clear-search-btn {
    float: right;
    font-size: 14px;
    font-weight: 400;
    color: #999;
    line-height: 20px;
    margin-top: 26px;
    transition: all 0.2s linear;
    cursor: pointer;
    
    &:hover {
      color: #00a6a7;
    }
  }
}
</style>

