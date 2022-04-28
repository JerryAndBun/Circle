<template>
  <div class="contentbox">
    <div class="form">
      <div class="registerheader">
        <!-- <a href="">asdasd</a> -->
        <h3 class="loginheader">用户注册
        </h3>
        <router-link to="/login" href="" class="backtologin">返回登录</router-link>
      </div>
      <div class="infobox"><i class="iconfont icon-shouji"></i>
        <input class="account" type="text" placeholder="请输入账号/邮箱">
      </div>
      <div class="infobox"><i class="iconfont icon-yonghu"></i>
        <input class="account" type="text" placeholder="请输入昵称">
      </div>
      <div class="infobox"><i class="iconfont icon-yaoshi"></i>
        <input class="account" type="password" placeholder="请输入密码">
      </div>
      <div class="infobox"><i class="iconfont icon-yanzhengma"></i>
        <input class="checkinput account" type="text" placeholder="请输入验证码">
        <a href="" class="checkcode">获取验证码</a>
      </div>
      <div class="submitbox"></div>
      <div class="register_button" @click="sendrequest"><a href="">注册</a></div>
      <label for="user_item">
        <div class="item_box">
          <input type="checkbox" class="user_item_input" id="user_item">
          <a class="item_text">我已经认真阅读并同意Circle的</a>
          <a href="" class="agreement">《使用协议》</a>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    sendrequest() {
      console.log(132);
      axios.get("http://localhost:8080/register").then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          // console.log(error);
          console.log("GG", error.message);
        }
      );
    }
  },
  computed: {
    username: {
      get() {
        return this.$store.state.username;
      },
      set(newval) {
        this.$store.commit("setUsername", newval);
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