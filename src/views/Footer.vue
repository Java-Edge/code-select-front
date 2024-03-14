<template>
  <!-- 网页的页脚部分 -->
  <footer class="footer">
    <!-- 页脚内容容器 -->
    <div class="footer-content">
      <!-- 关于我们部分 -->
      <div class="footer-section">
        <h4>        <ul>
          <!-- 动态渲染关于我们的列表项 -->
          <li v-for="item in aboutUs.list" :key="item.id">
            <!-- 使用a标签跳转到对应链接，新开标签页 -->
            <a :href="item.value" target="_blank">{{ item.label }}</a>
          </li>
        </ul></h4>
      </div>
      <!-- 平台服务部分 -->
      <div class="footer-section">
        <h4>        <ul>
          <!-- 动态渲染平台服务的列表项 -->
          <li v-for="item in platformService.list" :key="item.id">
            <a :href="item.value" target="_blank">{{ item.label }}</a>
          </li>
        </ul></h4>
      </div>
      <!-- 友情链接部分 -->
      <div class="footer-section">
        <h4>        <ul>
          <!-- 动态渲染友情链接的列表项 -->
          <li v-for="item in friendlyLink.list" :key="item.id">
            <a :href="item.value" target="_blank">{{ item.label }}</a>
          </li>
        </ul></h4>
      </div>
      <!-- 联系信息部分 -->
      <div class="footer-section">
        <!-- <h4>{{ contactInfo.name }}</h4> -->
        <h4>
          <ul>
            <!-- 动态渲染联系信息的列表项 -->
            <li v-for="item in contactInfo.list" :key="item.id">
              <a :href="item.value" target="_blank">{{ item.label }}</a>
            </li>
          </ul>
        </h4>

      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// 使用Vue的Ref API定义四个响应式对象
const aboutUs = ref({});
const platformService = ref({});
const friendlyLink = ref({});
const contactInfo = ref({});

// 获取字典数据的方法
const getDictionaryData = () => {
  // 通过axios请求后端字典数据接口
  axios.get("/back/dictionary/listByMultiTypeKey?typeKeys=about_us,platform_service,friendly_link,contact_info").then((res) => {
    // 遍历返回的结果数组
    for (let i = 0; i < res.data.result.length; i++) {
      // 根据typeKey的值分别赋值给对应变量
      switch (res.data.result[i].typeKey) {
        case "about_us":
          aboutUs.value = res.data.result[i];
          break;
        case "platform_service":
          platformService.value = res.data.result[i];
          break;
        case "friendly_link":
          friendlyLink.value = res.data.result[i];
          break;
        case "contact_info":
          contactInfo.value = res.data.result[i];
          break;
      }
    }
  });
};

// 调用获取字典数据的方法
getDictionaryData();
</script>

<!-- 页面样式 -->

<style scoped>
.footer {
  background-color: #333;
  /* 页脚背景颜色 */
  color: #fff;
  /* 文字颜色 */
  padding: 5px 0;
  /* 内边距 */
  text-align: center;
  /* 文本居中 */
  max-height: 60px;
  /* 最大高度 */
}

.footer-content {
  max-width: 1152px;
  /* 最大宽度 */
  margin: 0 auto;
  /* 居中显示 */
  display: flex;
  /* 使用Flex布局 */
  justify-content: space-between;
  /* 子项之间间隔均匀 */
}

.footer h4 {
  margin-bottom: 20px;
  /* 标题下边距 */
  font-size: 10px;
  /* 文字大小 */
}

.footer ul {
  list-style: none;
  /* 列表无标记 */
  padding: 0;
  /* 无内边距 */
  margin: 0;
  /* 无外边距 */
}

.footer li {
  margin-bottom: 10px;
  /* 列表项下边距 */
  cursor: pointer;
  /* 鼠标悬浮指针变为手形 */
  font-size: 16px;
  /* 文字大小 */
}

.footer li:hover {
  color: #ffd04b;
  /* 鼠标悬浮时颜色变化 */
}

.footer p {
  margin-bottom: 10px;
  /* 段落下边距 */
}

.footer a {
  color: #fff;
  /* 连接颜色 */
  text-decoration: none;
  /* 无下划线 */
}

.footer a:hover {
  color: #ffd04b;
  /* 鼠标悬浮时连接颜色变化 */
}
</style>