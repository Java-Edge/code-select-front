<template>
    <div class="article-ranking-container">
      <el-card class="articles">
        <el-table ref="tableRef" :data="tableData" border>
          <!-- <el-table-column
            label="排名"
            prop="ranking"
          ></el-table-column> -->
          <el-table-column
          label="标题"
          prop="title"
          >
          <template #default="{row}"  >
            <div class="table-row" @click="onShowClick(row)">
              <span>{{ row.title }}</span>
            </div>
            <!-- <el-button type="danger" size="mini" @click="onRemoveClick(row)">
              删除
            </el-button> -->
            </template>
        </el-table-column>
          <!-- <el-table-column
            label="作者"
            prop="author"
          ></el-table-column> -->
          <el-table-column
            label="创建时间"
            prop="createTime"
          >
          <template #default="{row}"  >
            <div class="table-row" @click="onShowClick(row)">
              <span>{{ row.createTime }}</span>
            </div>
            <!-- <el-button type="danger" size="mini" @click="onRemoveClick(row)">
              删除
            </el-button> -->
            </template>
          </el-table-column>
          <!--
          <el-table-column
            label="内容"
            prop="createTime"
          >
          <template #default="{row}"  >
            <div class="table-row" @click="onShowClick(row)">
              <span>{{  row.content.length > 20 ? row.content.substr(0, 20) + "..." : row.content}}</span>
            </div>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">
              删除
            </el-button>
            </template>
          </el-table-column>-->

          <!-- <el-table-column label="操作">
            <template #default="{row}">
              <el-button type="primary" size="mini" @click="onShowClick(row)">
              查看
            </el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">
              删除
            </el-button>
            </template>
          </el-table-column> -->
        </el-table>
  
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 50, 100, 200]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </div>
  </template>
  
  <script setup>
import { ref, onActivated, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import Header from '../Header.vue'; // Import the Header component
import Footer from '../Footer.vue'; // Import the Footer component

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)
// 获取数据
const route = useRoute()
const type = route.params.type
console.log(type)
// 获取数据的方法
const getListData = async () => {
  let path = `/back/article/getByPage?current=${page.value}&size=${size.value}`;
  if(type) {
    path += `&type=${type}`
  }
  axios.get(path).then(res=>{
    console.log(res)
    tableData.value = res.data.result.records
    total.value = res.data.result.total
    console.log('tableData', tableData.value)
  })
  // const result = await getArticleList({
  //   current: page.value,
  //   size: size.value
  // })
  // tableData.value = result.list
  // total.value = result.total
}
getListData()
// 处理数据不重新加载的问题
onActivated(getListData)
  /**
   * size 改变触发
   */
  const handleSizeChange = currentSize => {
    size.value = currentSize
    getListData()
  }
  
  /**
   * 页码改变触发
   */
  const handleCurrentChange = currentPage => {
    page.value = currentPage
    getListData()
  }

  /**
 * 查看按钮点击事件
 */
const router = useRouter()
const onShowClick = row => {
  console.log('row', row)
  router.push(`/article/${row.articleId}`)
}


/**
 * 监听路由的变化，文章的面经使用的是同一个界面，因此要监听路有变化，及时刷新数据
 */
watch(
      () => router.currentRoute.value,
      () => {
           console.log("路由变化了", router.currentRoute.value)
           let type = route.params.type    
           console.log(type)
           getListData()
      }
);

  </script>
  
  <style lang="scss" scoped>
  .articles {
    margin-bottom: 15px;
  }
  .article-ranking-container {
    min-height: 800px;
    max-width: 1152px;
    margin: 0 auto;
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

  </style>
  