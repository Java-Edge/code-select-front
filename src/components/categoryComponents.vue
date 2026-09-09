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

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import axios from "@/axios";

export interface PilotItem {
  id: string | number
  name: string
  link: string
  img?: string
}

interface PilotParam {
  type: number
  category: string
  order: string
  isOnlyShow: boolean
  itemId: string | number
}

const queryParams = ref<{ param: PilotParam }>({
  param: {
    type: 1,
    category: "",
    order: "",
    isOnlyShow: false,
    itemId: ""
  },
});

withDefaults(
  defineProps<{
    title?: string
    list?: PilotItem[]
  }>(),
  {
    title: '',
    list: () => []
  }
)

let clickPilot = (itemId: string | number): void => {
  queryParams.value.param.itemId = itemId
  axios.post("/back/pilot/pv", queryParams.value)
}
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding: 0 20px;
  margin-bottom: 20px;
}

.item-class {
  position: relative;
  width: auto;
  padding: 12px;
  background-color: #f5f7fd;
  margin: 0;
  overflow: hidden;
  min-height: 42px;
  border-radius: 5px;
  background-image: linear-gradient(0deg, #fff, #f3f5f8);
  border: 1px solid #fff;
  box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, .1);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.item-class img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
  object-fit: contain;
}

.item-class span {
  flex: 1;
  text-align: left;
  color: #333;
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-class:hover {
  cursor: pointer;
  background-color: #dce3f8;
}



</style>