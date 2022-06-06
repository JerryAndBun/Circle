<template>
  <div class="contentdiv">
    <VideoPreview v-for="(item,index) in videList" :key="index" :video_item="item"></VideoPreview>
  </div>
</template>

<script>
import VideoPreview from "../components/VideoPreview.vue";
export default {
  props:['videList'],
  components: {
    VideoPreview
  },
  created(){
    console.log(this.videList);
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/videoresult";
</style>