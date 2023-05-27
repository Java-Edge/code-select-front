/**
 * 应用常量配置
 * 统一管理硬编码的URL和配置项
 */

// 网站基础URL配置
export const SITE_CONFIG = {
  // 前端应用地址
  frontendUrl: process.env.VUE_APP_FRONTEND_URL || window.location.origin,
  
  // 后端API地址（已在axios中配置，这里仅作参考）
  backendUrl: process.env.VUE_APP_BACKEND_URL || '/api',
  
  // 聊天机器人地址
  chatbotUrl: process.env.VUE_APP_CHATBOT_URL || 'http://javaedge.cn:3001/chatbot/88n14yNFATs9MNtT',
  
  // 默认首页路径
  homePath: '/index'
};

// 路由路径常量 - 单一数据源
// router/index.js 的 routes 与重定向全部引用此处，避免路径字符串硬编码散落。
// 注意：AUTH_REQUIRED_PATHS 中的 '/intervieArticleDetail' 是不带参数的匹配键，
// 与下面的 ARTICLE_DETAIL（含 :id）不同，故不复用此常量。
export const ROUTE_PATHS = {
  HOME: '/index',
  LOGIN: '/login',
  ARTICLE_INTERVIEW: '/article-interview',
  ARTICLE_DETAIL: '/intervieArticleDetail/:id',
  SPECIAL: '/special',
  PROFILE: '/profile'
};

// 需要登录才能访问的路由路径
export const AUTH_REQUIRED_PATHS = [
  '/index',              // 首页
  '/special',            // 专栏页面
  '/article-interview',  // 面经页面
  '/intervieArticleDetail' // 面经详情页
];

// 用户认证相关常量
export const AUTH_CONFIG = {
  // Token 存储的 key
  TOKEN_KEY: 'token',
  // 用户信息存储的 key
  USER_INFO_KEY: 'userInfo',
  // Token 过期时间(秒) - 与后端保持一致
  TOKEN_EXPIRE_TIME: 7200
};

// 响应状态码
export const RESPONSE_CODE = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,  // 未登录
  TOKEN_EXPIRED: 402, // Token 过期
  FORBIDDEN: 403      // 无权限
};

