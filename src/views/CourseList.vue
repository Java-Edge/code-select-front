<template>
  <div class="course-details">
    <CourseBox v-for="course in courses" :key="course.id" :course="course" />
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
};
</script>
  
<style lang="scss" scoped>
.course-details {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}


.course-box {
  flex: 0 0 calc(20% - 20px);
}

.course-box h4 {
  margin-bottom: 10px;
  font-size: 16px;
}

.course-box p {
  color: #666;
}
</style>
  