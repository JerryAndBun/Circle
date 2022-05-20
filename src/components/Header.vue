<template>
  <div class="head">
    <div class="headmain">
      <div class="navbox">
        <img src='../assets/imgs/MyLogo.png' alt="">
        <div class="daohangbox">
          <div class="daohangbox2">
            <a class="daohangboxa" href="">分区</a>
            <i class="iconfont icon-gongneng"></i>
          </div>
        </div>
      </div>
      <div class="searcharea">
        <input class="searchbox" v-model="searchtext" placeholder="Circle What You Want" type=" text" @keyup.enter="search">
        <div class="iconbox">
          <i class="iconfont icon-fangdajing"></i>
        </div>
      </div>
      <ul ref="guideul" class="headguide">
        <li class="guide-download">
          <a href="javascript:;">
            <i class="iconfont icon-shouji"></i>
          </a>
        </li>
        <li ref="logintext" :class="dongtaiclass" @mouseenter="avatarEnteranimation" @mouseleave="avatarOutanimation">
          <router-link href="" to="/login" class="logintextlink" v-if="!islogin">登录/注册</router-link>
          <transition name="jump">
            <div class="avatar" ref="avatar" v-if="islogin" @click="touserpage">
            </div>
          </transition>
          <transition name="fade">
            <div class="userbox" ref="userbox" v-if="islogin">
              <div class="logout">
                <router-link :to="{
                  path:`/userpage/${this.uid}`
                  }" class="username">{{nickname}}</router-link>
                <a href="javascript:;" class="logouta" @click="logout">退出登录</a>
              </div>
              <div class="home" @click="touserpage">
                <router-link :to="{
                  path:`/userpage/${this.uid}`
                  }" class="tohomelink">查看更多</router-link>
              </div>
            </div>
          </transition>
        </li>
        <li ref="guide" class="guide guide-msg" @click="tomessage">
          <a href="javascript:;">
            <i class="iconfont icon-xiaoxi guideicon"></i>
            <span class="word xiaoxiword">消息</span>
          </a>
        </li>
        <li ref="guide" class="guide guide-history">
          <a href="javascript:;">
            <i class="iconfont guideicon icon-lishi" id="guideicon"></i>
            <span class="word lishiword">历史</span>
          </a>
        </li>
        <li ref="guide" class="guide guide-feed">
          <a href="javascript:;">
            <i class="iconfont guideicon icon-xingxing" id="guideicon"></i>
            <span class="word dongtaiword">动态</span>
          </a>
        </li>
        <li ref="guide" class="guide guide-cretive">
          <a href="javascript:;">
            <i class="guideicon iconfont  icon-qian" id="guideicon"></i>
            <span class="word chuangzuozheword">创作者</span>
          </a>
        </li>
        <li class="guide-upload">
          <i class="iconfont icon-shangchuan"></i>
          <a class="icon-shangchuana" href="javascript:;">
            投稿
          </a>
        </li>
      </ul>
    </div>
    <div id="lv1guide">
      <ul class="lv1guideul">
        <li class="lv1"><a href="">AC正义</a></li>
        <li class="lv1"><a href="">番剧</a></li>
        <li class="lv1"><a href="">动画</a></li>
        <li class="lv1"><a href="">娱乐</a></li>
        <li class="lv1"><a href="">生活</a></li>
        <li class="lv1"><a href="">音乐</a></li>
        <li class="lv1"><a href="">舞蹈·偶像</a></li>
        <li class="lv1"><a href="">游戏</a></li>
        <li class="lv1"><a href="">科技</a></li>
        <li class="lv1"><a href="">影视</a></li>
        <li class="lv1"><a href="">体育</a></li>
        <li class="lv1"><a href="">鱼塘</a></li>
        <li class="lv1"><a href="">文章</a></li>
      </ul>
    </div>
    <div ref="lv2guide" id="lv2guide">
      <ul class="lv2guideul lv2guideul1">
        <li class="lv2"><a href="">中国日报</a></li>
        <li class="lv2"><a href="">环球时报</a></li>
        <li class="lv2"><a href="">中国网</a></li>
        <li class="lv2"><a href="">法制进行时</a></li>
        <li class="lv2"><a href="">浙样红TV</a></li>
        <li class="lv2"><a href="">新青年工作室</a></li>
        <li class="lv2"><a href="">新华社现场云</a></li>
        <li class="lv2"><a href="">快手</a></li>
        <li class="lv2"><a href="">小央视频</a></li>
        <li class="lv2"><a href="">人民咨询</a></li>
        <li class="lv2"><a href="">AC正义展览区</a></li>
      </ul>
      <ul class="lv2guideul lv2guideul2">
        <li class="lv2"> <a href="">番剧列表</a></li>
        <li class="lv2"> <a href="">TV动画</a></li>
        <li class="lv2"> <a href="">剧场动画</a></li>
        <li class="lv2"> <a href="">国产动画</a></li>
      </ul>
      <ul class="lv2guideul lv2guideul3">
        <li class="lv2"><a href="">动画综合</a></li>
        <li class="lv2"><a href="">短片·手书·配音</a></li>
        <li class="lv2"><a href="">MAD·AMV</a></li>
        <li class="lv2"><a href="">MMD·3D</a></li>
        <li class="lv2"><a href="">虚拟偶像</a></li>
        <li class="lv2"><a href="">动画资讯</a></li>
        <li class="lv2"><a href="">COSPLAY·声优</a></li>
        <li class="lv2"><a href="">特摄</a></li>
        <li class="lv2"><a href="">番剧二创</a></li>
      </ul>
      <ul class="lv2guideul lv2guideul4">
        <li class="lv2"><a href="">搞笑</a></li>
        <li class="lv2"><a href="">鬼畜</a></li>
        <li class="lv2"><a href="">明星</a></li>
      </ul>
      <ul class="lv2guideul lv2guideul5">
        <li class="lv2"><a href="">生活日常</a></li>
        <li class="lv2"><a href="">萌宠</a></li>
        <li class="lv2"><a href="">美食</a></li>
        <li class="lv2"><a href="">旅行</a></li>
        <li class="lv2"><a href="">手工·绘画</a></li>
        <li class="lv2"><a href="">美妆·造型</a></li>
      </ul>
      <ul class="lv2guideul lv2guideul6">
        <li><a href="">治愈系</a></li>
        <li><a href="">原创·翻唱</a></li>
        <li><a href="">演奏·乐器</a></li>
        <li><a href="">Vocaloid</a></li>
        <li><a href="">综合音乐</a></li>
        <li><a href="">音乐选集·电台</a></li>
      </ul>
      <ul class="lv2guideul lv2guideul7">
        <li><a href="">颜值</a></li>
        <li><a href="">宅舞</a></li>
        <li><a href="">综合舞蹈</a></li>
        <li><a href="">偶像</a></li>
        <li><a href="">中国舞</a></li>
      </ul>
      <ul class="lv2guideul lv2guideul8">
        <li><a href="">王者荣耀</a></li>
        <li><a href="">我的世界</a></li>
        <li><a href="">和平精英</a></li>
        <li><a href="">第五人格</a></li>
        <li><a href="">英雄联盟</a></li>
        <li><a href="">电子竞技</a></li>
        <li><a href="">网络游戏</a></li>
        <li><a href="">主机单机</a></li>
        <li><a href="">手机游戏</a></li>
        <li><a href="">桌游卡牌</a></li>
      </ul>
      <ul class="lv2guideul lv2guideul9">
        <li><a href="">手办模玩</a></li>
        <li><a href="">科技制造</a></li>
        <li><a href="">人文科普</a></li>
        <li><a href="">汽车</a></li>
        <li><a href="">数码家电</a></li>
        <li><a href="">演讲·公开课</a></li>
        <li><a href="">广告</a></li>
      </ul>
      <ul class="lv2guideul lv2guideul10">
        <li><a href="">电视剧放映厅</a></li>
        <li><a href="">电影放映厅</a></li>
        <li><a href="">影视混剪</a></li>
        <li><a href="">预告·花絮</a></li>
        <li><a href="">电影杂谈</a></li>
        <li><a href="">追剧社</a></li>
        <li><a href="">综艺show</a></li>
        <li><a href="">纪录片·短片</a></li>
      </ul>
      <ul class="lv2guideul lv2guideu11">
        <li><a href="">综合体育</a></li>
        <li><a href="">足球</a></li>
        <li><a href="">篮球</a></li>
        <li><a href="">搏击健身</a></li>
        <li><a href="">极限竞速</a></li>
      </ul>
      <ul class="lv2guideul lv2guideul12">
        <li><a href="">普法安全</a></li>
        <li><a href="">国防军事</a></li>
        <li><a href="">历史</a></li>
        <li><a href="">新鲜事·正能量</a></li>
      </ul>
      <ul class="lv2guideul lv2guideul13">
        <li><a href="">二次元画师</a></li>
        <li><a href="">综合</a></li>
        <li><a href="">生活情感</a></li>
        <li><a href="">游戏</a></li>
        <li><a href="">动漫文化</a></li>
        <li><a href="">漫画·文学</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dongtaiclass: "logintext-login",
      timein: "",
      searchtext: ""
    };
  },
  computed: {
    ...mapGetters("user", ["nickname", "uid", "islogin"])
  },
  methods: {
    search() {
      this.$store.commit("info/setSearchText", this.searchtext);
      if (this.searchtext === "") return;
      this.$emit("searchEvent", this.searchtext);
      this.$router.push("/searchresult").catch((err) => {});
    },
    touserpage() {
      this.$router
        .push({
          path: `/userpage/${this.uid}`
        })
        .catch((err) => {});
    },
    logout() {
      this.$store.commit("user/setAvatar", null);
      this.$store.commit("user/setCreatedAt", null);
      this.$store.commit("user/setEmail", null);
      this.$store.commit("user/setFans", null);
      this.$store.commit("user/setFocusOn", null);
      this.$store.commit("user/setVideos", null);
      this.$store.commit("user/setNickname", null);
      this.$store.commit("user/setSignature", null);
      this.$store.commit("user/setUid", null);
      this.$store.commit("user/setToken", null);
      this.$store.commit("user/setIsLogin", false);
      this.dongtaiclass = "logintext-login";
      this.$route.params.myuid = "";
      this.$router
        .push({
          path: `/`
        })
        .catch((err) => {});
      console.log(this.$route);
    },
    avatarEnteranimation() {
      if (this.islogin) {
        this.timein = setTimeout(() => {
          if (this.timein) {
            this.$refs.userbox.style.display = "block";
            this.$refs.avatar.style.transform = "scale(120%)";
          }
        }, 100);
      }
    },
    avatarOutanimation() {
      if (this.islogin) {
        clearTimeout(this.timein);
        this.$refs.userbox.style.display = "none";
        this.$refs.avatar.style.transform = "scale(100%)";
      }
    },
    tomessage(){
      this.$router
        .push({
          path: `/messagepage`
        })
        .catch((err) => {});
    }
  },
  //Header 的交互逻辑js
  mounted() {
    var lilist = document.getElementsByClassName("guide"); //li列表
    var wordlist = document.getElementsByClassName("word"); //li下方的文字
    var iconlist = document.getElementsByClassName("guideicon"); //icon列表
    var daohangbox = document.getElementsByClassName("daohangbox");
    var lv1guide = document.getElementById("lv1guide"); //获取一级列表
    var lv1li = lv1guide.getElementsByTagName("li"); //获取一级列表的li
    var icongongneng = document.querySelector(".icon-gongneng"); //功能icon
    var daohangboxa = document.querySelector(".daohangboxa"); //功能box的a
    var lv2guide = document.getElementById("lv2guide"); //二级列表
    var lv2guideul = lv2guide.getElementsByTagName("ul"); //二级列表的ul数组
    var lv2li = new Array();
    for (let j = 0; j < 13; j++) {
      lv2li[j] = lv2guideul[j].getElementsByTagName("li"); //二级列表的ul数组的li数组
    }
    window.isqr = 1;
    for (let index = 0; index < 4; index++) {
      lilist[index].onmouseenter = function () {
        iconlist[index].style.transform = "translateY(-6px) scale(80%)";
        wordlist[index].style.visibility = "visible";
        wordlist[index].style.transform = "translateY(-16px)";
        wordlist[index].style.opacity = "1";
        wordlist[index].style.color = "rgb(15,155,241)";
        iconlist[index].style.color = "rgb(15,155,241)";
      };
      lilist[index].onmouseleave = function () {
        iconlist[index].style.transform = "translateY(0px)";
        iconlist[index].style.fontSize = "18px";
        wordlist[index].style.visibility = "hidden";
        wordlist[index].style.transform = "translateY(-5px)";
        wordlist[index].style.opacity = "0";
        wordlist[index].style.color = "#999";
        iconlist[index].style.color = "#999";
      };
    }
    //范围内的功能盒子动画
    function inboxanimate() {
      icongongneng.style.transform = "rotate(90deg)";
      icongongneng.style.color = "rgb(15,155,241)";
      daohangboxa.style.color = "rgb(15,155,241)";
    }
    function outboxanimate() {
      icongongneng.style.transform = "rotate(-90deg)";
      icongongneng.style.color = "#999";
      daohangboxa.style.color = "#333";
    }
    function lv1show() {
      lv1guide.style.visibility = "visible";
    }
    function lv1hidden() {
      lv1guide.style.visibility = "hidden";
    }
    function lv2show() {
      lv2guide.style.visibility = "visible";
    }
    function lv2hidden() {
      lv2guide.style.visibility = "hidden";
    }
    //鼠标悬浮显示一二级菜单
    //获取一级导航栏的范围

    let lv1x = lv1guide.offsetLeft; //一级导航栏距离左边的距离 0
    let lv1y = lv1guide.offsetTop; //距离顶部的距离 60
    let lv1X = lv1guide.offsetLeft + lv1guide.offsetWidth; //宽 2003
    let lv1Y = lv1guide.offsetTop + lv1guide.offsetHeight; //底部距离顶部的距离100
    let mouseX;
    let mouseY;
    let getmouse = function () {
      let event = window.event;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };
    daohangbox[0].onmouseenter = function () {
      lv1show();
      inboxanimate();
    };
    //移入移出导航区的判断
    daohangbox[0].onmouseleave = function () {
      //获取鼠标的坐标
      getmouse();
      if (mouseY < lv1y) {
        lv1hidden();
        outboxanimate();
      }
    };
    // 移出lv1li
    lv1li = Array.from(lv1li); //转为数组
    var isin = false;
    var timeout;
    lv1li.forEach(function (item, index, lv1li) {
      item.onmouseenter = function () {
        isin = true;
        timeout = setTimeout(() => {
          lv2show();
          lv2guideul[index].style.display = "block";
        }, 250); //延时防抖显示lv2ul
      };
      item.onmouseleave = function () {
        isin = false;
        clearTimeout(timeout); //防抖
        lv2guideul[index].style.display = "none"; //隐藏lv2ul
        lv2hidden(); //隐藏lv2
        getmouse();
        // 往下去lv2guide
        if (mouseY + 3 > lv1Y && mouseX > item.getBoundingClientRect().left && mouseX < item.getBoundingClientRect().left + 60) {
          lv2guideul[index].style.display = "block";
          lv2show();
          isin = true;
        }
      };
    });
    lv1guide.onmouseleave = function () {
      if (isin) {
        return;
      }
      lv1hidden();
      outboxanimate();
    };
    // lv2ul
    lv2guideul = Array.from(lv2guideul);
    lv2guideul.forEach(function (item, index, lv2guideul) {
      item.onmouseleave = function () {
        getmouse();
        if (mouseY + 1 > lv1Y + 40) {
          isin = false;
          lv1hidden();
          lv2hidden();
          outboxanimate();
          return;
        }
        //100%浏览的解决办法，缩放时会出现bug，用userbox那种写法可以解决问题，不过实在懒得改了，太混乱了，能实现就行
        if (mouseX < 177 || mouseX > 1218) {
          lv1hidden();
          lv2hidden();
        }
        if (isin) {
          timeout = setTimeout(() => {
            lv2hidden();
            lv2guideul[index].style.display = "none"; //隐藏lv2ul
          }, 250);
          return;
        }
      };
    });
  },
  created() {
    if (JSON.parse(localStorage.getItem("islogin"))) {
      this.dongtaiclass = "logintext-avatar";
    } else {
      this.dongtaiclass = "logintext-login";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/header";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.jump-enter-active,
.jump-leave-active {
  transition: translateY(2px) scale(130%) 0.3;
}
.jump-enter,
.jump-leave-to {
  translate: translateY(0px);
  transform: scale(100%);
}
// @keyframes fading {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }
</style>