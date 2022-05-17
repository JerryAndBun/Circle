<template>
  <div class="box">
    <Header></Header>
    <div class="bg">
    </div>
    <div class="usermain">
      <div class="userinfo">
        <div class="nickname">
          <p>{{itemList.nickname}}</p>
          <div class="lv">&nbsplv17&nbsp正式会员&nbsp
          </div>

        </div>
        <div class="sign">
          <img class="useravatar" :src='`${baseurl}${itemList.avatar}`'>
          </img>
          <p>{{itemList.signature}}
          </p>
        </div>
        <div class="followdiv" @click="follow">
          <p class="follow">{{itemList.focusOn}}</p><br>
          <p href="" class="followedlink">关注</p>
        </div>
        <div class="fansdiv">
          <p class="fans">{{itemList.fans}}</p><br>
          <p href="" class="fanslink">粉丝</p>
        </div>
        <div class="manuscriptdiv">
          <p class="manuscript">{{itemList.videos}}</p><br>
          <p href="" class="manuscriptlink">投稿</p>
        </div>
        <div class="followmediv">
          <a href="">关注</a>
        </div>
      </div>
      <div class="home_area">
        <aside class="tab_area" ref="tab_area">
          <div v-for="(item,index) in routerList" :key="index" :class="index==current?'active':'unactive'" @click="setNum(index);jump(item.url)">
            <i :class="item.icon"></i>{{item.name}}
          </div>
        </aside>
        <main class="content_area">
          <keep-alive>
            <router-view :itemList="itemList"></router-view>
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
import HttpManager from "../api/index";
import { BASE_URL } from "../api/config";
export default {
  data() {
    return {
      // d: this.uid,
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
      myuid: "",
      isown:true,
      current: "0",
      baseurl: BASE_URL,
      itemList: ""
    };
  },
  computed: {
    ...mapGetters("user", ["avatar", "createdAt", "email", "fans", "focusOn", "videos", "nickname", "signature", "uid"])
  },
  methods: {
    follow() {},
    setNum(index) {
      this.current = index;
    },
    jump(url) {
      this.$router.push(url).catch((err) => {});
    }
  },
  components: {
    Header
  },

  mounted() {
    console.log(BASE_URL);
    // 获取路由传过来的参数，并设置为当前用户中心的myuid

    this.myuid = this.$route.query.uid
    if(this.myuid==undefined){
      this.myuid=this.uid;
      this.isown=false
    }
    if(!this.isown){
      this.routerList=this.routerList.slice(0,3)
      this.$refs.tab_area.style.height="180px"
    }
    console.log(this.routerList);
    // console.log(this.myuid);
    // console.log(this.myuid);
    // 用户页面刷新请求新的数据并提交到vuex中
    HttpManager.getUserInfo(`/userInfo/${this.myuid}`).then(
      (response) => {
        console.log(response);
        if (!response.signature) {
          this.$store.commit("user/setSignature", "这个人很懒，还没有签名~");
          response.signature = "这个人很懒，还没有签名~";
        }
        this.$store.commit("user/setAvatar", response.avatar);
        this.$store.commit("user/setCreatedAt", response.createdAt);
        this.$store.commit("user/setEmail", response.email);
        this.$store.commit("user/setFans", response.fans);
        this.$store.commit("user/setFocusOn", response.focusOn);
        this.$store.commit("user/setVideos", response.videos);
        this.$store.commit("user/setNickname", response.nickname);
        this.$store.commit("user/setUid", response.uid);

        this.itemList = response;
      },
      (error) => {}
    );
    this.$router.push(`/userpage/space`).catch((err) => {
      // console.log("输出报错", err);
    });
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/userpage.scss";
</style>