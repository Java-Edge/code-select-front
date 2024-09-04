<template>
  <div class="article-detail-container main-content">
      <h2 class="title"> {{detail.name}} </h2>
      <div class="header">
          <span class="time"> 发布时间 ：
              {{ detail.createTime }}
          </span>
      </div>
      <div class="content" v-html="detail.content"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'
import "@toast-ui/editor/dist/toastui-editor.css";


const route = useRoute()
const articleId = route.params.id
const detail = ref({});
const getArticleDetail = async () => {
  axios.get(`/back/download/getById/${articleId}`).then(res=>{
      detail.value = res.data.result
  })
};
getArticleDetail();

const router = useRouter()
const onEditClick = row => {
router.push(`/article-editor/${articleId}`)
}
</script>

<style lang="scss" scoped>
.article-detail-container {
.title {
  font-size: 22px;
  text-align: center;
  padding: 12px 0;
}
.header {
  padding: 26px 0px;
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
  font-size: 14px;
  padding: 20px 0px;
  border-top: 1px solid #d4d4d4;
  display: block
}
}
</style>