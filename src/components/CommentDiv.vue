<template>
  <div class="level1_comment">
    <div class="container">
      <img class="avatar" :src="`${baseurl}${item.avatar}`"></img>
      <div class="comments_container">
        <div class="nickname">{{item.nickname}}</div>
        <div class="comments_content">{{item.commentContent}}</div>
        <div class="comment_option">
          <span class="created_at option">{{item.createdAt}}</span>
          {{item.commentLikes}}
          <i class="iconfont icon-dianzan option"></i>
          <span class="repley option" @click="reply">回复</span>
        </div>
      </div>
    </div>
    <div class="level2_comment" v-for="(item,index) in item.replys">
      <div class="container">
        <img class="avatar" :src="`${baseurl}${item.avatar}`"></img>
        <div class="comments_container">
          <div class="comment_area">
            <div class="nickname">{{item.nickname}}</div>
            <div class="reply_area" v-if="item.target_level==2">
              <span>回复</span>&nbsp<a @click="to_userpage(item)" class="reply_nickname">{{item.target_nickname}}</a>&nbsp:
            </div>
            <span class="comments_content">{{item.commentContent}}</span>
          </div>
          <div class="comment_option">
          <span class="created_at option">{{item.createAt}}</span>
            {{item.commentLikes}}
          <i class="iconfont icon-dianzan option"></i>
          <span class="repley option">回复</span>
          </div>
        </div>
      </div>
    </div>
    <CommentInput v-if="is_replying" :comment_level="2" ></CommentInput>
  </div>
</template>

<script>
import {BASE_URL} from '@/api/config'
import CommentInput from '@/components/CommentInput.vue'
export default {
  props:["item",'is_all'],
  data() {
    return {
      baseurl:BASE_URL,
      is_replying:false,
    }
  },
  components:{
    CommentInput
  },
  watch:{
    is_all(val,old){
      console.log(val);
      this.is_replying=val
    }
  },
  methods: {
    to_userpage(){
      this.$router.push({
        path:`/userpage/${this.item.target_uid}`
      }
      )
    },
    reply(){
      console.log('123');
      this.$emit('closeAll',false)
      this.is_replying=true
    },
  },
  mounted() {
    console.log(this.item);
    this.is_replying=this.is_all
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/commentdiv';
</style>
