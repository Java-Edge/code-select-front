<template>
  <div class="top-wrap">
    <div class="shizhan-header">
      <div class="shizhan-header-wrap w1430 main-content">
        <div class="banner">
          <!-- <a class="title" href="/">
            <img
              class="h100"
              src="/static/module/index/img/v2/shizhan-title.png?v=1"
              alt=""
            />
          </a>
          <div id="codingIndexBanner" style="display: block">
            <img
              src="/static/module/index/img/header-icon2.png?v=5"
              style="cursor: default"
            />
          </div> -->
        </div>
        <div id="szHeaderSearch" class="shizhan-header-search">
          <div class="search-inner clearfix">
            <input
              class="shizhan-search-input l"
              placeholder="搜索感兴趣的实战课程内容"
              type="text"
              autocomplete="off"
              data-suggest-trigger="true"
            />
            <el-icon class="shizhan-search-button imv2-search2 l">
              <Search/>
            </el-icon>
          </div>
          <div class="js-sz-searchtags shizhan-searchtags"></div>
          <input type="hidden" data-suggest-history="true" />
          <ul class="shizhan-search-result" data-suggest-result="true"></ul>

          <div class="search-hot clearfix">
            <span>热搜：</span>
            <a
              target="_blank"
              href="//www.imooc.com/search/?words=ChatGPT&amp;type=course"
              >ChatGPT</a
            >
            <a
              target="_blank"
              href="//www.imooc.com/search/?words=Vue&amp;type=course"
              >Vue</a
            >
            <a
              target="_blank"
              href="//www.imooc.com/search/?words=Java&amp;type=course"
              >Java</a
            >
            <a
              target="_blank"
              href="//www.imooc.com/search/?words=嵌入式&amp;type=course"
              >嵌入式</a
            >
            <a
              target="_blank"
              href="//www.imooc.com/search/?words=Python&amp;type=course"
              >Python</a
            >
            <a
              target="_blank"
              href="//www.imooc.com/search/?words=SpringBoot&amp;type=course"
              >SpringBoot</a
            >
            <a
              target="_blank"
              href="//www.imooc.com/search/?words=C/C++&amp;type=course"
              >C/C++</a
            >
            <a
              target="_blank"
              href="//www.imooc.com/search/?words=算法&amp;type=course"
              >算法</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 神针20200201让干掉 -->
    <!-- <div class="class-course-wrap">
        <div class="class-wrap w1430">
            <div class="swiper-container">
                <ul class="swiper-wrapper" style="list-style: none;">
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/fearchitect?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/fearchitect.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/fe2020?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/fe2020.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/java2020?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/java2020.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/python2020?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/python2020.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/javaalmighty?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/javaalmighty.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/javaarchitect?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/javaarchitect.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/go?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/go.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/webfullstack?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/webfullstack.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/javafullstack?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/javafullstack.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/bigdata?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/bigdata.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/datastructure?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/datastructure.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/dataanalysis?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/dataanalysis.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/mobilearchitect?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/mobilearchitect.png?t=1" alt="">
                        </a>
                    </li>
                                    <li class="swiper-slide" style="width: 211px; margin-right: 24px;">
                        <i class="class-flag"></i>
                        <a class="inner" href="https://class.imooc.com/sale/newandroid?utm_source=codinglist" target="_blank">
                            <img class="lazy" src="/static/module/index/img/classcourse/newandroid.png?t=1" alt="">
                        </a>
                    </li>
                                </ul>
            </div>
            <div class="swiper-btn next"></div>
            <div class="swiper-btn prev"></div>
        </div>
    </div> -->
    <div class="type">
      <div class="type-wrap main-content">
        <div
          class="one warp js-direction"
          style="
            box-shadow: rgba(95, 101, 105, 0) 0px 12px 20px 0px;
            height: 54px;
            background: transparent;
          "
        >
          <span class="name">方向：</span>
          <ul class="items clearfix">
            <li
              :class="{ cur: currentDirection === 0 }"
              @click="changeDirection()"
            >
              <a>全部</a>
            </li>
            <li
              :class="{ cur: currentDirection === item.id }"
              data-ct="fe"
              v-for="item in direaction"
              :key="item.id"
              @click="changeDirection(item)"
            >
              <a>{{ item.name }}</a>
            </li>
          </ul>
        </div>
        <div
          class="two warp js-sort"
          @mouseenter="visable = true"
          @mouseleave="visable = false"
          :style="{
            'box-shadow': `rgba(95, 101, 105, ${visable&&currentDirection===0}?0.1:0) 0px 12px 20px 0px`,
            height: visable&&currentDirection===0 ? '274px' : '50px',
            background: visable&&currentDirection===0 ? '#fff' : 'transparent',
          }"
        >
          <span class="name">分类：</span>
          <ul class="items clearfix">
            <li :class="{cur:currentCategory===currentDirection}"  @click="changeCategory()">
              <a>不限</a>
            </li>
            <li  @click="changeCategory(item)" :class="{ cur: currentCategory === item.id }" v-for="item in children" :key="item.id">
              <a>{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref,defineEmits } from "vue";
