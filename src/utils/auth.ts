/**
 * Token 管理工具
 * 统一管理 Token 的存储、获取、删除操作
 *
 * 存储 key 统一取自 config/constants 的 AUTH_CONFIG，避免与常量表重复定义。
 */
import { AUTH_CONFIG } from '@/config/constants';

const TOKEN_KEY = AUTH_CONFIG.TOKEN_KEY
const USER_KEY = AUTH_CONFIG.USER_INFO_KEY

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function setUserInfo(userInfo: Record<string, unknown>): void {
  localStorage.setItem(USER_KEY, JSON.stringify(userInfo))
}

export function removeUserInfo(): void {
  localStorage.removeItem(USER_KEY)
}

export function clearAuth(): void {
  removeToken()
  removeUserInfo()
}
