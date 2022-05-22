<template>
  <div class="box">
    <Header></Header>
    <div class="bg">
    </div>
    <div class="contentdiv">
      <aside class="message_user">
        <ul>
          <li class="top"><i class="iconfont icon-youjian"></i> 我的消息</li>
          <li class="user" :class="current==index?'active':''" v-for="(item,index) in messageList" @click="tothischat(item),changecurrent(index)">
            <img class="useravatar" :src="`${baseurl}${item.opAvatar}`" alt="">
            <span>{{item.opNickname}}</span>
          </li>
        </ul>
      </aside>
      <aside class="message_window">
        <div v-if="!isshowwindow" class="nomessage">
          <img src="../assets/imgs/这里什么都没有.png" class="empty" alt="">
          <div class="emptytext">这里什么都没有呢</div>
        </div>
        <router-view :item='thismessageList' v-if="isshowwindow">
        </router-view>
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
      messageList: "",
      thismessageList: "", //用于中转的变量
      current: 0,
      baseurl: BASE_URL,
      isshowwindow: false,
      singlemessage: "",
      count: 0
    };
  },
  methods: {
    tothischat(item) {
      console.log(item);
      // console.log();
      this.thismessageList = item;
      this.$router.push({ path: `/messagepage/${item.opUid}` }).catch((err) => {});
    },
    changecurrent(index) {
      this.current = index;
    }
  },
  components: {
    Header,
    MessageWindow
  },
  computed: {
    ...mapGetters("user", ["uid"])
  },
  mounted() {
    // this.tothischat(this.messageList[this.messageList.length])
    // console.log();
  },
  created() {
    console.log("父组件");
    console.log("获取所有消息列表之前的数据是");
    console.log(this.messageList);
    // 发起请求，拿到所有通信的对象以及内容
    HttpManager.getUserMessage().then(
      (response) => {
        this.messageList = response;
        // 若是私信按钮的，生成一个空的聊天记录到List
        // console.log(this.$route.params.uid);
        if (this.$route.params.uid) {
          HttpManager.getSigelTalk(`/singleMessage/${this.$route.params.uid}`).then(
            (response) => {
              this.isshowwindow = true;
              console.log("所有单个消息列表");
              this.singlemessage = response;
              console.log(this.singlemessage);
              const isntareadlyin = (item) => item.opUid != response.opUid;
              if (this.messageList.every(isntareadlyin)) {
                this.messageList.unshift(this.singlemessage);
                // this.tothischat(this.messageList[this.messageList.length - 1]);
                this.tothischat(this.messageList[0]);
                console.log(this.messageList);
              }
            },
            (error) => {}
          );
        }
        if (this.messageList.length === 0) {
          return; //没有消息
        }
        // 有消息
        this.isshowwindow = true;
        console.log("所有消息列表");
        console.log(this.messageList);
        // if
        this.tothischat(this.messageList[0]);
      },
      (error) => {
        console.log();
      }
    );
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/messagepage.scss";
</style>