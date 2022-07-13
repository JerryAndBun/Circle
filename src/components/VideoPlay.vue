<template>
  <div>
    <Header></Header>
    <div class="cir_toast_content">
      <CirToast
        v-for="(item, index) in toast_list"
        :key="index"
        :item="toast_info"
        :type="toast_type"
      ></CirToast>
    </div>
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
            <div class="cvNum minidiv">
              cv&nbsp:
              {{video_item.cv}}
            </div>
            <div class="copyRight minidiv">
              <i class=" iconfont icon-jinzhi "></i>
              未经作者授权，禁止转载
            </div>
          </div>
        </div>
        <div class="video_container" 
          id="video_container" 
          ref="video_container" 
          @mousemove="video_mouse_move"
          @keydown.enter="test"
        >
          <video class="video" id="video" ref="video"
            preload
            :src="`${baseurl}${video_item.videoPath}`"
            preload="auto"
            poster=""
            type="video/mp4"
            @canplay="init_video"
            @playing="video_playing"
            @timeupdate='get_new_timerange'
            @click="playchange"
            @dblclick="fullscreenchange"
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
              <div class="volume" @mouseenter="show_volume_panel" @mouseleave="hide_volume_panel">
                <div class="volume_panel" ref="volume_panel" >
                  <el-slider
                    v-model="volume_value"
                    vertical
                    height="60px">
                  </el-slider>
                </div>
                <i class="iconfont icon-yinliang" ></i>
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
            <i class="iconfont icon-dianzan" :class="is_liked?'active':'unactive'" @click="like_video"></i>{{video_item.likes}}
          </div>
          <div class="footer_mindiv">
            <i class="iconfont icon-shoucang" :class="is_collected?'active':'unactive'" @click="collect_video"></i>{{video_item.collects}}
          </div>
          <div class="footer_mindiv">
            <i class="iconfont icon-zhuanfa"></i>
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
          <span class="tip_info">评论&nbsp{{video_comments.length}}</span>
          <CommentInput @sendComment='send_level1_comment' :comment_level="1"></CommentInput>
        </div>
        <div class="comment_list_container">
          <CommentDiv v-for="(item,index) in video_comments" 
          ref="CommentDiv" 
          :key="index" 
          :video_item="video_item" 
          :level_item="item" :is_all="is_all" 
          @toFather="test" 
          @likeChanged="getComment"
          @replyed="getComment"></CommentDiv>
        </div>
      </div>
      <div class="right_container">
        <div class="info_container">
          <img class="auth_avatar" :src="`${baseurl}${auth_info.avatar}`" @click="to_this_userpage"></img>
          <div class="info_div">
            <span class="auth_nickname" @click="to_this_userpage">{{video_item.nickname}}</span>
            <span class="auth_signature">{{auth_info.signature}}</span>
            <div class="foucus_btn" ref="foucus_btn" :class="auth_info.isFocusOn?'focused':'unfocus'" @click="send_focus_request">+&nbsp关注</div>
          </div>
        </div>
        <div class="recommond_container">
          <span class="tip_info">为你推荐</span>
        <VideoPreview class="VideoPreview" v-for="(item,index) in recommond_list"  :key="index" :video_item="item">
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
import HttpManager from "@/api";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CommentInput from "@/components/CommentInput.vue";
import CommentDiv from "@/components/CommentDiv.vue";
import VideoPreview from "@/components/VideoPreview.vue";
import CirToast from "@/components/CirToast.vue";
import { mapGetters } from "vuex";
import { BASE_URL } from "@/api/config";
export default {
  data() {
    return {
      video_comments: [],
      toast_info: "",
      toast_type: "",
      timeout_playchange: null,
      timeout_fulllscreechange: null,
      auth_info: "",
      // 是否关闭所有的二级评论框,false为全部关闭，需要的再单独打开，实现只有一个回复框存在
      is_all: 0,
      // 音量值
      volume_value: 100,
      // 推荐视频列表
      recommond_list: "",
      // 是否暂停
      paused: true,
      // 是否全屏
      fullscreened: false,
      // 视频时长是否超过一小时
      is_more_hour: false,
      // 是否已收藏
      is_collected: false,
      // 是否已喜欢
      is_liked: false,
      // 是否在拖拽
      is_progress_draging: false,
      // 音量条是否在拖拽
      is_volume_draging: false,

      is_in_control_panel: false,
      video_item: {},
      video_play_Item: {
        percent: "",
        volume: "",
        played_lenght: "",
        currentTime: "",
        duration: "",
        duration_h: "",
        duration_m: "",
        duration_s: "",
        played_h: "00",
        played_m: "00",
        played_s: "00",
      },
      baseurl: BASE_URL,
      clickformore: false,
      isfold: true,
      // 用于保存视频控件的timeTimeout
      control_timer: "",
    };
  },
  components: {
    Header,
    Footer,
    CommentInput,
    CommentDiv,
    VideoPreview,
    CirToast,
  },
  watch: {
    video_play_Item: {
      handler: (val, olVal) => {
        if (val.duration_h) {
          this.is_more_hour = true;
        }
      },
      deep: true,
    },
    volume_value(val, old) {
      this.$refs.video.volume = val * 0.01;
    },
  },
  computed: {
    origin() {
      return this.getElementLeft(this.$refs.progress);
    },
    width() {
      return this.$refs.progress.offsetWidth;
    },
    ...mapGetters("user", ["uid"]),
    ...mapGetters("info", ["toast_list", "is_show_all_input"]),
  },
  methods: {
    // 视频可播放了的事件
    test() {
      console.log("该事件执行");
      // 用于改变值，告诉所有子组件（回复框）全部关闭
      this.is_all = !this.is_all;
    },
    getComment(){
      HttpManager.getVideoComment(`/video/comments/${this.video_item.cv}`).then(
        (response) => {
          this.video_comments = response;
          console.log(response);
          console.log("查评论成功");
        },
        (error) => {
          console.log(error);
          console.log("查评论失败");
        }
      );
    },
    change_is_all() {
      let ff = this.$refs.CommentDiv;
      ff.$emit("fromFather");
      console.log("复组件发送给字组件");
    },
    send_level1_comment(params) {
      // console.log(params);
      console.log("发送事件");
      //发送的是一级评论
      HttpManager.postVideoComment({
        commentContent: params.content,
        commentObj: this.video_item.cv,
        level: params.comment_level,
        targetCid: "",
        targetLevel: "",
        targetUid: "",
      })
      .then(
        (response) => {
          console.log(response);
          this.$store.commit("info/toast_list", { type: "push" });
          this.toast_info = "评论成功";
          this.toast_type = "success";
          this.getComment()
        },
        (error) => {
          console.log(error);
        }
      )
        
    },
    to_this_userpage() {
      this.$router.push(`/userpage/${this.video_item.uid}`);
    },
    // 关注取关函数
    send_focus_request() {
      // 已关注，执行取关操作
      if (this.video_item.uid == this.uid) {
        this.$store.commit("info/toast_list", { type: "push" });
        this.toast_type = "fail";
        this.toast_info = "不能关注自己";
        return;
      }
      if (this.auth_info.isFocusOn) {
        HttpManager.postUnFocusUser({
          focusid: this.auth_info.uid,
          uid: this.uid,
        }).then(
          (response) => {
            console.log(response.data);
            console.log("取关成功");
          },
          (error) => {}
        );
        this.auth_info.isFocusOn = false;
        this.$refs.foucus_btn.innerHTML = "+&nbsp关注";
      } else {
        // 未关注，执行关注操作
        HttpManager.postFollowUser({
          focusid: this.auth_info.uid,
          uid: this.uid,
        }).then(
          (response) => {
            console.log(response.data);
            console.log("关注成功");
          },
          (error) => {}
        );
        this.auth_info.isFocusOn = true;
        this.$refs.foucus_btn.innerHTML = "已关注";
      }
    },

    check_click_for_more() {
      this.$nextTick(() => {
        if (this.$refs.des_text.offsetHeight > 79) {
          this.$nextTick(() => {
            this.clickformore = true;
          });
          console.log(this.clickformore);
        } else {
          this.$nextTick(() => {
            this.clickformore = false;
          });
        }
      });
    },
    // 传入cv号查询视频相关信息
    get_video_info(cv) {
      let url = `${this.baseurl}/video/${cv}`;
      console.log(url);
      HttpManager.getVideoUrl(url)
        .then(
          (response) => {
            console.log("查询视频URL地址成功");
            console.log(response);
            this.video_item = response;
            this.is_liked = response.isLike;
            this.is_collected = response.isCollect;
            console.log(this.video_item);
          },
          (error) => {
            console.log("查询视频URL地址失败");
          }
        )
        .then(() => {
          return HttpManager.getUserInfo(
            `/userInfo/${this.video_item.uid}`
          ).then(
            (response) => {
              console.log(response);
              this.auth_info = response;
              if (this.auth_info.isFocusOn) {
                // 已关注
                this.$refs.foucus_btn.innerHTML = "已关注";
              } else {
                // 未关注
                this.$refs.foucus_btn.innerHTML = "+&nbsp关注";
              }
            },
            (error) => {
              console.log(error);
            }
          );
        })
        .then(() => {
          return HttpManager.getVideoComment(
            `/video/comments/${this.video_item.cv}`
          ).then(
            (response) => {
              this.video_comments = response;
              console.log(response);
              console.log("查评论成功");
            },
            (error) => {
              console.log(error);
              console.log("查评论失败");
            }
          );
        });
    },
    hide_volume_panel() {
      this.$refs.volume_panel.style.opacity = "0";
    },
    show_volume_panel() {
      this.$refs.volume_panel.style.opacity = "1";
    },
    getElementLeft(element) {
      var actualTop = element.offsetLeft; // 这是获取元素距父元素顶部的距离
      var current = element.offsetParent; // 这是获取父元素
      while (current !== null) {
        // 当它上面有元素时就继续执行
        actualTop += current.offsetLeft; // 这是获取父元素距它的父元素顶部的距离累加起来
        current = current.offsetParent; // 继续找父元素
      }
      return actualTop;
    },
    like_video() {
      HttpManager.postLikeVideo(`/videoLike/${this.video_item.cv}`).then(
        (response) => {
          console.log("点赞视频成功");
          (this.is_liked = true), this.video_item.likes++;
        },
        (error) => {
          console.log("点赞失败");
          console.log(error);
          if (error.data.message === "视频已点赞") {
            HttpManager.deleteLikeVideo(
              `/unLikeVideo/${this.video_item.cv}`
            ).then(
              (response) => {
                console.log("取消点赞成功");
                this.video_item.likes--;
                this.is_liked = false;
              },
              (error) => {
                console.log("取消点赞失败");
              }
            );
          }
        }
      );
    },
    collect_video() {
      HttpManager.postCollectVideo(`/collect/${this.video_item.cv}`).then(
        (response) => {
          console.log("收藏该视频成功");
          (this.is_collected = true), this.video_item.collects++;
        },
        (error) => {
          console.log("收藏该视频失败");
          if (error.data.message === "视频已收藏") {
            HttpManager.deleteCollectVideo(
              `/unCollect/${this.video_item.cv}`
            ).then(
              (response) => {
                console.log("取消收藏成功");
                this.video_item.collects--;
                this.is_collected = false;
              },
              (error) => {
                console.log("取消收藏失败");
              }
            );
          }
        }
      );
    },
    // 进度条的拖拽函数
    progress_mousedown(e) {
      this.is_progress_draging = true;
      document.body.addEventListener("mousemove", this.progress_drag);
      document.body.addEventListener("mouseup", this.progress_mouseup);
      this.$refs.progress_dotdiv.style.visibility = "visible";
    },
    progress_mouseup() {
      this.is_progress_draging = false;
      document.body.removeEventListener("mousemove", this.progress_drag);
      this.mouse_out_contrl();
    },
    // 进度条拖拽函数
    progress_drag(e) {
      if (
        this.is_progress_draging &&
        e.clientX >= this.origin &&
        e.clientX <= this.origin + this.width
      ) {
        console.log("--------------");
        this.video_play_Item.percent = (
          (e.clientX - this.origin) /
          this.width
        ).toFixed(2);
        this.video_play_Item.currentTime = parseInt(
          this.video_play_Item.duration * this.video_play_Item.percent
        );
        this.$refs.video.currentTime = this.video_play_Item.currentTime;
      }
    },
    // 点击进度条跳转时间
    jump_duration(e) {
      console.log(e);
      let moused_downX = e.clientX - this.origin,
        progress_lenght = this.$refs.progress.offsetWidth,
        video_duration = parseInt(this.$refs.video.duration);
      // 计算百分比
      // console.log(moused_downX);
      // console.log(progress_lenght);
      // console.log(video_duration);
      this.video_play_Item.percent = (moused_downX / progress_lenght).toFixed(
        2
      );
      let new_time = parseInt(video_duration * this.video_play_Item.percent);
      this.video_play_Item.currentTime = new_time;
      this.$refs.video.currentTime = new_time;
    },
    // 补零的方法
    fill_zero(length, num) {
      return (Array(length).join("0") + num).slice(-length);
    },
    get_new_timerange() {
      // 当视频播放时，获取到将当前播放的时间
      this.video_play_Item.currentTime = this.$refs.video.currentTime;
      if (!this.is_progress_draging) {
        this.video_play_Item.percent = (
          this.video_play_Item.currentTime / this.video_play_Item.duration
        ).toFixed(4);
      }
      this.video_play_Item.played_h = Math.floor(
        this.video_play_Item.currentTime / 3600
      );
      this.video_play_Item.played_m = this.fill_zero(
        2,
        Math.floor(
          (this.video_play_Item.currentTime -
            this.video_play_Item.played_h * 3600) /
            60
        )
      );
      this.video_play_Item.played_s = this.fill_zero(
        2,
        Math.floor(
          this.video_play_Item.currentTime -
            (this.video_play_Item.played_h * 3600 +
              this.video_play_Item.played_m * 60)
        )
      );
    },
    init_video() {
      // 初始化视频信息,计算时分秒
      this.video_play_Item.duration = Math.floor(this.$refs.video.duration); //单位为秒
      this.video_play_Item.percent = (
        this.video_play_Item.currentTime / this.video_play_Item.duration
      ).toFixed(2);
      this.video_play_Item.duration_h = Math.floor(
        this.video_play_Item.duration / 3600
      );
      this.video_play_Item.duration_m = this.fill_zero(
        2,
        Math.floor(
          (this.video_play_Item.duration -
            this.video_play_Item.duration_h * 3600) /
            60
        )
      );
      this.video_play_Item.duration_s = this.fill_zero(
        2,
        Math.floor(
          this.video_play_Item.duration -
            (this.video_play_Item.duration_h * 3600 +
              this.video_play_Item.duration_m * 60)
        )
      );
    },
    video_playing() {},
    video_mouse_move() {
      this.show_control();
      this.hide_control(1);
    },
    show_control() {
      clearTimeout(this.control_timer);
      this.$refs.controls_container.style.opacity = "1";
    },
    hide_control(x) {
      console.log(x);
      if (!this.is_progress_draging && !this.is_in_control_panel) {
        clearTimeout(this.control_timer);
        this.control_timer = setTimeout(() => {
          this.$refs.controls_container.style.opacity = "0";
        }, 2000);
      }
    },
    mouse_in_contrl() {
      this.is_in_control_panel = true;
      this.show_control();
    },
    mouse_out_contrl() {
      this.is_in_control_panel = false;
      this.hide_control(2);
    },
    playchange() {
      clearTimeout(this.timeout_playchange);
      this.timeout_playchange = setTimeout(() => {
        if (this.$refs.video.paused) {
          this.paused = false;
          this.$refs.video.play();
        } else {
          this.paused = true;
          this.$refs.video.pause();
        }
      }, 300);
    },
    // 全屏的函数
    fullscreenchange() {
      clearTimeout(this.timeout_playchange);
      if (!this.fullscreened) {
        this.fullscreen();
        this.fullscreened = true;
        // 为了适配不同屏幕，居中
        this.$refs.video.style.top = "50%";
        this.$refs.video.style.transform = "translateY(-50%)";
      } else {
        this.exitFullscreen();
      }
    },
    // 全屏
    fullscreen() {
      if (this.$refs.video_container.requestFullscreen) {
        this.$refs.video_container.requestFullscreen();
      } else if (this.$refs.video_container.mozRequestFullScreen) {
        this.$refs.video_container.mozRequestFullScreen();
      } else if (this.$refs.video_container.webkitRequestFullScreen) {
        this.$refs.video_container.webkitRequestFullScreen();
      }
    },
    //退出全屏
    // 退出全屏居中的函数
    center_video() {
      this.fullscreened = false;
      this.$refs.video.style.top = "0%";
      this.$refs.video.style.transform = "translateY(0%)";
    },
    exitFullscreen() {
      if (document.exitFullScreen) {
        document.exitFullScreen();
        this.center_video();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        this.center_video();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        this.center_video();
      } else if (element.msExitFullscreen) {
        element.msExitFullscreen();
        this.center_video();
      }
    },
    unfold() {
      let des = document.getElementById("des");
      if (this.isfold) {
        des.style.maxHeight = `none`;
        des.style.height = `${this.$refs.des_text.offsetHeight}px`;
        this.isfold = false;
        this.$refs.clickformore.innerHTML = "收起";
      } else {
        des.style.maxHeight = des.style.height = `80px`;
        this.isfold = true;
        this.$refs.clickformore.innerHTML = "展开更多";
      }
    },
  },
  updated() {
    this.check_click_for_more();
  },
  created() {
    // 添加全局esc退出全屏事件
    // document.addEventListener('exitFullscreen',()=>{
    //   alert()
    // })
    // window.onresize=function () {
    //   alert()
    // }
    // 检测路由参数
    this.$watch(
      () => this.$route.params.cv, //要检测的字段
      (toParams, previousParams) => {
        // 对路由变化做出响应...			//一般在这再次发起请求
        // 根据cv号查询视频地址
        this.get_video_info(toParams);
      }
    );
    this.get_video_info(this.$route.params.cv);
    HttpManager.postAllVideo().then((response) => {
      this.recommond_list = response.data;
    });
  },
  mounted() {
    // 清除通知列表
    this.$store.commit("info/toast_list", { type: "empty", content: [] });
    this.hide_volume_panel();
    this.check_click_for_more();
    console.log(this.auth_info);
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/videoplay.scss";
</style>