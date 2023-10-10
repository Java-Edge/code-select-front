<template>
  <div
    class="condition-filter-select"
    :class="{ open: visable, 'is-select': count }"
    @mouseenter="changeVisable(true)"
    @mouseleave="changeFatherVisable(false)"
  >
    <div class="current-select">
      <span class="placeholder-text">{{ name }}</span>
      <em class="select-num" v-if="count">({{ count }})</em>
    </div>
    <div
      class="filter-select-dropdown"
      @mouseenter="changeVisable(true, 'child')"
      @mouseleave="changeVisable(false)"
      v-show="visable"
    >
      <ul>
        <li @click="cancelCheck">不限</li>
        <li
          v-for="item in list"
          :key="item.id"
          @click="changeCheck(item)"
          :class="{ active: ids.includes(item.id) }"
        >
          {{ item.name }}
          <el-icon v-if="ids.includes(item.id)"><Check /></el-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
  name: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});
const count = computed(() => {
  return props.list.filter((item) => item.active).length;
});
const ids = computed(() => {
  return props.list.filter((item) => item.active).map((item) => item.id);
});
const jobTypeCount = ref(1);
const visable = ref(false);
const isChild = ref(false);
const changeVisable = (val, child) => {
  visable.value = val;
  isChild.value = child && val;
};
const changeFatherVisable = () => {
  setTimeout(() => {
    if (!isChild.value) {
      visable.value = false;
    }
  }, 50);
};
const emits = defineEmits(["changeCheck", "cancelCheck"]);
const cancelCheck = () => {
  emits("changeCheck");
};
const changeCheck = (item) => {
  if (props.multiple) {
    emits("changeCheck", item.id);
  } else {
    emits("changeCheck");
    emits("changeCheck", item.id);
    visable.value = false;
    isChild.value = false;
  }
};
</script>

<style lang="scss" scoped>
.condition-filter-select,
.condition-industry-select,
.condition-position-cascade,
.condition-position-select {
  float: left;
  margin-top: 20px;
  margin-right: 20px;
}
.condition-filter-select {
  display: inline-block;
  position: relative;
  background: #f8f8f8;
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
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
    content: "";
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
    position: absolute;
    top: 40px;
    left: 0;
    width: 168px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #ededed;
    z-index: 4;
    transition: opacity 0.2s linear;
    ul {
      padding: 4px 8px;
      li {
        position: relative;
        display: block;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 400;
        color: #333;
        line-height: 20px;
        padding: 8px 24px 8px 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        transition: all 0.2s linear;
        .el-icon {
          position: absolute;
          font-weight: 700;
          font-size: 12px;
          top: 12px;
          right: 8px;
          z-index: 1;
          color: #00a6a7;
        }
      }

      li.active {
        color: #00a6a7;
        font-weight: 500;
      }
      li:hover {
        color: #00a6a7;
        font-weight: 500;
        background: #f8f8f8;
      }
    }
  }
}
.condition-filter-select.open {
  background: #e5f8f8;
  overflow: visible;
}
.condition-filter-select.open .current-select {
  color: #00a6a7;
}
.condition-filter-select.open .current-select:after {
  background-position: -6px -8px;
  transform: rotate(270deg);
}
.condition-filter-select.is-select .current-select:after {
  background: url(@/assets/arrow.png) -6px -8px/10px auto no-repeat;
}
.condition-filter-select.is-select .current-select {
  color: #00a6a7;
  background: #e5f8f8;
  font-weight: 500;
}
</style>