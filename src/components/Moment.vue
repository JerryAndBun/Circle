<template>
<div>
  <!-- 普通文字动态的模板 -->
  <div class="momentdiv" v-if="item.type=='NORMAL_DYNAMIC_CONTENT'&&item.videoNoteDto==null">
    <div class="user" @click="toThisUserpage">
      <img class="avatar" :src='`${baseurl}${item.userInfo.avatar}`'></img>
      <div class="nickname">{{item.userInfo.nickname}}</div>
      <div class="time">{{item.createdAt}}</div>
    </div>
    <div class="reasonDiv" id="reasonDiv">
      <div class="reason" ref="reason">
        <span class="reasonText" ref="reasonText" v-html="item.reason">
          <!-- {{item.reason}} -->
        </span>
      </div>
    </div>
    <div class="reasonClickformore" ref="reasonClickformore" @click="unfold('reason')" v-if="reasonClickformore">展开</div>
    <div class="bottom">
      <div class="likes" @click="test">
        <i class="iconfont icon-dianzan1"></i>{{item.likes}}</div>
      <div class="comment">
        <i class="iconfont icon-pinglun" @click="isCommentDiv=!isCommentDiv"></i>{{item.comments}}</div>
      <div class="forward">
        <i class="iconfont icon-zhuanfa1" @click="forwardThisMoment"></i>{{item.forwardVideoInfo== null ? 0:item.forwardVideoInfo.length}}</div>
    </div>
    <div class="commentArea" v-if="isCommentDiv">
      <div class="commentTag">评论</div>
      <CommentInput class="commentInput"></CommentInput>
      <CommentDiv class="commentDiv" ref="commentDiv"></CommentDiv>
    </div>
    <div class="spreate"></div>
  </div>
  <!-- 转发别人普通文字动态的动态 -->
  <div class="forwardMoment" v-if="item.type=='SHARE_DYNAMIC_CONTENT'">
    <div class="user" @click="toThisUserpage">
      <img class="avatar" :src='`${baseurl}${item.userInfo.avatar}`'></img>
      <div class="nickname">{{item.userInfo.nickname}}</div>
      <div class="time">{{item.userInfo.createdAt}}</div>
    </div>
    <div class="reasonDiv" id="reasonDiv">
      <div class="reason" ref="reason">
        <span class="reasonText" ref="reasonText">
          AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
          AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        </span>
      </div>
    </div>
    <div class="reasonClickformore" ref="reasonClickformore" @click="unfold('reason')" v-if="reasonClickformore">展开</div>
    <main class="forwardContent">
      <div class="userDiv">
        <img src="" alt="" class="userImg">
        <div class="nickName">&nbsp昵称{{}}</div>
      </div>
      <div class="textContainer" ref="textContainer" id="textContainer">
        <div class="forwardInner" ref="forwardInner">
          <span class="forwardText" ref="forwardText">
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
          </span>
        </div>
      </div>
      <div class="forwardClickformore" ref="forwardClickformore" @click="unfold('forward')" v-if="forwardClickformore">展开</div>
    </main>
    <div class="bottom">
      <div class="likes" @click="test">
        <i class="iconfont icon-dianzan1"></i>{{}}
      </div>
      <div class="comment">
        <i class="iconfont icon-pinglun" @click="isCommentDiv=!isCommentDiv"></i>{{}}</div>
      <div class="forward">
        <i class="iconfont icon-zhuanfa1" @click="forwardThisMoment"></i>{{}}</div>
    </div>
    <div class="commentArea" v-if="isCommentDiv">
      <div class="commentTag">评论</div>
      <CommentInput class="commentInput"></CommentInput>
      <CommentDiv class="commentDiv" ref="commentDiv"></CommentDiv>
    </div>
    <div class="spreate"></div>
  </div>
  <!-- 转发视频的动态 -->
  <div class="forwardVideo" v-if="item.type=='SHARE_VIDEO'">
    <div class="user" @click="toThisUserpage">
      <img class="avatar" :src='`${baseurl}${item.userInfo.avatar}`'></img>
      <div class="nickname">{{item.userInfo.nickname}}</div>
      <div class="time">{{item.userInfo.createdAt}}</div>
    </div>
    <div class="reasonDiv" id="reasonDiv">
      <div class="reason" ref="reason">
        <span class="reasonText" ref="reasonText">
          AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
          AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        </span>
      </div>
    </div>
    <div class="reasonClickformore" ref="reasonClickformore" @click="unfold('reason')" v-if="reasonClickformore">展开</div>
    <main class="forwardVideoContent">
      <div class="userDiv">
        <img src="" alt="" class="userImg">
        <div class="nickName">&nbsp昵称{{}}</div>
      </div>
      <div class="videoWarp">
        <img src="" alt="" class="videoPic">
        <aside class="videoInfo">
          <div class="videoTitle">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
          <p class="videoDes">asdasasdasddasdasdasddasasdasasdasddasdasdasddasdasdasddasdasasdasddasdasdasddasdasdasddasdasdasddasdddasdasdasdasddasdddasddasdasddasdasasdasddasdasdasddasdasdasddasdasdasddasdddasdasdasdasddasdddasd</p>
          <div class="icons">
            <i class="iconfont icon-bofangliang"></i>&nbsp{{321}}播放 &nbsp &nbsp
            <i class="iconfont icon-pinglun" @click="isCommentDiv=!isCommentDiv"></i>&nbsp{{321}}评论
          </div>
        </aside>
      </div>
    </main>
    <div class="bottom">
      <div class="likes" @click="test">
        <i class="iconfont icon-dianzan1"></i>{{}}
      </div>
      <div class="comment">
        <i class="iconfont icon-pinglun" @click="isCommentDiv=!isCommentDiv"></i>{{}}</div>
      <div class="forward">
        <i class="iconfont icon-zhuanfa1" @click="forwardThisMoment"></i>{{}}</div>
    </div>
    <div class="commentArea" v-if="isCommentDiv">
      <div class="commentTag">评论</div>
      <CommentInput class="commentInput"></CommentInput>
      <CommentDiv class="commentDiv" ref="commentDiv"></CommentDiv>
    </div>
    <div class="spreate"></div>
  </div>
  <!-- 投稿视频的自动动态模板 -->
  <div class="conMoment" v-if="item.type=='NORMAL_DYNAMIC_CONTENT'&&item.videoNoteDto!=null">
    <div class="user">
      <img class="avatar" :src='`${baseurl}${item.userInfo.avatar}`'></img>
      <div class="nickname" @click="toThisUserpage">{{item.userInfo.nickname}}</div>
      <div class="time">{{item.createdAt}}</div>
    </div>
    <main class="conVideoContent" @click="toThisVideo">
      <img :src='`${baseurl}${item.videoNoteDto.picPath}`' alt="" class="videoPic" >
      <aside class="videoInfo">
        <div class="videoTitle">{{item.videoNoteDto.title}}</div>
        <p class="videoDes">{{item.videoNoteDto.summary}}</p>
        <div class="icons">
          <i class="iconfont icon-bofangliang"></i>&nbsp{{item.videoNoteDto.playNum}}播放 &nbsp &nbsp
          <i class="iconfont icon-pinglun" @click="isCommentDiv=!isCommentDiv"></i>&nbsp{{item.videoNoteDto.commentNum}}评论
        </div>
      </aside>
    </main>
    <div class="bottom">
      <div class="likes" @click="test">
        <i class="iconfont icon-dianzan1"></i>{{item.likes}}
      </div>
      <div class="comment">
        <i class="iconfont icon-pinglun" @click="isCommentDiv=!isCommentDiv"></i>{{item.comments}}</div>
      <div class="forward">
        <i class="iconfont icon-zhuanfa1" @click="forwardThisMoment"></i>{{item.forwardVideoInfo== null ? 0:item.forwardVideoInfo.length}}</div>
      </div>
    <div class="commentArea" v-if="isCommentDiv">
      <div class="commentTag">评论</div>
      <CommentInput class="commentInput"></CommentInput>
      <CommentDiv class="commentDiv" ref="commentDiv"></CommentDiv>
    </div>
    <div class="spreate"></div>
  </div>
