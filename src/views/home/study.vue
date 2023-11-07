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
    <List :categoryId="currentMenu" :key="currentMenu" :roamMapList="roamMapList"/>
  </div>
</template>

<script setup>

import { ref } from "vue";
import List from "./study-list";
import axios from 'axios'
import {ArrowRight} from "@element-plus/icons-vue";

const menus = ref([])
const roamMapList = ref([])
const initRoadMap = () => {
 let path = `/back/roadmap/getAll`;
  axios.get(path).then(res => {
    roadMaps.value = res.data.result
    roamMapList.value = roadMaps.value[0]
  })
}
initRoadMap()

const roadMaps = ref({})
const currentMenu = ref('0')
const changeMenu = (category) => {
  currentMenu.value = category
  roamMapList.value = roadMaps.value[category]
}

const getCategoryList = async () => {
  let path = '/back/courseCategory/mainCategoryList';
  axios.get(path).then(res => {
    // 每次查出后，拼接上原来的数据
    menus.value = res.data.result.slice(0, 4);
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
