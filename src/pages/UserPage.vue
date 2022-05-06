<template>
  <div class="box">
    <Header></Header>
    <div class="bg">
    </div>
    <div class="usermain">
      <div class="userinfo">
        <div class="nickname">
          <p>{{nickname}}</p>
          <div class="lv">&nbsp&nbsplv17&nbsp正式会员&nbsp&nbsp</div>
        </div>
        <div class="sign">
          <div class="useravatar">
          </div>
          <p>{{这里是我的签名}}这里是我1231
          </p>
        </div>
        <div class="followdiv">
          <p class="follow">234</p><br>
          <p href="" class="followedlink">关注</p>
        </div>
        <div class="fansdiv">
          <p class="fans">2340</p><br>
          <p href="" class="fanslink">粉丝</p>
        </div>
        <div class="manuscriptdiv">
          <p class="manuscript">32</p><br>
          <p href="" class="manuscriptlink">投稿</p>
        </div>
        <div class="followmediv">
          <a href="">关注</a>
        </div>
      </div>
      <div class="home_area">
        <aside class="tab_area">
          <div v-for="(item,index) in routerList" :key="index" :class="index==current?'active':'unactive'" @click="setNum(index);jump(item.url)">
            <i :class="item.icon"></i>{{item.name}}
          </div>
        </aside>
        <main class="content_area"> 
          <router-view></router-view>
        </main>
        <aside class="topic_area">3</aside>
      </div>
    </div>
  </div>

</template>

<script>
import Header from "../components/Header.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      routerList: [
        {
          name: "动态",
          url: "/userpage/space",
          icon:"iconfont icon-circle"
        },
        {
          name: "视频",
          url: "/userpage/video",
          icon:"iconfont icon-video"
        },
        {
          name: "同好",
          url: "/userpage/fans",
          icon:"iconfont icon-fans"
        },
        {
          name: "设置",
          url: "/userpage/setting",
          icon:"iconfont icon-setting"
        }
      ],
      current:'0',
    };
  },
  methods:{
    setNum(index){
      this.current=index
    },
    jump(url){
      this.$router.push(url)
    },
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters(["nickname"])
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/userpage.scss";
</style>