/**
 * 用户状态管理模块
 */
import { login, logout, getUserInfo } from '@/api/user'
import { signGrowth, getGrowth } from '@/api/growth'
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
  isAuthenticated: !!getToken(),
  // 会员成长快照（来自 /growth 子域）：登录后由签到动作写入，个人中心读取展示
  growth: {
    totalPoints: 0,
    level: 1,
    thisMonthSignedDays: 0
  }
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
  SET_GROWTH(state, growth) {
    state.growth = { ...state.growth, ...growth }
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
  async login({ commit, dispatch }, loginForm) {
    const response = await login(loginForm)
    const result = response.data.result || response.data.data

    // 设置 Token
    commit('SET_TOKEN', result.token)

    // 设置用户信息
    const userInfo = mapUserInfo(result)
    commit('SET_USER_INFO', userInfo)

    // 登录即触发会员成长“加积分”动作（签到），并加载积分快照供个人中心展示。
    // 即使后端当日已签到/签到异常，也不阻塞登录主流程。
    if (userInfo.id) {
      dispatch('triggerGrowthOnLogin', userInfo.id)
    }

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

  // 登录成功后触发：签到加积分（best-effort）+ 拉取最新成长快照
  async triggerGrowthOnLogin({ dispatch }, userId) {
    // 先签到触发加积分；已签到/异常均忽略，不阻断主流程
    try {
      await signGrowth(userId)
    } catch (e) {
      // 当日已签到或后端异常：忽略，交由下方取数拿到当前真实积分
    }
    // 再拉取权威快照写入 state（个人中心直接读取，无需重复请求）
    try {
      await dispatch('fetchGrowth')
    } catch (e) {
      console.warn('加载会员成长信息失败:', e)
    }
  },

  // 拉取会员成长快照（积分/等级/本月签到天数），写入 state.growth
  // 刷新后 userInfo 可能为空，故先确保 userInfo 存在再取数
  async fetchGrowth({ commit, dispatch, getters }) {
    let userInfo = getters['user/userInfo']
    if (!userInfo || !userInfo.id) {
      userInfo = await dispatch('fetchUserInfo')
    }
    if (!userInfo || !userInfo.id) {
      return null
    }
    const response = await getGrowth(userInfo.id)
    const result = response.data.result || response.data.data
    commit('SET_GROWTH', {
      totalPoints: result.totalPoints,
      level: result.level,
      thisMonthSignedDays: result.thisMonthSignedDays
    })
    return result
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
  avatar: state => state.userInfo?.avatar || '',
  growthPoints: state => state.growth?.totalPoints ?? 0,
  growthLevel: state => state.growth?.level ?? 1,
  growthThisMonthSignedDays: state => state.growth?.thisMonthSignedDays ?? 0
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
