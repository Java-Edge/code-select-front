import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './styles/tokens.css'
import './assets/css/base.css'
import './styles/dark/index.css'
import { initTheme } from './composables/useTheme'

// Initialize theme before app mount (统一到 useTheme composable)
initTheme()

// 注意：此处曾调用 DisableDevtool({ url: 'about:blank' })，
// 其逻辑为「检测到 DevTools 打开即 window.location.href = url」，
// 会导致开发者一开 DevTools 整页被跳转到 about:blank（白屏）。
// 该反调试手段几乎无安全收益却会炸掉本地调试，已移除。
// 若确需在真实生产环境做 DevTools 威慑，应改用 ondevtoolopen 弹层提示等非破坏性方案。

// Create Vue application instance
const app = createApp(App)

// Install Element Plus plugin
installElementPlus(app)

// Fix scrollbar issue after route navigation
router.afterEach(() => {
  document.body.style.overflow = 'auto'
})

// Register plugins
app.use(router)
app.use(store)

// Mount the application
app.mount('#app')
