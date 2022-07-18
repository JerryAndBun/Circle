<template>
  <div>
    <div>
      <div class="togle">
        <div class="page1" @click="topage1">投稿列表</div>
        <div class="page2" @click="topage2">收藏列表</div>
        <div class="line" ref="line"></div>
      </div>
    </div>
    <div class="backgroundDiv">
      <div class="myvideos_content">
        <div class="myvideos" v-if="ispage1 && !con_isempty">
          <VideoPreview
            v-for="(video_item, index) in contribution_list"
            :key="index"
            :video_item="video_item"
            :menu="['删除投稿']"
            :is_own="isown"
            is_operateable="true"
            type="uncontribution"
            @operated="fillter_collects_list"
          >
            <!-- 凑数的div，目的是挤掉默认的后备内容slot -->
            <div></div>
          </VideoPreview>
        </div>
        <div v-if="con_isempty" class="emptyinfo">
          <img src="../assets/imgs/这里什么都没有.png" class="empty" alt="" />
          <div class="emptytext">暂无投稿</div>
        </div>
        <!-- <PageWrapper  :pageNo="2" :pageSize="3" :total="91" :continues="3"></PageWrapper> -->
      </div>
      <div class="collections_content">
        <div class="mycollects" v-if="ispage2 && !col_isempty">
          <VideoPreview
            v-for="(video_item, index) in collects_list"
            :key="index"
            :video_item="video_item"
            :menu="['取消收藏']"
            :is_own="isown"
            is_operateable="true"
            type="uncollect"
            @operated="fillter_collects_list"
          >
            <!-- 凑数的div，目的是挤掉默认的后备内容slot -->
            <div></div>
          </VideoPreview>
        </div>
        <div v-if="col_isempty" class="emptyinfo">
          <img src="../assets/imgs/这里什么都没有.png" class="empty" alt="" />
          <div class="emptytext">暂无收藏</div>
        </div>
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
      con_isempty: 0,
      col_isempty: 0,
      // 是否显示视频下拉的菜单
      is_show_option_div: false,
      baseurl: BASE_URL,
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
  watch: {
    col_isempty(newval, old) {
      console.log(newval)
    },
  },
  methods: {
    // 取消收藏之后过滤数组，重新渲染
    fillter_collects_list(val) {
      console.log('我执行了')
      this.getVideoListById()
    },

    topage1() {
      //第一个按钮的点击事件
      // 投稿为空
      if (this.contribution_list.length == 0) {
        this.con_isempty = 1
        this.col_isempty = 0
      } else {
        this.con_isempty = 0
      }
      if (this.ispage2) {
        this.$refs.line.style.transform = 'translateX(-64px)'
        this.ispage1 = 1
        this.ispage2 = 0
      }
      console.log(this.con_isempty)
      console.log(this.col_isempty)
    },
    topage2() {
      //第二个按钮的点击事件
      if (this.collects_list.length == 0) {
        this.col_isempty = 1
        this.con_isempty = 0
      } else {
        this.col_isempty = 0
      }
      if (this.ispage1) {
        this.$refs.line.style.transform = 'translateX(64px)'
        this.ispage1 = 0
        this.ispage2 = 1
      }
    },
    getVideoListById() {
      HttpManager.getCollectList(`/collectList/${this.$route.params.myuid}`).then(
        (response) => {
          console.log('查询该用户收藏视频成功')
          this.collects_list = response
          console.log(response)
          if (this.collects_list.length == 0) {
            // this.col_isempty = 1
          } else {
            this.col_isempty = 0
          }
        },
        (error) => {
          console.log('查询该用户收藏视频失败')
        }
      )
      HttpManager.getVideoList(`/videoList/${this.$route.params.myuid}`).then(
        (response) => {
          console.log('查询该用户投稿视频成功')
          this.contribution_list = response
          if (this.contribution_list.length === 0) {
            console.log('投稿数为0')
            this.con_isempty = 1
          } else {
            this.con_isempty = 0
          }
        },
        (error) => {
          console.log(error)
          this.con_isempty = 1
        }
      )
    },
  },
  created() {
    // 根据UID不同查不同的
    this.$watch(
      () => this.$route.params.myuid, //要检测的字段
      (toParams, previousParams) => {
        // 对路由变化做出响应...			//一般在这再次发起请求
        this.getVideoListById()
      }
    )
    this.getVideoListById()
  },
  mounted() {
    this.topage1()
    console.log('是我的吗')
    console.log(this.isown)
    if (this.isown) {
    } else {
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/videolist.scss';
</style>
