<template>
  <div
    class="condition-position-select"
    :class="{ open: visable, 'is-select': ids.length > 0 }"
    @mouseenter="visable = true"
    @mouseleave="visable = false"
  >
    <div class="current-select">
      <span class="placeholder-text">职业类型</span>
      <em class="select-num" v-if="ids.length > 0">({{ ids.length }})</em>
    </div>
    <div
      class="filter-select-dropdown"
      @mouseenter="visable = true"
      @mouseleave="visable = false"
    >
      <ul>
        <li @click="changeAllCheck">不限</li>
        <li
          v-for="(item, index) in data"
          :key="item.code"
          @mouseenter="showDetail(index)"
          :class="{ active: cIds[item.code] }"
        >
          {{ item.name }}
          <i class="icon-arrow"></i>
        </li>
      </ul>
      <div
        class="condition-position-detail"
        v-show="pannel"
        @mouseenter="pannel = true"
        @mouseleave="pannel = false"
      >
        <span class="condition-position-title">{{ currentItem.name }}</span>
        <div
          class="condition-position-grandson"
          v-for="cItem in currentItem.subLevelModelList"
          :key="cItem.code"
        >
          <span class="condition-position-label">{{ cItem.name }}</span>
          <div class="condition-position-list">
            <a
              @click="changeCheck(currentItem, gItem)"
              v-for="gItem in cItem.subLevelModelList"
              :key="gItem.code"
              :class="{ active: ids.includes(gItem.code) }"
            >
              {{ gItem.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import data from "../position.json";
const props = defineProps({
  clear: {
    type: Boolean,
    default: false,
  },
});
watch(
  () => props.clear,
  () => {
    ids.value = [];
    cIds.value = {};
    currentItem.value = {};
  }
);
const list = data;
const pannel = ref(false);
const visable = ref(false);
const currentItem = ref({});
const showDetail = (index) => {
  currentItem.value = data[index];
  pannel.value = true;
};
const ids = ref([]);
const cIds = ref({});
const emits = defineEmits(["changeCheck"]);
const changeCheck = (cItem, item) => {
  if (cIds.value.hasOwnProperty(cItem.code)) {
    if (ids.value.includes(item.code)) {
      cIds.value[cItem.code]--;
    } else {
      cIds.value[cItem.code]++;
    }
  } else {
    cIds.value[cItem.code] = 1;
  }
  if (ids.value.includes(item.code)) {
    ids.value.splice(ids.value.indexOf(item.code), 1);
  } else {
    ids.value.push(item.code);
  }
  emits("changeCheck", ids.value);
};
const changeAllCheck = () => {
  ids.value = [];
  cIds.value = {};
  currentItem.value = {};
  pannel.value = false;
  emits("changeCheck");
};
</script>

<style lang="scss" scoped>
.condition-position-select {
  float: left;
  margin-top: 20px;
  margin-right: 20px;
  position: relative;
  background: #f8f8f8;
  border-radius: 4px;
  overflow: hidden;
  .current-select {
    position: relative;
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    color: #222;
    line-height: 20px;
    padding: 6px 24px 6px 12px;
    cursor: pointer;
    transition: all 0.2s linear;
    .placeholder-text {
      display: inline-block;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
    }
    .select-num {
      font-style: normal;
      display: inline-block;
      margin-left: 2px;
      vertical-align: bottom;
    }
  }
  .current-select:after {
    content: " ";
    position: absolute;
    top: 12px;
    right: 12px;
    width: 4px;
    height: 7px;
    background: url(@/assets/arrow.png) -6px -16px/10px auto no-repeat;
    transform: rotate(90deg);
    z-index: 1;
  }
  .filter-select-dropdown {
    display: flex;
    position: absolute;
    width: 778px;
    top: 40px;
    left: 0;
    z-index: 4;
    border-radius: 8px;
    transition: opacity 0.2s linear;
    ul {
      width: 168px;
      padding: 4px 8px;
      max-height: 286px;
      overflow: auto;
      overflow: overlay;
      flex-shrink: 0;
      background: #fff;
      border-radius: 8px;
      border: 1px solid #ededed;
      box-sizing: border-box;
      li {
        position: relative;
        display: block;
        font-size: 14px;
        font-weight: 400;
        color: #333;
        line-height: 20px;
        padding: 8px 16px 8px 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        border-radius: 4px;
        background: #fff;
        transition: all 0.2s linear;
        .icon-arrow {
          position: absolute;
          top: 15px;
          right: 8px;
          width: 4px;
          height: 7px;
          background: url(@/assets/arrow.png) -6px -16px/10px auto no-repeat;
          z-index: 1;
        }
      }
      li:hover {
        color: #00a6a7;
        background: #f8f8f8;
        font-weight: 500;
      }
      li:hover .icon-arrow {
        background-position: -6px -8px;
      }
      li.active {
        color: #00a6a7;
        font-weight: 500;
      }
    }
    .condition-position-detail {
      width: 610px;
      padding: 4px 0;
      background: #fff;
      border: 1px solid #ededed;
      border-radius: 12px;
      overflow: auto;
      overflow: overlay;
      height: 286px;
      .condition-position-title {
        display: block;
        font-size: 16px;
        font-weight: 500;
        color: #12141a;
        line-height: 22px;
        padding: 12px 16px 4px;
      }
      .condition-position-grandson {
        padding: 12px 0 0 10px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        .condition-position-label {
          display: block;
          flex-shrink: 0;
          float: left;
          width: 122px;
          font-size: 13px;
          color: #666;
          line-height: 18px;
          padding-left: 6px;
          word-break: break-all;
          box-sizing: border-box;
        }
        .condition-position-list {
          margin-left: -10px;
          flex: 1;
          overflow: hidden;
          border-bottom: 1px solid #f0f3fa;
          a {
            float: left;
            display: block;
            margin-bottom: 12px;
            margin-left: 10px;
            margin-right: 10px;
            font-size: 13px;
            color: #222;
            line-height: 18px;
            cursor: pointer;
            transition: all 0.2s linear;
          }
        }
      }
    }
  }
}

.condition-position-select.open {
  background: #e5f8f8;
  overflow: visible;
}
.condition-position-select.open .current-select:after {
  background-position: -6px -8px;
  transform: rotate(270deg);
}
.condition-position-select.is-select .current-select {
  color: #00a6a7;
  background: #e5f8f8;
  font-weight: 500;
}
.condition-position-select
  .filter-select-dropdown
  .condition-position-detail
  .condition-position-list {
  color: #00a6a7;
}
.condition-industry-select.open .current-select {
  color: #00a6a7;
}
.condition-position-select.open:after {
  content: " ";
}
.condition-position-select:after {
  content: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 8px;
  z-index: 4;
  background: transparent;
}

.condition-position-select
  .filter-select-dropdown
  .condition-position-detail
  .condition-position-list
  a.active,
.condition-position-select
  .filter-select-dropdown
  .condition-position-detail
  .condition-position-list
  a:hover {
  color: #00a6a7;
}
</style>