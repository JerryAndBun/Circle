<template>
  <div class="banner_box">
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <swiper-slide><img class="pic" src="../assets/imgs/banners/1.png" /></swiper-slide>
      <swiper-slide><img class="pic" src="../assets/imgs/banners/2.png" /></swiper-slide>
      <swiper-slide><img class="pic" src="../assets/imgs/banners/3.png" /></swiper-slide>
      <swiper-slide><img class="pic" src="../assets/imgs/banners/4.png" /></swiper-slide>
      <swiper-slide><img class="pic" src="../assets/imgs/banners/5.png" /></swiper-slide>
      <div class="swiper-pagination point" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
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
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  }
};
</script>

<style lang='scss' scpoed>
@import "../assets/css/banner.scss";
@import "../assets/css/swiper";
.swiper .swiper-pagination-bullet-active {
  background-color: #fff;
  // border-radius: 50px;
}
.swiper {
  width: 100%;
  height: 2.2rem;
}
.swiper img {
  width: 100%;
  height: 100%;
}
</style>