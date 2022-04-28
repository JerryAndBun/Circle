<template>
  <div class="contentbox">
    <div class="switch-img"></div>
    <div class="loginheaderbox">
      <h3 class="loginheader" ref="h3">手机扫码登录
      </h3>
    </div>
    <div class="loginbox">
      <div class="loginform">
        <div class="alertdiv" ref="alertdiv">
          <i class="iconfont icon-gantanhao"></i>
          <span class="alertspan" ref="alertspan">请输入账号</span>
        </div>
        <div class="accountbox" ref="accountdiv"><i class="accountboxi"></i>
          <input class="account" v-model.trim="email" type="text" placeholder="请输入账号/邮箱" @blur="lose_account">
        </div>

        <div class="passwordbox" ref="passdiv"><i class="passwordboxi"></i>
          <input class="password" v-model.trim="userpassword" type="password" placeholder="请输入密码" @blur="lose_pass">
        </div>
        <div class="loginbutton" @click="sendrequest">登&nbsp&nbsp录</div>
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
      <a href="javascript:void(0);" class="login-account-switch">账号登录</a>
      <router-link to="/login/register" class="register">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      userpassword: ""
    };
  },
  methods: {
    lose_account() {
      if (!this.email) {
        this.$refs.accountdiv.style.border = "rgb(255, 100, 100) 1px solid";
        this.$refs.alertdiv.style.visibility = "visible";
        this.$refs.alertspan.innerHTML = "请输入账号/邮箱";
      } else {
        this.$refs.accountdiv.style.border = "rgb(221, 221, 221) 1px solid";
        if(this.userpassword){
          this.$refs.alertdiv.style.visibility = "hidden";
        }
      }
    },
    lose_pass() {
      if (!this.userpassword) {
        this.$refs.passdiv.style.border = "rgb(255, 100, 100) 1px solid";
        this.$refs.alertdiv.style.visibility = "visible";
        this.$refs.alertspan.innerHTML = "请输入密码";
      } else {
        this.$refs.passdiv.style.border = "rgb(221, 221, 221) 1px solid";
        if(this.email){
          this.$refs.alertdiv.style.visibility = "hidden";
        }
      }
    },
    sendrequest() {
      console.log(132);
      axios
        .post("http://localhost:8080/lr/login", {
          email: this.email,
          userpassword: this.userpassword
        })
        .then(
          (response) => {
            console.log(response.data);
            let data = response.data
            if(data.status===200){
              alert('登陆成功')
            }
            else{
              alert('登陆失败,请检查用户名与密码')
            }
          },
          (error) => {
            // console.log(error);
            console.log("GG", error.message);
          }
        );
    }
  },
  mounted() {
    var loginbox = document.querySelector(".loginbox");
    var logintips = document.querySelector(".logintips");
    var clicklink = document.querySelector(".clicklink");
    var accountswitch = document.querySelector(".login-account-switch");
    var accountlogin = document.querySelector(".loginheader");
    var loginform = document.querySelector(".loginform");
    var switc = document.querySelector(".switch-img");
    // var switc2 = document.querySelector(".login-account-switch");
    var qrcodebox = document.querySelector(".qrcodebox");
    var statusbutton = document.querySelector(".statusbutton");
    //定时三秒刷新的定时器函数体
    window.timerrunner = function () {
      if (qrcodebox.style.visibility == "visible") {
        clearInterval(window.timer);
      }
      qrcodebox.style.visibility = "visible";
    };
    // window.window.timerrunner=window.timerrunner
    //启动定时器
    window.timer = setInterval(window.timerrunner, 3000);
    statusbutton.addEventListener("click", function () {
      clearInterval(window.timer);
      qrcodebox.style.visibility = "hidden";
      window.timer = setInterval(window.timerrunner, 3000);
    });
    //点击刷新
    window.isqr = 1;
    function swt() {
      if (window.isqr === 1) {
        loginbox.style.visibility = "hidden";
        logintips.style.visibility = "hidden";
        clicklink.style.visibility = "hidden";
        accountswitch.innerHTML = "忘记密码";
        accountlogin.innerHTML = "账号登录";
        loginform.style.visibility = "visible";
        qrcodebox.style.visibility = "hidden";
        clearInterval(window.timer);
        window.isqr = -window.isqr;
      } else {
        loginform.style.visibility = "hidden";
        loginbox.style.visibility = "visible";
        logintips.style.visibility = "visible";
        clicklink.style.visibility = "visible";
        accountswitch.innerHTML = "账号登录";
        accountlogin.innerHTML = "手机扫码登录";
        window.isqr = -window.isqr;
        window.timer = setInterval(window.timerrunner, 3000);
      }
    }
    switc.addEventListener("click", swt);
    accountswitch.addEventListener("click", swt);
  },
  beforeRouteEnter(to, from, next) {
    if (window.isqr) {
      window.timer = setInterval(window.timerrunner, 3000);
    }
    next();
  }
};
</script>

<style lang='scss' scoped>
// @import "../assets/css/global";
@import "../assets/css/codelogin.scss";
</style>