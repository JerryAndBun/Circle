// import get from '../api/index'
import request from "../api/request"

// const HttpManager={
//     //登录
//     login: (params) => post(`/login`, params),

// }

export const gettest =function(){
    return request.get('/',{
        
    })
}