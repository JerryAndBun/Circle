 <template>
  <div contenteditable="false">
    <div class="publish">
      <div class="publish_input">
        <div class="text_area">
          <div ref="text_area_inner" id="text_area_inner" contenteditable="plaintext-only" placeholder="有什么想说的？" 
            class="text_area_inner" 
            @click.prevent="handleSelection" 
            @keyup.ctrl.enter="sendMessage">
            <!-- <img src=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAnFBMVEVHcEz/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE3/zE1drexdrexdrexdrexdrexdrexdrexdrexdrexdrexdrexdrez/zE1drexmRQCziSf1xEiku6ZwTQXryGF7s86MZxN5VgrGmTCDXg71ylfsu0OfeB3isz+pgCLZqjq8kSvhxmuaubBxsdiGtcTXxHWuvZ1nr+KCoEL9AAAAGXRSTlMAgGC/349QIJ/vr0DP7zC/EHBAn4+AzyDfCSO1awAAAiFJREFUeF7N2NeamzAQBeABBBJuu5t+RHGv21Le/91iE49JQEaAuMh/qYvzzciyLA81kH4YCFyJIPQl9RApgRqhIrKbTaczriWMcUcc2up6nGo9faSz8QiNRmNq8qDPHoikgpVqqOpJF568GC3EXkNjhV87tDORZPRRX72hpTgig5m+eUVbnnmn2Xe0pqjqg/7LD4ckLqhrSVC1gnqWBM/0kbE3dBBR6auuWKC9WNLNZ13xEx1M6OabrnhHF57hMLJX9Gnuk67JgR5n4IuuWaKTMRW0AToZDRUEOVRQOFRQTGfR0nGz+YuicsePn0+AWOiaBToSRBLIHQpiknxgV9ml5Q6d+RSiTCpzNqvkbLVBCcZVFlKAi/yfvo7b5Gp7BDOvsoAECou8qGqZL4DjPLmZc5JxtSQINZzDSU2rpXpQdu2ArTPzqjUoTSpS86o16NLCKn0upKtLG+ZVe9A8zcCQpfO5cbUe5OA/DxIYhKAAgwgoxCBC8jEInyQGIWmY3RZEpOCIL/8IrvjdFqPB/rAubo3D3voD2XQAslNyc8psP9kSrPmO22aWRwSNcAfn2JJG9McYZqek4tT40Lp7AvZJzd7y/JcxDA6Xy/Xl+erlcsEebC9tDwbrDSo2a+u/iAl6mxDj5vrhxliEniKq8NCLRzUKPSgyUM45TDnnMM95f1gUA24DBCYncBtplFyHLMx57MNcB1HMeTTmPqwbbHz4G4rBnlOXsiTjAAAAAElFTkSuQmCC>阿瑟大三大四的 -->
          </div>
        </div>
        <div class="emoji-btn" id="emoji-btn" @click="isshowemoji=!isshowemoji,ffocus()" @mousedown.prevent="">表情</div>
        <div class="suggest">ctrl+enter&nbsp发送</div>
        <div class="send" @click.prevent="sendMessage">发送</div>
        <div class="emoji-box" id="emoji-box" v-if="isshowemoji">
          <div class="emoji-history">历史表情</div>
          <div class="emoji-history-container">
            <img class="emoji-img" v-for="i in historyArray" :src="require(`../assets/emoji/${i}.png`)" :key=" i" @click="addemoji(i,$event),ffocus()" @mousedown.prevent="">
          </div>
          <div class="emoji-all">所有表情</div>
          <div class="emoji-all-container">
            <img class="emoji-img" v-for="i in 72" :src="require(`../assets/emoji/${i}.png`)" :key=" i" @click="addemoji(i,$event),ffocus(),changeList(i)" @mousedown.prevent="">
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

 <script>
