<template>
    <div class="course-details">
        <Item v-for="item in list" :key="item.id" :item="item" />
    </div>
</template>
    
<script setup>
import { onMounted, ref } from "vue";
import Item from "./study-item.vue";
import axios from 'axios'
const courses = ref([{}])
const list = ref([]);
const props = defineProps({
    categoryId: {
      type: String,
      required: true
    }
});
const categoryId = ref(props.categoryId)
console.log('categoryId', categoryId.value)

const getRoadMap = () => {
  let path = `/back/roadmap/route?categoryId=${categoryId.value}&current=1&size=3`;
  axios.get(path).then(res => {
    list.value = res.data.result.records
    // console.log('list.value', list.value)
    // console.log('list.value', res)
  })
}
onMounted(()=>{
  getRoadMap()
})
</script>
    
<style lang="scss">
.course-details {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
}
</style>
    