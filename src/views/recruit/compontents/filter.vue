<template>
  <div class="job-search-wrapper">
    <div class="job-search-box clearfix">
      <div class="job-search-form">
        <span @click="openDialog" class="city-label">
          {{ name || data.locationCity.name }}
        </span>
        <div class="search-input-box">
          <div class="input-wrap input-wrap-text">
            <input
              autocomplete="on"
              spellcheck="false"
              type="text"
              placeholder="搜索职位、公司"
              class="input"
            />
          </div>
          <!-- <a href="javascript:;" class="search-map-btn">地图</a> -->
        </div>
        <a href="javascript:;" class="search-btn">搜索</a>
      </div>
      <city-dialog ref="cityDialogRef" @confirm="confirm" />
      <a @click="$router.push('/login')" class="go-login-btn"
        >登录，查看更多岗位</a
      >
    </div>
    <div class="search-condition-wrapper clearfix">
      <div class="city-area-select">
        <div class="city-area-dropdown">
          <!-- <ul class="city-area-tab">
            <li @click="changeTab(item)" :class="{active:item.type===currentTab}" v-for="item in tabs" :key="item.type">{{item.name}}</li>
          </ul> -->
          <div class="area-dropdown-item">
            <ul class="dropdown-city-list">
              <li
                v-for="item in data.hotCityList"
                :key="item.code"
                :class="{ active: item.name === name }"
              >
                {{ item.name }}
              </li>
              <li @click="openDialog">其它城市</li>
            </ul>
          </div>
          <!-- <div class="area-dropdown-item">
            <div class="area-select-wrapper">
              <div class="area-select-container">
                <ul class="dropdown-area-list">
                  <li>不限</li>
                  <li class="" v-for="item in currentArea" :key="item.code">{{item.name}}</li>
                </ul>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <div
        class="condition-filter-select open is-select"
        :class="{ open: joyTypeVisable }"
        @mouseenter="changeVisable(true)"
      >
        <div class="current-select">
          <span class="placeholder-text">求职类型</span>
          <em class="select-num" v-if="jobTypeCount">({{ jobTypeCount }})</em>
        </div>
        <div
          class="filter-select-dropdown"
          @mouseenter="changeVisable(true)"
          v-show="joyTypeVisable"
        >
          <ul>
            <li ka="sel-jobType-0" class="active">
              不限<el-icon><Check /></el-icon>
            </li>
            <li ka="sel-jobType-1901" class="">
              全职<el-icon><Check /></el-icon>
            </li>
            <li ka="sel-jobType-1903" class="">
              兼职<el-icon><Check /></el-icon>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import CityDialog from "./cityDialog.vue";
import data from "../city.json";
const cityDialogRef = ref(null);
const openDialog = () => {
  cityDialogRef.value.showDialog();
};
const name = ref();
const confirm = (item) => {
  name.value = item.name;
};
const jobTypeCount = ref(1);
const joyTypeVisable = ref(false);
const changeVisable = (val) => {
  console.log(1);
  joyTypeVisable.value = val;
};
// const tabs = [
//   { type: "city", name: "城市和区域" },
//   { type: "subway", name: "地铁" },
// ];
// const currentTab = ref("city");
// const changeTab = (item) => {
//   currentTab.value = item.type;
// };
// const currentArea = [
//   { code: "1", name: "玄武区" },
//   { code: "2", name: "浦口区" },
//   { code: "3", name: "秦淮区" },
//   { code: "4", name: "建邺区" },
//   { code: "5", name: "鼓楼区" },
//   { code: "6", name: "六合区" },
//   { code: "7", name: "溧水区" },
//   { code: "8", name: "高淳区" },
//   { code: "9", name: "栖霞区" },
//   { code: "10", name: "雨花台区" },
//   { code: "11", name: "江宁区" },
// ];
</script>

