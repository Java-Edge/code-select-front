<template>
  <div class="course-details-page">
    <Header />
    <div class="course-details-content">
      <div class="left">
        <img :src="selectedCourse.image" :alt="selectedCourse.name" />
      </div>
      <div class="right">
        <div class="name">{{ selectedCourse.name }}</div>
        <!-- <div class="price">价格：{{ selectedCourse.price }} ￥</div> -->
        <div class="description">
          <span class="descrip">简介</span>：
          {{ selectedCourse.description }}
        </div>
        <div class="study-button">
          <button class="learn-button" @click="goToStudy(selectedCourse)">
            点击学习
          </button>
        </div>
      </div>

      <!-- 课程详情区域 -->
      <CourseList :courses="recommendCourses" />

    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue'; // Import the Header component
import Footer from './Footer.vue'; // Import the Footer component
import CourseList from './CourseList.vue'; // Import the CourseList component
export default {
  name: 'CourseDetails',
  components: {
    Header, // Register the Header component
    Footer, // Register the Footer component
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
    // this.getMenuList();
    const productId = this.$route.params.id;
    this.getCourseDetail(productId);
    this.getRecommendCourses();
    // this.nickname = this.$store.getters.getUser.nickname;
  },
  data() {
    return {
      // 其他数据...
      selectedCourse: {},
      recommendCourses: []
    };
  },
  methods: {
    getCourseDetail(id) {

      this.$axios.get('/sourceCourse/course/' + id
        // ,
        //     {
        //         headers: {
        //             "Authorization": this.$store.getters.getToken
        //         }
        //     }
      ).then(response => {
        const courses = response.data.result;
        console.log(response)
        this.selectedCourse = courses;
        // this.$message({
        //     type: 'success',
        //     message: response.data.message
        // });
        console.log(this.courses)
      })
    },
    buttonOnClick() {
      this.$message({
        showClose: true,
        message: '购买功能暂未实现，请联系管理员'
      });
    },
    goToStudy(selectedCourse) {
      window.open(selectedCourse.sourceUrl);
    },
    getRecommendCourses() {
      this.$axios.get('/sourceCourse/getRecommendCourses/'
        // ,
        //     {
        //         headers: {
        //             "Authorization": this.$store.getters.getToken
        //         }
        //     }
      ).then(response => {
        const courses = response.data.result;
        console.log(response)
        this.recommendCourses = courses;
        // this.$message({
        //     type: 'success',
        //     message: response.data.message
        // });
        console.log(this.courses)
      })
    }
  }
};
</script>

<style>
/* Add styles for the course details page if needed */
.course-details-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-details-content img {
  width: 300px;
  height: 300px;
  object-fit: contain;
  /* To avoid image distortion */
}

.left {
  margin-right: 40px;
}

.right {
  max-width: 600px;
}

.course-details img {
  max-width: 200px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
</style>