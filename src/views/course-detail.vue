<template>
  <div class="index">
    <el-container>
      <!-- <Header/> -->
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1"> <router-link :to="`/index`">首页</router-link></el-menu-item>
          <!-- <el-submenu index="2">
            <template slot="title">VIP</template>
          </el-submenu>
          <el-menu-item index="3">学习路线</el-menu-item>
          <el-menu-item index="4">系统课</el-menu-item>
          <el-menu-item index="5">粉丝群</el-menu-item> -->
        </el-menu>
        <div class="line"></div>
      </el-header>
      <el-main>
        <el-container>
          <el-aside width="200px" height="100px" style="background-color: rgb(238, 241, 246)">
            <!-- 左侧菜单栏内容 -->
            <!-- ... -->
          </el-aside>
          <el-main class="detail">
            <div class="rectangle">
              <div class="left">
                <el-image class="rectangle-image" :src="selectedCourse.image" fit="full" />
              </div>
              <div class="right">
                <div class="name">{{ selectedCourse.name }}</div>
                <!-- <div class="price">价格：{{ selectedCourse.price }} ￥</div> -->
                <div class="description"><span class="descrip">简介</span>：{{ selectedCourse.description }}</div>
                <!-- <el-button type="primary" size="medium" :plain="true" @click="buttonOnClick">立即购买</el-button> -->
                <div class="study-button">
                    <el-button type="primary" size="medium" :plain="true" @click="goToStudy(selectedCourse)" class="goStudy">
                        点击学习
                    </el-button>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-main>
      <el-divider></el-divider>
      <el-main>
        <el-tabs type="border-card" class="tabs-card">
          <div class="guassYouLike">
            <h2>猜你喜欢</h2>
          </div>
          <div class="recommend-course-list">
            <CourseGride v-for="course in recommendCourses" :key="course.id" :product="course" />
          </div>
        </el-tabs>
      </el-main>
      <Footer></Footer>
    </el-container>
  </div>
</template>
  
<script>
import CourseGride from "./course-grid";
import Footer from "./footer.vue";
import Header from "./header.vue";
export default {
  components: {
    CourseGride,
    Footer,
    Header,
  },
  data() {
    return {
      // 其他数据...
      selectedCourse: {},
      recommendCourses: []
    };
  },
  created() {
    // this.getMenuList();
    const productId = this.$route.params.id;
    this.getCourseDetail(productId);
    this.getRecommendCourses();
    // this.nickname = this.$store.getters.getUser.nickname;
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
  // 其他方法...

};
</script>
  
<style>


.el-container {
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;
}
.rectangle {
  display: flex;
  align-items: center;
}


.rectangle-image {
  width: 500px;
  height: 400px;
}

.long-image {
  text-align: center;
  margin-top: 20px;
}

.long-image img {
  max-width: 100%;
}


.price {
  margin-bottom: 10px;
  /* 调整课程价格与课程名称的间距 */
}

.right {
  margin-left: 60px;
  flex-direction: column;
  margin-bottom: 10px;
  line-height: 20px;
  width: 400px;
  height: 200px;
}

.recommend-course-list {
  display: flex;
  flex-wrap: wrap;
}

.tabs-card {
  display: flex;
  flex-wrap: wrap;
  width: 1400px;
  text-align: center;
}

.guassYouLike {
  /* background-color: #B3C0D1; */
  line-height: 5px;
  text-align: left;
  /* height: 40px; */
}
.name {
  font-size: 35px;
  font-family: PingFangSC-Medium,PingFang SC;
  font-weight: 600;
  color: #222;
  margin-top: -110px;
  margin-bottom: 15px;
  text-align: left;
  width: 800px;
}
.goStudy{
  width: 200px;
  height: 60px;
}
.study-button {
    margin-left: -200px;
    margin-top: 120px;
}
.el-button--primary.is-plain {
    font-size: 30px;
    text-align: center;
  }
.descrip{
  font-family: PingFangSC-Medium,PingFang SC;
  font-weight: 400;
  font-size: 20px;
}
.description {
  font-family: PingFangSC-Medium,PingFang SC;
  font-weight: 100;
  font-size: 20px;
  width: 800px;
  height: 130px;
  margin-top: 50px;
  line-height: 1.5;
  text-align: left;
  white-space: wrap;
}
.description:hover {
  background-color: rgba(0,0,0,0.1);
}
</style>
  