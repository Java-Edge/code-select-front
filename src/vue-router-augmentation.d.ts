// vue-router 路由元信息增强（独立 module 文件，确保是「增强」而非「覆盖」真实 vue-router 类型）。
// 注意：模块增强必须写在含顶层 import/export 的 module 文件中；
// 若写在全局脚本（如 shims.d.ts）里，declare module 'vue-router' 会被当成全新环境声明，
// 反而遮蔽 createRouter/useRouter 等真实导出。
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}
