<!--
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-07-16 17:51:44
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-07-17 21:25:53
-->
<template>
  <router-link :to="`/course/${course.id}`">
    <div class="course-box">
      <div class="image-container" :style="{backgroundImage:`url(${course.image})`}">
        <!-- <img :src="course.image" alt="课程图片" /> -->
      </div>
      <div class="course-text">
        <p>{{ course.name }}</p>
        <!-- <span class="difficulty">中级 · 118人报名 </span> -->
        <!-- <p class="description">{{ course.description }}</p> -->
        <p class="price">{{ course.price }}</p>
        <!-- You can add more course details as needed -->
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.course-details a:nth-child(5n){
  .course-box{
    margin-right: 0px;
  }
}
.course-box {
  display: flex;
  flex-direction: column;
  width: 270px;
  height: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, .15);
  line-height: 30px;
  margin: 0 62px 24px 0;
}

.image-container {
  overflow: hidden;
  margin-bottom: 10px;
  height: 170px;
  max-height: 200px;
  margin-bottom: 8px;
  border-radius: 8px 8px 0 0;
  object-fit: contain;
}




.course-text {
  p {
    color: #545c63;
    line-height: 20px;
    height: 40px;
    margin-bottom: 8px;
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;


  }

  .description {
    color: #666;
    margin-bottom: 5px;
  }

  .difficulty {
    display: block;
    color: #9199a1;
    font-size: 12px;
    margin-bottom: 8px;
    padding: 0 8px;
  }

  .price {
    font-weight: bold;
    color: #ff8800;
  }

}


.course-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px 0 rgba(95, 101, 105, .15)
}</style>
