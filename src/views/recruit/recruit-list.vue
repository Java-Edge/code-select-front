<template>
  <div class="course-details main-content">
    <RecruitBox v-for="recruit in recruits" :key="recruit.id" :recruit="recruit" />
  </div>
</template>

<script setup lang="ts">
import RecruitBox from './recruit-box.vue'
import type { RecruitDisplayItem } from '@/api/recruit'

defineOptions({
  name: 'RecruitList'
})

defineProps<{
  recruits: RecruitDisplayItem[]
}>()
</script>

<style scoped>
/* 招聘列表容器外边框 */
.course-details {
  position: relative;
  width: 1152px;
}
</style>
