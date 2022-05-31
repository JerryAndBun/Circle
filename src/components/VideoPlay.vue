<template>
  <div>
    <Header></Header>
    <div class="allcontainer" ref="videocontainer" id="videocontainer" >
      <div class="left_container">
        <div class="title_container">
          <h1 class="title_text">{{videoItem.title}}</h1>
          <div class="video_info">
            <div class="playNum minidiv">
              <i class=" iconfont icon-bofangliang "></i>
              {{videoItem.playNum}}
            </div>
            <div class="createAt minidiv">
              <i class=" iconfont icon-riqi "></i>
              {{videoItem.createdAt}}
            </div>
            <div class="copyRight minidiv">
              <i class=" iconfont icon-jinzhi "></i>
              未经作者授权，禁止转载
            </div>
          </div>
        </div>
        <div class="video_container" ref="video_container">
          <video class="video" id="video" ref="video" 
            preload 
            :src="`${baseurl}${videoItem.path}`" 
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
        <div class="footer_bar">
          <div class="footer_mindiv ">
            <i class="iconfont icon-dianzan"></i>{{}}
          </div>
          <div class="footer_mindiv ">
            <i class="iconfont icon-shoucang"></i>{{}}
          </div>
          <div class="footer_mindiv ">
            <i class="iconfont icon-zhuanfa"></i>{{}}
          </div>
        </div>
        <div class="description_container"  ref="description_container">
          <div class="des" ref="des" id="des">
            <span class="des_text" ref="des_text" id="des_text">
              暂无简介
            </span>
          </div>
          <div class="clickformore" ref="clickformore" @click="unfold" v-if="clickformore">展开更多</div>
        </div>
        <div class="tagList_container">
          <ul class="tagList">
            <li v-for="(item,index) in 6" :key="index"><a href="" @click.prevent="">标签标签</a></li>
          </ul>
        </div>
        <div class="comment_container">
          <CommentInput></CommentInput>
        </div>
      </div>
      <div class="right_container">
        <div class="info_container"></div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import HttpManager from '@/api';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import CommentInput from '@/components/CommentInput.vue'
import {BASE_URL} from '@/api/config'
export default {
  data() {
    return {
      // 是否暂停
      paused:false,
      fullscreened:false,
      // videourl: "",
      videoItem:'',
      baseurl:BASE_URL,
      clickformore:false,
      isfold:true,
    };
  },
  components:{
    Header,
    Footer,
    CommentInput,
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
      if (this.$refs.video_container.requestFullscreen) {
        this.$refs.video_container.requestFullscreen();
        } else if (this.$refs.video_container.mozRequestFullScreen) {
        this.$refs.video_container.mozRequestFullScreen();
      } else if (this.$refs.video_container.webkitRequestFullScreen) {
        this.$refs.video_container.webkitRequestFullScreen();
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
    },
    unfold(){
      // this.$refs.clickformore.style.height='auto'
      let des = document.getElementById('des')
      console.log(this.isfold);
      if(this.isfold){
        console.log(this.$refs.des_text.offsetHeight);
        des.style.maxHeight=`none`
        des.style.height=`${this.$refs.des_text.offsetHeight}px`
        this.isfold=false
        console.log('>');
        this.$refs.clickformore.innerHTML='收起'
      }else{
        des.style.maxHeight=des.style.height=`80px`
        this.isfold=true
        this.$refs.clickformore.innerHTML='展开更多'
      }
      // let des_text = document.getElementById('des_text')
      // this.$refs.des.offsetHeight=this.$refs.des_text.offsetHeight
      // console.log(des.style.height);
      // console.log(this.$refs.des_text.offsetHeight);
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
    if(this.$refs.des.offsetHeight>80){
      this.$nextTick(()=>{
        this.clickformore=true
      })
      // alert()
      console.log(this.clickformore);
    }
  },
  created(){
    // 根据cv号查询视频地址
    let url = `${this.baseurl}/video/${this.$route.params.cv}`
    console.log(url);
    HttpManager.getVideoUrl(url).then((response)=>{
      console.log('查询视频URL地址成功');
      console.log(response);
      this.videoItem=response
      console.log(this.videoItem);
    },(error)=>{
      console.log('查询视频URL地址失败');

    })
    
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/videoplay.scss";
</style>