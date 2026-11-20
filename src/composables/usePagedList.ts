import { ref, type Ref } from 'vue'

/**
 * 列表分页通用 composable —— 收敛 page / size / total / list / loading 与翻页样板。
 *
 * 设计要点（刻意避免改变既有行为）：
 * - 两个列表页的 param 结构差异很大（article-interview 每次按筛选条件重建请求体；
 *   special-column 维护一个持久的 queryParams 对象，且被 updatePageView 复用），
 *   因此本 composable 不约束 param 形状，只负责分页参数与结果落库。
 * - fetchFn 签名：(pager: { pageNo, pageSize }, extraParam?: object)
 *     => Promise<{ records: any[], total: number }>
 *   由调用方在 fetchFn 内部把分页参数拼装进各自请求体；extraParam 用于筛选时
 *   透传额外条件。load/applyFilters 会记住最近一次 extraParam，changePage 复用
 *   它，因此「筛选 → 翻页」不再丢失筛选；applyFilters 额外负责回到第一页。
 *   load 内部捕获异常并落库 error 状态（不再向调用方抛出），页面据此展示失败与重试。
 */

export interface Pager {
  pageNo: number
  pageSize: number
}

export interface PagedResult<T = unknown> {
  records: T[]
  total: number
}

export type FetchFn<T = unknown> = (
  pager: Pager,
  extraParam?: Record<string, unknown>
) => Promise<PagedResult<T>>

export interface UsePagedListOptions {
  pageSize?: number
  initialPage?: number
}

export interface UsePagedListReturn<T = unknown> {
  page: Ref<number>
  size: Ref<number>
  total: Ref<number>
  list: Ref<T[]>
  loading: Ref<boolean>
  /** 最近一次请求的错误信息；成功后清空 */
  error: Ref<string | null>
  load: (extraParam?: Record<string, unknown>) => Promise<void>
  /** 应用新的筛选条件：回到第一页并加载（筛选必须走这里，而非直接 load） */
  applyFilters: (extraParam?: Record<string, unknown>) => Promise<void>
  changePage: (currentPage: number) => Promise<void>
  reset: (currentPage?: number) => Promise<void>
}

export function usePagedList<T = unknown>(
  fetchFn: FetchFn<T>,
  options: UsePagedListOptions = {}
): UsePagedListReturn<T> {
  const page: Ref<number> = ref(options.initialPage ?? 1)
  const size: Ref<number> = ref(options.pageSize ?? 10)
  const total: Ref<number> = ref(0)
  const list: Ref<T[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  // 最近一次筛选条件：翻页时复用，修复「翻页丢失筛选」的既有缺陷
  let lastExtraParam: Record<string, unknown> = {}
  // 请求序号：只应用最后一次请求的结果，防止慢响应覆盖新结果（竞态守卫）
  let requestSeq = 0

  const load = async (extraParam: Record<string, unknown> = {}): Promise<void> => {
    lastExtraParam = extraParam
    const seq = ++requestSeq
    loading.value = true
    try {
      const { records, total: t } = await fetchFn(
        { pageNo: page.value, pageSize: size.value },
        extraParam
      )
      // 过期响应：已有更新的请求在途，丢弃本次结果
      if (seq !== requestSeq) return
      list.value = records
      total.value = t
      error.value = null
    } catch (e) {
      // 不向上抛出：历史调用方（三个列表页）均未捕获 load 的 rejection，
      // 改为落库 error 状态，由页面读取并展示「失败 + 重试」
      if (seq === requestSeq) {
        error.value = e instanceof Error ? e.message : '加载失败，请稍后重试'
      }
    } finally {
      // 过期请求不回收 loading：仍由最新请求负责收尾
      if (seq === requestSeq) {
        loading.value = false
      }
    }
  }

  /** 应用新的筛选条件：回到第一页并加载（筛选动作必须走这里） */
  const applyFilters = (extraParam: Record<string, unknown> = {}): Promise<void> => {
    page.value = 1
    return load(extraParam)
  }

  const changePage = (currentPage: number): Promise<void> => {
    page.value = currentPage
    // 复用最近一次筛选条件，翻页不再丢失筛选
    return load(lastExtraParam)
  }

  const reset = (currentPage = 1): Promise<void> => {
    page.value = currentPage
    // 清空筛选：丢弃最近一次筛选条件
    lastExtraParam = {}
    return load({})
  }

  return { page, size, total, list, loading, error, load, applyFilters, changePage, reset }
}
