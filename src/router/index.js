import {
  createRouter,
  createWebHashHistory
} from "vue-router";

const loadComponent = (componentName) => () =>
  import(`@/views/${componentName}.vue`);

const routes = [{
    path: "/",
    name: "index",
    redirect: "/index",
  },
  // {
  //   path: "/images",
  //   name: "images",
  //   component: loadComponent("images-show"),
  // },
  {
    path: "/index",
    name: "index",
    component: loadComponent("course"),
  },
  {
    path: "/course/:id",
    name: "courseDetail",
    component: loadComponent("video/video-detail"),
  },
  {
    path: "/article-create",
    name: "articleCreate",
    component: loadComponent("markdown/article-create"),
  },
  // {
  //   path: "/article-editor/:id",
  //   name: "articleEditor",
  //   component: loadComponent("markdown/article-create"),
  // },
  {
    path: "/article-list",
    name: "articleList",
    component: loadComponent("markdown/article-list"),
  },
  {
    path: "/article-interview",
    name: "articleInterview",
    component: loadComponent("markdown/article-interview"),
  },
  // {
  //   path: "/inner-recommend",
  //   name: "innerRecommend",
  //   component: loadComponent("innerRecommend/inner-recommend"),
  // },
  // {
  //   path: "/innerRecommendDetail/:id",
  //   name: "innerRecommendDetail",
  //   component: loadComponent("innerRecommend/inner-recommend-detail"),
  // },
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
    component: loadComponent("pilot/pilot"),
  },
  {
    path: "/special",
    name: "special-column",
    component: loadComponent("special-column/index"),
  },
  {
    path: "/video",
    name: "video",
    component: loadComponent("video/index"),
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
  // {
  //   path: "/download",
  //   name: "download",
  //   component: loadComponent("download/index"),
  // },
  // {
  //   path: "/discussion",
  //   name: "discussion",
  //   component: loadComponent("discussion/discussion-list"),
  // },
  // {
  //   path: "/discussion-detail/:id",
  //   name: "discussion-detail",
  //   component: loadComponent("discussion/discussion-detail"),
  // }
];
// 新建路由实例
const router = createRouter({
  // 配置内部使用hash模式的路由，即url上会通过 `#` 区分
  history: createWebHashHistory(),
  routes,
});

export default router;