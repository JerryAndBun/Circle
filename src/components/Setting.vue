<template>
  <div class="contentdiv">
    <!-- setting -->
    <div class="updateinfo"></div>
    <div class="updateavatar">
      <!-- <form :action="`${baseurl}/avatarImg`"> -->
      <input class="uploadinput" type='file' accept="image/*" @change='filechange'>上传本地文件
      <div class="submit" @click="submitfile()">提交文件</div>
      <!-- <div class="test" @click="submitfile">tttttt</div> -->
      <!-- <input type="submit" value="提交"> -->
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
import HttpManager from "../api/index";
export default {
  data() {
    return {
      file: "",
      dataURL: ""
    };
  },
  methods: {
    filechange(e) {
      // this.file = this.$refs.input.value;
      // console.log(this.file);
      // 手写的input需要一个对象将本地图片转换为对应的格式来上传
      this.file = new FormData();
      // e.target.files就是选中的文件的一个数组
      this.file.append("avatarImg", e.target.files[0]);
      // console.log(this.file.get('file'));
      // console.log(e.target.files[0]);
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
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/setting.scss";
</style>