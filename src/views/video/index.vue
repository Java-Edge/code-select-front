<template>
  <div class="body">
    <!-- 使用自定义的分类组件 -->
    <category-com @callback="changeCategory" />
    <div class="box-body main-content">
      <!-- 过滤和排序 -->
      <div class="filter clearfix">
        <div class="sort l">
          <a
            :class="{ on: currentOrder.id === item.id }"
            v-for="item in order"
            :key="item"
            @click="changeOrder(item)"
          >
            {{ item.title }}
          </a>
        </div>
        <div class="other r clearfix">
          <a class="course-line l" target="_blank" href="http://www.javaedge.cn/#/study-list">
            学习路线
          </a>
        </div>
      </div>

      <!-- 专栏列表 -->
      <a
        v-for="item in specialItems"
        :key="item.id"
        :href="item.sourceUrl"
        target="_blank"
        class="special-box"
        @click="countPv(item.id)"
      >
        <div class="box-head">
          <!-- 专栏图片 -->
          <img :src="item.image" class="head-img" />
        </div>
        <div class="box-bottom">
          <div class="bottom-left">{{ item.name }}</div>
          <div class="bottom-right">学习人数 {{ item.pageView }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from "vue";
import categoryCom from "/src/components/special-category.vue";
import { getCookieValue } from "@/utils/userUtil.js";
import axios from "axios";

const total = ref(0);
const page = ref(1);
const size = ref(100);
const specialItems = ref([]);

// 排序选项
const order = [
  { id: 1, title: "默认", name: "default" },
  { id: 2, title: "最新", name: "new" },
  { id: 3, title: "学习人数", name: "count" },
];
const currentOrder = ref(order[0]);

// 查询参数
const queryParams = ref({
  pageNo: page.value,
  pageSize: size.value,
  param: {
    type: 0,
    category: "",
    order: "",
    isOnlyShow: false,
    itemId: "",
  },
});

// 切换排序方式
const changeOrder = (item) => {
  currentOrder.value = item;
  queryParams.value.param.order = item.name;
};

let countPv = (itemId) => {
  const token = getCookieValue("token");
  const headers = {
    token: token, // 访问受限资源必须把token传到后端校验
  };
  queryParams.value.param.itemId = itemId;
  axios.post("/back/video/pv", queryParams.value, headers);
};

// 切换分类
const changeCategory = (item) => {
  queryParams.value.param.category = item;
  getSpecialColumn((records) => {
    specialItems.value = records;
  });
};

// 获取专栏列表
const getSpecialColumn = async (callback) => {
  const token = getCookieValue("token");
  const headers = {
    token: token, // 访问受限资源必须把token传到后端校验
  };
  axios
    .post("/back/course//special/search", queryParams.value, headers)
    .then((response) => {
      total.value = response.data.result.total;
      callback(response.data.result.records);
    });
};

// 页面加载时获取专栏列表
onMounted(() => {
  getSpecialColumn((records) => {
    specialItems.value = records;
  });
});

// 处理数据不重新加载的问题
onActivated(getSpecialColumn);
</script>

<style lang="scss" scoped>
/* 设置专栏列表的宽度、间距和对齐方式 */
.box-body {
  margin: 0 auto;
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
  width: 250px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin-left: 28px;
  margin-top: 25px;
  text-decoration: none;
  color: #666666;
}
.special-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px 0 rgba(95,101,105,.1);
}

/* 设置专栏列表中的每个专栏的标题区域的样式，包括背景颜色、高度、定位、溢出、动画等 */
.box-head {
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
  margin: 10px 0px;
  padding:0 10px;
  // padding:10px;

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