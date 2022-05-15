<template>
  <div class="momentdiv">
    <div class="user">
      <div class="nickname">{{nickname}}</div>
      <img class="avatar" :src="this.myavatar"></img>
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
export default {
  props: ["avatar", "nickname", "content","","comment","likes"],
  data() {
    return {
      myavatar:this.avatar
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