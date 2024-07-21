<template>
  <div class="main">
    <ul id="menu">
      <li :title="item.name" v-for="(item, index) in menuData" :key="index" @click.stop="rollTo(item, index)"
        :class="item.name === heightTitle ? 'active' : ''">
        {{ item.name }}
      </li>
    </ul>

    <!-- 学习路线 -->
    <div class="bg000" id="roadMap">
      <study />
    </div>

    <!-- 视频课程列表
    <div class="bg000" id="video">
      <div class="content">
        <div class="floorhd">
          <div class="grid_c1 floorhd_inner">
            <h3 class="floorhd_tit">课程列表</h3>
          </div>
        </div>
        <CourseList :courses="courses" />
      </div>
    </div> -->
    
    <!-- 文章动态列表 -->
    <div class="bg000" id="timeline">
      <div class="content">
        <div class="floorhd">
          <div class="grid_c1 floorhd_inner">
            <h3 class="floorhd_tit">文章动态</h3>
          </div>
        </div>
        <CourseList :courses="courses" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CourseList from "./CourseList.vue";
import study from "./home/study.vue";
import { getCarouselData, getCourseList } from "@/api/videoCourse";

// 左侧悬浮菜单
const menuData = [
  { name: '学习路线', id: "#roadMap" },
  // { name: '课程列表', id: "#video" },
  // { name: '文章动态', id: "#timeline" },
];

const heightTitle = ref(null);
const courses = ref([]);
const courseResp = ref([]);


// 滚动到指定部分
const rollTo = (selector) => {
  heightTitle.value = selector.name;
  const element = document.querySelector(selector.id);
  const headerOffset = 45;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};

// 获取并设置视频课程数据
const getCourses = () => {
  getCourseList().then(response => {
    courses.value = response.data.result;
    courseRows();
  });
};

// Function to fetch and set carousel data
const listSliderVideos = () => {
  getCarouselData().then(response => {
    courseResp.value = response.data.result;
  });
};

// 视频，四条为一组
const courseRows = () => {
  const rows = [];
  for (let i = 0; i < courses.value.length; i += 4) {
    rows.push(courses.value.slice(i, i + 4));
  }
  return rows;
};

// 加载完组件后获取数据
onMounted(() => {
  // getCourses();
  // listSliderVideos();
});
</script>

<style lang="scss" scoped>
#menu {
  position: fixed;
  left: 0;
  top: 50%;
  width: 120px;
  transform: translateY(-50%);
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .1);
  border-radius: 0 8px 8px 0;
  text-align: center;
  color: #6d7278;
  z-index: 3;
  user-select: none;
}

#menu li {
  position: relative;
  padding: 16px 0;
  cursor: pointer;
  transition: color .2s;
}

#menu li.active,
#menu li:hover {
  color: #e02020;
}

#menu li+li::after {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -30px;
  content: '';
  width: 60px;
  border: 1px solid #f3f5f7;
}

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
  max-width: 1300px;
  margin: 0 auto;
  padding: 32px 0;
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

.image-background {
  width: 1152px;
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

.floorhd_tit::before,
.floorhd_tit::after {
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -10px;
  background-image: url("@/assets/sprite.png");
  width: 25px;
  height: 20px;
}

.floorhd_tit::before {
  background-position: 0 0;
  left: 0;
}

.floorhd_tit::after {
  background-position: -25px 0;
  right: 0;
}
</style>