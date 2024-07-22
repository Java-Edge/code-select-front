<template>
  <div class="body">
    <div class="subnav">
      <div class="main-content">
        <router-link to="/study-list" target="_self">
          <img src="@/assets/study-route.png" class="logo" />
        </router-link>
        <div class="tabnav">
          <a @click="getList(item.category)" :class="{ on: currentMenu === item.category }" v-for="item in menus"
            :key="item.category">{{ item.name }}</a>
        </div>
      </div>
    </div>
    <div class="main-content mainbox">
      <div class="listview">
        <router-link :to="`/study-detail/${item.id}`" target="_blank" class="box js-click-zhuge" v-for="item in list"
          :key="item.id">
          <div class="imgcontainer">
            <div class="img-up" :style="{ backgroundImage: `url(${item.img})` }"></div>
            <div class="img-mid" :style="{ backgroundImage: `url(${item.img})` }"></div>
            <div class="img-down" :style="{ backgroundImage: `url(${item.img})` }"></div>
          </div>
          <div class="courseitem">
            <h2>{{ item.name }}</h2>
            <p>
              {{ item.description }}
            </p>
            <div class="pathinfo">
              <span>{{ item.step }}步骤</span>
              <i>·</i>
              <span>{{ item.course }}门课</span>
              <span class="collectnum"><el-icon class="sz-star">
                  <StarFilled />
                </el-icon>{{ item.collect }}人收藏</span>
            </div>
          </div>
        </router-link>
      </div>

    </div>
    <!-- <div class="paginaTion">
      <a @click="handleFirst" v-show="page !== 1">首页</a>
      <span v-show="page === 1">首页</span>
      <el-pagination @current-change="handleCurrentChange" :current-page="page" :page-size="size"
        layout="prev, pager, next" prev-text="上一页" next-text="下一页" :total="total">
      </el-pagination>
      <a @click="handleLast" v-show="page !== totalPage">尾页</a>
      <span v-show="page === totalPage">尾页</span>
    </div> -->
    <pagination :page="page" :total="total" @pageChange="handlePageChange"/>
  </div>
</template>

<script setup>
import pagination from "@/components/pagination.vue";
import { onMounted, ref } from "vue";
import axios from 'axios'

const menus = ref([])
const currentMenu = ref("0");

/**
 *
 *     data: {
      img: new URL("../../assets/demo/study1.jpg", import.meta.url).href,
      title: "Vue.js 从入门到精通",
      desc: "路线专为想学Vue却无从下手的人群设计，以实际项目为例，逐层深入，学透Vue。",
      buzhou: 4,
      courses: 6,
      collect: 20191,
    },
 */
const getRoadMap = async (categoryId) => {
  let path = `/back/roadmap/route?categoryId=${categoryId}&current=${page.value}&size=${size.value}`;
  axios.get(path).then(res => {
    /**
     * 每次查出来后，拼上原来数据
     */
    list.value = res.data.result.records
    total.value = res.data.result.total

  })
}

const list = ref([]);
const handleSelected = () => {
  list.value = [];
  getRoadMap(currentMenu.value)
  // for (let i = 0; i < 10; i++) {
  //   const selected = allData.find(
  //     (item) => item.category === currentMenu.value
  //   );
  //   list.value.push({ ...selected.data, id: currentMenu.value + i });
  // }
};

const getList = (category) => {
  currentMenu.value = category;
  handleSelected()
};
const page = ref(1)
const size = ref(12)
const total = ref(100)
const handlePageChange=val=>{
  page.value=val
}
onMounted(() => {
  handleSelected();
});


const getCategoryList = async () => {
  let path = '/back/courseCategory/mainCategoryList';
  axios.get(path).then(res => {
    /**
     * 每次查出来之后，拼上原来数据
     */
    menus.value = res.data.result;
  })
}


getCategoryList()





</script>

<style lang="scss" scoped>
.subnav {
  width: 100%;
  height: 143px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(28, 31, 33, 0.06);

  //   .main-content{
  //     max-width: 1152px;
  //     margin: 0 auto;
  //   }
  .logo {
    width: 420px;
    height: 60px;
    padding: 5px 0;
    display: block;
  }

  .tabnav {
    border-top: 1px solid rgba(28, 31, 33, 0.2);
    display: flex;
    flex-direction: row;
    font-size: 16px;
    color: #545c63;
    font-weight: 700;
    height: 40px;
    line-height: 40px;
    padding-top: 16px;

    a {
      margin-right: 28px;
      position: relative;
      color: #545c63;
    }

    a.on {
      color: #f20d0d;
    }

    a.on::after {
      content: "";
      position: absolute;
      left: 50%;
      margin-left: -8px;
      bottom: 0;
      width: 16px;
      height: 3px;
      color: #f20d0d;
      background: #f20d0d;
    }
  }
}

.mainbox {
  min-height: 750px;
  margin-top: 32px;
  background: #fff;
  padding: 24px;
  position: relative;
  box-sizing: border-box;

  .listview {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .box {
      margin-bottom: 16px;
      height: 155px;
      display: flex;
      flex-direction: row;
      margin-left: 24px;

      .imgcontainer {
        width: 140px;
        height: 140px;
        position: relative;
        border-radius: 8px;
        transition: 0.3s all linear;

        .img-up {
          left: 0;
          top: 0;
          width: 140px;
          height: 140px;
          z-index: 3;
        }

        .img-mid {
          left: 4px;
          top: 11px;
          width: 133px;
          height: 133px;
          opacity: 0.5;
          z-index: 2;
        }

        .img-down {
          left: 8px;
          top: 22px;
          width: 126px;
          height: 126px;
          opacity: 0.3;
          z-index: 1;
        }
      }

      .courseitem {
        position: relative;
        border-bottom: 1px solid rgba(28, 31, 33, 0.1);
        width: 318px;
        overflow: hidden;
        margin-left: 24px;

        h2 {
          font-weight: 700;
          font-size: 16px;
          color: #1c1f21;
          line-height: 20px;
          margin-bottom: 8px;
          width: 318px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        p {
          font-size: 14px;
          color: #545c63;
          line-height: 20px;
          height: 40px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .pathinfo {
          display: flex;
          flex-direction: row;
          justify-items: center;
          align-items: center;
          font-size: 12px;
          color: #9199a1;
          line-height: 18px;
          position: absolute;
          bottom: 23px;

          i.sz-star {
            display: inline-block;

            font-size: 14px;
            vertical-align: middle;
            font-style: normal;
            margin: 0 4px;
            margin-top: -3px;
          }

          .collectnum {
            margin-left: 33px;
          }
        }
      }
    }
  }
}




a:link,
a:visited {
  color: #1c1f21;
}

.listview .imgcontainer .img-down,
.listview .imgcontainer .img-mid,
.listview .imgcontainer .img-up {
  margin: 0 auto;
  position: absolute;
  border-radius: 8px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
}
</style>
