/* 对这个组件的一些说明 这个组件依靠父组件v-for
vuex里的toast_list来循环渲染toast,但是toast_list需要length来循环 哪里需要显示弹窗，直接
this.$store.commit("info/toast_list", { action: "push" ,message:'点赞成功',type:'success'});
type是选择要显示的icon,success是绿色小箭头,其他则是红色小箭头 即可,action不写push的话会清空通知列表
然后每push进去一个,toast回渲染一次 然后自己消失,后面再push进来会在那基础之上加渲染一个toast,不会全部又在渲染一遍
*/

<template>
  <transition name="slide-fade">
    <div class="content" ref="content" v-if="is_show">
      <div class="toast" ref="toast">
        <i class="iconfont" :class="type == 'success' ? 'icon-chenggong' : 'icon-shibai'"></i
        >{{ message }}
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  // message为显示的消息，type为成功或错误的类型
  props: ['message', 'type'],
  // computed
  data() {
    return {
      is_show: false,
    }
  },
  created() {},
  mounted() {
    this.is_show = true
    console.log('123123123')
    console.log(this.type)
    // this.$refs.content.style.transform='translateY(-20px)'
    let time = setTimeout(() => {
      this.is_show = false
      clearTimeout(time)
      // this.$refs.content.style.transform='translateY(20px)'
    }, 3500)
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/cirtoast.scss';

.slide-fade-enter-active {
  transition: all 0.3s ease;
  //   opacity: 1;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-to {
  opacity: 1;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
