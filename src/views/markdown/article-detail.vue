<template>
    <div class="article-detail-container">
        <h2 class="title"> {{detail.title}} </h2>
        <div class="header">
            <!-- <span class="author"> 作者 ： 黑猫警长 </span> -->
            <span class="time"> 发布时间 ：
                {{ detail.createTime }}
            </span>
            <button type="text" class="edit" @click="onEditClick">
                编辑
            </button>
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
    axios.get(`/article/getById/${articleId}`).then(res=>{
        console.log(res)
        detail.value = res.data.result
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
  .title {
    font-size: 22px;
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
    font-size: 14px;
    padding: 20px 200px;
    border-top: 1px solid #d4d4d4;
    display: block
  }
}
</style>
