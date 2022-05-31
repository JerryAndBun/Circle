<template>
  <div>
    <div>
      <div class="togle">
        <div class="page1" @click="topage1">我的投稿</div>
        <div class="page2" @click="topage2">我的收藏</div>
        <div class="line" ref="line"></div>
      </div>
    </div>
    <div class="backgroundDiv">
      <div class="myvideos_content" v-if="!isempty">
        <div class="myvideos" v-if="ispage1">
          <VideoPreview v-for="(item,index) in videoList" 
          :key="index"
          :cv="item.cv"
           >
          <i class="iconfont icon-bofangliang"></i>
          <a href="javascript:;" class="nickname">{{item.playNum}}播放</a>
          <a href="javascript:;" for="nickname">{{item.createdAt}}</a>
          </VideoPreview>
        </div>
        <PageWrapper  :pageNo="2" :pageSize="3" :total="91" :continues="3"></PageWrapper>
      </div>
      <div class="collections" v-if="ispage2">
      </div>
      <div v-if="isempty" class="emptyinfo">
        <img src="../assets/imgs/这里什么都没有.png" class="empty" alt="">
        <div class="emptytext" id="emptytext" ref="emptytext">你还没有投稿</div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPreview from '../components/VideoPreview.vue'
import PageWrapper from '../components/PageWrapper.vue'
import {BASE_URL} from '../api/config.js'
import HttpManager from '@/api';
export default {
  props: ["itemList"],
  data() {
    return {
      ispage1: 1,
      ispage2:0,
      isempty: 0,
      baseurl:BASE_URL,
      // cv:'a37ec456'
      videoList:'',
    };
  },
  components:{
    VideoPreview,
    PageWrapper,
  },
  methods: {
    topage1() {
      //第一个按钮的点击事件
      // 投稿为空
      if(this.itemList.videoList.length==0){
        this.isempty=1
      }
      if (!this.ispage1) {
        console.log(this.itemList);
        console.log(1);
        if(this.isempty){
          this.$refs.emptytext.innerHTML='你还没有投稿'
        }
        this.$refs.line.style.transform = "translateX(-64px)";
        console.log(this.ispage1);
        this.ispage1 = 1;
        this.ispage2=0
      }
    },
    topage2() {
      //第二个按钮的点击事件
      if(this.itemList.collects.length==0){
        this.isempty=1
      }
      if (this.ispage1) {
        console.log(this.isempty = 1);
        this.$refs.line.style.transform = "translateX(64px)";
        if(this.isempty){
          this.$refs.emptytext.innerHTML='你还没有收藏'
        }
        console.log(2);
        this.ispage1 = 0;
        this.ispage2=1
      }
    }
  },
  created() {
    // 若没有投稿视频
    console.log(this.itemList);
    if (!this.itemList.videos) {
      this.isempty = 1;
      console.log('??');
    }
    else{
    // 有投稿视频，发起请求
      HttpManager.getCollectList().then(
        (response)=>{console.log('查询投稿视频成功');
        this.videoList=response;},
        (error)=>{console.log('查询投稿视频失败');})
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/videolist.scss";
</style>