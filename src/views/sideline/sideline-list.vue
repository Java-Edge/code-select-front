<template>
  <div class="article-ranking-container">
    <div
      class="ranking-body"
      v-for="sideline in sidelineData"
      :key="sideline.id"
    >
      <div class="ranking-left">
        <div class="ranking-img">
          <img
            v-if="sideline.img == null || sideline.img === ''"
            src="https://pic.imgdb.cn/item/650ef2e5c458853aef26c6d2.jpg"
          />
          <img v-else :src="sideline.img" />
        </div>
      </div>
      <a
        v-if="sideline.href != null && sideline.href !== ''"
        :href="sideline.href"
        target="_blank"
        class="link-sty"
        @click="clickSideline(sideline.id)"
      >
        <div class="ranking-middle">
          <div class="ranking-name hide-text">{{ sideline.title }}</div>
          <div class="ranking-des hide-text">{{ sideline.des }}</div>
          <div class="ranking-likes">发布时间 {{ sideline.createTime }}</div>
          <div class="ranking-likes">浏览量 {{ sideline.pageView }}</div>
        </div>
      </a>
      <!-- 如果 href 为空，先设置成 div，不进行跳转，如果后期需要跳转详情页，再考虑添加 -->
      <div v-else class="link-sty">
        <div class="ranking-middle">
          <div class="ranking-name hide-text">{{ sideline.title }}</div>
          <div class="ranking-des hide-text">{{ sideline.des }}</div>
          <div class="ranking-likes">创建时间 {{ sideline.createTime }}</div>
          <div class="ranking-likes">浏览量 {{ sideline.pageView }}</div>
        </div>
      </div>

      <!-- <div class="ranking-right">
        <div class="ranking-user-img">
          <img src="https://p.ipic.vip/n6m1kg.jpg"/>
        </div>
        <div class="ranking-user-name hide-text">JavaEdge</div>
        <a href="https://blog.csdn.net/qq_33589510" target="_blank">
          <div class="ranking-button">关注</div>
        </a>
      </div> -->
    </div>
    <pagination :page="page" :total="total" :size="size" @pageChange="handleCurrentChange" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import pagination from "@/components/pagination.vue";
import axios from 'axios';
import {getCookieValue} from "@/utils/userUtil";

const queryParams = ref({
  param: {
    type: 1,
    category: "",
    order: "",
    isOnlyShow: false,
    itemId: ""
  },
});
const sidelineData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(7);


const route = useRoute();


const getListData = async () => {
  let path = `/back/sideline/getByPage?current=${page.value}&size=${size.value}`;
  axios.get(path).then(res => {
    sidelineData.value = res.data.result.records
    total.value = res.data.result.total
  })
}
getListData()
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
    let type = route.params.type;
    getListData();
  }
);
const handleCurrentChange = (currentPage) => {
  page.value = currentPage;
  getListData();
};

let clickSideline  = (itemId) => {
  const token = getCookieValue("token");
  const headers = {
    token: token, //访问受限资源必须把token传到后端校验
  };
  queryParams.value.param.itemId = itemId;
  axios.post("/back/sideline/pv", queryParams.value, headers);
};
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
  height: 67px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 10px;
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
  background-color: #f8f8f8;
  color: black;
  border-radius: 13px;
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
  background-color: #f8f8f8;
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
