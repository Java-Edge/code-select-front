import type { AxiosResponse } from 'axios'
import request from '@/axios'
import type { ApiResponse } from '@/types/api'
import type { PagedResult } from '@/composables/usePagedList'

/**
 * 招聘板块契约（对齐后端 RecruitController / RecruitQO / RecruitVO）
 * ----------------------------------------------------------------------------
 * - 列表：POST /back/recruit/selectByCondition（PageQueryParam<RecruitQO> -> IPage<RecruitVO>）
 * - 详情：GET /back/recruit/getById/{id}（RecruitEntity，比 VO 多 content/requirements 等）
 * - 后端 selectByCondition 未登录时返回空页，故页面路由均要求登录
 */

/** 职位列表条目（对齐 RecruitVO） */
export interface RecruitItem {
  id: string
  /** 职位名称 */
  title: string
  /** 工作城市（后端已按 SUBSTRING_INDEX 截取首个） */
  jobCity: string | null
  /** 学历要求：0 学历不限 / 4000 大专 / 5000 本科 / 6000 硕士 */
  eduLevel: number | null
  /** 招聘类型（字典 recruit_type）：1 校招 / 2 实习 / 3 社招 */
  recruitType: number | null
  /** 薪资类型：0 面谈 / 1 元/天 / 2 k * N 薪 */
  salaryType: number | null
  salaryMin: number | null
  salaryMax: number | null
  /** 薪资月数（salaryType=2 时的 "* N 薪"，0/缺省视为未提供） */
  salaryMonth: number | null
  /** 公司 logo（可能为 null，展示层需兜底图） */
  picUrl: string | null
  companyName: string
  /** 融资阶段标签 */
  scaleTagName: string | null
  /** 公司规模标签 */
  personScales: string | null
  /** 原始投递链接（可能为 null，为 null 时不可投递） */
  sourceUrl: string | null
}

/** 职位详情（对齐 RecruitEntity，getById 返回） */
export interface RecruitDetail extends RecruitItem {
  /** 岗位描述（纯文本换行，展示层转 <br/>） */
  content: string | null
  /** 岗位要求（纯文本换行，展示层转 <br/>） */
  requirements: string | null
  /** 毕业年份要求 */
  graduationYear: string | null
}

/** 列表/详情展示用的计算字段（前端根据 eduLevel / salaryType / recruitType 格式化） */
export interface RecruitDisplayFields {
  education?: string
  salary?: string
  recruitTypeLabel?: string
}

export type RecruitDisplayItem = RecruitItem & RecruitDisplayFields
export type RecruitDetailItem = RecruitDetail & RecruitDisplayFields

/** 列表筛选条件（对齐后端 RecruitQO 字段） */
export interface RecruitQueryParam {
  eduLevel?: number[] | null
  graduateYear?: number[] | null
  personScale?: number[] | null
  salaryRange?: number[] | null
  scaleTag?: number[] | null
  recruitType?: number[] | null
  salaryType?: number
  /** 工作城市（后端按 SUBSTRING_INDEX(job_city,',',1) 精确匹配首段；'全国'/空 = 不过滤） */
  jobCity?: string
  keyword?: string
}

export const recruitApi = {
  /** 分页条件查询职位列表 */
  selectByCondition(params: {
    pageNo: number
    pageSize: number
    param: RecruitQueryParam
  }): Promise<AxiosResponse<ApiResponse<PagedResult<RecruitItem>>>> {
    return request({
      url: '/back/recruit/selectByCondition',
      method: 'post',
      data: params
    })
  },

  /** 职位详情 */
  getById(id: string): Promise<AxiosResponse<ApiResponse<RecruitDetail>>> {
    return request({
      url: `/back/recruit/getById/${id}`,
      method: 'get'
    })
  }
}
