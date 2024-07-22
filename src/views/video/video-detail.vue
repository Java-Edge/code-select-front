<template>
  <div class="main-content">
  <!-- 导航 -->
  <br>
  <a href="http://javaedge.cn:3000/#/index">首页</a>
  <i class="el-icon-arrow-right"></i>
  <a href="http://javaedge.cn:3000/#/special">实战</a>
    <div class="course-details-body">
      <h2>{{ selectedCourse.name }}</h2>
      <div class="course-details-content">
        <div class="left">
          <img :src="selectedCourse.image" :alt="selectedCourse.name" />
        </div>
        <div class="right">
          <div class="description">
            <span class="descrip">简介</span>：{{ selectedCourse.description }}
          </div>
          <div class="study-button">
            <button class="learn-button" @click="goToStudy(selectedCourse)">
              点击学习
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseList from "../CourseList.vue";

export default {
  name: "CourseDetails",
  components: {
    CourseList, // 注册 CourseList 组件
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedCourse: {}, // 选定的课程
    };
  },
  created() {
    this.fetchData(); // 组件创建时获取数据
  },
  watch: {
    $route: "fetchData", // 当路由改变时重新获取数据
  },
  methods: {
    fetchData() {
      const courseId = this.$route.params.id; // 获取路由参数中的课程ID
      this.getCourseDetail(courseId); // 获取课程详情
    },
    getCourseDetail(id) {
      // 发送GET请求获取课程详情
      this.$axios.get("/back/course/video/" + id).then((response) => {
        const courses = response.data.result;
        this.selectedCourse = courses; // 更新选定的课程
      });
    },
    goToStudy(selectedCourse) {
      window.open(selectedCourse.sourceUrl); // 新窗口打开课程的学习链接
    },
  },
};
</script>

<style scope lang="scss">
.course-details-body {
  padding: 20px;
  background-color: #f9f3e8;
  border-radius: 10px;

  h2 {
    text-align: center;
  }
}

.course-details-content {
  display: flex;
  align-items: center;

  .left {
    max-width: 36%;
  }

  .left img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .right {
    /* max-width: 600px; */
    max-width: 50%;
    margin-left: 40px;
    flex: 1;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .learn-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 12px 24px;
    font-size: 18px;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;
  }

  .learn-button:hover {
    background-color: #0056b3;
  }

  .learn-button:focus {
    outline: none;
  }

  .name {
    font-size: 35px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #222;
    margin-bottom: 15px;
  }

  .study-button {
    margin-top: 20px;
  }

  .descrip {
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 400;
    font-size: 20px;
  }

  .description {
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 100;
    font-size: 20px;
    margin-top: 20px;
    line-height: 1.6;
  }

  .description:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>