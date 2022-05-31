<template>
  <div class="vp_content">
    <div class="vp_box">
      <router-link :to="`/video/${cv}`" class="front_cover">
        <!-- 封面 -->
        <img :src="url" class="vp_pic" alt="">
      </router-link>
    </div>
    <div class="vp_info_div">
      <router-link :to="`/video/${cv}`" >
        <h3>{{title}}【AMV&声之形】我要做你女朋友</h3>
      </router-link>
      <div class="vp_info">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "uid", "cv", "nickname", "url", "date"],
  data() {
    return {
      // cv:'"a37ec456"',
    }
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/videopreview";
</style>