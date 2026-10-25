/**
 * 统一 HTTP 客户端（单一实例）
 * ============================================================================
 * 历史问题：项目曾并存两套封装——
 *   1) 本文件：修改全局 axios.defaults（baseURL 硬编码 '/api'，含 token 注入、
 *      401/402 处理、Blob/ArrayBuffer 放行），但为副作用模块（无导出）；
 *   2) 已删除的 utils/request.js：独立实例，baseURL 取自
 *      process.env.VUE_APP_BASE_API，且无 token 注入、无 401 处理。
 *
 * 仓库只有 .env.development（VUE_APP_BASE_API='/api'），缺少 .env 与
 * .env.production，导致生产构建时该变量为 undefined -> request.js 的 baseURL
 * 为空 -> 走该实例的接口（专栏搜索 /back/course/**、菜单 /back/dictionary/**）
 * 请求路径丢失 /api 前缀，被 nginx 落进 location / 并由 try_files 返回
 * index.html（HTML 而非 JSON）。
 *
 * 现收敛为唯一实例：所有 api 模块统一 import 本文件默认导出，行为一致。
 * baseURL 保留 '/api' 兜底，避免生产环境环境变量缺失再次导致路径错误。
 * ============================================================================ */
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { ElMessage } from 'element-plus/es/components/message'
import { getToken, clearAuth } from '@/utils/auth'
import { RESPONSE_CODE } from '@/config/constants'
import type { ApiResponse } from '@/types/api'

const service: AxiosInstance = axios.create({
  // 兜底 '/api'：生产环境可能未定义 VUE_APP_BASE_API（仓库无 .env / .env.production）
  baseURL: process.env.VUE_APP_BASE_API || '/api',
  timeout: 50000,
  headers: {
    Accept: 'application/json'
  }
})

// 统一错误处理函数
const handleError = (code: number, message?: string): boolean => {
  if (code !== 200) {
    ElMessage.error(message || '系统出错')
    return true
  }
  return false
}

// 前置拦截 - 添加 Token 到请求头
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 登录前接口（验证码等）可声明 skipAuth 跳过 token 注入：后端 JWT 过滤器对
    // "带无效 token"的请求直接回 401 JSON，blob 响应会把 JSON 当图片渲染成裂图；
    // 不带 token 时过滤器放行，可匿名获取。标记头在发出前摘除，不会透传给后端。
    if (config.headers.skipAuth) {
      config.headers.delete('skipAuth')
    } else {
      const token = getToken()
      if (token) {
        config.headers['token'] = token
      }
    }

    return config
  },
  (error: unknown) => Promise.reject(error)
)

// 响应拦截器（包络类型化为 ApiResponse<unknown>；二进制放行分支由 instanceof 窄化）
service.interceptors.response.use(
  async (response: AxiosResponse<ApiResponse<unknown>>) => {
    // 后端对"带无效 token"的请求回 HTTP 200 + application/json 包络，而 blob 请求
    // （验证码、导出）不会走到下方 code 检查——若 content-type 是 JSON，需解析出
    // 包络走统一错误处理，否则 JSON 会被当二进制交付（验证码裂图、导出文件损坏）
    if (response.data instanceof Blob && (response.headers['content-type'] || '').includes('application/json')) {
      try {
        response.data = JSON.parse(await response.data.text())
      } catch {
        // 声明为 JSON 但解析失败：按二进制原样放行，交由业务侧报错
        return response
      }
    } else if (response.data instanceof ArrayBuffer || response.data instanceof Blob) {
      return response
    }

    const { code, message } = response.data

    // 处理未登录或 Token 过期的情况
    if (code === RESPONSE_CODE.UNAUTHORIZED || code === RESPONSE_CODE.TOKEN_EXPIRED) {
      ElMessage.error(message || '登录已失效,请重新登录')
      // 清除本地认证信息
      clearAuth()
      // 跳转到登录页（动态 import 避免 axios→router→store→api→axios 静态循环依赖）
      import('@/router').then(({ default: router }) => {
        router.push({
          path: '/login',
          query: { redirect: router.currentRoute.value.fullPath }
        })
      }).catch(() => {})
      return Promise.reject(new Error(message || 'Unauthorized'))
    }

    if (handleError(code, message)) {
      return Promise.reject(new Error(message || 'Error'))
    }

    return response
  },
  (error: unknown) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
