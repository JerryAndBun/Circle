<template>
  <div class="vp_content">
    <div class="vp_box">
      <router-link :to="`/video/${video_item.cv}`" class="front_cover">
        <!-- 封面 -->
        <img :src="`${baseurl}${video_item.picPath}`" class="vp_pic" alt="">
      </router-link>
    </div>
    <div class="vp_info_div">
      <router-link :to="`/video/${video_item.cv}`" >
        <h3>{{video_item.title}}</h3>
      </router-link>
      <div class="vp_info">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {BASE_URL} from '../api/config'
export default {
  props: ["video_item"],
  data() {
    return {
      // cv:'"a37ec456"',
      baseurl:BASE_URL
    }
  },
  created(){
    console.log(this.video_item);
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/videopreview";
</style>