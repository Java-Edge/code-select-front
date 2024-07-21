import {
  createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./axios";
import showdown from "showdown";
import installElementPlus from "./plugins/element";
import "./assets/css/base.css";
import DisableDevtool from "disable-devtool";
if (process.env.NODE_ENV !== "development") {
  DisableDevtool({
    url: "about:blank",
    timeOutUrl: "about:blank",
    disableMenu: false,
  });
}

const app = createApp(App);
installElementPlus(app);

// 解决bug：页面/路由跳转后，滚动条消失，页面无法滚动
router.afterEach((to, from, next) => {
  document
    .querySelector("body")
    .setAttribute("style", "overflow: auto !important;");
});

app.use(router); // 使用插件方式注册路由
app.use(store); // 使用插件方式注册 Vuex 的 store
app.use(showdown); // 注册markdown渲染

app.config.productionTip = false;
app.config.globalProperties.$axios = axios; // 在全局配置 $axios

app.mount("#app"); // 挂载 Vue 应用到 DOM 节点