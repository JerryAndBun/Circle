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
              <input class="password" ref="pass" v-model.trim="userpassword" type="password" placeholder="请输入密码" @blur="lose_pass">
            </div>
            <div class="loginbutton" @click="sendrequest">登&nbsp&nbsp录</div>
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
export default {
  data() {
    return {
      email: "",
      userpassword: "",
      nickname: "",
      isdisappear: true,
      issuccess: false,
      isqrbox: true,
      isloginbox: false,
      ismengban: false,
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
    // 检查账户与密码
    lose_account() {
      if (!this.email) {
        this.$refs.accountdiv.style.border = "rgb(255, 100, 100) 1px solid";
        this.$refs.alertdiv.style.visibility = "visible";
        this.$refs.alertspan.innerHTML = "请输入账号/邮箱";
      } else {
        this.$refs.accountdiv.style.border = "rgb(221, 221, 221) 1px solid";
        this.$refs.alertspan.innerHTML = "请输入密码";
        if (this.userpassword) {
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
        this.$refs.alertspan.innerHTML = "请输入账号/邮箱";
        if (this.email) {
          this.$refs.alertdiv.style.visibility = "hidden";
        }
      }
    },
    sendrequest() {
      console.log(this.email, this.userpassword);
      this.$refs.pass.blur();
      this.$refs.account.blur();
      const accountreg = /^\w{5,10}@\w{2,3}\.com$/g;
      if (!accountreg.test(this.email)) {
        this.$refs.alertdiv.style.visibility = "visible";
        this.$refs.alertspan.innerHTML = "邮箱格式错误";
        return;
      }
      if (this.userpassword.length < 8) {
        this.$refs.alertdiv.style.visibility = "visible";
        this.$refs.alertspan.innerHTML = "密码长度不应小于8个字符";
        return;
      }
      var tti;
      axios
        .post("http://localhost:8080/lr/login", {
          email: this.email,
          userpassword: this.userpassword
        })
        .then(
          (response) => {
            let { data } = response.data;
            console.log(data);
            if (response.data.status === 200) {
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
              this.$store.commit("setNickname",data.nickname);
              this.$store.commit("setUserPassword",data.userpassword);
              this.$store.commit("setEmail",data.email);
              this.$store.commit("setUid",data.uid);
              this.$store.commit("setIsLogin",true);
              this.nickname = data.nickname;
            } else {
              this.$refs.alertdiv.style.visibility = "visible";
              this.$refs.alertspan.innerHTML = "用户名或密码错误";
            }
          },
          (error) => {
            this.$refs.alertdiv.style.visibility = "visible";
            this.$refs.alertspan.innerHTML = "发送请求错误，请检查网络连接";
            // console.log("GG", error.message);
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