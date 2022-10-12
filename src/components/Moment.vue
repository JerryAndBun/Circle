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
      <div class="likes" @click="momentLikeRequest">
        <i class="iconfont icon-dianzan1"></i>{{item.likes}}</div>
      <div class="comment" @click="getMomentComment">
        <i class="iconfont icon-pinglun"></i>{{item.comments}}</div>
      <div class="forward" @click="openForwardWindow">
        <i class="iconfont icon-zhuanfa1" ></i>{{item.forwardVideoInfo== null ? 0:item.forwardVideoInfo.length}}</div>
    </div>
    <div class="commentArea" v-if="isCommentDiv">
      <div class="commentTag">评论&nbsp{{item.comments}}</div>
      <CommentInput :comment_level="1" class="commentInput" @sendComment='momentCommentRequest'></CommentInput>
      <CommentDiv class="commentDiv" ref="commentDiv" v-for="(comment, index) in momentComment" 
      :key="index" 
      :level_item="comment" 
      :momentItem="item"
      :is_all="isAll"
      @toFather="isAll=!isAll" 
      @likeChanged="getComment"
      @replyed="getComment"></CommentDiv>
    </div>
    <div class="spreate"></div>
  </div>
  <!-- 转发别人普通文字动态的动态 -->
  <div class="forwardMoment" v-if="item.type=='SHARE_DYNAMIC_CONTENT'">
    <div class="user" @click="toThisUserpage">
      <img class="avatar" :src='`${baseurl}${item.userInfo.avatar}`'></img>
      <div class="nickname">{{item.userInfo.nickname}}</div>
      <div class="time">{{item.createdAt}}</div>
    </div>
    <div class="reasonDiv" id="reasonDiv">
      <div class="reason" ref="reason">
        <span class="reasonText" ref="reasonText" v-html="item.reason">
        </span>
      </div>
    </div>
    <div class="reasonClickformore" ref="reasonClickformore" @click="unfold('reason')" v-if="reasonClickformore">展开</div>
    <main class="forwardContent">
      <div class="userDiv">
        <img src="" alt="" class="userImg">
        <div class="nickName" v-for="(element,index) in item.forwardVideoInfo.forwardUserInfoList">&nbsp昵称{{element.nickname}}</div>
      </div>
      <div class="textContainer" ref="textContainer" id="textContainer">
        <div class="forwardInner" ref="forwardInner">
          <span class="forwardText" ref="forwardText">

          </span>
        </div>
      </div>
      <div class="forwardClickformore" ref="forwardClickformore" @click="unfold('forward')" v-if="forwardClickformore">展开</div>
    </main>
    <div class="bottom">
      <div class="likes" @click="momentLikeRequest">
        <i class="iconfont icon-dianzan1"></i>{{}}
      </div>
      <div class="comment" @click="getMomentComment">
        <i class="iconfont icon-pinglun"></i>{{}}</div>
      <div class="forward" @click="openForwardWindow">
        <i class="iconfont icon-zhuanfa1" ></i>{{}}</div>
    </div>
    <div class="commentArea" v-if="isCommentDiv">
      <div class="commentTag">评论&nbsp{{item.comments}}</div>
      <CommentInput :comment_level="1" class="commentInput" @sendComment='momentCommentRequest'></CommentInput>
      <CommentDiv class="commentDiv" ref="commentDiv" v-for="(comment, index) in momentComment" 
      :key="index" 
      :level_item="comment" 
      :momentItem="item"
      :is_all="isAll"
      @toFather="isAll=!isAll" 
      @likeChanged="getComment"
      @replyed="getComment"></CommentDiv>
    </div>
    <div class="spreate"></div>
  </div>
  <!-- 转发视频的动态 -->
  <div class="forwardVideo" v-if="item.type=='SHARE_VIDEO'">
    <div class="user" @click="toThisUserpage">
      <img class="avatar" :src='`${baseurl}${item.userInfo.avatar}`'></img>
      <div class="nickname">{{item.userInfo.nickname}}</div>
      <div class="time">{{item.createdAt}}</div>
    </div>
    <div class="reasonDiv" id="reasonDiv">
      <div class="reason" ref="reason">
        <span class="reasonText" ref="reasonText">
          {{item.reason}}
        </span>
      </div>
    </div>
    <div class="reasonClickformore" ref="reasonClickformore" @click="unfold('reason')" v-if="reasonClickformore">展开</div>
    <main class="forwardVideoContent">
      <div class="userDiv">
        <!-- 这个作者的头像目前没有办法获取，后端没给 -->
        <img :src='`${baseurl}${item.videoNoteDto.avatar}`' alt="" class="userImg">
        <div class="nickName">&nbsp{{item.videoNoteDto.nickname}}</div>
      </div>
      <div class="videoWarp">
        <img :src="`${baseurl}${item.videoNoteDto.picPath}`" alt="" class="videoPic">
        <aside class="videoInfo">
          <div class="videoTitle">{{item.videoNoteDto.title}}</div>
          <p class="videoDes">{{item.videoNoteDto.summary}}</p>
          <div class="icons">
            <i class="iconfont icon-bofangliang" @click="isCommentDiv=!isCommentDiv"></i> &nbsp {{321}}播放 &nbsp &nbsp
            <i class="iconfont icon-pinglun"></i>&nbsp{{321}}评论
          </div>
        </aside>
      </div>
    </main>
    <div class="bottom">
      <div class="likes" @click="momentLikeRequest">
        <i class="iconfont icon-dianzan1"></i>{{}}
      </div>
      <div class="comment" @click="getMomentComment">
        <i class="iconfont icon-pinglun"></i>{{}}
      </div>
      <div class="forward" @click="openForwardWindow">
        <i class="iconfont icon-zhuanfa1" ></i>{{}}
      </div>
    </div>
    <div class="commentArea" v-if="isCommentDiv">
      <div class="commentTag">评论&nbsp{{item.comments}}</div>
      <CommentInput :comment_level="1" class="commentInput" @sendComment='momentCommentRequest'></CommentInput >
      <CommentDiv class="commentDiv" ref="commentDiv" v-for="(comment, index) in momentComment" 
      :key="index" 
      :level_item="comment" 
      :momentItem="item"
      :is_all="isAll"
      @toFather="isAll=!isAll" 
      @likeChanged="getComment"
      @replyed="getComment"></CommentDiv>
    </div>
    <div class="forwardArea">
      
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
          <i class="iconfont icon-bofangliang" @click="isCommentDiv=!isCommentDiv"></i>&nbsp{{item.videoNoteDto.playNum}}播放 &nbsp &nbsp
          <i class="iconfont icon-pinglun"></i>&nbsp{{item.videoNoteDto.commentNum}}评论
        </div>
      </aside>
    </main>
    <div class="bottom">
      <div class="likes" @click="momentLikeRequest">
        <i class="iconfont icon-dianzan1"></i>{{item.likes}}
      </div>
      <div class="comment" @click="getMomentComment">
        <i class="iconfont icon-pinglun"></i>{{item.comments}}</div>
      <div class="forward" @click="openForwardWindow">
        <i class="iconfont icon-zhuanfa1" ></i>{{item.forwardVideoInfo== null ? 0:item.forwardVideoInfo.length}}</div>
      </div>
    <div class="commentArea" v-if="isCommentDiv">
      <div class="commentTag">评论&nbsp{{item.comments}}</div>
      <CommentInput :comment_level="1" class="commentInput" @sendComment='momentCommentRequest'></CommentInput>
      <CommentDiv class="commentDiv" ref="commentDiv" v-for="(comment, index) in momentComment" 
      :key="index" 
      :level_item="comment" 
      :momentItem="item"
      :is_all="isAll"
      @toFather="isAll=!isAll" 
      @likeChanged="getComment"
      @replyed="getComment"></CommentDiv>
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
import CommentDiv from "@/components/CommentDiv.vue";
import CommentInput from "./CommentInput.vue";

