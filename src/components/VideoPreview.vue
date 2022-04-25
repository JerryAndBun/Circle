<template>
  <div class="vp_box">
    <router-link to="/video/:av">
      <img :src="src" class="vp_pic" alt="">
    </router-link>
    <router-link to="">{{title}}</router-link>
    <span class="vp_info">
      <router-link id="nickname" to='/homepage/${uid}'>{{nickname}}</router-link>
      <label for="nickname">{{date}}</label>
    </span>
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