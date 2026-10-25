<template>
  <!-- 招聘列表卡片 -->
  <router-link :to="`/recruit/${recruit.id}`" class="link-sty">
    <div class="course-box" @click="deliver(recruit.sourceUrl)">
      <PostCard :recruit="recruit" v-if="recruit"/>
      <el-skeleton style="width: 600px;" v-else :rows="5" animated />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import PostCard from '@/components/recruit/post-card.vue'
import type { RecruitDisplayItem } from '@/api/recruit'

defineProps<{
  recruit: RecruitDisplayItem
}>()

// Deliver function
const deliver = (sourceUrl: string | null) => {
  if (sourceUrl !== null) {
    window.open(sourceUrl)
  }
}
</script>

<style scoped>
.link-sty {
  text-decoration: none;
  color: black;
}

.course-box {
  /* flex: 0 0 calc(50% - 20px); */

  /* max-width: 100%; */
  width: 850px;
  height: 150px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
  border-radius: 5px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
  padding-top: 10px;
}

.course-box:hover {
  transform: scale(1.05);
}
</style>
