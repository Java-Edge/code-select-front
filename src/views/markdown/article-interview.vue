<template>
  <div class="article-ranking-container" :class="{ 'is-loading': loading && tableData.length > 0 }">
    <div class="filter-box">
      <div class="filter-box1">
        <el-cascader
          v-model="value"
          :options="options"
          @change="handleChange"
          collapse-tags-tooltip="true"
          :props="props"
          expandTrigger="hover"
        />
      </div>
      <div class="filter-box2">
        <div
          class="filter-item"
          @click="handleFilterSelect('一面')"
          :class="{ active: activeMenu === '一面' }"
        >
          一面
        </div>
        <div
          class="filter-item"
          @click="handleFilterSelect('二面')"
          :class="{ active: activeMenu === '二面' }"
        >
          二面
        </div>
        <div
          class="filter-item"
          @click="handleFilterSelect('三面')"
          :class="{ active: activeMenu === '三面' }"
        >
          三面
        </div>
        <div
          class="filter-item"
          @click="handleFilterSelect('hr面')"
          :class="{ active: activeMenu === 'hr面' }"
        >
          hr面
        </div>
      </div>
      <div class="company-filter-box">
        <el-select
          v-model="companyCondition"
          multiple
          filterable
          placeholder="选择公司"
          style="width: 240px"
          collapse-tags
          clearable
          @change="handleChangeCompany"
        >
          <el-option
            v-for="item in companyOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="company-filter-box">
        <el-input
          v-model="keyword"
          @change="handleChangeCompany"
          placeholder="请输入内容"
        />
      </div>
    </div>

    <div v-if="error && tableData.length > 0" class="list-state list-state--inline">
      <span class="list-state__text">列表刷新失败：{{ error }}</span>
      <button type="button" class="state-btn" @click="retryLoad">重试</button>
    </div>

    <div v-if="loading && tableData.length === 0" class="list-state" aria-busy="true">
      <div class="skeleton-card" v-for="n in 3" :key="n">
        <div class="skeleton-line skeleton-line--title"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line skeleton-line--short"></div>
      </div>
    </div>

    <div v-else-if="error && tableData.length === 0" class="list-state">
      <p class="list-state__text">列表加载失败：{{ error }}</p>
      <button type="button" class="state-btn" @click="retryLoad">重新加载</button>
    </div>

    <div v-else-if="tableData.length === 0" class="list-state">
      <p class="list-state__text">没有找到相关面经</p>
      <button type="button" class="state-btn" @click="handleClearFilters">清空筛选</button>
    </div>

    <template v-else>
      <div
        class="interview-card"
        v-for="interview in tableData"
        :key="interview.id"
        @click="onShowClick(interview.id)"
      >
        <div class="interview-title">{{ interview.title }}</div>
        <div class="interview-content">{{ interview.summary || stripHtml(interview.content) }}</div>
        <div class="interview-type">
          <div class="interview-create-time">{{ interview.createAt }}</div>
          <div class="career-type">分类：{{ interview.careerName }}</div>
        </div>
      </div>

      <pagination :page="page" :total="total" @pageChange="handleCurrentChange"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "@/axios";
import debounce from 'lodash-es/debounce';
import pagination from "@/components/pagination.vue";
import { stripHtml } from '@/utils/text';
import { usePagedList, type PagedResult } from '@/composables/usePagedList';
import type { ApiResponse } from '@/types/api';

export interface InterviewItem {
  id: number | string
  title: string
  content: string
  /** 后端基于清洗后纯文本生成的列表摘要（可能为空，前端回退到 stripHtml(content)） */
  summary?: string
  createAt: string
  careerName: string
}

/** el-cascader 默认字段契约（value/label/children，模板未自定义 props 映射） */
interface CareerOption {
  value: number
  label: string
  children?: CareerOption[]
}

const companyOptions = ref<string[]>([]);
let companyCondition = ref("");
let activeMenu = ref("");
let jobId = ref(-1);
let keyword = ref("");

/**
 * 获取公司数据
 */
const getCompanyData = (): void => {
  axios.get<ApiResponse<string[]>>("/back/company/getList").then((res) => {
    companyOptions.value = res.data.result;
  });
};
getCompanyData();

// 数据相关：分页与列表由 usePagedList 统一管理
// fetchFn 负责把分页参数 + 筛选条件拼装成后端契约的请求体（param.articleType 固定为 1）
const { page, total, list: tableData, loading, error, load, applyFilters, changePage: handleCurrentChange } = usePagedList<InterviewItem>(
  async ({ pageNo, pageSize }, extraParam) => {
    const params = {
      pageNo,
      pageSize,
      param: { articleType: 1, ...extraParam },
    };
    const res = await axios.post<ApiResponse<PagedResult<InterviewItem>>>("/back/interview/selectByCondition", params);
    return { records: res.data.result.records, total: res.data.result.total };
  }
);

