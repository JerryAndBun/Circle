<template>
  <div class="vp_content" ref="vp_content">
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
        <div class="option_content" v-if="is_operateable">
          <i class="iconfont icon-bofangliang"></i>
          <a href="javascript:;" class="nickname">{{ video_item.playNum }}播放</a>
          <a href="javascript:;" for="nickname">{{ video_item.createdAt }}</a>
          <div class="option" ref="option" @click="is_show_option_div = !is_show_option_div">
            <i class="iconfont icon-gengduo"></i>
          </div>
          <div class="option_div" v-if="is_show_option_div">
            <ul>
              <li @click="send_uncollect">取消收藏</li>
              <li>取消收藏</li>
              <li>取消收藏</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '../api/config'
import HttpManager from '@/api/index'
export default {
  props: ['video_item', 'is_operateable'],
  data() {
    return {
      // cv:'"a37ec456"',
      baseurl: BASE_URL,
      // 是否显示操作框
      is_show_option_div: false,
    }
  },
  methods: {
    send_uncollect() {
      HttpManager.postUnCollectByCv(`/unCollect/${this.video_item.cv}`).then(
        (response) => {
          console.log(response)
          this.$emit('uncollect', this.video_item.cv)
        },
        (error) => console.log(error)
      )
    },
    to_this_video() {
      console.log('ccccc')
      this.$router.push(`/video/${this.video_item.cv}`)
    },
  },
  created() {},
  mounted() {
    console.log(this.video_item)
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/videopreview';
</style>
