import axios from 'axios'
import router from '../router/index'
import { BASE_URL } from './config'

// axios.defaults.timeout = 5000 // 超时时间设置
axios.defaults.withCredentials = true // true允许跨域时带上token

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = BASE_URL;
/* 
封装get方法
*/
// export function get(url, params) {
//   return new Promise((resolve, reject) => {
//     axios.get(url, {
//       params
//       // responseType
//     })
//       .then(response => {
//         resolve(response.data)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }
// export function post (url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, data)
//       .then(response => {
//         resolve(response.data)
//       }, err => {
//         reject(err)
//       })
//   })
// }
export function post(url,params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(
      response => { resolve(response.data) },
    ).catch(error => { reject(error) })
  })
}

export function get(url,params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(
      response => { resolve(response.data) }
    ).catch(error => { reject(error) })
  })
}