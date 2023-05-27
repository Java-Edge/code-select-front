import request from '@/axios'

export const specialApi = {
  // 搜索专栏
  search(params) {
    return request({
      url: '/back/course/special/search',
      method: 'post',
      data: params
    })
  },
  
  // 更新浏览量
  updatePageView(params) {
    return request({
      url: '/back/course/special/pv',
      method: 'post',
      data: params
    })
  }
} 