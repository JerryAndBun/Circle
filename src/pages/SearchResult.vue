<template>
  <div>
    <Header @searchEvent="search"></Header>
    <div class="searchdiv">
      <div class="searchbox">
        <input
          class="searchInput"
          ref="searchInput"
          placeholder="Circle What You Want"
          type=" text"
          @keydown="search(1)"
          @input="changekeword"
        />
        <a href="" class="sou" @click.prevent=";(authsearch = true), search()">搜索</a>
      </div>
      <div class="distinguish">
        <div
          class="video"
          ref="video"
          @click=";(isvideo = true), (myisuser = false), search(), topage1()"
        >
          <router-link to="/searchresult/video"> 视频 </router-link>
        </div>
        <div
          class="user"
          ref="user"
          @click=";(myisuser = true), (isvideo = false), search(), topage2()"
        >
          <router-link to="/searchresult/user"> 用户 </router-link>
        </div>
        <div class="line" ref="line"></div>
      </div>
    </div>
    <div class="switchdiv">
      <keep-alive>
        <router-view :userList="userList" :videList="videList">
        </router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import HttpManager from '../api/index'
import { mapGetters } from 'vuex'
export default {
  name: 'searchpage',
  data() {
    return {
      myisuser: false,
      firstuser: true,
      isvideo: true,
      firstvideo: true,
      authsearch: false,
      ispage1: 1,
      videList: '',
      userList: '',
    }
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters('info', ['searchtext', 'isuser']),
    ...mapGetters('user', ['uid']),
  },
  methods: {
    changekeword() {
      this.$store.commit('info/setSearchText', this.$refs.searchInput.value)
      console.log(this.$refs.searchInput.value)
    },
    topage1() {
      if (!this.ispage1) {
        console.log(1)
        this.$refs.line.style.transform = 'translateX(-64px)'
      }
      this.ispage1 = 1
    },
    topage2() {
      if (this.ispage1) {
        console.log(2)
        this.$refs.line.style.transform = 'translateX(14px)'
      }
      this.ispage1 = 0
    },
    // 这一部分应该有有优化，暑假优化
    search(a) {
      console.log(this.authsearch)
      console.log(this.myisuser)
      console.log(this.firstuser)
      console.log(this.isvideo)
      console.log(this.firstvideo)
      console.log(a)
      if ((this.isvideo && this.firstvideo) || this.authsearch || a) {
        // 视频组件
        this.firstvideo = false
        this.firstuser = true
        this.authsearch = false
        this.$store.commit('info/setIsUser', this.myisuser)
        console.log('这里是视频搜索')
        console.log(`关键字是${this.searchtext}`)
        HttpManager.getVideoList(`/searchVideo?keyword=${this.searchtext}`).then(
          (response) => {
            console.log(response), (this.videList = response)
          },
          (error) => console.log(error)
        )
        // HttpManager.
      }
      if ((this.myisuser && this.firstuser) || this.authsearch || a) {
        // 用户组件
        this.firstuser = false
        this.firstvideo = true
        this.$store.commit('info/setIsUser', this.myisuser)
        console.log('这里是用户搜索')
        console.log(`关键字是${this.searchtext}`)
        HttpManager.getUserList(`/search/${this.uid}`, {
          params: { keyword: this.searchtext },
        }).then(
          (response) => {
            this.userList = response
            console.log(this.userList)
            // console.log(response);
          },
          (error) => {
            console.log('搜索失败')
          }
        )
      }
    },
  },
  mounted() {
    this.myisuser = this.isuser
    this.isvideo = !this.isuser
    if (this.searchtext.length != 0) {
      this.search()
      console.log('刷新执行')
    }
    this.$refs.searchInput.value = this.searchtext
  },
  created() {
    // HttpManager
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('info/setIsUser', false)
    next()
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/searchresult.scss';
</style>
