<template>
  <div class="content">
    <div class="study-header">
      <ul class="menu">
        <li class="curr" data-type="推荐" data-tab="推荐">
          <a href="javascript:;">推荐</a>
        </li>
        <li class="" data-type="前端开发" data-tab="前端开发">
          <a href="javascript:;">前端开发</a>
        </li>
        <li class="" data-type="后端开发" data-tab="后端开发">
          <a href="javascript:;">后端开发</a>
        </li>
        <li class="" data-type="移动开发" data-tab="移动开发">
          <a href="javascript:;">移动开发</a>
        </li>
      </ul>
      <router-link class="more" to="/study-list"
        >全部
        <el-icon>
          <ArrowRight /> </el-icon
      ></router-link>
      <!-- <a class="more" @click="goAll">全部
                <el-icon>
                    <ArrowRight />
                </el-icon>
            </a> -->
    </div>
    <List />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import List from "./study-list";
const router = useRouter();
const goAll = () => {
  router.push("/study-list");
};
</script>

<style lang="scss" scoped>
.study-header {
  height: 36px;
  background: no-repeat left center/auto 29px;
  background-image: url("@/assets/title-bg9.png");
  padding-left: 180px;
  margin-bottom: 30px;

  display: flex;

  align-items: center;
  justify-content: space-between;

  .menu {
    display: flex;

    li {
      padding: 0 14px;
      margin: 0;
      font-size: 14px;
      line-height: 30px;
      cursor: pointer;
      color: #545c63;
      transition: all 0.2s;
      position: relative;
    }

    li > a:hover {
      color: #e02020;
    }

    li.curr {
      color: #e02020;
      font-weight: 700;
    }

    li.curr:after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      margin-left: -0.7em;
      width: 1.4em;
      height: 2px;
      border-radius: 100px;
      background-color: #e76060;
    }
  }

  .more {
    line-height: 36px;
    color: #6d7278;
    transition: all 0.2s;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
}
</style>