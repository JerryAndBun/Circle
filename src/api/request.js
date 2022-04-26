import axios from 'axios'
import router from '../router/index'
import { BASE_URL } from './config'

axios.defaults.timeout = 5000 // 超时时间设置
axios.defaults.withCredentials = true // true允许跨域

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

//请求拦截器
axios.interceptors.request.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    // 服务器状态码不是2开头的的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                //401未登录，权限不足
                case 401:
                    console.log('还未登录');
                    router.replace({
                        path: '/login'
                    })
                    break
                case 403:
                    // console.log('管理员权限已修改请重新登录')
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/main',
                            // query: {
                            //     redirect: router.currentRoute.fullPath
                            // }
                        })
                    }, 1000)
                    break
                case 404:
                    console.log('请求页面飞到火星去了')
                    break
            }
            return Promise.reject(error.response)
        }
    }
)



/* 
封装get方法
*/
export function get (url, params = {}, responseType = 'json') {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      responseType
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}