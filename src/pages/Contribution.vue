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
        <!-- 预览裁剪的图片 -->
        <!-- <div style="margin-left:20px;" v-if="false">
            <div class="show-preview" :style="{'width': '224px', 'height':'126px',  'overflow': 'hidden', 'margin': '5px'}">
                <div :style="previews.div" class="preview">
                    <img :src="previews.url" :style="previews.img">
                </div>
            </div>
        </div> -->
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
            <p>封面</p></br>
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
          <input class="video_title_input" type="text" maxlength="50">
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
        
      </div>
      <div class="upload_list">
        
      </div>
    </div>
    <div class="updatebtn">
      <input ref="uploadinput" class="uploadinput" type='file' accept=".mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv,.m4v" @change='filechange'>
      <!-- <div class="submit" @click="submitfile()">提交文件</div> -->
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { BASE_URL } from "../api/config";
import HttpManager from "../api/index";
import { mapGetters } from "vuex";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { VueCropper }  from 'vue-cropper' 
import options from '../assets/options.js'
export default {
  data() {
    return {
      selected:false,
      imgselected:false,
      progress:'0%',
      config:'',
      video_cover:'',
      video_cover_url:'',
      baseurl:BASE_URL,
      have_preview:false,
      // 
      value: [],
      options: options,
      // 
      previews:{},
      option: {
        // img: '',             //裁剪图片的地址
        // outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
        // outputType: 'jpeg',  //裁剪生成图片的格式（jpeg || png || webp）
        // info: true,          //图片大小信息
        // canScale: true,      //图片是否允许滚轮缩放
        // autoCrop: true,      //是否默认生成截图框
        // autoCropWidth: 224,  //默认生成截图框宽度
        // autoCropHeight: 126, //默认生成截图框高度
        // // fixedBox: true, // 固定截图框大小 不允许改变
        // fixed: true, // 是否开启截图框宽高固定比例
        // fixedNumber: [1.77,1], // 截图框的宽高比例
        // full: true, // 是否输出原图比例的截图
        // canMoveBox: true, // 截图框能否拖动
        // original: false, // 上传图片按照原始比例渲染
        img: '',             //裁剪图片的地址
        outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'jpeg',  //裁剪生成图片的格式（jpeg || png || webp）
        info: true,          //图片大小信息
        canScale: true,      //图片是否允许滚轮缩放
        autoCrop: true,      //是否默认生成截图框
        autoCropWidth: 224,  //默认生成截图框宽度
        autoCropHeight: 126, //默认生成截图框高度
        fixed: true,         //是否开启截图框宽高固定比例
        fixedNumber: [1.77, 1], //截图框的宽高比例
        full: false,         //false按原比例裁切图片，不失真
        fixedBox: false,      //固定截图框大小，不允许改变
        canMove: true,      //上传图片是否可以移动
        canMoveBox: true,    //截图框能否拖动
        original: false,     //上传图片按照原始比例渲染
        centerBox: true,    //截图框是否被限制在图片里面
        
        height: false,        //是否按照设备的dpr 输出等比例图片

        infoTrue: false,     //true为展示真实输出图片宽高，false展示看到的截图框宽高,false才能看到预览？

        maxImgSize: 1000,    //限制图片最大宽度和高度
        enlarge: 1,          //图片根据截图框输出比例倍数
        // mode: '230px 150px'  //图片默认渲染方式
      },
      fileName:'',  //本机文件地址
      imgFile:'',
    }
  },
  components: {
    Header,
    Footer,
    VueCropper,
  },
  methods: {
    close_cut(){
      this.imgselected=false
    },
    chosecover(){
      // alert()
      this.$refs.upload_cover_input.click()
    },
    handleChange(value) {
        console.log(value);
    },
    choosefile() {
      this.$refs.uploadinput.click();
    },
    // 上传封面的
    coverchange(){

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
      this.$refs.hoverdiv.style.backgroundColor = "#fff";
      e.stopPropagation();
      e.preventDefault();
      const filesArray = e.dataTransfer.files;
      for (let i = 0; i < filesArray.length; i++) {
        console.log(filesArray);
      }
      this.selected=true
    },
    // 
    //选择本地图片
    uploadImg(e) {
        // 若选择了封面
        if(e.target.files[0]){
          this.imgselected=true
        }
        var _this = this;
        //上传图片
        var file = e.target.files[0]
        _this.fileName = file.name;
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
            return false
        }
        var reader = new FileReader();
        reader.onload =(e) => {
            let data;
            console.log("e.target.result=",e.target.result)
            if (typeof e.target.result === 'object') {
                // 把Array Buffer转化为blob 如果是base64不需要
                data = window.URL.createObjectURL(new Blob([e.target.result]))
                console.log('1');
            }
            else {
                data = e.target.result
                console.log('2');

            }
            _this.option.img = data
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file);
    },
    //
    realTime(data){
        this.previews = data
        console.log(this.previews);
    },
    //上传封面（点击上传按钮）
    finish(type) {
      this.video_cover = new FormData();
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data);
        this.video_cover.append("titlePic",data,this.fileName)
        HttpManager.postUploadTitlePic(this.video_cover).then((response)=>{
          this.video_cover_url=response.data
          this.have_preview=true
          console.log(`${this.baseurl}${this.video_cover_url}`);
        },(error)=>{

        })
        // this.close_cut()
      })
    }
  },
  mounted() {
    const dropzone = document.getElementById("updatevideo_area");
    let that = this.ishover;
  },
  created(){
    // 查询用户是否有上一次的编辑记录
    HttpManager.getUploadVideo().then(
      (response)=>{
        console.log(response);
      },error=>{

      }
    )
  }
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