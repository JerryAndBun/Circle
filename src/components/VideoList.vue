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
      <div v-if="isempty" class="emptyinfo">
        <img src="../assets/imgs/这里什么都没有.png" class="empty" alt="">
        <div class="emptytext" id="emptytext" ref="emptytext">你还没有投稿</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["itemList"],
  data() {
    return {
      ispage1: 1,
      isempty: 0
    };
  },
  methods: {
    topage1() {
      //第一个按钮的点击事件
      if (!this.ispage1) {
        console.log(this.itemList);

        console.log(1);
        this.$refs.line.style.transform = "translateX(-64px)";
        this.$refs.emptytext.innerHTML='你还没有投稿'
        
      }
      this.ispage1 = 1;
    },
    topage2() {
      //第二个按钮的点击事件
      if (this.ispage1) {
        console.log(2);
        this.$refs.line.style.transform = "translateX(64px)";
        this.$refs.emptytext.innerHTML='你还没有收藏'
      }
      this.ispage1 = 0;
    }
  },
  created() {
    console.log(this.itemList);
    if (!this.itemList.videos) {
      this.isempty = 1;
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/videolist.scss";
</style>