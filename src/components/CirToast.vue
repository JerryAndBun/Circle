<template>
    <transition name="slide-fade">
        <div class="content" ref="content" v-if="is_show">
          <div class="toast" ref="toast">
            <i class="iconfont" :class="type=='success'?'icon-chenggong':'icon-shibai'"></i>{{item}}
          </div>
        </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props:['item','type'],
    // computed
    data() {
        return {
            is_show:false,
        }
    },
    created(){
    },
    mounted() {
        this.is_show=true
        console.log('123123123');
        console.log(this.type);
        // this.$refs.content.style.transform='translateY(-20px)'
        setTimeout(()=>{
            this.is_show=false
            // this.$refs.content.style.transform='translateY(20px)'
        },2500)
    },
}
</script>

<style lang='scss' scoped>
@import '../assets/css/cirtoast.scss';

.slide-fade-enter-active {
  transition: all .3s ease;
//   opacity: 1;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter-to{
    opacity: 1;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
</style>