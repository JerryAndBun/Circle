<template>
  <div class="spacediv">
    <div ref="commentInputdiv" class="momentdiv">
      <CommentInput
        v-if="isown"
        v-model="article"
        @cleararticle="cleararticle"
        @sendMoment="sendMoment"
      ></CommentInput>
    </div>
    <div class="momentList">
      <Moment v-for="(item, index) in mommentList" :key="item.contentId" :item="item"></Moment>
      <div class="none_moment">
        <img src="../assets/imgs/这里什么都没有.png" alt="" />
        <span>没有动态了哦</span>
      </div>
    </div>
  </div>
</template>

<script>
import CommentInput from '@/components/CommentInput.vue'
import Moment from '@/components/Moment.vue'
import CirToast from '@/components/CirToast.vue'
import HttpManager from '@/api/index'
import { mapGetters } from 'vuex'

export default {
  props: ['isown'],
  data() {
    return {
      article: '',
      mommentList: '',
      tool: 1,
      list: [],
    }
  },
  methods: {
    cleararticle() {
      // 清空缓存的动态内容
      this.article = ''
    },
    sendMoment(params) {
      HttpManager.sendMomment(params)
        .then(
          (response) => {
            console.log('发送成功')
            return HttpManager.getUserMoment(`/dynamicContentList`)
          },
          (error) => {
            // 请求错误
            console.log('发送失败')
          }
        )
        .then(
          (response) => {
            console.log('获取成功1111111111111')
            this.mommentList = response
          },
          (error) => {
            // 请求错误
            console.log(error.response)
          }
        )
      //    //发送请求完成之后请求刷新动态列表
    },
    requestmoment() {
      if (this.isown) {
        // 是已登录用户的动态
        HttpManager.getUserMoment(`/dynamicContentList`).then(
          (response) => {
            console.log('获取已登录用户的动态成功')
            this.mommentList = response
            console.log(response);
          },
          (error) => {
            // 请求错误
            console.log(error.response)
          }
        )
      } else {
        // 查询别人的动态
        HttpManager.getUserMoment(`/dynamicContentList/${this.$route.params.myuid}`).then(
          (response) => {
            console.log('获取目标用户的动态成功')
            this.mommentList = response
          },
          (error) => {
            // 请求错误
            console.log(error.response)
          }
        )
      }
    },
  },
  components: {
    CommentInput,
    Moment,
    CirToast,
  },
  computed: {
    ...mapGetters('user', ['uid']),
    ...mapGetters('info', ['toast_list']),
  },
  created() {
    this.$watch(
      // 主页所有者改变
      () => this.isown,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        this.requestmoment()
        console.log('主人变化了')
      }
    )
    this.requestmoment()
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
@import '../assets/css/space.scss';
</style>
