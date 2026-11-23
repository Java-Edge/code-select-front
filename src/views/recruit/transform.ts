/**
 * 招聘展示字段格式化（列表卡片与详情页共用，单一事实源）
 * ----------------------------------------------------------------------------
 * 后端存的是编码值（eduLevel / salaryType / recruitType），前端渲染前统一在此
 * 转成展示文案；此前 recruit-list 与 recruit-detail 各自维护一份相同的转换逻辑，
 * 且薪资文案写死 "* 13 薪"，已收敛并改为按 salaryMonth 实际值渲染。
 */
import type { RecruitDetail, RecruitDetailItem, RecruitDisplayItem, RecruitItem } from '@/api/recruit'

/** 公司 logo 兜底图（后端 pic_url 为 null 时使用，本地资源避免外链防盗链） */
export const DEFAULT_COMPANY_PIC = new URL('@/assets/column-logo.svg', import.meta.url).href

/** 学历编码 → 文案（与后端 education_level 字典一致，0 视为不限） */
const EDUCATION_LABELS: Record<number, string> = {
  0: '学历不限',
  4000: '大专',
  5000: '本科',
  6000: '硕士'
}

/** 招聘类型编码 → 文案（与后端 recruit_type 字典一致） */
const RECRUIT_TYPE_LABELS: Record<number, string> = {
  1: '校招',
  2: '实习',
  3: '社招'
}

export function formatEducation(level: number | null): string | undefined {
  return level === null ? undefined : EDUCATION_LABELS[level]
}

export function formatRecruitType(type: number | null): string | undefined {
  return type === null ? undefined : RECRUIT_TYPE_LABELS[type]
}

export function formatSalary(job: Pick<RecruitItem, 'salaryType' | 'salaryMin' | 'salaryMax' | 'salaryMonth'>): string {
  if (job.salaryType === 1) {
    return `${job.salaryMin}~${job.salaryMax}元/天`
  }
  if (job.salaryType === 2) {
    // 薪资月数缺省（0/null）时不虚构 "* 13 薪"
    const month = job.salaryMonth && job.salaryMonth > 0 ? ` * ${job.salaryMonth} 薪` : ''
    return `${job.salaryMin}~${job.salaryMax}k${month}`
  }
  return '薪资面谈'
}

/** 列表条目 → 展示条目（补 education / salary / recruitTypeLabel 计算字段与 logo 兜底） */
export function toDisplayItem(job: RecruitItem): RecruitDisplayItem {
  return {
    ...job,
    education: formatEducation(job.eduLevel),
    salary: formatSalary(job),
    recruitTypeLabel: formatRecruitType(job.recruitType),
    picUrl: job.picUrl ?? DEFAULT_COMPANY_PIC
  }
}

/** 详情（RecruitEntity）→ 展示条目，纯文本换行转 <br/> 供 v-html 渲染 */
export function toDisplayDetail(job: RecruitDetail): RecruitDetailItem {
  return {
    ...toDisplayItem(job),
    graduationYear: job.graduationYear,
    content: sanitizeRichText(job.content),
    requirements: sanitizeRichText(job.requirements)
  }
}

/** v-html 内容最小安全处理：去 script/style 与事件属性，纯文本换行转 <br/> */
function sanitizeRichText(html: string | null): string | null {
  if (!html) return null
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/\n/g, '<br/>')
}
