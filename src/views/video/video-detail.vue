<template>
  <div class="main-content">
    <div class="course-details-body">
      <h2>{{ selectedCourse.name }}</h2>
      <div class="course-details-content">
        <div class="left">
          <img :src="selectedCourse.image" :alt="selectedCourse.name" />
        </div>
        <div class="right">
          <!-- <div class="price">价格：{{ selectedCourse.price }} ￥</div> -->
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

<!--    <div style="font-size: 30px; text-align: center; margin: 40px 0px">-->
<!--      &#45;&#45; 猜你喜欢 &#45;&#45;-->
<!--    </div>-->
    <!-- 推荐课程区域 -->
<!--    <CourseList :courses="recommendCourses" />-->
  </div>
</template>

<script>
import CourseList from "../CourseList.vue";
export default {
  name: "CourseDetails",
  components: {
    CourseList, // Register the CourseList component
    // ... Rest of your components ...
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      // 其他数据...
      selectedCourse: {},
      recommendCourses: [],
    };
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      const courseId = this.$route.params.id;
      this.getCourseDetail(courseId);
      // this.getRecommendCourses();
    },
    getCourseDetail(id) {
      this.$axios.get("/back/video/course/" + id).then((response) => {
        const courses = response.data.result;
        this.selectedCourse = courses;
      });
    },
    buttonOnClick() {
      this.$message({
        showClose: true,
        message: "购买功能暂未实现，请联系管理员",
      });
    },
    goToStudy(selectedCourse) {
      window.open(selectedCourse.sourceUrl);
    },
    getRecommendCourses() {
      this.$axios
        .get("/back/video/getRecommendCourses")
        .then((response) => {
          const courses = response.data.result;
          this.recommendCourses = courses;
        });
    },
  },
};
</script>

<style scope lang="scss">
.course-details-body {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  h2 {
    text-align: center;
  }
}
.course-details-content {
  display: flex;
  align-items: center;
  .left {
    max-width: 36%; /* Adjust the max-width as needed */
  }
  .left img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .right {
    /* max-width: 600px; */
    max-width: 50%; /* Adjust the max-width as needed */
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
