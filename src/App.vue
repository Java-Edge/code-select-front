<template>
  <div id="app">
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
// Import external style files
@import url('./assets/css/base.css');

#app {
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
