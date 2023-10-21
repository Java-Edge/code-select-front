<!--
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-07-27 23:00:40
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-07-27 23:18:43
-->
<template>
  <div class="article-detail-container main-content">
    <div><h2 class="title"> {{ detail.title }} </h2></div>
    <div class='interview-type'>
      <div class='interview-create-time'>{{ detail.createAt }}</div>
      <div class="career-type">分类：{{ detail.careerName }}</div>
    </div>
    <div class="content" v-html="detail.content"></div>
  </div>
  <div class="box">
        <!-- 评论框 -->
        <div class="comment">
            <input type="text" v-model="content" placeholder="请输入评论" />
            <div class="publish" @click="postComment()">发布</div>
        </div>
        <div class="commentList">
            <div class="commentItem" v-for="item in comments" :key="item.id">
                <div class="top">
                    <div class="itemImg">
                        <img
                            src="https://p5-pro.a.yximgs.com/uhead/AB/2023/01/13/16/BMjAyMzAxMTMxNjAzMDhfMzIwNTU1NDExXzJfaGQ3NDVfNDc4_s.jpg" />
                    </div>
                    <div class="commName">{{ item.user.username }}</div>
                </div>
                <div class="content">{{ item.content }}</div>
                <div class="bottom">
                    <div class="time">{{ item.createTime }}</div>
                    <div class="del" @click='del()'>删除</div>
                </div>
            </div>
        </div>
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
  axios.get(`/back/interview/getById/${articleId}`).then(res => {
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


const content = ref("")
const comments = ref([])
const feId = articleId
const getComments = async () => {
    axios.get(`/back/comment/getComponentByFid/${feId}?current=1&size=5`).then((res) => {
        comments.value = res.data.result.records;
    });
};
getComments()

const del = () => {
}

const postComment = () => {
    const comment = {
        content: content.value,
        feId: feId,
    }
    axios.post(`/back/comment/postComment`, comment).then((res) => {
    });
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
}

 .box {
     width: 100vw;
 }

 .box .comment {
     width: 80vw;
     height: 100px;
     display: flex;
     align-items: center;
     margin: auto;
     margin-top: 50px;
 }

 .box .comment input {
     width: 50vw;
     height: 50px;
     border: none;
     outline: none;
     background-color: #f1f2f3;
     padding-left: 20px;
     font-size: 16px;
 }

 .box .comment .publish {
     width: 80px;
     height: 50px;
     line-height: 50px;
     margin-left: 20px;
     font-weight: 600;
     color: #f1f2f3;
     background-color: #80d7f6;
     text-align: center;
     border-radius: 20px;
 }

 .box .comment .publish:hover {
     background-color: #00aeec;
     cursor: pointer;
     color: #fff;
 }

 .box .commentList {
     width: 80vw;
     margin: auto;
     margin-top: 10px;
 }

 .box .commentList .commentItem .top {
     display: flex;
     align-items: center;
     color: #73777e;
     font-weight: 600;
 }

 .box .commentList .commentItem .top .itemImg {
     width: 50px;
     height: 50px;
     overflow: hidden;
     border-radius: 50%;
     border: 1px solid #ccc;
     box-shadow: 1px 1px 8px #ccc;
     margin-right: 20px;
 }

 .box .commentList .commentItem .top .itemImg img {
     width: 100%;
 }

 .box .commentList .commentItem .content {
     padding: 20px 10px;
     padding-left: 80px;
 }

 .box .commentList .commentItem .bottom {
     display: flex;
     font-size: 14px;
     color: #acabab;
     padding-left: 30px;
     padding-bottom: 20px;
     margin-bottom: 20px;
     border-bottom: 1px solid #ccc;
 }

 .box .commentList .commentItem .bottom .del {
     margin-left: 80px;
 }

 .box .commentList .commentItem .bottom .del:hover {
     cursor: pointer;
     color: #000;
     font-weight: 600;
 }
</style>
