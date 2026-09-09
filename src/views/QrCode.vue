<template>
  <div class="qr-code-container">

    <!-- 右侧二维码标题 -->
    <div class="qr-content" @mouseout="hideSubMenu">
      <div class="menu-item" v-for="(item, index) in codes" :key="index" @mouseover="showSubMenu(index)">
        <a href="">
          <span class="title" :data-text="item.title"></span>
        </a>
      </div>
    </div>

    <!-- 右侧二维码标题图片 -->
    <div class="qr-code hide" @mouseover="showSubMenu(-1)" @mouseout="hideSubMenu">
      <div class="inner-box" v-show="menu_item_index == index" v-for="(item, index) in codes" :key="index">
        <div class="sub-inner-box">
          <span class="qr-title">{{ item.title }}</span>
          <img :src="item.img" alt="QR Code" class="qr-img" loading="lazy" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, defineOptions } from 'vue'
import wechatCode from '@/assets/wechat_code.jpg'

// Define component name to satisfy multi-word naming convention
defineOptions({
  name: 'CourseNavigation'
})

export interface QrCodeItem {
  id: number
  title: string
  img: string
}

// Reactive state
const menu_item_index = ref(0)
const codes = ref<QrCodeItem[]>([
  {
    id: 4,
    title: "官方微信",
    img: wechatCode
  },
])

// Show submenu
const showSubMenu = (index: number): void => {
  if (index !== -1) {
    menu_item_index.value = index
  }
  document.querySelector('.qr-code')?.classList.remove('hide')
}

// Hide submenu
const hideSubMenu = (): void => {
  document.querySelector('.qr-code')?.classList.add('hide')
}
</script>

<style scoped>
.qr-code-container {
  position: fixed;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
}

.title {
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #333;
  display: flex;
  flex-wrap: wrap;
}

.title::before {
  content: attr(data-text);
  display: inline-block;
  width: 50%;
}

.qr-code {
  position: fixed;
  top: 50%;
  right: 80px;
  transform: translateY(-50%);
}

.qr-title {
  text-align: center;
}

.hide {
  display: none;
}

.qr-img {
  width: 200px;
  height: 200px;
}
</style>
