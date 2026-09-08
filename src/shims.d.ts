// TypeScript 环境声明。
// 项目当前处于「渐进 TS 化」阶段：构建由 babel + @babel/preset-typescript 只做类型剥离，
// 类型检查由独立的 `npm run type-check` 执行，不阻塞 dev/build。

// 单文件组件：未启用 vue-tsc 前，.vue 一律按通用组件处理（只影响 IDE 提示，不影响运行）
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

// 静态资源：webpack 由 url-loader/file-loader 处理，TS 侧仅需声明其存在
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.webp'

// Vue CLI 通过 DefinePlugin 注入的环境变量（VUE_APP_*）。
// types: [] 已排除 @types/node，故此处自行声明，避免污染全局类型。
declare const process: {
  env: Record<string, string | undefined>
}
