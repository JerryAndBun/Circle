<template>
  <div>
    <Header @searchEvent="search"></Header>
    <div class="searchdiv">
      <div class="searchbox">
        <input class="searchInput" v-model="mysearchtext" placeholder="Circle What You Want" type=" text" @keyup.enter="search">
        <a href="" class="sou" @click.prevent="authsearch=true,search()">搜索</a>
      </div>
      <div class="distinguish">
        <div class="video" ref="video" @click="isvideo=true,isuser=false,search()">
          <router-link to="video">
            视频
          </router-link>
        </div>
        <div class="user" ref="user" @click="isuser=true,isvideo=false,search()">
          <router-link to="user">
            用户
          </router-link>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HttpManager from "../api/index";
import { mapGetters } from "vuex";
export default {
  name: "searchpage",
  data() {
    return {
      isuser: false,
      firstuser: true,
      isvideo: true,
      firstvideo: true,
      authsearch: false,
      freashsearch: false,
      mysearchtext: ""
    };
  },
  components: {
    Header
  },
  methods: {
    search(a) {
      console.log(this.authsearch);
      console.log(this.isuser);
      console.log(this.firstuser);
      console.log(this.isvideo);
      console.log(this.firstvideo);
      if (!this.freashsearch) {
        this.$store.commit("info/setSearchText", this.mysearchtext);
      }
      if ((this.isvideo && this.firstvideo) || this.authsearch) {
        this.firstvideo = false;
        this.firstuser = true;
        this.$refs.video.style.borderBottom = "2px solid rgb(15,155,241)";
        this.$refs.user.style.borderBottom = "none";
        this.authsearch = false;
        console.log("这里是视频搜索");
      }
      if ((this.isuser && this.firstuser) || this.authsearch) {
        this.firstuser = false;
        this.firstvideo = true;
        this.$refs.user.style.borderBottom = "2px solid rgb(15,155,241)";
        this.$refs.video.style.borderBottom = "none";
        this.authsearch = false;
        console.log("这里是用户搜索");
        HttpManager.getUserList({ params: { keyword: this.searchtext } }).then(
          (response) => {
            console.log("打印结果");
            console.log(response);
          },
          (error) => {
            console.log("搜索失败");
          }
        );
      }
      /* console.log("检测到搜索事件");
      console.log("关键字为" + this.searchtext); */
    }
  },
  computed: {
    ...mapGetters("info", ["searchtext"])
  },
  mounted() {
    console.log(this.searchtext);
    if (this.searchtext.length != 0) {
      this.freashsearch = true;
      this.search();
      console.log("刷新执行");
    }
    this.mysearchtext = this.searchtext;
    // console.log(this.mysearchtext);
    // console.log(this.searchtext);
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/searchresult.scss";
</style>