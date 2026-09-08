<template>
  <div class="article-ranking-container">
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

    <div
      class="interview-card"
      v-for="interview in tableData"
      :key="interview.id"
      @click="onShowClick(interview.id)"
    >
      <div class="interview-title">{{ interview.title }}</div>
      <div class="interview-content">
        {{
          interview.content.length > 300
            ? stripHtml(interview.content.slice(0, 30)) + "..."
            : stripHtml(interview.content)
        }}
      </div>
      <div class="interview-type">
        <div class="interview-create-time">{{ interview.createAt }}</div>
        <div class="career-type">分类：{{ interview.careerName }}</div>
      </div>
    </div>

    <pagination :page="page" :total="total" @pageChange="handleCurrentChange"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/axios";
import debounce from 'lodash-es/debounce';
import pagination from "@/components/pagination.vue";
import { stripHtml } from '@/utils/text';
import { usePagedList } from '@/composables/usePagedList';

const companyOptions = ref([]);
let companyCondition = ref("");
let activeMenu = ref("");
let jobId = ref(-1);
let keyword = ref("");

/**
 * 获取公司数据
 */
const getCompanyData = () => {
  axios.get("/back/company/getList").then((res) => {
    companyOptions.value = res.data.result;
  });
};
getCompanyData();

// 公司筛选框
const handleChangeCompany = debounce(() => {
  load({
    jobId: jobId.value,
    content: activeMenu.value,
    company: companyCondition.value,
    keyword: keyword.value,
  });
}, 300);

// 一面、二面单选框
const handleFilterSelect = (selectedItem) => {
  if (activeMenu.value != selectedItem) {
    activeMenu.value = selectedItem;
    jobId.value = value[value.length - 1];
    load({
      jobId: jobId.value,
      content: activeMenu.value,
      company: companyCondition.value,
      keyword: keyword.value,
    });
  } else {
    activeMenu.value = "";
    jobId.value = value[value.length - 1];
    load({ jobId: jobId.value });
  }
};

// 级联选择框
const props = {
  expandTrigger: "hover",
};
let value = [-1];
const handleChange = (value) => {
  jobId.value = value[value.length - 1];
  load({
    jobId: jobId.value,
    content: activeMenu.value != "" ? activeMenu.value : "",
    company: companyCondition.value,
    articleType: 1,
    keyword: keyword.value
  });
};

// 获取级联筛选框数据
const options = ref([]);
axios.get("/back/career/getData").then((res) => {
  options.value = res.data.result;
});

// 数据相关：分页与列表由 usePagedList 统一管理
// fetchFn 负责把分页参数 + 筛选条件拼装成后端契约的请求体（param.articleType 固定为 1）
const { page, total, list: tableData, load, changePage: handleCurrentChange } = usePagedList(
  async ({ pageNo, pageSize }, extraParam) => {
    const params = {
      pageNo,
      pageSize,
      param: { articleType: 1, ...extraParam },
    };
    const res = await axios.post("/back/interview/selectByCondition", params);
    return { records: res.data.result.records, total: res.data.result.total };
  }
);

// 首次加载（路由组件每次进入都会重新执行 setup，故此 load 同时覆盖「离开后回来」的刷新；无需 onActivated）
load();

// 翻页由 usePagedList 的 changePage 接管（见上方 load 解构：changePage: handleCurrentChange）

/**
 * 查看按钮点击事件
 * 在新标签页打开
 */
const onShowClick = (articleId) => {
  window.open(`/#/intervieArticleDetail/${articleId}`, '_blank');
};
</script>

<style lang="scss" scoped>
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