const currentFilter = (): Record<string, unknown> => ({
  jobId: jobId.value,
  content: activeMenu.value,
  company: companyCondition.value,
  keyword: keyword.value
});

// 公司筛选框
const handleChangeCompany = debounce(() => {
  applyFilters(currentFilter());
}, 300);

// 一面、二面单选框
const handleFilterSelect = (selectedItem: string): void => {
  if (activeMenu.value != selectedItem) {
    activeMenu.value = selectedItem;
    jobId.value = value[value.length - 1];
    applyFilters(currentFilter());
  } else {
    activeMenu.value = "";
    jobId.value = value[value.length - 1];
    applyFilters(currentFilter());
  }
};

// 级联选择框
const props: { expandTrigger: 'hover' | 'click' } = {
  expandTrigger: "hover",
};
let value: number[] = [-1];
const handleChange = (val: number[]): void => {
  jobId.value = val[val.length - 1];
  applyFilters(currentFilter());
};

// 筛选项数据不参与首屏关键路径，列表先渲染后再加载，避免三个请求抢同一连接带宽
const options = ref<CareerOption[]>([]);
window.setTimeout(() => {
  axios.get<ApiResponse<CareerOption[]>>("/back/career/getData").then((res) => {
    options.value = res.data.result;
  }).catch(() => {});
}, 0);

// 首次加载（路由组件每次进入都会重新执行 setup，故此 load 同时覆盖「离开后回来」的刷新；无需 onActivated）
// 先渲染筛选骨架，再用微任务发请求，给浏览器一次绘制机会
Promise.resolve().then(() => load());

// 翻页由 usePagedList 的 changePage 接管（见上方 load 解构：changePage: handleCurrentChange）

/**
 * 查看按钮点击事件
 * 在新标签页打开
 */
const onShowClick = (articleId: number | string): void => {
  window.open(`/#/intervieArticleDetail/${articleId}`, '_blank');
};

// 请求失败后的重试：用当前筛选条件重新发起（load 会记住最近一次 extraParam）
const retryLoad = (): void => {
  load(currentFilter());
};

// 清空全部筛选并回到第一页
const handleClearFilters = (): void => {
  value = [-1];
  activeMenu.value = "";
  jobId.value = -1;
  companyCondition.value = "";
  keyword.value = "";
  applyFilters({});
};
</script>

<style lang="scss" scoped>
/* 列表加载中：保留旧数据，半透明 + 禁点，避免闪烁 */
.is-loading {
  opacity: 0.6;
  pointer-events: none;
}

/* ---------- 列表状态：骨架 / 空结果 / 失败 ---------- */
.list-state {
  padding: 48px 0;
  text-align: center;
  color: #606266;
}
/* 有旧数据时的刷新失败：窄条内联提示，不顶掉列表 */
.list-state--inline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 10px 0;
}
.list-state__text {
  margin: 0 0 12px;
  font-size: 14px;
}
.list-state--inline .list-state__text {
  margin: 0;
}
.state-btn {
  padding: 6px 18px;
  font-size: 14px;
  color: #4d555d;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(144, 147, 153, 0.4);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
}
.state-btn:hover {
  color: #1f6feb;
  border-color: rgba(31, 111, 235, 0.5);
}
.skeleton-card {
  margin: 20px auto;
  max-width: 720px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(144, 147, 153, 0.25);
  border-radius: 5px;
}
.skeleton-line {
  height: 16px;
  margin: 12px 0;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(144, 147, 153, 0.15) 25%, rgba(144, 147, 153, 0.3) 37%, rgba(144, 147, 153, 0.15) 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.2s ease infinite;
}
.skeleton-line--title {
  height: 22px;
  width: 55%;
}
.skeleton-line--short {
  width: 35%;
}
@keyframes skeleton-loading {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}

/* 摘要固定两行：摘要由后端 summary 提供，前端只负责截断展示 */
.interview-content {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.filter-box {
  display: flex;
}
.company-filter-box {
  margin-top: 22px;
  margin-left: 22px;
}
.active {
  background-color: black !important;
  color: white;
}
.filter-item {
  background-color: white;
  width: 60px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  margin-left: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 2px;
  font-size: 15px;
  color: #606266;
}

.filter-box2 {
  display: flex;
  margin-top: 25px;
  margin-left: 20px;
}
.filter-box1 {
  margin-top: 20px;
}
.interview-card {
  margin: 20px auto;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 5px;
}
.interview-card:hover {
  cursor: pointer;
}

.interview-title {
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10px;
}

.interview-content {
  font-size: 16px;
  color: #555555;
  line-height: 1.6;
}

.interview-type {
  margin-top: 20px;
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
  color: #888888;
  display: flex;
}
.interview-type:hover {
  color: #0a1846;
  cursor: auto;
}

.interview-create-time {
  font-size: 14px;
}
.career-type {
  font-size: 14px;
  margin-left: 12px;
  border: 2px;
}

.article-ranking-container {
  min-height: 800px;
  max-width: 1152px;
  margin: 0 auto;
}
</style>
