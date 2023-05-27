<template>
  <div class="article-detail-container main-content">
    <div><h2 class="title"> {{ detail.title }} </h2></div>
    <div class='interview-type'>
      <div class='interview-create-time'>{{ detail.createAt }}</div>
      <div class="career-type">分类：{{ detail.careerName }}</div>
    </div>
    <div class="content" v-html="detail.content"></div>
  </div>
  
</template>

<script setup>
import { ref } from "vue";
import axios from '@/axios';
import { useRoute } from 'vue-router'

const route = useRoute()
const articleId = route.params.id
const detail = ref({});
const getArticleDetail = async () => {
  axios.get(`/back/interview/getById/${articleId}`).then(res => {
    detail.value = res.data.result
    detail.value.content = detail.value.content.replace(/\n/g, '<br/>')
  })
};
getArticleDetail();



</script>

<style lang="scss" scoped>
.article-detail-container {

  line-height: 36px;
  padding: 16px;


  .title {
    font-size: 29px;
    text-align: center;
    padding: 12px 0;
  }

  .content {
    font-size: 18px;
    // padding: 20px 200px;
    // border-top: 1px solid #d4d4d4;
    display: block;
    min-height: 500px;
  }

  .interview-type {
      margin-bottom: 20px;
      // border-top: 1px solid #e0e0e0;
      padding-top: 10px;
      color: #888888;
      display: flex;
    }
    .interview-type:hover {
      color: #0a1846;
      cursor: auto
    }

    .interview-create-time {
      font-size: 14px;
    }
    .career-type {
      font-size: 14px;
      margin-left: 12px;
      border: 2px ;
    }
}


</style>