<template>
  <div>
    <div class="contentbox" v-if="isdisappear">
      <div class="form">
        <div class="registerheader">
          <!-- <a href="">asdasd</a> -->
          <h3 class="loginheader">用户注册</h3>
          <router-link to="/login" href="" class="backtologin">返回登录</router-link>
        </div>
        <div class="infobox">
          <i class="iconfont icon-shouji"></i>
          <input
            class="account"
            type="text"
            v-model="email"
            placeholder="请输入邮箱"
            ref="email"
            @blur="loseemail"
          />
        </div>
        <div class="alertdiv" ref="alertdiv1">
          <i class="iconfont icon-gantanhao"></i>邮箱错误
        </div>
        <div class="infobox">
          <i class="iconfont icon-yonghu"></i>
          <input
            class="account"
            type="text"
            v-model="nickname"
            placeholder="请输入昵称"
            ref="nickname"
            @blur="losenickname"
          />
        </div>
        <div class="alertdiv" ref="alertdiv2">
          <i class="iconfont icon-gantanhao"></i>昵称长度应为3-15个字符，且不包含特殊字符
        </div>
        <div class="infobox">
          <i class="iconfont icon-yaoshi"></i>
          <input
            class="account"
            type="password"
            v-model="userpassword"
            placeholder="请输入密码"
            ref="password"
            @blur="losepass"
          />
        </div>
        <div class="alertdiv" ref="alertdiv3">
          <i class="iconfont icon-gantanhao"></i>密码长度应为3-15个字符
        </div>
        <div class="infobox">
          <i class="iconfont icon-yanzhengma"></i>
          <input
            class="checkinput account"
            type="text"
            v-model="verifycode"
            placeholder="请输入验证码"
          />
          <a
            href=""
            ref="verifycode"
            id="verifycode"
            class="verifycode"
            @click.prevent="sendverifycode"
            >获取验证码</a
          >
        </div>
        <div class="submitbox"></div>
        <div class="register_button" ref="register_button" @click="requestRegister">
          <a href="javascript:;">注册并登录</a>
        </div>
        <label for="user_item">
          <div class="item_box">
            <input type="checkbox" class="user_item_input" id="user_item" @change="colorchange" />
            <a class="item_text">我已经认真阅读并同意Circle的</a>
            <a href="" class="agreement">《使用协议》</a>
          </div>
        </label>
      </div>
    </div>
    <div class="loginsuccess" v-if="issuccess">
      <div class="touxiang"></div>
      <div class="welcomediv">
        <span class="nickname">{{ nickname }}</span>
        <br />
        <span>欢迎来到Circle</span>
        <br />
        <span class="text">{{ second }}秒后自动跳转</span>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import HttpManager from '../api/index'