<style lang="scss" scoped>
.job-search-wrapper {
  background: #fff;
  width: 1600px;
  margin: 20px auto 0;
  border-radius: 12px;
  padding: 24px 24px 16px;
  .job-search-box {
    margin: 0 auto;
    .job-search-form {
      position: relative;
      float: left;
      width: 1324px;
      height: 50px;
      background: #00bebd;
      border-radius: 12px;
      border: 2px solid #00bebd;
      .input-wrap {
        width: 100%;
        color: #222;
        margin-left: -1px;
      }
      .city-label {
        box-sizing: border-box;
        position: relative;
        float: left;
        background: #fff;
        width: 136px;
        font-size: 16px;
        font-weight: 400;
        color: #222;
        line-height: 22px;
        height: 50px;
        padding: 14px 24px 14px 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 10px 0 0 10px;
        border-right: 1px solid #fff;
        cursor: pointer;
        transition: all 0.2s linear;
      }
      .city-label:after {
        content: " ";
        position: absolute;
        top: 21px;
        right: 18px;
        width: 4px;
        height: 7px;
        background: url(https://img.bosszhipin.com/static/file/2022/01vcskhm8y1652252017628.png) -6px -16px/10px
          auto no-repeat;
        transform: rotate(90deg);
        z-index: 1;
      }
      .search-input-box {
        position: relative;
        float: left;
        background: #fff;
        width: 1072px;
        border-radius: 0 10px 10px 0;
      }
      .input {
        box-sizing: border-box;
        height: 50px;
        border: none;
        box-shadow: none;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        padding: 14px 18px;
        border-radius: 0 12px 12px 0;
      }
      .search-map-btn {
        position: absolute;
        top: 50%;
        right: 20px;
        margin-top: -12px;
        height: 24px;
        font-size: 16px;
        color: #333;
        z-index: 1;
        display: flex;
        align-items: center;
        transition: all 0.2s linear;
      }
      .search-map-btn:before {
        content: " ";
        display: block;
        width: 24px;
        height: 24px;
        margin-right: 4px;
        background: url(https://img.bosszhipin.com/static/file/2023/rnb8fa70bs1675773960493.png)
          0 0/24px auto no-repeat;
      }
      .search-btn {
        float: left;
        display: block;
        font-weight: 500;
        color: #fff;
        line-height: 28px;
        width: 116px;
        font-size: 20px;
        text-align: center;
        padding: 11px 0;
      }
    }
    .go-login-btn {
      box-sizing: border-box;
      float: right;
      width: 236px;
      height: 54px;
      text-align: center;
      border-radius: 12px;
      border: 1px solid #00bebd;
      font-size: 16px;
      font-weight: 400;
      color: #00a6a7;
      line-height: 22px;
      padding: 15px 0;
      transition: all 0.2s linear;
    }
  }
  .search-condition-wrapper {
    margin: 0 auto;
    .city-area-select {
      margin-top: 20px;
      .city-area-tab {
        overflow: hidden;
        margin-bottom: 8px;
        li {
          font-size: 16px;
          font-weight: 500;
          color: #222;
          line-height: 22px;
          float: left;
          cursor: pointer;
          padding-bottom: 6px;
          transition: all 0.2s linear;
        }
        li.active {
          position: relative;
          color: #00a6a7;
        }
        li.active:after {
          content: " ";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          height: 3px;
          background: linear-gradient(90deg, #16d9d8, #00bebd);
          border-radius: 2px;
        }
        li + li {
          margin-left: 24px;
        }
      }
      .area-dropdown-item {
        position: relative;
        .dropdown-city-list {
          margin: 18px 2px -10px;
        }
        li {
          display: inline-block;
          white-space: nowrap;
          font-size: 14px;
          font-weight: 400;
          color: #333;
          line-height: 20px;
          cursor: pointer;
          margin: 0 10px 10px;
        }
        li.active {
          position: relative;
          color: #00a6a7;
          font-weight: 500;
        }
      }
      .area-dropdown-item + .area-dropdown-item {
        margin-top: 6px;
      }
      .area-select-wrapper {
        background: #f8f8f8;
        padding: 0 12px;
        border-radius: 4px;
        margin-top: 16px;
        position: relative;
        .area-select-container {
          position: relative;
          padding-top: 10px;
          .dropdown-area-list {
            margin-left: -10px;
            margin-right: -10px;
          }
        }
      }
    }
    .condition-filter-select,
    .condition-industry-select,
    .condition-position-cascade,
    .condition-position-select {
      float: left;
      margin-top: 20px;
      margin-right: 20px;
    }
    .condition-filter-select {
      display: inline-block;
      position: relative;
      background: #f8f8f8;
      border-radius: 4px;
      overflow: hidden;
      box-sizing: border-box;
      .current-select {
        position: relative;
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        color: #222;
        line-height: 20px;
        padding: 6px 24px 6px 12px;
        cursor: pointer;
        transition: all 0.2s linear;

        .placeholder-text {
          display: inline-block;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: bottom;
        }
        .select-num {
          font-style: normal;
          display: inline-block;
          margin-left: 2px;
          vertical-align: bottom;
        }
      }

      .current-select:after {
        content: "";
        position: absolute;
        top: 12px;
        right: 12px;
        width: 4px;
        height: 7px;
        background: url(@/assets/arrow.png) -6px -16px/10px auto no-repeat;
        transform: rotate(90deg);
        z-index: 1;
      }
      .filter-select-dropdown {
        position: absolute;
        top: 40px;
        left: 0;
        width: 168px;
        background: #fff;
        border-radius: 8px;
        border: 1px solid #ededed;
        z-index: 4;
        transition: opacity 0.2s linear;
        ul {
          padding: 4px 8px;
          li {
            position: relative;
            display: block;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 400;
            color: #333;
            line-height: 20px;
            padding: 8px 24px 8px 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            transition: all 0.2s linear;
            .el-icon {
              position: absolute;
              font-weight: 700;
              font-size: 12px;
              top: 12px;
              right: 8px;
              z-index: 1;
              color: #00a6a7;
            }
          }

          li.active {
            color: #00a6a7;
            font-weight: 500;
          }
          li:hover {
            color: #00a6a7;
            font-weight: 500;
            background: #f8f8f8;
          }
        }
      }
    }
    .condition-filter-select.open {
      background: #e5f8f8;
      overflow: visible;
    }
    .condition-filter-select.open .current-select:after {
      background-position: -6px -8px;
      transform: rotate(270deg);
    }
    .condition-filter-select.is-select .current-select:after {
      background: url(@/assets/arrow.png) -6px -8px/10px auto no-repeat;
    }
    .condition-filter-select.is-select .current-select {
      color: #00a6a7;
      background: #e5f8f8;
      font-weight: 500;
    }
  }
}
</style>