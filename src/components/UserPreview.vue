<template>
  <div class="contentdiv">
    <router-link :to="{
      path:'/userpage',
      query:{uid:item.uid}
    }" class="img_link">
      <img :src="itemList.myurl" alt="">
    </router-link>
    <div class="userinfo">
      <div class="nickname">
        <router-link class="nickname_link" :to="{
          path:'/userpage',
          query:{uid:item.uid}
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
export default {
  props: ["item"],
  watch: {},
  data() {
    return {
      itemList: this.item
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
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/userpreview.scss";
</style>