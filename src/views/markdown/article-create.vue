<template>
  <div class="markdown-container">
    <!-- Search box -->
    <div class="search-box">
    <span class="title">标题：</span>
      <!-- Implement the search input and button here -->
      <input type="text" v-model="title" placeholder="请输入标题" />
    </div>
    <div class="search-box">
    <span class="title">外链：</span>
      <!-- Implement the search input and button here -->
      <input type="text" v-model="href" placeholder="请输入文章外链" />
    </div>
    <!-- 渲染区 -->
    <div id="markdown-box" @change="onEditorChange"></div>
    <div class="bottom">
      <button type="primary" @click="onSubmitClick">提交</button>
    </div>
  </div>
</template>
  
<script setup>
import MkEditor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// 标题
const title = ref("");
const href = ref("")
// Editor实例
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
    hfef.value = detaile.value.href;
  });
};
if (articleId) {
  getArticleDetail();
}



// 编辑相关
// watch(
//   () => detail,
//   val => {
//     if (val && val.content) {
//       mkEditor.setHTML(val.content)
//     }
//   },
//   {
//     immediate: true
//   }
// )

const lastMD = ref();

const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: "500px",
    previewStyle: "vertical",
    language: "zh-CN",

    // hooks: {
    //   // 钩子函数
    //   addImageBlobHook: (fileOrBlob, callback) => {

    //     console.log("upload image");
    //     console.log("fileOrBlob", fileOrBlob);
    //     // console.log("fileOrBlob2", fileOrBlob.text());
    //     // 文件上传
    //     let formData = new FormData();
    //     formData.append("file", fileOrBlob);
    //     axios.post("/article/uploadImg", formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     }).then((response) => {
    //       console.log(response);
    //     });



    //     console.log("callback", callback);
    //     //  this.uploadImgApi(fileOrBlob).then(path => {
    //     //       callback(path, 'T_T，出错了');
    //     //  });
    //   },
    // },

  });

  // 监听事件，监听什么事件可以在editor.d.ts中查看
  // mkEditor.on('change', (ee) => {
  //           console.log('change', ee);
  //           const regex = /!\[.*?\]\([^)]*\)/g;
  //           const str = mkEditor.getMarkdown().match(regex);
  //           console.log('md', mkEditor.getMarkdown())
  //           console.log('str', str);
  // });

  mkEditor.getMarkdown();
};






const router = useRouter();
// 处理提交
const onSubmitClick = () => {
  if (articleId) {
    console.log(mkEditor.getHTML());
    console.log("title:", title.value);
    console.log(title);
    const article = {
      articleId: articleId,
      title: title.value,
      href: href.value,
      content: mkEditor.getHTML(),
    };
    axios.put("/back/article/updateById/", article).then((response) => {
      console.log(response);
      router.push(`/article/${articleId}`);
    });
  } else {
    // 发送创建文章请求
    console.log(mkEditor.getHTML());
    console.log("title:", title.value);
    console.log(title);
    const article = { title: title.value, href: href.value, content: mkEditor.getHTML() };
    axios.post("/back/article/save", article).then((response) => {
      console.log(response);
    });
    router.push('/article-list/0');
  }

  // 文章提交之后清空md内容和标题内容
  // mkEditor.reset();
  // title.value = '';
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
  