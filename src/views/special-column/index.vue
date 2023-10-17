<template>
  <div class="body">
    <category-com />
    <!-- 显示专栏列表 -->
    <div class="box-body main-content">
      <!-- 绑定每个专栏的链接 -->
      <div class="filter clearfix">
        <div class="sort l">
          <a class="on">默认排序</a>
          <a>最新</a>
          <a>销量</a>
          <a>升级</a>
        </div>
        <div class="l clearfix">
          <div class="isShow-bigCoding">
            <a class="no-checked"></a> 只显示大实战课
          </div>
        </div>
        <div class="other r clearfix">
          <a class="course-line l" target="_blank" href="http://47.99.69.109:8080/#/study-list">学习路线</a>
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
  </div>
</template>

<script>
import axios from "axios";
import categoryCom from "./compontents/special-category.vue";
export default {
  name: "CourseNavigation",
  components: { categoryCom },
  data() {
    return {
      specialItems: [],
    };
  },
  computed: {},
  created() {
    this.getSpecialColumn();
  },
  methods: {
    // specialItems.value = [{id: 1, sourceUrl: "baidu.com", name: "平台帮助中心", image: "https://kuangstudy.oss-cn-beijing.aliyuncs.com/bbs/2021/08/16/kuangstudy0ff38edc-4f3e-477a-9655-314a8f28d55b.jpg"}]
    getSpecialColumn() {
      var token = this.getCookieValue("token");
      var headers = {
        token: token, //访问受限资源必须把token传到后端校验
      };
      axios
        .get("/back/sourceCourse/listSpecialList", headers)
        .then((response) => {
          this.specialItems = response.data.result;
          // console.log(specialItems.value)
        });
    },

    //window.document.cookie可以拿到cookie所有的key=value;形式的字符串。所以从cookie拿值，遍历cookie的所有key，直到key等于keyStr，
    //就可以拿到对应的值，例如我们要拿名为token的key，调用方法getCookieValue(token)就可以拿到key为token的值(value)
    getCookieValue(keyStr) {
      //cookie只能存放键值对
      var operator = "=";
      var value = null;
      var s = window.document.cookie;
      var arr = s.split("; ");
      for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        var k = str.split(operator)[0];
        var v = str.split(operator)[1];
        if (k == keyStr) {
          value = v;
          break;
        }
      }
      return value;
    },
  },
};
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
    a {
      width: 12px;
      height: 16px;
      display: inline-block;
      font-family: imv2;
      position: relative;
      vertical-align: sub;
    }
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
</style>
