<template>
  <div class="level1_comment">
    <div class="container">
      <img class="avatar" :src="`${baseurl}${level_item.avatar}`"></img>
      <div class="comments_container">
        <div class="nickname">{{level_item.nickname}}</div>
        <div class="comments_content" ref="comments_content" v-html="level_item.commentContent"></div>
        <div class="comment_option">
          <span class="created_at option">{{level_item.createdAt}}</span>
          {{level_item.commentLikes}}
          <i class="iconfont icon-dianzan option" :class="level_item.liked?'active':'unactive'" @click="commentLikeRequest(level_item)" ></i>
          <span class="repley option" @click="reply(level_item)">回复</span>
        </div>
      </div>
    </div>
    <div class="level2_comment" v-for="(item,index) in level_item.replys">
      <div class="container">
        <img class="avatar" :src="`${baseurl}${item.avatar}`"></img>
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
          <i class="iconfont icon-dianzan option" :class="item.liked?'active':'unactive'" @click="commentLikeRequest(item)"></i>
          <span class="repley option" @click="reply(item)">回复</span>
          </div>
        </div>
      </div>
    </div>
    <CommentInput v-if="is_replying" :comment_level="2" @send="send_level2_comment"></CommentInput>
  </div>
</template>

<script>
import {BASE_URL} from '@/api/config'
import CommentInput from '@/components/CommentInput.vue'
import {mapGetters} from 'vuex'
import HttpManager from '@/api/index'
export default {
  props:["level_item",'is_all','video_item'],
  data() {
    return {
      baseurl:BASE_URL,
      is_replying:false,
      reply_item:''
    }
  },
  components:{
    CommentInput
  },
  computed:{
  },
  watch:{
    is_all(val,old){
      // 用于检测父组件，看父组件有没有指示，若变化则意味着全部输入框关闭，点击的输入框打开
      if(val!=old){
        this.is_replying=false
      }
    }
  },
  methods: {
    commentLikeRequest(item){
      if(item.isLike)
      // 已点赞，发取消点赞请求
      {
        HttpManager.postLikeVideo({cid:item.cid,level:item.level}).then(
            response=>{console.log(response);
          },
            error=>{console.log(error);}
        )
        item.isLike='1'
      }
      else{
      // 未点赞，发送点赞请求
        HttpManager.postUnLikeVideo({cid:item.cid,level:item.level}).then(
            response=>{console.log(response);

            },
            error=>{console.log(error);}
          )
      }
    },
    to_userpage(item){
      this.$router.push({
        path:`/userpage/${item.targetUid}`
        }
      )
    },
    reply(level_item){
      this.reply_item=level_item
      console.log('你要回复的item');
      console.log(level_item);
      this.$emit('toFather')
      this.$nextTick(()=>{
        this.is_replying=true
      })
    },
    send_level2_comment(params){
      // console.log(params);
      console.log('你回复的item');
      console.log({
        oneCommentCid:this.level_item.cid,
        commentContent: params.content,
        cv: this.video_item.cv,
        level: params.comment_level,
        targetCid: this.reply_item.cid,
        targetLevel: this.reply_item.level,
        targetUid: this.reply_item.uid
      });
      HttpManager.postVideoComment({
        oneCommentCid:this.level_item.cid,
        commentContent: params.content,
        cv: this.video_item.cv,
        level: params.comment_level,
        targetCid: this.reply_item.cid,
        targetLevel: this.reply_item.level,
        targetUid: this.reply_item.uid
      }).then(
        response=>{console.log(response);},
        error=>{console.log(error);}
      )
    },
  },
  mounted() {
    // this.comments_content.innerHTML=this.level_item.commentContent
  },
  created(){

  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/commentdiv';
</style>
