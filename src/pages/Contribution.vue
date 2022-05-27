<template>
  <div>
    <Header></Header>
    <div class="updatevideo_area" id="updatevideo_area" @change="">
      <div class="hoverdiv" ref="hoverdiv" @click="choosefile" @dragover="ondragover" @dragenter="ondragenter" @dragleave="ondragleave" @drop="ondrop">拖动到此上传</div>
    </div>
    <div class="updatebtn">
      <div class="chooseimg" @click="choosefile">选择文件</div>
      <input ref="uploadinput" class="uploadinput" type='file' accept=".mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv,.m4v" @change='filechange'>
      <div class="submit" @click="submitfile()">提交文件</div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "../api/config";
import HttpManager from "../api/index";
import { mapGetters } from "vuex";
import Header from "../components/Header.vue";
export default {
  data() {
    return {};
  },
  components: {
    Header
  },
  methods: {
    choosefile() {
      this.$refs.uploadinput.click();
    },
    filechange(e) {
      // 手写的input需要一个对象将本地图片转换为对应的格式来上传
      this.file = new FormData();
      // e.target.files就是选中的文件的一个数组
      this.file.append("avatarImg", e.target.files[0]);
      console.log(this.file.get("avatarImg"));
      // console.log(this.file.avatarImg);
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
    },
    ondragenter(e) {
      this.$refs.hoverdiv.style.backgroundColor = "#999";
      e.stopPropagation();
      e.preventDefault();
    },
    ondragover(e) {
      this.$refs.hoverdiv.style.backgroundColor = "#999";
      e.stopPropagation();
      e.preventDefault();
    },
    ondragleave(e) {
      this.$refs.hoverdiv.style.backgroundColor = "rgb(236,236,236)";
      e.stopPropagation();
      e.preventDefault();
    },
    ondrop(e) {
      this.$refs.hoverdiv.style.backgroundColor = "rgb(236,236,236)";
      e.stopPropagation();
      e.preventDefault();
      const filesArray = e.dataTransfer.files;
      for (let i = 0; i < filesArray.length; i++) {
        console.log(filesArray);
      }
    }
  },
  mounted() {
    const dropzone = document.getElementById("updatevideo_area");
    let that = this.ishover;
    // dropzone.ondragover = function (event) {
    //   event.stopPropagation();
    //   event.preventDefault();
    //   // that=true
    //   console.log(that);
    // };
    // dropzone.ondragenter = function (event) {
    //   event.stopPropagation();
    //   event.preventDefault();
    //   that = true
    //   // console.log(that);
    // };
    // console.log(this.ishover);
    // dropzone.ondrop = function (event) {
    //   event.stopPropagation();
    //   event.preventDefault();
    //   that = false;
    //   const filesArray = event.dataTransfer.files;
    //   for (let i = 0; i < filesArray.length; i++) {
    //     sendFile(filesArray[i]);
    //   }
    // };
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/contribution.scss";
</style>