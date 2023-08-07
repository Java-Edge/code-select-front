<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>关于我们</h4>
        <ul>
          <li>企业介绍</li>
          <li>加入我们</li>
          <li>联系我们</li>
          <li>帮助中心</li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>平台服务</h4>
        <ul>
          <li><a href="https://www.bilibili.com/">专栏</a></li>
          <li>导航</li>
          <li>课程</li>
          <li>江湖</li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>友情链接</h4>
        <ul>
          <li><a href="https://www.bilibili.com/">哔哩哔哩</a></li>
          <li><a href="http://www.w3school.com.cn">W3School</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>联系方式</h4>
        <p>&copy; {{ currentYear }} {{ websiteName }}. All rights reserved.</p>
        <p>{{ contactPhone }}</p>
      </div>
    </div>
  </footer>
</template>
  
<script>
export default {
  name: 'Footer',
  data() {
    return {
      websiteName: 'Your Website Name',
      currentYear: new Date().getFullYear(),
      contactPhone: '+123-456-7890',
    };
  },
};
</script>
  
<style scoped>
/* 添加样式 */
.footer {
  background-color: #333;
  color: #fff;
  padding: 30px 0;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-around;
}

.footer-section {
  margin: 0 40px;
}

.footer h4 {
  margin-bottom: 20px;
  font-size: 20px;
}

.footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer li {
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;
}

.footer li:hover {
  color: #ffd04b;
}

.footer p {
  margin-bottom: 10px;
}

.footer a {
  color: #fff;
  text-decoration: none;
}

.footer a:hover {
  color: #ffd04b;
}
</style>
