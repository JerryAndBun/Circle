<template>
  <div class="box">
    <Header></Header>
    <div class="bg">
    </div>
    <div class="usermain">
      <div class="userinfo">
        <div class="nickname">
          <p>{{mynickname}}</p>
          <div class="lv">&nbsplv17&nbsp正式会员&nbsp
          </div>

        </div>
        <div class="sign">
          <img class="useravatar" :src='`${baseurl}${myavatar}`'>
          </img>
          <p>{{mysignature}}
          </p>
        </div>
        <div class="followdiv" @click="follow">
          <p class="follow">{{myfocusOn}}</p><br>
          <p href="" class="followedlink">关注</p>
        </div>
        <div class="fansdiv">
          <p class="fans">{{myfans}}</p><br>
          <p href="" class="fanslink">粉丝</p>
        </div>
        <div class="manuscriptdiv">
          <p class="manuscript">{{myvideos}}</p><br>
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
import { BASE_URL } from '../api/config'
export default {
  data() {
    return {
      d: this.uid,
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
      myavatar: "",
      mycreatedAt: "",
      myemail: "",
      myfans: "",
      myfocusOn: "",
      myvideos: "",
      mynickname: "",
      mysignature: "",
      myuid: "",
      current: "0",
      baseurl:BASE_URL,
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
      this.$router.push(url).catch((err) => {
        // console.log("输出报错", err);
      });
    }
  },
  components: {
    Header
  },

  mounted() {
    console.log(BASE_URL);
    console.log(`${this.baseurl}/${this.myavatar}`);
    // 获取路由传过来的参数，并设置为当前用户中心的myuid
    this.myuid = this.$route.query.uid||this.uid;
    HttpManager.getUserInfo(`/userInfo/${this.myuid}`).then(
      (response) => {
        console.log(response);
        this.myavatar = response.avatar;
        this.mycreatedAt = response.createdAt;
        this.myemail = response.email;
        this.myfans = response.fans;
        this.myfocusOn = response.focusOn;
        this.myvideos = response.videos;
        this.mynickname = response.nickname;
        this.mysignature = response.signature;
        this.myuid = response.uid;
        // then",response.token);
      },
      (error) => {}
    );
    // 若没有签名则初始签名
    if (!this.signature) {
      this.$store.commit("user/setSignature", "这个人很懒，还没有签名~");
    }

    // 第一次进入请求拉取该用户的动态
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/userpage.scss";
</style>