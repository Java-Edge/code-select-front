import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './styles/tokens.css'
import './assets/css/base.css'
import './styles/dark/index.css'
import { initTheme } from './composables/useTheme'
import DisableDevtool from 'disable-devtool'

// Initialize theme before app mount (统一到 useTheme composable)
initTheme()

// Disable devtools in production
if (process.env.NODE_ENV === 'production') {
  DisableDevtool({
    url: 'about:blank',
    timeOutUrl: 'about:blank',
    disableMenu: false
  })
}

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
