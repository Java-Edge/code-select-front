<template>
  <div class="course-navigation">
    <filterVue @getRecruit="getRecruit" />
    <!-- 内容区域 -->
    <div class="content">
      <!-- 内容区域 -->
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
import { onMounted, ref } from 'vue'
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
    })
}

// 搜索/筛选入口：条件变化后从第 1 页重新查（旧实现沿用当前页码，翻到深页后筛选必空）
const getRecruit = (param: RecruitQueryParam) => {
  params.value = param
  page.value = 1
  fetchList()
}

const handleCurrentChange = (currentPage: number) => {
  page.value = currentPage
  fetchList()
}

onMounted(fetchList)
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
