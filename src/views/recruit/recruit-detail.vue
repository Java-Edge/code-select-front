<template>
  <div class="course-details-page">
    <Header />
    <div class="course-details-content">
      <!-- <div class="left">
        <img :src="selectedRecruit.image" :alt="selectedRecruit.name" />
      </div> -->
      <div class="right">
        <div class="name">{{ selectedRecruit.title }}</div>
        <!-- <div class="price">价格：{{ selectedCourse.price }} ￥</div> -->
        <div class="description">
          <span class="descrip">简介</span>：{{ selectedRecruit.des }}
        </div>
        <div class="description">
          <span class="descrip">联系方式</span>：{{ selectedRecruit.phone }}
        </div>
        <div class="description">
          <span class="descrip">详情</span>：{{ selectedRecruit.content }}
        </div>
        <!-- <div class="study-button">
          <button class="learn-button" @click="goToStudy(selectedRecruit)">
            点击投递
          </button>
        </div> -->
      </div>
    </div>

    <div style="font-size: 30px; text-align: center; margin: 40px 0px;">-- 猜你喜欢 --</div>
    <!-- 课程详情区域 -->
    <CourseList :courses="recommendCourses" />
    <Footer />
  </div>
</template>

<script>
import Header from '../Header.vue'; // Import the Header component
import Footer from '../Footer.vue'; // Import the Footer component
import RecruitList from './recruit-list.vue'; // Import the CourseList component
export default {
  name: 'RecruitDetails',
  components: {
    Header, // Register the Header component
    Footer, // Register the Footer component
    RecruitList, // Register the CourseList component
    // ... Rest of your components ...
  },
  props: {
    recruit: {
      type: Object,
      required: true,
    },
  },
  created() {
    // this.getMenuList();
    // const id = this.$route.params.id;
    // this.getCourseDetail(id);
    // this.getRecommendCourses();
    this.fetchData();
    // this.nickname = this.$store.getters.getUser.nickname;
  },
  data() {
    return {
      // 其他数据...
      selectedRecruit: {},
      recommendCourses: []
    };
  },
  watch: {
    '$route': 'fetchData',
  },
  methods: {
    fetchData() {
      const recruitId = this.$route.params.id;
      this.getRecruitDetail(recruitId);
      this.getRecommendCourses();
    },
    getRecruitDetail(id) {
      this.$axios.get('/recruit/getById/' + id
        // ,
        //     {
        //         headers: {
        //             "Authorization": this.$store.getters.getToken
        //         }
        //     }
      ).then(response => {
        const recruit = response.data.result;
        console.log(response)
        this.selectedRecruit = recruit;
        // this.$message({
        //     type: 'success',
        //     message: response.data.message
        // });
        console.log(this.recruit)
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

<style scoped>
/* Add styles for the course details page if needed */
.course-details-content {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.course-details-content img {
  width: 600px;
  height: 600px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.left {
  flex: 1;
  margin-left: 100px;
  max-width: 36%; /* Adjust the max-width as needed */
}

.left img {
  max-width: 600px;
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

.phone {
  margin-left: 15px;
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
</style>