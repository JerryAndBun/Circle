<template>
  <div>
    <div class="vp_box">
      <router-link to="/video/:av">
        <img :src="src" class="vp_pic" alt="">
      </router-link>
    </div>
    <div class="vp_info_div">
      <a href="javascript:;">{{title}}标题</a>
      <div class="vp_info">
        <a href="javascript:;">{{nickname}}昵称</a>
        <a href="javascript:;" for="nickname">{{date}}日期</a>
      </div>
    </div>
  </div>
</template>

<script>
// import {mapState} from vuex
// import {mapGetters} from vuex

export default {
  props: ["title", "uid", "av", "nickname", "src", "date"]
  //   computed:{
  //       ...mapState()
  //   }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/videopreview";
</style>