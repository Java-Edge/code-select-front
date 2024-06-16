<template>
  <div class="article-ranking-container main-content">
    <!-- 循环遍历 projectData 数组中的每个项目 -->
    <div class="ranking-body" v-for="project in projectData" :key="project.id">
      <div class="ranking-left">
        <div class="ranking-img">
          <!-- 如果项目图像为空或无效,显示默认图像 -->
          <img v-if="!project.img" src="https://pic.imgdb.cn/item/64ed5b97661c6c8e5403104c.jpg" />
          <!-- 如果项目图像存在,显示项目图像 -->
          <img v-else :src="project.img" />
        </div>
      </div>
      <!-- 链接到项目详情页 -->
      <router-link :to="`/projectDetail/${project.id}`" class="link-sty">
        <div class="ranking-middle">
          <!-- 显示项目标题和描述 -->
          <div class="ranking-name hide-text">{{ project.title }}</div>
          <div class="ranking-des">{{ project.des }}</div>
          <!-- 显示正在学习该项目的人数 -->
          <div class="ranking-likes">{{ project.pageView }}人在学</div>
        </div>
      </router-link>
    </div>
    <!-- 分页组件 -->
    <pagination :page="page" :total="total" :size="size" @pageChange="handleCurrentChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import pagination from "@/components/pagination.vue";
import axios from 'axios';

// 定义响应式变量
const projectData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(5);

// 获取路由参数
const route = useRoute();
const type = route.params.type;

// 获取列表数据的函数
const getListData = async () => {
  let path = `/back/project/getByPage?current=${page.value}&size=${size.value}`;
  if (type) {
    path += `&type=${type}`;
  }
  // 发送 GET 请求到服务器
  const response = await axios.get(path);
  // 使用响应数据更新响应式变量
  projectData.value = response.data.result.records;
  total.value = response.data.result.total;
}

// 处理页面变更的函数
const handleCurrentChange = (currentPage) => {
  page.value = currentPage;
  getListData();
};

// 在组件创建时调用获取列表数据的函数
getListData();
</script>

<style lang="scss" scoped>
.article-ranking-container {
  min-height: 800px;
   max-width: 1152px;
  // margin: 0 auto;

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
.link-sty {
  text-decoration: none;
  color: black;
  display: block;
  width: 830px;
}
// 带阴影
.ranking-body {
  height: 97px;
  // width: 776px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 10px;
  // box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
  // background-color: white;
  border-radius: 15px;
  padding: 20px;
}

.ranking-left {
  // background-color: yellow;
  margin: 0 auto;
}

.ranking-middle {
  // background-color: blue;
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  margin-left: 15px;
  justify-content: space-between;
}

.ranking-name {
  font-size: 16px;
  font-weight: 600;
}
.ranking-img img {
  width: 107px;
  height: 60px;
  border-radius: 5px;
  // max-width: none;
  // max-height: none;
  // border-radius: 50%;
  // margin: 0 auto;
}
.ranking-des {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #777888;
}
.ranking-time {
  font-size: 14px;
  color: #777888;
}
.ranking-likes {
  font-size: 14px;
  color: black;
}
.ranking-right {
  // background-color: green;
  flex-grow: 1;
  // width: 300px;
  display: flex;
  align-items: center;
}
.ranking-right a {
  text-decoration: none;
}
.ranking-user-img img {
  width: 37px;
  height: 37px;
  border-radius: 50%;
}
.ranking-user-name {
  margin-left: 5px;
  margin-right: 5px;
  font-size: 14px;
}

.ranking-button {
  width: 65px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: #f8f8f8; /* Google蓝色 */
  color: black;
  border-radius: 13px; /* 圆角 */
  font-size: 14px;
  // padding: 10px 20px; /* 上下边距，左右边距 */
  cursor: pointer;
  border: 1px solid #ccccd8; // 先添加上 border，防止添加border抖动
}

/* 按钮悬停样式 */
.ranking-button:hover {
  border: 1px solid black;
}

/* 按钮点击样式 */
.ranking-button:active {
  background-color: #f8f8f8; /* Google更深的蓝色 */
}

// 隐藏多余文字样式
.hide-text {
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; //需要显示的行数
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
