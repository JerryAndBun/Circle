<template>
  <div>
    <Header></Header>
    <div class="streamer">
    </div>
    <div class="top_area">
      <div class="slider_area">
        <Banner class="banner"></Banner>
      </div>
      <!-- count:{{$store.state.sum}} -->
      <!-- {{$store.state.username}} -->
      <!-- {{$store.state.userpassword}} -->
      <VideoPreview v-for=""></VideoPreview>
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
    VideoPreview,
  },
  methods: {
    load() {
      console.log("123");
      alert("?");
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/main";
</style>