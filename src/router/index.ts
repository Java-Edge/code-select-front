import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { AUTH_REQUIRED_PATHS, ROUTE_PATHS } from '@/config/constants'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: ROUTE_PATHS.LOGIN
  },

  {
    path: ROUTE_PATHS.HOME,
    name: 'home',
    component: () => import('../views/pilot/pilot.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: ROUTE_PATHS.LOGIN,
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },

  {
    path: ROUTE_PATHS.ARTICLE_INTERVIEW,
    name: 'articleInterview',
    component: () => import('../views/markdown/article-interview.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: ROUTE_PATHS.ARTICLE_DETAIL,
    name: 'intervieArticleDetail',
    component: () => import('../views/markdown/interview-article-detail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: ROUTE_PATHS.SPECIAL,
    name: 'special-column',
    component: () => import('../views/special-column/index.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: ROUTE_PATHS.PROFILE,
    name: 'profile',
    component: () => import('../views/profile/profile-page.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/**
 * 全局路由守卫
 * 检查用户是否已登录,未登录则重定向到登录页
 */
router.beforeEach((to, from, next) => {
  // 检查路由是否需要登录
  const requiresAuth = to.meta.requiresAuth || AUTH_REQUIRED_PATHS.includes(to.path)

  if (requiresAuth) {
    // 检查是否已登录
    const isAuthenticated = store.getters['user/isAuthenticated']

    if (!isAuthenticated) {
      // 未登录,重定向到登录页,并记录原本要访问的路径
      next({
        path: ROUTE_PATHS.LOGIN,
        query: { redirect: to.fullPath }
      })
    } else {
      // 已登录,放行
      next()
    }
  } else {
    // 不需要登录的路由,直接放行
    next()
  }
})

export default router
