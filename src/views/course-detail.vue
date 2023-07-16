<template>
  <div class="course-details-page">
    <Header />
    <div class="course-details-content">
      <img :src="selectedCourse.image" :alt="selectedCourse.name" />
      <h1>{{ selectedCourse.name }}</h1>
      <p>{{ selectedCourse.description }}</p>
      <!-- Additional course details content -->
      <!-- You can display other course information here -->

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
  flex-direction: column;
  align-items: center;
}

.course-details-content img {
  width: 300px;
  height: 300px;
  object-fit: contain;
  /* To avoid image distortion */
}
</style>
