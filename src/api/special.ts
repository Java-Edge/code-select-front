import type { AxiosResponse } from 'axios'
import request from '@/axios'
import type { ApiResponse } from '@/types/api'
import type { PagedResult } from '@/composables/usePagedList'
import type { SpecialItem } from '@/views/special-column/index.vue'

export const specialApi = {
  // 搜索专栏
  search(params: Record<string, unknown>): Promise<AxiosResponse<ApiResponse<PagedResult<SpecialItem>>>> {
    return request({
      url: '/back/course/special/search',
      method: 'post',
      data: params
    })
  },

  // 更新浏览量
  updatePageView(params: Record<string, unknown>): Promise<AxiosResponse<ApiResponse<unknown>>> {
    return request({
      url: '/back/course/special/pv',
      method: 'post',
      data: params
    })
  }
}
