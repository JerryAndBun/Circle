<template>
  <div class="boss" ref="boss">
    <Header></Header>
    <div v-if="!selected" class="updatevideo_area" id="updatevideo_area" @change="">
      <div class="hoverdiv" ref="hoverdiv" 
      @click="choosefile" 
      @dragover="ondragover"
      @dragenter="ondragenter" 
      @dragleave="ondragleave" 
      @drop="ondrop">拖动到此上传
        <div class="update_info">
          <p>支持批量添加文件</p>
          <p>单次上传文件大小不超过200MB</p>
          <p>暂仅支持mp4格式</p>
        </div>
      </div>
      <i class="iconfont icon-shangchuan"></i>
      <div class="choosefile" @click="choosefile">选择文件</div>
    </div>
    <!-- 图片裁剪 -->
    <div class="source_image_mask" v-if="imgselected">
      <div class="source_image_content">
        <div class="cancel">
          <span class="cancel_text">请裁剪图片，支持滚轮缩放</span>
          <i class="iconfont icon-guanbi" @click="close_cut"></i>
        </div>
        <div class="rechoose" @click="chosecover">重新选择封面</div>
        <div class="confirm" @click="finish">选择</div>
        <div class="source-image" >
        <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.outputSize"
        :outputType="option.outputType"
        :info="option.info"
        :canScale="option.canScale"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :full="option.full"
        :fixedBox="option.fixedBox"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :centerBox="option.centerBox"
        :infoTrue='option.infoTrue'
        @realTime="realTime"
        ></vueCropper>
      </div>
      </div>
    </div>
    <div class="selected_area" v-if="selected">
      <div class="video_info">
        <h1 class="title">投稿信息</h1>
        <div class="cover" >
          <img v-if="have_preview" class="video_cover_preview" :src="`${baseurl}${video_cover_url}`" alt="" @click="chosecover">
          <div class="no_cover" @click="chosecover">
            <i class="iconfont icon-shangchuan"></i>
            <span class="">请选择封面</span>
            <input ref="upload_cover_input" class="upload_cover_input" type='file' accept="image/*" @change='uploadImg'>
          </div>
          <div class="cover_des">
            <p class="star">*</p>
            <p>封面</p>
            </br>
            <span class="des">JPG、JEPG、PNG格式图片需≤10M
              <br>GIF格式图片的要求：大小≤3M、时长≤5秒、帧数≤120、分辨率≤720p，超限的GIF图片可能会展示为静态图片
            </span>
          </div>
        </div>
        <div class="video_title">
          <p class="star">*</p>
          <p class="title">标题</p>
          <p class="tips">最多50字符</p>
          </br>
          <input class="the_input" type="text" maxlength="50" ref="title_input">
        </div>
        <div class="video_partition">
          <p class="star">*</p>
          <p class="title">分区</p>
          <div class="block">
            <el-cascader
              v-model="value"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange">
              </el-cascader>
          </div>
        </div>
        <div class="video_tag">
          <p class="star">*</p>
          <p class="title">标签</p>
          <p class="tips">添加话题增加曝光哦，最多添加六个</p>
          </br>
          <div class="tag_input_div">
            <span class="tag" v-for="(item,index) in tag_list" :key="index">
              {{item}}<i class="iconfont icon-guanbi" @click="delete_tag(index)"></i>
            </span>
            <div class="the_input_instance" >
              <input class="the_input" ref="tag_input" placeholder="按Enter键创建标签" type="text" maxlength="10" @keyup.enter="get_tag">
            </div>
            <p class="tip_info">还可添加{{6-tag_list.length}}个tag</p>
          </div>
        </div>
        <div class="video_summary">
          <p class="star">*</p>
          <p class="title">简介</p>
          <p class="tips">最多200字符</p>
          </br>
          <textarea class="the_input" ref="summary_input" type="text" maxlength="200"></textarea>
        </div>
        <div class="submit_btn" @click="submitfile()">发布投稿</div>
      </div>
      <div class="upload_list">
        <h1 class="upload_list_title">上传视频</h1>
        <p class="tips_info">请勿上传含有政治有害、色情挑逗、血腥暴力等违法因素的视频内容</p>
        <div class="video_list">
          <div class="video_file" v-for="(item,index) in filesArray" :key="index">
            <div class="video_attribute">
              <span class="p_part">P1</span>
              <input type="text" class="p_name" :value="item.title">
              <span class="remain_word">{{item.title?item.title.length:'0'}}/45</span>
            </div>
            <div class="video_process">
              <div class="finish_part" :style="{'width':progress,'height':'6px'}"></div>
            </div>
            <div class="video_state">
              <span class="state">{{progress=='100%'?'上传完成':progress}}</span>
              <a href="" class="delete_video" @click.prevent="delete_video(item.pid)" >删除</a>
            </div>
          </div>
        </div>
        <div class="add_video_file">
          <div class="hoverdiv" ref="hoverdiv" 
            @click="choosefile" 
            @dragover="ondragover"
            @dragenter="ondragenter" 
            @dragleave="ondragleave" 
            @drop="ondrop"><p class="ddd">拖动到此上传</p>
          <div class="update_info">
            <p>支持批量添加文件</p>
            <p>单次上传文件大小不超过200MB</p>
            <p>暂仅支持mp4格式</p>
          </div>
          <!-- </div> -->
          <i class="iconfont icon-shangchuan"></i>
          <div class="choosefile" @click="choosefile">选择文件</div>
        </div>
        </div>
      </div>
    </div>

    <div class="updatebtn">
      <input ref="uploadinput" class="uploadinput" multiple type='file' accept=".mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv,.m4v" @change='filechange'>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { BASE_URL } from "../api/config"
