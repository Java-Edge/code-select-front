import type { AxiosResponse } from 'axios'
import request from '@/axios'
import type { ApiResponse } from '@/types/api'

/**
 * 学习路线契约（混合持久化：MySQL 事实源 + Neo4j 派生只读图）
 * ----------------------------------------------------------------------------
 * - LearningPathStep：Neo4j 图查询结果（GET /graph/learning-path/{roadMapId}），
 *   由 RoadMap-[:NEXT_STEP]->RoadMapDetail-[:REFERENCES]->Course 一跳遍历产出，
 *   字段名与后端 Cypher RETURN 别名（seq/detailId/detailTitle/courseId/
 *   courseName/courseType/courseUrl）一一对应；OPTIONAL MATCH 缺关联课程时为 null。
 * - RoadMapSummary：MySQL roadmap 表元数据（标题/描述/步骤数），供路线选择与
 *   页面标题使用——图接口只返回步骤明细，不带路线自身属性。
 */
export interface LearningPathStep {
  seq: number | null
  detailId: number | null
  detailTitle: string | null
  courseId: number | null
  courseName: string | null
  /** 0 = 视频，1 = 专栏（source_course.type） */
  courseType: number | null
  /** 课程真实外链（source_course.source_url，生产真实数据；个别课程库中为空） */
  courseUrl: string | null
}

export interface RoadMapSummary {
  id: number
  title: string
  description?: string
  step?: number
  course?: number
  collect?: number
  categoryId?: number
  img?: string
}

export const roadmapApi = {
  /**
   * 图查询：学习路线按序展开（Neo4j 遍历，替代 MySQL 多表 join + 内存排序）
   * 未知路线返回空数组而非报错（后端优雅降级）
   */
  getLearningPath(roadMapId: number): Promise<AxiosResponse<ApiResponse<LearningPathStep[]>>> {
    return request({
      url: `/back/graph/learning-path/${roadMapId}`,
      method: 'get'
    })
  },

  /** 路线元数据（标题/描述），来自 MySQL 事实源 */
  getRoadMapById(roadMapId: number): Promise<AxiosResponse<ApiResponse<RoadMapSummary>>> {
    return request({
      url: `/back/roadmap/getRoadMapById/${roadMapId}`,
      method: 'get'
    })
  },

  /** 全量路线列表（按 categoryId 分组），用于数据驱动的路线选择器 */
  getAll(): Promise<AxiosResponse<ApiResponse<Record<string, RoadMapSummary[]>>>> {
    return request({
      url: '/back/roadmap/getAll',
      method: 'get'
    })
  },

  /**
   * 课程详情（顺带由后端 LogAspect.calPageView 维护 page_view）。
   * 课程卡跳转外链前 fire-and-forget 调用，与专栏卡浏览量上报模式一致。
   */
  bumpCoursePv(courseId: number): Promise<AxiosResponse<ApiResponse<unknown>>> {
    return request({
      url: `/back/course/video/${courseId}`,
      method: 'get'
    })
  }
}
