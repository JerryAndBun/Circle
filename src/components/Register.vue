<template>
  <div class="contentbox">
    <div class="form" v-if="isdisappear">
      <div class="registerheader">
        <!-- <a href="">asdasd</a> -->
        <h3 class="loginheader">用户注册
        </h3>
        <router-link to="/login" href="" class="backtologin">返回登录</router-link>
      </div>
      <div class="infobox"><i class="iconfont icon-shouji"></i>
        <input class="account" type="text" v-model="email" placeholder="请输入手机号/邮箱" @blur="losephone">
      </div>
      <div class="alertdiv" ref="alertdiv1"> <i class="iconfont icon-gantanhao"></i>手机号长度应为11个字符</div>
      <div class="infobox"><i class="iconfont icon-yonghu"></i>
        <input class="account" type="text" v-model="nickname" placeholder="请输入昵称" @blur="losenickname">
      </div>
      <div class="alertdiv" ref="alertdiv2"> <i class="iconfont icon-gantanhao"></i>昵称长度应为2-15个字符，且不包含特殊字符</div>
      <div class="infobox"><i class="iconfont icon-yaoshi"></i>
        <input class="account" type="password" v-model="userpassword" placeholder="请输入密码" @blur="losepass">
      </div>
      <div class="alertdiv" ref="alertdiv3"> <i class="iconfont icon-gantanhao"></i>密码不能为空</div>
      <div class="infobox"><i class="iconfont icon-yanzhengma"></i>
        <input class="checkinput account" type="text" placeholder="请输入验证码">
        <a href="" class="checkcode">获取验证码</a>
      </div>
      <div class="submitbox"></div>
      <div class="register_button" ref="register_button" @click="requestRegister"><a href="javascript:;">注册并登录</a></div>
      <label for="user_item">
        <div class="item_box">
          <input type="checkbox" class="user_item_input" id="user_item" @change="colorchange">
          <a class="item_text">我已经认真阅读并同意Circle的</a>
          <a href="" class="agreement">《使用协议》</a>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ischecked: false,
      isdisappear: true
    };
  },
  methods: {
    requestRegister() {
      if (!this.ischecked) {
        return;
      }
      var _this = this
      axios
        .post("http://localhost:8080/lr/register", {
          email: this.email,
          nickname: this.nickname,
          userpassword: this.userpassword
        })
        .then(
          (response) => {
            this.isdisappear = false;
            // console.log(this);
            setTimeout(()=>{
              this.$router.push("/");
            }, 2000);
          },
          (error) => {
            console.log("GG", error.message);
          }
        );
    },
    colorchange() {
      this.ischecked = !this.ischecked;
      // console.log(!true);
      if (this.ischecked) {
        this.$refs.register_button.style.backgroundColor = "rgb(15,155,241)";
        // console.log('truele');
      } else {
        this.$refs.register_button.style.backgroundColor = "#999";
      }
    },
    losephone() {
      if (!this.email) {
        this.$refs.alertdiv1.style.visibility = "visible";
      } else {
        this.$refs.alertdiv1.style.visibility = "hidden";
      }
    },
    losenickname() {
      if (!this.nickname) {
        this.$refs.alertdiv2.style.visibility = "visible";
      } else {
        this.$refs.alertdiv2.style.visibility = "hidden";
      }
    },
    losepass() {
      if (!this.userpassword) {
        this.$refs.alertdiv3.style.visibility = "visible";
      } else {
        this.$refs.alertdiv3.style.visibility = "hidden";
      }
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.state.email;
      },
      set(newval) {
        this.$store.commit("setEmail", newval);
      }
    },
    nickname: {
      get() {
        return this.$store.state.nickname;
      },
      set(newval) {
        this.$store.commit("setNickname", newval);
      }
    },
    userpassword: {
      get() {
        return this.$store.state.userpassword;
      },
      set(newval) {
        this.$store.commit("setUserPassword", newval);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/register.scss";
</style>