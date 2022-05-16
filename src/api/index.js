// import get from '../api/index'
import { get, post } from "../api/request"

const HttpManager = {
    // 登录提交用户登录信息
    userLogin: (params) => post(`/signIn`, params),
    // 注册用户提交用户信息
    userRegister: (params) => post(`/signUp`, params),
    // 发送动态
    sendMomment: (params) => post(`/dynamicContent`, params),
    // 发送评论
    sendComment: (params) => post(`/comment`, params),
    // 请求发送验证码
    sendverifycode: (params) => post(`/verifyCode`, params),
    // 请求该用户的动态,路径之后直接接用户的UID
    getUserMoment: (url) => get(url),
    // 搜索用户
    getUserList:(url,params)=>get(url,params),
    // 获取用户信息
    getUserInfo:(url) => get(url),
    // 关注用户
    postFollowUser:(params)=>post(`/focusOn`,params),
    // 取关用户
    postUnFocusUser :(params)=>post(`/unfocusOn`,params),
    // 上传头像
    postUserAvatar:(params)=>post(`/avatarImg`,params),
}
export default HttpManager