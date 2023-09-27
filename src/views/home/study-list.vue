<template>
    <div class="course-details">
        <Item v-for="course in courses" :key="course.id" :course="course" />
    </div>
</template>
    
<script setup>
import { onMounted, ref } from "vue";
import Item from "./study-item.vue";
import {getList} from '@/api/sourceCourse'
const courses = ref([{

}])
const getCourses = () => {
  getList().then(response => {
    const coursesData = response.data.result;
    courses.value = coursesData;
  })
}
onMounted(()=>{
    getCourses()
})
</script>
    
<style lang="scss">
.course-details {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
}
</style>
    