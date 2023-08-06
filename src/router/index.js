/*
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-07-16 17:51:44
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-08-05 18:34:38
 */
// router.js
import { createRouter, createWebHashHistory } from 'vue-router';

import index from '../views/course';
import courseDetail from '../views/course-detail';
import articleCreate from '../views/markdown/article-create'
import articleDetail from '../views/markdown/article-detail'
import articleList from '../views/markdown/article-list'
import recruit from '../views/recruit/recruit'
import recruitDetail from '../views/recruit/recruit-detail'
import articleInterview from '../views/markdown/article-interview'
import interviewArticleDetail from '../views/markdown/interview-article-detail'
import coursePage from "../views/coursePage";
import pilotPage from "../views/category/pilot";
import specialColumn from "../views/special-column"
import login from "../views/user/login"
import ranking from "../views/ranking"

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
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
    path: '/article-list/:type',
    name: 'articleList',
    component: articleList
  },
  {
    path: '/article-interview',
    name: 'articleInterview',
    component: articleInterview
  },
  {
    path: '/article/:id',
    name: 'articleDetail',
    component: articleDetail
  },
  {
    path: '/intervieArticleDetail/:id',
    name: 'intervieArticleDetail',
    component: interviewArticleDetail
  },
  {
    path: '/recruit/index',
    name: 'recruit',
    component: recruit,
  },
  {
    path: '/recruit/:id',
    name: 'recruitDetail',
    component: recruitDetail,
  },
  {
    path: '/CoursePage',
    name: 'CoursePage',
    component: coursePage
  }
  ,
  {
    path: '/pilot',
    name: 'pilotPage',
    component: pilotPage
  },
  {
    path: '/special',
    name: 'special-column',
    component: specialColumn
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: ranking
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
