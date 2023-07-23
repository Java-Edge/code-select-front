<template>
    <div class="article-ranking-container">
      <el-card>
        <el-table ref="tableRef" :data="tableData" border>
          <!-- <el-table-column
            label="排名"
            prop="ranking"
          ></el-table-column> -->
          <el-table-column
            label="标题"
            prop="title"
          ></el-table-column>
          <!-- <el-table-column
            label="作者"
            prop="author"
          ></el-table-column> -->
          <el-table-column
            label="创建时间"
            prop="createTime"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button type="primary" size="mini" @click="onShowClick(row)">
              查看
            </el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">
              删除
            </el-button>
            </template>
          </el-table-column>
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
import { ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

// 获取数据的方法
const getListData = async () => {
  axios.get(`/article/getByPage?current=${page.value}&size=${size.value}`).then(res=>{
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

  </script>
  
  <style lang="scss" scoped>
  .article-ranking-container {
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
  