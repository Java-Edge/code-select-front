<template>
  <div style="background-color: #f9f3e8;overflow: hidden;">
    <div class="article-ranking-container main-content">

<div class="ranking-body" v-for="article in articleData" :key="article.articleId">
        <!-- <div class="ranking-number">{{ ranking.orderVal }}</div> -->
        <div class="ranking-left">
          <div class="ranking-img">
            <img
              v-if="article.img == null || article.img == ''"
              src="https://pic.imgdb.cn/item/64ed5c50661c6c8e54033681.jpg"
            />
            <img v-else :src="article.img" />
          </div>
        </div>

        <a
          v-if="article.href != null && article.href != ''"
          :href="article.href"
          target="_blank"
          class="link-sty"
        >
          <div class="ranking-middle">
            <div class="ranking-name hide-text">{{ article.title }}</div>
            <div class="ranking-des hide-text">
              {{
                article.content != null && article.content != ""
                  ? article.content.replace(/<\/?.+?\/?>|\r|\n|\s*/g, "")
                  : ""
              }}
            </div>
            <div class="ranking-likes">浏览量 {{ article.pageView }}</div>
          </div>
        </a>
        <router-link
          v-else
          :to="`/article/${article.articleId}`"
          class="link-sty"
        >
          <div class="ranking-middle">
            <div class="ranking-name hide-text">{{ article.title }}</div>
            <div class="ranking-des hide-text">
              {{
                article.content != null && article.content != ""
                  ? article.content.replace(/<\/?.+?\/?>|\r|\n|\s*/g, "")
                  : ""
              }}
            </div>
            <div class="ranking-likes">浏览量 {{ article.pageView }}</div>
          </div>
        </router-link>

        <div class="ranking-right">
          <div class="ranking-user-img">
            <img src="https://pic.imgdb.cn/item/64d1f0451ddac507ccb3ddbc.jpg" />
          </div>
          <div class="ranking-user-name hide-text">Java Edge</div>
          <a href="https://blog.csdn.net/qq_33589510" target="_blank"
            ><div class="ranking-button">关注</div>
          </a>
        </div>
      </div>
      <pagination
        :page="page"
        :total="total"
        :size="size"
        @pageChange="handleCurrentChange"
      />
    </div>
  </div>

</template>

<script setup>
import { ref} from "vue";
import pagination from "@/components/pagination.vue";
import axios from "axios";

// 数据相关
const articleData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(5);
// 获取数据的方法
const getListData = async () => {
  let path = `/back/article/getByPage?current=${page.value}&size=${size.value}`;
  axios.get(path).then((res) => {
    articleData.value = res.data.result.records;
    total.value = res.data.result.total;
  });
};
getListData();
const handleCurrentChange = (currentPage) => {
  page.value = currentPage;
  getListData();
};
</script>

<style lang="scss" scoped>
.article-ranking-container {
  min-height: 800px;
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
  width: 810px;
}
// 带阴影
.ranking-body {
    height: 97px;
    // width: 976px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 25px;
    padding-top: 15px;
    padding-bottom: 15px;
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
  height: 100%;
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
