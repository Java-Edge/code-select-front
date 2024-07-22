<template>
    <div class="article-detail-container main-content">
        <h2 class="title"> {{detail.title}} </h2>
        <div class="header">
            <!-- <span class="author"> 作者 ： 黑猫警长 </span> -->
            <span class="time"> 发布时间 ：
                {{ detail.createTime }}
            </span>
            <!-- <button type="text" class="edit" @click="onEditClick">
                编辑
            </button> -->
        </div>
        <div class="content" v-html="detail.content"></div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'
import "@toast-ui/editor/dist/toastui-editor.css";
import { toastui } from "@toast-ui/editor";
// 获取数据
const route = useRoute()
const articleId = route.params.id
const detail = ref({});
const getArticleDetail = async () => {
    axios.get(`/back/innerRecommend/getById/${articleId}`).then(res=>{
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


