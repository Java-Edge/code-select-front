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
          link: "https://www.bilibili.com/",
          img: "https://www.bilibili.com/favicon.ico",
          name: "哔哩哔哩"
        },
        {
          link: "https://www.bilibili.com/",
          img: "https://www.bilibili.com/favicon.ico",
          name: "哔哩哔哩"
        },
        {
          link: "https://www.bilibili.com/",
          img: "https://www.bilibili.com/favicon.ico",
          name: "哔哩哔哩"
        },
        {
          link: "https://www.bilibili.com/",
          img: "https://www.bilibili.com/favicon.ico",
          name: "哔哩哔哩"
        },
        {
          link: "https://www.bilibili.com/",
          img: "https://www.bilibili.com/favicon.ico",
          name: "哔哩哔哩"
        },
        {
          link: "https://www.bilibili.com/",
          img: "https://www.bilibili.com/favicon.ico",
          name: "哔哩哔哩"
        },
        {
          link: "https://www.bilibili.com/",
          img: "https://www.bilibili.com/favicon.ico",
          name: "哔哩哔哩"
        },
        {
          link: "https://www.bilibili.com/",
          img: "https://www.bilibili.com/favicon.ico",
          name: "哔哩哔哩"
        },
        {
          link: "https://www.bilibili.com/",
          img: "https://www.bilibili.com/favicon.ico",
          name: "哔哩哔哩"
        },
        {
          link: "https://www.bilibili.com/",
          img: "https://www.bilibili.com/favicon.ico",
          name: "哔哩哔哩"
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
  display: flex;
  justify-content: center;
}
</style>