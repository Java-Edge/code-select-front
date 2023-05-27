/*
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-05-07 18:40:19
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-05-27 18:26:28
 */
import axios from 'axios'
import Element from 'element-ui'
// import QS from 'qs';
import router from './router'

// axios.defaults.baseURL = "http://106.52.239.29:9001/back-server/"
axios.defaults.baseURL = "/back-server"
// axios.defaults.baseURL = "http://localhost:9001/back-server/"

// 前置拦截
axios.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    //
    // // if (window.location.pathname != "/user/login") {
    // //     config.headers['Authorization'] = localStorage.getItem("token");
    // // }
    // if (config.method === 'post') {
    //     config.data = QS.stringify({
    //         ...config.data  // 将参数变成  a=xx&b=xx&c=xx这样的参数列表
    //     });
    // }

    return config;
}, function (error) {
    console.log('error!!!');
    return Promise.reject(error);
})

axios.interceptors.response.use(response => {
        let res = response.data;

        console.log("=================")
        console.log(res)
        console.log("=================")

        if (res.code === 200) {
            //Element.Message.success(res.message, {duration: 3 * 1000})
            return response
        } else if(res.code === 401){
            Element.Message.error(res.message, {duration: 3 * 1000})
            router.push("/login")
            return Promise.reject(res.message)
        }else {
            Element.Message.error(res.message, {duration: 3 * 1000})
            return Promise.reject(res.message)
        }
    },
)