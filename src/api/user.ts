/**
 * 用户相关 API 接口
 */
import type { AxiosResponse } from 'axios'
import axios from '@/axios'
import type { ApiResponse, BackendUser } from '@/types/api'

export function register(data: Record<string, unknown>): Promise<AxiosResponse<ApiResponse<unknown>>> {
  return axios({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function login(data: Record<string, unknown>): Promise<AxiosResponse<ApiResponse<BackendUser>>> {
  return axios({
    url: '/user/doLogin',
    method: 'post',
    data
  })
}

export function logout(): Promise<AxiosResponse<ApiResponse<unknown>>> {
  return axios({
    url: '/user/logout',
    method: 'get'
  })
}

export function checkUsername(username: string): Promise<AxiosResponse<ApiResponse<number>>> {
  return axios({
    url: '/user/checkUsername',
    method: 'get',
    params: { username }
  })
}

export function getCheckCode(): Promise<AxiosResponse<Blob>> {
  return axios({
    url: '/user/getCheckCode',
    method: 'get',
    responseType: 'blob'
  })
}

export function getUserInfo(): Promise<AxiosResponse<ApiResponse<BackendUser>>> {
  return axios({
    url: '/user/info',
    method: 'get'
  })
}
