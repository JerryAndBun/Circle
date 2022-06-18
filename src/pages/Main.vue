<template>
  <div>
    <Header></Header>
    <div class="streamer">
    </div>
    <div class="top_area">
      <div class="banner_container">
        <div class="banner_box">
          <swiper :options="swiperOption" ref="mySwiper" class="mySwiper">
            <swiper-slide><img class="pic" src="../assets/imgs/banners/1.png" /></swiper-slide>
            <swiper-slide><img class="pic" src="../assets/imgs/banners/2.png" /></swiper-slide>
            <swiper-slide><img class="pic" src="../assets/imgs/banners/3.png" /></swiper-slide>
            <swiper-slide><img class="pic" src="../assets/imgs/banners/4.png" /></swiper-slide>
            <swiper-slide><img class="pic" src="../assets/imgs/banners/5.png" /></swiper-slide>
          </swiper>
        </div>
        <div class="footer">
          <div class="banner_text"></div>
          <div class="swiper-pagination point" slot="pagination"></div>
          <div class="banner_mask">
          </div>
        </div>
      </div>
      <VideoPreview v-for="(item,index) in video_list" :key="index" :video_item="item">
        <i class="iconfont icon-UP"></i>
        <router-link href="javascript:;" class="nickname" :to="{path:`/userpage/${item.uid}`}">{{item.nickname}}</router-link>
        <router-link href="javascript:;" class="nickname" :to="{path:`/userpage/${item.uid}`}">{{item.createdAt}}</router-link>
      </VideoPreview>
      <!-- <VideoPreview v-for="(item,index) in 6" :key="index" :video_item="item">
        <i class="iconfont icon-UP"></i>
        <router-link href="javascript:;" class="nickname" :to="{path:`/userpage/${item.uid}`}">{{item.nickname}}</router-link>
        <router-link href="javascript:;" class="nickname" :to="{path:`/userpage/${item.uid}`}">{{item.createdAt}}</router-link>
      </VideoPreview> -->
    </div>
    <div class="test"></div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Banner from "@/components/Banner.vue";
import VideoPreview from "@/components/VideoPreview.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import HttpManager from '@/api';

export default {
  data() {
    return {
      swiperOption: {
        loop: true, // 设置图片循环
        autoplay: {
          disableOnInteraction: false
        },
        //设置可自动播放
        speed: 500, //自动播放的速度，每隔1秒滑动一次
        pagination: {
          el: ".swiper-pagination", //分页器的类名
          clickable: true //设置分页小圆点可手动点击
        }
      },
      video_list:'',
    };
  },
  components: {
    Header,
    Banner,
    VideoPreview,
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
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
  },

  mounted() {
    var that = this;
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        // console.log(window.fullHeight);
        // console.log(window.fullWidth);
        that.windowHeight = window.fullHeight; // 高
        that.windowWidth = window.fullWidth; // 宽
      })();
    };
  },
  created(){
    HttpManager.postAllVideo().then(response=>{
      console.log(response.data);
      this.video_list=response.data
    })
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/main";
@import "../assets/css/swiper";
</style>