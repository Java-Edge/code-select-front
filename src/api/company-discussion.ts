import type { AxiosResponse } from 'axios'
import request from '@/axios'
import type { ApiResponse } from '@/types/api'
import type { PagedResult } from '@/composables/usePagedList'

/**
 * 公司舆情条目契约（POST /back/company-discussion/selectByCondition -> CompanyDiscussionVO）
 * ----------------------------------------------------------------------------
 * 后端列表 SQL 当前只返回 contentId/companyName/content(前100字符)/createTime，
 * title/authDisplayInfo/contentUrl 可能为 null，消费侧需判空展示。
 */
export interface CompanyDiscussionItem {
  /** 内容id */
  contentId: string
  /** 公司名称 */
  companyName: string
  /** 标题（后端暂未返回，可能为 null） */
  title: string | null
  /** 正文摘要（后端截断至前 100 字符） */
  content: string
  /** 创建时间 */
  createTime: string
  /** 展示来源平台（脉脉/知乎/头条号/抖音等，可能为 null） */
  authDisplayInfo: string | null
  /** 原文链接（可能为 null） */
  contentUrl: string | null
  /** 数据来源平台（牛客/知乎/脉脉，旧数据可能为 null） */
  source: string | null
  /** 点赞数（可能为 null） */
  likeCount: number | null
  /** 评论数（可能为 null） */
  commentCount: number | null
}

/** 舆情分页查询条件（对齐后端 InnerRecommendQueryDTO） */
export interface CompanyDiscussionQueryParam {
  /** 搜索内容（命中标题/正文/公司名） */
  keyword?: string
  /** 公司筛选条件 */
  company?: string[]
}

export const companyDiscussionApi = {
  /** 分页查询公司舆情 */
  search(params: {
    pageNo: number
    pageSize: number
    param: CompanyDiscussionQueryParam
  }): Promise<AxiosResponse<ApiResponse<PagedResult<CompanyDiscussionItem>>>> {
    return request({
      url: '/back/company-discussion/selectByCondition',
      method: 'post',
      data: params
    })
  },

  /** 公司下拉选项（与面经页同一数据源） */
  getCompanyList(): Promise<AxiosResponse<ApiResponse<string[]>>> {
    return request({
      url: '/back/company/getList',
      method: 'get'
    })
  }
}