import HttpManager from "@/api";
export default {
  components: { UserPage, VideoPlay, CommentDiv, CommentInput},
  props: ["item"],
  data() {
    return {
      type: "conMoment",
      myavatar: this.avatar,
      baseurl: BASE_URL,
      list: [],
      forwardReason:'',
      momentComment:'',
      // 各种开关
      isAll:false,
      isCommentDiv: false,
      isForwardDiv:false,
      forwardClickformore: false,
      forwardIsfold: true,
      reasonClickformore: false,
      reasonIsfold: true,
    };
  },
  computed: {
    ...mapGetters("info", ["toast_list"]),
  },
  methods: {
    // 打开分享的窗口
    openForwardWindow(){
      // 通知UserPage页面打开对话框
      this.$emit('open',this.item)
    },
    // 给动态评论一级评论
    momentCommentRequest(params){
      console.log(params);
      HttpManager.postVideoComment({
        commentContent: params.content,
        commentObj: this.item.sid,
        level: params.comment_level,
        oneCommentCid: "",
        targetCid: "",
        targetLevel: "",
        targetUid: ""
      }).then(res=>{console.log(res);
      this.getComment()})
    },
    // 给动态点赞的请求
    momentLikeRequest() {
      // 用于显示弹窗，点赞成功
      this.$store.commit("info/toast_list", { action: "push" ,message:'点赞成功',type:'success'});
      console.log(this.item);
      // HttpManager.postLikeVideoComment({
      //   cid:'',
      //   level:''
      // })
      // console.log(this.toast_list);
    },
    getComment(){
      HttpManager.getAllMomentComment(`/dynamicContent/comments/${this.item.sid}`).then(
        res=>{console.log('查动态的评论成功');console.log(res); this.momentComment=res},
        err=>{console.log('查动态的评论失败');}
      )
    },
    // 点击查询该动态的所有评论，并且开关评论区
    getMomentComment(){
      this.isCommentDiv=!this.isCommentDiv
      this.isForwardDiv=false
      this.getComment()
    },
    toThisUserpage() {
      this.$router.push({
        path: `/userpage/${this.item.userInfo.uid}`,
      });
    },
    toThisVideo() {
      this.$router.push({
        path: `/video/${this.item.videoNoteDto.cv}`,
      });
    },
    check_click_for_more() {
      this.$nextTick(() => {
        // 检查转发text的高度
        if(this.$refs.forwardText){
          if (this.$refs.forwardText.offsetHeight > 144) {
            // 需要检测的div的折叠时的高度，若大于，则折叠
            this.$nextTick(() => {
              this.forwardClickformore = true;
              console.log('转发的要折叠');
            });
          } else {
            this.$nextTick(() => {
              // 需要检测的div的折叠时的高度，若小于，则默认高度，无需折叠
              this.forwardClickformore = false;
              console.log("转发的不要折叠");
            });
          }
        }
        // 我也不知道为什么外面套个if，里面的this.$refs.reasonText.offsetHeight就不会报错了
        // 直接写this.$refs.reasonText.offsetHeight会报错说找不到
        if(this.$refs.reasonText){
          if (this.$refs.reasonText.offsetHeight > 144) {
            // 需要检测的div的折叠时的高度，若大于，则折叠
            this.$nextTick(() => {
              this.reasonClickformore = true;
              console.log('reason的要折叠');
            });
          } else {
            this.$nextTick(() => {
              // 需要检测的div的折叠时的高度，若小于，则默认高度，无需折叠
              this.reasonClickformore = false;
              console.log("reason的不要折叠");
            });
          }
        }
      });
    },
    showHide(child, father, type, isfold) {},
    unfold(type) {
      // 折叠部分的父div
      var father = null;
      var child = null;
      var isfold = null;

      if (type == "forward") {
        father = document.getElementById("textContainer");
        child = this.$refs.forwardInner;
        isfold = this.forwardIsfold;
      }
      if (type == "reason") {
        father = document.getElementById("reasonDiv");
        child = this.$refs.reason;
        isfold = this.reasonIsfold;
      }
      if (type == "content") {
        father = document.getElementById("reasonDiv");
        child = this.$refs.reason;
        isfold = this.reasonIsfold;
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
        if (type == "forward") {
          this.forwardIsfold = false;
          this.$refs.forwardClickformore.innerHTML = "收起";
        } else {
          this.reasonIsfold = false;
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
        if (type == "forward") {
          this.forwardIsfold = true;
          this.$refs.forwardClickformore.innerHTML = "展开";
        } else {
          father.style.maxHeight = `160px`;
          this.reasonIsfold = true;
          this.$refs.reasonClickformore.innerHTML = "展开";
        }
      }
    },
  },

  mounted() {
    this.getComment()
    if (!this.myavatar) {
      this.myavatar = require("../assets/imgs/头像.jpg");
    }
    this.type = this.item.type;

    console.log(this.item);
    console.log(this.item.videoNoteDto == null);
    // 检查是否需要折叠
    this.check_click_for_more(); 
  },
  updated() {
    this.check_click_for_more();
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/moment.scss";
</style>