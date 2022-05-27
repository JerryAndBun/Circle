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
      <div class="preview" @click="chooseimg">
        <img :src="`${dataURL}${avatar}`" alt="头像加载失败">
        当前头像
      </div>
      <div class="progress">
        <div class="loaded" :style="{'width':`${progress}`}"></div>
        <span class="loadedtext" ref="loadedtext">{{progress}}</span>
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
      dataURL: BASE_URL,
      progress:'0%',
      config:'',
    };
  },
  watch:{
    progress(newvalue,odlvalue){
      console.log(newvalue);
      if(newvalue=='100%'){
        // this.progress='上传成功'
        this.$refs.loadedtext.style.color='rgb(15,155,241)'
      }
    }
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
      this.config= {
        onUploadProgress: (progress) => {
          // 格式化成百分数
          this.progress = Math.floor((progress.loaded / progress.total) * 100) + "%";
        }
      };
      HttpManager.postUserAvatar(this.file,this.config).then(
        (response) => {
          console.log(response);
          console.log("上传成功");
          console.log(this.progress);
        },
        (error) => {
          console.log("败北~");
          this.progress='上传失败'
          this.$refs.loadedtext.style.color='rgb(255, 100, 100)'
          console.log( this.progress);
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