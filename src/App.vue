<template>
  <div id="app">
    <!-- 依次插入Header组件、router-view组件和Footer组件 -->
    <Header />
    <!-- 负责渲染路由匹配的组件，把router-view放在不同地方，实现复杂项目的页面布局 -->
    <router-view class="body" />
    <QrCode></QrCode>
    <Footer />
  </div>
</template>

<script>
import Header from "./views/Header.vue";
import Footer from "./views/Footer.vue";
import QrCode from "./views/QrCode.vue";

export default {
  name: "App",
  components: {
    // 在Vue组件中，将Header和Footer组件注册为该组件的子组件
    Header,
    Footer,
    QrCode,
  },
};
</script>

<style lang="scss">
// 引入外部样式文件 在组件样式中包含全局样式或重用的样式文件
// 在当前组件的样式中使用这些外部定义的样式规则
@import url("./assets/css/base.css");

#app {
  /*  定位在页面的左上角、设置宽度和高度为100% */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.body {
  min-height: 92.5vh;
  margin-top: 72px !important;
}

/* 最大宽度设置为1152px，并将其水平居中对齐 */
.course-navigation {
  margin: 0 auto;
}
</style>