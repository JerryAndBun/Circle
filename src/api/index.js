import get from '../api/index'

const HttpManager={
    //登录
    login: (params) => post(`/login`, params),

}

export default HttpManager