<template>
  <div>
    <Header></Header>
    <div class="allcontainer" ref="videocontainer" id="videocontainer" >
      <div class="left_container">
        <div class="title_container">
          <h1 class="title_text">{{video_item.title}}</h1>
          <div class="video_info">
            <div class="playNum minidiv">
              <i class=" iconfont icon-bofangliang "></i>
              {{video_item.playNum}}
            </div>
            <div class="createAt minidiv">
              <i class=" iconfont icon-riqi "></i>
              {{video_item.createdAt}}
            </div>
            <div class="copyRight minidiv">
              <i class=" iconfont icon-jinzhi "></i>
              未经作者授权，禁止转载
            </div>
          </div>
        </div>
        <div class="video_container" id="video_container" ref="video_container" @mousemove="video_mouse_move">
          <video class="video" id="video" ref="video" 
            preload
            src="../assets/midea/案例视频.mp4"
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
            <div class="progress" ref="progress" @click="jump_duration" @mousedown="progress_mousedown" @mouseup="progress_mouseup">
              <!-- 已缓存的条，可能有多个 -->
              <div class="buffered"></div>
              <!-- 已播放的条 -->
              <div class="played" ref="played" :style="{width:video_play_Item.percent*100+'%'}">
                <div class="progress_dotdiv" ref="progress_dotdiv">
                  
                </div>
              </div>
            </div>
            <div class="left_area">
              <div class="pause_playbtn" ref="pause_playbtn" @click="playchange">
                <i class="iconfont" :class="paused?'icon-bofang':'icon-zanting'"></i>
              </div>
              <div class="timer_ange">
                <span class="played_h played" v-if="is_more_hour">{{video_play_Item.played_h}}</span>
                <span v-if="is_more_hour">:</span>
                <span class="played_m played">{{video_play_Item.played_m}}</span>
                <span>:</span>
                <span class="played_s played">{{video_play_Item.played_s}}</span>
                <span>/</span>
                <span class="duration_h duration" v-if="is_more_hour">{{video_play_Item.duration_h}}</span>
                <span v-if="is_more_hour">:</span>
                <span class="duration_m duration">{{video_play_Item.duration_m}}</span>
                <span>:</span>
                <span class="duration_s duration">{{video_play_Item.duration_s}}</span>
              </div>
            </div>
            <div class="right_area">
              <div class="volume">
                <div class="volume_panel">
                  <div class="played_range" :style="{height:video_play_Item.volume_precent}"></div>
                  <div class="played_range_mask"></div>
                  <input type="range" id="volume_range" class="volume_range" @change="range_change">

                  <!-- <div class="volume_bar">
                    <div class="palyed_volume_bar" :style="{height:video_play_Item.volume*100+'%'}">
                      <div class="volume_dotdiv"></div>
                    </div>
                  </div> -->
                </div>
                <i class="iconfont icon-yinliang"></i>
              </div>
              <div class="fullscreenbtn" ref='fullscreen_btn' @click="fullscreenchange">
                <i class="iconfont" :class="fullscreened?'icon-tuichuquanping':'icon-quanping'"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="footer_bar">
          <div class="footer_mindiv">
            <!-- :class="is_liked?active:unactive" -->
            <i class="iconfont icon-dianzan"  @click=""></i>{{video_item.collects}}
          </div>
          <div class="footer_mindiv">
            <i class="iconfont icon-shoucang" :class="is_collected?'active':'unactive'" @click="collect_video"></i>{{video_item.collects}}
          </div>
          <div class="footer_mindiv">
            <i class="iconfont icon-zhuanfa"></i>{{video_item.collects}}
          </div>
        </div>
        <div class="description_container"  ref="description_container">
          <div class="des" ref="des" id="des">
            <span class="des_text" ref="des_text" id="des_text">
              {{video_item.summary}}
            </span>
          </div>
          <div class="clickformore" ref="clickformore" @click="unfold" v-if="clickformore">展开更多</div>
        </div>
        <div class="tagList_container">
          <ul class="tagList">
            <li v-for="(item,index) in video_item.tags" :key="index"><a href="" @click.prevent="">{{item}}</a></li>
          </ul>
        </div>
        <div class="comment_container">
          <CommentInput></CommentInput>
        </div>
      </div>
      <div class="right_container">
        <div class="info_container">
          <div class="auth_avatar"></div>
          <div class="info_div">
            <span class="auth_nickname">JerryAnDBun</span>
            <span class="auth_signature">签名签名签名签名签名签名签名签名签名签名签名签名签名签名签名签名签名签名签名签名签名签名</span>
            <div class="foucus_btn">+&nbsp关注</div>
          </div>

        </div>
        <div class="recommond_container">
         <VideoPreview class="VideoPreview" v-for="(item,index) in 6" :key="index" :video_item="item">
          <i class="iconfont icon-UP"></i>
          <router-link href="javascript:;" class="nickname" :to="{path:`/userpage/${item.uid}`}">{{item.nickname}}</router-link>
          <router-link href="javascript:;" class="nickname" :to="{path:`/userpage/${item.uid}`}">{{item.createdAt}}</router-link>
        </VideoPreview>
        </div>
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
import VideoPreview from '@/components/VideoPreview.vue'
import {BASE_URL} from '@/api/config'
export default {
  data() {
    return {
      // 是否暂停
      paused:true,
      // 是否全屏
      fullscreened:false,
      // 视频时长是否超过一小时
      is_more_hour:false,
      // 是否已收藏
      is_collected:false,
      // 是否在拖拽
      is_progress_draging:false,
      // 音量条是否在拖拽
      is_volume_draging:false,

      is_in_control_panel:false,
      video_item:{
        // video_path:'',
        // links:''
      },
      video_play_Item:{
        percent:'',
        volume:'',
        volume_precent:'',
        played_lenght:'',

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
    VideoPreview,
  },
  watch:{
    video_play_Item:{
      handler: (val, olVal) => {
        if(val.duration_h){
          this.is_more_hour=true
        }
      },
      deep: true,
    }
  },
  computed:{
    origin (){
      return this.getElementLeft(this.$refs.progress)
    },
    width () {
      return this.$refs.progress.offsetWidth
    }
  },
  methods: {
    // 视频可播放了的事件
    test(){
      console.log('该事件执行');
      console.log();
    },
    getElementLeft (element) {
      var actualTop = element.offsetLeft // 这是获取元素距父元素顶部的距离
      var current = element.offsetParent // 这是获取父元素
      while (current !== null) {
        // 当它上面有元素时就继续执行
        actualTop += current.offsetLeft // 这是获取父元素距它的父元素顶部的距离累加起来
        current = current.offsetParent // 继续找父元素
      }
      return actualTop
    },
    collect_video(){
      // console.log(this.video_item.cv)
      HttpManager.postCollectVideo(`/collect/${this.video_item.cv}`).then(
        response=>{console.log('收藏该视频成功');this.is_collected=true},
        error=>{console.log('收藏该视频失败');
          if(error.data.message==='视频已收藏'){
            HttpManager.deleteCollectVideo(`/unCollect/${this.video_item.cv}`).then(
              response=>{
                console.log('取消收藏成功');
                this.is_collected=false
              },
              error=>{
                console.log('取消收藏失败');
              }
            )
          }
        }
      )
    },
    range_change(){
      let dom = document.getElementById('volume_range')
      console.log(dom.value);
      this.video_play_Item.volume_precent=dom.value*0.8+'%'
    },
    // 音量条的拖拽函数
    // volime_mousedown(){
    //   this.is_volume_draging = true
    //   document.body.addEventListener('mousemove', this.volume_drag)
    //   document.body.addEventListener('mouseup', this.volume_mouseup)
    //   this.$refs.volume_dotdiv.style.visibility = 'visible'
    // },
    // volime_mouseup(){
    //   this.is_volume_draging = false
    //   this.mouse_out_contrl()
    //   document.body.removeEventListener('mousemove',this.progress_drag)
    // },
    // volume_drag(e){
    //   if (this.is_progress_draging && e.clientX >= this.origin && e.clientX <= (this.origin + this.width)) {
    //     this.video_play_Item.percent= ((e.clientX - this.origin) / this.width).toFixed(2)
    //   }
    // },
    // 进度条的拖拽函数
    progress_mousedown(){
      this.is_progress_draging = true
      document.body.addEventListener('mousemove', this.progress_drag)
      document.body.addEventListener('mouseup', this.progress_mouseup)
      this.$refs.progress_dotdiv.style.visibility = 'visible'
    },
    progress_mouseup(){
      this.is_progress_draging = false
      document.body.removeEventListener('mousemove',this.progress_drag)
      this.mouse_out_contrl()
    },
    // 进度条拖拽函数
    progress_drag(e){
      if (this.is_progress_draging && e.clientX >= this.origin && e.clientX <= (this.origin + this.width)) {
        this.video_play_Item.percent= ((e.clientX - this.origin) / this.width).toFixed(2)
        this.video_play_Item.currentTime=parseInt(this.video_play_Item.duration*this.video_play_Item.percent)
      }
    },
    // 点击进度条跳转时间
    jump_duration(e){
      let moused_downX=e.offsetX,
          progress_lenght=this.$refs.progress.offsetWidth,
          video_duration=parseInt(this.$refs.video.duration);
          // 计算百分比
      this.video_play_Item.percent=(moused_downX/progress_lenght).toFixed(2)
      let new_time=parseInt(video_duration*this.video_play_Item.percent)
      this.video_play_Item.currentTime=new_time
      this.$refs.video.currentTime=new_time
      console.log(this.video_play_Item.played_lenght);
      console.log(moused_downX);
      console.log(progress_lenght);
      console.log(video_duration);
      console.log(this.video_play_Item.percent);
      console.log(new_time);
    },
    // 补零的方法
    fill_zero(length,num){
      return (Array(length).join('0')+num).slice(-length)
    },
    get_new_timerange(){
      // 当视频播放时，获取到将当前播放的时间
      this.video_play_Item.currentTime=this.$refs.video.currentTime
      if(!this.is_progress_draging) {
        this.video_play_Item.percent=(this.video_play_Item.currentTime/this.video_play_Item.duration).toFixed(4)
      }
      this.video_play_Item.played_h=Math.floor(this.video_play_Item.currentTime/3600)
      this.video_play_Item.played_m=this.fill_zero(2,Math.floor((this.video_play_Item.currentTime-this.video_play_Item.played_h*3600)/60))
      this.video_play_Item.played_s=this.fill_zero(2,Math.floor(this.video_play_Item.currentTime-(this.video_play_Item.played_h*3600+this.video_play_Item.played_m*60))) 
    },
    init_video(){
      // 初始化视频信息,计算时分秒
      this.video_play_Item.duration=Math.floor(this.$refs.video.duration)   //单位为秒
      console.log(this.video_play_Item.duration);
      this.video_play_Item.percent=(this.video_play_Item.currentTime/this.video_play_Item.duration).toFixed(2)
      console.log(this.video_play_Item.percent);
      this.video_play_Item.duration_h=Math.floor(this.video_play_Item.duration/3600)
      console.log(this.video_play_Item.duration_h);
      this.video_play_Item.duration_m=this.fill_zero(2,Math.floor((this.video_play_Item.duration-this.video_play_Item.duration_h*3600)/60))
      this.video_play_Item.duration_s=this.fill_zero(2,Math.floor(this.video_play_Item.duration-(this.video_play_Item.duration_h*3600+this.video_play_Item.duration_m*60)))
    },
    video_playing(){
    },
    video_mouse_move(){
      this.show_control()
      this.hide_control()
    },
    show_control(){
      clearTimeout(this.control_timer)
      this.$refs.controls_container.style.opacity='1'
    },
    hide_control(){
      if(!this.is_progress_draging&&!this.is_in_control_panel){
        clearTimeout(this.control_timer)
        this.control_timer=setTimeout(
          ()=>{
            this.$refs.controls_container.style.opacity='0'
          }
        ,2000)
      }
    },
    mouse_in_contrl(){
      this.is_in_control_panel=true
      this.show_control()
    },
    mouse_out_contrl(){
      this.is_in_control_panel=false
      this.hide_control()
      
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
    }
  },
  updated(){
    this.$nextTick(()=>{
      if(this.$refs.des_text.offsetHeight>79){
        console.log('超了');
        this.$nextTick(()=>{
          this.clickformore=true
      })
      console.log(this.clickformore);
      }
    })
  },
  created(){
    // 根据cv号查询视频地址
    let url = `${this.baseurl}/video/${this.$route.params.cv}`
    console.log(url);
    HttpManager.getVideoUrl(url).then((response)=>{
      console.log('查询视频URL地址成功');
      console.log(response);
      this.video_item=response
      console.log(this.video_item);
    },(error)=>{
      console.log('查询视频URL地址失败');
    })
  },
  mounted() {
    let dom = document.getElementById('volume_range')
    dom.value=100
    this.video_play_Item.volume=this.$refs.video.volume
    console.log(this.video_play_Item.volume);
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/videoplay.scss";
</style>