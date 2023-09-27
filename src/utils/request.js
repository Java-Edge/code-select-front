import axios from "axios";

import router from "@/router";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 前置拦截
service.interceptors.request.use(
  (config) => {
    var token = getCookieValue("token");
    config.headers["Accept"] = "application/json";
    config.headers["token"] = token;
    return config;
  },
  function (error) {
    console.log("error!!!");
    return Promise.reject(error);
  }
);

service.interceptors.response.use((response) => {
  let res = response.data;

  if (res.code === 200) {
    return response;
  } else if (res.code === 401) {
    router.push("/login");
    return Promise.reject(res.message);
  } else if (res.code === 402) {
    router.push("/login");
    return Promise.reject(res.message);
  } else if (res.code === 400001) {
    // this.$message.error( response.data.message)
    return response;
  } else if (res.code === 400002) {
    // this.$message.error( response.data.message)
    return response;
  } else if (res.code === 400003) {
    // this.$message.error( response.data.message)
    return response;
  } else {
    return Promise.reject(res.message);
  }
});

var operator = "=";

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
export default service;
