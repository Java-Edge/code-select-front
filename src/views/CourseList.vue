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
  
<style lang="scss">
.course-details {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
.course-details a:nth-child(5n){
  .course-box{
    margin-right: 0px;
  }
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
  