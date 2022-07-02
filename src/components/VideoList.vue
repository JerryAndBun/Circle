<template>
  <div>
    <div>
      <div class="togle">
        <div class="page1" @click="topage1">我的投稿</div>
        <div class="page2" @click="topage2">我的收藏</div>
        <div class="line" ref="line"></div>
      </div>
    </div>
    <div class="backgroundDiv">
      <div class="myvideos_content" v-if="!isempty">
        <div class="myvideos" v-if="ispage1">
          <VideoPreview v-for="(item, index) in contribution_list" :key="index" :video_item="item">
            <i class="iconfont icon-bofangliang"></i>
            <a href="javascript:;" class="nickname">{{ item.playNum }}播放</a>
            <a href="javascript:;" for="nickname">{{ item.createdAt }}</a>
          </VideoPreview>
        </div>
        <!-- <PageWrapper  :pageNo="2" :pageSize="3" :total="91" :continues="3"></PageWrapper> -->
      </div>
      <div class="collections_content" v-if="!isempty">
        <div class="mycollects" v-if="ispage2">
          <VideoPreview v-for="(item, index) in collects_list" :key="index" :video_item="item">
            <i class="iconfont icon-bofangliang"></i>
            <a href="javascript:;" class="nickname">{{ item.playNum }}播放</a>
            <a href="javascript:;" for="nickname">{{ item.createdAt }}</a>
          </VideoPreview>
        </div>
      </div>
      <div v-if="isempty" class="emptyinfo">
        <img src="../assets/imgs/这里什么都没有.png" class="empty" alt="" />
        <div class="emptytext" id="emptytext" ref="emptytext">暂无投稿</div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPreview from '../components/VideoPreview.vue'
import PageWrapper from '../components/PageWrapper.vue'
import { BASE_URL } from '../api/config.js'
import HttpManager from '@/api'
import { mapGetters } from 'vuex'
import ContributionVue from '@/pages/Contribution.vue'
export default {
  props: ['itemList', 'isown'],
  data() {
    return {
      ispage1: 1,
      ispage2: 0,
      isempty: 0,
      baseurl: BASE_URL,
      // cv:'a37ec456'
      videoList: '',
      contribution_list: '',
      collects_list: '',
    }
  },
  components: {
    VideoPreview,
    PageWrapper,
  },
  computed: {
    ...mapGetters('user', ['uid']),
  },
  methods: {
    topage1() {
      //第一个按钮的点击事件
      // 投稿为空
      if (this.contribution_list.length == 0) {
        console.log('投稿为空')
        this.isempty = 1
      } else {
        this.isempty = 0
      }
      if (!this.ispage1) {
        console.log(this.itemList)
        console.log(1)
        if (this.isempty) {
          this.$refs.emptytext.innerHTML = '暂无投稿'
        }
        this.$refs.line.style.transform = 'translateX(-64px)'
        console.log(this.ispage1)
        this.ispage1 = 1
        this.ispage2 = 0
      }
    },
    topage2() {
      //第二个按钮的点击事件
      console.log('aaaaa')
      // console.log(this.collects_list);
      if (this.collects_list.length == 0) {
        this.isempty = 1
      } else {
        this.isempty = 0
      }
      if (this.ispage1) {
        this.$refs.line.style.transform = 'translateX(64px)'
        if (this.isempty) {
          this.$nextTick(() => {
            this.$refs.emptytext.innerHTML = '暂无收藏'
          })
        }
        console.log(2)
        this.ispage1 = 0
        this.ispage2 = 1
      }
    },
  },
  created() {
    // 根据UID不同查不同的
    if (this.isown) {
      // 查收藏列表
      HttpManager.getCollectList(`/collectList/${this.uid}`).then(
        (response) => {
          console.log('查询自己收藏视频成功')
          this.collects_list = response
          console.log(response)
        },
        (error) => {
          console.log('查询自己收藏视频失败')
        }
      )
      // 查投稿视频
      HttpManager.getVideoList(`/videoList/${this.uid}`).then(
        (response) => {
          this.contribution_list = response
          console.log(this.contribution_list)
          if (this.contribution_list.length === 0) {
            this.isempty = 1
          }
        },
        (error) => {
          console.log(error)
          this.isempty = 1
          console.log('??')
        }
      )
    } else {
      HttpManager.getCollectList(`/collectList/${this.$route.params.myuid}`).then(
        (response) => {
          console.log('查询该用户收藏视频成功')
          this.videoList = response
          console.log(response)
        },
        (error) => {
          console.log('查询该用户收藏视频失败')
        }
      )
      HttpManager.getVideoList(`/videoList/${this.$route.params.myuid}`).then(
        (response) => {
          this.contribution_list = response
          console.log(this.contribution_list)

          if (this.contribution_list.length === 0) {
            console.log('BUGGGGG')
            this.isempty = 1
          }
        },
        (error) => {
          console.log(error)
          this.isempty = 1
          console.log('??')
        }
      )
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/videolist.scss';
</style>
