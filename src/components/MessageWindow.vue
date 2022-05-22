<template>
  <div>
    <div class="theuser">{{item.opNickname}}</div>
    <div class="chat_page" ref="chat_page">
      <div v-for="(item,index) in itemList.content" :class="[whichone=item.uid==uid?'minemessagecontent':'yoursmessagecontent']" :key="index">
        <!-- :src='`${baseurl}${itemList.avatar}`' -->
        <img :src="item.uid==uid?`${baseurl}${itemList.avatar}`:`${baseurl}${itemList.opAvatar}`" :class="item.uid==uid?'mineavatar':'yoursavatar'" alt="">
        <div :class="item.uid==uid?'minediv':'yoursdiv'">{{item.content}}</div>
      </div>
    </div>
    <Commentinput @send='send'></Commentinput>
  </div>
</template>

<script>
import { BASE_URL } from "../api/config";
import Commentinput from "../components/CommentInput.vue";
import { mapGetters } from "vuex";
import HttpManager from "../api/index";
export default {
  props: ["item"],
  data() {
    return {
      baseurl: BASE_URL,
      itemList: this.item,
      a: "asd"
    };
  },
  computed: {
    ...mapGetters("user", ["uid"])
  },
  components: {
    Commentinput
  },
  methods: {
    send(params) {
      console.log("send执行了");
      let newparams = { opUid: this.itemList.opUid, content: params.content };
      HttpManager.postMessage(newparams).then(
        (response) => {
          console.log("发送成功");
          // 发送成功了获取新的聊天记录
          HttpManager.getSigelTalk(`/singleMessage/${this.itemList.opUid}`).then(
            (response) => {
              console.log("获取新的成功");
              console.log(response);
              this.itemList = response;
            },
            (error) => {}
          );
        },
        (error) => {
          console.log(error);
        }
      );
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chat_page.scrollTop = this.$refs.chat_page.scrollHeight;
      });
    }
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  created() {
    this.$watch(
      () => this.item, //要检测的字段
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        console.log("变化了");
        this.itemList = toParams;
        console.log(this.itemList);
      }
    );
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/messagewindow.scss";
</style>