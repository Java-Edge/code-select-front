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
      <!-- <div class="company-filter-box">
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
            :key="item.companyName"
            :label="item.companyName"
            :value="item.companyName"
          />
        </el-select>
      </div> -->
      <div class="company-filter-box">
        <el-input
        v-model="keyword"
        @change="handleChangeCompany"
        placeholder="根据公司名称或职位模糊查询">
        </el-input>
      </div>
    </div>

    <el-table :data="tableData" height="1000" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <!-- <el-table-column prop="companyName" label="公司名称" width="180"> </el-table-column> -->
      <el-table-column prop="title" label="标题" width="180" align="center"> </el-table-column>
<!--      <el-table-column prop="content" label="简介" width="400" align="center"> </el-table-column>-->
      <el-table-column prop="createAt" label="发布时间" width="160" align="center"> </el-table-column>
      <el-table-column prop="recommendCode" label="内推码"  width="200" align="center"> </el-table-column>
      <el-table-column prop="recommendEmail" label="内推邮箱" width="180" align="center"> </el-table-column>
      <el-table-column prop="recommendUrl" label="内推链接" width="250" align="center"> </el-table-column>
      <el-table-column fixed="right" label="Operations" width="95" align="center">
        <template #default="scope">
          <el-button link type="primary" size="small"  @click.prevent="onShowClick(scope.row.id)"  >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div
      class="interview-card"
      v-for="interview in tableData"
      :key="interview.id"
      @click="onShowClick(interview.id)"
    >
      <div class="interview-title">{{ interview.title }}</div>
      <div class="recommed-info">
        <div class="recommed-code">{{ interview.recommendCode }}</div>
        <div class="recommed-email">
          内推邮箱：{{ interview.recommedEmail }}
        </div>
        <div class="recommed-email">内推地址：{{ interview.recommedUrl }}</div>
      </div>
      <div class="interview-content">
        {{
          interview.content.length > 300
            ? interview.content
                .substr(0, 30)
                .replace(/<\/?.+?\/?>|\r|\n|\s*/g, "") + "..."
            : interview.content.replace(/<\/?.+?\/?>|\r|\n|\s*/g, "")
        }}
      </div>
      <div class="interview-type">
        <div class="interview-create-time">{{ interview.createAt }}</div>
        <div class="career-type">分类：{{ interview.careerName }}</div>
      </div>
    </div> -->

    <pagination :page="page" :total="total" :size="size" @pageChange="handleCurrentChange" />
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import pagination from "@/components/pagination.vue";
import axios from "axios";
const companyOptions = ref([]);

// let companyCondition = ref("");
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
const handleChangeCompany = () => {
  // console.log(companyCondition.value);
  let condition = {
    pageNo: page.value,
    pageSize: size.value,
    param: {
      jobId: jobId.value,
      content: activeMenu.value,
      // company: companyCondition.value,
      keyword: keyword.value,
    },
  };
  getListDataByCondition(condition);
};

const getListDataByCondition = async (condition) => {
  condition.param = {
    ...condition.param,
    articleType: 2,
  };
  axios
    .post("/back/innerRecommend/selectByCondition", condition)
    .then((response) => {
      console.log(response);
      tableData.value = response.data.result.records;
      total.value = response.data.result.total;
    });
};

// 数据相关
const tableData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(10);
// 获取数据
const route = useRoute();
const type = route.params.type;
console.log(type);

// 获取级联筛选框数据
const options = ref([]);
axios.get("/back/career/getData").then((res) => {
  // console.log('res', res.data.result)
  options.value = res.data.result;
});

// 级联选择框
const props = {
  expandTrigger: "hover",
};
let value = [-1];
const handleChange = (value) => {
  jobId.value = value[value.length - 1];
  let condition = {
    pageNo: page.value,
    pageSize: size.value,
    param: {
      jobId: jobId.value,
      content: activeMenu.value != "" ? activeMenu.value : "",
      // company: companyCondition.value,
      keyword: keyword.value,
      articleType: 2,
    },
  };
  getListDataByCondition(condition);
};

const getListData = async () => {
  let params = {
    pageNo: page.value,
    pageSize: size.value,
    param: {
      articleType: 2,
    },
  };
  axios.post("/back/innerRecommend/selectByCondition", params).then((response) => {
    tableData.value = response.data.result.records;
    total.value = response.data.result.total;
  });
};
getListData();
// 处理数据不重新加载的问题
onActivated(getListData);
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize;
  getListData();
};

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage;
  getListData();
};

/**
 * 查看按钮点击事件
 */
const router = useRouter();
const onShowClick = (articleId) => {
  console.log("articleId", articleId);
  router.push(`/intervieArticleDetail/${articleId}`);
};

/**
 * 监听路由的变化，文章的面经使用的是同一个界面，因此要监听路有变化，及时刷新数据
 */
watch(
  () => router.currentRoute.value,
  () => {
    console.log("路由变化了", router.currentRoute.value);
  }
);
</script>

<style lang="scss" scoped>
.filter-box {
  display: flex;
}
// .filter-item {
//   width: 50px;
//   height: 25px;
//   background-color: pink;
//   border: 2px solid black;
//   margin-right: 5px;
//   text-align: center;
// }
// .filter-item:hover {
//   cursor: pointer
// }
/* 初始状态下的样式 */
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

/* 选中状态下的样式 */
.filter-item.selected {
  background-color: #007bff;
  color: #fff;
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
  // max-width: 840px;
  // height: 146px;
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

// .interview-card {
//   width: 840px;
//   height: 146px;
//   background-color: yellow;
//   margin: 0 auto;
//   border-radius: 5px;
// }
.articles {
  margin-bottom: 15px;
}
.article-ranking-container {
  min-height: 800px;
  max-width: 1152px;
  margin: 0 auto;
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
