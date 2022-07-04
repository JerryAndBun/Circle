<template>
  <div class="vp_content">
    <div class="vp_box" @click="to_this_video">
      <img :src="`${baseurl}${video_item.picPath}`" class="vp_pic" alt="" />
    </div>
    <div class="vp_info_div">
      <h3 @click="to_this_video">{{ video_item.title }}</h3>
      <div class="vp_info">
        <slot>
          <!-- 后备插槽，没有指定插槽就使用这个，若指定了则使用指定了的 -->
          <i class="iconfont icon-UP"></i>
          <router-link
            href="javascript:;"
            class="nickname"
            :to="{ path: `/userpage/${video_item.uid}` }"
            >{{ video_item.nickname }}</router-link
          >
          <router-link
            href="javascript:;"
            class="nickname"
            :to="{ path: `/userpage/${video_item.uid}` }"
            >{{ video_item.createdAt }}</router-link
          >
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '../api/config'
export default {
  props: ['video_item'],
  data() {
    return {
      // cv:'"a37ec456"',
      baseurl: BASE_URL,
    }
  },
  methods: {
    to_this_video() {
      console.log('ccccc')
      this.$router.push(`/video/${this.video_item.cv}`)
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
@import '../assets/css/videopreview';
</style>
