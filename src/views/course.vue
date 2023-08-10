<template>
  <div class="course-navigation">
    <!-- 内容区域 -->
    <div class="content">
      <!-- 课程分类导航栏 -->
      <LeftSidebar />
      <!-- 轮播图 -->
      <RightSidebar :carouselData="carouselData" />
    </div>
    <div class="image-background">
      <img alt="" style="width: 1600px;height: 70px" :src="img" />
    </div>
    <QrCode></QrCode>
    <div style="font-size: 25px; text-align: center; margin-top: 15px;">-- 课程列表 --</div>
    <!-- 课程详情区域 -->
    <CourseList :courses="courses" />
  </div>
</template>

<script>
import Header from './Header.vue'; // Import the Header component
import Footer from './Footer.vue'; // Import the Footer component
import CourseList from './CourseList.vue'; // Import the CourseList component
import LeftSidebar from './LeftSidebar.vue'; // Import the LeftSidebar component
import RightSidebar from './RightSidebar.vue'; // Import the RightSidebar component
import QrCode from './QrCode'


export default {
  name: "CourseNavigation",
  components: {
    Header, // Register the Header component
    Footer, // Register the Footer component
    CourseList, // Register the CourseList component
    LeftSidebar,
    RightSidebar,
    QrCode
    // ... Rest of your components ...
  },
  data() {
    return {
      activeMenu: "home", // 默认选中首页
      courses: [], // 所有课程数据，从后端获取或静态定义
      carouselData: [
        {
          id: 1,
          image: "https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230709183838817.png",
        },
        {
          id: 2,
          image: "https://via.placeholder.com/800x300?text=Slide%202",
        },
        {
          id: 3,
          image: "https://via.placeholder.com/800x300?text=Slide%203",
        },
        // 更多轮播图数据
      ],
      img: require("@/assets/background.jpg"),
    };
  },
  computed: {
    courseRows() {
      // 将所有课程按每行4个进行分组
      const rows = [];
      for (let i = 0; i < this.courses.length; i += 4) {
        rows.push(this.courses.slice(i, i + 4));
      }
      return rows;
    },
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
        console.log(response)
        this.courses = courses;
        console.log(this.courses)
      })
    },
    getFiveCourse() {
      this.$axios.get('/back/sourceCourse/getFiveCourse'
      ).then(response => {
        const courses = response.data.result;
        console.log(response)
        this.carouselData = courses;
        console.log(this.courses)
      })
    },
  },
  mounted() {

  },


};
</script>

<style>
  /* 添加样式 */
.course-navigation {
  max-width: 1600px;
  margin: 0 auto;
  background-color: #f9f3e8;
}

.content {
  display: flex;
  flex-wrap: wrap;
  /* Wrap the sidebar and swiper to next row if necessary */
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
</style>
