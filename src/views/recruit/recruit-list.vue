<template>
  <div class="course-details main-content">
    <div class="course-row" v-for="row in recruitRows" :key="row">
      <RecruitBox v-for="recruit in row" :key="recruit.id" :recruit="recruit" />
    </div>
<!--    <div class="course-right-side-container">-->
<!--      <el-card class="box-card">-->
<!--        <template #header>-->
<!--          <div class="card-header">-->
<!--            <span>关注我，一键定制更多目标职位</span>-->
<!--          </div>-->
<!--        </template>-->
<!--        <div v-for="o in 4" :key="o" class="posts-list" @click="handleClickPosts(o)">-->
<!--          <div class="posts-header">-->
<!--            <span>技术总监</span>-->
<!--            <span class="salary">30—40K</span>-->
<!--          </div>-->
<!--          <div class="posts-supplement">-->
<!--            <span>北京新东方</span>-->
<!--            <span>北京朝阳区</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-card>-->
<!--    </div>-->
  </div>
</template>
<script>
import RecruitBox from "./recruit-box.vue";

export default {
  name: "RecruitList",
  components: {
    RecruitBox,
  },
  props: {
    recruits: Array,
  },
  computed: {
    recruitRows() {
      // 将所有课程按每行5个进行分组
      const rows = [];
      for (let i = 0; i < this.recruits.length; i += 1) {
        let formatJobs = this.recruits.slice(i, i + 1);
        // 将后端的数据遍历解释
        formatJobs = formatJobs.map((item) => {
          return this.transformJobInfo(item);
        });
        rows.push(formatJobs);
      }
      return rows;
    },
  },
  methods: {
    // 将后端的数据解释
    transformJobInfo(job) {
      // 1. 学历
      this.transformEducationLevel(job.eduLevel, (result) => {
        job.education = result;
      });
      // 2. 薪资，根据招聘类型，实习、社招、校招，确定薪资类型：k、w
      this.transformSalary(job, (result) => {
        job.salary = result;
      })
      job.picUrl = job.picUrl === null ? "https://picx.zhimg.com/v2-d534f6d0948d7228b4173e6e1a7a3436_xl.jpg" : job.picUrl;
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
    handleClickPosts(id) {
      if (id) {
        // TODO：页面跳转
      }
    }
  },
};
</script>

<style scoped>

/* 招聘列表容器外边框 */
.course-details {
  position: relative;
  width:1152px;
}

/* 招聘列表 */
.course-row {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* border: 1px solid red; */
  margin-bottom: 20px;
}

.course-right-side-container {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 25%;
  height: fit-content;
  /* border: 1px solid red; */
}

.course-box {
  flex: 0 0 calc(20% - 20px);
  /* Add margin to create spacing between the course boxes */
}

.course-box h4 {
  margin-bottom: 10px;
  font-size: 16px;
}

.course-box p {
  color: #666;
}

/* 职位列表 */
.posts-list {
  width: 100%;
  height: 60px;
  /* background-color: #e3d3d3; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 10px;
  cursor: pointer;
}

.posts-header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-weight: 600;
  /* background-color: aqua; */
  display: flex;
  justify-content: space-between;
}

.salary {
  font-size: 16px;
  font-weight: 700;
  color: var(--salary);
}

.posts-supplement {
  width: 100%;
  height: 20px;
  font-size: 15px;
  font-weight: 600;
  color: #bbb;
  /* background-color: antiquewhite; */
  display: flex;
  justify-content: space-between;
}

</style>
