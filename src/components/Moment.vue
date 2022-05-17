<template>
  <div class="momentdiv">

    <div class="user">
      <img class="avatar" :src='`${baseurl}${avatar}`'></img>
      <div class="nickname">{{nickname}}</div>
      <!-- <div class="nickname">{{nickname}}</div> -->
      <div class="time">{{createdAt}}</div>
    </div>
    <div class="content" ref="content"></div>
    <div class="bottom">
        <div class="forward">转发</div>
        <div class="comment">{{comment}}</div>
        <div class="likes"></div>
    </div>
  </div>
</template>

<script>
import {BASE_URL} from '../api/config'
export default {
  props: ["avatar", "nickname", "content","","comment","likes",'createdAt'],
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
      this.$refs.content.innerHTML=this.content
      // console.log('子组件----------');
      // console.log(this.avatar);
      // console.log(this.nickname);
      // console.log(this.content);
      // console.log(this.comment);
      // console.log(this.likes);
  },
};

</script>

<style lang='scss' scoped>
@import '../assets/css/moment.scss'
</style>