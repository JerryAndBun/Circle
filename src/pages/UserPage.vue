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
          <div class="coversitiondiv">

          </div>
          <img class="useravatar" :src='`${baseurl}${itemList.avatar}`'>
          </img>
          <p>{{itemList.signature}}
          </p>

        </div>
        <div class="followdiv">
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
        <div v-if="!isown" class="followmediv">
          <a ref="followa" href="" @click.prevent="follow">关注</a>
          <a ref="message" class="messagea" href="" @click.prevent="talktohim">私信</a>
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
            <router-view :isown="isown" :itemList="itemList"></router-view>
          </keep-alive>
        </main>
        <aside class="topic_area">
          <div class="coversitiondiv">
          </div>
        </aside>
      </div>
    </div>
    <Footer></Footer>
  </div>

</template>

<script>
import Header from "../components/Header.vue";
import Footer from '@/components/Footer.vue'
import HttpManager from "../api/index";
import { mapGetters } from "vuex";
import { BASE_URL } from "../api/config";
export default {
  data() {
    return {
      routerList: [
        {
          name: "动态",
          url: `/userpage/${this.$route.params.myuid}/space`,
          icon: "iconfont icon-circle"
        },
        {
          name: "视频",
          url: `/userpage/${this.$route.params.myuid}/videolist`,
          icon: "iconfont icon-video"
        },
        {
          name: "同好",
          url: `/userpage/${this.$route.params.myuid}/fanslist`,
          icon: "iconfont icon-fans"
        },
        {
          name: "设置",
          url: `/userpage/${this.$route.params.myuid}/setting`,
          icon: "iconfont icon-setting"
        }
      ],
      isown: true,
      current: "0",
      baseurl: BASE_URL,
      itemList: ""
    };
  },
  computed: {
    ...mapGetters("user", ["uid"])
  },
  methods: {
    follow() {
      if (this.$refs.followa.innerHTML == "已关注") {
        // 已关注，取关操作
        HttpManager.postUnFocusUser({
          focusid: this.$route.params.myuid,
          uid: this.uid
        }).then(
          (response) => {
            console.log("取关成功");
          },
          (error) => {}
        );
        this.unfocusstyle();
      } else {
        // 未关注，执行关注操作
        HttpManager.postFollowUser({
          focusid: this.$route.params.myuid,
          uid: this.uid
        }).then(
          (response) => {
            console.log("关注成功");
          },
          (error) => {}
        );
        this.focusstyle();
      }
    },
    unfocusstyle() {
      this.$refs.followa.style.color = "rgb(248,248,248)";
      this.$refs.followa.style.backgroundColor = "rgb(15,155,241)";
      this.$refs.followa.innerHTML = "关注";
    },
    focusstyle() {
      this.$refs.followa.style.color = "rgb(248,248,248)";
      this.$refs.followa.style.backgroundColor = "#999";
      this.$refs.followa.innerHTML = "已关注";
    },
    setNum(index) {
      this.current = index;
    },
    jump(url) {
      this.$router.push(url).catch((err) => {});
    },
    requestinfo() {
      HttpManager.getUserInfo(`/userInfo/${this.$route.params.myuid}`).then(
        (response) => {
          if (response.uid == this.uid) {
            this.$store.commit("user/setAvatar", response.avatar);
            this.$store.commit("user/setCreatedAt", response.createdAt);
            this.$store.commit("user/setEmail", response.email);
            this.$store.commit("user/setFans", response.fans);
            this.$store.commit("user/setFocusOn", response.focusOn);
            this.$store.commit("user/setVideos", response.videos);
            this.$store.commit("user/setNickname", response.nickname);
            this.$store.commit("user/setUid", response.uid);
          }
          this.itemList = response;
          console.log(this.itemList);
          if (this.itemList.isFocusOn&&this.itemList.uid!=this.uid) {
            this.focusstyle();
          }
          if (!this.itemList.isFocusOn&&this.itemList.uid!=this.uid){
            this.unfocusstyle();
          }
        },
        (error) => {}
      );
    },
    changeisown() {
      this.isown = true;
      this.routerList = [
        {
          name: "动态",
          url: `/userpage/${this.$route.params.myuid}/space`,
          icon: "iconfont icon-circle"
        },
        {
          name: "视频",
          url: `/userpage/${this.$route.params.myuid}/videolist`,
          icon: "iconfont icon-video"
        },
        {
          name: "同好",
          url: `/userpage/${this.$route.params.myuid}/fanslist`,
          icon: "iconfont icon-fans"
        },
        {
          name: "设置",
          url: `/userpage/${this.$route.params.myuid}/setting`,
          icon: "iconfont icon-setting"
        }
      ];
      this.$refs.tab_area.style.height = "240px";
    },
    talktohim() {
      // alert(this.$route.params)
      this.$router.push(`/messagepage/${this.$route.params.myuid}`);
    }
  },
  components: {
    Header,
    Footer,
  },

  created() {
    // 获取路由传过来的参数，并设置为当前用户中心的myuid
    //判断是否为登录用户

    if (this.$route.params.myuid != this.uid) this.isown = false;
    // 用户页面刷新请求新的数据并提交到vuex中
    this.$watch(
      () => this.$route.params.myuid,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        this.requestinfo();

        // 是已登录用户的
        if (toParams == this.uid) {
          this.changeisown();
        } else {
        }
      }
    );
    this.requestinfo();
    // if()
    this.$router.push(`/userpage/${this.$route.params.myuid}/space`).catch((err) => {});
  },
  mounted() {
    if (!this.isown) {
      this.routerList = this.routerList.slice(0, 3);
      this.$refs.tab_area.style.height = "180px";
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/userpage.scss";
</style>