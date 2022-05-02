<template>
  <div>
    <div class="contentbox" v-if="isdisappear">
      <div class="form">
        <div class="registerheader">
          <!-- <a href="">asdasd</a> -->
          <h3 class="loginheader">用户注册
          </h3>
          <router-link to="/login" href="" class="backtologin">返回登录</router-link>
        </div>
        <div class="infobox"><i class="iconfont icon-shouji"></i>
          <input class="account" type="text" v-model="email" placeholder="请输入邮箱" ref="email" @blur="loseemail">
        </div>
        <div class="alertdiv" ref="alertdiv1"> <i class="iconfont icon-gantanhao"></i>邮箱格式错误</div>
        <div class="infobox"><i class="iconfont icon-yonghu"></i>
          <input class="account" type="text" v-model="nickname" placeholder="请输入昵称" ref="nickname" @blur="losenickname">
        </div>
        <div class="alertdiv" ref="alertdiv2"> <i class="iconfont icon-gantanhao"></i>昵称长度应为3-15个字符，且不包含特殊字符</div>
        <div class="infobox"><i class="iconfont icon-yaoshi"></i>
          <input class="account" type="password" v-model="userpassword" placeholder="请输入密码" ref="password" @blur="losepass">
        </div>
        <div class="alertdiv" ref="alertdiv3"> <i class="iconfont icon-gantanhao"></i>密码长度应为3-15个字符</div>
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
    <div class="loginsuccess" v-if="issuccess">
      <img src="../assets/imgs/头像.jpg" alt="" class="touxiang">
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
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      userpassword: "",
      nickname: "",
      isagreement: false,
      isdisappear: true,
      issuccess: false,
      islegalemail: false,
      islegalnickname: false,
      islegalpassword: false,
      second: 3
    };
  },
  methods: {
    requestRegister() {
      // 发送请求前验证数据合法性
      // this.colorchange();
      this.loseemail();
      this.losenickname();
      this.losepass();
      if (!this.isagreement || !this.islegalemail || !this.islegalnickname || !this.islegalpassword) {
        alert("不合法");
        return;
      }
      var tti;
      axios
        .post("http://localhost:8080/lr/register", {
          email: this.email,
          nickname: this.nickname,
          userpassword: this.userpassword
        })
        .then(
          (response) => {
            let { data } = response.data;
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
            // console.log(data);
            this.$store.commit("setNickname", data.nickname);
            this.$store.commit("setUserPassword", data.userpassword);
            this.$store.commit("setEmail", data.email);
            this.$store.commit("setUid", data.uid);
            this.$store.commit("setIsLogin", true);
          },
          (error) => {
            console.log("GG", error.message);
          }
        );
    },
    colorchange() {
      this.isagreement = !this.isagreement;
      if (this.isagreement) {
        this.$refs.register_button.style.backgroundColor = "rgb(15,155,241)";
      } else {
        this.$refs.register_button.style.backgroundColor = "#999";
      }
    },
    loseemail() {
      const accountreg = /^\w{5,10}@\w{2,3}\.com$/g;
      if (!accountreg.test(this.email)) {
        this.$refs.alertdiv1.style.visibility = "visible";
        this.islegalemail = false;
      } else {
        this.$refs.alertdiv1.style.visibility = "hidden";
        this.islegalemail = true;
      }
    },
    losenickname() {
      if (this.nickname.length < 3 || this.nickname.length > 15) {
        this.$refs.alertdiv2.style.visibility = "visible";
        this.islegalnickname = false;
      } else {
        this.$refs.alertdiv2.style.visibility = "hidden";
        this.islegalnickname = true;
      }
    },
    losepass() {
      if (this.userpassword.length < 3 || this.userpassword.length > 15) {
        this.$refs.alertdiv3.style.visibility = "visible";
        this.islegalpassword = false;
      } else {
        this.$refs.alertdiv3.style.visibility = "hidden";
        this.islegalpassword = true;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/register.scss";
</style>