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
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchForm from './SearchForm.vue'
import FilterConditions from './FilterConditions.vue'
import { useFilterData } from './useFilterData'
import type { RecruitQueryParam } from '@/api/recruit'

const searchFormRef = ref<InstanceType<typeof SearchForm> | null>(null)
const currentCity = ref('')

const { selectList, clear, changeCheck, changeComCheck, reset, buildQueryParams } =
  useFilterData()

const emit = defineEmits<{
  (e: 'getRecruit', param: RecruitQueryParam): void
  (e: 'sendParam', param: RecruitQueryParam): void
}>()

const openDialog = () => {
  // 通过 SearchForm 组件打开对话框
  if (searchFormRef.value && searchFormRef.value.openDialog) {
    searchFormRef.value.openDialog()
  }
}

const handleCityChange = (item: { name: string }) => {
  currentCity.value = item.name
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
  const param = buildQueryParams(keyword)
  emit('getRecruit', param)
  emit('sendParam', param)
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
