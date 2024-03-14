<template>
  <div class="view-box main-content">
    <div class="head-line">{{ title }}</div>
    <div class="item-list">
      <div v-for="(item, index) in list" :key="index">
        <div class="item-class">
          <a :href="item.link" style="text-decoration:none;" @click="clickPilot(item.id)">
            <img :src="item.img || 'https://www.svgrepo.com/show/277424/tool-screwdriver.svg'" />
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { getCookieValue } from "@/utils/userUtil";
import axios from "axios";

const queryParams = ref({
  param: {
    type: 1,
    category: "",
    order: "",
    isOnlyShow: false,
    itemId: ""
  },
});

const props = defineProps({
  title: String,
  list: {
    type: Array,
    default: () => []
  }
});

let clickPilot = (itemId) => {
  const token = getCookieValue("token");
  const headers = {
    token: token, //访问受限资源必须把token传到后端校验
  };
  queryParams.value.param.itemId = itemId;
  axios.post("/back/pilot/pv", queryParams.value, headers);
};
</script>

<style>
.view-box {
  width: 80%;
  margin-bottom: 14px;
  border-radius: 4px;
}

.head-line {
  margin: 15px 20px;
}

.item-list {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 20px;
}

/* .item-class {
  width: 150px;
  margin: 15px 15px;
} */

.item-class {
  position: relative;
  width: 150px;
  /* 保持原有的宽度设置 */
  padding: 9px;
  background-color: #f5f7fd;
  margin: 15px;
  overflow: hidden;
  min-height: 42px;
  /* 需要一致的高度和宽度 */
  border-radius: 5px;
  background-image: linear-gradient(0deg, #fff, #f3f5f8);
  border: 1px solid #fff;
  box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, .1);
  /* 调整为flex布局以适应内容对齐 */
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
}

/* .item-class img {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  vertical-align: center;
  object-fit: contain;
} */

.item-class img {
  width: 20px;
  /* 调整大小以适配新样式 */
  height: 20px;
  margin-right: 6px;
  /* 如果需要的话，可以调整或去掉这个属性 */
  vertical-align: middle;
  /* 调整对齐方式为middle */
  object-fit: contain;
}

.item-class span {
  text-align: left;
  color: #7c7a7a;
  font-size: 11px;
  text-indent: 5px;
  margin-top: 5px;
}

.item-class:hover {
  cursor: pointer;
  background-color: #dce3f8;
}


.web-page-module-link-card {
  position: relative;
  padding: 9px;
  background-color: #f5f7fd;
  float: left;
  margin-right: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  min-height: 42px;
  border-radius: 5px;
  background-image: linear-gradient(0deg, #fff, #f3f5f8);
  border: 1px solid #fff;
  box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, .1)
}

.web-page-module-link-card:hover {
  cursor: pointer;
  background-color: #dce3f8
}

.web-page-module-link-card-icon {
  position: relative;
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 999px
}


.web-page-module-link-team-card-icon {
  position: relative;
  float: left;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  border: 1px solid white;
  padding: 2px;
  box-shadow: 0px 0px 3px #bcbbbb
}

.web-page-module-link-card-title,
.web-page-module-link-card-desc {
  text-align: left;
  width: 180px;
  font-weight: 400;
  text-indent: 5px
}

.web-page-module-link-card-desc {
  font-size: 11px;
  color: #7c7a7a;
  text-indent: 0px;
  margin-top: 5px
}

.web-page-module {
  position: relative;
  margin-bottom: 15px;
  width: 100%;
  min-height: 10px;
  height: auto;
  padding: 20px 15px;
  background-color: white;
  font-size: 14px;
  border-radius: 8px;
  background-image: linear-gradient(0deg, #fff, #f3f5f8);
  border: 2px solid #fff;
  box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, .1)
}
</style>