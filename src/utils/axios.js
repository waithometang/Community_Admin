import axios from 'axios';

import {
    Message
} from 'element-ui'
// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//msg 
export class msg {
    success(msg) {
        Message({
            showClose: true,
            message: msg,
            type: 'success'
        })
    }
    fail(msg) {
        Message({
            showClose: true,
            message: msg,
            type: 'warning'
        })
    }
}

//axios

//全局定义请求超时间隔
axios.defaults.timeout = 6000

//defaults url
axios.defaults.baseURL = 'http://127.0.0.1:3000'
    /*
     * 响应结构：{
     *              data:{msg:"xxx",xxx:xxx}
     *           }
     *   status: 200 成功
     *           400 失败
     *           500 服务器错误
     *
     */
axios.interceptors.request.use(config => {
    NProgress.start();
    NProgress.done();
    return config;
})

axios.interceptors.response.use(res => {
    if (res.request.status == 200 && res.data.code == 200) return res.data;
    else {
        return Promise.reject(res.data.msg)
    }
})

export function get(params, url) {
    return axios.get(url, {
        params: params
    })
}

export function post(params, url) {
    return axios.post(url, params)
}