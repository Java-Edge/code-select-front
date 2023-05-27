/**
 * 用户相关 API 接口
 */
import axios from '@/axios'

/**
 * 用户注册
 * @param {Object} data - 注册信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @param {string} data.validCode - 验证码
 */
export function register(data) {
  return axios({
    url: '/user/register',
    method: 'post',
    data
  })
}

/**
 * 用户登录
 * @param {Object} data - 登录信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @param {string} data.validCode - 验证码
 */
export function login(data) {
  return axios({
    url: '/user/doLogin',
    method: 'post',
    data
  })
}

/**
 * 用户登出
 */
export function logout() {
  return axios({
    url: '/user/logout',
    method: 'get'
  })
}

/**
 * 检查用户名是否存在
 * @param {string} username - 用户名
 */
export function checkUsername(username) {
  return axios({
    url: '/user/checkUsername',
    method: 'get',
    params: { username }
  })
}

/**
 * 获取验证码图片
 * 返回图片的 Blob 数据
 */
export function getCheckCode() {
  return axios({
    url: '/user/getCheckCode',
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * 获取当前登录用户信息
 * 用于 header 用户头像下拉卡片展示
 */
export function getUserInfo() {
  return axios({
    url: '/user/info',
    method: 'get'
  })
}
