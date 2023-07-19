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
      <div class="image-container">
        <img :src="course.image" alt="课程图片" />
      </div>
      <div class="course-details">
        <h4>{{ course.name }}</h4>
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

<style>
.course-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  height: 300px;
  padding: 10px;
  //background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 30px;
  margin: 30px 30px;
}

.image-container {
  border-radius: 5px;
  overflow: hidden;
}

.course-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.course-details {
  text-align: center;
  margin-top: 10px;
}

.course-details h4 {
  font-size: 18px;
  margin-bottom: 5px;
  color: #555555;
}

.course-details .description {
  color: #666;
  margin-bottom: 5px;
}

.course-details .price {
  font-weight: bold;
  color: #ff8800;
}
</style>
