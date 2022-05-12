 <template>
  <div>
    <div class="publish">
      <div class="publish_input">
        <div class="text_area">
          <div ref="text_area_inner" 
          id="text_area_inner" 
          contenteditable="plaintext-only" 
          placeholder="有什么想和大家分享的？" 
          class="text_area_inner" 
          @input="textinput,handleSelection" @click="handleSelection">
            <!-- <img src="../assets/emoji/1.png" alt=""> -->
          </div>
        </div>
        <div class="emoji-btn" @click="isshowemoji=!isshowemoji">表情</div>
        <div class="send" @click="sendArticle">发送</div>
        <div class="emoji-box" v-if="isshowemoji">
          <div class="emoji-history">历史表情</div>
          <div class="emoji-history-container">
            <!-- <img src="../assets/emoji/1.png" alt=""> -->
            <img class="emoji-img" 
            v-for="i in 5" 
            :src="require(`../assets/emoji/${i}.png`)" 
            :key=" i" @click="addemoji(i)">
          </div>
          <div class="emoji-all">所有表情</div>
          <div class="emoji-all-container">
            <img 
            class="emoji-img" 
            v-for="i in 72" :src="require(`../assets/emoji/${i}.png`)" :key=" i" @click="addemoji(i)">
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

 <script>
export default {
  components: {},
  data() {
    return {
      text: "",
      showDialog: false,
      isshowemoji: false,
      selection: null,
      range: null,
      textNode: null,
      rangeStartOffset: null
    };
  },
  methods: {
    sendArticle() {
      // 清空动态内容
      this.$emit("cleararticle");
      this.$refs.text_area_inner.innerHTML = "";
    },
    textinput(e) {
      (this.text = this.$attrs.value), this.$emit("input", e.target.innerHTML);
    },
    addemoji(i) {
      // 第一种插入方式，不会记录焦点位置
      const parseDom = this.parseDom(`<img @click="handleTag" src="${require(`../assets/emoji/${i}.png`)}">`);

      // 在光标处插入dom
      this.range.insertNode(parseDom);
      // 光标开始和光标结束重叠
      this.range.collapse(true);
      // let url = require(`../assets/emoji/${i}.png`);
      // let imgtag = document.createElement("img");
      // imgtag.src = url;
      // imgtag.width = 20;
      // imgtag.height = 20;
      // imgtag.className = "emoji-item";
      // // this.$refs.text_area_inner.append(imgtag);
      // let input = document.getElementById("text_area_inner");
      // input.append(imgtag);
      // 第二种插入方式，会记录焦点位置,但是废弃
      // let url = require(`../assets/emoji/${i}.png`);
      // let imgt = `<img src=${url} class = "emoji-item">`;
      // document.execCommand("insertHTML", false, imgt);
      // alert(document.execCommand("insertHTML",true, imgt))
    },
    handleSelection() {
      this.selection = getSelection();
      // 光标对象
      this.range = this.selection.getRangeAt(0);
      // 获取光标对象的范围界定对象
      this.textNode = this.range.startContainer;
      // 获取光标位置
      this.rangeStartOffset = this.range.startOffset;
    },
    // 转dom对象
    parseDom(arg) {
      var objE = document.createElement("img");
      objE.innerHTML = arg;
      alert
      return objE.childNodes[0];
    }
  }
  // mounted() {
  //   document.getElementById("text_area_inner").οnpaste = function (event) {
  //     var e = event || window.event;
  //     // 阻止默认粘贴
  //     e.preventDefault();
  //     // 粘贴事件有一个clipboardData的属性，提供了对剪贴板的访问
  //     // clipboardData的getData(fomat) 从剪贴板获取指定格式的数据
  //     var text = (e.originalEvent || e).clipboardData.getData("text/plain") || prompt("在这里输入文本");
  //     // 插入
  //     document.execCommand("insertText", false, text);
  //   };
  // }
};
</script>
 <style lang='scss'>
@import "../assets/css/commentinput";
// .emoji-item {
//   width: 200px
// }
</style>