<template>
    <transition>
        <div class="content" v-if="is_show">
          <div class="toast" ref="toast">{{item}}</div>
        </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props:['item'],
    // computed
    data() {
        return {
            is_show:true,
        }
    },
    mounted() {
        setTimeout(()=>{
            this.is_show=false
        },2500)
    },
}
</script>

<style lang='scss' scoped>
@import '../assets/css/cirtoast.scss';
</style>