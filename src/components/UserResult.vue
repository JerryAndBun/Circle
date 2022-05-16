<template>
  <div>
    <div class="user_content_div">
      <UserPreview v-for="(item,index) in userList" 
      :item="item"
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
      // console.log(val);
      // console.log(val[0].nickname);
      // console.log(val[0].uid);
      immediate: true;
    }
  },
  components: {
    UserPreview
  },
  mounted() {
    //   console.log(this.userList)
  },
};
</script>

<style lang='scss' scoped>
@import "../assets/css/userresult.scss";
</style>