import HttpManager from "../api/index"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
// import { VueCropper } from "vue-cropper"
import options from "../assets/options.js"
export default {
  data() {
    return {
      selected: false,
      imgselected: false,
      progress: "0%",
      config: "",
      video_cover: "",
      video_cover_url: "",
      baseurl: BASE_URL,
      have_preview: false,
      tag_list: [],
      filesArray: [],
      cv: "",
      value: [],
      options: options,
      previews: {},
      option: {
        img: "", //裁剪图片的地址
        outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
        outputType: "jpeg", //裁剪生成图片的格式（jpeg || png || webp）
        info: true, //图片大小信息
        canScale: true, //图片是否允许滚轮缩放
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 224, //默认生成截图框宽度
        autoCropHeight: 126, //默认生成截图框高度
        fixed: true, //是否开启截图框宽高固定比例
        fixedNumber: [1.77, 1], //截图框的宽高比例
        full: false, //false按原比例裁切图片，不失真
        fixedBox: false, //固定截图框大小，不允许改变
        canMove: true, //上传图片是否可以移动
        canMoveBox: true, //截图框能否拖动
        original: false, //上传图片按照原始比例渲染
        centerBox: true, //截图框是否被限制在图片里面
      },
      fileName: "", //本机文件地址
      // imgFile:'',
    };
  },
  components: {
    Header,
    Footer,
    VueCropper,
  },
  watch: {
    progress(newvalue, odlvalue) {
      console.log(newvalue);
      if (newvalue == "100%") {
        // this.progress='上传成功'
        // this.$refs.loadedtext.style.color='rgb(15,155,241)'
      }
    },
  },
  methods: {
    // 删除上传的分P视频
    get_cache_video_list() {
      HttpManager.getUploadVideo().then(
        (response) => {
          console.log(response);
          if (response.videoEffectiveDtoList.length) {
            console.log("11111");
            this.selected = true;
            // this.have_preview=true
            this.progress = "100%";
            this.video_cover_url = response.titlePagePath;
            if (response.videoEffectiveDtoList) {
              this.filesArray = response.videoEffectiveDtoList;
              this.selected = true;
              this.cv = response.videoEffectiveDtoList[0].cv;
            }
          }
        },
        (error) => {}
      );
    },
    delete_video(pid) {
      HttpManager.deletePVideo(`/video/${this.cv}/${pid}`).then(
        (response) => {
          console.log("删除成功");
          console.log(response);
          this.filesArray = response.videoEffectiveDtoList;
          // this.get_cache_video_list()
          // setTimeout(() => {
          //   this.get_cache_video_list()
          // }, 1000);
        },
        (error) => {
          console.log("删除失败");
        }
      );
    },
    // 获取tag
    get_tag(e) {
      console.log(e.target.value);
      if (
        this.tag_list.includes(e.target.value) ||
        e.target.value == "" ||
        this.tag_list.length > 5
      ) {
        return;
      } else {
        this.tag_list.push(e.target.value);
        e.target.value = "";
        console.log(this.tag_list);
      }
    },
    delete_tag(index) {
      this.tag_list.splice(index, 1);
      console.log("删除了第" + index + "个tag");
    },
    close_cut() {
      this.imgselected = false;
    },
    chosecover() {
      this.$refs.upload_cover_input.click();
    },
    handleChange(value) {
      console.log(value);
    },
    choosefile() {
      this.$refs.uploadinput.click();
    },
    // 单击上传视频的
    filechange(e) {
      // 手写的input需要一个对象将本地图片转换为对应的格式来上传
      this.file = new FormData();
      // e.target.files就是选中的文件的一个数组
      console.log(e.target.files);
      this.upload_video(e.target.files);
      // for (let index = 0; index < e.target.files.length; index++) {
      //   this.file.append(`${e.target.files[index].name}`, e.target.files[index]);
      // }
    },
    // 上传视频的函数，可以判断是否重复
    upload_video(List) {
      this.selected = true;
      let double = 0;
      for (const iterator of List) {
        for (const item of this.filesArray) {
          if (iterator.name === item.name) {
            console.log("文件重复");
            double = 1;
            break;
          } else {
            double = 0;
          }
        }
        if (double) {
          break;
        }
        this.filesArray.push(iterator);
      }
      if (this.filesArray) {
        console.log(this.filesArray);
        this.selected = true;
      }
      this.config = {
        onUploadProgress: (progress) => {
          // 格式化成百分数
          this.progress =
            Math.floor((progress.loaded / progress.total) * 100) + "%";
        },
      };
      let formData = new FormData();
      // 往表单提交数据，上传至服务器，未激活状态
      for (const item of this.filesArray) {
        formData.append("videoFile", item);
        formData.append("cv", this.cv);
      }
      HttpManager.postVideo(formData, this.config).then(
        (response) => {
          console.log(response);
          this.cv = response.data;
          console.log("上传成功");
          this.selected = true;
        },
        (error) => {
          console.log(error);
          console.log("上传失败");
        }
      );
    },
    submitfile() {
      HttpManager.postPublish(`${this.baseurl}/publish/${this.cv}`, {
        cv: this.cv,
        tags: this.tag_list,
        summary: this.$refs.summary_input.value,
        title: this.$refs.title_input.value,
      }).then(
        (response) => {
          console.log(response);
          this.$router.push("/");
          console.log("上传成功");
        },
        (error) => {
          console.log("败北~");
        }
      );
    },
    ondragenter(e) {
      this.$refs.hoverdiv.style.backgroundColor = "rgb(240, 240, 240)";
      e.stopPropagation();
      e.preventDefault();
    },
    ondragover(e) {
      this.$refs.hoverdiv.style.backgroundColor = "rgb(240, 240, 240)";
      e.stopPropagation();
      e.preventDefault();
    },
    ondragleave(e) {
      this.$refs.hoverdiv.style.backgroundColor = "#fff";
      e.stopPropagation();
      e.preventDefault();
    },
    ondrop(e) {
      console.log(this.filesArray);
      this.$refs.hoverdiv.style.backgroundColor = "#fff";
      e.stopPropagation();
      e.preventDefault();
      // 上传视频
      this.upload_video(e.dataTransfer.files);
    },
    //选择本地图片
    // 上传封面的
    uploadImg(e) {
      // 若选择了封面
      if (e.target.files[0]) {
        this.imgselected = true;
      }
      var _this = this;
      //上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = (e) => {
        let data;
        console.log("e.target.result=", e.target.result);
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
          console.log("1");
        } else {
          data = e.target.result;
          console.log("2");
        }
        _this.option.img = data;
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    //
    realTime(data) {
      this.previews = data;
      console.log(this.previews);
    },
    //上传封面（点击上传按钮）
    finish(type) {
      this.video_cover = new FormData();
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data);
        this.video_cover.append("titlePic", data, this.fileName);
        HttpManager.postUploadTitlePic(this.video_cover).then(
          (response) => {
            this.video_cover_url = response.data;
            this.have_preview = true;
            this.close_cut();
            console.log(`${this.baseurl}${this.video_cover_url}`);
          },
          (error) => {}
        );
      });
    },
  },

  mounted() {
    const dropzone = document.getElementById("updatevideo_area");
    let that = this.ishover;
    // 查询用户是否有上一次的编辑记录
  },
  created() {
    this.get_cache_video_list();
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/contribution.scss";
.image-list {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  width: 630px;
}

.source-image {
  width: 460px;
  height: 300px;
}
</style>