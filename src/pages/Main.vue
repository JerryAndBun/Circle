<template>
  <div>
    <Header></Header>
    <div class="streamer">
    </div>
    <div class="top_area">
      <div class="banner_container">
        <div class="footer">
          <div class="banner_mask">
          </div>
        </div>
        <Banner class="banner"></Banner>
      </div>
      <VideoPreview v-for="(item,index) in 6 " :key="index"></VideoPreview>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Banner from "@/components/Banner.vue";
import VideoPreview from "@/components/VideoPreview.vue";

export default {
  components: {
    Header,
    Banner,
    VideoPreview
  },
  methods: {
    load() {
      console.log("123");
      alert("?");
    }
  },
  beforeRouteEnter(from, to, next) {
    if (localStorage.getItem("islogin")) {
    }
    next();
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/main";
</style>