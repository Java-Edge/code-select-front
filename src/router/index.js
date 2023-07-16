/*
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-07-16 17:51:44
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-07-16 18:19:22
 */
// router.js
import { createRouter, createWebHashHistory } from 'vue-router';

import index from '../views/course';
import courseDetail from '../views/course-detail';

const routes = [
  {
    path: '/index',
    name: 'index',
    component: index,
  },
  {
    path: '/course/:id',
    name: 'courseDetail',
    component: courseDetail,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
