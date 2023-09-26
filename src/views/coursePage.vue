<template>
  <div>
    <CourseList :courses="courses" />
  </div>
</template>

<script>
import CourseList from "@/views/CourseList.vue";

export default {
  name: "CoursePage",
  components: {
    CourseList, // Register the CourseList component
  },
  created() {
    this.getCourses();
  },
  data() {
    return {
      courses: [], // 所有课程数据，从后端获取或静态定义
    };
  },
  methods: {
    getCourses() {
      this.$axios
        .get(
          "/back/sourceCourse/list"
          // ,
          //     {
          //         headers: {
          //             "Authorization": this.$store.getters.getToken
          //         }
          //     }
        )
        .then((response) => {
          const courses = response.data.result;
          console.log(response);
          this.courses = courses;
          // this.$message({
          //     type: 'success',
          //     message: response.data.message
          // });
          console.log(this.courses);
        });
    },
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
</style>