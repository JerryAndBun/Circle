<template>
  <div class="box">
    <Header></Header>
    <div class="bg">
    </div>
    <div class="usermain">
      <div class="userinfo">
        <div class="nickname">
          <p>{{nickname}}</p>
          <div class="lv">&nbsplv17&nbsp正式会员&nbsp
          </div>

        </div>
        <div class="sign">
          <div class="useravatar">
          </div>
          <p>{{signature}}
          </p>
        </div>
        <div class="followdiv" @click="follow">
          <p class="follow">{{focusOn}}</p><br>
          <p href="" class="followedlink">关注</p>
        </div>
        <div class="fansdiv">
          <p class="fans">{{fans}}</p><br>
          <p href="" class="fanslink">粉丝</p>
        </div>
        <div class="manuscriptdiv">
          <p class="manuscript">{{videos}}</p><br>
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
          <keep-alive>
            <router-view></router-view>
            asdasdad
          </keep-alive>
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
      d:this.uid,
      routerList: [
        {
          name: "动态",
          url: `/userpage/space`,
          icon: "iconfont icon-circle"
        },
        {
          name: "视频",
          url: `/userpage/videolist`,
          icon: "iconfont icon-video"
        },
        {
          name: "同好",
          url: `/userpage/fanslist`,
          icon: "iconfont icon-fans"
        },
        {
          name: "设置",
          url: `/userpage/setting`,
          icon: "iconfont icon-setting"
        }
      ],
      current: "0"
    };
  },
  computed: {
    ...mapGetters("user", ['avatar',"createdAt","email",'fans',"focusOn","videos","nickname",'signature',"uid"])
  },
  methods: {
    follow(){
      
    },
    setNum(index) {
      this.current = index;
    },
    jump(url) {
      this.$router.push(url).catch((err) => {
        // console.log("输出报错", err);
      });
    }
  },
  components: {
    Header
  },
  
  mounted(){
    console.log(this.uid);
    // 若没有签名则初始签名
    if(!this.signature){
      this.$store.commit('user/setSignature','这个人很懒，还没有签名~')
    }
    // 第一次进入请求拉取该用户的动态
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/userpage.scss";
</style>