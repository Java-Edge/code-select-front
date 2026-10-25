<template>
  <div class="discussion-container">
    <div class="page-intro">
      <h2 class="page-title">公司舆情</h2>
      <p class="page-subtitle">汇聚脉脉、知乎、头条号、抖音等平台的真实讨论，助你求职避坑——薪资福利、裁员动态、业务利润、组织架构变动一网打尽</p>
    </div>

    <div class="filter-box">
      <div class="company-filter-box">
        <el-select
          v-model="companyCondition"
          multiple
          filterable
          placeholder="选择公司"
          style="width: 240px"
          collapse-tags
          clearable
          @change="handleFilterChange"
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
          @change="handleFilterChange"
          placeholder="搜索公司 / 薪资 / 裁员 / 组织架构等关键词"
          clearable
        />
      </div>
    </div>

    <div
      class="discussion-card"
      v-for="item in tableData"
      :key="item.contentId"
      :class="{ clickable: !!item.contentUrl }"
      @click="onCardClick(item)"
    >
      <div class="card-header">
        <span class="company-badge">{{ item.companyName }}</span>
        <span v-if="item.authDisplayInfo" class="source-badge">{{ item.authDisplayInfo }}</span>
        <span class="create-time">{{ item.createTime }}</span>
      </div>
      <div v-if="item.title" class="discussion-title">{{ item.title }}</div>
      <div class="discussion-content">{{ stripHtml(item.content) }}</div>
      <div v-if="item.contentUrl" class="card-footer">
        <span class="origin-link">查看原文 →</span>
      </div>
    </div>

    <el-empty v-if="!tableData.length" description="暂无相关舆情信息" />

    <pagination :page="page" :total="total" @pageChange="handleCurrentChange"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import debounce from 'lodash-es/debounce';
import pagination from "@/components/pagination.vue";
import { stripHtml } from '@/utils/text';
import { usePagedList, type PagedResult } from '@/composables/usePagedList';
import { companyDiscussionApi, type CompanyDiscussionItem } from '@/api/company-discussion';

const companyOptions = ref<string[]>([]);
const companyCondition = ref<string[]>([]);
const keyword = ref("");

/**
 * 获取公司数据（与面经页同一数据源）
 */
const getCompanyData = (): void => {
  companyDiscussionApi.getCompanyList().then((res) => {
    companyOptions.value = res.data.result;
  });
};
getCompanyData();

// 公司筛选与关键词搜索共用防抖刷新
const handleFilterChange = debounce(() => {
  load({
    company: companyCondition.value,
    keyword: keyword.value,
  });
}, 300);

// 数据相关：分页与列表由 usePagedList 统一管理
// fetchFn 负责把分页参数 + 筛选条件拼装成后端契约的请求体
const { page, total, list: tableData, load, changePage: handleCurrentChange } = usePagedList<CompanyDiscussionItem>(
  async ({ pageNo, pageSize }, extraParam) => {
    const params = {
      pageNo,
      pageSize,
      param: { ...extraParam },
    };
    const res = await companyDiscussionApi.search(params);
    return { records: res.data.result.records, total: res.data.result.total };
  }
);

// 首次加载（路由组件每次进入都会重新执行 setup，故此 load 同时覆盖「离开后回来」的刷新）
load();

/**
 * 卡片点击：有原文链接时新标签页打开来源平台帖子
 */
const onCardClick = (item: CompanyDiscussionItem): void => {
  if (item.contentUrl) {
    window.open(item.contentUrl, '_blank');
  }
};
</script>

<style lang="scss" scoped>
.discussion-container {
  min-height: 800px;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-intro {
  padding: 24px 0 8px;

  .page-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 0 0 8px;
  }

  .page-subtitle {
    font-size: 14px;
    color: #9199a1;
    margin: 0;
  }
}

.filter-box {
  display: flex;
}

.company-filter-box {
  margin-top: 22px;
  margin-left: 22px;

  &:first-child {
    margin-left: 0;
  }
}

.discussion-card {
  margin: 20px auto;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 5px;

  &.clickable {
    cursor: pointer;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .company-badge {
    background-color: var(--brand-primary, #409eff);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;
  }

  .source-badge {
    margin-left: 8px;
    background-color: #f0f2f5;
    color: #606266;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .create-time {
    margin-left: auto;
    font-size: 13px;
    color: #9199a1;
  }
}

.discussion-title {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
}

.discussion-content {
  font-size: 15px;
  color: #555555;
  line-height: 1.6;
}

.card-footer {
  margin-top: 12px;
  border-top: 1px solid #f0f0f0;
  padding-top: 10px;
  text-align: right;

  .origin-link {
    font-size: 13px;
    color: var(--brand-primary, #409eff);
  }
}
</style>