export default {
  data() {
    return {
      email: '',
      userpassword: '',
      nickname: '',
      verifycode: '',
      counter: '',
      isagreement: false,
      issendverifycode: false,
      isdisappear: true,
      issuccess: false,
      islegalnickname: false,
      islegalpassword: false,
      timeout: 0,
      second: 3,
    }
  },
  methods: {
    // 发送验证码请求
    sendverifycode() {
      this.issendverifycode = true
      this.loseemail()
      this.losenickname()
      this.losepass()
      console.log(this.isagreement, this.islegalemail, this.islegalnickname, this.islegalpassword)
      if (
        !this.isagreement ||
        // !this.islegalemail ||
        !this.islegalnickname ||
        !this.islegalpassword
      ) {
        alert('请完善信息')
        return
      }
      if (this.issendverifycode && !this.timeout) {
        // 设置倒计时
        this.timeout = 60
        this.$refs.verifycode.innerHTML = `${this.timeout}秒后重试`
        this.$refs.verifycode.style.color = `#999`
        this.counter = setInterval(() => {
          this.timeout--
          this.$refs.verifycode.innerHTML = `${this.timeout}秒后重试`
          if (this.timeout == 0) {
            clearInterval(this.counter)
            this.counter = null
            console.log(this.$refs.verifycode.innerHTML)
            this.$refs.verifycode.innerHTML = `获取验证码`
            this.$refs.verifycode.style.color = `rgb(15,155,241)`
            this.issendverifycode = false
            this.$refs.verifycode.style.cursor = 'pointer'
          }
        }, 1000)
      }
      this.$refs.verifycode.style.cursor = 'not-allowed'
      let params = {
        "email": this.email,
        "type": 'REGISTER',
      }
      HttpManager.sendverifycode(params).then(
        (response) => {
          if (response.status == 200) {
            console.log(response.data)
          }
        },
        (error) => {
          alert('获取数据失败')
        }
      )
    },
    requestRegister() {
      // 发送请求前验证数据合法性
      // this.colorchange()
      this.loseemail()
      this.losenickname()
      this.losepass()
      if (
        !this.isagreement ||
        !this.islegalemail ||
        !this.islegalnickname ||
        !this.islegalpassword
      ) {
        alert('不合法')
        return
      }
      var tti
      HttpManager.userRegister({
        email: this.email,
        nickname: this.nickname,
        password: this.userpassword,
        verifyCode: this.verifycode,
      }).then(
        (response) => {
          console.log(response)
          console.log(response.data)
          console.log(response.data.userInfo)
          let data = response.data.userInfo
          // let userinfo = data.userinfo
          // console.log(userinfo);
          this.isdisappear = false
          this.issuccess = true
          tti = setInterval(() => {
            this.second--
          }, 1000)
          setTimeout(() => {
            this.$router.push('/')
            clearInterval(tti)
            clearInterval(this.counter)
            this.isdisappear = true
            this.issuccess = false
          }, 3000)
          this.$store.commit('user/setAvatar', data.avatar)
          this.$store.commit('user/setCreatedAt', data.createdAt)
          this.$store.commit('user/setEmail', data.email)
          this.$store.commit('user/setFans', data.fans)
          this.$store.commit('user/setFocusOn', data.focusOn)
          this.$store.commit('user/setVideos', data.videos)
          this.$store.commit('user/setNickname', data.nickname)
          this.$store.commit('user/setSignature', data.signature)
          this.$store.commit('user/setUid', data.uid)
          this.$store.commit('user/setToken', response.data.token)
          this.$store.commit('user/setIsLogin', true)
        },
        (error) => {
          console.log(error.response)
        }
      )
    },
    colorchange() {
      this.isagreement = !this.isagreement
      if (this.isagreement) {
        this.$refs.register_button.style.backgroundColor = 'rgb(15,155,241)'
      } else {
        this.$refs.register_button.style.backgroundColor = '#999'
      }
    },
    showerror() {
      this.$refs.alertdiv1.style.visibility = 'visible'
    },
    hiddenerror() {
      this.$refs.alertdiv1.style.visibility = 'hidden'
    },
    loseemail() {
      let avilibleemail = false
      HttpManager.postCheckEmail({
        email: this.email,
      }).then(
        (response) => {
          console.log('发送成功')
          console.log(response.data.pass)
          if (response.data.pass) {
            avilibleemail = true
          }
          if (avilibleemail) {
            this.hiddenerror()
          } else {
            this.showerror()
          }
        },
        (error) => {}
      )
    },
    losenickname() {
      if (this.nickname.length < 3 || this.nickname.length > 15) {
        this.$refs.alertdiv2.style.visibility = 'visible'
        this.islegalnickname = false
      } else {
        this.$refs.alertdiv2.style.visibility = 'hidden'
        this.islegalnickname = true
      }
    },
    losepass() {
      if (this.userpassword.length < 3 || this.userpassword.length > 15) {
        this.$refs.alertdiv3.style.visibility = 'visible'
        this.islegalpassword = false
      } else {
        this.$refs.alertdiv3.style.visibility = 'hidden'
        this.islegalpassword = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/register.scss';
// @import '../assets/css/var';
</style>
