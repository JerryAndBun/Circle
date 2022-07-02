<template>
  <div></div>
</template>

<script>
import HttpManager from '../api/index'
import { mapGetters } from 'vuex'
import { BASE_URL } from '../api/config'
export default {
  props: ['item'],
  watch: {},
  data() {
    return {
      itemList: this.item,
      baseurl: BASE_URL,
    }
  },
  components: {
    UserPreview,
  },
  computed: {
    ...mapGetters('user', ['uid']),
  },
  methods: {
    sendrequest() {
      // 已关注，执行取关操作
      if (this.itemList.isFocusOn) {
        HttpManager.postUnFocusUser({
          focusid: this.itemList.uid,
          uid: this.uid,
        }).then(
          (response) => {
            console.log('取关成功')
          },
          (error) => {}
        )
        this.itemList.isFocusOn = false
        this.$refs.btn.style.backgroundColor = 'rgb(15,155,241)'
        this.$refs.btn.style.color = 'rgb(248,248,248)'
        this.$refs.btn.innerHTML = '关注'
      } else {
        // 未关注，执行关注操作
        HttpManager.postFollowUser({
          focusid: this.itemList.uid,
          uid: this.uid,
        }).then(
          (response) => {
            console.log('关注成功')
          },
          (error) => {}
        )
        this.itemList.isFocusOn = true
        this.$refs.btn.style.backgroundColor = '#999'
        this.$refs.btn.style.color = 'rgb(248,248,248)'
        this.$refs.btn.innerHTML = '已关注'
      }
    },
  },
  mounted() {
    // console.log(this.item);
    if (this.fans > 10000) {
      //大于一万作处理
      this.fans = parseFloat((this.fans / 10000).toFixed(1)) + '万'
    }
    if (this.itemList.isFocusOn) {
      this.$refs.btn.style.backgroundColor = '#999'
      this.$refs.btn.style.color = 'rgb(248,248,248)'
      this.$refs.btn.innerHTML = '已关注'
    } else {
      this.$refs.btn.style.backgroundColor = 'rgb(15,155,241)'
      this.$refs.btn.style.color = 'rgb(248,248,248)'
      this.$refs.btn.innerHTML = '关注'
    }
  },
  created() {
    console.log(this.item)
    this.$watch(
      () => this.item, //要检测的字段
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        console.log(toParams)
        this.itemList = toParams
      }
    )
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/longuserpreview.scss';
</style>
