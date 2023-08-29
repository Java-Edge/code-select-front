<template>
  <div class="course-details">
    <div class="course-row" v-for="row in recruitRows" :key="row">
      <RecruitBox v-for="recruit in row" :key="recruit.id" :recruit="recruit" />
    </div>
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
      for (let i = 0; i < this.recruits.length; i += 5) {
        let formatJobs = this.recruits.slice(i, i + 5);
        // 将后端的数据遍历解释
        formatJobs = formatJobs.map((item) => {
          let formatJob = this.transformJobInfo(item);
          return formatJob;
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
      this.transformSalary(job,(result) => {
        job.salary = result;
      })
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
  },
};
</script>
  
  <style scoped>
/* 样式略，保持原来的样式 */

.course-details {
  flex: 1;
  padding: 20px;
  /* Set a minimum width for the course details */
}

.course-row {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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
</style>
  