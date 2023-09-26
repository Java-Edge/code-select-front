<template>
  <div class="recruit-details-page">
    <div class="recruit-title">
      <div class="recruit-name">
        <span>{{ selectedRecruit.title }}</span>
        <div class="description">
          <span class="descrip">薪资待遇</span>：<span class="recruit-salary">
            {{ selectedRecruit.salary }}
          </span>
          <div class="study-button">
            <button class="deliver-button" @click="deliver(selectedRecruit.sourceUrl)">
              点击投递
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="recruit-details-content">
      <!-- <div class="left">
        <img :src="selectedRecruit.image" :alt="selectedRecruit.name" />
      </div> -->
      <div class="right">
        <div class="company">
          <div class="company-logo">
            <img :src="selectedRecruit.picUrl" :alt="selectedRecruit.companyName" class="company-picture" />
          </div>
          <!-- 公司名称 -->
          <div class="company-name">
            <span class="company-name-info">公司名称</span>：{{ selectedRecruit.companyName }}
          </div>

          <!-- HR联系电话 -->
          <!-- <span class="company-name">联系电话</span>：{{    selectedRecruit.hrPhoneNumber   }} -->

          <!-- HR姓名 -->
          <!-- <span class="company-name">HR姓名</span>：{{ selectedRecruit.hrName }} -->

          <!-- HR性别 -->
          <!-- <span class="company-name">性别</span>：{{ selectedRecruit.hrGender }} -->

          <!-- HR在线时间 -->
          <!-- <span class="company-name">在线时间</span>：{{  selectedRecruit.hrOnlineTime  }} -->

          <!-- 工作地点 -->
          <div class="job-city">
            <span class="job-city-info">工作地点</span>：{{ selectedRecruit.jobCity }}
          </div>
        </div>

        <div class="description">
          <span class="descrip">学历要求</span>：{{ selectedRecruit.education }}
        </div>

        <div class="description">
          <span class="descrip" v-html="selectedRecruit.content"></span>
        </div>
        <div class="description">
          <span class="descrip" v-html="selectedRecruit.requirements"></span>
        </div>
        <div class="description">
          <span class="descrip">毕业要求</span>：{{
            selectedRecruit.graduationYear
          }}
        </div>
        <div class="description">
          <span class="descrip">毕业学校</span>：{{ selectedRecruit.topSchool }}
        </div>
      </div>
    </div>

    <div style="font-size: 30px; text-align: center; margin: 40px 0px">
      -- 猜你喜欢 --
    </div>
    <!-- 课程详情区域 -->
    <CourseList :courses="recommendCourses" />
  </div>
</template>


<script>
import CourseList from "../CourseList.vue"; // Import the CourseList component
import "@toast-ui/editor/dist/toastui-editor.css";

export default {
  name: "RecruitDetails",
  components: {
    CourseList,
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
      recommendCourses: [],
    };
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      const recruitId = this.$route.params.id;
      this.getRecruitDetail(recruitId);
      this.getRecommendCourses();
    },
    getRecruitDetail(id) {
      this.$axios
        .get(
          "/back/recruit/getById/" + id
          // ,
          //     {
          //         headers: {
          //             "Authorization": this.$store.getters.getToken
          //         }
          //     }
        )
        .then((response) => {
          const recruit = response.data.result;
          console.log(response);
          this.selectedRecruit = recruit;
          // this.$message({
          //     type: 'success',
          //     message: response.data.message
          // });
          console.log(this.recruit);

          this.selectedRecruit = this.transformJobInfo(this.selectedRecruit);
        });
    },
    buttonOnClick() {
      this.$message({
        showClose: true,
        message: "购买功能暂未实现，请联系管理员",
      });
    },
    deliver(sourceUrl) {
      console.log(sourceUrl);
      if (sourceUrl === null) {
        this.$message.error("暂时无法投递，请联系管理员");
      } else {
        window.open(sourceUrl);
      }
    },
    getRecommendCourses() {
      this.$axios
        .get(
          "/back/sourceCourse/getRecommendCourses"
          // ,
          //     {
          //         headers: {
          //             "Authorization": this.$store.getters.getToken
          //         }
          //     }
        )
        .then((response) => {
          this.recommendCourses = response.data.result;
          console.log(this.recommendCourses);
        });
    },
    // 将后端的数据解释
    transformJobInfo(job) {
      // 1. 学历
      this.transformEducationLevel(job.eduLevel, (education) => {
        job.education = education;
      });
      // 2. 薪资，根据招聘类型，实习、社招、校招，确定薪资类型：k、w
      this.transformSalary(job, (salary) => {
        job.salary = salary;
      });
      // 3. 公司图片
      job.picUrl = job.picUrl === null ? "https://picx.zhimg.com/v2-d534f6d0948d7228b4173e6e1a7a3436_xl.jpg" : job.picUrl;

      job.content = job.content.replace(/\n/g, "<br/>");
      job.requirements = job.requirements.replace(/\n/g, "<br/>");
      return job;
    },

    transformEducationLevel(level, callback) {
      // 0 学历不限 5000 本科 6000 硕士
      let educationLevel = [
        {
          level: 0,
          education: "学历不限",
        },
        {
          level: 5000,
          education: "本科",
        },
        {
          level: 6000,
          education: "硕士",
        },
      ];
      for (let i = 0; i < educationLevel.length; i++) {
        if (educationLevel[i].level === level) {
          callback(educationLevel[i].education);
        }
      }
    },

    transformSalary(job, callback) {
      let salary = "薪资面谈";
      if (job.salaryType === 0) {
        salary = "薪资面谈";
      } else if (job.salaryType === 1) {
        salary = job.salaryMin + "~" + job.salaryMax + "元/天";
      } else if (job.salaryType === 2) {
        salary = job.salaryMin + "~" + job.salaryMax + "k * 13 薪";
      }
      callback(salary);
    },
    goToStudy(selectedCourse) {
      window.open(selectedCourse.sourceUrl);
    },
  },
};
</script>

<style scoped>
/* Add styles for the course details page if needed */
.recruit-title {
  height: fit-content;
  background-color: #38566c;
  overflow: hidden;
  font-size: 24px;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.recruit-name {
  font-size: 35px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #FFF;
  margin-left: 240px;
  margin-top: 20px;
}

.recruit-details-content {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-left: 220px;
}

.left {
  flex: 1;
  margin-left: 100px;
  max-width: 36%;
  /* Adjust the max-width as needed */
}

.left img {
  max-width: 600px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.right {
  /* max-width: 600px; */
  max-width: 65%;
  /* Adjust the max-width as needed */
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

.deliver-button {
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

.deliver-button:hover {
  background-color: #0056b3;
}

.deliver-button:focus {
  outline: none;
}

.study-button {
  margin-top: 20px;
}

.descrip {
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 400;
  font-size: 20px;
}

.recruit-salary {
  color: #f26d49;
  font-size: 34px;
  font-weight: 400;
}

.description {
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 100;
  font-size: 16px;
  margin-top: 20px;
  line-height: 2;
}

.description:hover {
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

/* 公司信息容器样式 */
.company {
  border: 1px solid #ddd;
  padding: 50px;
  margin-bottom: 40px;
}

/* 公司名称样式 */
.company-name-info {
  font-weight: bold;
}

/* 工作地点样式 */
.job-city-info {
  font-weight: bold;
}


.company-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>