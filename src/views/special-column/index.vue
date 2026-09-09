<template>
  <div class="body">
    <!-- 使用自定义的分类组件 -->
    <category-com @callback="changeCategory" />
    <div class="box-body main-content">
      <!-- 过滤和排序 -->
      <div class="filter clearfix">
        <div class="sort l">
          <a
            v-for="item in order"
            :key="item.id"
            :class="{ on: currentOrder.id === item.id }"
            @click="changeOrder(item)"
          >
            {{ item.title }}
          </a>
        </div>
        <div class="other r clearfix">
          <a class="course-line l" target="_blank" href="http://www.javaedge.cn/#/study-list">
            学习路线
          </a>
        </div>
      </div>

      <!-- 专栏列表 -->
      <a
        v-for="item in specialItems"
        :key="item.id"
        :href="item.sourceUrl"
        target="_blank"
        class="special-box"
        @click="clickSpecial(item.id)"
      >
        <div class="box-head">
          <!-- 专栏图片 -->
          <img :src="item.image || columnCover" class="head-img" alt="专栏图片" />
        </div>
        <div class="box-bottom">
          <div class="bottom-left">{{ item.name }}</div>
          <div class="bottom-right">学习人数 {{ item.pageView }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import categoryCom from "@/components/special-category.vue";
import { specialApi } from '@/api/special';
import { usePagedList } from '@/composables/usePagedList';
import columnCover from '@/assets/column-cover.svg';

interface OrderItem {
  id: number
  title: string
  name: string
}

interface SpecialQueryParam {
  type: number
  category: string
  order: string
  itemId: string | number
}

interface SpecialQuery {
  pageNo: number
  pageSize: number
  param: SpecialQueryParam
}

export interface SpecialItem {
  id: number | string
  name: string
  image?: string
  sourceUrl: string
  pageView: number | string
}

// 排序配置
const order: OrderItem[] = [
  { id: 1, title: "默认", name: "default" },
  { id: 2, title: "最新", name: "new" },
  { id: 3, title: "学习人数", name: "count" }
];
const currentOrder = ref<OrderItem>(order[0]);

// 查询参数（param 字段由切换/点击动作维护；pageNo/pageSize 由 usePagedList 同步写入）
const queryParams = ref<SpecialQuery>({
  pageNo: 1,
  pageSize: 100,
  param: {
    type: 1,
    category: "",
    order: "",
    itemId: ""
  }
});

// 列表分页：page/size/total/specialItems/翻页 由 usePagedList 统一管理
const { list: specialItems, load: getSpecialColumn } = usePagedList<SpecialItem>(
  async ({ pageNo, pageSize }) => {
    queryParams.value.pageNo = pageNo;
    queryParams.value.pageSize = pageSize;
    const response = await specialApi.search(queryParams.value);
    if (response?.data?.result) {
      return { records: response.data.result.records, total: response.data.result.total };
    }
    return { records: [], total: 0 };
  },
  { pageSize: 100 }
);

// 切换排序方式
const changeOrder = (item: OrderItem): void => {
  currentOrder.value = item;
  queryParams.value.param.order = item.name;
  getSpecialColumn();
};

// 记录专栏浏览量
const clickSpecial = async (itemId: number | string): Promise<void> => {
  try {
    queryParams.value.param.itemId = itemId;
    await specialApi.updatePageView(queryParams.value);
  } catch (error) {
    console.error('更新浏览量失败:', error);
  }
};

// 切换分类
const changeCategory = (item: number): void => {
  queryParams.value.param.category = String(item);
  getSpecialColumn();
};

// 首次加载（路由组件每次进入都会重新挂载，故 onMounted 同时覆盖「离开后回来」的刷新；无需 onActivated）
onMounted(getSpecialColumn);
</script>

<style lang="scss" scoped>
/* 设置专栏列表的宽度、间距和对齐方式 */
.box-body {
  margin: 0 auto;
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
  width: 250px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin-left: 28px;
  margin-top: 25px;
  text-decoration: none;
  color: #666666;
}
.special-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px 0 rgba(95,101,105,.1);
}

/* 设置专栏列表中的每个专栏的标题区域的样式，包括背景颜色、高度、定位、溢出、动画等 */
.box-head {
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
  margin: 10px 0px;
  padding:0 10px;
  // padding:10px;

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
      color: var(--text-muted);
      line-height: 16px;
      padding: 4px 12px;
      border-radius: 100px;
      margin-right: 12px;
    }
    a.on {
      color: #fff;
      background-color: var(--text-muted);
    }
  }
  .other {
    font-size: 12px;
    .course-line {
      color: var(--app-accent);
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
.el-checkbox {
    height: 16px;
}
</style>
