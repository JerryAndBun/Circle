<template>
  <div>
    <div class="holediv">
      <div class="contentbox" v-if="isdisappear">
        <div class="switch-img" @click="isloginbox=!isloginbox,isqrbox=!isqrbox"></div>
        <div class="loginheaderbox">
          <h3 class="loginheader" ref="h3">手机扫码登录
          </h3>
        </div>
        <div class="loginbox" v-if="isloginbox">
          <div class="loginform">
            <div class="alertdiv" ref="alertdiv">
              <i class="iconfont icon-gantanhao"></i>
              <span class="alertspan" ref="alertspan">请输入邮箱</span>
            </div>
            <div class="accountbox" ref="accountdiv"><i class="accountboxi"></i>
              <input class="account" ref="account" v-model.trim="email" type="text" placeholder="请输入邮箱" @blur="lose_account">
            </div>

            <div class="passwordbox" ref="passdiv"><i class="passwordboxi"></i>
              <input class="password" ref="pass" v-model.trim="password" type="password" placeholder="请输入密码" @blur="lose_pass">
            </div>
            <div class="loginbutton" @click="loginrequest">登&nbsp&nbsp录</div>
          </div>
        </div>
        <div class="qrbox" v-if="isqrbox">
          <div class="mabox">
            <img class="ma" src="../assets/imgs/二维码.png" alt="">
          </div>
          <div class="qrcodebox" ref="qrcodebox" v-if="ismengban">
            <div class="statusinfo" ref="statusinfo">二维码已失效</div>
            <div class="statusbutton" ref="statusbutton" @click="clearbutton">请点击刷新</div>
            <div class="mengban" ref="mengban"></div>
          </div>
          <img class="pic" src='../assets/imgs/例图.png' alt="">
          <div class="logintips">
            打开AcFun手机APP进入“个人中心”扫码登录
          </div>
          <a class="clicklink" href="https://www.acfun.cn/app/">点击下载客户端</a>
        </div>
        <div class="loginopts">
          <a href="https://www.acfun.cn/about/help" class="login-help">帮助手册</a>
          <a href="javascript:void(0);" class="login-account-switch" ref="togle" @click="togle">账号登录</a>
          <router-link to="/login/register" class="register">立即注册</router-link>
        </div>
      </div>
    </div>
    <div class="loginsuccess" v-if="issuccess">
      <div class="touxiang"></div>
      <div class="welcomediv">
        <span class="nickname">{{nickname}}</span>
        <br>
        <span>欢迎来到Circle</span>
        <br>
        <span class="text">{{second}}秒后自动跳转</span>
      </div>
      <br>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapState } from "vuex";
import axios from "axios";
import HttpManager from "../api/index";
export default {
  data() {
    return {
      email: "",
      password: "",
      nickname: "",
      isdisappear: true,
      issuccess: false,
      isqrbox: true,
      isloginbox: false,
      ismengban: false,
      avilibleemail: false,
      timer: "",
      second: 3
    };
  },
  methods: {
    // 清除蒙版
    clearbutton() {
      clearInterval(this.timer);
      this.ismengban = false;
      this.timer = setInterval(() => {
        this.ismengban = true;
      }, 5000);
    },
    // 切换账号与扫码
    togle() {
      this.isqrbox = !this.isqrbox;
      this.isloginbox = !this.isloginbox;
      if (this.isqrbox) {
        this.$refs.togle.innerHTML = "账号登录";
        // this.$refs.alertdiv.style.visibility = "hidden";
      } else {
        this.$refs.togle.innerHTML = "扫码登录";
      }
    },
    redaccount(bool) {
      if (bool) {
        this.$refs.accountdiv.style.border = "rgb(255, 100, 100) 1px solid";
      } else {
        this.$refs.accountdiv.style.border = "rgb(221, 221, 221) 1px solid";
      }
    },
    redpassword(bool) {
      if (bool) {
        this.$refs.passdiv.style.border = "rgb(255, 100, 100) 1px solid";
      } else {
        this.$refs.passdiv.style.border = "rgb(221, 221, 221) 1px solid";
      }
    },
    showerror() {
      this.$refs.alertdiv.style.visibility = "visible";
    },
    hiddenerror() {
      this.$refs.alertdiv.style.visibility = "hidden";
      this.$refs.accountdiv.style.border = "rgb(221, 221, 221) 1px solid";
    },
    checkdatainfo() {
      if (this.email) {
        this.redaccount(false);
        if (this.password) {
          this.hiddenerror();
          this.redaccount(false);
          this.redpassword(false);
        } else {
          this.showerror();
          this.redpassword(true);
          this.$refs.alertspan.innerHTML = "请输入密码";
        }
      } else {
        this.showerror();
        this.redaccount(true);
        this.$refs.alertspan.innerHTML = "请输入邮箱";
        if (this.password) {
          this.redpassword(false);
        } else {
          console.log("1111");
          this.showerror();
          this.redpassword(true);
          this.$refs.alertspan.innerHTML = "请输入邮箱/密码";
        }
      }
    },
    // 检查账户与密码
    lose_account() {
      this.checkdatainfo();
    },
    lose_pass() {
      this.checkdatainfo();
    },
    loginrequest() {
      this.lose_account();
      this.lose_pass();
      if(!this.email||!this.password){
        this.showerror();
          this.redpassword(true);
          this.redaccount(true);
          this.$refs.alertspan.innerHTML = "请输入邮箱/密码";
          return
      }
      var tti;
      HttpManager.userLogin({
        email: this.email,
        password: this.password
      }).then(
        (response) => {
          /* aixos返回的是一个封装过的Promise对象，
          服务器返回的对象在response.data里，
          而数据在response.data.data，所以才解构赋值 */
          console.log(response);
          let data = response.data.userInfo;
          if (response.status === 200) {
            this.isdisappear = false;
            this.issuccess = true;
            tti = setInterval(() => {
              this.second--;
            }, 1000);
            setTimeout(() => {
              this.$router.push("/");
              clearInterval(tti);
              this.isdisappear = true;
              this.issuccess = false;
            }, 3000);
            this.$store.commit("user/setAvatar", data.avatar);
            this.$store.commit("user/setCreatedAt", data.createdAt);
            this.$store.commit("user/setEmail", data.email);
            this.$store.commit("user/setFans", data.fans);
            this.$store.commit("user/setFocusOn", data.focusOn);
            this.$store.commit("user/setVideos", data.videos);
            this.$store.commit("user/setNickname", data.nickname);
            this.$store.commit("user/setSignature", data.signature);
            this.$store.commit("user/setUid", data.uid);
            this.$store.commit("user/setToken", response.data.token);
            this.$store.commit("user/setIsLogin", true);
            this.nickname = data.nickname;
          } else {
            this.$refs.alertdiv.style.visibility = "visible";
            this.$refs.alertspan.innerHTML = "用户名或密码错误";
          }
        },
        (error) => {
          console.log(error);
          console.log(error.response);
          console.log(error.response.data.message);
          
          if (error.response.data.message == "邮箱未注册") {
            this.$refs.alertdiv.style.visibility = "visible";
            this.$refs.alertspan.innerHTML = "邮箱未注册";
            return
          }else{
            this.$refs.alertdiv.style.visibility = "visible";
            this.$refs.alertspan.innerHTML = "发送请求错误，请检查网络连接";
            return
          }
          // if(){

          // }
          
        }
      );
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.ismengban = true;
    }, 5000);
    //点击刷新
  }
};
</script>

<style lang='scss' scoped>
// @import "../assets/css/global";
@import "../assets/css/codelogin.scss";
</style>