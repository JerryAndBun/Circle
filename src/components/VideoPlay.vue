<template>
  <div>
    <div class="videocontainer" ref="videocontainer" id="videocontainer" >
      <video class="video" id="video" ref="video" 
      preload 
      :src="require(`../assets/midea/案例视频.mp4`)" 
      autoplay 
      preload="auto" 
      poster="" 
      loop='true'
      type="video/mp4"
      @playing="palying">
      </video>
      <div class="pause_playbtn" ref="pause_playbtn" @click="playchange">暂停</div>
      <div class="fullscreenbtn" ref='fullscreen_btn' @click="fullscreenchange">全屏</div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否暂停
      paused:false,
      fullscreened:false,
      videourl: ""
    };
  },
  methods: {
    palying(){
      // console.log('111');
    this.$refs.pause_playbtn.innerHTML='暂停'
    },
    test(){
      console.log('666');
    },
    playchange(){
      console.log('00');
      if(this.$refs.video.paused){
        this.$refs.video.play()
        this.$refs.pause_playbtn.innerHTML='暂停'
      }else{
        this.$refs.video.pause()
        this.$refs.pause_playbtn.innerHTML='播放'
      }
    },
    pause() {
      this.$refs.video.pause();
    },
    play() {
      this.$refs.video.play();
    },
    fullscreenchange() {
      if(!this.fullscreened){
        this.fullscreen()
        this.fullscreened=true
        this.$refs.fullscreen_btn.innerHTML='退出全屏'
      }else{
        console.log('120');
        this.exitFullscreen()
        this.fullscreened=false
        this.$refs.fullscreen_btn.innerHTML='全屏'
      }
    },
    // 全屏
    fullscreen(){
      if (this.$refs.videocontainer.requestFullscreen) {
        this.$refs.videocontainer.requestFullscreen();
        } else if (this.$refs.videocontainer.mozRequestFullScreen) {
        this.$refs.videocontainer.mozRequestFullScreen();
      } else if (this.$refs.videocontainer.webkitRequestFullScreen) {
        this.$refs.videocontainer.webkitRequestFullScreen();
      }
    },
    //退出全屏
    exitFullscreen() {
      if (document.exitFullScreen) {
          document.exitFullScreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
          
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();

      } else if (element.msExitFullscreen) {
          element.msExitFullscreen();

      }
      // if (this.$refs.videocontainer.exitFullScreen) {
      //   this.$refs.videocontainer.exitFullScreen();
      //   console.log('1');
      // } else if (this.$refs.videocontainer.mozCancelFullScreen) {
      //   this.$refs.videocontainer.mozCancelFullScreen();
      //   console.log('2');
      // } else if (this.$refs.videocontainer.msExitFullscreen) {
      //   this.$refs.videocontainer.msExitFullscreen();
      //   console.log('3');
      // }
    }
  },
  mounted(){
    if(this.$refs.video.paused){
      this.paused=true
      console.log(this.paused);
    }else{
      this.paused=false
      console.log(this.paused);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/videoplay.scss";
</style>