<template>
  <div class="contentdiv">
    <router-link :to="{
      path:`/userpage/${item.uid}`
    }" class="img_link">
      <img class="imgg" :src='`${baseurl}${itemList.avatar}`' alt="">
    </router-link>
    <div class="userinfo">
      <div class="nickname">
        <router-link class="nickname_link" :to="{
          path:`/userpage/${item.uid}`
          }">
          {{itemList.nickname}}
        </router-link>
      </div>
      <div class="fans">{{itemList.fans}}粉丝</div>
      <div class="videos">{{itemList.videos}}投稿</div>
      <div class="signature">{{itemList.signature}}</div>
    </div>
    <div class="btn" ref="btn" @click="sendrequest()">关注</div>
  </div>
</template>

<script>
import HttpManager from "../api/index";
import { mapGetters } from "vuex";
import { BASE_URL } from "../api/config";
export default {
  props: ["item"],
  watch: {},
  data() {
    return {
      itemList: this.item,
      baseurl: BASE_URL
      // isfocuson:this.itemList.isfocuson
    };
  },
  computed: {
    ...mapGetters("user", ["uid"])
  },
  methods: {
    sendrequest() {
      // 已关注，执行取关操作
      if (this.itemList.isFocusOn) {
        HttpManager.postUnFocusUser({
          focusid: this.itemList.uid,
          uid: this.uid
        }).then(
          (response) => {
            console.log(response.data);
            console.log("取关成功");
          },
          (error) => {}
        );
        this.itemList.isFocusOn = false;
        this.$refs.btn.style.backgroundColor = "rgb(15,155,241)";
        this.$refs.btn.style.color = "rgb(248,248,248)";
        this.$refs.btn.innerHTML = "关注";
      } else {
        // 未关注，执行关注操作
        HttpManager.postFollowUser({
          focusid: this.itemList.uid,
          uid: this.uid
        }).then(
          (response) => {
            console.log(response.data);
            console.log("关注成功");
          },
          (error) => {}
        );
        this.itemList.isFocusOn = true;
        this.$refs.btn.style.backgroundColor = "#999";
        this.$refs.btn.style.color = "rgb(248,248,248)";
        this.$refs.btn.innerHTML = "已关注";
      }
    }
  },
  mounted() {
    if (this.fans > 10000) {
      //大于一万作处理
      this.fans = parseFloat((this.fans / 10000).toFixed(1)) + "万";
    }
    if (this.itemList.isFocusOn) {
      this.$refs.btn.style.backgroundColor = "#999";
      this.$refs.btn.style.color = "rgb(248,248,248)";
      this.$refs.btn.innerHTML = "已关注";
    } else {
      this.$refs.btn.style.backgroundColor = "rgb(15,155,241)";
      this.$refs.btn.style.color = "rgb(248,248,248)";
      this.$refs.btn.innerHTML = "关注";
    }
  },
  created(){
    this.$watch(
      () => this.item, //要检测的字段
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        console.log(toParams);

        this.itemList=toParams
      }
    );
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/userpreview.scss";
</style>