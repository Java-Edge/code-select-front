<template>
    <div class="course-details">
        <Item v-for="item in roamMapList" :key="item.id" :item="item" />
    </div>
</template>
    
<script setup>
import { onMounted, ref, watch } from "vue";
import Item from "./study-item.vue";
import axios from 'axios'
const props = defineProps({
  roamMapList: {
      type: Array,
      required: true
    }
});
const roamMapList = ref(props.roamMapList)
watch(
  () => props.roamMapList,
  (newV, oldV) => {
    roamMapList.value = newV
    // console.log("change", newV)
  },
)
console.log("子组件", roamMapList.value)
// initRoadMap()
// const getRoadMap = () => {
//   console.log(roadMaps.value)
//   list.value = roadMaps.value[categoryId.value]
//   console.log(list.value)
// }
// watch(
//   categoryId.value,
//   (nV) => {
//     console.log("watch", categoryId.value)
//   }
// );
</script>
    
<style lang="scss">
.course-details {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
}
</style>
    