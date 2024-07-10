<template>
  <div class="markdown-container">
    <div class="search-box">
    <span class="title">标题：</span>
      <input type="text" v-model="title" placeholder="请输入标题" />
    </div>
    <div class="search-box">
    <span class="title">外链：</span>
      <input type="text" v-model="href" placeholder="请输入文章外链" />
    </div>
    <div id="markdown-box" @change="onEditorChange"></div>
    <div class="bottom">
      <button type="primary" @click="onSubmitClick">提交</button>
    </div>
  </div>
</template>

<script setup>
import MkEditor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
// 添加消息弹窗的方法
import { ElMessage } from 'element-plus'

const title = ref("");
const href = ref("")
let mkEditor;
// 处理离开页面切换语言导致 dom 无法被获取
let el;
// dom 渲染之后再调用 initEditor 方法，因为在这里需要使用到 el
onMounted(() => {
  el = document.querySelector("#markdown-box");
  initEditor();
});

// 处理编辑相关
const route = useRoute();
const articleId = route.params.id;
const detail = ref({});
const getArticleDetail = async () => {
  axios.get(`/article/getById/${articleId}`).then((res) => {
    console.log("res", res);
    detail.value = res.data.result;
    mkEditor.setHTML(detail.value.content);
    title.value = detail.value.title;
    href.value = detail.value.href;
  });
};
if (articleId) {
  getArticleDetail();
}

const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: "500px",
    previewStyle: "vertical",
    language: "zh-CN",
  });

  mkEditor.getMarkdown();
};

const router = useRouter();
// 处理提交
const onSubmitClick = () => {
  if (articleId) {
    const article = {
      articleId: articleId,
      title: title.value,
      href: href.value,
      content: mkEditor.getHTML(),
    };
    axios.put("/back/article/updateById/", article).then((response) => {
      router.push(`/article/${articleId}`);
    });
  } else {
    // 发送创建文章请求
    const article = { title: title.value, href: href.value, content: mkEditor.getHTML() };
    axios.post('/back/article/save', article).then(() => {
      ElMessage({
        message: '创建文章成功',
        type: 'success',
      })
      router.push('/article-list')
    })
  }
};
</script>

<style lang="scss" scoped>
.markdown-container {

  min-height: 800px;
  max-width: 1152px;
  margin: 0 auto;

  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}

.search-box {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 80px;
}

.search-box input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  width: 100%;
  height: 30px;
}

.title {
  display: block;
  width: 60px;
  font-size: 18px;
}
</style>