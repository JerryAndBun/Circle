<template>
  <div class="spacediv">
    <CommentInput v-model="article" @cleararticle='cleararticle'></CommentInput>
  </div>
</template>

<script>
import CommentInput from "@/components/CommentInput.vue";
export default {
  data() {
    return {
      article: ""
    };
  },
  methods: {
    cleararticle(){
      
      // 清空缓存的动态内容
      this.article=''
    }
  },
  components: {
    CommentInput
  }
};
</script>

<style>
</style>