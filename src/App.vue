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

/* 已删除三条失效声明（保留 position/width）：
   - height:100% —— 百分比高度的父级链 html → body → #app 挂载容器均未设置 height，
     逐级降级为 auto，该声明从未生效；删除后实际渲染表现与删除前一致。
   - top:0 / left:0 —— position:relative 下的相对偏移，取值为 0 时无视觉效果。
   position:relative 必须保留：内部 absolute 元素以本元素为包含块。 */
.app-root {
  position: relative;
  width: 100%;
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