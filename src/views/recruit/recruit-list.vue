<template>
    <div class="course-details">
      <div class="course-row" v-for="row in recruitRows" :key="row">
        <RecruitBox v-for="recruit in row" :key="recruit.id" :recruit="recruit" />
      </div>
    </div>
  </template>
  
  <script>
  import RecruitBox from './recruit-box.vue';
  
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
        // 将所有课程按每行4个进行分组
        const rows = [];
        for (let i = 0; i < this.recruits.length; i += 4) {
          rows.push(this.recruits.slice(i, i + 4));
        }
        return rows;
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
  