import {getMenuList } from "@/api/common";
const visable = ref(false);
const direaction = ref([]);
const allChildren = ref([]);
const children = ref([]);
const currentDirection = ref(0);
const currentCategory = ref(0);
const emits=defineEmits(['callback'])
//注释 接口调用使用 currentCategory作为参数。
const changeDirection = (item) => {
  currentDirection.value = item ? item.id : 0;
  if (item) {
    children.value = item.children;
  } else {
    children.value = allChildren.value;
  }
  currentCategory.value=currentDirection.value
  emits('callback',currentCategory.value)
};
const changeCategory = (item) => {
  currentCategory.value = item ? item.id : currentDirection.value.id;
  emits('callback',currentCategory.value)
};


const getMenus = () => {
  getMenuList("special_category").then((response) => {
    direaction.value = response.data.result;
    allChildren.value = Array.from(
      new Set(
        direaction.value
          .map((item) => item.children)
          .map((c) => c)
          .flat()
      )
    );
    children.value = allChildren.value;
  });
};

onMounted(() => {
  getMenus();
});
</script>

<style lang="scss" scoped>
.top-wrap {
  background-color: #f5f7fa;
  background-image: url(//www.imooc.com/static/images/top_bg.png?v=1);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  font-size: 14px;
}
.main-content {
  max-width: 1430px;
}
.shizhan-header .shizhan-header-wrap {
  height: 100%;

  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  padding-top: 8px;
  .banner {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    .title {
      height: 46px;
      margin-right: 8px;
    }
  }
  .banner #codingIndexBanner {
    height: 46px;
    line-height: 46px;
    min-width: 48px;
    max-width: 360px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    z-index: 899;
    display: none;
    margin-top: 0;
    img {
      height: 12px;
      vertical-align: text-bottom;
    }
  }
  .shizhan-header-search {
    position: relative;
    width: 320px;
    .search-inner {
      width: 100%;
      border-radius: 4px;
      overflow: hidden;
      margin: 17px 0 7px;
      border: 1px solid rgba(84, 92, 99, 0.2);
      .shizhan-search-input {
        width: 275px;
        font-size: 12px;
        color: #93999f;
        line-height: 24px;
        padding: 5px 12px;
        border: none;
        border-radius: 0;
        box-sizing: border-box;
        background: 0 0;
      }
      .shizhan-search-button {
        width: 34px;
        height: 34px;
        font-size: 18px;
        text-align: center;
        line-height: 34px;
        color: #fff;
        background: #545c63;
        cursor: pointer;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        float: right;
      }
    }
    .search-hot {
      height: 21px;
      overflow: hidden;
      padding-left: 14px;
      span {
        color: rgba(84, 92, 99, 0.7);
        font-size: 12px;
        line-height: 16px;
      }
      a {
        margin-right: 14px;
      }
    }
  }
}
.type {
  padding-bottom: 27px;
  .type-wrap {
    position: relative;
    height: 109px;
    .warp {
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      position: absolute;
      width: 1430px;
      height: 54px;
      overflow: hidden;
      padding: 10px;
      box-sizing: border-box;
      box-shadow: 0 12px 20px 0 rgba(95, 101, 105, 0);
      border-radius: 8px;
      transition: all 0.2s;
      .name {
        width: 3.5em;
        color: #07111b;
        line-height: 32px;
        font-weight: 700;
        margin-right: 6px;
      }
      .items {
        width: 0;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        li {
          float: left;
          line-height: 16px;
          padding: 8px;
          border-radius: 6px;
          margin: 0 12px 12px 0;
          a {
            color: #1c1f21;
          }
        }
        li.cur {
          background-color: rgba(233, 142, 70, 0.1);
        }
        li.cur a {
          color: #e98e46;
        }
      }
    }
    .warp.one {
      margin-bottom: 25px;
      z-index: 3;
    }
    .warp.two {
      top: 59px;
      z-index: 2;
    }
  }
}
.shizhan-header .shizhan-header-wrap .shizhan-header-search .search-hot a,
.shizhan-header .shizhan-header-wrap .shizhan-header-search .search-hot span {
  color: rgba(84, 92, 99, 0.7);
  font-size: 12px;
  line-height: 16px;
}
</style>