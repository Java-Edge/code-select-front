<template>
  <div class="content">
    <div class="study-header">
      <ul class="menu">

        <li :class="{ curr: currentMenu === item.category }" v-for="item in menus" :key="item.category">
          <a @click="changeMenu(item.category)" href="javascript:;">{{ item.name }}</a>
        </li>

      </ul>
      <router-link class="more" to="/study-list">全部
        <el-icon>
          <ArrowRight />
        </el-icon>
      </router-link>
    </div>
    <List :categoryId="currentMenu" :key="currentMenu"/>
  </div>
</template>

<script setup>

import { ref } from "vue";
import List from "./study-list";
import axios from 'axios'
// const menus = [{ name: '推荐', category: '0' }, { name: '前端开发', category: '1' }, { name: '后端开发', category: '2' }, { name: '移动端开发', category: '3' }]
const menus = ref([])
// const menus = ref([])
const currentMenu = ref('1')
const changeMenu = (category) => {
  currentMenu.value = category
}

const getCategoryList = async () => {
  let path = '/back/courseCategory/mainCategoryList';
  axios.get(path).then(res => {
    // console.log(res)
    /**
     * 每次查出来之后，拼接上原来的数据即可
     */
    // console.log("mainCategoryList", res.data.result)
    menus.value = res.data.result.slice(0, 4);

    // console.log('menus', menus.slice(0, 4))
  })
}


getCategoryList()

</script>

<style lang="scss" scoped>
.study-header {
  height: 36px;
  background: no-repeat left center/auto 29px;
  background-image: url("@/assets/title-bg9.png");
  padding-left: 180px;
  margin-bottom: 30px;

  display: flex;

  align-items: center;
  justify-content: space-between;

  .menu {
    display: flex;

    li {
      padding: 0 14px;
      margin: 0;
      font-size: 14px;
      line-height: 30px;
      cursor: pointer;
      color: #545c63;
      transition: all 0.2s;
      position: relative;
    }

    li>a:hover {
      color: #e02020;
    }

    li.curr {
      color: #e02020;
      font-weight: 700;
    }

    li.curr:after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      margin-left: -0.7em;
      width: 1.4em;
      height: 2px;
      border-radius: 100px;
      background-color: #e76060;
    }
  }

  .more {
    line-height: 36px;
    color: #6d7278;
    transition: all 0.2s;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
}
</style>