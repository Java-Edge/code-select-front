<template>
  <div class="body main-content">
    <div class="ranking-body" v-for="download in downloads" :key="download.id">
      <div class="ranking-number">{{ download.orderVal }}</div>
      <div class="ranking-left">
        <div class="ranking-img">
          <img v-if="download.img == null || download.img == ''"
               src="https://p.ipic.vip/p6p1eb.png"/>
          <img v-else :src="download.img"/>
        </div>
      </div>

      <div class="ranking-middle" @click="goToDetail(download.id)">
        <div class="ranking-name hide-text">{{ download.name }}</div>
        <div class="ranking-des hide-text">{{ download.suffix }}</div>
        <div class="ranking-likes">文件大小 {{ download.size }}</div>
      </div>
    </div>
    <pagination :page="page" :total="total" :size="size" @pageChange="handleCurrentChange"/>
    <!-- 文件选择 -->
    <div class="upload-section">
      <input type="file" @change="handleFileChange" ref="fileInput" style="display: none;">
      <button @click="triggerFileInput" class="upload-button">选择文件</button>
      <span v-if="selectedFile" class="selected-file-name">{{ selectedFile.name }}</span>
      <button @click="uploadFile" class="upload-button" :disabled="!selectedFile">上传文件</button>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import pagination from "@/components/pagination.vue";
import {ref} from "vue";
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const total = ref(0);
const page = ref(1);
const size = ref(5);

const downloads = ref([]);
const getListData = async () => {
  let path = `/back/download/listByPage?current=${page.value}&size=${size.value}`;
  axios.get(path).then((res) => {
    downloads.value = res.data.result.records;
    total.value = res.data.result.total;
  });
};

getListData()
const handleCurrentChange = (currentPage) => {
  page.value = currentPage;
  getListData();
};

// 修复文件输入框的引用
const fileInput = ref(null);
const selectedFile = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

// 上传文件 
const uploadFile = async () => {
  if (!selectedFile.value) {
    ElMessage.warning('请先选择文件');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    const response = await axios.post('/back/download/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data.code === 200) {
      ElMessage.success('文件上传成功');
      selectedFile.value = null;
      getListData(); // 刷新文件列表
    } else {
      ElMessage.error(response.data.message || '文件上传失败');
    }
  } catch (error) {
    console.error('上传文件时出错:', error);
    ElMessage.error('上传文件时发生错误');
  }
};

const router = useRouter();

const goToDetail = (id) => {
  router.push(`/download/${id}`);
};
</script>
<style lang="scss" scoped>
.link-sty {
  text-decoration: none;
  color: black;
  display: block;
  width: 830px;
}

.ranking-number {
  color: #999AAA;
  font-size: 20px;
  // margin-bottom: 50px;
  margin-right: 15px;
}

.ranking-body {
  height: 67px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 10px;
}

.ranking-left {
  // background-color: yellow;
  margin: 0 auto;
}

.ranking-middle {
  cursor: pointer;
  // background-color: blue;
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  margin-left: 15px;
  justify-content: space-between;
  height: 100%;
}

.ranking-name {
  font-size: 16px;
  font-weight: 600;
}

.ranking-img img {
  width: 107px;
  height: 60px;
  border-radius: 5px;
}

.ranking-des {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #777888;
}

.ranking-likes {
  font-size: 14px;
  color: #777888;
}

.ranking-right {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.ranking-right a {
  text-decoration: none;
}

.ranking-user-img img {
  width: 37px;
  height: 37px;
  border-radius: 50%;
}

.ranking-user-name {
  margin-left: 5px;
  margin-right: 5px;
  font-size: 14px;
}

.ranking-button {
  width: 65px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: #f8f8f8;
  color: black;
  border-radius: 13px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #ccccd8;
}

/* 按钮悬停样式 */
.ranking-button:hover {
  border: 1px solid black;
}

/* 按钮点击样式 */
.ranking-button:active {
  background-color: #f8f8f8;
}

.hide-text {
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>