/**
 * Pilot（导航首页）共享类型。
 *
 * 后端 /back/pilot/getList 返回的字段比这里多（deleteFlag/createTime 等），
 * 这里只声明页面实际消费的字段，避免在多个组件里重复接口定义。
 */
export interface PilotItem {
  id: string | number
  name: string
  link: string
  img?: string
  pageView?: number
  pilotTypeName?: string
}

export type PilotList = Record<string, PilotItem[]>

/** 写入 localStorage 的“最近访问/常用”条目，额外记住来源分类。 */
export interface StoredPilotItem extends PilotItem {
  category: string
}
