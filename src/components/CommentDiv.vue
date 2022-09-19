<template>
<div>
  <div class="level1_comment">
    <div class="container">
      <img class="avatar" :src="`${baseurl}${level1Comment.avatar}`">
      <div class="comments_container">
        <div class="nickname">{{level1Comment.nickname}}</div>
        <div class="comments_content" ref="comments_content" v-html="level1Comment.commentContent"></div>
        <div class="comment_option">
          <span class="created_at option">{{level1Comment.createdAt}}</span>
          {{level1Comment.commentLikes}}
          <i class="iconfont icon-dianzan option" :class="level1Comment.isLike?'active':'unactive'" @click="commentLikeRequest(level1Comment),
          level1Comment.isLike=!level1Comment.isLike" ></i>
          <span class="repley option" @click="reply(level1Comment)">回复</span>
        </div>
      </div>
    </div>
    <div class="level2_comment" v-for="(item,index) in level1Comment.replys">
      <div class="container">
        <img class="avatar" :src="`${baseurl}${item.avatar}`">
        <div class="comments_container">
          <div class="comment_area">
            <div class="nickname">{{item.nickname}}</div>
            <div class="reply_area" v-if="item.targetLevel==2">
              <span >回复</span>&nbsp<a @click="to_userpage(item)" class="reply_nickname">{{item.targetNickname}}</a>&nbsp:
            </div>
            <span class="comments_content" ref="comments_content" v-html="item.commentContent" style=""></span>
          </div>
          <div class="comment_option">
          <span class="created_at option">{{item.createdAt}}</span>
            {{item.commentLikes}}
          <i class="iconfont icon-dianzan option" :class="item.isLike?'active':'unactive'" @click="commentLikeRequest(item)"></i>
          <span class="repley option" @click="reply(item)">回复</span>
          </div>
        </div>
      </div>
    </div>
    <CommentInput class="commentInput" v-if="is_replying" :comment_level="2" @sendComment="send_level2_comment"></CommentInput>
  </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/api/config";
import CommentInput from "@/components/CommentInput.vue";
import { mapGetters } from "vuex";
import HttpManager from "@/api/index";
export default {
  // 这段时间得到命名规则有改变，所有看起来有点怪 =-=
  // level_item 代表该级评论的相关数据
  // is_all     代表该一级评论下的二级回复只存在一个输入框
  // video_item 代表该级评论是视频的评论，视频相关数据
  // momentItem 代表该级评论是动态的评论，动态相关数据
  props: ["level_item", "is_all", "video_item",'momentItem'],
  data() {
    return {
      baseurl: BASE_URL,
      is_replying: false,
      reply_item: "",
      level1CommentLiked:false,
      // 本地copy的一份所有一级评论
      level1Comment:''
    };
  },
  components: {
    CommentInput,
  },
  computed: {},
  watch: {
    is_all(val, old) {
      // 用于检测父组件，看父组件有没有指示，若变化则意味着全部输入框关闭，点击的输入框打开
      if (val != old) {
        this.is_replying = false;
      }
    },
    level_item(newval,old){
      // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
      this.level1Comment=newval
    }
  },
  methods: {
    commentLikeRequest(item) {
      console.log(item);
      if (item.isLike) {
        // 已点赞，发取消点赞请求
        HttpManager.postUnLikeVideoComment({ cid: item.cid, level: item.level }).then(
          (response) => {
            console.log(response);
            item.commentLikes--
            item.isLike=false
          },
          (error) => {
            console.log(error);
          }
        );
      }
      if (!item.isLike){
        // 未点赞，发送点赞请求
        HttpManager.postLikeVideoComment({ cid: item.cid, level: item.level }).then(
          (response) => {
            console.log(response);
            item.isLike=true
            item.commentLikes++
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    to_userpage(item) {
      this.$router.push({
        path: `/userpage/${item.targetUid}`,
      });
    },
    reply(level_item) {
      this.reply_item = level_item;
      console.log("你要回复的item");
      console.log(level_item);
      this.$emit("toFather");
      this.$nextTick(() => {
        this.is_replying = true;
        console.log('当前输入框打开了');
      });
    },
    send_level2_comment(params) {
      console.log(params);
      console.log("你回复的item");
      // console.log({
      //   oneCommentCid: this.level1Comment.cid,
      //   commentContent: params.content,
      //   cv: this.video_item.cv,
      //   level: params.comment_level,
      //   targetCid: this.reply_item.cid,
      //   targetLevel: this.reply_item.level,
      //   targetUid: this.reply_item.uid,
      // });
      // 是回复动态的二级评论
      if(this.momentItem){
        console.log(this.momentItem);
        HttpManager.postVideoComment({
          commentContent: params.content,
          oneCommentCid: this.level1Comment.cid,
          commentObj: this.momentItem.sid,
          level: params.comment_level,
          targetCid: this.reply_item.cid,
          targetLevel: this.reply_item.level,
          targetUid: this.reply_item.uid,
        }).then(
          (response) => {
            this.$emit("replyed");
            this.is_replying=false
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }
      // 是回复视频的二级评论
      if(this.video_item){
        HttpManager.postVideoComment({
          commentContent: params.content,
          oneCommentCid: this.level1Comment.cid,
          commentObj: this.video_item.cv,
          level: params.comment_level,
          targetCid: this.reply_item.cid,
          targetLevel: this.reply_item.level,
          targetUid: this.reply_item.uid,
        }).then(
          (response) => {
            this.$emit("replyed");
            this.is_replying=false
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }

    },
  },
  mounted() {
    // this.comments_content.innerHTML=this.level_item.commentContent
    // this.level1CommentLiked=this.level_item.isLike
    console.log(this.level_item);
    this.level1Comment=this.level_item
    console.log(this.level1Comment);
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import "../assets/css/commentdiv";
</style>