// import HttpManager from "../api/index";
import { mapGetters } from "vuex";
export default {
  // comment_level  分别代表评论区用的,传入1或2代表几级评论
  // messageWindow  聊天用的,或者只是单纯的获取输入
  // moment         动态用的，谁为true就代表当前作为谁的输入框，发对应的请求
  props: ["comment_level",'messageWindow','moment'],
  components: {},
  computed: {
    ...mapGetters("user", ["uid"])
  },
  data() {
    return {
      content: "",
      historyArray: [1, 2, 3, 4, 5],
      showDialog: false,
      isshowemoji: false,
      selection: null,
      range: null
    };
  },
  methods: {
    test(){
      // console.log(this.$refs.text_area_inner.innerHTML);
      var reg=new RegExp("\n","g"),
      str= this.$refs.text_area_inner.innerHTML.replace(reg,"<br>");
      console.log(str);
    },
    changeList(i) {
      if (this.historyArray.includes(i)) return;
      this.historyArray.unshift(i);
      this.historyArray.pop();
    },
    ffocus() {
      let text_area_inner = this.$refs.text_area_inner;
      if (document.activeElement !== text_area_inner) {
        text_area_inner.focus();
      }
    },
    sendMessage(e) {
      // 保留换行
      var reg=new RegExp("\n","g"),
      str= this.$refs.text_area_inner.innerHTML.replace(reg,"<br>");
      this.content = str;
      // console.log(this.moment);
      // console.log(this.messageWindow);
      // console.log(this.comment_level);
      if(this.comment_level){
        // 根据父组件传过来的props决定调用的是评论还是动态接口
        // 说明是评论的输入框
        this.$emit("sendComment", { uid: this.uid, content: this.content ,comment_level:this.comment_level});
      }
      if(this.moment){
        // 发送动态的输入框
        //     SHARE_DYNAMIC_CONTENT("分享动态"),
        //     SHARE_VIDEO("分享视频"),
        //     NORMAL_DYNAMIC_CONTENT("普通动态");
        this.$emit("sendMoment", { cv:'',uid: this.uid, reason: this.content ,type:'NORMAL_DYNAMIC_CONTENT'});
      }
      if(this.messageWindow){
        // 发消息的输入框
        this.$emit("sendMessage", { content:this.content});
      }
      this.$emit("input", this.content);
      // 清空动态内容
      this.$refs.text_area_inner.innerHTML = "";
      // 关闭表情面板
      this.isshowemoji = false;
    },
    lineFeed(){
      let text_area_inner = document.getElementById("text_area_inner");
      this.content = text_area_inner.innerHTML;
      console.log(this.content);
      // this.$refs.text_area_inner.
      this.content=this.content+'</br>'
      console.log(this.content);

    },
    addemoji(i, e) {
      // 该方法出自https://blog.csdn.net/weixin_42232156/article/details/121627920
      let a = require(`../assets/emoji/${i}.png`);
      const parseDom =`<img src=${a}>`
      let range, node;
      if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        range.collapse(false);//光标移至最后
        node = range.createContextualFragment(parseDom);
        let c = node.lastChild;
        range.insertNode(node);
        if (c) {
          range.setEndAfter(c);
          range.setStartAfter(c);
        }
        let j = window.getSelection();
        j.removeAllRanges();
        j.addRange(range);
      } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().pasteHTML(parseDom);
      }
    },
    handleSelection() {
      this.selection = getSelection();
      // 光标对象
      this.range = this.selection.getRangeAt(0);
    },
    // 转dom对象
    parseDom(arg) {
      var objE = document.createElement("img");
      objE.innerHTML = arg;
      return objE.childNodes[0];
    }
  },
  watch: {
    strlength() {
      let text_area_inner = document.getElementById("text_area_inner");
      return text_area_inner.innerHTML;
    }
  },
  created() {
    // document.addEventListener("click", (e) => {
    //   let box = document.getElementById("emoji-box");
    //   if (!box.contains(e.target)) {
    //     this.isshowemoji = false;
    //   }
    // });
  }
};
</script>
 <style lang='scss' scoped>
@import "../assets/css/commentinput";
</style>