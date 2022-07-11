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
  <div class="forwardMoment">
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
      <div class="forwardInner">
        489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456489456456
      </div>
        <div class="openup">展开</div>
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
      list:[]
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
  },
  mounted() {
      if(!this.myavatar){
          this.myavatar=require('../assets/imgs/头像.jpg')
      }
      this.$refs.content.innerHTML=this.item.content
  },
};

</script>

<style lang='scss' scoped>
@import '../assets/css/moment.scss'
</style>