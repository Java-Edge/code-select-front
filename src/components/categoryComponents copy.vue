<template>
  <div class="view-box main-content">
    <div class="head-line">{{ title }}</div>
    <div class="item-list">
      <div v-for="(item, index) in list" :key="index">
        <div class="item-class">
          <a :href="item.link" style="text-decoration:none;"
             @click="clickPilot(item.id)"
          >
            <img :src="item.img"/>
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, ref} from 'vue';
import {getCookieValue} from "@/utils/userUtil";
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

let clickPilot  = (itemId) => {
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
  background: #fff;
}
.head-line {
  margin: 15px 20px;
}
.item-list {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 20px;
}
.item-class {
  width: 150px;
  margin: 15px 15px;
}
.item-class img {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  vertical-align: center;
  object-fit: contain;
}
</style>
