/**
 * Token 管理工具
 * 统一管理 Token 的存储、获取、删除操作
 *
 * 存储 key 统一取自 config/constants 的 AUTH_CONFIG，避免与常量表重复定义。
 */
import { AUTH_CONFIG } from '@/config/constants';

const TOKEN_KEY = AUTH_CONFIG.TOKEN_KEY
const USER_KEY = AUTH_CONFIG.USER_INFO_KEY

/**
 * 获取 Token
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 设置 Token
 * @param {string} token
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 删除 Token
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 设置用户信息
 * @param {Object} userInfo
 */
export function setUserInfo(userInfo) {
  localStorage.setItem(USER_KEY, JSON.stringify(userInfo))
}

/**
 * 删除用户信息
 */
export function removeUserInfo() {
  localStorage.removeItem(USER_KEY)
}

/**
 * 清除所有认证信息
 */
export function clearAuth() {
  removeToken()
  removeUserInfo()
}
