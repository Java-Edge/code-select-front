<template>
  <el-dialog v-model="dialogVisible" width="50%" customClass="common-dialog">
    <template #title>
      <div class="dialog-header">
        <h3 class="title">请选择城市</h3>
      </div>
    </template>
    <div class="city-select-wrapper">
      <ul class="city-char-list">
        <li
          :class="{ active: active.data.id === item.id }"
          @click="changeActive(item)"
          v-for="item in chartList"
          :key="item.id"
        >
          {{ item.category.join("") }}
        </li>
      </ul>
      <ul class="city-list-hot" v-if="active.data.type === 'hot'">
        <li
          v-for="item in data.hotCityList"
          :key="item.code"
          @click="changeSelect(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <ul class="city-list-select" v-else>
        <li class="clearfix" v-for="item in active.data.category" :key="item">
          <span class="city-char">{{ item }}</span>
          <div class="list-select-list">
            <a
              @click="changeSelect(cItem)"
              v-for="cItem in data.cityGroup.find((p) => p.firstChar === item)
                .cityList"
              :key="cItem.code"
              >{{ cItem.name }}</a
            >
          </div>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script setup>
import data from "../city.json";
import { reactive, ref } from "vue";
const dialogVisible = ref(false);
const chartList = [
  { type: "hot", category: ["热门城市"], id: 1 },
  { type: "category", category: ["A", "B", "C", "D", "E"], id: 2 },
  { type: "category", category: ["F", "G", "H", "J"], id: 3 },
  { type: "category", category: ["K", "L", "M", "N"], id: 4 },
  { type: "category", category: ["P", "Q", "R", "S", "T"], id: 5 },
  { type: "category", category: ["W", "X", "Y", "Z"], id: 6 },
];
let active = reactive({ data: { type: "hot", category: ["热门城市"], id: 1 } });
const emits = defineEmits(["confirm"]);
const changeActive = (item) => {
  active.data = item;
};
const showDialog = () => {
  dialogVisible.value = true;
};
const changeSelect = (item) => {
  dialogVisible.value = false;
  emits("confirm", item);
};

defineExpose({ showDialog });
</script>

<style lang="scss">
.common-dialog {
  border-radius: 12px;
}
.dialog-header {
  font-size: 14px;
  line-height: 26px;
  h3.title {
    font-size: 16px;
    line-height: 70px;
    font-weight: 500;
    color: #414a60;
    padding-left: 30px;
  }
}
.dialog-header,
.dialog-header h3.title {
  font-weight: 400;
}
.city-select-wrapper {
  font-size: 14px;
  color: #424a5e;
  padding-bottom: 12px;
  .city-char-list {
    background: #f9fafb;
    overflow: hidden;
    width: 100%;
    height: 39px;
    display: flex;
    justify-content: space-around;
    li {
      line-height: 39px;
      cursor: pointer;
      text-align: center;
      user-select: none;
      transition: all 0.2s linear;
    }
  }
  .city-list-hot {
    padding: 20px 0;
    width: 100%;
    height: 378px;
    overflow: auto;
    overflow: overlay;
    li {
      box-sizing: border-box;
      float: left;
      line-height: 40px;
      width: 20%;
      cursor: pointer;
      text-align: center;
      margin-bottom: 8px;
      padding: 0 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: color 0.2s linear;
    }
  }
  .city-list-select {
    padding: 20px 0;
    width: 100%;
    height: 378px;
    overflow: auto;
    overflow: overlay;
    li {
      line-height: 40px;
      width: 100%;
      cursor: pointer;
      text-align: center;
      .city-char {
        width: 11.2%;
        text-align: center;
        color: #00a6a7;
        float: left;
      }
      .list-select-list {
        float: left;
        width: 88.8%;
        a {
          box-sizing: border-box;
          width: 20%;
          text-align: left;
          margin-bottom: 8px;
          float: left;
          line-height: 40px;
          cursor: pointer;
          padding-right: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        a:hover {
          color: #00a6a7;
        }
      }
    }
  }
}
.city-char-list li.active,
.city-char-list li:hover,
.city-list-hot li:hover,
.city-list-hot li:hover {
  color: #00a6a7;
}
.el-dialog__header,
.el-dialog__body {
  padding: 0px !important;
}
</style>