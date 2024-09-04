<template>
  <div class="download-detail-container main-content">
    <h2 class="title">{{ detail.name }}</h2>
    <div class="header">
      <span class="time">发布时间：{{ detail.createTime }}</span>
      <span class="author">上传者：{{ detail.uploadUserName }}</span>
      <span class="download-count">下载次数：{{ detail.downloadCount }}</span>
    </div>
    <div class="info">
      <p>文件大小：{{ formatFileSize(detail.size) }}</p>
      <p>文件类型：{{ detail.suffix }}</p>
      <p>文件描述：{{ detail.description }}</p>
      <p>文件标签：{{ detail.tags }}</p>
      <p>版本号：{{ detail.version }}</p>
      <p>最后修改时间：{{ detail.lastModifiedTime }}</p>
      <p>文件状态：{{ getStatusText(detail.status) }}</p>
    </div>
    <div class="content" v-html="detail.content"></div>
    <div class="actions">
      <el-button type="primary" @click="downloadFile">下载文件</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import "@toast-ui/editor/dist/toastui-editor.css";

const route = useRoute();
const fileId = route.params.id;
const detail = ref({});

const getArticleDetail = async () => {
  try {
    const res = await axios.get(`/back/download/getById/${fileId}`);
    detail.value = res.data.result;
  } catch (error) {
    ElMessage.error('获取文件详情失败');
  }
};

getArticleDetail();

const formatFileSize = (size) => {
  if (size < 1024) return size + ' B';
  const kb = size / 1024;
  if (kb < 1024) return kb.toFixed(2) + ' KB';
  const mb = kb / 1024;
  if (mb < 1024) return mb.toFixed(2) + ' MB';
  const gb = mb / 1024;
  return gb.toFixed(2) + ' GB';
};

const getStatusText = (status) => {
  const statusMap = {
    0: '正常',
    1: '已删除',
    2: '待审核'
  };
  return statusMap[status] || '未知';
};

const downloadFile = async () => {
  try {
    const response = await axios.post(`/back/download/downloadFile/${fileId}`);
    const downloadUrl = response.data.result;

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', detail.value.name || 'download');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('获取文件详情失败:', error);
    ElMessage.error('下载文件失败');
  }
};
</script>

<style lang="scss" scoped>
.download-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0px;
    .author, .time, .download-count {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }
  }
  .info {
    font-size: 14px;
    padding: 20px 0px;
    border-top: 1px solid #d4d4d4;
    p {
      margin: 10px 0;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0px;
    border-top: 1px solid #d4d4d4;
    display: block;
  }
  .actions {
    margin-top: 20px;
    text-align: center;
  }
}
</style>