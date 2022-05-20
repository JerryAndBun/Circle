<template>
  <div>
    <div class="theuser">nickname</div>
    <div class="chat_page">
      <div class="messagecontent" v-for="(item,index) in 30" 
        :key="index" >
        <!-- :src='`${baseurl}${itemList.avatar}`' -->
        <img src="../assets/imgs/狗头.jpg" class="avatar" alt="">
        <div class="yours" >1asdas1231asdas123112asdasdasdas123112asdasdasdas123112asdasdasdas123112asdasdasdas123112asdasdasdas123112asdasd12asdasdas</div>
      </div>
    </div>
    <Commentinput @send='send'></Commentinput>
  </div>
</template>

<script>
import Commentinput from "../components/CommentInput.vue";
export default {
  components: {
    Commentinput
  },
  methods: {
    send(params) {
      //   alert("私信");
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/messagewindow.scss";
</style>