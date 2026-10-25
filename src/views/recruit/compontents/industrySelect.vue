<template>
  <div
    class="condition-industry-select"
    :class="{ open: visable, 'is-select': count }"
    @mouseenter="visable = true"
    @mouseleave="visable = false"
  >
    <div class="current-select">
      <span class="placeholder-text">公司行业</span>
      <em class="select-num" v-if="count">({{ count }})</em>
    </div>
    <div
      class="filter-select-dropdown"
      @mouseenter="visable = true"
      @mouseleave="visable = false"
    >
      <IndustryList :list="list" :selected-ids="ids" @item-click="changeCheck" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, computed, watch } from 'vue'
import { industryList } from '../data/industryData.js'
import IndustryList from './IndustryList.vue'
import type { IndustryNode } from './useFilterData'

const props = withDefaults(
  defineProps<{
    clear?: boolean
  }>(),
  {
    clear: false
  }
)

watch(
  () => props.clear,
  () => {
    ids.value = []
  }
)

const list: IndustryNode[] = industryList
const ids = ref<number[]>([])
const count = computed(() => ids.value.length)
const visable = ref(false)

const emits = defineEmits<{
  (e: 'changeCheck', data?: number[]): void
}>()
const changeCheck = (item: IndustryNode) => {
  if (ids.value.includes(item.code)) {
    ids.value.splice(ids.value.indexOf(item.code), 1)
  } else {
    if (ids.value.length === 3) {
      ElMessage.error('最多选择3个哦')
      return false
    }
    ids.value.push(item.code)
  }
  emits('changeCheck', ids.value)
}
</script>

<style lang="scss" scoped>
.condition-industry-select {
  float: left;
  margin-top: 20px;
  margin-right: 20px;
  position: relative;
  background: #f8f8f8;
  border-radius: 4px;
  overflow: hidden;
  .current-select {
    position: relative;
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    color: #222;
    line-height: 20px;
    padding: 6px 24px 6px 12px;
    cursor: pointer;
    transition: all 0.2s linear;
    .placeholder-text {
      display: inline-block;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
    }
    .select-num {
      font-style: normal;
      display: inline-block;
      margin-left: 2px;
      vertical-align: bottom;
    }
  }
  .current-select:after {
    content: " ";
    position: absolute;
    top: 12px;
    right: 12px;
    width: 4px;
    height: 7px;
    background: url(@/assets/arrow.png) -6px -16px/10px auto no-repeat;
    transform: rotate(90deg);
    z-index: 1;
  }
  .filter-select-dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 4;
    padding: 4px 0;
    background: #fff;
    overflow: auto;
    overflow: overlay;
    border-radius: 12px;
    border: 1px solid #ebeef5;
    transition: opacity 0.2s linear;
  }
}

.condition-industry-select.open {
  background: #e5f8f8;
  overflow: visible;
}
.condition-industry-select.open .current-select:after {
  background-position: -6px -8px;
  transform: rotate(270deg);
}
.condition-industry-select.is-select .current-select:after {
  background: url(@/assets/arrow.png) -6px -8px/10px auto no-repeat;
}
.condition-industry-select.is-select .current-select {
  color: #00a6a7;
  background: #e5f8f8;
  font-weight: 500;
}
.condition-industry-select.open .current-select {
  color: #00a6a7;
}
.condition-industry-select.open:after {
  content: " ";
}
.condition-industry-select:after {
  content: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 8px;
  z-index: 4;
  background: transparent;
}
</style>