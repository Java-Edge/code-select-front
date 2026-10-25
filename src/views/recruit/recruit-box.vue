<template>
  <!-- 招聘列表卡片：整卡跳详情，原文投递收敛到详情页按钮（旧实现同时跳详情+开原文，行为冲突） -->
  <router-link :to="`/recruit/${recruit.id}`" class="link-sty">
    <div class="course-box">
      <PostCard :recruit="recruit" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import PostCard from '@/components/recruit/post-card.vue'
import type { RecruitDisplayItem } from '@/api/recruit'

defineProps<{
  recruit: RecruitDisplayItem
}>()
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
