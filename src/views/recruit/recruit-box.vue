<template>
  <!-- 招聘列表卡片 -->
  <router-link :to="`/recruit/${recruit.id}`" class="link-sty">
    <div class="course-box" @click="deliver(recruit.sourceUrl)">
      <PostCard :recruit="recruit" v-if="recruit"/>
      <el-skeleton style="width: 1000px;" v-else :rows="5" animated />
    </div>
  </router-link>
</template>

<script>
import PostCard from '@/components/recruit/post-card';
export default {
  props: {
    recruit: {
      type: Object,
      required: true,
    },
  },
  components: {
    PostCard
  },
  methods: {
    deliver(sourceUrl) {
      if (sourceUrl !== null) {
        window.open(sourceUrl);
      }else{
        console.log(333)
      }
    },
  },
};
</script>

<style scoped>
.link-sty {
  text-decoration: none;
  color: black;
}

.course-box {
  /* flex: 0 0 calc(50% - 20px); */

  /* max-width: 100%; */
  width: 1100px;
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
