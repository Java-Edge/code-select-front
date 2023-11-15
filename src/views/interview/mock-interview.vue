<template>
  <div class="article-ranking-container">

    <div class="view-box">

      <h3 class="head-line">预约模拟面试时间</h3>

      <div>
        <label for="date">日期:</label>
        <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
      </div>

      <div>
        <label for="time">时间:</label>
        <el-select v-model="time" placeholder="选择时间">
          <el-option v-for="item in timeOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>

      <el-button @click="submit">提交</el-button>

      <div v-if="submitted">
        您已预约 {{ date }} {{ time }} 的模拟面试。
      </div>

    </div>
    <el-table :data="tableData" height="1000" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
      <el-table-column prop="user" label="预约人" width="200" align="center"> </el-table-column>
      <el-table-column prop="start-time" label="预约开始时间" width="250" align="center"> </el-table-column>
      <el-table-column prop="end-time" label="预约结束时间"  width="250" align="center"> </el-table-column>
      <el-table-column prop="create-time" label="创建时间"  align="center"> </el-table-column>
    </el-table>
    <pagination :page="page" :total="total" :size="size" @pageChange="handleCurrentChange" />
  </div>
</template>
<script setup>
import {ref} from 'vue'

const date = ref(null)
const time = ref('')

const timeOptions = ['9:00', '10:00', '11:00', '14:00', '15:00', '16:00']

const submitted = ref(false)

const submit = () => {
  axios.post('/back/interview-schedule/save', tableData).then(() => {
    ElMessage({
      message: '创建文章成功',
      type: 'success',
    })
    router.push('/article-list')
  })
}


import { onActivated, watch } from "vue";
import { useRouter } from "vue-router";
import pagination from "@/components/pagination.vue";
import axios from "axios";
import {ElMessage} from "element-plus";


const tableData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(10);


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
