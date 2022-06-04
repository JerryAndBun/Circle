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
        <div class="video_container" id="video_container" ref="video_container">
          <video class="video" id="video" ref="video" 
            preload 
            src='../assets/midea/案例视频.mp4'
            preload="auto"
            poster="" 
            loop='true'
            type="video/mp4"
            @canplay="init_video"
            @playing="video_playing"
            @timeupdate='get_new_timerange'
            >
          </video>
          <div class="controls_container" id="controls_container" ref="controls_container"  @mouseenter="mouse_in_contrl" @mouseleave="mouse_out_contrl">
            <div class="process" ref="process">
              <!-- 已缓存的条，可能有多个 -->
              <div class="buffered"></div>
              <!-- 已播放的条 -->
              <div class="played" ref="played"></div>
            </div>
            <div class="left_area">
              <div class="pause_playbtn" ref="pause_playbtn" @click="playchange">
                <i class="iconfont" :class="paused?'icon-bofang':'icon-zanting'"></i>
              </div>
              <div class="timer_ange">
                <span class="played_h played" v-if="is_more_hour">{{videoItem.played_h}}</span>
                <span v-if="is_more_hour">:</span>
                <span class="played_m played">{{videoItem.played_m}}</span>
                <span>:</span>
                <span class="played_s played">{{videoItem.played_s}}</span>
                <span>/</span>
                <span class="duration_h duration" v-if="is_more_hour">{{videoItem.duration_h}}</span>
                <span v-if="is_more_hour">:</span>
                <span class="duration_m duration">{{videoItem.duration_m}}</span>
                <span>:</span>
                <span class="duration_s duration">{{videoItem.duration_s}}</span>
              </div>
            </div>
            <div class="right_area">
              <div class="volume">
                <i class="iconfont icon-yinliang"></i>
              </div>
              <div class="fullscreenbtn" ref='fullscreen_btn' @click="fullscreenchange">
                <i class="iconfont" :class="fullscreened?'icon-tuichuquanping':'icon-quanping'"></i>
              </div>
            </div>
          </div>
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
      paused:true,
      fullscreened:false,
      is_more_hour:false,
      videoItem:{
        currentTime:'',
        duration:'',
        duration_h:'',
        duration_m:'',
        
        duration_s:'',
        played_h:'00',
        played_m:'00',
        played_s:'00',
      },
      baseurl:BASE_URL,
      clickformore:false,
      isfold:true,
      // 用于保存视频控件的timeTimeout
      control_timer:'',
    };
  },
  components:{
    Header,
    Footer,
    CommentInput,
  },
  watch:{
    videoItem:{
      handler: (val, olVal) => {
        console.log('我变化了', val, olVal)
        if(val.duration_h){
          this.is_more_hour=true
        }
        // val.played_h=this.fill_zero(2)
      },
      deep: true,
    }
  },
  computed:{

  },
  methods: {
    // 视频可播放了的事件
    test(){
      console.log('该事件执行');
      this.videoItem.duration='111'
    },
    // 补零的方法
    fill_zero(length,num){
      return (Array(length).join('0')+num).slice(-length)
    },
    get_new_timerange(){
      // 获取到将当前播放的时间
      this.videoItem.currentTime=parseInt(this.$refs.video.currentTime)
      this.videoItem.played_h=Math.floor(this.videoItem.currentTime/3600)
      this.videoItem.played_m=this.fill_zero(2,Math.floor((this.videoItem.currentTime-this.videoItem.played_h*3600)/60))
      this.videoItem.played_s=this.fill_zero(2,Math.floor(this.videoItem.currentTime-(this.videoItem.played_h*3600+this.videoItem.played_m*60))) 
    },
    init_video(){
      // 初始化视频信息,计算时分秒
      this.videoItem.duration=Math.floor(this.$refs.video.duration)   //单位为秒
      this.videoItem.duration_h=Math.floor(this.videoItem.duration/3600)
      this.videoItem.duration_m=this.fill_zero(2,Math.floor((this.videoItem.duration-this.videoItem.duration_h*3600)/60))
      this.videoItem.duration_s=this.fill_zero(2,Math.floor(this.videoItem.duration-(this.videoItem.duration_h*3600+this.videoItem.duration_m*60)))
    },
    video_playing(){
      // console.log('111');
    },
    mouse_in_contrl(){
      clearTimeout(this.control_timer)
      this.$refs.controls_container.style.opacity='1'
      // console.log(this.$refs.video.buffered.end(0));
    },
    mouse_out_contrl(){
      clearTimeout(this.control_timer)
      this.control_timer=setTimeout(
        ()=>{
          this.$refs.controls_container.style.opacity='0'
        }
      ,2000)
    },
    playchange(){
      if(this.$refs.video.paused){
        this.paused=false
        console.log(this.paused);
        this.$refs.video.play()
      }else{
        this.paused=true
        this.$refs.video.pause()
      }
    },
    // 全屏的函数
    fullscreenchange() {
      if(!this.fullscreened){
        this.fullscreen()
        this.fullscreened=true
        // 为了适配不同屏幕，居中
        this.$refs.video.style.top='50%'
        this.$refs.video.style.transform='translateY(-50%)'
      }else{
        console.log('120');
        this.exitFullscreen()
        this.fullscreened=false
        this.$refs.video.style.top='0%'
        this.$refs.video.style.transform='translateY(0%)'
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
    // 不知道为什么对不上高度，在这矫正一下
    let video_container=document.getElementById('video_container')
    let video=document.getElementById('video')
    console.log(video_container.style.height);
    console.log(video.style.height);
    console.log(video_container);
    console.log(video);
    video_container.style.height=video.style.height
    // =`${}`
    // this.$refs.process.
    // if(this.$refs.video.paused){
    //   this.paused=true
    //   console.log(this.paused);
    // }else{
    //   this.paused=false
    //   console.log(this.paused);
    // }
    // 获取视频的长度
    // while (1) {
    //   if(this.$refs.video.readyState){
    //   console.log(Math.floor(this.$refs.video.duration));
    //   break;
    //   }
    // }
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