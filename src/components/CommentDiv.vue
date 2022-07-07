<template>
  <div class="level1_comment">
    <div class="container">
      <img class="avatar" :src="item.avatar_path"></img>
      <div class="comments_container">
        <div class="nickname">{{item.nickname}}</div>
        <div class="comments_content">{{item.comment_content}}</div>
        <div class="comment_option">
        <span class="created_at option">{{item.createAt}}</span>
        {{item.comment_likes}}
        <i class="iconfont icon-dianzan option"></i>
        <span class="repley option">回复</span>
        </div>
      </div>
    </div>
    <div class="level2_comment" v-for="(item,index) in item.replys">
      <div class="container">
        <img class="avatar" :src="item.avatar_path"></img>
        <div class="comments_container">
          <div class="comment_area">
            <div class="nickname">{{item.nickname}}</div>
            <div class="reply_area" v-if="item.target_level==2">
              <span>回复</span>&nbsp<a @click="to_userpage(item)" class="reply_nickname">{{item.target_nickname}}</a>&nbsp:
            </div>
            <span class="comments_content">{{item.comment_content}}</span>
          </div>
          <div class="comment_option">
          <span class="created_at option">{{item.createAt}}</span>
            {{item.comment_likes}}
          <i class="iconfont icon-dianzan option"></i>
          <span class="repley option">回复</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["item"],
  methods: {
    to_userpage(){
      this.$router.push({
        path:`/userpage/${item.target_uid}`
      }
      )
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/commentdiv';
</style>
