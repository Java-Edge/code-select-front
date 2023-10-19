/*
 * @Descripttion:
 * @version:
 * @Author: 不败顽童
 * @Date: 2023-07-16 17:51:44
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-08-05 18:34:38
 */
// router.js
import { createRouter, createWebHashHistory } from "vue-router";

const loadComponent = (componentName) => () =>
  import(`@/views/${componentName}.vue`);
const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "index",
    component: loadComponent("course"),
  },
  {
    path: "/course/:id",
    name: "courseDetail",
    component: loadComponent("course-detail"),
  },
  {
    path: "/article-create",
    name: "articleCreate",
    component: loadComponent("markdown/article-create"),
  },
  {
    path: "/article-editor/:id",
    name: "articleEditor",
    component: loadComponent("markdown/article-create"),
  },
  {
    path: "/article-list/:type",
    name: "articleList",
    component: loadComponent("markdown/article-list"),
  },
  {
    path: "/article-interview",
    name: "articleInterview",
    component: loadComponent("markdown/article-interview"),
  },
  {
    path: "/inner-recommend",
    name: "innerRecommend",
    component: loadComponent("markdown/inner-recommend"),
  },
  {
    path: "/article/:id",
    name: "articleDetail",
    component: loadComponent("markdown/article-detail"),
  },
  {
    path: "/intervieArticleDetail/:id",
    name: "intervieArticleDetail",
    component: loadComponent("markdown/interview-article-detail"),
  },
  {
    path: "/recruit/index",
    name: "recruit",
    component: loadComponent("recruit/recruit"),
  },
  {
    path: "/recruit/:id",
    name: "recruitDetail",
    component: loadComponent("recruit/recruit-detail"),
  },
  {
    path: "/CoursePage",
    name: "CoursePage",
    component: loadComponent("coursePage"),
  },
  {
    path: "/pilot",
    name: "pilotPage",
    component: loadComponent("category/pilot"),
  },
  {
    path: "/special",
    name: "special-column",
    component: loadComponent("special-column/index"),
  },
  {
    path: "/login",
    name: "login",
    component: loadComponent("user/login"),
  },
  {
    path: "/ranking",
    name: "ranking",
    component: loadComponent("ranking/index"),
  },
  {
    path: "/projectDetail/:id",
    name: "/projectDetail",
    component: loadComponent("project/project-detail"),
  },
  {
    path: "/projectList",
    name: "/projectList",
    component: loadComponent("project/project-list"),
  },
  {
    path: "/sidelineDetail/:id",
    name: "/sidelineDetail",
    component: loadComponent("sideline/sideline-detail"),
  },
  {
    path: "/sidelineList",
    name: "/sidelineList",
    component: loadComponent("sideline/sideline-list"),
  },
  {
    path: "/study-list",
    name: "/studyList",
    component: loadComponent("study/list"),
  },
  {
    path: "/study-detail/:id",
    name: "/studyDetail",
    component: loadComponent("study/detail"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
