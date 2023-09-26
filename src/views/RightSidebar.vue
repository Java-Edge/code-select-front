<template>
  <div class="right-sidebar">
    <div class="swiper-container">
      <el-carousel :interval="4000" type="card" height="450px">
        <el-carousel-item v-for="item in carouselData" :key="item.id">
          <router-link :to="`/course/${item.id}`">
              <img :src="item.image" alt="轮播图" class="course-image" />
            </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightSidebar',
  props: {
    carouselData: {
      type: Array,
      required: true,
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
/* 添加样式 */
.right-sidebar {
  flex: 1;
  padding: 20px;
  min-width: 300px;
  /* Set a minimum width for the sidebar */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swiper-container {
  width: 100%;
  height: 420px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.course-image {
  width: 100%;
  height: 90%;
  object-fit: fill;
}
</style>
