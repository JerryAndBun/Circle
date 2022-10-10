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
          <transition name="drop">
            <div class="option_div" id="option_div" ref="option_div" v-if="is_show_option_div">
              <ul>
                <li v-for="(item, index) in this_menu" :key="index" @click="opreate_request(item)">
                  {{ item }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '../api/config'
import HttpManager from '@/api/index'
export default {
  props: ['video_item', 'type', 'is_operateable', 'menu', 'is_own'],
  data() {
    return {
      // cv:'"a37ec456"',
      baseurl: BASE_URL,
      this_menu: '',
      this_type: '',
      // 是否显示操作框
      is_show_option_div: false,
    }
  },
  methods: {
    opreate_request(item) {
      // 这个item为以后更多功能预留位置，根据item的值判断是收藏底下的具体哪个操作
      // console.log(item)
      if (this.this_type == 'uncollect') {
        HttpManager.deleteUnCollectByCv(`/unCollect/${this.video_item.cv}`).then(
          (response) => {
            console.log('删除收藏成功')
            this.$emit('operated', 'uncollect')
          },
          (error) => console.log(error)
        )
      }
      if (this.this_type == 'uncontribution') {
        // 删除投稿的
        HttpManager.deleteVideoByCv(`/video/${this.video_item.cv}`).then(
          (response) => {
            console.log('删除投稿成功')
            this.$emit('operated', 'deletevideo')
          },
          (error) => console.log(error)
        )
      }
      if (this.this_type == 'collect') {
        // 别人的主页，收藏他的收藏夹视频
        HttpManager.postCollectByCv(`/collect/${this.video_item.cv}`).then(
          (response) => {
            console.log('收藏他的成功')
          },
          (error) => console.log(error)
        )
      }
    },
    to_this_video() {
      console.log('ccccc')
      this.$router.push(`/video/${this.video_item.cv}`)
    },
  },
  watch: {
    is_show_option_div(next, old) {
      if (next) {
        this.$nextTick(() => {
          this.$refs.option_div.style.height = this.menu.length * 34 + 'px'
        })
      }
    },
  },
  created() {},
  mounted() {
    // console.log(this.type)
    if (this.is_show_option_div) {
      console.log('aaaaaaaaa')
    }
    console.log('******xia');
    console.log(this.video_item);
    console.log('******shang');

    this.this_type = this.type
    this.this_menu = this.menu
    if (this.is_own) {
    } else {
      this.this_menu = ['收藏']
      this.this_type = 'collect'
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/videopreview';
.drop-enter-active {
  transition: all 0.3s ease;
  //   opacity: 1;
}
.drop-leave-active {
  transition: all 0.3s ease;
}
.drop-enter-to {
  opacity: 1;
  height: 112px;
}
.drop-enter, .drop-leave-to
/* .drop-leave-active for below version 2.1.8 */ {
  transform: translateY(-20px);
  height: 0px;
  opacity: 0;
}
</style>
