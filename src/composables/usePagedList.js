import { ref } from 'vue'

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
 *   透传额外条件，翻页动作不携带 extraParam（保持"筛选后保留当前页"的既有行为）。
 *
 * @param {(pager:{pageNo:number,pageSize:number}, extraParam?:object) => Promise<{records:any[], total:number}>} fetchFn
 * @param {{ pageSize?: number, initialPage?: number }} [options]
 */
export function usePagedList(fetchFn, options = {}) {
  const page = ref(options.initialPage ?? 1)
  const size = ref(options.pageSize ?? 10)
  const total = ref(0)
  const list = ref([])
  const loading = ref(false)

  const load = async (extraParam = {}) => {
    loading.value = true
    try {
      const { records, total: t } = await fetchFn(
        { pageNo: page.value, pageSize: size.value },
        extraParam
      )
      list.value = records
      total.value = t
    } finally {
      loading.value = false
    }
  }

  const changePage = (currentPage) => {
    page.value = currentPage
    return load()
  }

  const reset = (currentPage = 1) => {
    page.value = currentPage
    return load()
  }

  return { page, size, total, list, loading, load, changePage, reset }
}
