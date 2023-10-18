<template>
  <div class="main">
    <!-- 内容区域 -->
    <div class="bg banner-box">
      <div class="content flex">
        <LeftSidebar />
        <RightSidebar
          v-if="carouselData.length > 0"
          :carouselData="carouselData"
        />
        <el-skeleton style="width: 1440px" v-else :rows="10" animated />
      </div>
    </div>
    <div class="bg000">
      <div class="content">
        <div class="floorhd">
          <div class="grid_c1 floorhd_inner">
            <h3 class="floorhd_tit">课程列表</h3>
          </div>
        </div>
        <CourseList :courses="courses" />
        <pagination
          :page="page"
          :total="total"
          :size="size"
          @pageChange="handleCurrentChange"
        />
      </div>
      <study />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CourseList from "./CourseList.vue";
import LeftSidebar from "./LeftSidebar.vue";
import RightSidebar from "./RightSidebar.vue";
import study from "./home/study.vue";
import pagination from "@/components/pagination.vue";
import {getCarouselData, getCourse } from "@/api/sourceCourse";
const activeMenu = ref("home");
const total = ref(0);
const page = ref(1);
const size = ref(12);
const courses = ref([]);
const carouselData = ref([]);
const handleMenuSelect = (index) => {
  activeMenu.value = index; // 更新选中的菜单项
  // 可根据不同的菜单项进行相应的页面跳转或其他操作
};
// const getCourses = () => {
//   getList().then(response => {
//     const coursesData = response.data.result;
//     courses.value = coursesData;
//   })
// }
const getFiveCourse = () => {
  getCarouselData().then((response) => {
    const courses = response.data.result;
    carouselData.value = courses;
  });
};

const courseRows = () => {
  // 将所有课程按每行4个进行分组
  const rows = [];
  for (let i = 0; i < courses.value.length; i += 4) {
    rows.push(courses.value.slice(i, i + 4));
  }
  return rows;
};

const getCourses = (param) => {
  let condition = {
    pageNo: page.value,
    pageSize: size.value,
    param: {
      ...param,
      type: 0,
    },
  };
  getCourse(condition).then((response) => {
    courses.value = response.data.result.records;
    total.value = response.data.result.total;
    courseRows();
  });
};

const handleCurrentChange = (currentPage) => {
  page.value = currentPage;
  getCourses();
};

onMounted(() => {
  getCourses();
  getFiveCourse();
});
</script>

<style lang="scss" scoped>
/* 添加样式 */
.bg {
  background-color: #f9f3e8;
}

.bg000 {
  background-color: #e8f7f9;
}

.banner-box {
  box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
}

.content {
  max-width: 1350px;
  margin: 0 auto;
  padding: 32px 0px;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 背景图片样式 */
.image-background {
  width: 1350px;
  height: 90px;
  margin-top: 5px;
}

.list-title {
  margin-bottom: 20px;
}

.floorhd {
  height: 65px;

  .grid_c1 {
    margin: 0 auto;
    width: 1350px;

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
