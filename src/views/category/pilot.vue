<template>
  <div class="content-class">
    <div class="category-com"><categry-components :list="list" title="媒体"></categry-components></div>
<!--    <div class="category-com"><categry-components :list="list" title="媒体"></categry-components></div>-->
  </div>
</template>

<script>
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
import CategryComponents from "@/views/category/categryComponents.vue";

export default {
  name: "pilotPage",
  components: {
    CategryComponents,
    Header, // Register the Header component
    Footer, // Register the Footer component
  },
  created() {
  },
  data() {
    return {
      list: [
        {
          link: "https://www.baidu.com/",
          img: "https://www.baidu.com/favicon.ico",
          name: "百度"
        },
        {
          link: "https://www.bilibili.com/",
          img: "https://www.bilibili.com/favicon.ico",
          name: "哔哩哔哩"
        },
        {
          link: "https://www.csdn.net/",
          img: "https://www.csdn.net/favicon.ico",
          name: "CSDN"
        },
        {
          link: "https://element.eleme.cn/#/zh-CN",
          img: "https://element.eleme.cn/favicon.ico",
          name: "element-ui"
        },
        {
          link: "https://www.zhihu.com/",
          img: "https://www.zhihu.com/favicon.ico",
          name: "知乎"
        },
        {
          link: "https://www.jianshu.com/",
          img: "https://www.jianshu.com/favicon.ico",
          name: "简书"
        },
        {
          link: "https://mp.weixin.qq.com/",
          img: "https://mp.weixin.qq.com/favicon.ico",
          name: "微信公众平台"
        },
        {
          link: "https://open.weixin.qq.com/",
          img: "https://open.weixin.qq.com/favicon.ico",
          name: "微信开放平台"
        },
      ],
    }
  },
  methods: {
  },
}
</script>

<style>
.category-com {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>