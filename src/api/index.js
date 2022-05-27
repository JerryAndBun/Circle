import { get, post,put } from "../api/request"

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
    postUserAvatar:(params,config)=>post(`/avatarImg`,params,config),
    // 修改签名
    postUserSignature:(params)=>post(`/signature`,params),
    // 修改用户昵称
    putUserNickname:(params)=>put(`/userInfo`,params),
    //检测邮箱是否有效 
    postCheckEmail:(params)=>post(`/check`,params),
    // 查询已登录用户与其他用用户的消息列表,自己的UID在请求头自带，固无需参数
    getUserMessage:()=>get(`/message`),
    // 发送私信
    postMessage:(params)=>post(`/message`,params),
    // 获取与目标用户的聊天记录
    getSigelTalk:(url) => get(url),
}
export default HttpManager