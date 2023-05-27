<template>
  <div class="paginaTion">
    <a @click="handleFirst" v-show="page !== 1">首页</a>
    <span v-show="page === 1">首页</span>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="size"
      layout="prev, pager, next"
      prev-text="上一页"
      next-text="下一页"
      :total="total"
    >
    </el-pagination>
    <a @click="handleLast" v-show="page !== totalPage">尾页</a>
    <span v-show="page === totalPage">尾页</span>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  size: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
});
const emits = defineEmits(["pageChange"]);
const totalPage = computed(() => {
  return Math.ceil(props.total / props.size);
});

const handleCurrentChange = (val) => {
  emits("pageChange", val);
};
const handleFirst = () => {
  emits("pageChange", 1);
};
const handleLast = () => {
  if (props.page !== totalPage.value) {
    emits("pageChange", totalPage.value);
  }
};
</script>

<style lang="scss" scoped>
.paginaTion {
  display: flex;
  justify-content: center;
  margin: 25px 0 auto;
  margin-bottom: 25px;

  a {
    display: inline-block;
    margin: 0 12px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #4d555d;
    text-align: center;
    border-radius: 50%;
    -webkit-transition: border-color 0.2s;
    -moz-transition: border-color 0.2s;
    transition: border-color 0.2s;
  }
}

.el-pagination {
  font-size: 14px;
}

:deep(.el-pagination) {
  font-size: 14px;

  span:not([class*="suffix"]),
  button {
    font-size: 14px;
    display: inline-block;
    min-width: 20px;
    height: 40px;
    line-height: 40px;
    vertical-align: top;
    background-color: transparent;
    box-sizing: border-box;
  }

  button:hover {
    color: #4d555d;
  }

  button:disabled {
    color: #93999f;
    background-color: transparent;
    cursor: not-allowed;
  }
}

.paginaTion span,
.page-disabled {
  display: inline-block;
  padding: 0 12px;
  min-width: 20px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #93999f;
  text-align: center;
}

:deep(.el-pager) {
  li {
    margin: 0 12px;
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #4d555d;
    text-align: center;
    border-radius: 50%;
    transition: border-color 0.2s;
    background: transparent;
    vertical-align: top;
    min-width: 20px;
    cursor: pointer;
    box-sizing: border-box;
  }

  li:hover {
    text-decoration: none;
    background-color: #d9dde1;
  }

  li.active {
    background: #4d555d;
    color: #fff;
  }
  li:focus {
    outline: none;
  }
}
</style>