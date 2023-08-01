<!--
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-07-27 23:00:40
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-07-27 23:18:43
-->
<template>
  <div class="article-detail-container">
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
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'
import "@toast-ui/editor/dist/toastui-editor.css";

// 获取数据
const route = useRoute()
const articleId = route.params.id
const detail = ref({});
const getArticleDetail = async () => {
  axios.get(`/interview-experience/getById/${articleId}`).then(res => {
    console.log(res)
    detail.value = res.data.result
    console.log(detail.value.content)
    detail.value.content = detail.value.content.replace(/\n/g, '<br/>')
    console.log(detail.value.content)
  })
  // detail.value = await articleDetail(articleId);
};
getArticleDetail();

const router = useRouter()
const onEditClick = row => {
  router.push(`/article-editor/${articleId}`)
}
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

  .header {
    padding: 26px 200px;

    .author {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }

    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }

    .edit {
      float: right;
      cursor: pointer;
      background-color: white;
    }

    
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
}</style>
