<template>
  <div class="contentbox">
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
      <a href="javascript:void(0);" class="login-account-switch">账号登录</a>
      <router-link to="/login/register" class="register">立即注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
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
    switc.addEventListener("click",swt );
    accountswitch.addEventListener("click",swt );
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
@import '../assets/css/codelogin.scss';
</style>