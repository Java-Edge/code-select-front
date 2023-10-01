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
// const menus = [
//   { name: "热门", category: "0" },
//   { name: "前端", category: "1" },
//   { name: "后端", category: "2" },
//   { name: "移动端", category: "3" },
//   { name: "计算机基础", category: "4" },
//   { name: "大数据", category: "5" },
//   { name: "测试", category: "6" },
//   { name: "人工智能", category: "7" },
//   { name: "程序员数学", category: "8" },
// ];
const currentMenu = ref("0");
const allData = [
  {
    category: "0",
    data: {
      img: new URL("../../assets/demo/study0.jpg", import.meta.url).href,
      title: "大学计算机专业数学学习路线",
      desc: "提升编程内功，精选程序员必修的数学基础课，带你打好人工智能等领域的数学基础。",
      buzhou: 4,
      courses: 4,
      collect: 2792,
    },
  },
  {
    category: "1",
    data: {
      img: new URL("../../assets/demo/study1.jpg", import.meta.url).href,
      title: "Vue.js 从入门到精通",
      desc: "路线专为想学Vue却无从下手的人群设计，以实际项目为例，逐层深入，学透Vue。",
      buzhou: 4,
      courses: 6,
      collect: 20191,
    },
  },
  {
    category: "2",
    data: {
      img: new URL("../../assets/demo/study2.jpg", import.meta.url).href,
      title: "Java Web电商前后端与全流程进阶之路",
      desc: "以Java和vue为技术栈，覆盖数据库-后端-前端完整电商业务，遵循企业级流程，进军全栈工程师。",
      buzhou: 3,
      courses: 3,
      collect: 279,
    },
  },
  {
    category: "3",
    data: {
      img: new URL("../../assets/demo/study3.jpg", import.meta.url).href,
      title: "5G时代音视频开发与视频直播技术高手之路",
      desc: "对标大厂岗位需求，从音视频基础入门、处理核心技术到服务器设计开发 ，全面培养5G时代人才。",
      buzhou: 5,
      courses: 5,
      collect: 1203,
    },
  },
  {
    category: "4",
    data: {
      img: new URL("../../assets/demo/study4.jpg", import.meta.url).href,
      title: "算法面试求职、思维提升一站式全面解决",
      desc: "大厂校招、社招 算法数据结构类问题一网打尽。",
      buzhou: 4,
      courses: 4,
      collect: 92,
    },
  },
  {
    category: "5",
    data: {
      img: new URL("../../assets/demo/study5.jpg", import.meta.url).href,
      title: "大数据零基础入门求职路线",
      desc: "面向零基础用户，从Hadoop开始，以Flink和Spark两个核心框架为重心，配合生态圈周边框架进行实战，为您进军大数据领域铺平道路，助力快速入行转型！",
      buzhou: 4,
      courses: 4,
      collect: 3859,
    },
  },
  {
    category: "6",
    data: {
      img: new URL("../../assets/demo/study6.jpg", import.meta.url).href,
      title: "从Python接口自动化测试到测试开发成长之路",
      desc: "1.Python接口自动化从设计到开发   2.搞定分布式场景开发   3.测试高薪必学--大厂全链路质量保障体系   4.百度资深工程量亲授搞定测试面试，助你轻松拿offer",
      buzhou: 4,
      courses: 4,
      collect: 22,
    },
  },
  {
    category: "7",
    data: {
      img: new URL("../../assets/demo/study7.jpg", import.meta.url).href,
      title: "从0入门人工智能学习",
      desc: "路线面向0基础用户，从最基础的开发语言Python学起，带你进入人工智能的世界。",
      buzhou: 4,
      courses: 4,
      collect: 27212,
    },
  },
  {
    category: "8",
    data: {
      img: new URL("../../assets/demo/study0.jpg", import.meta.url).href,
      title: "大学计算机专业数学学习路线",
      desc: "提升编程内功，精选程序员必修的数学基础课，带你打好人工智能等领域的数学基础。",
      buzhou: 4,
      courses: 4,
      collect: 2792,
    },
  },
];

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
  console.log('path', path)
  axios.get(path).then(res => {
    // console.log(res)
    /**
     * 每次查出来之后，拼接上原来的数据即可
     */
    console.log("getRoadMap", res.data.result.records)
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
    // console.log(res)
    /**
     * 每次查出来之后，拼接上原来的数据即可
     */
    // console.log("mainCategoryList", res.data.result)
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