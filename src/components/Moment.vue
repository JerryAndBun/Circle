<template>
<!-- 普通文字动态的模板 -->
<div>
  <div class="momentdiv">
    <div class="user">
      <img class="avatar" :src='`${baseurl}${item.userInfo.avatar}`'></img>
      <div class="nickname">{{item.userInfo.nickname}}</div>
      <div class="time">{{item.userInfo.createdAt}}</div>
    </div>
    <div class="content" ref="content"></div>
      <div class="bottom">
        <div class="likes" @click="test">
          <i class="iconfont icon-dianzan1"></i>{{}}</div>
        <div class="comment">
          <i class="iconfont icon-pinglun"></i>12312</div>
        <div class="forward">
          <i class="iconfont icon-zhuanfa1"></i>{{}}</div>
      </div>
    <div class="spreate"></div>
  </div>
<!-- 投稿视频的自动动态模板 -->
  <div class="conMoment">
    <div class="user">
      <img class="avatar" :src='`${baseurl}${item.userInfo.avatar}`'></img>
      <div class="nickname">{{item.userInfo.nickname}}</div>
      <div class="time">{{item.userInfo.createdAt}}</div>
    </div>
    <main class="conVideoContent">
      <img src="" alt="" class="videoPic">
      <aside class="videoInfo">
        <div class="videoTitle">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
        <p class="videoDes">asdasasdasddasdasdasddasasdasasdasddasdasdasddasdasdasddasdasasdasddasdasdasddasdasdasddasdasdasddasdddasdasdasdasddasdddasddasdasddasdasasdasddasdasdasddasdasdasddasdasdasddasdddasdasdasdasddasdddasd</p>
        <div class="icons">
          <i class="iconfont icon-bofangliang"></i>&nbsp{{321}}播放 &nbsp &nbsp
          <i class="iconfont icon-pinglun"></i>&nbsp{{321}}评论
        </div>
      </aside>
    </main>
    <div class="bottom">
      <div class="likes" @click="test">
        <i class="iconfont icon-dianzan1"></i>{{}}
      </div>
      <div class="comment">
        <i class="iconfont icon-pinglun"></i>{{}}</div>
      <div class="forward">
        <i class="iconfont icon-zhuanfa1"></i>{{}}</div>
      </div>
    <div class="spreate"></div>
  </div>
  <!-- 转发别人普通文字动态的动态 -->
  <div class="forwardMoment" id="forwardContent">
    <div class="user">
      <img class="avatar" :src='`${baseurl}${item.userInfo.avatar}`'></img>
      <div class="nickname">{{item.userInfo.nickname}}</div>
      <div class="time">{{item.userInfo.createdAt}}</div>
    </div>
    <div class="reason">asdad</div>
    <main class="forwardContent">
      <div class="userDiv">
        <img src="" alt="" class="userImg">
        <div class="nickName">&nbsp昵称{{}}</div>
      </div>
      <div class="textContainer" ref="textContainer" id="textContainer">
        <div class="forwardInner" ref="forwardInner">
          <span class="text" ref="text">6489456456489456456489456459456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456
          6489456456489456456489456459456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456
          6489456456489456456489456459456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456
          </span>
        </div>
      </div>
      <div class="clickformore" ref="clickformore" @click="unfold" v-if="clickformore">展开</div>
    </main>
    <div class="bottom">
      <div class="likes" @click="test">
        <i class="iconfont icon-dianzan1"></i>{{}}
      </div>
      <div class="comment">
        <i class="iconfont icon-pinglun"></i>{{}}</div>
      <div class="forward">
        <i class="iconfont icon-zhuanfa1"></i>{{}}</div>
      </div>
    <div class="spreate"></div>
  </div>
</div>
</template>

<script>
import {BASE_URL} from '../api/config'
import {mapGetters} from 'vuex'
import UserPage from '@/pages/UserPage.vue';
import VideoPlay from './VideoPlay.vue';
export default {
  components: { UserPage, VideoPlay },
  props: ['item'],
  data() {
    return {
      myavatar:this.avatar,
      baseurl:BASE_URL,
      list:[],
      clickformore: false,
      isfold: true,
    }
  },
  computed:{
    ...mapGetters('info',['toast_list'])
  },
  methods:{
    test(){
      this.$store.commit('info/toast_list',{type:'push'})
      console.log(this.toast_list);
    },
    check_click_for_more() {
      this.$nextTick(() => {
        if (this.$refs.text.offsetHeight > 84) {
          // 需要检测的div的折叠时的高度，若大于，则折叠
          this.$nextTick(() => {
            this.clickformore = true;
            console.log('要折叠');
            // overflow: hidden;
            //     max-height: 144px;
            //     word-break: break-all;
            //     text-overflow: ellipsis;
            //     display: -webkit-box;
            //     -webkit-line-clamp: 6;
            //     -webkit-box-orient: vertical;
            // this.$refs.forwardInner.style.overflow='hidden'
            // this.$refs.forwardInner.style.maxHeight='144px'
            // this.$refs.forwardInner.style.wordBreak='break-all'
            // this.$refs.forwardInner.style.textOverflow='ellipsis'
            // this.$refs.forwardInner.style.display='-webkit-box'
            // this.$refs.forwardInner.style.webkitLineClamp='6'
            // this.$refs.forwardInner.style.webkitBoxOrient='vertical'
          });
        } else {
          this.$nextTick(() => {
          // 需要检测的div的折叠时的高度，若小于，则默认高度，无需折叠
            this.clickformore = false;
            console.log('不要折叠');
          });
        }
      });
    },
    unfold() {
      // 折叠部分的父div
      let father = document.getElementById("textContainer");
      if (this.isfold) {
        // 此处打开
        // 这些只是出现省略号的代码，看起来有点多
        this.$refs.forwardInner.style.overflow='none'
        this.$refs.forwardInner.style.maxHeight='none'
        this.$refs.forwardInner.style.wordBreak='none'
        this.$refs.forwardInner.style.textOverflow='none'
        this.$refs.forwardInner.style.display='block'
        this.$refs.forwardInner.style.webkitLineClamp='0'
        this.$refs.forwardInner.style.webkitBoxOrient='none'

        father.style.maxHeight = `none`;
        father.style.overflow = `none`;
        this.isfold = false;
        this.$refs.clickformore.innerHTML = "收起";
      } else {
        // 此处折叠
        // 这些只是出现省略号的代码，看起来有点多
        this.$refs.forwardInner.style.overflow='hidden'
        this.$refs.forwardInner.style.maxHeight='144px'
        this.$refs.forwardInner.style.wordBreak='break-all'
        this.$refs.forwardInner.style.textOverflow='ellipsis'
        this.$refs.forwardInner.style.display='-webkit-box'
        this.$refs.forwardInner.style.webkitLineClamp='6'
        this.$refs.forwardInner.style.webkitBoxOrient='vertical'

        father.style.maxHeight= `150px`;
        father.style.overflow = `hidden`;
        this.isfold = true;
        this.$refs.clickformore.innerHTML = "展开";
      }
    },
  },

  mounted() {
    this.check_click_for_more();
    if(!this.myavatar){
        this.myavatar=require('../assets/imgs/头像.jpg')
    }
    this.$refs.content.innerHTML=this.item.content
  },
  updated() {
    // this.check_click_for_more();
  },
};

</script>

<style lang='scss' scoped>
@import '../assets/css/moment.scss'
</style>