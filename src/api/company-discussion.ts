import type { AxiosResponse } from 'axios'
import request from '@/axios'
import type { ApiResponse } from '@/types/api'
import type { PagedResult } from '@/composables/usePagedList'

/**
 * 公司舆情条目契约（POST /back/company-discussion/selectByCondition -> CompanyDiscussionVO）
 * ----------------------------------------------------------------------------
 * companyName / topic 均为「多值逗号分隔」字符串，展示前需自行 split，
 * 例如 companyName = '阿里云,阿里巴巴'、topic = '裁员,业务经营'。
 * title/authDisplayInfo/contentUrl/source 旧数据可能为 null，消费侧需判空。
 */
export interface CompanyDiscussionItem {
  /** 内容id */
  contentId: string
  /** 公司名称，多值逗号分隔 */
  companyName: string | null
  /** 话题标签，多值逗号分隔（裁员/薪资/组织架构/业务经营/福利待遇） */
  topic: string | null
  /** 标题（可能为 null） */
  title: string | null
  /** 正文摘要（后端截断至前 300 字符） */
  content: string
  /** 创建时间 */
  createTime: string
  /** 作者展示信息（认证头衔/媒体域名等，可能为 null） */
  authDisplayInfo: string | null
  /** 原文链接（可能为 null） */
  contentUrl: string | null
  /** 数据来源平台（牛客/知乎/脉脉/头条号/抖音，旧数据可能为 null） */
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
  /** 公司筛选条件（多选，任一命中即可） */
  company?: string[]
  /** 话题筛选条件（单选） */
  topic?: string
  /** 内容起始时间（yyyy-MM-dd），用于剔除过期舆情；不传表示不限 */
  startTime?: string
}

/** 公司热帖分组：一家公司 + 各平台近两年最热的 Top10 */
export interface CompanyHotGroup {
  /** 公司名 */
  companyName: string
  /** 本组实际返回条数 */
  total: number
  /** 各平台 Top10（按平台固定顺序、平台内按热度降序） */
  items: CompanyDiscussionItem[]
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

  /** 公司分组热帖墙（分页维度是公司数） */
  getHotGroups(params: {
    pageNo: number
    pageSize: number
    param: CompanyDiscussionQueryParam
  }): Promise<AxiosResponse<ApiResponse<PagedResult<CompanyHotGroup>>>> {
    return request({
      url: '/back/company-discussion/hotGroups',
      method: 'post',
      data: params
    })
  },

  /** 公司下拉选项（取自舆情库实际出现过的公司，按热度降序） */
  getCompanies(): Promise<AxiosResponse<ApiResponse<string[]>>> {
    return request({
      url: '/back/company-discussion/companies',
      method: 'get'
    })
  },

  /** 话题筛选项（裁员/薪资/组织架构/业务经营/福利待遇，按热度降序） */
  getTopics(): Promise<AxiosResponse<ApiResponse<string[]>>> {
    return request({
      url: '/back/company-discussion/topics',
      method: 'get'
    })
  }
}
