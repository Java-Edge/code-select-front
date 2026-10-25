<template>
  <div class="job-search-wrapper">
    <SearchForm
      ref="searchFormRef"
      @search="handleSearch"
      @city-change="handleCityChange"
    />
    <FilterConditions
      :select-list="selectList"
      :current-city="currentCity"
      :clear="clear"
      @change="handleFilterChange"
      @reset="handleReset"
      @open-city-dialog="openDialog"
      @select-city="applyCity"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SearchForm from './SearchForm.vue'
import FilterConditions from './FilterConditions.vue'
import { useFilterData } from './useFilterData'
import type { RecruitQueryParam } from '@/api/recruit'

const searchFormRef = ref<InstanceType<typeof SearchForm> | null>(null)
// 默认城市与 city.json 的 locationCity 一致，热门城市行同步高亮
const currentCity = ref('上海')

const { selectList, clear, changeCheck, changeComCheck, reset, buildQueryParams } =
  useFilterData()

const emit = defineEmits<{
  (e: 'getRecruit', param: RecruitQueryParam): void
}>()

// 首屏查询由这里发起（携带默认筛选：上海 + java 工程师 + 社招），recruit.vue 不再兜底空参查询
onMounted(() => {
  emit('getRecruit', buildQueryParams(searchFormRef.value?.keyword, currentCity.value))
})

const openDialog = () => {
  // 通过 SearchForm 组件打开对话框
  if (searchFormRef.value && searchFormRef.value.openDialog) {
    searchFormRef.value.openDialog()
  }
}

// 城市变更统一入口（热门城市点击 / 城市弹窗确认）：同步第一行城市标签并立即按新城市查询
const applyCity = (city: string) => {
  currentCity.value = city
  if (searchFormRef.value) {
    searchFormRef.value.name = city
  }
  emit('getRecruit', buildQueryParams(searchFormRef.value?.keyword, city))
}

const handleCityChange = (item: { name: string }) => {
  applyCity(item.name)
}

const handleFilterChange = ({
  key,
  type,
  id,
  data
}: {
  key: string
  type?: boolean
  id?: number
  data?: number[]
}) => {
  if (data !== undefined) {
    changeComCheck(key, data)
  } else {
    changeCheck(key, type, id)
  }
}

const handleReset = () => {
  reset()
  if (searchFormRef.value) {
    searchFormRef.value.keyword = ''
    searchFormRef.value.name = ''
  }
  currentCity.value = ''
}

const handleSearch = ({ keyword }: { keyword?: string }) => {
  const param = buildQueryParams(keyword, currentCity.value)
  emit('getRecruit', param)
}
</script>

<style lang="scss" scoped>
.job-search-wrapper {
  background: #fff;
  max-width: 1152px;
  margin: 20px auto 0;
  border-radius: 12px;
  padding: 24px 24px 16px;
}
</style>
