<template>
    <div class="list-container">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column proper="name" label="用户"  align="center"></el-table-column>
            <el-table-column prop="title" label="标题"  align="center"></el-table-column>
            <el-table-column prop="content" label="内容" align="center"></el-table-column>
            <el-table-column prop="createAt" label="时间" align="center"></el-table-column>
            <el-table-column  label="操作" align="center">
                <template #default="scope">
                    <el-button link type="primary" size="small"  @click.prevent="onShowClick(scope.row.id)"  >
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :page="page" :total="total" :size="size" @pageChange="handleCurrentChange" />
    </div>
</template>

<script setup>
import { ref, onActivated, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import pagination from "@/components/pagination.vue";
import axios from "axios";

const tableData = ref([])
const page = ref(1);
const size = ref(10);
const total = ref(0);

const getListDataByCondition = async (condition) => {
    condition.param = {
        ...condition.param
    }
    axios.post("/back/innerRecommend/selectByCondition",condition).then(response => {
        console.log(response)
    })
}

/**
 * 获取数据
 */
const getListData = async () => {
    let params =  {
        pageNo: page.value,
        pageSize: size.value,
        param: {
            articleType: 2
        }
    }
    axios.post("/back/innerRecommend/selectByCondition",params).then(response => {
        console.log(response)
        tableData.value = response.data.result.records;
        total.value = response.data.result.total
    })
}

/**
 * 页码改变触发
 */
 const handleCurrentChange = (currentPage) => {
    page.value = currentPage;
    getListData();
};

/**
 * 查看按钮点击事件
 */
 const router = useRouter();
const onShowClick = (articleId) => {
  console.log("articleId", articleId);
  router.push(`/discussion-detail/${articleId}`);
};

getListData()


</script>


<style lang="scss" scoped>

.list-container{
    min-height: 800px;
    max-width: 1152px;
    margin: 0 auto;
}

</style>