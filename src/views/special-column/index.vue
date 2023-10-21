<template>
  <div class="body">
    <category-com @callback="changeCategory" />
    <!-- 显示专栏列表 -->
    <div class="box-body main-content">
      <!-- 绑定每个专栏的链接 -->
      <div class="filter clearfix">
        <div class="sort l">
          <a
            :class="{ on: currentOrder.id === item.id }"
            v-for="item in order"
            :key="item"
            @click="changeOrder(item)"
            >{{ item.title }}</a
          >
        </div>
        <div class="l clearfix">
          <div class="isShow-bigCoding">
           <el-checkbox v-model="queryParams.isOnlyShow">只显示大实战课</el-checkbox>
          </div>
        </div>
        <div class="other r clearfix">
          <a
            class="course-line l"
            target="_blank"
            href="http://47.99.69.109:8080/#/study-list"
            >学习路线</a
          >
        </div>
      </div>
      <a
        v-for="item in specialItems"
        :key="item.id"
        :href="item.sourceUrl"
        target="_blank"
        class="special-box"
      >
        <div class="box-head">
          <!-- 绑定每个专栏的图片 -->
          <img :src="item.image" class="head-img" />
        </div>
        <div class="box-bottom">
          <!-- 专栏名称-->
          <div class="bottom-left">{{ item.name }}</div>
          <div class="bottom-right">所有人可见</div>
        </div>
      </a>
    </div>
    <pagination
      :page="page"
      :total="total"
      :size="size"
      @pageChange="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import categoryCom from "./compontents/special-category.vue";
import pagination from "@/components/pagination.vue";
import { getCookieValue } from "@/utils/userUtil.js";
const total = ref(0);
const page = ref(1);
const size = ref(15);
const specialItems = ref([]);
const order = [
  { id: 1, title: "默认", name: "default" },
  { id: 2, title: "最新", name: "new" },
  { id: 3, title: "销量", name: "count" },
  { id: 4, title: "升级", name: "level" },
];
const currentOrder = ref(order[0]);
const queryParams = ref({
  pageNo: page.value,
  pageSize: size.value,
  param: {
    type: 1,
    category: "",
    order: "",
    isOnlyShow: false,
  },
});
const changeOrder = (item) => {
  currentOrder.value = item;
  queryParams.value.param.order = item.name;
};
const changeCategory = (item) => {
  queryParams.value.param.category = item;
  getSpecialColumn();
};
const getSpecialColumn = () => {
  var token = getCookieValue("token");
  var headers = {
    token: token, //访问受限资源必须把token传到后端校验
  };
  axios.post("/back/course/special/search", queryParams.value, headers).then((response) => {
    specialItems.value = response.data.result.records;
    total.value = response.data.result.total;
    console.log(specialItems.value);
  });
};

const handleCurrentChange = (currentPage) => {
  page.value = currentPage;
  queryParams.value.pageNo = page.value;
  getSpecialColumn();
};

onMounted(() => {
  getSpecialColumn();
});
</script>

<style lang="scss" scoped>
/* 设置专栏列表的宽度、间距和对齐方式 */
.box-body {
  margin: 0 auto;
  // padding: 20px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.main-content {
  max-width: 1430px;
}

/* 设置专栏列表中的图片的大小 */
.head-img {
  width: 250px;
  height: 125px;
}

/* 设置专栏列表中的每个专栏的样式，包括背景颜色、高度、内边距、边框半径、对齐方式、文本颜色等 */
.special-box {
  background-color: white;
  width: 268px;
  height: 149px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 25px;
  text-decoration: none;
  color: #666666;
  box-sizing: border-box;
}
.special-box:hover {
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

/* 设置专栏列表中的每个专栏的标题区域的样式，包括背景颜色、高度、定位、溢出、动画等 */
.box-head {
  //   width: 300px;
  //   height: 500px;
  //   background: #333333;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    height: 150%;
    width: 25px;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.6;
    filter: blur(6px);
    animation: move 3s infinite ease-out;
  }
}

@keyframes move {
  0% {
    transform: translate(-200px, -200px) rotate(45deg);
  }

  100% {
    transform: translate(200px, 200px) rotate(45deg);
  }
}

.box-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

/* 设置专栏列表中的每个专栏的名称和状态的样式，包括字体大小、字体粗细等 */
.bottom-left {
  font-size: 14px;
  font-weight: bold;
}

.bottom-right {
  font-size: 14px;
}
.filter {
  margin: 20px 0 0 0;
  width: 100%;
  .sort {
    overflow: hidden;
    a {
      display: inline-block;
      float: left;
      font-size: 12px;
      color: #545c63;
      line-height: 16px;
      padding: 4px 12px;
      border-radius: 100px;
      margin-right: 12px;
    }
    a.on {
      color: #fff;
      background-color: #545c63;
    }
  }
  .isShow-bigCoding {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #e98e46;
    text-align: left;
    line-height: 24px;
    font-weight: 400;
    margin-left: 12px;
  }
  .other {
    font-size: 12px;
    .course-line {
      color: #e98e46;
      line-height: 16px;
      padding: 4px 16px;
      border-radius: 100px;
      background-color: rgba(233, 142, 70, 0.1);
      margin-left: 24px;
    }
  }
}
.l {
  float: left;
}
.r {
  float: right;
}
.el-checkbox {
    height: 16px;
}

</style>
