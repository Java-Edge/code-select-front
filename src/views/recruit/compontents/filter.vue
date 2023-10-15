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
        <a href="javascript:;" class="search-btn" @click="queryRecruits"
          >搜索</a
        >
      </div>
      <city-dialog ref="cityDialogRef" @confirm="confirm" />
      <a
        @click="$router.push('/login')"
        class="go-login-btn"
        v-if="!store.state.userInfo"
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
      <industry-select
        :clear="clear"
        @changeCheck="(data) => changeComCheck('industry', data)"
      />
      <position-select
        :clear="clear"
        @changeCheck="(data) => changeComCheck('position', data)"
      />
      <my-select
        :list="item.data"
        :multiple="item.multiple"
        v-for="(item, key) in selectList"
        :key="key"
        :name="item.name"
        @changeCheck="(type, data) => changeCheck(key, type, data)"
      />
      <a @click="reset" class="clear-search-btn">清空筛选条件</a>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineEmits } from "vue";
import CityDialog from "./cityDialog.vue";
import mySelect from "./mySelect.vue";
import industrySelect from "./industrySelect.vue";
import positionSelect from "./positionSelect.vue";
import axios from "axios";
import data from "../city.json";
import { useStore } from "vuex";
const cityDialogRef = ref(null);
const emits = defineEmits(["message"]);
const openDialog = () => {
  cityDialogRef.value.showDialog();
};
const name = ref();
const confirm = (item) => {
  name.value = item.name;
};
const store = useStore();
const queryParams = ref({});
const getDctionary = (typeKey, callback) => {
  axios
    .get(
      "/back/dictionary/list?typeKey=" + typeKey
      // ,
      //     {
      //         headers: {
      //             "Authorization": this.$store.getters.getToken
      //         }
      //     }
    )
    .then((response) => {
      const result = response.data.result;
      let list = [];
      result.list.map((item) => {
        let data = {};
        data.id = parseInt(item.value);
        data.name = item.label;
        data.active = false;
        list.push(data);
      });
      callback(list);
    });
};
const selectList = reactive({
  jobTypeList: {
    name: "求职类型",
    data: [
      // { id: 1, name: "全职", active: false },
      // { id: 2, name: "兼职", active: false },
    ],
  },
  expList: {
    name: "工作经验",
    multiple: true,
    data: [
      // { id: 1, name: "在校生", active: false },
      // { id: 2, name: "应届生", active: false },
      // { id: 3, name: "经验不限", active: false },
      // { id: 4, name: "1年以内", active: false },
      // { id: 5, name: "1-3年", active: false },
      // { id: 6, name: "3-5年", active: false },
      // { id: 7, name: "5-10年", active: false },
      // { id: 7, name: "10年以上", active: false },
    ],
  },
  salaryList: {
    name: "薪资待遇",
    data: [
      // { id: 1, name: "3K以下", active: false },
      // { id: 2, name: "3-5K", active: false },
      // { id: 3, name: "5-10K", active: false },
      // { id: 4, name: "10-20K", active: false },
      // { id: 5, name: "20-50K", active: false },
      // { id: 6, name: "50K以上", active: false },
    ],
  },
  degressList: {
    name: "学历要求",
    multiple: true,
    data: [
      // { id: 1, name: "初中及以下", active: false },
      // { id: 2, name: "中专/中技", active: false },
      // { id: 3, name: "高中", active: false },
      // { id: 4, name: "大专", active: false },
      // { id: 5, name: "本科", active: false },
      // { id: 6, name: "硕士", active: false },
      // { id: 7, name: "博士", active: false },
    ],
  },
  sizeList: {
    name: "公司规模",
    multiple: true,
    data: [
      // { id: 1, name: "0-20人", active: false },
      // { id: 2, name: "20-99人", active: false },
      // { id: 3, name: "100-499人", active: false },
      // { id: 4, name: "500-999人", active: false },
      // { id: 5, name: "1000-9999人", active: false },
      // { id: 6, name: "10000以上", active: false },
    ],
  },
  stageList: {
    name: "融资阶段",
    multiple: true,
    data: [
      // { id: 1, name: "未融资", active: false },
      // { id: 2, name: "天使轮", active: false },
      // { id: 3, name: "A轮", active: false },
      // { id: 4, name: "B轮", active: false },
      // { id: 5, name: "C轮", active: false },
      // { id: 6, name: "D轮及以上", active: false },
      // { id: 7, name: "已上市", active: false },
      // { id: 8, name: "不需要融资", active: false },
    ],
  },
});
const changeCheck = (key, type, id) => {
  if (id) {
    if (!type) {
      selectList[key].data = selectList[key].data.map((item) => ({
        ...item,
        active: false,
      }));
    }
    const item = selectList[key].data.find((item) => item.id === id);
    item.active = !item.active;
  } else {
    selectList[key].data = selectList[key].data.map((item) => ({
      ...item,
      active: false,
    }));
  }
  queryParams.value[key] = selectList[key].data
    .filter((item) => item.active)
    .map((item) => item.id);
};
const changeComCheck = (key, data) => {
  queryParams.value[key] = data;
};

