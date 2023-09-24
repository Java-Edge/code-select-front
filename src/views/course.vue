<template>
  <div class="main">
    <!-- 内容区域 -->
    <div class="bg banner-box">
      <div class="content flex">
        <LeftSidebar />
        <RightSidebar :carouselData="carouselData" />
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
      </div>
    </div>

  </div>
</template>

<script>
import CourseList from './CourseList.vue'; // Import the CourseList component
import LeftSidebar from './LeftSidebar.vue'; // Import the LeftSidebar component
import RightSidebar from './RightSidebar.vue'; // Import the RightSidebar component


export default {
  name: "CourseNavigation",
  components: {
    CourseList, // Register the CourseList component
    LeftSidebar,
    RightSidebar,
  },
  data() {
    return {
      activeMenu: "home", // 默认选中首页
      courses: [], // 所有课程数据，从后端获取或静态定义
      carouselData: [],
      img: require("@/assets/background.jpg"),
    };
  },
  created() {
    this.getCourses();
    this.getFiveCourse();
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenu = index; // 更新选中的菜单项
      // 可根据不同的菜单项进行相应的页面跳转或其他操作
    },
    getCourses() {
      this.$axios.get('/back/sourceCourse/list'
      ).then(response => {
        const courses = response.data.result;
        this.courses = courses;
      })
    },
    getFiveCourse() {
      this.$axios.get('/back/sourceCourse/getFiveCourse'
      ).then(response => {
        const courses = response.data.result;
        this.carouselData = courses;
      })
    },
  },
  mounted() {

  },


};
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

  box-shadow: 0 2px 8px 0 rgba(7, 17, 27, .06);
}

.content {
  max-width: 1600px;
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
  width: 1600px;
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
  background-image: url('@/assets/sprite.png');
  width: 25px;
  height: 20px;
}
</style>
