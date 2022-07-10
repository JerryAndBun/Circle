/* 对这个组件的一些说明 这个组件依靠父组件v-for
vuex里的toast_list来循环渲染toast,但是toast_list不需要什么值,他只需要length来循环就行
父组件传入item与type代表要显示的消息与类型 父组件需要显示时,往vuex里的toast_list
commit一个{type='push'}对象，用来增加长度 然后修改item与type即可 */
<template>
  <transition name="slide-fade">
    <div class="content" ref="content" v-if="is_show">
      <div class="toast" ref="toast">
        <i class="iconfont" :class="type == 'success' ? 'icon-chenggong' : 'icon-shibai'"></i
        >{{ item }}
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  // item为显示的消息，type为成功或错误的类型
  props: ['item', 'type'],
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
    setTimeout(() => {
      this.is_show = false
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
