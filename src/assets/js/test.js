/* 
给视频添加评论  每个视频都有自己的评论，
通过视频播放页输入框输入的评论为一级评论，也就是对视频的评论，
对视频评论进行回复的，为二级评论，收在那个一级评论之下
一级评论按照点赞数排序，二级评论按照时间排序

 */

let video_comments = [
  {
    // 代表评论的级数，这里是一级评论
    level: 1,
    // 评论的发布时间
    createAt: '2022-07-06',
    // 该条评论的评论id,称为c_id，和UID一样都是独一无二的，用于回复的操作,
    c_id: 1,
    // 该条评论的用户UID
    uid: 1111,
    // 该条评论的用户昵称
    nickname: '罗荧',
    // 该条评论的用户头像路径
    avatar_path: 'xxxxxxx/xxxxxxx/xxx',
    // 评论内容
    comment_content: '钟宇视频真不错，加油加油',
    // 这条评论的点赞数
    comment_likes: 36,
    // 这一级评论的回复数，也就是二级评论的数量
    reply_num: 20,
    // 该评论下的所有二级评论
    replys: [
      {
        // 代表评论的级数，这里是二级评论
        level: 2,
        //代表这条二级评论是回复一级评论的还是回复二级评论的,1代表是回复的一级评论，2代表是回复的二级评论
        target_level: 1,
        // 代表回复的评论的c_id。只有二级评论有这个属性，一级评论没有，因为一级评论直接回复（评论）的是视频
        target_c_id: 123456,
        // 评论的发布时间
        createAt: '2022-07-06',
        // 该条评论的评论id,称为c_id，和UID一样都是独一无二的，用于回复的操作,
        c_id: 2,
        // 该条评论的用户UID
        uid: 2222,
        // 该条评论的用户昵称
        nickname: '钟先樑',
        // 该条评论的用户头像路径
        avatar_path: 'xxxxxxx/xxxxxxx/xxx',
        // 评论内容
        comment_content: '我也觉得钟宇的视频真不错',
        // 这条评论的点赞数
        comment_likes: 0,
        // 二级评论的前端不需要看到回复数，只有点赞数
      },
      {
        level: 2,
        // 注意，这条二级评论是回复二级评论的，需要多加一些属性
        target_level: 2,
        target_c_id: 2,
        // 被回复的用户
        target_nickname: '钟先樑',
        // 被回复的用户UID
        target_uid: 2222,
        createAt: '2022-07-06',
        c_id: 3,
        uid: 3333,
        nickname: '苏承文',
        avatar_path: 'xxxxxxx/xxxxxxx/xxx',
        comment_content: '我不这么觉得，钟宇的视频不好看',
        comment_likes: 0,
      },
    ],
  },
]
