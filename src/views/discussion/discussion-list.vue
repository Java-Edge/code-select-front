<template>
    <div class="list-container">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="title" label="标题"  align="center"></el-table-column>
            <el-table-column prop="content" label="简介" align="center"></el-table-column>
            <el-table-column prop="createAt" label="发布时间" align="center"></el-table-column>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import pagination from "@/components/pagination.vue";
import axios from "axios";

const tableData = ref([])
const page = ref(1);
const size = ref(10);
const total = ref(0);

const getListData = async () => {
    let params =  {
        pageNo: page.value,
        pageSize: size.value,
        param: {
            articleType: 2
        }
    }
    axios.post("/back/company-discussion/selectByCondition",params).then(response => {
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
