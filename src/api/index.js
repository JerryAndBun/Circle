// import get from '../api/index'
import {get,post} from "../api/request"

const HttpManager={
    // 提交用户登录信息
    postUserinfo: (params) => post(`/lr/login`, params),
}
export default HttpManager
// export const postUserinfo =function(){
//     return request.post('lr/login',params)
// }