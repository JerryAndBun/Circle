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
      // 解构赋值
      let [cv, destUid, dynamicContentEnum, nickname, reason, sid] = ''
      // 如果有视频信息则赋值
      if (this.forwardItem.videoNoteDto) {
        cv = this.forwardItem.videoNoteDto.cv
      }
      sid = this.forwardItem.sid
      let params = {
        cv: cv,
        destUid: this.forwardItem.userInfo.uid,
        dynamicContentEnum: 'NORMAL_DYNAMIC_CONTENT',
        nickname: this.forwardItem.userInfo.nickname,
        reason: message,
        sid: sid,
      }
      if (this.forwardItem == 'NORMAL_DYNAMIC_CONTENT') {
        if (this.forwardItem.videoNoteDto != null) {
          // 转发的视频
          HttpManager.postForwardMoment(params)
        }
        // 转发的普通动态
        HttpManager.postForwardMoment(params)
      }
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
