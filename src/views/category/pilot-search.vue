<template>
  <div class="home-search">
    <ul class="menu">
      <li v-for="(item, index) in searchs" :key="index" :data-url="item.url" :data-keyword="item.key"
        @click="selectEngine(index)" class="menu-item" :class="{ active: activeSearchIndex === index }">
        {{ item.name }}
      </li>
    </ul>
    <form @submit.prevent="doSearch" class="search-form">
      <!-- 搜索引擎下拉菜单 -->
      <div class="left">
        <!-- <i class="currentSearch.iconClass"></i> -->
        <!-- placeholder -->
        <div v-if="showPlaceholder" class="left-placeholder">
          <div class="left-placeholder-unfocus" key="unfocus">
            按下
            <div class="focus-icon">/</div>
            立即搜索...
          </div>
        </div>
      </div>
      <!-- 搜索输入框 -->
      <div class="center">
        <el-input ref="searchInput" @focus="handleFocus" @blur="handleBlur" v-model="searchText" :autofocus="true"
          :placeholder="isSearchInputFocus ? '搜索一下...' : ''" clearable>
        </el-input>
      </div>
      <div class="right">
        <i class="iconfont icon-md-search" @click="doSearch"></i>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { handleURL } from '@/utils/handleURL'
// 搜索相关
const searchText = ref('')
const isSearchInputFocus = ref(false)
const activeSearchIndex = ref(0)
const ideas = ref([])
const currentSearch = ref({})
const activeIdeaIndex = ref()
const searchs = ref([])
const searchInput = ref()
searchs.value = [
  {
    url: 'https://www.baidu.com/s',
    key: 'word',
    params: {},
    name: '百度',
    iconClass: 'iconfont icon-baidu',
  },
  {
    url: 'https://www.google.com/search',
    key: 'q',
    params: {},
    name: '谷歌',
    iconClass: 'iconfont icon-chrome',
  },
  {
    url: 'https://cn.bing.com/search',
    key: 'q',
    params: {},
    name: '必应',
    iconClass: 'iconfont icon-yingyong',
  },
  {
    url: 'https://dict.youdao.com/search',
    key: 'q',
    params: {},
    name: '翻译',
    iconClass: 'iconfont icon-translate',
  },
  {
    url: 'https://xueshu.baidu.com/s',
    key: 'wd',
    params: {},
    name: '学术',
    iconClass: 'iconfont icon-md-school',
  },
  {
    url: 'https://image.baidu.com/search/index',
    key: 'word',
    params: {
      tn: 'baiduimage',
    },
    name: '搜图',
    iconClass: 'iconfont icon-md-image',
  },
  {
    url: 'https://duckduckgo.com/',
    key: 'q',
    params: {},
    name: '匿名',
    iconClass: 'iconfont icon-md-cube',
  },
  {
    url: 'localhost',
    key: 'instation',
    params: {},
    name: '站内',
    iconClass: 'iconfont icon-md-planet',
  },
  // {
  //   url: "https://quark.sm.cn/s",
  //   key: "q",
  //   params: {},
  //   name: "夸克",
  //   iconClass: "iconfont icon-md-planet",
  // },
];

const showPlaceholder = computed(() => {
  return !searchText.value && !isSearchInputFocus.value;
})
const handleFocus = () => {
  isSearchInputFocus.value = true;
}
const handleBlur = () => {
  isSearchInputFocus.value = false;
}
// 选择搜索引擎
const selectEngine = (index) => {
  // 搜索输入框获得光标
  console.log(searchInput)
  searchInput.value.focus()
  // 清空其他搜索引擎建议
  ideas.value = [];
  // 选择引擎索引
  activeSearchIndex.value = index;
}
watch(
  // 监听 activeSearchIndex
  activeSearchIndex.value,
  (newV, oldV) => {
    currentSearch.value = searchs.value[newV];
  },
  { deep: true, immediate: true }
)
// 监听 ideas
watch(
  ideas,
  (nV) => {
    if (nV.length === 0) {
      activeIdeaIndex.value = -1;
    }
  }
);
// 进行搜索
const doSearch = () => {
  if (searchText.value) {
    let url = null;
    // 外网搜索跳转
    let params = {};
    params[currentSearch.value.key] = searchText.value;
    if (Object.keys(currentSearch.value.params) != 0) {
      params = Object.assign(params, currentSearch.value.params);
    }
    url = handleURL(currentSearch.value.url, params);
    if (url) window.open(url);
  }
}
</script>

<style lang="scss" scoped>
.home-search{
  position: absolute;
  width: 360px;
  height: 40px;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.7);
}

.menu-item {
  font-size: 1rem;
  line-height: 1.5rem;
}

.menu {
  position: absolute;
  top: -70px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  color: black;
  li {
    list-style: none;
    position: relative;
    height: 32px;
    margin-top: 5px;
    margin-bottom: 10px;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }
  }

  .active {
    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #10b981;
    }
  }
}

.search-form {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-self: center;
  align-items: center;
}

.left {
  position: relative;
  width: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
  }

  .left-placeholder {
    font-size: 14px;
    position: absolute;
    left: 19px;
    width: 140px;
    height: 20px;
    color: #6b7280;

    .left-placeholder-unfocus {
      display: flex;
      align-items: center;

      .focus-icon {
        width: 14px;
        height: 18px;
        margin: 0 4px;
        border-radius: 2px;
        border: 1px solid #6b7280;
        text-align: center;
        line-height: 18px;
      }
    }
  }
}

.center {
  width: calc(100% - 100px);
  height: 100%;

  ::v-deep .el-input__inner {
    border: none;
    border-radius: 0;
    background: transparent;
    &::placeholder {
      color: #6b7280;
    }
  }

  ::v-deep .el-input__suffix {
    i {
      font-size: 16px;
      font-weight: 500;
      color: #6b7280;
    }
  }
}

.right {
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 24px;
    font-weight: 500;
  }
}</style>
