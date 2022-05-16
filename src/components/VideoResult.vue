<template>
  <div class="contentdiv">
      <VideoPreview v-for="(item,index) in 30"></VideoPreview>
  </div>
</template>

<script>
import VideoPreview from '../components/VideoPreview.vue'
export default {
    components:{
        VideoPreview
    }
}
</script>

<style lang='scss' scoped>
@import '../assets/css/videoresult'

</style>