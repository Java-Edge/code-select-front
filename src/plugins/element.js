import ElementPlus from 'element-plus'
// 引入 Element Plus 图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入 Element Plus 的样式文件
import 'element-plus/dist/index.css'

export default app => {
  // 注册 Element Plus 组件库：将 Element Plus 组件库添加到 Vue 应用中
  // 使所有 Element Plus 组件在应用中可用
  app.use(ElementPlus);
  // 遍历其所有键值对
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // 将每个图标组件注册为全局组件
    app.component(key, component)
  }
}