const getData = () => {
  // 1. 学历要求
  getDctionary("education_level", (result) => {
    // console.log(result);
    selectList["degressList"].data = result;
  });

  // 2. 毕业年限
  getDctionary("graduate_year", (result) => {
    // console.log(result);
    selectList["expList"].data = result;
  });

  // 3. 薪资要求
  getDctionary("salary_range", (result) => {
    // console.log(result);
    selectList["salaryList"].data = result;
  });

  // 4. 融资阶段
  getDctionary("finance_stage", (result) => {
    // console.log(result);
    selectList["stageList"].data = result;
  });

  // 5. 公司规模
  getDctionary("person_scale", (result) => {
    // console.log(result);
    selectList["sizeList"].data = result;
  });

  // 6. 招聘类型
  getDctionary("recruit_type", (result) => {
    // console.log(result);
    selectList["jobTypeList"].data = result;
  });
};
getData();

// const getRecruit = () => {
//   let condition;
//   condition = {
//     pageNo: 1,
//     pageSize: 20,
//     param: {
//       eduLevel: queryParams.value["degressList"],
//       graduateYear: queryParams.value["expList"],
//       personScale: queryParams.value["sizeList"],
//       salaryRange:queryParams.value["salaryList"],
//       scaleTag: queryParams.value["stageList"],
//       recruitType: queryParams.value["jobTypeList"]
//     },
//   };
//   axios.post( "/back/recruit/selectByCondition",condition
//       // ,
//       //     {
//       //         headers: {
//       //             "Authorization": this.$store.getters.getToken
//       //         }
//       //     }
//     )
//     .then((response) => {
//       let result = response.data.result;
//       // this.recruits = result.records;
//       // this.total = result.total;
//       emits('result', result);
//     });
// };
// getRecruit();
const queryRecruits = () => {
  let param = {
    eduLevel: queryParams.value["degressList"],
    graduateYear: queryParams.value["expList"],
    personScale: queryParams.value["sizeList"],
    salaryRange: queryParams.value["salaryList"],
    scaleTag: queryParams.value["stageList"],
    recruitType: queryParams.value["jobTypeList"],
  };
  emits("getRecruit", param);
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
const clear = ref(false);
const reset = () => {
  for (var item in selectList) {
    selectList[item].data = selectList[item].data.map((item) => ({
      ...item,
      active: false,
    }));
  }
  clear.value = true;
};
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
  }
}
.search-condition-wrapper {
  .clear-search-btn {
    float: right;
    font-size: 14px;
    font-weight: 400;
    color: #999;
    line-height: 20px;
    margin-top: 26px;
    transition: all 0.2s linear;
  }
  .clear-search-btn:hover {
    color: #00a6a7;
  }
}
</style>