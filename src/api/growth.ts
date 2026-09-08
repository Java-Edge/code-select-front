/**
 * 会员成长（DDD 子域 /growth）相关 API
 * ----------------------------------------------------------------------------
 * 后端基址经 vue.config.js 的 /api/growth 代理到教育平台后端（localhost:8088），
 * 路径重写后落为 /growth/*。
 *
 * 契约（ResultBody 包络，payload 在 result 字段）：
 *   POST /growth/sign/{userId}  -> SignResultDTO(memberId,totalPoints,level,continuousDays,...)
 *   GET  /growth/{userId}       -> MemberGrowthDTO(memberId,totalPoints,level,thisMonthSignedDays)
 */
import axios from '@/axios'

// 签到：触发“加积分”动作（每日首次签到发放基础分 + 连续奖励分）
export function signGrowth(userId: number) {
  return axios({
    url: `/growth/sign/${userId}`,
    method: 'post'
  })
}

// 查询会员成长快照（积分 / 等级 / 本月签到天数）
export function getGrowth(userId: number) {
  return axios({
    url: `/growth/${userId}`,
    method: 'get'
  })
}
