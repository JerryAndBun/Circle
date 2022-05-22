<template>
  <div>
    <Header @searchEvent="search"></Header>
    <div class="searchdiv">
      <div class="searchbox">
        <input class="searchInput" ref="searchInput" placeholder="Circle What You Want" type=" text" @keyup.enter="search" @input="changekeword">
        <a href="" class="sou" @click.prevent="authsearch=true,search()">搜索</a>
      </div>
      <div class="distinguish">
        <div class="video" ref="video" @click="isvideo=true,myisuser=false,search()">
          <router-link to="/searchresult/video">
            视频
          </router-link>
        </div>
        <div class="user" ref="user" @click="myisuser=true,isvideo=false,search()">
          <router-link to="/searchresult/user">
            用户
          </router-link>
        </div>
      </div>
    </div>
    <div class="switchdiv">
      <router-view :userList="userList" :videList="videList"></router-view>
    </div>
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
      myisuser: false,
      firstuser: true,
      isvideo: true,
      firstvideo: true,
      authsearch: false,
      videList: "",
      userList: ""
    };
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters("info", ["searchtext", "isuser"]),
    ...mapGetters("user", ["uid"])
  },
  methods: {
    changekeword() {
      this.$store.commit("info/setSearchText", this.$refs.searchInput.value);
      console.log(this.$refs.searchInput.value);
    },
    search(a) {
      console.log(this.authsearch);
      console.log(this.myisuser);
      console.log(this.firstuser);
      console.log(this.isvideo);
      console.log(this.firstvideo);
      // console.log(this.searchtext.length);
      if ((this.isvideo && this.firstvideo) || this.authsearch) {
        // 视频组件
        this.firstvideo = false;
        this.firstuser = true;
        this.$refs.video.style.borderBottom = "2px solid rgb(15,155,241)";
        this.$refs.user.style.borderBottom = "none";
        this.authsearch = false;
        this.$store.commit("info/setIsUser", this.myisuser);
        console.log("这里是视频搜索");
        console.log(`关键字是${this.searchtext}`);
      }
      if ((this.myisuser && this.firstuser) || this.authsearch) {
        // 用户组件
        this.firstuser = false;
        this.firstvideo = true;
        this.$refs.user.style.borderBottom = "2px solid rgb(15,155,241)";
        this.$refs.video.style.borderBottom = "none";
        this.authsearch = false;
        this.$store.commit("info/setIsUser", this.myisuser);
        console.log("这里是用户搜索");
        console.log(`关键字是${this.searchtext}`);
        HttpManager.getUserList(`/search/${this.uid}`, { params: { keyword: this.searchtext } }).then(
          (response) => {
            this.userList=response
            console.log(this.userList);
            // console.log(response);
          },
          (error) => {
            console.log("搜索失败");
          }
        );
      }
    }
  },
  mounted() {
    this.myisuser = this.isuser;
    this.isvideo = !this.isuser;
    if (this.searchtext.length != 0) {
      this.search();
      console.log("刷新执行");
    }
    this.$refs.searchInput.value = this.searchtext;
    // console.log(this.$refs.searchInput.value);
    // console.log("------------------------------");
  },
  beforeRouteLeave(to,from,next){
    this.$store.commit('info/setIsUser',false)
    next()
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/searchresult.scss";
</style>