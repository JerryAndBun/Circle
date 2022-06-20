<template>
  <div class="momentdiv">
    <div class="user">
      <img class="avatar" :src='`${baseurl}${item.userInfo.avatar}`'></img>
      <div class="nickname">{{item.userInfo.nickname}}</div>
      <div class="time">{{item.userInfo.createdAt}}</div>
    </div>
    <div class="content" ref="content"></div>
    <div class="bottom">
        <div class="likes">
          <i class="iconfont icon-dianzan1">{{}}</i>
        </div>
        <div class="comment">
          <i class="iconfont icon-pinglun">{{}}</i></div>
        <div class="forward">
          <i class="iconfont icon-zhuanfa1">{{}}</i></div>
        </div>
      <div class="spreate"></div>
    </div>
  </div>
</template>

<script>
import {BASE_URL} from '../api/config'
export default {
  props: ['item'],
  data() {
    return {
      myavatar:this.avatar,
      baseurl:BASE_URL
    }
  },
  mounted() {
      if(!this.myavatar){
          this.myavatar=require('../assets/imgs/头像.jpg')
      }
      this.$refs.content.innerHTML=this.item.content
  },
};

</script>

<style lang='scss' scoped>
@import '../assets/css/moment.scss'
</style>