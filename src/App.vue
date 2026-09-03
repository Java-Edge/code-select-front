<template>
  <!-- 根元素用 class 而非 id：index.html 的挂载容器已占用 id="app"，
       若此处再写 id 会造成同一文档内 id 重复且样式双向命中。 -->
  <div class="app-root">
    <Header />
    <router-view class="body" />
    <QrCode />
  </div>
</template>

<script setup>
import Header from './views/Header.vue'
import QrCode from './views/QrCode.vue'
</script>

<style lang="scss">
// base.css 已由 main.js 统一引入（在 tokens.css 之后），此处不再重复 @import。
// 原写法为 `@import url(...)`，会被编译为运行时原生 CSS @import，额外产生一个
// HTTP 请求且晚于打包内联样式生效，属纯重复。

.app-root {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.body {
  min-height: 92.5vh;
  margin-top: 72px !important;
}

.course-navigation {
  max-width: 1152px;
  margin: 0 auto;
}
</style>
