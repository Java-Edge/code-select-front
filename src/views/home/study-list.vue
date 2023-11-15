<template>
    <div class="course-details">
        <Item v-for="item in roamMapList" :key="item.id" :item="item" />
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Item from "./study-item.vue";
const props = defineProps({
  roamMapList: {
      type: Array,
      required: true
    }
});
const roamMapList = ref(props.roamMapList)
watch(
  () => props.roamMapList,
  (newV) => {
    roamMapList.value = newV
  },
)

</script>

<style lang="scss">
.course-details {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
}
</style>
