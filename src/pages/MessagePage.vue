<template>
  <div class="box">
    <Header></Header>
    <div class="bg">
    </div>
    <div class="contentdiv">
      <aside class="message_user">
        <ul>
          <li class="top">我的消息</li>
          <li class="user" v-for="(item,index) in 6">
            <img class="useravatar" src="../assets/imgs/狗头.jpg" alt="">
            <span>123123123123123123123123123123123123123123123</span>
          </li>
        </ul>
      </aside>
      <aside class="message_window">
          <MessageWindow></MessageWindow>
      </aside>
    </div>
    <div class="usermain">
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import MessageWindow from "../components/MessageWindow.vue";
import HttpManager from "../api/index";
import { mapGetters } from "vuex";
import { BASE_URL } from "../api/config";

export default {
  data() {
    return {
      judge: ""
    };
  },
  components: {
    Header,
    MessageWindow
  },
  computed: {
    ...mapGetters("user", ["uid"])
  },
  created() {
    // 发起请求，拿到所有通信的对象以及内容
    // HttpManager
  }
};
</script>

<style lang='scss'>
@import "../assets/css/messagepage.scss";
</style>