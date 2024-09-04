import axios from 'axios'
import router from './router'
import { ElMessage, ElMessageBox } from 'element-plus';

axios.defaults.baseURL = "/api"
// axios.defaults.baseURL = "/"
// axios.defaults.baseURL = "http://localhost:9001/back-server/"

// 前置拦截
axios.interceptors.request.use(config => {
    // config.headers['Content-Type'] = 'application/json';
    var token = getCookieValue("token");
    config.headers['Accept'] = 'application/json';
    config.headers['token'] = token;
    return config;
}, function (error) {
    return Promise.reject(error);
})
axios.interceptors.response.use(
    (response) => {
        const { code, message } = response.data;
        if (code === 200) {
            return response;
        }
        else if (code === 402 || code === 401) {
            ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                localStorage.clear();
                router.push('/login')
            }).catch(() => {

            });
        } else {
            ElMessage.error(message || "系统出错");
        }
        // 响应数据为二进制流处理(Excel导出)
        if (response.data instanceof ArrayBuffer) {
            return response;
        }
        return Promise.reject(new Error(message || "Error"));
    },
    (error) => {
        console.log(error)
        // let { message } = error;
        // if (message == "Network Error") {
        //     message = "后端接口连接异常";
        // } else if (message.includes("timeout")) {
        //     message = "系统接口请求超时";
        // } else if (message.includes("Request failed with status code")) {
        //     message = "系统接口" + message.substr(message.length - 3) + "异常";
        // }
        // Message({ message: message, type: 'error', duration: 5 * 1000 })
        return Promise.reject(error)

    }
);

axios.interceptors.response.use(response => {
    let res = response.data;


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

//cookie只能存放KV对
let operator = "=";
//window.document.cookie可以拿到cookie所有的key=value;形式的字符串。所以从cookie拿值，遍历cookie的所有key，直到key等于keyStr，
//就可以拿到对应的值，例如我们要拿名为token的key，调用方法getCookieValue(token)就可以拿到key为token的值(value)
function getCookieValue(keyStr) {
    let value = null;
    let s = window.document.cookie;
    let arr = s.split("; ");
    for (let i = 0; i < arr.length; i++) {
        let str = arr[i];
        let k = str.split(operator)[0];
        let v = str.split(operator)[1];
        if (k === keyStr) {
            value = v;
            break;
        }
    }
    return value;
}
