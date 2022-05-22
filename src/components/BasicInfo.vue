<template>
  <div class="contentdiv">
    <!-- setting -->
    <div class="updateavatar">
      <!-- <form :action="`${baseurl}/avatarImg`"> -->
      <span class="notes">我的头像</span>
      <div class="updatebtn">
        <div class="chooseimg" @click="chooseimg">选择文件</div>
        <input ref="uploadinput" class="uploadinput" type='file' accept="image/*" @change='filechange'>
        <div class="submit" @click="submitfile()">提交文件</div>
      </div>
      <div class="line"></div>
      <div class="preview">
        <img :src="`${dataURL}${avatar}`" alt="寄汤来咯">
        当前头像
      </div>
    </div>
    <div class="updatenickname">
      <span class="notes">我的昵称</span>
      <input ref="nicknnameinput" class="nicknnameinput" :value="`${itemList.nickname}`" @change="changenickname">
    </div>
    <div class="UID">
      <span class="notes">UID</span>
      {{itemList.uid}}
    </div>
    <div class="createdAt">
      <span class="notes">创建时间</span>
      {{this.createdAt.replace(/\-/g,'年').replace(/\-/g,'月')+'日'}}
    </div>
    <div class="updatesignature">
      <span class="notes">我的签名</span>
      <div contenteditable="true" ref="signatureinput" class="signatureinput" @blur="changesignature">{{itemList.signature}}</div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "../api/config";
import HttpManager from "../api/index";
import { mapGetters } from "vuex";
export default {
  props: ["itemList"],
  computed: {
    ...mapGetters("user", ["avatar", "createdAt"])
  },
  data() {
    return {
      item: this.itemList,
      file: "",
      dataURL: BASE_URL
    };
  },
  methods: {
    changenickname() {
      // console.log(this.$refs.nicknnameinput.value);
      HttpManager.putUserNickname({
        nickname: this.$refs.nicknnameinput.value
      }).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log("修改失败");
          console.log(error);
        }
      );
    },
    changesignature() {
      // console.log(this.$refs.signatureinput.innerHTML);
      HttpManager.postUserSignature({
        signature: this.$refs.signatureinput.innerHTML
      }).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log("修改失败");
          console.log(error);
        }
      );
    },
    chooseimg() {
      this.$refs.uploadinput.click();
    },
    filechange(e) {
      // 手写的input需要一个对象将本地图片转换为对应的格式来上传
      this.file = new FormData();
      // e.target.files就是选中的文件的一个数组
      this.file.append("avatarImg", e.target.files[0]);
    },
    submitfile() {
      // alert()
      HttpManager.postUserAvatar(this.file).then(
        (response) => {
          console.log(response);
          console.log("上传成功");
        },
        (error) => {
          console.log("败北~");
        }
      );
    }
  },
  mounted() {
    console.log("我");
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/basicinfo.scss";
</style>