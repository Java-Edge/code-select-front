<!--
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-07-16 17:51:44
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-07-17 21:25:53
-->
<template>
  <router-link :to="`/recruit/${recruit.id}`" class="link-sty">
    <div class="course-box">
      <div class="course-details">
        {{ recruit.title }}
      </div>
       <div class="salary">薪资：{{ recruit.salaryMin }}~{{ recruit.salaryMax }}</div>
      <div class="des">{{ recruit.des }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    recruit: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>      
.link-sty{
  text-decoration: none;
  color: black;
}
.course-box {
      flex: 0 0 calc(50% - 20px);
      max-width: 400px;
      margin-bottom: 20px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      overflow: hidden;
      text-decoration: none; /* Remove default underline style */
      transition: transform 0.2s ease-in-out; /* Add smooth transform transition */
      height: 120px;
    }

    .course-box:hover {
      transform: scale(1.02); /* Add slight scale effect on hover */
    }

    .course-details {
      padding: 20px;
    }

    .course-details h4 {
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 10px;
    }

    .des {
      padding: 0 20px 20px;
      font-size: 14px;
      color: #555555;
      line-height: 1.6;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
</style>
