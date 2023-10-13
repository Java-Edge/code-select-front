/*
 * @Descripttion:
 * @version:
 * @Author: 不败顽童
 * @Date: 2023-05-07 18:40:19
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-08-17 22:48:11
 */
import axios from 'axios'
// import QS from 'qs';
import router from './router'

axios.defaults.baseURL = "/api"
// axios.defaults.baseURL = "/"
// axios.defaults.baseURL = "http://localhost:9001/back-server/"

// 前置拦截
axios.interceptors.request.use(config => {
    // config.headers['Content-Type'] = 'application/json';
    var token = getCookieValue("token");
    config.headers['Accept'] = 'application/json';
    config.headers['token'] = token;
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
        return response
    } else if (res.code === 401) {
        // this.$message.success(res.message);
        router.push("/login")
        return Promise.reject(res.message)
    } else if (res.code === 402) {
        // this.$message({
        //     type: 'fail',
        //     message: response.data.message
        // });
        router.push("/login")
        return Promise.reject(res.message)
    } else if (res.code == 403) {
        router.push("/login")
        return Promise.reject(res.message)
    } else if (res.code === 400001) {
        // this.$message.error( response.data.message)
        return response
    } else if (res.code === 400002) {
        // this.$message.error( response.data.message)
        return response
    } else if(res.code === 400003) {
        // this.$message.error( response.data.message)
        return response
    } else {
        return Promise.reject(res.message)
    }
},
)

//cookie只能存放键值对
var operator = "=";
//window.document.cookie可以拿到cookie所有的key=value;形式的字符串。所以从cookie拿值，遍历cookie的所有key，直到key等于keyStr，
//就可以拿到对应的值，例如我们要拿名为token的key，调用方法getCookieValue(token)就可以拿到key为token的值(value)
function getCookieValue(keyStr) {
    var value = null;
    var s = window.document.cookie;
    var arr = s.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        var k = str.split(operator)[0];
        var v = str.split(operator)[1];
        if (k == keyStr) {
            value = v;
            break;
        }
    }
    return value;
}
