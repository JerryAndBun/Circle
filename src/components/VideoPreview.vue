<template>
  <div class="vp_content">
    <div class="vp_box" @click="to_this_video">
      <img :src="`${baseurl}${video_item.picPath}`" class="vp_pic" alt="" >
      <!-- <router-link :to="`/video/${video_item.cv}`" class="front_cover">
        <img :src="`${baseurl}${video_item.picPath}`" class="vp_pic" alt="">
      </router-link> -->
    </div>
    <div class="vp_info_div">
      <h3 @click="to_this_video">{{video_item.title}}</h3>
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
  methods:{
    to_this_video(){
      console.log('ccccc');
      this.$router.push(`/video/${this.video_item.cv}`)
    },
  },
  created(){
    console.log(this.video_item);
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/videopreview";
</style>