/**
 * 后端接口契约类型（单一事实源）
 * ----------------------------------------------------------------------------
 * ApiResponse<T> 与 src/axios.ts 响应拦截器的消费字段一一对应：
 * - code / message：拦截器判定业务成败（非 200 一律 reject，消费侧只见成功响应）
 * - result        ：业务 payload 主字段（pilot / interview / career / company /
 *                   special / growth / user 等接口均用此字段），故设为非可选——
 *                   非 200 响应已被拦截器拒绝，消费侧恒可安全读取
 * - data          ：业务 payload 备用字段（checkUsername 等个别接口使用；
 *                   user / growth 读取时以 `result || data` 兜底），故为可选
 */

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  result: T
  data?: T
}

/**
 * 后端用户契约（宽松：可选字段在后端缺省时由 mapUserInfo 兜底为空串）
 */
export interface BackendUser {
  id: number
  username?: string
  nickname?: string
  avatar?: string
  token?: string
}

/**
 * 会员成长快照契约（GET /growth/{userId} -> MemberGrowthDTO）
 */
export interface GrowthInfo {
  memberId?: number
  totalPoints: number
  level: number
  thisMonthSignedDays: number
}
