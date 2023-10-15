<template>
  <div class="course-navigation">
    <filterVue @getRecruit="getRecruit" />
    <!-- 内容区域 -->
    <!-- <div style="font-size: 30px; text-align: center; margin-top: 30px">
      -- 招聘列表 --
    </div> -->
    <div class="content">
      <!-- 内容区域 -->
      <div class="floorhd">
        <div class="grid_c1 floorhd_inner">
          <h3 class="floorhd_tit">招聘列表</h3>
        </div>
      </div>
      <!-- 课程详情区域 -->
      <RecruitList :recruits="recruits" />
      <pagination
        :page="page"
        :total="total"
        @pageChange="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup >
import RecruitList from "./recruit-list.vue"; // Import the CourseList component
import filterVue from "./compontents/filter.vue";
import pagination from "@/components/pagination.vue";
import { ref } from "vue";
import axios from "axios";
const total = ref(0);
const page = ref(1);
const size = ref(10);
// const param = ref({});
const recruits =ref([])

const getRecruit = (param) => {
  let condition;
  // console.log(param);
  condition = {
    pageNo: page.value,
    pageSize: size.value,
    param: {
      // ...condition.param,
      ...param
      // eduLevel: param.value["degressList"],
      // graduateYear: param.value["expList"],
      // personScale: param.value["sizeList"],
      // salaryRange:param.value["salaryList"],
      // scaleTag: param.value["stageList"],
      // recruitType: param.value["jobTypeList"],
    },
  };
   axios.post(
      "/back/recruit/selectByCondition",
      condition
      // ,
      //     {
      //         headers: {
      //             "Authorization": this.$store.getters.getToken
      //         }
      //     }
    )
    .then((response) => {
      let result = response.data.result;
      recruits.value = result.records;
      total.value = result.total;
      // emits("result", result);
    });
};
getRecruit();
const getParam = (param) => {
  param.value = param;
};
const handleCurrentChange = (currentPage) => {
  page.value = currentPage;
  getRecruit();
};
// };
</script>

<style lang="scss" scoped>
.index {
  background-color: #e9eef3;
}
/* 添加样式 */
.course-navigation {
  max-width: 1600px;
  margin: 0 auto;
}
.filter-box {
  display: flex;
}
.filter-box1 {
  display: flex;
  margin-top: 25px;
  margin-left: 20px;
}
.recruit-list {
  display: flex;
  justify-content: center;
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
.time-filter-box {
  margin-top: 22px;
  margin-left: 22px;
}
.salary-filter-box {
  margin-top: 22px;
  margin-left: 22px;
}
.menu {
  display: flex;
  justify-content: center;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  display: inline-block;
  padding: 0 20px;
  cursor: pointer;
}

.menu li.active {
  color: #ffd04b;
  border-bottom: 2px solid #ffd04b;
}

.content {
  display: flex;
  flex-wrap: wrap;
  /* Wrap the sidebar and swiper to next row if necessary */
}

.left-sidebar {
  width: 20%;
  padding: 20px;
  background-color: #f0f0f0;
}

.left-sidebar h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.left-sidebar ul {
  list-style: none;
  padding: 0;
}

.left-sidebar li {
  margin-bottom: 10px;
  cursor: pointer;
}

.right-sidebar {
  flex: 1;
  padding: 20px;
  min-width: 300px;
  /* Set a minimum width for the sidebar */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Add the following CSS styles */

.swiper-pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  /* Add some margin between carousel and pagination */
}

.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 0 5px;
  /* Adjust the space between bullets as needed */
}

.swiper-pagination-bullet-active {
  background-color: #555;
}
/* 背景图片样式 */
.background-image {
  width: 1600px;
  height: 250px;
  margin-top: 50px;
}

.swiper-container {
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  position: relative;
  /* 添加以下样式以实现水平排列 */
  display: flex;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}
.input-wrap {
  position: relative;
  display: inline-block;
  min-width: 300px;
  vertical-align: middle;
  line-height: normal;
}

.content {
  display: flex;
  flex-wrap: wrap;
  /* Wrap the sidebar and swiper to next row if necessary */
}

.floorhd {
  height: 65px;

  .grid_c1 {
    margin: 0 auto;
    width: 1600px;

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
  