<template>
  <div class="left-content">
    <!-- 分类菜单 -->
    <div class="menu-content" @mouseout="hideSubMenu">
      <div class="menu-item" v-for="(item, index) in menu_list" :key="index" @mouseover="showSubMenu(index)">
        <a href="javascript:;">
          <span>{{ item.name }}</span>
          <img src="https://s1.ax1x.com/2023/04/20/p9klxA0.png" class="icon-stle">
        </a>
      </div>
    </div>
    <!-- END -->

    <!-- 二级菜单 -->
    <div class="sub-menu hide" @mouseover="showSubMenu(-1)" @mouseout="hideSubMenu">
      <div class="inner-box" v-show="menu_item_index == index" v-for="(item, index) in menu_list" :key="index">
        <div class="sub-inner-box">
          <div class="title">{{ item.title }}</div>
          <div class="sub-row" v-for="(item1, ind) in item.children" :key="ind">
            <span class="bold">{{ item1.name }} :</span>
            <a href="" class="menu" v-for="(item2, ind2) in item1.children" :key="ind2" style="display: inline-block;" >{{ item2.name }}</a>
          </div>
        </div>
      </div>
    </div>
    <!-- END -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前鼠标移入的分类菜单下标
      menu_item_index: 0,
      menu_list: [],
    }
  },

  mounted() {

  },
  created(){
    this.getCourseMenuList();
  },
  methods: {

    // 显示对应的二级分类菜单
    showSubMenu(index) {
      if (index != -1) {
        this.menu_item_index = index;
      }
      document.querySelector('.sub-menu').classList.remove('hide');
    },

    // 隐藏二级分类菜单
    hideSubMenu() {
      document.querySelector('.sub-menu').classList.add('hide');
    },
    getCourseMenuList(){
      this.$axios.get("/back/dictionary/superMenuList?typeKey=course_category").then(response => {
 
           this.menu_list = response.data.result;
      });
    }
  }
}
</script>

<style scoped>
/* 根节点 */
.left-content {
  position: relative;
  width: 20%;
}
/* 覆盖默认a标签样式 */
a {
  text-decoration: none;
}
a:link,
a:visited {
  color: #5e5e5e;
}
/* 左侧分类菜单 */
.menu-content {
  width: 244px;
  height: 454px;
  background-color: #39364D;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 6px;
}
.menu-item {
  height: 64px;
  line-height: 66px;
  padding: 0 24px;
  cursor: pointer;
}
.menu-item:hover {
  background:#4D4A5F;
  /* .2 就是过渡的时间 */
  transition: all .2s linear;
}

.menu-item a {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 0 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  height: 64px;
  font-size: 16px;
}

.menu-item:last-child a {
  border-bottom: none;
}

.menu-item a span {
  flex: 1;
}

.menu-item a .fa {
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
}

/* 二级分类菜单 */
.sub-menu {
  border: 1px solid #d9dde1;
  background-color: #fff;
  width: calc(80vw - 244px);
  max-width: 730px;
  height: 458px;
  position: absolute;
  left: 244px;
  top: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* z-index设置为2将二级菜单置于顶层 */
  z-index: 2;
}

.hide {
  display: none;
}

.inner-box {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.sub-inner-box {
  width: 100%;
  margin-left: 40px;
  width: calc(100% - 40px);
}

.sub-inner-box .title {
  color: #00CA78;
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
  margin-top: 28px;
  margin-bottom: 30px;
}

.sub-inner-box .sub-row {
  margin-bottom: 25px;
  line-height: 25px;
}

.sub-inner-box .sub-row .bold {
  font-weight: 700;
  margin-right: 15px;
}

.sub-inner-box .sub-row a {
  margin-right: 15px;
}

.icon-stle {
  width: 17px;
  height: 17px;
}

.banner-img {
  width: 100%;
  height: 100%;
}
</style>
