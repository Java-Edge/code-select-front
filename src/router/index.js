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
import articleCreate from '../views/markdown/article-create'
import articleDetail from '../views/markdown/article-detail'
import articleList from '../views/markdown/article-list'

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
  {
    
    path: '/article-create',
    name: 'articleCreate',
    component: articleCreate
  },
  {
    path: '/article-editor/:id',
    name: 'articleEditor',
    component: articleCreate
  },
  {
    path: '/article-list',
    name: 'articleList',
    component: articleList
  },
  {
    path: '/article/:id',
    name: 'articleDetail',
    component: articleDetail
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
