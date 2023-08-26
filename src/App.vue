<template>
    <div id="app" class="course-navigation">
        <!-- 在div元素内部，依次插入Header组件、router-view组件和Footer组件。-->
        <Header/>
        <router-view class="body"/>
        <QrCode></QrCode>
        <Footer/>
    </div>
</template>
<script>
  // 导入Header和Footer组件，这些组件分别位于名为Header.vue和Footer.vue的文件中
  import Header from './views/Header.vue';
  import Footer from './views/Footer.vue';
  import QrCode from './views/QrCode.vue';
  
  
  export default {
    name: "RecruitNavigation",
    components: {
      // 在Vue组件中，将Header和Footer组件注册为该组件的子组件
      Header,
      Footer,
      QrCode,
    },
  
  };
  </script>
  
<style lang="scss">
// @import url('./assets/css/base.css');
    #app {
      /*  定位在页面的左上角、设置宽度和高度为100% */
      top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
  .body {
    min-height: 800px;
  }
  /* 最大宽度设置为1600px，并将其水平居中对齐 */
  .course-navigation {
    max-width: 1600px;
    margin: 0 auto;
  }
</style>
