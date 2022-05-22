import axios from 'axios'
import router from '../router/index'
import { BASE_URL } from './config'

axios.defaults.timeout = 5000 // 超时时间设置
axios.defaults.withCredentials = true // true允许跨域时带上token
axios.defaults.baseURL = BASE_URL;// 请求头带上token
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次请求前做一些操作
    config.headers.UID = JSON.parse(window.localStorage.getItem('uid'))
    config.headers.Authorization = JSON.parse(window.localStorage.getItem('token'))
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200 || response.status===201) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        case 401:
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 403:
          // console.log('管理员权限已修改请重新登录')
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break

        // 404请求不存在
        case 404:
          console.log('请求页面飞到火星去了')
          break
      }
      return Promise.reject(error.response)
    }
  }
)

/* 
封装方法
*/
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(
      response => { resolve(response) },
      error => { reject(error) }
    )
  })
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(
      response => { resolve(response.data) }
    ).catch(error => { reject(error) })
  })
}
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(
      response => { resolve(response.data) }
    ).catch(error => { reject(error) })
  })
}