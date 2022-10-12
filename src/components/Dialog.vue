<template>
  <div class="back">
    <div class="forwardWindow">
      <div class="title">分享到动态</div>
      <div class="close" @click="closeWindow"><i class="iconfont icon-guanbi"></i></div>
      <CommentInput
        class="commentInput"
        :messageWindow="1"
        @sendMessage="forwardMoment"
      ></CommentInput>
      <main class="forwardVideoContent" v-if="forwardItem.videoNoteDto">
        <div class="userDiv">
          <img :src="`${baseUrl}${forwardItem.userInfo.avatar}`" alt="" class="userImg" />
          <div class="nickName">&nbsp{{ forwardItem.userInfo.nickname }}</div>
        </div>
        <div class="videoWarp">
          <img :src="`${baseUrl}${forwardItem.videoNoteDto.picPath}`" alt="" class="videoPic" />
          <aside class="videoInfo">
            <div class="videoTitle">
              {{ forwardItem.videoNoteDto.title }}
            </div>
            <p class="videoDes">
              {{ forwardItem.videoNoteDto.summary }}
            </p>
            <div class="icons">
              <i class="iconfont icon-bofangliang" @click="isCommentDiv = !isCommentDiv"></i> &nbsp
              {{ forwardItem.videoNoteDto.playNum }}播放 &nbsp &nbsp
              <i class="iconfont icon-pinglun"></i>&nbsp{{
                forwardItem.videoNoteDto.commentNum
              }}评论
            </div>
          </aside>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import CommentInput from '../components/CommentInput.vue'
import HttpManager from '../api/index'
import { BASE_URL } from '../api/config'
export default {
  props: ['forwardItem'],
  data() {
    return {
      isVideo: false,
      baseUrl: BASE_URL,
    }
  },
  //   watch(){
  //     this.forwardItem()=>{

  //     }
  //   },
  components: {
    CommentInput,
  },
  methods: {
    closeWindow() {
      this.$emit('close')
    },
    forwardMoment(message) {
      console.log(this.forwardItem)
      // 如果在视频页面进行转发，则填'分享视频'，如果是转发动态则填'分享动态'
      // 解构赋值
      let [cv, destUid, dynamicContentEnum, nickname, reason, sid] = ['', '', '', '', '', '']
      console.log(cv, destUid, dynamicContentEnum, nickname, reason, sid)
      // 如果有视频信息则赋值
      if (this.forwardItem.videoNoteDto) {
        cv = this.forwardItem.videoNoteDto.cv
      }
      // 如果是动态类型
      if (this.forwardItem.type) {
        sid = this.forwardItem.sid
        dynamicContentEnum = 'SHARE_DYNAMIC_CONTENT'
      } else {
        dynamicContentEnum = 'SHARE_VIDEO'
      }
      let params = {
        cv: cv,
        destUid: this.forwardItem.userInfo.uid,
        dynamicContentEnum: dynamicContentEnum,
        nickname: this.forwardItem.userInfo.nickname,
        reason: message.content,
        sid: sid,
      }
      console.log('你发送过去的转发数据', params)
      HttpManager.postForwardMoment(params).then(
        (res) => {
          if (res.status == 200) {
            // 转发成功，关闭窗口
            this.closeWindow()
            // 转发成功，通知父组件更新动态列表
            this.$emit('forwardSuccess')
          }
        },
        (err) => {
          console.log(err)
        }
      )
    },
  },
  mounted() {
    console.log(this.forwardItem)
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/dialog.scss';
</style>
