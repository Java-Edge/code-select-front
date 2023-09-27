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
          <img :src=item.img alt="QR Code" class="qr-img" />
        </div>
      </div>
    </div>

  </div>
</template>



<script>
export default {
  name: "CourseNavigation",
  data() {
    return {
      // 当前鼠标移入的分类菜单下标
      menu_item_index: 0,
      codes: [
        // {
        //   id: 1,
        //   title: "意见反馈",
        //   img: require("@/assets/qrcode_localhost.png")
        // },
        // {
        //   id: 2,
        //   title: "帮助中心",
        //   img: require("@/assets/default.jpg")
        // },
        // {
        //   id: 3,
        //   title: "APP下载",
        //   img: require("@/assets/qrcode_localhost.png")
        // },
        {
          id: 4,
          title: "官方微信",
          img: require("@/assets/wechat_code.jpg")

        },
      ],
    };

  },
  methods: {

    // 显示对应的二级分类菜单
    showSubMenu(index) {
      if (index != -1) {
        this.menu_item_index = index;
      }
      document.querySelector('.qr-code').classList.remove('hide');
    },

    // 隐藏二级分类菜单
    hideSubMenu() {
      document.querySelector('.qr-code').classList.add('hide');
    },

  }
};
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
  /* 调整字体大小 */
  font-weight: bold;
  /* 设置字体粗细 */
  text-transform: uppercase;
  /* 将文本转换为大写 */
  color: #333;
  /* 设置字体颜色 */
  display: flex;
  flex-wrap: wrap;
  /* 添加其他样式属性以满足您的需求 */
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
  /* font-size: 12px; */
}

.hide {
  display: none;
}

.qr-img {
  width: 200px;
  height: 200px;
  /* 其他样式属性 */
}
</style>
