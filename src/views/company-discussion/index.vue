<template>
  <div class="discussion-container">
    <div class="page-intro">
      <h2 class="page-title">公司舆情</h2>
      <p class="page-subtitle">汇聚脉脉、知乎、头条号、抖音等平台的真实讨论，助你求职避坑——薪资福利、裁员动态、业务利润、组织架构变动一网打尽</p>
      <p class="page-tip">每个公司仅展示近两年各平台最受关注的 Top10，更早的讨论参考价值有限</p>
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
        <el-select
          v-model="topicCondition"
          placeholder="选择话题"
          style="width: 160px"
          clearable
          @change="handleFilterChange"
        >
          <el-option
            v-for="item in topicOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="company-filter-box">
        <el-select
          v-model="rangeMonths"
          placeholder="时间范围"
          style="width: 120px"
          @change="handleFilterChange"
        >
          <el-option
            v-for="opt in rangeOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
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
      class="company-group"
      v-for="group in tableData"
      :key="group.companyName"
    >
      <div class="company-group-header">
        <h3 class="company-group-title">{{ group.companyName }}</h3>
        <span class="company-group-count">各平台 Top10 · 共 {{ group.total }} 条</span>
      </div>
      <div
        class="platform-section"
        v-for="pf in groupByPlatform(group.items)"
        :key="pf.source"
      >
        <div class="platform-header">
          <span class="source-badge" :class="sourceClass(pf.source)">{{ pf.source }}</span>
          <span class="tab-count">Top {{ pf.items.length }}</span>
        </div>
        <div
          class="discussion-card"
          v-for="item in pf.items"
          :key="item.contentId"
          :class="{ clickable: !!item.contentUrl }"
          @click="onCardClick(item)"
        >
          <div class="card-header">
            <span v-if="item.authDisplayInfo" class="auth-badge">{{ item.authDisplayInfo }}</span>
            <span v-if="item.likeCount != null || item.commentCount != null" class="heat-info">
              <template v-if="item.likeCount != null">👍 {{ item.likeCount }}</template>
              <template v-if="item.commentCount != null">&nbsp;💬 {{ item.commentCount }}</template>
            </span>
            <span class="create-time">{{ item.createTime }}</span>
          </div>
          <div class="topic-row" v-if="splitList(item.topic).length">
            <span v-for="tag in splitList(item.topic)" :key="tag" class="topic-tag">#{{ tag }}</span>
          </div>
          <div v-if="item.title" class="discussion-title">{{ item.title }}</div>
          <div class="discussion-content">{{ stripHtml(item.content) }}</div>
          <div v-if="item.contentUrl" class="card-footer">
            <span class="origin-link">查看原文 →</span>
          </div>
        </div>
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
import { usePagedList } from '@/composables/usePagedList';
import { companyDiscussionApi, type CompanyDiscussionItem, type CompanyHotGroup } from '@/api/company-discussion';

/** 平台展示顺序（与后端一致） */
const PLATFORM_ORDER = ["知乎", "抖音", "头条号", "脉脉", "牛客"];

interface PlatformGroup {
  source: string;
  items: CompanyDiscussionItem[];
}

const companyOptions = ref<string[]>([]);
const companyCondition = ref<string[]>([]);
const topicOptions = ref<string[]>([]);
const topicCondition = ref<string>("");
const keyword = ref("");

/**
 * 时间范围：企业组织架构两年基本调整完毕，默认只看近两年，避免过期信息误导
 */
const rangeOptions = [
  { label: "近半年", value: 6 },
  { label: "近一年", value: 12 },
  { label: "近两年", value: 24 },
  { label: "全部", value: 0 }
];
const rangeMonths = ref(24);

