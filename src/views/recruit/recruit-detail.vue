<template>
  <div class="recruit-details-page">
    <div class="recruit-header">
      <div class="recruit-name">
        <span>{{ selectedRecruit.title }}</span>
        <span class="recruit-salary">
          {{ selectedRecruit.salary }}
        </span>
          <div class="treatment">            
            <span class="course-group-tag-item course-group-tag-item-footer"
                v-for="(item, index) in ['生日福利', '节日福利', '免费停车', '六险二金', '...']" :key="index">
                {{ item }}
                <!-- TODO 最后一个省略号 hover 显示完整内容 -->
            </span>
          </div>
        <div class="description">
          <div class="description-container">
            <span class="recruitment-requirements" v-if="selectedRecruit.jobCity">
              <svg t="1696079129557" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1575" width="18" height="18"><path d="M509.48 265.88c-88.54 0-160.57 72.03-160.57 160.56S420.94 587 509.48 587c88.53 0 160.56-72.03 160.56-160.56s-72.03-160.56-160.56-160.56z m0 235.79c-41.48 0-75.23-33.75-75.23-75.23s33.75-75.23 75.23-75.23c41.48 0 75.23 33.75 75.23 75.23s-33.75 75.23-75.23 75.23z" fill="#ffffff" p-id="1576"></path><path d="M512 85.33c-195.33 0-353.68 170.46-353.68 380.72C158.32 676.33 512 938.67 512 938.67s353.68-262.34 353.68-472.61c0-210.27-158.35-380.73-353.68-380.73z m116.92 635.08c-42.31 44.12-85.13 82.2-116.92 108.92-31.79-26.72-74.61-64.8-116.92-108.92-131.75-137.39-151.42-218.33-151.42-254.35 0-162.88 120.38-295.39 268.34-295.39s268.34 132.51 268.34 295.39c0 36.02-19.67 116.96-151.42 254.35z" fill="#ffffff" p-id="1577"></path></svg>
              {{ selectedRecruit.jobCity }}
            </span>
            <span class="recruitment-requirements" v-if="selectedRecruit.education">
              <svg t="1696079307515" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3793" width="18" height="18"><path d="M939.3664 534.8864c0.0512-0.768 0.1024-1.4848 0.1024-2.304V364.5952c0-16.9472-13.7728-30.72-30.72-30.72s-30.72 13.7728-30.72 30.72v167.9872c0 0.768 0.0512 1.536 0.1024 2.304a54.15424 54.15424 0 0 0-23.6544 44.8c0 29.952 24.2688 54.272 54.272 54.272 29.952 0 54.272-24.2688 54.272-54.272 0-18.6368-9.4208-35.0208-23.6544-44.8z" fill="#ffffff" p-id="3794"></path><path d="M512 553.1136c-7.9872 0-15.9744-1.6384-23.4496-4.864L117.1456 386.0992c-21.1456-9.216-34.6112-29.3376-35.1232-52.4288-0.512-23.0912 12.0832-43.7248 32.8192-53.9136l371.4048-181.8624c16.384-8.0384 35.1744-8.0384 51.5072 0l371.4048 181.8624c20.736 10.1376 33.3312 30.8224 32.8192 53.9136-0.512 23.0912-13.9776 43.1616-35.1232 52.4288l-371.4048 162.1504c-7.4752 3.2768-15.4624 4.864-23.4496 4.864zM147.4048 332.288L512 491.4688l364.5952-159.1808L512 153.7536 147.4048 332.288z" fill="#ffffff" p-id="3795"></path><path d="M501.7088 931.9424c-187.904 0-282.624-87.1424-307.2-113.8688a55.936 55.936 0 0 1-14.7456-37.9904v-224.3584c0-19.3024 9.6768-37.0176 25.9072-47.4112a56.0128 56.0128 0 0 1 53.9136-3.6864l252.0576 116.224 262.2976-122.88c15.36-7.2192 33.6384-0.5632 40.8576 14.7968 7.2192 15.36 0.5632 33.6384-14.7968 40.8576l-264.4992 123.904a56.0384 56.0384 0 0 1-47.4112 0.1536l-246.8864-113.8176v214.2208c22.4256 23.7056 101.3248 92.4672 260.5056 92.4672 158.3616 0 233.3184-64.8192 254.5664-87.3472V708.608c0-16.9472 13.7728-30.72 30.72-30.72s30.72 13.7728 30.72 30.72v76.6464c0 14.08-5.1712 27.4944-14.592 37.7856-23.3472 25.4464-113.9712 108.9024-301.4144 108.9024z" fill="#ffffff" p-id="3796"></path></svg>
              {{ selectedRecruit.education }}
            </span>
            <!-- mock data -->
            <span class="recruitment-requirements">
              <svg t="1696079724352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4887" width="18" height="18"><path d="M812 896h-600A100.144 100.144 0 0 1 112 795.744v-451.2a100.128 100.128 0 0 1 100-100.272h150v-50.128A50.064 50.064 0 0 1 412 144h200a50.064 50.064 0 0 1 50 50.128v50.128h150A100.128 100.128 0 0 1 912 344.544v451.2A100.144 100.144 0 0 1 812 896z m-200-676.8a25.04 25.04 0 0 0-24.992-25.072h-150A25.04 25.04 0 0 0 412 219.2v25.072h200V219.2z m250 125.328A50.064 50.064 0 0 0 812 294.4h-600a50.064 50.064 0 0 0-50 50.128v125.328h700v-125.312z m-400 200.528a50 50 0 1 0 93.072-25.056h-86.128a49.712 49.712 0 0 0-6.944 25.072z m400-25.072H608.464a100 100 0 1 1-192.928 0H162v275.76a50.064 50.064 0 0 0 50 50.128h600a50.064 50.064 0 0 0 50-50.128V520z" p-id="4888" fill="#ffffff"></path></svg>
              3-5年
            </span>
          </div>
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
          <!-- <div class="job-city">
            <span class="job-city-info">工作地点</span>：{{ selectedRecruit.jobCity }}
          </div> -->
        </div>

        <div class="description">
          <h3>岗位要求：</h3>
          <span class="descrip" v-html="selectedRecruit.content"></span>
        </div>
        <div class="description">
          <span class="descrip" v-html="selectedRecruit.requirements"></span>
        </div>
        <div class="description" v-if="selectedRecruit.graduationYear">
          <span class="descrip">毕业要求</span>{{selectedRecruit.graduationYear}}
        </div>
        <div class="description" v-if="selectedRecruit.topSchool">
          <span class="descrip">毕业学校</span>{{ selectedRecruit.topSchool }}
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
.recruit-header {
  height: fit-content;
  background-color: #38566c;
  overflow: hidden;
  font-size: 24px;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.recruit-name {
  position: relative;
  font-size: 35px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #FFF;
  margin-left: 230px;
  margin-top: 25px;
  /* border: 1px solid white; */
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

.treatment {
  position: absolute;
  right: 20px;
  top: 0;
  width: 400px;
  height: fit-content;
  display: inline-block;
  overflow: hidden;
  /* border: 1px solid white; */
}
.course-group-tag-item {
  height: 30px;
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  float: left;
  margin-right: 10px;
  background-color: rgba(255, 255, 255, .1);
  color: #FFF;
}

.course-group-tag-item-footer {
  margin-top: 7px;
  padding: 0 5px;
  text-overflow: ellipsis;
  overflow: hidden;
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
  margin-left: 25px;
}

.description {
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 100;
  font-size: 16px;
  margin-top: 20px;
  line-height: 2;
  /* border: 1px solid white; */
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}

.description-container {
  height: fit-content;
  width: fit-content;
}

.recruitment-requirements {
  display: inline-block;
  margin-right: 15px;
  font-size: 20px;
}

/* 公司信息容器样式 */
.company {
  display: none;
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