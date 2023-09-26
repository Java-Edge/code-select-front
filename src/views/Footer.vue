<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>{{ aboutUs.name }}</h4>
        <ul>
          <li v-for="item in aboutUs.list" :key="item.id">
            <a :href="item.value" target="_blank">{{ item.label }}</a>
          </li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>{{ platformService.name }}</h4>
        <ul>
          <li v-for="item in platformService.list" :key="item.id">
            <a :href="item.value" target="_blank">{{ item.label }}</a>
          </li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>{{ friendlyLink.name }}</h4>
        <ul>
          <li v-for="item in friendlyLink.list" :key="item.id">
            <a :href="item.value" target="_blank">{{ item.label }}</a>
          </li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>{{ contactInfo.name }}</h4>
        <p v-for="item in contactInfo.list" :key="item.id">{{ item.label }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const aboutUs = ref({});
const platformService = ref({});
const friendlyLink = ref({});
const contactInfo = ref({});
const getDictionaryData = () => {
  axios.get("/back/dictionary/list?typeKey=about_us").then((res) => {
    aboutUs.value = res.data.result;
  });
  axios.get("/back/dictionary/list?typeKey=platform_service").then((res) => {
    platformService.value = res.data.result;
  });
  axios.get("/back/dictionary/list?typeKey=friendly_link").then((res) => {
    friendlyLink.value = res.data.result;
  });
  axios.get("/back/dictionary/list?typeKey=contact_info").then((res) => {
    contactInfo.value = res.data.result;
  });
};
getDictionaryData();
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
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
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
