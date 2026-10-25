<template>
  <div class="course-navigation">
    <filterVue @getRecruit="getRecruit" />
    <!-- 内容区域 -->
    <div class="content">
      <!-- 内容区域 -->
      <div v-if="fallbackUsed" class="search-fallback-tip">
        当前筛选条件下没有找到相关职位，已为你展示全站搜索结果
      </div>
      <div class="floorhd">
        <div class="grid_c1 floorhd_inner">
          <h3 class="floorhd_tit">招聘列表</h3>
        </div>
      </div>
      <RecruitList :recruits="recruits" />
      <pagination
        :page="page"
        :total="total"
        :size="size"
        @pageChange="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RecruitList from './recruit-list.vue'
import filterVue from './compontents/filter.vue'
import pagination from '@/components/pagination.vue'
import { recruitApi } from '@/api/recruit'
import type { RecruitDisplayItem, RecruitQueryParam } from '@/api/recruit'
import { toDisplayItem } from './transform'

const total = ref(0)
const page = ref(1)
const size = ref(10)
const recruits = ref<RecruitDisplayItem[]>([])
const params = ref<RecruitQueryParam>({})
// 关键词在当前筛选下搜空时自动放宽为全站搜索，此时置 true 显示提示条
const fallbackUsed = ref(false)

const fetchList = () => {
  recruitApi
    .selectByCondition({
      pageNo: page.value,
      pageSize: size.value,
      param: { ...params.value }
    })
    .then((response) => {
      const result = response.data.result
      recruits.value = result.records.map(toDisplayItem)
      total.value = result.total
      fallbackToKeywordSearch(result.total)
    })
}

// 带关键词却搜到 0 条：保留关键词、清掉城市/类型等筛选再查一次，避免"啥都搜不到"
const fallbackToKeywordSearch = (resultTotal: number) => {
  const param = params.value
  if (!param.keyword || resultTotal > 0 || fallbackUsed.value) return
  const hasExtraFilter = Object.entries(param).some(([key, value]) => {
    if (key === 'keyword') return false
    return Array.isArray(value) ? value.length > 0 : !!value
  })
  if (!hasExtraFilter) return
  fallbackUsed.value = true
  params.value = { keyword: param.keyword }
  page.value = 1
  fetchList()
}

// 搜索/筛选入口：条件变化后从第 1 页重新查（旧实现沿用当前页码，翻到深页后筛选必空）
const getRecruit = (param: RecruitQueryParam) => {
  params.value = param
  page.value = 1
  fallbackUsed.value = false
  fetchList()
}

const handleCurrentChange = (currentPage: number) => {
  page.value = currentPage
  fetchList()
}
</script>

<style lang="scss" scoped>
.course-navigation {
  max-width: 1152px;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-wrap: wrap;
}

.search-fallback-tip {
  width: 1152px;
  margin: 8px auto 0;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 20px;
  color: #94642a;
  background: #fdf6ec;
  border: 1px solid #f3d19e;
  border-radius: 8px;
}

.floorhd {
  height: 65px;

  .grid_c1 {
    margin: 0 auto;
    width: 1152px;

    .floorhd_tit {
      position: relative;
      width: 150px;
      height: 45px;
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      line-height: 45px;
      padding: 0 30px;
      margin: 0 auto 20px;
      overflow: hidden;
      color: #333;
    }
  }
}

.floorhd_tit::before {
  background-position: 0 0;
  left: 0;
}

.floorhd_tit:after {
  background-position: -25px 0;
  right: 0;
}

.floorhd_tit:after,
.floorhd_tit:before {
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -10px;
  background-image: url("@/assets/sprite.png");
  width: 25px;
  height: 20px;
}
</style>
