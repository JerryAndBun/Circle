// 这个是整动态列表
let moment = [
  // 这是一条动态，有三种类型，有两种类型的值为 null,以下为每种类型的例子
  // 转发时加的那些话叫做理由,字段为reason
  // 动态这里翻译为moment
  {
    // 0为分享动态，1为分享视频，2为普通的自己发的动态。或者到时候用见名知意的字符串也行
    momentType: 0,
    // 这条动态的ID，你那不知道叫什么，我这暂且命名为sID
    sID: '00000',
    // 头像地址，也就是根据UID请求动态列表，返回这个UID的头像地址
    avatar: 'xxx/xxxx.jpg',
    // createdAt，转发是一种动态，自己发的也是一种动态，这条动态产生的时间
    createdAt: '2022-07-09',
    // 以下是分享动态需要的数据
    momentShare: {
      // 被分享的动态的那个人的昵称
      nickname: '钟宇小号',
      // 被分享的动态的那个人的uid
      uid: '1234567890',
      // 被分享动态的内容,也就是原内容
      momentContent: '项目快写完了，加油',
      //   被分享的动态的sID
      sID: '9999',
      // 被分享的人的头像地址
      avatar: 'xxx/xxxx.jpg',
      // 自己分享时，加以的话，可有可无
      reason: '大家一起加油',
      // 如果这条是转发了别人的转发，则有以下数据，用于存储转发的列表,按照时间倒序排序，后转发的在前面
      // 比如这里，前面已经有三条数据，说明这已经是被转发的第三次了，到了这次是第四次转发了，'大家一起加油'是第四次转发的reason
      forwardList: [
        {
          nickname: '钟宇小号',
          //   转发的人的uid
          uid: '1234567890',
          //转发的理由
          reason: '这是第三次转发',
        },
        {
          nickname: '钟宇小号',
          //   转发的人的uid
          uid: '1234567890',
          //转发的理由
          reason: '这是第二次转发',
        },
        {
          nickname: '钟宇小号',
          //   转发的人的uid
          uid: '1234567890',
          //转发的理由
          reason: '这是第一次转发，最开始的转发',
        },
      ],
    },
    // 以下是分享视频需要的数据
    videoShare: {
      // 被分享的动态的那个人的昵称,作者昵称
      nickname: '钟宇小号',
      // 被分享的视频的那个人的uid，视频作者的uid
      uid: '1234567890',
      // 被分享视频地址
      videoPath: 'xxxxxxxxx/x/xxxxx/xxx',
      // 被分享的视频封面地址
      videoPicPath: 'xxxx/xxx/xx.jpg',
      // 被分享的视频标题
      videoTitle: '【方舟动画】“异格”莫斯提马 绝赞调戏',
      // 被分享的视频的简介
      desText: '这个是视频的简介',
      // 被分享的动态的那个人的uid
      uid: '987654321',
      // 被分享的人的头像地址
      avatar: 'xxx/xxxx.jpg',
      // 自己分享时，加以的话，可有可无，
      reason: '这个视频好看，我分享一下',
      forwardList: [
        {
          nickname: '钟宇小号',
          //   转发的人的uid
          uid: '1234567890',
          //转发的理由
          reason: '这是第三次转发',
        },
        {
          nickname: '钟宇小号',
          //   转发的人的uid
          uid: '1234567890',
          //转发的理由
          reason: '这是第二次转发',
        },
        {
          nickname: '钟宇小号',
          //   转发的人的uid
          uid: '1234567890',
          //转发的理由
          reason: '这是第一次转发，最开始的转发',
        },
      ],
    },
    // 普通的动态
    normalMoment: {
      // 0为文字动态，1为投稿动态，2预留位置，可能有什么图片动态的
      type: 0,
      // 存储普通文字动态的对象
      moment: {
        momentContent: '这是我自己发的普通文字动态',
        sID: '1111',
        // 发布日期
        createdAt: '2022-07-09',
      },
      // 存储视频动态的对象
      video: {
        // 视频地址
        videoPath: 'xxxxxxxxx/x/xxxxx/xxx',
        // 视频的cv号
        cv: 'asdioph',
        // 视频封面地址
        videoPicPath: 'xxxx/xxx/xx.jpg',
        // 视频标题
        videoTitle: '挑战周杰伦的绝活？传说中的三键成曲！！！',
        // 视频的简介
        desText: '这个是视频的简介',
        // 投稿的播放量
        playNum: 321,
        // 注意是这个投稿视频点赞量，不是这个视频动态的点赞量
        likes: 0,
        // 自己投稿自动发布的动态，到时候可以在投稿页面加一个发布时想和粉丝说的话，也就是momentContent，投稿时不写则为空
        momentContent: '我新出的视频来啦',
      },
    },
    // 这条动态的点赞，评论，转发列表
    likes: 456,
    comments: 54,
    // 转发量
    forwardNum: 45,
  },
]