</div>
</template>

<script>
import { BASE_URL } from "../api/config";
import { mapGetters } from "vuex";
import UserPage from "@/pages/UserPage.vue";
import VideoPlay from "./VideoPlay.vue";
import CommentDiv from '@/components/CommentDiv.vue'
import CommentInput from './CommentInput.vue';
export default {
  components: { UserPage, VideoPlay,CommentDiv, CommentInput },
  props: ["item"],
  data() {
    return {
      type:'conMoment',
      myavatar: this.avatar,
      baseurl: BASE_URL,
      isCommentDiv:false,
      list: [],
      forwardClickformore: false,
      forwardIsfold: true,
      reasonClickformore: false,
      reasonIsfold: true,
      ttt: `
        1.asdasd
        2.5s641654
        3.456156
        4.5465451665
        4.5465451665
        4.5465451665
        4.5465451665
        4.5465451665
      `,
    };
  },
  computed: {
    ...mapGetters("info", ["toast_list"]),
  },
  methods: {
    test() {
      this.$store.commit("info/toast_list", { type: "push" });
      console.log(this.toast_list);
    },
    forwardThisMoment(){

    },
    toThisUserpage(){
      this.$router.push({
        path:`/userpage/${this.item.userInfo.uid}`
      })
    },
    toThisVideo(){
      this.$router.push({
        path:`/video/${this.item.videoNoteDto.cv}`
      })
    },
    check_click_for_more() {
      this.$nextTick(() => {
        // 检查转发text的高度
        if (this.$refs.forwardText.offsetHeight > 144) {
          // 需要检测的div的折叠时的高度，若大于，则折叠
          this.$nextTick(() => {
            this.forwardClickformore = true;
            // console.log('转发的要折叠');
          });
        } else {
          this.$nextTick(() => {
            // 需要检测的div的折叠时的高度，若小于，则默认高度，无需折叠
            this.forwardClickformore = false;
            // console.log("转发的不要折叠");
          });
        }
        if (this.$refs.reasonText.offsetHeight > 144) {
          // 需要检测的div的折叠时的高度，若大于，则折叠
          this.$nextTick(() => {
            this.reasonClickformore = true;
            // console.log('reason的要折叠');
          });
        } else {
          this.$nextTick(() => {
            // 需要检测的div的折叠时的高度，若小于，则默认高度，无需折叠
            this.reasonClickformore = false;
            // console.log("reason的不要折叠");
          });
        }
      });
    },
    showHide(child,father,type,isfold){
      
    },
    unfold(type) {
      // 折叠部分的父div
      var father=null
      var child=null
      var isfold=null

      if(type=='forward'){
        father = document.getElementById("textContainer");
        child=this.$refs.forwardInner
        isfold=this.forwardIsfold
      }
      if(type=='reason'){
        father = document.getElementById("reasonDiv");
        child=this.$refs.reason
        isfold=this.reasonIsfold
      }
      if(type=='content'){
        father = document.getElementById("reasonDiv");
        child=this.$refs.reason
        isfold=this.reasonIsfold
      }
      if (isfold) {
        console.log(`******************`);
        // 此处打开
        // 这些只是出现省略号的代码，看起来有点多
        child.style.overflow = "none";
        child.style.maxHeight = "none";
        child.style.wordBreak = "none";
        child.style.textOverflow = "none";
        child.style.display = "block";
        child.style.webkitLineClamp = "0";
        child.style.webkitBoxOrient = "none";
        father.style.maxHeight = `none`;
        father.style.overflow = `none`;
        if(type=='forward'){
          this.forwardIsfold = false;
          this.$refs.forwardClickformore.innerHTML = "收起";
        }else{
          this.reasonIsfold=false
          this.$refs.reasonClickformore.innerHTML = "收起";
        }
      } else {
        // 此处折叠
        // 这些只是出现省略号的代码，看起来有点多
        console.log(`------------------------`);
        child.style.overflow = "hidden";
        child.style.maxHeight = "144px";
        child.style.wordBreak = "break-all";
        child.style.textOverflow = "ellipsis";
        child.style.display = "-webkit-box";
        child.style.webkitLineClamp = "6";
        child.style.webkitBoxOrient = "vertical";
        father.style.maxHeight = `150px`;
        father.style.overflow = `hidden`;
        if(type=='forward'){
          this.forwardIsfold = true;
          this.$refs.forwardClickformore.innerHTML = "展开";
        }else{
          father.style.maxHeight = `160px`;

          this.reasonIsfold = true;
          this.$refs.reasonClickformore.innerHTML = "展开";
        }
      }
    },
  },

  mounted() {
    // this.check_click_for_more();
    if (!this.myavatar) {
      this.myavatar = require("../assets/imgs/头像.jpg");
    }
    this.type=this.item.type
    console.log(this.item);
    console.log(this.item.videoNoteDto==null);
    this.$nextTick(()=>{
      // this.$refs.reasonText.innerHTML = this.item.reason;
    })
    // console.log(this.item.forwardVideoInfo);
  },
  updated() {
    // this.check_click_for_more();
    
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/moment.scss";
</style>