/** 把「最近 N 个月」换算成后端需要的 yyyy-MM-dd 起始日期；0 表示不限 */
const toStartDate = (months: number): string | undefined => {
  if (!months) return undefined;
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

/** 多值字段（话题）按逗号拆成数组，空值安全返回空数组 */
const splitList = (value: string | null): string[] => {
  if (!value) return [];
  return value.split(',').map((item) => item.trim()).filter(Boolean);
};

/** 把一个公司分组内的帖子按平台归类，并按固定平台顺序排列 */
const groupByPlatform = (items: CompanyDiscussionItem[]): PlatformGroup[] => {
  const map = new Map<string, CompanyDiscussionItem[]>();
  items.forEach((item) => {
    const key = item.source || "其他";
    const list = map.get(key) || [];
    list.push(item);
    map.set(key, list);
  });
  const orderOf = (platform: string): number => {
    const index = PLATFORM_ORDER.indexOf(platform);
    return index < 0 ? PLATFORM_ORDER.length : index;
  };
  return [...map.entries()]
    .sort((a, b) => orderOf(a[0]) - orderOf(b[0]) || a[0].localeCompare(b[0]))
    .map(([source, list]) => ({ source, items: list }));
};

/**
 * 公司与话题筛选项均取自近两年实际数据（含头条号/抖音新源引入的公司）
 */
const getFilterOptions = (): void => {
  companyDiscussionApi.getCompanies().then((res) => {
    companyOptions.value = res.data.result || [];
  });
  companyDiscussionApi.getTopics().then((res) => {
    topicOptions.value = res.data.result || [];
  });
};
getFilterOptions();

// 公司筛选、话题筛选、时间范围与关键词搜索共用防抖刷新（筛选后回到第一页）
const handleFilterChange = debounce(() => {
  applyFilters({
    company: companyCondition.value,
    topic: topicCondition.value || undefined,
    keyword: keyword.value,
    startTime: toStartDate(rangeMonths.value)
  });
}, 300);

// 数据相关：分页维度是公司数（每页 5 家公司），每组内部再按平台展示 Top10
const { page, total, list: tableData, applyFilters, changePage: handleCurrentChange } = usePagedList<CompanyHotGroup>(
  async ({ pageNo, pageSize }, extraParam) => {
    const params = {
      pageNo,
      pageSize,
      param: { ...extraParam },
    };
    const res = await companyDiscussionApi.getHotGroups(params);
    return { records: res.data.result.records, total: res.data.result.total };
  },
  { pageSize: 3 }
);

/**
 * 来源平台徽标样式类（各平台品牌色区分）
 */
const sourceClass = (source: string): string => {
  const map: Record<string, string> = {
    牛客: 'source-nowcoder',
    知乎: 'source-zhihu',
    脉脉: 'source-maimai',
    头条号: 'source-toutiao',
    抖音: 'source-douyin'
  };
  return map[source] || 'source-other';
};

// 首次加载默认按「近两年」过滤（路由组件每次进入都会重新执行 setup，故此处同时覆盖「离开后回来」）
applyFilters({ startTime: toStartDate(rangeMonths.value) });

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

  .page-tip {
    font-size: 13px;
    color: #e6a23c;
    margin: 8px 0 0;
  }
}

.filter-box {
  display: flex;
  flex-wrap: wrap;
}

.company-filter-box {
  margin-top: 22px;
  margin-left: 22px;

  &:first-child {
    margin-left: 0;
  }
}

.company-group {
  margin-top: 28px;
  border-top: 2px solid #f0f2f5;
  padding-top: 16px;
}

.company-group-header {
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;

  .company-group-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin: 0;
  }

  .company-group-count {
    margin-left: 12px;
    font-size: 13px;
    color: #9199a1;
  }
}

.source-badge {
  display: inline-block;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  padding: 2px 8px;
  border-radius: 4px;

  &.source-nowcoder {
    background-color: #00c261;
  }

  &.source-zhihu {
    background-color: #0066ff;
  }

  &.source-maimai {
    background-color: #2c7bf6;
  }

  &.source-toutiao {
    background-color: #f04142;
  }

  &.source-douyin {
    background-color: #000000;
  }

  &.source-other {
    background-color: #909399;
  }
}

.tab-count {
  margin-left: 6px;
  font-size: 12px;
  color: #9199a1;
}

.platform-section {
  margin-top: 14px;
}

.platform-header {
  display: flex;
  align-items: center;
  padding: 10px 0 4px;
  border-bottom: 1px dashed #e4e7ed;

  .tab-count {
    margin-left: 8px;
    font-size: 12px;
    color: #9199a1;
  }
}

.discussion-card {
  margin: 16px auto 0;
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

  .auth-badge {
    background-color: #f0f2f5;
    color: #606266;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .heat-info {
    margin-left: 8px;
    font-size: 12px;
    color: #9199a1;
  }

  .create-time {
    margin-left: auto;
    font-size: 13px;
    color: #9199a1;
  }
}

.topic-row {
  margin: 2px 0 10px;

  .topic-tag {
    display: inline-block;
    margin-right: 8px;
    background-color: #fdf6ec;
    color: #e6a23c;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 10px;
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
