/**
 * 用户相关 API 接口
 */
import type { AxiosResponse } from 'axios'
import axios from '@/axios'
import type { ApiResponse, BackendUser } from '@/types/api'

export function register(data: Record<string, unknown>): Promise<AxiosResponse<ApiResponse<unknown>>> {
  return axios({
    url: '/back/user/register',
    method: 'post',
    data
  })
}

export function login(data: Record<string, unknown>): Promise<AxiosResponse<ApiResponse<BackendUser>>> {
  return axios({
    url: '/back/user/doLogin',
    method: 'post',
    data
  })
}

export function logout(): Promise<AxiosResponse<ApiResponse<unknown>>> {
  return axios({
    url: '/back/user/logout',
    method: 'get'
  })
}

export function checkUsername(username: string): Promise<AxiosResponse<ApiResponse<number>>> {
  return axios({
    url: '/back/user/checkUsername',
    method: 'get',
    params: { username }
  })
}

export function getCheckCode(): Promise<AxiosResponse<Blob>> {
  return axios({
    url: '/back/user/getCheckCode',
    method: 'get',
    responseType: 'blob',
    // 验证码是登录前接口：localStorage 里的失效 token 若被注入，后端 JWT 过滤器
    // 会回 401 JSON 把图片变成裂图。skipAuth 让拦截器跳过 token 注入（该标记头不会发送）
    headers: { skipAuth: true }
  })
}

export function getUserInfo(): Promise<AxiosResponse<ApiResponse<BackendUser>>> {
  return axios({
    url: '/back/user/info',
    method: 'get'
  })
}

export function uploadAvatar(file: File): Promise<AxiosResponse<ApiResponse<{ avatar: string }>>> {
  const formData = new FormData()
  formData.append('file', file)
  return axios({
    url: '/back/user/avatar',
    method: 'post',
    data: formData,
    // axios 无法从 FormData 推断 multipart 边界，必须显式声明；
    // Token 仍由统一请求拦截器注入。
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
