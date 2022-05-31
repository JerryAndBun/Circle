<template>
  <div>
    <div class="togle">
      <div class="page1" @click="topage1">粉丝列表</div>
      <div class="page2" @click="topage2">关注列表</div>
      <div class="line" ref="line"></div>
    </div>
    <!-- <router-view :itemList='itemList'></router-view> -->
    <div class="backgroundDiv">
      <div v-if="isempty" class="emptyinfo">
        <img src="../assets/imgs/这里什么都没有.png" class="empty" alt="">
        <div class="emptytext" id="emptytext" ref="emptytext">你还没有粉丝，快去投稿吧~</div>
      </div>
      <div class="fansList" v-if="ispage1">
        <UserPreview v-for="(item,index) in itemList.fansList" :key="index" :item="item"></UserPreview>
      </div>
      <div class="focusList" v-if="ispage2">
        <UserPreview v-for="(item,index) in itemList.focusOnList" :key="index" :item="item"></UserPreview>
      </div>
    </div>
  </div>

</template>

<script>
import { BASE_URL } from "../api/config";
import HttpManager from "../api/index";
import { mapGetters } from "vuex";
import UserPreview from "../components/UserPreview.vue";

export default {
  props: ["itemList"],
  data() {
    return {
      ispage1: 1,
      ispage2: 0,
      isempty: 0
    };
  },
  components: {
    UserPreview
  },
  methods: {
    topage1() {
      if (!this.itemList.fansList.length) {
        this.isempty = 1;
        this.$nextTick(() => {
          console.log((this.$refs.emptytext.innerHTML = "你还没有粉丝，快去投稿吧~"));
        });
      } else {
        this.isempty = 0;
      }
      if (!this.ispage1) {
        this.$refs.line.style.transform = "translateX(-64px)";
      }
      this.ispage1 = 1;
      this.ispage2 = 0;
    },
    topage2() {
      if (!this.itemList.focusOnList.length) {
        this.isempty = 1;
        console.log("11111111");
        this.$nextTick(() => {
          console.log((this.$refs.emptytext.innerHTML = "你还没有关注的人哦"));
        });
      } else {
        this.isempty = 0;
      }
      if (this.ispage1) {
        this.$refs.line.style.transform = "translateX(64px)";
      }
      this.ispage1 = 0;
      this.ispage2 = 1;
    }
  },
  created() {
    console.log(this.itemList);
    console.log(this.itemList.fansList);
    if (!this.itemList.fansList.length) {
      this.isempty = 1;
    }
    // console.log(this.isempty);
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/fanslist.scss";
</style>