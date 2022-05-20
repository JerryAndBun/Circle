<template>
  <div>
    <div class="user_content_div">
      <UserPreview v-for="(item,index) in userList" 
      :item="item" :key="index"
      ></UserPreview>
    </div>
  </div>
</template>

<script>
import UserPreview from "../components/UserPreview.vue";
export default {
  props: ["userList"],
  data() {
      return {
          myuserList:this.userList
      }
  },
  watch: {
    userList: (val) => {
      immediate: true;
    }
  },
  components: {
    UserPreview
  },
  mounted() {
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/userresult.scss";
</style>