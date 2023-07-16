import { createApp } from 'vue'; // 使用 createApp 替换 Vue 的导入方式
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import './axios';

const app = createApp(App); // 使用 createApp 创建 Vue 应用
app.use(router); // 使用插件方式注册路由
app.use(store); // 使用插件方式注册 Vuex 的 store

app.config.productionTip = false;
app.config.globalProperties.$axios = axios; // 在全局配置 $axios

app.mount('#app'); // 挂载 Vue 应用到 DOM 节点
