<template>
  <div class="vp_content">
    <div class="vp_box">
      <router-link to="/cv" class="front_cover">
        <!-- 封面 -->
        <img :src="src" class="vp_pic" alt="">
      </router-link>
    </div>
    <div class="vp_info_div">
      <router-link to="/cv" >
        <h3>{{title}}【AMV&声之形】我要做你女朋友</h3>
      </router-link>
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