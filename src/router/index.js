/*
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-05-27 19:36:25
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-07-08 15:39:31
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import index from "../views/course"
import courseDetail from "../views/course-detail"
Vue.use(VueRouter)

const routes = [
    {
        path: '/index',
        name: 'index',
        component: index
    },
    {
        path: '/product/:id',
        name: 'courseDetail',
        component: courseDetail
    }

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
