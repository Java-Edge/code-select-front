/**
 * 用户相关 API 接口
 */
import axios from '@/axios'

export function register(data: Record<string, unknown>) {
  return axios({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function login(data: Record<string, unknown>) {
  return axios({
    url: '/user/doLogin',
    method: 'post',
    data
  })
}

export function logout() {
  return axios({
    url: '/user/logout',
    method: 'get'
  })
}

export function checkUsername(username: string) {
  return axios({
    url: '/user/checkUsername',
    method: 'get',
    params: { username }
  })
}

export function getCheckCode() {
  return axios({
    url: '/user/getCheckCode',
    method: 'get',
    responseType: 'blob'
  })
}

export function getUserInfo() {
  return axios({
    url: '/user/info',
    method: 'get'
  })
}
