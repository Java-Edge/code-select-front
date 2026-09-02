/**
 * 用户状态管理模块
 */
import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken, setUserInfo, removeUserInfo, clearAuth } from '@/utils/auth'

/**
 * 后端用户对象 → 前端 userInfo 形状（单一映射源，避免 login/fetchUserInfo 重复构造）
 */
const mapUserInfo = (result) => ({
  id: result.id,
  username: result.username,
  nickname: result.nickname,
  avatar: result.avatar
})

const state = {
  token: getToken() || '',
  userInfo: null,
  isAuthenticated: !!getToken()
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    state.isAuthenticated = !!token
    if (token) {
      setToken(token)
    } else {
      removeToken()
    }
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
    if (userInfo) {
      setUserInfo(userInfo)
    } else {
      removeUserInfo()
    }
  },
  CLEAR_USER(state) {
    state.token = ''
    state.userInfo = null
    state.isAuthenticated = false
    clearAuth()
  }
}

const actions = {
  // 用户登录
  async login({ commit }, loginForm) {
    const response = await login(loginForm)
    const result = response.data.result || response.data.data

    // 设置 Token
    commit('SET_TOKEN', result.token)

    // 设置用户信息
    const userInfo = mapUserInfo(result)
    commit('SET_USER_INFO', userInfo)

    return response
  },

  // 用户登出
  async logout({ commit }) {
    try {
      await logout()
    } catch (error) {
      console.error('登出接口调用失败:', error)
    } finally {
      // 无论接口是否成功,都清除本地状态
      commit('CLEAR_USER')
    }
  },

  // 获取当前登录用户信息
  async fetchUserInfo({ commit }) {
    const response = await getUserInfo()
    const result = response.data.result || response.data.data
    const userInfo = mapUserInfo(result)
    commit('SET_USER_INFO', userInfo)
    return userInfo
  },

  // 清除用户信息(不调用接口)
  clearUser({ commit }) {
    commit('CLEAR_USER')
  }
}

const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  isAuthenticated: state => state.isAuthenticated,
  username: state => state.userInfo?.username || '',
  nickname: state => state.userInfo?.nickname || state.userInfo?.username || '',
  avatar: state => state.userInfo?.avatar || ''
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
