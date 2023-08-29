<template>
  <div class="course-details">
    <div class="course-row" v-for="row in courseRows" :key="row">
      <CourseBox v-for="course in row" :key="course.id" :course="course" />
    </div>
  </div>
</template>
  
  <script>
import CourseBox from "./CourseBox";

export default {
  name: "CourseList",
  components: {
    CourseBox,
  },
  props: {
    courses: Array,
  },
  computed: {
    courseRows() {
      // 将所有课程按每行4个进行分组
      const rows = [];
      for (let i = 0; i < this.courses.length; i += 4) {
        rows.push(this.courses.slice(i, i + 4));
      }
      return rows;
    },
  },
};
</script>
  
  <style>
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
  