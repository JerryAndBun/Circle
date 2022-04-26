<template>
  <div>
    <Header></Header>
    <div class="mainbox">
      <!-- <div class="login-container"> -->
        <router-view></router-view>
          {{$store.state.username}}
          {{$store.state.userpassword}}
        <!-- <div class="contentbox">
          <div class="switch-img"></div>
          <div class="loginheaderbox">
            <h3 class="loginheader">手机扫码登录
            </h3>
          </div>
          <div class="loginbox">
            <div class="loginform">
              <div class="accountbox"><i class="accountboxi"></i>
                <input class="account" type="text" placeholder="请输入账号/邮箱">
              </div>
              <div class="passwordbox"><i class="passwordboxi"></i>
                <input class="password" type="password" placeholder="请输入密码">
              </div>
              <div class="loginbutton">登&nbsp&nbsp录</div>
            </div>
            <div class="mabox">
              <img class="ma" src="../assets/imgs/二维码.png" alt="">
            </div>
            <div class="qrcodebox">

              <div class="statusinfo">二维码已失效</div>
              <div class="statusbutton">请点击刷新</div>
              <div class="mengban"></div>
            </div>
            <img class="pic" src='../assets/imgs/例图.png' alt="">
          </div>
          <div class="logintips">
            打开AcFun手机APP进入“个人中心”扫码登录
          </div>
          <a class="clicklink" href="https://www.acfun.cn/app/">点击下载客户端</a>
          <div class="loginopts">
            <a href="https://www.acfun.cn/about/help" class="login-help">帮助手册</a>
            <a href="" class="login-account-switch">账号登录</a>
            <router-link to="/login/register" class="register">立即注册</router-link>
          </div>
        </div> -->
      <!-- </div> -->
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
// 加载组件
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import CodeLogin from '../components/Codelogin.vue'
import Register from '../components/Register.vue'
import {mapState} from '../store/index'
export default {
  components: {
    Header,
    Footer,
    CodeLogin,
    Register
  },
  computed:{
    // ...mapState(['username','userpassword'])
  },
  //加载login的js
  methods: {},
  beforeRouteLeave(to, from, next) {
    clearInterval(timer);
    next();
  },
  
};
</script>
<style lang="scss" scoped>
// @import "../assets/css/global";
@import "../assets/css/login";
</style>