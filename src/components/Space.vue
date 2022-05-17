<template>
  <div class="spacediv">
    <!-- <div class="momentdiv">
      <CommentInput v-model="article" ref="test" @cleararticle='cleararticle' @send='send'></CommentInput>
    </div> -->
    <div class="momentList">
      <div class="test" ref="test"></div>
      <Moment v-for="(item,index) in mommentList" :key="index" :nickname="item.userInfo.nickname" :avatar="item.userInfo.avatar" :content="item.content" :comment="item.comment" :createdAt='item.createdAt'></Moment>
    </div>
  </div>
</template>

<script>
import CommentInput from "@/components/CommentInput.vue";
import Moment from "@/components/Moment.vue";
import HttpManager from "@/api/index";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      article: "",
      // momentContent:'',
      mommentList: ""
      // momentContent:'',
    };
  },
  methods: {
    cleararticle() {
      // 清空缓存的动态内容
      this.article = "";
    },
    send(params) {
      console.log("父组件检测到发送事件，值是");
      console.log(params);
      HttpManager.sendMomment(params).then(
        (response) => {
          console.log("发送成功");
        },
        (error) => {
          // 请求错误
          console.log("发送失败");
        }
      );
      //    //发送请求完成之后请求刷新动态列表
      HttpManager.getUserMoment(`/dynamicContentList/${this.uid}`).then(
        (response) => {
          console.log(response);
          console.log("获取成功");
          this.mommentList = response;
          // this.momentContent = response[26].content
          // this.$refs.test.innerHTML=this.momentContent
          // console.log(testHTML);
        },
        (error) => {
          // 请求错误
          console.log(error.response);
        }
      );
    }
  },
  components: {
    CommentInput,
    Moment
  },
  computed: {
    ...mapGetters("user", ["uid"])
  },
  mounted() {
    HttpManager.getUserMoment(`/dynamicContentList/${this.uid}`).then(
      (response) => {
        console.log(response);
        console.log("获取成功");
        this.mommentList = response;
        console.log(this.mommentList);
        // this.momentContent = response[26].content
        // this.$refs.test.innerHTML=this.momentContent
        // console.log(testHTML);
      },
      (error) => {
        // 请求错误
        console.log(error.response);
      }
    );
  }
};
</script>

<style>
@import "../assets/css/space.scss";
</style>