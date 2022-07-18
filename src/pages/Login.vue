<template>
  <div>
    <Header></Header>
    <div class="mainbox">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
// 加载组件
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import CodeLogin from '../components/Codelogin.vue'
import Register from '../components/Register.vue'
import { mapState } from '../store/index'
export default {
  components: {
    Header,
    Footer,
    CodeLogin,
    Register,
  },
  computed: {
    // ...mapState(['username','userpassword'])
  },
  //加载login的js
  methods: {},
  beforeRouteLeave(to, from, next) {
    clearInterval(window.timer)
    next()
  },
}
</script>
<style lang="scss" scoped>
// @import "../assets/css/global";
@import '../assets/css/login';
</style>
