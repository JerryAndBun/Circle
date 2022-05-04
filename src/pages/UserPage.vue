<template>
  <div class="box">
    <Header></Header>
    <div class="bg">
    </div>
    <div class="usermain">
      <div class="useravatar">
      </div>
      <div class="userinfo">
        <div class="sign">这里是签名这里是签名这里是签名这里是签名这里是签名这里是签名这里是签名这里是签名这里是签名这里是签名这里是签名这里是签名</div>
        <div class="nickname">{{nickname}}</div>
        <div class="follow">
          <p class="listnum">234</p><br>
          <p href="" class="listlink">关注</p>
        </div>
        <div class="fans">
          <p class="listnum">2340</p><br>
          <p href="" class="listlink">粉丝</p>
        </div>
        <div class="manuscript">
          <p class="listnum">32</p><br>
          <p href="" class="listlink">投稿</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Header from "../components/Header.vue";
import { mapGetters } from "vuex";
// import Footer from "../components/Footer.vue";
export default {
  components: {
    Header
    // Footer
  },
  computed: {
    ...mapGetters(["nickname"])
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/userpage.scss";
</style>