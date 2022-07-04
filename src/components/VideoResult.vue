<template>
  <div class="contentdiv">
    <VideoPreview v-for="(item, index) in videList" :key="index" :video_item="item"></VideoPreview>
  </div>
</template>

<script>
import VideoPreview from '../components/VideoPreview.vue'
import HttpManager from '@/api/index'
import { mapGetters } from 'vuex'
export default {
  props: ['videList'],
  components: {
    VideoPreview,
  },
  computed: {
    ...mapGetters('info', ['searchtext']),
  },
  created() {
    
    console.log(this.videList)
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/videoresult';
</style>
