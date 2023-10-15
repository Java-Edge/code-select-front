<template>
  <div class="article-ranking-container">
    <div
      class="ranking-body"
      v-for="sideline in sidelineData"
      :key="sideline.id"
    >
      <!-- <div class="ranking-number">{{ ranking.orderVal }}</div> -->
      <div class="ranking-left">
        <div class="ranking-img">
          <img
            v-if="sideline.img == null || sideline.img == ''"
            src="https://pic.imgdb.cn/item/650ef2e5c458853aef26c6d2.jpg"
          />
          <img v-else :src="sideline.img" />
        </div>
      </div>
      <!-- <router-link :to="`/sidelineDetail/${sideline.id}`" class="link-sty">
                <div class="ranking-middle">
                    <div class="ranking-name hide-text">{{ sideline.title }}</div>
                    <div class="ranking-des hide-text">{{ sideline.des }}</div>
                    <div class="ranking-likes">创建时间 {{ sideline.createTime }}</div>
                </div>
            </router-link> -->
      <a
        v-if="sideline.href != null && sideline.href != ''"
        :href="sideline.href"
        target="_blank"
        class="link-sty"
      >
        <div class="ranking-middle">
          <div class="ranking-name hide-text">{{ sideline.title }}</div>
          <div class="ranking-des hide-text">{{ sideline.des }}</div>
          <div class="ranking-likes">创建时间 {{ sideline.createTime }}</div>
        </div>
      </a>
      <!-- 如果 href 为空，先设置成 div，不进行跳转，如果后期需要跳转详情页，再考虑添加 -->
      <div v-else class="link-sty">
        <div class="ranking-middle">
          <div class="ranking-name hide-text">{{ sideline.title }}</div>
          <div class="ranking-des hide-text">{{ sideline.des }}</div>
          <div class="ranking-likes">创建时间 {{ sideline.createTime }}</div>
        </div>
      </div>

      <div class="ranking-right">
        <!-- <div class="ranking-user-img"><img src="https://pic.imgdb.cn/item/64d1f0451ddac507ccb3ddbc.jpg" /></div> -->
        <!-- <div class="ranking-user-name hide-text">Java Edge</div> -->
        <!-- <a href="https://blog.csdn.net/qq_33589510" target="_blank"><div class="ranking-button">开始学习</div> </a> -->
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onActivated, onMounted, watch, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

// 数据相关
const sidelineData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(5);
const step = 5; // 每次下拉到底部，多查询的数据条数
// 获取数据
const route = useRoute();
// 获取数据的方法
const getListData = async () => {
  let path = `/back/sideline/getByPage?current=${page.value}&size=${size.value}`;
  axios.get(path).then((res) => {
    // console.log(res)
    /**
     * 每次查出来之后，拼接上原来的数据即可
     */
    console.log("新查询的数据", res.data.result);
    sidelineData.value = sidelineData.value.concat(res.data.result.records);
    total.value = res.data.result.total;
  });
};
getListData();
// 处理数据不重新加载的问题
onActivated(getListData);

/**
 * 查看按钮点击事件
 */
const router = useRouter();
/**
 * 监听路由的变化，文章的面经使用的是同一个界面，因此要监听路有变化，及时刷新数据
 */
watch(
  () => router.currentRoute.value,
  () => {
    console.log("路由变化了", router.currentRoute.value);
    let type = route.params.type;
    console.log(type);
    getListData();
  }
);

// 滚动节流
const throttle = (fun, time) => {
  let start = 0;
  return function () {
    let now = new Date();
    if (now - start > time) {
      fun();
    }
  };
};
// 触底触发函数
const listenBottomOut = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  // 这里要判断下拉到底部，并且需要查询的数量大于总数量加上每次增加的数量
  // 说明一下第二个判断：如果已经查询出的条数 page*size 已经大于总条数 total，那么就不需要再查询了
  console.log("12312", page.value, size.value, total.value);
  if (
    scrollTop + clientHeight >= scrollHeight &&
    page.value * size.value <= total.value
  ) {
    console.log("触底了~");
    // 此处可以调用获取数据的方法
    // size.value = size.value + step
    page.value = page.value + 1;
    console.log(page.value, size.value);
    getListData();
    // if (size.value > total.value) size.value = total.value
  }
};
// 下拉加载数据
onMounted(() => {
  // 事件监听
  window.addEventListener("scroll", throttle(listenBottomOut, 1000));
});
onUnmounted(() => {
  // 离开页面取消监听
  window.removeEventListener("scroll", throttle(listenBottomOut, 1000), false);
});
</script>
  
<style lang="scss" scoped>
.article-ranking-container {
  min-height: 800px;
  max-width: 1152px;
  margin: 0 auto;

  .header {
    margin-bottom: 20px;

    .dynamic-box {
      display: flex;
      align-items: center;

      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
.link-sty {
  text-decoration: none;
  color: black;
  display: block;
  width: 830px;
}
// 带阴影
.ranking-body {
  height: 77px;
  // width: 776px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 10px;
  box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
  background-color: white;
  border-radius: 15px;
  padding: 20px;
}

.ranking-left {
  // background-color: yellow;
  margin: 0 auto;
}

.ranking-middle {
  // background-color: blue;
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  margin-left: 15px;
  justify-content: space-between;
}

.ranking-name {
  font-size: 16px;
  font-weight: 600;
}
.ranking-img img {
  width: 107px;
  height: 60px;
  border-radius: 5px;
  // max-width: none;
  // max-height: none;
  // border-radius: 50%;
  // margin: 0 auto;
}
.ranking-des {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #777888;
}
.ranking-likes {
  font-size: 14px;
  color: #777888;
}
.ranking-right {
  // background-color: green;
  flex-grow: 1;
  // width: 300px;
  display: flex;
  align-items: center;
}
.ranking-right a {
  text-decoration: none;
}
.ranking-user-img img {
  width: 37px;
  height: 37px;
  border-radius: 50%;
}
.ranking-user-name {
  margin-left: 5px;
  margin-right: 5px;
  font-size: 14px;
}

.ranking-button {
  width: 65px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: #f8f8f8; /* Google蓝色 */
  color: black;
  border-radius: 13px; /* 圆角 */
  font-size: 14px;
  // padding: 10px 20px; /* 上下边距，左右边距 */
  cursor: pointer;
  border: 1px solid #ccccd8; // 先添加上 border，防止添加border抖动
}

/* 按钮悬停样式 */
.ranking-button:hover {
  border: 1px solid black;
}

/* 按钮点击样式 */
.ranking-button:active {
  background-color: #f8f8f8; /* Google更深的蓝色 */
}

// 隐藏多余文字样式
.hide-text {
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; //需要显示的行数
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
  