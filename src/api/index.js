import { deletemethods, get, post, put } from '../api/request'

const HttpManager = {
  // 登录提交用户登录信息
  userLogin: (params) => post(`/signIn`, params),
  // 注册用户提交用户信息
  userRegister: (params) => post(`/signUp`, params),
  // 发送动态
  sendMomment: (params) => post(`/dynamicContent`, params),
  // 请求发送验证码
  sendverifycode: (params) => post(`/verifyCode`, params),
  //检测邮箱是否有效
  postCheckEmail: (params) => post(`/check`, params),
  // 搜索用户
  getUserList: (url, params) => get(url, params),
  // 搜索视频
  getVideoList: (url, params) => get(url, params),
  // 获取用户信息
  getUserInfo: (url) => get(url),
  // 关注用户
  postFollowUser: (params) => post(`/focusOn`, params),
  // 取关用户
  postUnFocusUser: (params) => post(`/unfocusOn`, params),
  // 上传头像
  postUserAvatar: (params, config) => post(`/avatarImg`, params, config),
  // 修改签名
  postUserSignature: (params) => post(`/signature`, params),
  // 修改用户昵称
  putUserNickname: (params) => put(`/userInfo`, params),
  // 根据UID查询粉丝列表
  getFansListByUid: (url) => get(url),
  // 根据UID查询关注列表
  getFocusListByUid: (url) => get(url),

  // 查询已登录用户与其他用用户的消息列表,自己的UID在请求头自带，固无需参数
  getUserMessage: () => get(`/message`),
  // 发送私信
  postMessage: (params) => post(`/message`, params),
  // 获取与目标用户的聊天记录
  getSigelTalk: (url) => get(url),

  // 点击点赞视频
  postLikeVideo: (url) => post(url),
  // 取消点赞视频
  deleteLikeVideo: (url) => deletemethods(url),
  // 点击收藏视频
  postCollectByCv: (url) => post(url),
  // 点击删除收藏视频
  deleteUnCollectByCv: (url) => deletemethods(url),
  // 点击删除投稿视频
  deleteVideoByCv: (url) => deletemethods(url),
  // 查询用户收藏的视频
  getCollectList: (url) => get(url),
  // 通过cv号查询视频
  getVideoUrl: (url) => get(url),
  // 查询自己的投稿列表
  getVideoList: (url) => get(url),
  //上传视频封面
  postUploadTitlePic: (params) => post(`/uploadTitlePic`, params),
  // 点击投稿检查是否有上一次的记录
  getUploadVideo: () => get(`/uploadVideo`),
  // 上传投稿视频
  postVideo: (params, config) => post(`/video`, params, config),
  // 提交发布视频
  postPublish: (url, params) => post(url, params),
  // 获取所有视频
  postAllVideo: () => post('/allVideoList'),
  // 删除分P视频
  deletePVideo: (url) => deletemethods(url),
  // 收藏该视频
  postCollectVideo: (url) => post(url),
  // 取消收藏
  deleteCollectVideo: (url) => deletemethods(url),
  // 根据cv号查这个视频的评论区
  getVideoComment: (url) => get(url),
  // 发表评论
  postVideoComment: (params) => post(`/comment`, params),
  // 给评论点赞
  postLikeVideoComment: (params) => post(`/comment/like`, params),
  // 给评论取消点赞
  postUnLikeVideoComment: (params) => post(`/comment/unlike`, params),

  // 请求该用户的动态,路径之后直接接用户的UID
  getUserMoment: (url) => get(url),
  // 转发动态
  postForwardMoment: (params) => post(`/forwardDynamicContent`, params),
  // 根据sID号获取动态内容的评论 查询动态的所有评论
  getAllMomentComment: (url) => get(url),
  // 点赞动态
  // 删除动态
  deleteMoment:(url)=>deletemethods(url)
}
export default HttpManager
